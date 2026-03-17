import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/layout/dashboard-shell";

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

  const profile = {
    full_name: user.user_metadata.full_name || "User",
    email: user.email || "",
  };

  return (
    <DashboardShell currentPath="" profile={profile}>
      {children}
    </DashboardShell>
  );
}