"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Failed to logout.");
      return;
    }

    toast.success("Logged out successfully.");

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="
        inline-flex items-center justify-center gap-2
        rounded-2xl border border-red-200
        bg-white px-5 py-3
        text-sm font-bold text-red-500
        transition-all duration-200
        hover:bg-red-50
      "
    >
      <LogOut size={17} />
      Logout
    </button>
  );
}
