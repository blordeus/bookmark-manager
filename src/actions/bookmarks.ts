"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { bookmarkSchema } from "@/lib/validations/bookmark";
import { getFaviconUrl, parseTags } from "@/lib/utils/bookmarks";

type ActionState = {
  success: boolean;
  error: string | null;
};

export async function createBookmarkAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = bookmarkSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    url: formData.get("url"),
    tags: formData.get("tags"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form submission",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be logged in." };
  }

  const faviconUrl = getFaviconUrl(parsed.data.url);

  const { data: bookmark, error } = await supabase
    .from("bookmarks")
    .insert({
      user_id: user.id,
      title: parsed.data.title,
      description: parsed.data.description,
      url: parsed.data.url,
      favicon_url: faviconUrl,
    })
    .select("id")
    .single();

  if (error || !bookmark) {
    return { success: false, error: error?.message ?? "Failed to create bookmark." };
  }

  const tags = parseTags(parsed.data.tags);

  if (tags.length > 0) {
    const { error: tagsError } = await supabase.from("bookmark_tags").insert(
      tags.map((tag) => ({
        bookmark_id: bookmark.id,
        tag_name: tag,
      })),
    );

    if (tagsError) {
      return { success: false, error: tagsError.message };
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/archived");

  return { success: true, error: null };
}

export async function archiveBookmarkAction(bookmarkId: string) {
  const supabase = await createClient();

  await supabase
    .from("bookmarks")
    .update({ is_archived: true, is_pinned: false, updated_at: new Date().toISOString() })
    .eq("id", bookmarkId);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/archived");
}

export async function unarchiveBookmarkAction(bookmarkId: string) {
  const supabase = await createClient();

  await supabase
    .from("bookmarks")
    .update({ is_archived: false, updated_at: new Date().toISOString() })
    .eq("id", bookmarkId);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/archived");
}

export async function deleteBookmarkAction(bookmarkId: string) {
  const supabase = await createClient();

  await supabase.from("bookmarks").delete().eq("id", bookmarkId);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/archived");
}

export async function togglePinBookmarkAction(bookmarkId: string, nextPinned: boolean) {
  const supabase = await createClient();

  await supabase
    .from("bookmarks")
    .update({ is_pinned: nextPinned, updated_at: new Date().toISOString() })
    .eq("id", bookmarkId);

  revalidatePath("/dashboard");
}

export async function updateBookmarkAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const bookmarkId = formData.get("bookmarkId") as string;
  const parsed = bookmarkSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    url: formData.get("url"),
    tags: formData.get("tags"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form submission",
    };
  }

  const supabase = await createClient();

  const faviconUrl = getFaviconUrl(parsed.data.url);

  const { error } = await supabase
    .from("bookmarks")
    .update({
      title: parsed.data.title,
      description: parsed.data.description,
      url: parsed.data.url,
      favicon_url: faviconUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", bookmarkId);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  await supabase.from("bookmark_tags").delete().eq("bookmark_id", bookmarkId);

  const tags = parseTags(parsed.data.tags);

  if (tags.length > 0) {
    const { error: tagsError } = await supabase.from("bookmark_tags").insert(
      tags.map((tag) => ({
        bookmark_id: bookmarkId,
        tag_name: tag,
      })),
    );

    if (tagsError) {
      return {
        success: false,
        error: tagsError.message,
      };
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/archived");

  return {
    success: true,
    error: null,
  };
}