-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users
INSERT INTO users (name, email) VALUES 
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Bob Johnson', 'bob@example.com')
ON DUPLICATE KEY UPDATE name=values(name);

-- Insert sample products
INSERT INTO products (name, price, stock) VALUES
('Mechanical Keyboard', 350.00, 15),
('Wireless Mouse', 150.00, 30),
('27-Inch Monitor', 1200.00, 8),
('Gaming Headset', 250.00, 0)
ON DUPLICATE KEY UPDATE price=values(price), stock=values(stock);
