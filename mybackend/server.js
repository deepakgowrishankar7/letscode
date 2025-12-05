require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { exec } = require('child_process');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3888; // Use 3000 for backend (make sure MySQL is stopped!)
const otps = {}; // Store OTPs temporarily in memory

// MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'deepak098',
    database: process.env.DB_NAME || 'mydatabase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // or correct static path

 // Store OTPs temporarily in memory

// Send OTP
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otps[email] = otp;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'deepakchowdar1991@gmail.com',
            pass: process.env.EMAIL_PASS || 'zebw futn eytr zngf'
        }
    });

    const mailOptions = {
        from: 'deepakchowdar1991@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // Log detailed error for debugging
            console.error('❌ Failed to send OTP email:', error);
            return res.status(500).json({ message: 'Failed to send OTP', error: error.toString() });
        }
        console.log('✅ OTP email sent:', info.response);
        res.status(200).json({ message: 'OTP sent successfully' });
    });
});

// Register with OTP verification
app.post('/register', (req, res) => {
    const { name, email, password, otp } = req.body;

    if (otps[email] !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    pool.query(
        'SELECT email, name FROM users WHERE email = ? OR name = ?',
        [email, name],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error occurred' });
            }

            if (results.length > 0) {
                const existingUser = results[0];
                if (existingUser.email === email) {
                    return res.status(400).json({ message: 'Email already registered' });
                }
                if (existingUser.name === name) {
                    return res.status(400).json({ message: 'Username already exists' });
                }
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: 'Error hashing password' });
                }

                pool.query(
                    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                    [name, email, hash],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: 'username already exist' });
                        }
                        delete otps[email]; // Clear OTP after use
                        res.status(201).json({ message: 'User registered successfully!' });
                    }
                );
            });
        }
    );
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase

    pool.query('SELECT * FROM users WHERE email = ?', [normalizedEmail], (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        if (results.length === 0) return res.status(401).json({ message: 'User not found' });
        const hash = results[0].password;
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Compare error' });
            if (isMatch) {
                res.json({ message: 'Login successful', userName: results[0].name }); // Return user name
            } else {
                res.status(401).json({ message: 'Password is incorrect' });
            }
        });
    });
});

// Forgot password endpoint
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        if (results.length === 0) return res.status(404).json({ message: 'Email not found' });

    const resetLink = `http://localhost:3888/reset-password?email=${encodeURIComponent(email)}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'deepakchowdar1991@gmail.com', // <-- use your Gmail
                pass: process.env.EMAIL_PASS || 'fner bohj vsqm eqwg'      // <-- use your Gmail app password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER || 'deepakchowdar1991@gmail.com',
            to: email,
            subject: 'Password Reset Link',
            text: `Click this link to reset your password: ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Email sending error:", error); // Log full error
    return res.status(500).json({ message: 'Failed to send email', error: error.toString() });
  }
  console.log("✅ Email sent:", info.response);
  res.json({ message: 'Reset link sent to your email' });
});
    });
});

// Change Password Endpoint
app.post('/change-password', (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase

    console.log('Email received:', normalizedEmail); // Debugging normalized email

    pool.query('SELECT password FROM users WHERE email = ?', [normalizedEmail], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'DB error' });
        }
        if (results.length === 0) {
            console.log('User not found for email:', normalizedEmail); // Debugging user not found
            return res.status(400).json({ message: 'User not found' });
        }

        const hash = results[0].password;
        bcrypt.compare(currentPassword, hash, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Compare error' });
            if (!isMatch) return res.status(400).json({ message: 'Current password incorrect' });

            // Hash the new password and update
            bcrypt.hash(newPassword, 10, (err, newHash) => {
                if (err) return res.status(500).json({ message: 'Hashing error' });
                pool.query('UPDATE users SET password = ? WHERE email = ?', [newHash, normalizedEmail], (err2) => {
                    if (err2) return res.status(500).json({ message: 'Failed to update password' });
                    res.json({ message: 'Password changed successfully!' });
                });
            });
        });
    });
});

