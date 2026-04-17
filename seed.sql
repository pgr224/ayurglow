-- Seed Categories
INSERT OR IGNORE INTO categories (id, name, slug, type, sort_order) VALUES 
('cleanser', 'Cleansers', 'cleanser', 'routine', 1),
('serum', 'Serums & Oils', 'serums-oils', 'routine', 2),
('moisturizer', 'Moisturizers', 'moisturizer', 'routine', 3),
('sunscreen', 'Sunscreens', 'sunscreen', 'routine', 4),
('hair-care', 'Hair Care', 'hair-care', 'routine', 5);

-- Seed Initial Products (Matching the lib/products.ts content)
INSERT OR IGNORE INTO products (id, name, slug, category_id, base_price, mrp, is_bestseller, images) VALUES 
('p1', 'Herbal Ubtan Face Wash', 'herbal-ubtan-wash', 'cleanser', 299, 399, 1, '["/images/herbal-ubtan.jpg"]'),
('p2', 'Kumkumadi Night Glow Oil', 'kumkumadi-oil', 'serum', 899, 1199, 1, '["/images/kumkumadi-oil.jpg"]'),
('p3', 'Ashwagandha Revitalizing Cream', 'ashwagandha-cream', 'moisturizer', 499, 649, 0, '["/images/ashwagandha-cream.jpg"]'),
('p4', 'Neem & Tulsi Acne Gel', 'neem-tulsi-gel', 'serum', 349, 449, 0, '["/images/neem-tulsi-gel.jpg"]');

-- Seed Admin User
INSERT OR IGNORE INTO users (id, name, email, password_hash, role) VALUES 
('admin1', 'AyurGlow Admin', 'admin@aayurglow.com', 'Admin@1234', 'admin');

-- Seed Settings
INSERT OR IGNORE INTO site_settings (id, key, value) VALUES 
(lower(hex(randomblob(16))), 'site_name', 'AyurGlow'),
(lower(hex(randomblob(16))), 'site_logo', '/logo.png'),
(lower(hex(randomblob(16))), 'site_tagline', 'Your Daily Ritual of Ayurvedic Glow');
