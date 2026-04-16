import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// Users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique(),
  phone: text("phone").unique(),
  passwordHash: text("password_hash"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Categories table
export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  icon: text("icon"), // SVG or icon name
  type: text("type", { enum: ["skin_type", "concern", "ingredient", "routine"] }).notNull(),
  parentId: text("parent_id"),
  sortOrder: integer("sort_order").default(0),
});

// Products table
export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  categoryId: text("category_id").references(() => categories.id),
  basePrice: real("base_price").notNull(),
  mrp: real("mrp").notNull(),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  isBestseller: integer("is_bestseller", { mode: "boolean" }).default(false),
  isTrending: integer("is_trending", { mode: "boolean" }).default(false),
  badge: text("badge"), // e.g., "Bestseller", "B2G1"
  highlights: text("highlights"), // JSON or newline separated
  benefits: text("benefits"),
  ingredients: text("ingredients"),
  images: text("images"), // JSON array of image URLs
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Product Variants table
export const productVariants = sqliteTable("product_variants", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  name: text("name").notNull(), // e.g., "50g", "100ml"
  price: real("price").notNull(),
  mrp: real("mrp").notNull(),
  weight: text("weight"),
  pricePerUnit: text("price_per_unit"),
  stock: integer("stock").default(0),
  sku: text("sku").unique(),
});

// Cart Items table
export const cartItems = sqliteTable("cart_items", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  sessionId: text("session_id"), // For guest checkout
  productId: text("product_id").references(() => products.id),
  variantId: text("variant_id").references(() => productVariants.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Orders table
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  status: text("status", { enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"] }).default("pending").notNull(),
  subtotal: real("subtotal").notNull(),
  discount: real("discount").default(0),
  total: real("total").notNull(),
  couponCode: text("coupon_code"),
  shippingAddress: text("shipping_address").notNull(), // JSON
  paymentMethod: text("payment_method").notNull(),
  paymentStatus: text("payment_status", { enum: ["pending", "paid", "failed", "cod"] }).default("pending").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Order Items table
export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").references(() => orders.id),
  productId: text("product_id").references(() => products.id),
  variantId: text("variant_id").references(() => productVariants.id),
  quantity: integer("quantity").notNull(),
  price: real("price").notNull(),
});

// Coupons table
export const coupons = sqliteTable("coupons", {
  id: text("id").primaryKey(),
  code: text("code").unique().notNull(),
  type: text("type", { enum: ["percentage", "fixed", "b2g1", "free_gift"] }).notNull(),
  value: real("value"),
  minCartValue: real("min_cart_value").default(0),
  maxDiscount: real("max_discount"),
  buyQuantity: integer("buy_quantity"),
  getQuantity: integer("get_quantity"),
  freeProductIds: text("free_product_ids"), // JSON array
  validFrom: integer("valid_from", { mode: "timestamp" }),
  validUntil: integer("valid_until", { mode: "timestamp" }),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  usageCount: integer("usage_count").default(0),
  maxUsage: integer("max_usage"),
});

// Reviews table
export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  userId: text("user_id").references(() => users.id),
  rating: integer("rating").notNull(),
  title: text("title"),
  body: text("body"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Banners table
export const banners = sqliteTable("banners", {
  id: text("id").primaryKey(),
  title: text("title"),
  subtitle: text("subtitle"),
  image: text("image").notNull(),
  ctaText: text("cta_text"),
  ctaLink: text("cta_link"),
  couponCode: text("coupon_code"),
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

// Relationships
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  variants: many(productVariants),
  reviews: many(reviews),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const ordersRelations = relations(orders, ({ many, one }) => ({
  items: many(orderItems),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));
