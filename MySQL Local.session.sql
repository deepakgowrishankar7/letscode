
USE mydatabase;
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Notifications table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    content_title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dismissed notifications table
CREATE TABLE dismissed_notifications (
    user_email VARCHAR(255) NOT NULL,
    notification_id INT NOT NULL,
    PRIMARY KEY (user_email, notification_id)
);

-- Public messages table
CREATE TABLE public_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Private messages table
CREATE TABLE private_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    receiver_name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Java concepts table
CREATE TABLE java_concepts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    theory TEXT,
    video_urls TEXT,
    pdf_link VARCHAR(255)
);

-- Quiz scores table
CREATE TABLE quiz_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    quiz VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    total INT NOT NULL
);
