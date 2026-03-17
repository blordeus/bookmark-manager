function prettyTag(tag: string) {
  const specialCases: Record<string, string> = {
    css: "CSS",
    html: "HTML",
    javascript: "JavaScript",
    ai: "AI",
    git: "Git",
  };

  return specialCases[tag.toLowerCase()] ??
    tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
}

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
    return `Bookmarks tagged: ${tags.map(prettyTag).join(", ")}`;
  }

  if (isArchived) {
    return "Archived bookmarks";
  }

  return "All bookmarks";
}