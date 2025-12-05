// Prevent back navigation to login page
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.pushState(null, null, location.href);
  };

// Show only the selected section, hide all others
function showSection(sectionId) {
    // Hide all main sections
    document.querySelectorAll(
        '.dashboard-overview, .my-courses, .notifications, .settings, .compiler-section, .user-communication-section, .course-details-section'
    ).forEach(sec => sec.style.display = 'none');

    // Remove 'active-section' class from all
    document.querySelectorAll('.dashboard-overview, .my-courses').forEach(sec => sec.classList.remove('active-section'));

    // Remove 'active' class from all sidebar links
    document.querySelectorAll('.sidebar nav a').forEach(link => link.classList.remove('active'));

    // Show the selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        section.classList.add('active-section');
    }

    // Update sidebar active link:
    // - Home
    // - Courses (including course sections)
    // - Notifications
    // - Settings
    // - Compiler
    // - Communication

    if (sectionId === 'home') {
        document.querySelector('.sidebar nav a[onclick*="showSection(\'home\')"]').classList.add('active');
    } else if (sectionId === 'courses' || sectionId.endsWith('-course')) {
        // If Courses or any Course Section is selected → activate Courses link
        document.querySelector('.sidebar nav a[onclick*="showSection(\'courses\')"]').classList.add('active');
    } else if (sectionId === 'notifications') {
        document.querySelector('.sidebar nav a[onclick*="showSection(\'notifications\')"]').classList.add('active');
        fetchNotifications();
    } else if (sectionId === 'settings') {
        document.querySelector('.sidebar nav a[onclick*="showSection(\'settings\')"]').classList.add('active');
    } else if (sectionId === 'visualizer') {
    document.querySelector('.sidebar nav a[onclick*="showSection(\'visualizer\')"]').classList.add('active');
    } else if (sectionId === 'user-Communication') {
    document.querySelector('.sidebar nav a[onclick*="showSection(\'user-Communication\')"]').classList.add('active');
    }else if (sectionId === 'score-dashboard') {
    document.querySelector('.sidebar nav a[onclick*="showSection(\'score-dashboard\')"]').classList.add('active');
    renderScoreDashboard(); // ← Load dashboard data
    } else if (sectionId === 'compiler') {
        document.querySelector('.sidebar nav a[onclick*="showSection(\'compiler\')"]').classList.add('active');
        attachCompilerButtonListener();
       const fullscreenBtn = document.getElementById('toggle-fullscreen');
const icon = document.getElementById('compiler-fullscreen-icon');
const label = document.getElementById('compiler-fullscreen-label');

if (fullscreenBtn && icon && label) {
    fullscreenBtn.addEventListener('click', () => {
        const compilerSection = document.getElementById('compiler');
        if (!document.fullscreenElement) {
            compilerSection.requestFullscreen().then(() => {
                icon.textContent = "❌";
                label.textContent = "Exit Fullscreen";
            }).catch(err => {
                alert(`Error enabling fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            icon.textContent = "🖥️";
            label.textContent = "Fullscreen View";
        }
    });
}
    } else if (sectionId === 'communication') {
        document.querySelector('.sidebar nav a[onclick*="showSection(\'communication\')"]').classList.add('active');
    }
}
document.getElementById('toggle-visualizer-fullscreen').onclick = function() {
  const visualizer = document.getElementById('visualizer');
  if (visualizer.requestFullscreen) {
    visualizer.requestFullscreen();
  } else if (visualizer.webkitRequestFullscreen) { /* Safari */
    visualizer.webkitRequestFullscreen();
  } else if (visualizer.msRequestFullscreen) { /* IE11 */
    visualizer.msRequestFullscreen();
  }
};
// Example tab switchers for course content (repeat for each course)
function showJavaContent(tab) {
    document.querySelectorAll('.java-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`java-content-${tab}`).style.display = 'block';
}
function showCppContent(tab) {
    document.querySelectorAll('.cpp-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`cpp-content-${tab}`).style.display = 'block';
}
function showPythonContent(tab) {
    document.querySelectorAll('.python-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`python-content-${tab}`).style.display = 'block';
}
function showCContent(tab) {
    document.querySelectorAll('.c-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`c-content-${tab}`).style.display = 'block';
}
function showHtmlContent(tab) {
    document.querySelectorAll('.html-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`html-content-${tab}`).style.display = 'block';
}
function showSqlContent(tab) {
    document.querySelectorAll('.sql-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`sql-content-${tab}`).style.display = 'block';
}

function showReactContent(tab) {
    document.querySelectorAll('.react-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`react-content-${tab}`).style.display = 'block';
}
function showAwsContent(tab) {
    document.querySelectorAll('.aws-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`aws-content-${tab}`).style.display = 'block';
}
function showDbmsContent(tab) {
    document.querySelectorAll('.dbms-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`dbms-content-${tab}`).style.display = 'block';
}

function showDsContent(tab) {
    document.querySelectorAll('.ds-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`ds-content-${tab}`).style.display = 'block';
}

function showDataAnalysisContent(tab) {
    document.querySelectorAll('.data-analysis-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`data-analysis-content-${tab}`).style.display = 'block';
}

function showNodejsContent(tab) {
    document.querySelectorAll('.nodejs-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`nodejs-content-${tab}`).style.display = 'block';
}

function showFigmaContent(tab) {
    document.querySelectorAll('.figma-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`figma-content-${tab}`).style.display = 'block';
}

function showEthicalHackingContent(tab) {
    document.querySelectorAll('.ethical-hacking-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`ethical-hacking-content-${tab}`).style.display = 'block';
}

function showPhotoshopContent(tab) {
    document.querySelectorAll('.photoshop-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`photoshop-content-${tab}`).style.display = 'block';
}

function showDesignThinkingContent(tab) {
    document.querySelectorAll('.design-thinking-content-block').forEach(block => block.style.display = 'none');
    document.getElementById(`design-thinking-content-${tab}`).style.display = 'block';
}


// Change Email function
function changeEmail() {
    const newEmail = document.getElementById('change-email').value.trim();
    const oldEmail = document.getElementById('settings-email').textContent.trim(); // Current email displayed in the settings

    if (newEmail) {
    fetch('http://localhost:3888/change-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldEmail, newEmail })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Email changed successfully!') {
                alert('Email changed successfully!');
                document.getElementById('settings-email').textContent = newEmail; // Update the displayed email
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the email.');
        });
    } else {
        alert('Please enter a new email.');
    }
}

// Change Password function
function changePassword() {
    const currentPassword = document.getElementById('current-password').value.trim();
    const newPassword = document.getElementById('change-password').value.trim();
    const email = document.getElementById('settings-email').textContent.trim(); // Assuming email is displayed in the settings

    console.log('Email:', email); // Debugging email

    if (currentPassword && newPassword) {
    fetch('http://localhost:3888/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, currentPassword, newPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Password changed successfully!') {
                alert('Password changed successfully!');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the password.');
        });
    } else {
        alert('Please enter both the current and new passwords.');
    }
}

// Logout function
function logout() {
    // Clear any session or localStorage data if needed
    localStorage.clear();

    // Redirect to the login page
    window.location.href = 'index.html';
}

// Light/Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
function updateThemeBtn() {
    if (document.body.classList.contains('light-mode')) {
        themeToggle.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    updateThemeBtn();
    updateCompilerSelectColor();
});

function updateCompilerSelectColor() {
    const select = document.getElementById('compiler-language');
    if (!select) return;
    if (document.body.classList.contains('light-mode')) {
        select.style.color = "#222"; // dark text for light mode
        select.style.background = "#fff";
    } else {
        select.style.color = "#fff"; // light text for dark mode
        select.style.background = "#141e17";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
const codeInput = document.querySelector('.compiler-editor');
const inputField = document.getElementById('compiler-user-input');
const chatInput = document.getElementById("public-chat-input");
const typingStatus = document.getElementById("typing-status");
let typingTimer;
chatInput.addEventListener("input", () => {
  typingStatus.textContent = "Typing...";
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    typingStatus.textContent = "";
  }, 1000);
});

if (codeInput) codeInput.value = localStorage.getItem('lastCode') || '';
if (inputField) inputField.value = localStorage.getItem('lastInput') || '';

    enableConceptFullscreen();
    try {
        const email = localStorage.getItem('loggedInEmail'); // Retrieve the logged-in email from localStorage
        console.log('Logged-in email:', email); // Debugging email

        if (!email) {
            console.error('No email found in localStorage');
            document.getElementById('settings-username').textContent = 'Error fetching data';
            document.getElementById('settings-email').textContent = 'Error fetching data';
            return;
        }

    const response = await fetch(`http://localhost:3888/api/user-details?email=${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const userDetails = await response.json();
            console.log('User details fetched:', userDetails); // Debugging response

            // Populate the account details in the Settings section
            document.getElementById('settings-username').textContent = userDetails.name || 'N/A';
            document.getElementById('settings-email').textContent = userDetails.email || 'N/A';
        } else {
            console.error('Failed to fetch user details:', response.statusText);
            document.getElementById('settings-username').textContent = 'Error fetching data';
            document.getElementById('settings-email').textContent = 'Error fetching data';
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        document.getElementById('settings-username').textContent = 'Error fetching data';
        document.getElementById('settings-email').textContent = 'Error fetching data';
    }

    showSection('home');
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    // updateThemeBtn();
    function updateThemeBtn() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    if (document.body.classList.contains('light-mode')) {
        btn.textContent = 'Dark Mode';
    } else {
        btn.textContent = 'Light Mode';
    }
}

    // updateCompilerSelectColor();
    function updateCompilerSelectColor() {
    const select = document.getElementById('compiler-language');
    if (!select) return;

    if (document.body.classList.contains('light-mode')) {
        select.style.backgroundColor = '#fff';
        select.style.color = '#222';
    } else {
        select.style.backgroundColor = '';
        select.style.color = '';
    }
}


    // Search functionality for courses (works from any section)
    const searchInput = document.querySelector('header input[type="text"]');
    const courseSection = document.getElementById('courses');
    const courseCards = document.querySelectorAll('.my-courses .course-card');
    const noCourseMsg = document.getElementById('no-course-message');

    // Notification search logic
    const notificationCards = document.querySelectorAll('#notifications .course-card');
    const noNotificationMsgId = 'no-notification-message';

    // Create the "No notification found" message if it doesn't exist
    let noNotificationMsg = document.getElementById(noNotificationMsgId);
    if (!noNotificationMsg) {
        const notifSection = document.getElementById('notifications');
        noNotificationMsg = document.createElement('div');
        noNotificationMsg.id = noNotificationMsgId;
        noNotificationMsg.style.display = 'none';
        noNotificationMsg.style.color = 'var(--text-main)';
        noNotificationMsg.style.marginTop = '20px';
        noNotificationMsg.style.fontSize = '1.1em';
        noNotificationMsg.style.textAlign = 'center';
        noNotificationMsg.textContent = 'No notification found';
        notifSection.appendChild(noNotificationMsg);
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            // Always show the courses section when searching
            showSection('courses');
            const query = this.value.trim().toLowerCase();
            let found = false;
            courseCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = '';
                    found = true;
                } else {
                    card.style.display = 'none';
                }
            });
            if (!found) {
                noCourseMsg.style.display = '';
            } else {
                noCourseMsg.style.display = 'none';
            }

            // Notifications search
            let notifFound = false;
            notificationCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = '';
                    notifFound = true;
                } else {
                    card.style.display = 'none';
                }
            });
            if (!notifFound) {
                noNotificationMsg.style.display = '';
            } else {
                noNotificationMsg.style.display = 'none';
            }
        });
    }
    const javaConceptData = {
    packages: `
        <strong>Java Packages:</strong><br>
        Packages help organize your classes.<br><br>
        <strong>Built-in Packages:</strong><br>
        Examples: <code>java.util</code>, <code>java.io</code>, <code>java.net</code><br><br>
        <strong>User-defined Packages:</strong><br>
        You can create packages using <code>package</code> keyword.
    `,
    class: `Classes define the structure of objects. They contain variables and methods. Access modifiers: public, private, protected.`,
    datatypesandvariables: `Primitive (int, float, boolean) and Non-Primitive (arrays, strings, classes). Variables are used to store values.`,
    methods: `Methods define actions. They can be called to perform operations. Supports method overloading.`,
    operationsandcontrolstatments: `Operators include arithmetic, logical, relational. Control statements: if, else, switch, loops.`,
    constructorsandobjects: `Constructors initialize new objects. Java has default and parameterized constructors.`,
    loops: `For loop, While loop, Do-while loop used for repeating tasks.`,
    arrays: `Arrays store multiple values in a single variable. Supports single and multi-dimensional.`,
    strings: `Strings are sequences of characters. Immutable. Use StringBuilder for performance.`,
    oops: `OOP Principles: Inheritance, Encapsulation, Abstraction, Polymorphism.`,
    files: `Java File I/O: Use classes like FileReader, FileWriter, BufferedReader, etc.`,
    pojo: `POJO: Plain Old Java Object — no special rules. Beans follow JavaBean standards.`,
    collections: `Collection Framework includes List, Set, Map. Classes: ArrayList, HashSet, HashMap.`,
    exception: `Handle runtime issues using try-catch-finally. Use throw/throws for custom exceptions.`
};

    // Full concept search
