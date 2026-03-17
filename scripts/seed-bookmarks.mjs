import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const seedUserEmail = process.env.SEED_USER_EMAIL;
const seedUserPassword = process.env.SEED_USER_PASSWORD;

if (!supabaseUrl || !supabaseAnonKey || !seedUserEmail || !seedUserPassword) {
  throw new Error(
    "Missing env vars. Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SEED_USER_EMAIL, SEED_USER_PASSWORD",
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function getRemoteFavicon(url) {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return null;
  }
}

async function main() {
  const jsonPath = path.resolve("data.json");
  const raw = await fs.readFile(jsonPath, "utf8");
  const parsed = JSON.parse(raw);

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: seedUserEmail,
      password: seedUserPassword,
    });

  if (authError || !authData.user) {
    throw new Error(`Seed login failed: ${authError?.message ?? "Unknown error"}`);
  }

  const user = authData.user;

  const { error: deleteTagsError } = await supabase
    .from("bookmark_tags")
    .delete()
    .not("id", "is", null);

  if (deleteTagsError) {
    console.warn("Could not clear bookmark_tags:", deleteTagsError.message);
  }

  const { error: deleteBookmarksError } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", user.id);

  if (deleteBookmarksError) {
    throw new Error(`Failed to clear bookmarks: ${deleteBookmarksError.message}`);
  }

  for (const item of parsed.bookmarks) {
    const { data: insertedBookmark, error: insertBookmarkError } = await supabase
      .from("bookmarks")
      .insert({
        user_id: user.id,
        title: item.title,
        description: item.description,
        url: item.url,
        favicon_url: getRemoteFavicon(item.url),
        is_archived: item.isArchived,
        is_pinned: item.pinned,
        visit_count: item.visitCount,
        created_at: item.createdAt,
        updated_at: item.createdAt,
        last_visited_at: item.lastVisited,
      })
      .select("id")
      .single();

    if (insertBookmarkError || !insertedBookmark) {
      throw new Error(
        `Failed to insert bookmark "${item.title}": ${insertBookmarkError?.message ?? "Unknown error"}`,
      );
    }

    if (Array.isArray(item.tags) && item.tags.length > 0) {
      const { error: insertTagsError } = await supabase.from("bookmark_tags").insert(
        item.tags.map((tag) => ({
          bookmark_id: insertedBookmark.id,
          tag_name: tag,
        })),
      );

      if (insertTagsError) {
        throw new Error(
          `Failed to insert tags for "${item.title}": ${insertTagsError.message}`,
        );
      }
    }
  }

  console.log(`Seeded ${parsed.bookmarks.length} bookmarks for ${user.email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});