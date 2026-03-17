import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { createClient } from "@/lib/supabase/server";
import { getAllBookmarksForUser } from "@/lib/utils/bookmark-queries";
import { getSidebarStats } from "@/lib/utils/sidebar-stats";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const bookmarks = await getAllBookmarksForUser();
  const sidebarStats = getSidebarStats(bookmarks);

  const profile = {
    full_name: user.user_metadata.full_name ?? "Emily Carter",
    email: user.email ?? "emily101@gmail.com",
  };

  return (
    <DashboardShell
      currentPath="/dashboard"
      profile={profile}
      sidebarStats={sidebarStats}
    >
      {children}
    </DashboardShell>
  );
}