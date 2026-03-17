export function getBookmarksHeading({
  query,
  tags,
  isArchived,
}: {
  query: string;
  tags: string[];
  isArchived: boolean;
}) {
  if (query) {
    return `Results for: “${query}”`;
  }

  if (tags.length > 0) {
    return `Bookmarks tagged: ${tags.join(", ")}`;
  }

  if (isArchived) {
    return "Archived bookmarks";
  }

  return "All bookmarks";
}