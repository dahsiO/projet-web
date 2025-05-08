-- Users Table
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(6) NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
    status VARCHAR(8) NOT NULL DEFAULT 'ENABLED' CHECK (status IN ('ENABLED', 'DISABLED'))
);

-- Categories Table
CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(11) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'UNAVAILABLE'))
);

-- Products Table
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    category_id INTEGER NOT NULL,
    status VARCHAR(11) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'UNAVAILABLE')),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Orders Table
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    client INTEGER NOT NULL,
    order_date TIMESTAMP,
    status VARCHAR(10) NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    FOREIGN KEY (client) REFERENCES users(user_id)
);

-- Order Items Table
CREATE TABLE order_items (
    order_fk INTEGER NOT NULL,
    product INTEGER NOT NULL,
    unit_price DOUBLE PRECISION,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (order_fk, product),
    FOREIGN KEY (order_fk) REFERENCES orders(order_id),
    FOREIGN KEY (product) REFERENCES products(product_id)
);

-- Tickets Table
CREATE TABLE tickets (
    ticket_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    order_fk INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(11) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'CLOSED')),
    FOREIGN KEY (order_fk) REFERENCES orders(order_id)
);

-- Insert Sample Data

-- Users
INSERT INTO users(first_name, last_name, role) VALUES('Jean', 'Valles', 'admin');
INSERT INTO users(first_name, last_name) VALUES('Abdel', 'Kader');
INSERT INTO users(first_name, last_name, status) VALUES('Alice', 'Johnson', 'DISABLED');
INSERT INTO users(first_name, last_name) VALUES('Martin', 'Dupont');
INSERT INTO users(first_name, last_name) VALUES('Sophie', 'Durand');
INSERT INTO users(first_name, last_name) VALUES('Lucas', 'Moreau');

-- Categories
INSERT INTO categories(name, description) VALUES
('Electronics', 'Devices, gadgets, and accessories'),
('Books', 'Various kinds of books and literature'),
('Clothing', 'Apparel and accessories for men and women'),
('Home & Kitchen', 'Furniture, appliances, and utensils for home and kitchen');

-- Products
INSERT INTO products(name, description, price, category_id) VALUES
('Smartphone', 'Latest model with advanced features', 699.99, 1),
('Laptop', 'High performance laptop for professionals', 1299.49, 1),
('Novel', 'A best-selling fiction book', 14.99, 2),
('T-shirt', 'Cotton t-shirt for daily use', 19.99, 3),
('Microwave Oven', '800W microwave with grill function', 89.99, 4);

-- Orders
INSERT INTO orders(client, order_date) VALUES
(2, CURRENT_TIMESTAMP),
(3, CURRENT_TIMESTAMP),
(4, CURRENT_TIMESTAMP);

-- Order Items
INSERT INTO order_items(order_fk, product, unit_price, quantity) VALUES
(1, 1, 699.99, 1),
(1, 3, 14.99, 2),
(2, 2, 1299.49, 1),
(3, 4, 19.99, 3),
(3, 5, 89.99, 1);

-- Tickets
INSERT INTO tickets(order_fk, title, description) VALUES
(1, 'Late Delivery', 'The delivery is taking longer than expected.'),
(2, 'Wrong Item', 'Received a different laptop model than ordered.'),
(3, 'Damaged Product', 'Microwave was damaged on arrival.');
