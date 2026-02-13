CREATE TABLE IF NOT EXISTS memories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url LONGTEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS secret_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    message TEXT NOT NULL
);

-- Example Insert for Secret Message
INSERT INTO secret_messages (password, message) VALUES ('mylove', 'Tu meri aadat nahi… meri zarurat hai ❤️');
