"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

type SaveJobButtonProps = {
  jobId: string;
  slug: string;
  initialSaved: boolean;
};

export default function SaveJobButton({
  jobId,
  slug,
  initialSaved,
}: SaveJobButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSave = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login to save jobs");

        router.push(`/login?redirect=/jobs/${slug}`);

        return;
      }

      if (saved) {
        const { error } = await supabase
          .from("saved_jobs")
          .delete()
          .eq("user_id", user.id)
          .eq("job_id", jobId);

        if (error) {
          console.error(error);
          toast.error("Failed to remove saved job");
          return;
        }

        setSaved(false);
        toast.success("Job removed from saved jobs");
      } else {
        const { error } = await supabase.from("saved_jobs").insert({
          user_id: user.id,
          job_id: jobId,
        });

        if (error) {
          console.error(error);
          toast.error("Failed to save job");
          return;
        }

        setSaved(true);
        toast.success("Job saved successfully ❤️");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition ${
        saved
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-white text-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
      } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <Heart size={18} className={saved ? "fill-current" : ""} />

      {loading ? "Saving..." : saved ? "Saved" : "Save Job"}
    </button>
  );
}