const conceptSearchInput = document.getElementById('concept-search');
const conceptButtons = document.querySelectorAll('#concept-buttons button');
const conceptContentArea = document.getElementById('java-concept-content');

if (conceptSearchInput) {
    conceptSearchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        let foundMatch = false;

        // Clear concept content view
        conceptContentArea.innerHTML = '';

        // Loop through each concept
        Object.keys(javaConceptData).forEach(key => {
            const content = javaConceptData[key].toLowerCase();
            const label = key.toLowerCase();

            const matched = label.includes(query) || content.includes(query);

            // Filter button visibility
            const btn = document.querySelector(`#concept-buttons button[onclick*="${key}"]`);
            if (btn) btn.style.display = matched ? '' : 'none';

            // Show matching concept content
            if (query && matched) {
                conceptContentArea.innerHTML += `
                    <div class="concept-result-block">
                        <h3>${key.toUpperCase()}</h3>
                        <p>${javaConceptData[key]}</p>
                        <hr style="margin: 12px 0;">
                    </div>
                `;
                foundMatch = true;
            }
        });

        if (!foundMatch && query !== '') {
            conceptContentArea.innerHTML = `<p style="margin-top:10px;">No matching concept found.</p>`;
        } else if (!query) {
            conceptContentArea.innerHTML = `<p>Select a concept to view details.</p>`;
        }
    });
}

    // ✅ Notification section enhancements
