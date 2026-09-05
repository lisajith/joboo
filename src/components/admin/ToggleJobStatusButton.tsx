"use client";

import { useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { toggleJobPublished } from "@/app/admin/(dashboard)/jobs/actions";

type ToggleJobStatusButtonProps = {
  jobId: string;
  isPublished: boolean;
};

export default function ToggleJobStatusButton({
  jobId,
  isPublished,
}: ToggleJobStatusButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleJobPublished(jobId, !isPublished);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        isPublished ? "Job moved to draft." : "Job published successfully.",
      );

      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition hover:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-50"
      title={isPublished ? "Unpublish job" : "Publish job"}
    >
      {isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );
}
