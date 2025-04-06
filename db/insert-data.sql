-- Users table
CREATE TABLE users (
    userid INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    CHECK (role IN ('CLIENT', 'ADMIN'))
);

-- Categories table
CREATE TABLE categories (
    categoryid INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    CHECK (status IN ('ACTIVE', 'INACTIVE'))
);

-- Products table
CREATE TABLE products (
    productid INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    unit_price REAL NOT NULL CHECK (unit_price > 0),
    status TEXT NOT NULL,
    categorie INTEGER,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (categorie) REFERENCES categories(categoryid),
    CHECK (status IN ('AVAILABLE', 'UNAVAILABLE'))
);

-- Orders table
CREATE TABLE orders (
    orderid INTEGER PRIMARY KEY AUTOINCREMENT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL,
    user INTEGER NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user) REFERENCES users(userid),
    CHECK (status IN ('NEW', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'))
);

-- Orders items table (junction table between orders and products)
CREATE TABLE orders_items (
    order_product INTEGER PRIMARY KEY AUTOINCREMENT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    commande INTEGER NOT NULL,
    product INTEGER NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (commande) REFERENCES orders(orderid),
    FOREIGN KEY (product) REFERENCES products(productid)
);

-- Tickets table
CREATE TABLE tickets (
    ticketid INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    user INTEGER NOT NULL,
    order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user) REFERENCES users(userid),
    FOREIGN KEY (order) REFERENCES orders(orderid),
    CHECK (status IN ('NEW', 'IN_PROGRESS', 'CLOSED'))
);

-- Insert sample data for testing

-- Sample users
INSERT INTO users (first_name, last_name, role) VALUES 
('Admin', 'User', 'ADMIN'),
('John', 'Doe', 'CLIENT'),
('Jane', 'Smith', 'CLIENT'),
('Marc', 'Johnson', 'CLIENT'),
('Sophie', 'Martin', 'CLIENT');

-- Sample categories
INSERT INTO categories (name, description, status) VALUES 
('Living Room', 'Furniture and decoration for your living room', 'ACTIVE'),
('Bedroom', 'Everything you need for a cozy bedroom', 'ACTIVE'),
('Kitchen', 'Modern kitchen furniture and accessories', 'ACTIVE'),
('Office', 'Professional and comfortable office furniture', 'ACTIVE'),
('Bathroom', 'Bathroom furniture and accessories', 'ACTIVE'),
('Outdoor', 'Garden and patio furniture', 'INACTIVE');

-- Sample products
INSERT INTO products (name, description, unit_price, status, categorie) VALUES 
('Modern Sofa', 'A comfortable 3-seat sofa with washable covers', 899.99, 'AVAILABLE', 1),
('Coffee Table', 'Wooden coffee table with storage space', 299.50, 'AVAILABLE', 1),
('Queen Bed Frame', 'Durable queen-sized bed frame with headboard', 599.99, 'AVAILABLE', 2),
('Office Desk', 'Ergonomic office desk with drawers', 449.99, 'AVAILABLE', 4),
('Kitchen Island', 'Multifunctional kitchen island with storage', 749.99, 'AVAILABLE', 3),
('Bedside Table', 'Elegant bedside table with drawer', 149.99, 'AVAILABLE', 2),
('Dining Table', 'Extendable dining table for 6-8 people', 599.99, 'AVAILABLE', 3),
('Bookshelf', 'Tall bookshelf with adjustable shelves', 249.99, 'AVAILABLE', 1),
('Armchair', 'Comfortable armchair with footrest', 399.99, 'AVAILABLE', 1),
('Bathroom Cabinet', 'Wall-mounted bathroom cabinet with mirror', 199.99, 'AVAILABLE', 5),
('Garden Set', 'Table and 4 chairs for outdoor use', 499.99, 'UNAVAILABLE', 6);

-- Sample orders
INSERT INTO orders (order_date, status, user) VALUES 
('2024-04-01 10:30:00', 'NEW', 2),
('2024-04-02 14:15:00', 'PROCESSING', 3),
('2024-03-28 09:45:00', 'SHIPPED', 4),
('2024-03-15 16:20:00', 'DELIVERED', 5),
('2024-04-04 11:10:00', 'CANCELLED', 2);

-- Sample order items
INSERT INTO orders_items (quantity, commande, product) VALUES 
(1, 1, 1),  -- Order 1: 1 Modern Sofa
(2, 1, 2),  -- Order 1: 2 Coffee Tables
(1, 2, 3),  -- Order 2: 1 Queen Bed Frame
(1, 2, 6),  -- Order 2: 1 Bedside Table
(1, 3, 4),  -- Order 3: 1 Office Desk
(1, 3, 8),  -- Order 3: 1 Bookshelf
(1, 4, 5),  -- Order 4: 1 Kitchen Island
(6, 4, 7),  -- Order 4: 6 Dining Tables
(1, 5, 9);  -- Order 5: 1 Armchair

-- Sample tickets
INSERT INTO tickets (title, description, status, user, order, created_at) VALUES 
('Delivery Question', 'When can I expect my order to be delivered?', 'NEW', 2, 1, '2024-04-02 08:15:00'),
('Damaged Product', 'My coffee table arrived with a scratch on the surface', 'IN_PROGRESS', 3, 2, '2024-04-03 10:30:00'),
('Order Cancellation', 'I would like to cancel my recent order', 'CLOSED', 5, 4, '2024-03-16 09:45:00'),
('Missing Parts', 'The bookshelf is missing some screws and assembly instructions', 'NEW', 4, 3, '2024-04-01 14:20:00'),
('Return Request', 'The armchair does not match my interior, I would like to return it', 'IN_PROGRESS', 2, 5, '2024-04-05 11:05:00');