const notifSearchInput = document.getElementById('notification-search');
const noNotifMsg = document.getElementById('no-notification-message');

if (notifSearchInput) {
  notifSearchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    const notifCards = document.querySelectorAll('.notification-card'); // <== move this INSIDE the handler

    let anyVisible = false;
    notifCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = '';
        anyVisible = true;
      } else {
        card.style.display = 'none';
      }
    });

    if (noNotifMsg) {
      noNotifMsg.style.display = anyVisible ? 'none' : '';
    }
  });
}

    await fetchNotifications();
    
});
    


// Registration logic (example)
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();

    const response = await fetch('http://localhost:3888/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        if (data.message === 'Registered successfully') {
            localStorage.setItem('loggedInEmail', email);
        } else {
            alert(data.message);
        }
    });
}

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
}

async function fetchNotifications() {
    try {
        const email = localStorage.getItem('loggedInEmail');

        const [notificationsRes, dismissedRes] = await Promise.all([
            fetch('http://localhost:3888/notifications'),
            fetch(`http://localhost:3888/dismissed-notifications?email=${email}`)
        ]);

        const notifications = await notificationsRes.json();
        const dismissed = await dismissedRes.json(); // array of dismissed notification IDs

        const visibleNotifications = notifications.filter(n => !dismissed.includes(n.id));

        const notificationList = document.getElementById('notification-list');
        notificationList.innerHTML = ''; // Clear existing cards

      visibleNotifications.forEach(notification => {
  const card = document.createElement('div');
  card.className = 'notification-card unread';

  // ✅ Add the innerHTML assignment RIGHT HERE:
  card.innerHTML = `
    <div class="notification-icon">🔔</div>
    <div class="notification-content">
      <p><strong>${notification.content_title}:</strong> ${linkify(notification.content)}</p>
      <span class="notification-time">${new Date(notification.created_at).toLocaleString()}</span>
    </div>
    <button class="delete-notification-btn" data-id="${notification.id}">🗑️</button>
  `;

  document.getElementById('notification-list').appendChild(card);
});


        // Add delete logic
        document.querySelectorAll('.delete-notification-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const notificationId = button.dataset.id;

                try {
                    await fetch('http://localhost:3888/notifications/dismiss', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, notificationId })
                    });

                    button.parentElement.remove(); // just remove from UI
                } catch (err) {
                    console.error('Dismiss failed:', err);
                }
            });
        });

    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
}