// Change Email Endpoint
app.post('/change-email', (req, res) => {
    const { oldEmail, newEmail } = req.body;

    const normalizedOldEmail = oldEmail.toLowerCase(); // Normalize old email to lowercase
    const normalizedNewEmail = newEmail.toLowerCase(); // Normalize new email to lowercase

    pool.query('UPDATE users SET email = ? WHERE email = ?', [normalizedNewEmail, normalizedOldEmail], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'DB error' });
        }
        if (result.affectedRows === 0) {
            console.log('User not found for email:', normalizedOldEmail); // Debugging user not found
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Email changed successfully!' });
    });
});

// Example: Get user details by email (in real apps, use session/auth)
app.get('/user/:email', (req, res) => {
    const email = req.params.email;
    pool.query('SELECT name, email FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

app.get('/api/user-details', (req, res) => {
    const email = req.query.email;

    const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase
    console.log('Fetching user details for email:', normalizedEmail); // Debugging email

    pool.query('SELECT name, email FROM users WHERE email = ?', [normalizedEmail], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            console.log('User not found for email:', normalizedEmail); // Debugging user not found
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User details found:', results[0]); // Debugging user details
        res.json(results[0]); // Return the user details
    });
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/add-notification', (req, res) => {
    const { content, contentTitle } = req.body;

    pool.query(
        'INSERT INTO notifications (content, content_title) VALUES (?, ?)',
        [content, contentTitle],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to add notification' });
            }
            res.status(201).json({ message: 'Notification added successfully!' });
        }
    );
});

app.get('/notifications', (req, res) => {
    pool.query('SELECT id, content, content_title, created_at FROM notifications ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to fetch notifications' });
        }
        res.json(results);
    });
});
app.get('/dismissed-notifications', (req, res) => {
  const email = req.query.email;
  pool.query(
    'SELECT notification_id FROM dismissed_notifications WHERE user_email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Error fetching dismissed notifications:', err);
        return res.status(500).json({ message: 'Failed to get dismissed list' });
      }
      res.json(results.map(row => row.notification_id));
    }
  );
});
app.post('/notifications/dismiss', (req, res) => {
  const { email, notificationId } = req.body;

  pool.query(
    'INSERT IGNORE INTO dismissed_notifications (user_email, notification_id) VALUES (?, ?)',
    [email, notificationId],
    (err, result) => {
      if (err) {
        console.error('Error recording dismissal:', err);
        return res.status(500).json({ message: 'Failed to dismiss notification' });
      }
      res.status(200).json({ message: 'Notification dismissed' });
    }
  );
});

app.post('/public-message', (req, res) => {
    const { userName, message } = req.body;

    if (!userName || !message) {
        return res.status(400).json({ message: 'Invalid request. Missing userName or message.' });
    }

    pool.query(
        'INSERT INTO public_messages (user_name, message) VALUES (?, ?)',
        [userName, message],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to send message.' });
            }
            res.status(201).json({ message: 'Message sent successfully!' });
        }
    );
});

app.get('/public-messages', (req, res) => {
    pool.query('SELECT user_name, message, created_at FROM public_messages ORDER BY created_at ASC', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to fetch messages' });
        }
        res.json(results);
    });
});

app.post('/private-message', (req, res) => {
    const { senderName, receiverName, message } = req.body;

    if (!senderName || !receiverName || !message) {
        return res.status(400).json({ message: 'Invalid request. Missing senderName, receiverName, or message.' });
    }

    pool.query(
        'INSERT INTO private_messages (sender_name, receiver_name, message) VALUES (?, ?, ?)',
        [senderName, receiverName, message],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to send message.' });
            }
            res.status(201).json({ message: 'Message sent successfully!' });
        }
    );
});

app.get('/private-messages', (req, res) => {
    const { senderName, receiverName } = req.query;

    pool.query(
        'SELECT sender_name, message, created_at FROM private_messages WHERE (sender_name = ? AND receiver_name = ?) OR (sender_name = ? AND receiver_name = ?) ORDER BY created_at ASC',
        [senderName, receiverName, receiverName, senderName],
        (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to fetch messages' });
            }
            res.json(results);
        }
    );
});

app.get('/users', (req, res) => {
    pool.query('SELECT name FROM users', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to fetch users' });
        }
        res.json(results);
    });
});

