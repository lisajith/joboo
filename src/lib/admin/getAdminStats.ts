import { createClient } from "@/lib/supabase/server";

export async function getAdminStats() {
  const supabase = await createClient();

  const [
    { count: jobsCount, error: jobsError },
    { count: companiesCount, error: companiesError },
    { data: usersCount, error: usersError },
  ] = await Promise.all([
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),

    supabase.from("companies").select("*", { count: "exact", head: true }),

    supabase.rpc("get_users_count"),
  ]);

  if (jobsError) {
    console.error("Error fetching jobs count:", jobsError);
  }

  if (companiesError) {
    console.error("Error fetching companies count:", companiesError);
  }

  if (usersError) {
    console.error("Error fetching users count:", usersError);
  }

  return {
    jobs: jobsCount ?? 0,
    companies: companiesCount ?? 0,
    users: usersCount ?? 0,
  };
}