// Fetch notifications when the page loads


// Chat functionality
function showChat(chatType) {
    const publicChat = document.getElementById('public-chat');
    const privateChat = document.getElementById('private-chat');

    if (chatType === 'public') {
        publicChat.style.display = 'block';
        privateChat.style.display = 'none';
    } else if (chatType === 'private') {
        publicChat.style.display = 'none';
        privateChat.style.display = 'block';
        populateUserList(); // Populate user list when switching to private chat
    }
}

async function populateUserList() {
    try {
    const response = await fetch('http://localhost:3888/users'); // Endpoint to fetch registered users
        const users = await response.json();
        const userList = document.getElementById('private-user-list');
        userList.innerHTML = ''; // Clear existing users

        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.textContent = user.name; // Assuming `name` is the user's identifier
            userElement.onclick = () => selectUser(user.name); // Set user for private chat
            userList.appendChild(userElement);
        });
    } catch (error) {
        console.error('Error fetching user list:', error);
    }
}

function searchUser() {
    const searchInput = document.getElementById('private-user-search').value.toLowerCase();
    const userList = document.getElementById('private-user-list');
    const users = userList.querySelectorAll('div');

    users.forEach(user => {
        if (user.textContent.toLowerCase().includes(searchInput)) {
            user.style.display = 'block';
        } else {
            user.style.display = 'none';
        }
    });
}

