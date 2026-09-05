import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in
  if (!user) {
    redirect("/admin/login");
  }

  // Check admin role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", user.id)
    .single();

  // Not an admin
  if (profileError || profile?.role !== "admin") {
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <AdminShell adminEmail={profile.email ?? user.email ?? "Administrator"}>
      {children}
    </AdminShell>
  );
}