app.post('/compile', async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ message: 'Code and language are required.' });
    }

    // Map language to JDoodle API language identifiers
    const languageMap = {
        python: 'python3',
        java: 'java',
        cpp: 'cpp17',
        c: 'c'
    };

    const jdoodleLanguage = languageMap[language];
    if (!jdoodleLanguage) {
        return res.status(400).json({ message: 'Unsupported language.' });
    }

    console.log('Code:', code); // Debugging
    console.log('Language:', jdoodleLanguage); // Debugging

    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', {
            script: code,
            language: jdoodleLanguage,
            versionIndex: '0',
            stdin: req.body.stdin || '',
            clientId: process.env.JD_CLIENT_ID || 'd56c7091f74dafa0489c4c29fe0042ce', // JDoodle Client ID from env
            clientSecret: process.env.JD_CLIENT_SECRET || 'b71cbf41fccb8514f597c5ee9c501ffa401b039f8f2603dd92811f15654f2a12' // JDoodle Client Secret from env
        });

        console.log('JDoodle Response:', response.data); // Debugging

        const { output, statusCode, memory, cpuTime } = response.data;
        res.json({ output, statusCode, memory, cpuTime });
    } catch (error) {
        console.error('Error executing code:', error.response?.data || error.message); // Debugging
        res.status(500).json({ message: 'Error executing code.', error: error.response?.data || error.message });
    }
});
//reset password endpoint
const path = require('path');

app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'resetpassword.html'));
});
app.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: 'Hashing error' });

        pool.query('UPDATE users SET password = ? WHERE email = ?', [hash, email], (err2, result) => {
            if (err2) return res.status(500).json({ message: 'Database error' });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Email not found' });
            res.json({ message: 'Password reset successfully!' });
        });
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// Get all Java concepts
app.get('/api/java-concepts', (req, res) => {
    pool.query('SELECT * FROM java_concepts ORDER BY id ASC', (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        res.json(results);
    });
});

// Add a new concept
app.post('/api/java-concepts', (req, res) => {
    const { title, theory, video_urls, pdf_link } = req.body;
    const videoUrlsJSON = JSON.stringify(video_urls);

    pool.query(
        'INSERT INTO java_concepts (title, theory, video_urls, pdf_link) VALUES (?, ?, ?, ?)',
        [title, theory, videoUrlsJSON, pdf_link],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Insert failed' });
            res.json({ message: 'Concept added!' });
        }
    );
});

// Update concept
app.put('/api/java-concepts/:id', (req, res) => {
    const { id } = req.params;
    const { title, theory, video_urls, pdf_link } = req.body;
    const videoUrlsJSON = JSON.stringify(video_urls);

    pool.query(
        'UPDATE java_concepts SET title = ?, theory = ?, video_urls = ?, pdf_link = ? WHERE id = ?',
        [title, theory, videoUrlsJSON, pdf_link, id],
        (err) => {
            if (err) return res.status(500).json({ message: 'Update failed' });
            res.json({ message: 'Concept updated!' });
        }
    );
});

// Delete concept
app.delete('/api/java-concepts/:id', (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM java_concepts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: 'Delete failed' });
        res.json({ message: 'Concept deleted!' });
    });
});
// Save quiz score API
app.post('/api/save-quiz-score', (req, res) => {
    const { email, quiz, score, total } = req.body;

    if (!email || !quiz || score == null || total == null) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    pool.query(
        'INSERT INTO quiz_scores (email, quiz, score, total) VALUES (?, ?, ?, ?)',
        [email.toLowerCase(), quiz, score, total],
        (err, result) => {
            if (err) {
                console.error('❌ Error saving quiz score:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(200).json({ message: '✅ Score saved successfully' });
        }
    );
});
app.get('/api/get-quiz-scores', (req, res) => {
    pool.query(
        'SELECT email, quiz, MAX(score) as top_score, COUNT(*) as attempts FROM quiz_scores GROUP BY email, quiz',
        (err, results) => {
            if (err) {
                console.error('Error fetching quiz scores:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.json(results);
        }
    );
});
app.get('/api/leaderboard', (req, res) => {
    pool.query(`
        SELECT quiz, email, MAX(score) AS top_score
        FROM quiz_scores
        GROUP BY quiz, email
        ORDER BY quiz, top_score DESC
    `, (err, results) => {
        if (err) {
            console.error('Error fetching leaderboard:', err);
            return res.status(500).json({ message: 'DB error' });
        }
        res.json(results);
    });
});