function selectUser(userName) {
    localStorage.setItem('selectedUser', userName); // Store selected user in localStorage
    alert(`You are now chatting with ${userName}`);
}

async function sendPrivateMessage() {
    const senderName = localStorage.getItem('loggedInUserName'); // Assume username is stored in localStorage
    const receiverName = localStorage.getItem('selectedUser'); // Get selected user from localStorage
    const message = document.getElementById('private-chat-input').value.trim();

    if (message && receiverName) {
        try {
            const response = await fetch('http://localhost:3888/private-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderName, receiverName, message })
            });

            if (response.ok) {
                document.getElementById('private-chat-input').value = ''; // Clear input
                fetchPrivateMessages(receiverName); // Refresh messages
            } else {
                console.error('Failed to send private message:', response.statusText);
                alert('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending private message:', error);
            alert('An error occurred while sending the message.');
        }
    } else {
        alert('Please select a user and type a message before sending.');
    }
}

async function sendPublicMessage() {
    const userName = localStorage.getItem('loggedInUserName'); // Ensure username is stored in localStorage
    const message = document.getElementById('public-chat-input').value.trim();

    if (message) {
        try {
            const response = await fetch('http://localhost:3888/public-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, message })
            });

            if (response.ok) {
                document.getElementById('public-chat-input').value = ''; // Clear input
                fetchPublicMessages(); // Refresh messages
            } else {
                console.error('Failed to send public message:', response.statusText);
                alert('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending public message:', error);
            alert('An error occurred while sending the message.');
        }
    } else {
        alert('Please type a message before sending.');
    }
}

