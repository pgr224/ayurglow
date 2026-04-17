"use server"

import { getDb } from "@/db";
import { products, categories, coupons, siteSettings, pages, users, banners } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// --- Products ---

export async function getProductsAction() {
  try {
    const db = await getDb();
    return await db.query.products.findMany({
      with: {
        category: true,
      },
    });
  } catch (error) {
    console.error("Failed to get products:", error);
    return [];
  }
}

export async function upsertProductAction(data: any) {
  try {
    const db = await getDb();
    if (data.id) {
      await db.update(products).set(data).where(eq(products.id, data.id));
    } else {
      data.id = crypto.randomUUID();
      await db.insert(products).values(data);
    }
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to upsert product:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteProductAction(id: string) {
  try {
    const db = await getDb();
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: (error as Error).message };
  }
}

// --- Categories ---

export async function getCategoriesAction() {
  try {
    const db = await getDb();
    return await db.select().from(categories);
  } catch (error) {
    console.error("Failed to get categories:", error);
    return [];
  }
}

export async function upsertCategoryAction(data: any) {
  try {
    const db = await getDb();
    if (data.id) {
      await db.update(categories).set(data).where(eq(categories.id, data.id));
    } else {
      data.id = crypto.randomUUID();
      await db.insert(categories).values(data);
    }
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to upsert category:", error);
    return { success: false, error: (error as Error).message };
  }
}

// --- Coupons ---

export async function getCouponsAction() {
  try {
    const db = await getDb();
    return await db.select().from(coupons);
  } catch (error) {
    console.error("Failed to get coupons:", error);
    return [];
  }
}

export async function upsertCouponAction(data: any) {
  try {
    const db = await getDb();
    if (data.id) {
      await db.update(coupons).set(data).where(eq(coupons.id, data.id));
    } else {
      data.id = crypto.randomUUID();
      await db.insert(coupons).values(data);
    }
    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error) {
    console.error("Failed to upsert coupon:", error);
    return { success: false, error: (error as Error).message };
  }
}

// --- Site Settings ---

export async function getSettingsAction() {
  try {
    const db = await getDb();
    const settings = await db.select().from(siteSettings);
    return settings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to get settings:", error);
    return {};
  }
}

export async function updateSettingsAction(key: string, value: string) {
  try {
    const db = await getDb();
    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    
    if (existing.length > 0) {
      await db.update(siteSettings).set({ value, updatedAt: new Date() }).where(eq(siteSettings.key, key));
    } else {
      await db.insert(siteSettings).values({
        id: crypto.randomUUID(),
        key,
        value,
        updatedAt: new Date(),
      });
    }
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: (error as Error).message };
  }
}

// --- Pages ---

export async function getPagesAction() {
  try {
    const db = await getDb();
    return await db.select().from(pages);
  } catch (error) {
    console.error("Failed to get pages:", error);
    return [];
  }
}

export async function upsertPageAction(data: any) {
  try {
    const db = await getDb();
    if (data.id) {
      await db.update(pages).set({ ...data, updatedAt: new Date() }).where(eq(pages.id, data.id));
    } else {
      data.id = crypto.randomUUID();
      await db.insert(pages).values({ ...data, updatedAt: new Date() });
    }
    revalidatePath("/admin/settings");
    revalidatePath(`/${data.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to upsert page:", error);
    return { success: false, error: (error as Error).message };
  }
}

// --- Banners ---

export async function getBannersAction() {
  try {
    const db = await getDb();
    return await db.select().from(banners);
  } catch (error) {
    if (
      error instanceof Error &&
      (
        error.message.includes("Cloudflare request context is not available") ||
        error.message.includes("getRequestContext") ||
        error.message.includes("getOptionalRequestContext")
      )
    ) {
      return [];
    }
    console.error("Failed to get banners:", error);
    return [];
  }
}

export async function upsertBannerAction(data: any) {
  try {
    const db = await getDb();
    if (data.id) {
      await db.update(banners).set(data).where(eq(banners.id, data.id));
    } else {
      data.id = crypto.randomUUID();
      await db.insert(banners).values(data);
    }
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to upsert banner:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteBannerAction(id: string) {
  try {
    const db = await getDb();
    await db.delete(banners).where(eq(banners.id, id));
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete banner:", error);
    return { success: false, error: (error as Error).message };
  }
}
// --- Users ---

export async function getUsersAction() {
  try {
    const db = await getDb();
    return await db.select().from(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    return [];
  }
}

export async function upsertUserAction(data: any) {
  try {
    const db = await getDb();
    if (data.id) {
      await db.update(users).set(data).where(eq(users.id, data.id));
    } else {
      data.id = crypto.randomUUID();
      await db.insert(users).values(data);
    }
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to upsert user:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteUserAction(id: string) {
  try {
    const db = await getDb();
    await db.delete(users).where(eq(users.id, id));
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: (error as Error).message };
  }
}