async function fetchPublicMessages() {
    try {
    const response = await fetch('http://localhost:3888/public-messages', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const messages = await response.json();
            const publicChatMessages = document.getElementById('public-chat-messages');
            publicChatMessages.innerHTML = ''; // Clear existing messages

            messages.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `${msg.user_name}: ${msg.message}`;
                publicChatMessages.appendChild(messageElement);
            });
        } else {
            console.error('Failed to fetch public messages:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching public messages:', error);
    }
}

async function fetchPrivateMessages(receiverName) {
    const senderName = localStorage.getItem('loggedInUserName'); // Assume username is stored in localStorage

    try {
    const response = await fetch(`http://localhost:3888/private-messages?senderName=${senderName}&receiverName=${receiverName}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const messages = await response.json();
            const privateChatMessages = document.getElementById('private-chat-messages');
            privateChatMessages.innerHTML = ''; // Clear existing messages

            messages.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `${msg.sender_name}: ${msg.message}`;
                privateChatMessages.appendChild(messageElement);
            });
        } else {
            console.error('Failed to fetch private messages:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching private messages:', error);
    }
}
async function loadJavaConcepts() {
    try {
    const res = await fetch('http://localhost:3888/api/java-concepts');
        const data = await res.json();

        const container = document.getElementById('java-content-concepts');
        container.innerHTML = '';

        data.forEach(item => {
            // const videos = JSON.parse(item.video_urls);
            let videos = [];
try {
    videos = JSON.parse(item.video_urls);
} catch (e) {
    console.warn('Invalid video_urls format:', item.video_urls);
}
            const html = `
                <div class="concept-block">
                    <h3>${item.title}</h3>
                    <p>${item.theory}</p>
                    ${videos.map(url => `<iframe width="400" height="220" src="${url}" frameborder="0"></iframe>`).join('')}
                    <p><a href="${item.pdf_link}" target="_blank">Download PDF</a></p>
                    <hr/>
                </div>
            `;
            container.innerHTML += html;
        });
    } catch (err) {
        console.error('Error loading Java concepts:', err);
    }
}
// function showJavaContent(tab) {
//     // Hide all blocks
//     document.querySelectorAll('.java-content-block').forEach(block => block.style.display = 'none');

//     // Show selected block
//     const selectedBlock = document.getElementById(`java-content-${tab}`);
//     if (selectedBlock) {
//         selectedBlock.style.display = 'block';
//         if (tab === 'concepts') {
//             const conceptArea = document.getElementById("java-concept-content");
//             if (conceptArea) {
//                 conceptArea.innerHTML = `<p>Select a concept to view details.</p>`;
//             }
//         }
//     }
// }
function showJavaContent(tab) {
    // Hide all content blocks
    document.querySelectorAll('.java-content-block').forEach(block => block.style.display = 'none');

    // Show selected content block
    const target = document.getElementById(`java-content-${tab}`);
    if (target) target.style.display = 'block';

    // Highlight active tab
    document.querySelectorAll('#java-course .course-sidebar .course-topic').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeTab = document.querySelector(`#java-course .course-sidebar .course-topic[onclick*="${tab}"]`);
    if (activeTab) activeTab.classList.add('active');

    // ✅ Attach listeners AFTER the quiz tab becomes visible
    if (tab === 'quiz') {
        // Delay attachment to allow DOM render
        setTimeout(() => {
            const buttons = [
                ["quiz1Btn", "quiz1"],
                ["quiz2Btn", "quiz2"],
                ["quiz3Btn", "quiz3"],
                ["quiz4Btn", "quiz4"],
                ["quiz5Btn", "quiz5"]
            ];
            buttons.forEach(([btnId, level]) => {
                const btn = document.getElementById(btnId);
                 if (btn && !btn.dataset.bound) {
                btn.addEventListener("click", () => {
                    // ✅ Remove active from all
                    buttons.forEach(([id]) => {
                        const b = document.getElementById(id);
                        if (b) b.classList.remove("active");
                    });

                    // ✅ Add active to the clicked one
                    btn.classList.add("active");

                    // ✅ Load quiz
                    renderQuiz(level);
                });
                btn.dataset.bound = "true";
                }
            });
        }, 100); // Short delay to ensure DOM is ready
    }
}
function loadJavaConcept(concept) {
    const conceptContent = document.getElementById("java-concept-content");

    if (!conceptContent) {
        console.error("Element with ID 'java-concept-content' not found.");
        return;
    }

    const filePath = `concepts/java/${concept}.html`;

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(data => {
            console.log("Fetched content:", data.slice(0, 100));  // Show preview
            conceptContent.innerHTML = data;
        })
        .catch(error => {
            console.error("Error loading concept file:", error);
            conceptContent.innerHTML = `<p style="color:red;">Error loading concept file: ${error.message}</p>`;
        });

    // Optional: Highlight active button
    document.querySelectorAll('.concepts-submenu button').forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.concepts-submenu button[onclick="loadJavaConcept('${concept}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}



//document.querySelector(".tutorial-bar").style.position = "fixed";
   
function attachCompilerButtonListener() {
    const runButton = document.querySelector('.compiler-run-btn');
    const tutorialBar = document.querySelector('.tutorial-bar');

    // Safely update tutorial bar position
    if (tutorialBar) {
        tutorialBar.style.position = "fixed";
    }

    if (runButton) {
        runButton.addEventListener('click', async function () {
            runButton.textContent = "Running...";
runButton.disabled = true;

            const codeInput = document.querySelector('.compiler-editor');
            const languageSelect = document.getElementById('compiler-language');
            const outputArea = document.querySelector('.compiler-output');

            if (!codeInput || !languageSelect || !outputArea) {
                console.warn('Required compiler elements not found.');
                return;
            }

let code = codeInput.value.trim();
const userInput = document.getElementById('compiler-user-input')?.value || '';

localStorage.setItem('lastCode', code);
localStorage.setItem('lastInput', userInput);


const inputLines = userInput.split('\n');
let inputIndex = 0;
if (code.includes('input') && userInput.trim() === '') {
    alert("Your code uses input(), but no input was provided.");
    return;
}
code = code.replace(/input\([^)]*\)/g, () => {
    const val = inputLines[inputIndex++] || '';
    const safeVal = val.trim().replace(/"/g, '\\"');  // Escape quotes
    return `"${safeVal}"`;
});
            const language = languageSelect.value;

            try {
                const response = await fetch('http://localhost:3888/compile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({
                    code,
                    language,
                    stdin: userInput   // ✅ <== INSERT HERE
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    outputArea.textContent = `Output:\n${data.output}`;
                    outputArea.textContent += `\nMemory Used: ${data.memory}`;
                    outputArea.textContent += `\nCPU Time: ${data.cputime}`;
                } else {
                    outputArea.textContent = `Error:\n${data.message}`;
                }
           } catch (error) {
    outputArea.textContent = `Network Error:\n${error.message}`;
} finally {
    runButton.textContent = "Run";
    runButton.disabled = false;
}

        });
    } else {
        console.warn("Run button not found. Is the compiler section visible?");
    }
}

function enableConceptFullscreen() {
  const btn = document.getElementById("toggle-concept-fullscreen");
  const content = document.getElementById("java-content-concepts");
  const icon = document.getElementById("fullscreen-icon");
  const label = document.getElementById("fullscreen-label");

  if (!btn || !content) return;

  btn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      content.requestFullscreen().then(() => {
        icon.textContent = "❌";
        label.textContent = "Exit Fullscreen";
      }).catch(err => {
        alert(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });
  // Listen for exiting via Esc or other means
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      icon.textContent = "🖥️";
      label.textContent = "Fullscreen View";
    }
  });
}

function runVisualizer() {
    const code = document.getElementById('visualizer-editor').value.trim();
    let langValue = document.getElementById('visualizer-language').value;

    if (!code || !langValue) {
        alert("Please enter code and select a language.");
        return;
    }

    // Fix: Extract language part correctly
    if (langValue.startsWith("py=")) {
        langValue = langValue.split("=")[1];  // get just "3", "java", etc.
    }

    const encodedCode = encodeURIComponent(code);
    const baseUrl = "https://pythontutor.com/iframe-embed.html";
    const iframeSrc = `${baseUrl}#code=${encodedCode}&origin=optfrontend.js&cumulative=false&heapPrimitives=false&textReferences=false&mode=edit&py=${langValue}`;

    const iframe = document.getElementById('visualizer-frame');
    iframe.src = ""; // Clear old
    setTimeout(() => {
        iframe.src = iframeSrc; // Set new
    }, 100);
}
function checkStrength(pw) {
  const msg = document.getElementById("strength-msg");
  const strong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}/;
  if (strong.test(pw)) {
    msg.textContent = "Strong password 💪";
    msg.style.color = "green";
  } else {
    msg.textContent = "Weak password ⚠️";
    msg.style.color = "red";
  }
}
function renderScoreDashboard() {
    fetch('http://localhost:3888/api/get-quiz-scores')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('scoreDashboardContent');
            if (!container) return;

            const levels = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];
            const courses = ["Java", "C++", "Python", "C", "HTML", "SQL"];

            let html = '';

            for (const course of courses) {
                html += `<h3>${course} Course</h3>`;
                html += `<table><thead><tr><th>Level</th><th>Top Score</th><th>Attempts</th></tr></thead><tbody>`;

                for (const level of levels) {
                    const quizName = `${course} ${level}`;
                    const matched = data.filter(q => q.quiz === quizName);

                    if (matched.length > 0) {
                        const top = matched[0];
                        html += `<tr>
                                    <td>${level}</td>
                                    <td>${top.top_score}</td>
                                    <td>${top.attempts}</td>
                                 </tr>`;
                    } else {
                        html += `<tr><td>${level}</td><td colspan="2">No attempts yet</td></tr>`;
                    }
                }

                html += '</tbody></table>';
            }

            container.innerHTML = html;
            // 🏆 Fetch & render leaderboard into #topUsersTable
fetch('http://localhost:3888/api/leaderboard')
  .then(res => res.json())
  .then(leaderboardData => {
    const leaderboardMap = {};

    leaderboardData.forEach(entry => {
      if (!leaderboardMap[entry.quiz]) leaderboardMap[entry.quiz] = [];
      leaderboardMap[entry.quiz].push(entry);
    });

    let leaderboardHtml = '<h3 style="margin-top:30px;">🏆 Top 5 Users per Quiz</h3>';

    Object.keys(leaderboardMap).forEach(quiz => {
      leaderboardHtml += `<h4>${quiz}</h4><table><thead><tr><th>User</th><th>Top Score</th></tr></thead><tbody>`;
      leaderboardMap[quiz].slice(0, 5).forEach(row => {
        leaderboardHtml += `<tr><td>${row.email}</td><td>${row.top_score}</td></tr>`;
      });
      leaderboardHtml += '</tbody></table>';
    });

    const topUserDiv = document.getElementById('topUsersTable');
    if (topUserDiv) topUserDiv.innerHTML = leaderboardHtml;
});
        })
        .catch(err => {
            console.error('❌ Error loading dashboard:', err);
        });
}
