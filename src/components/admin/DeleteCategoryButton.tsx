"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { deleteCategory } from "@/app/admin/(dashboard)/categories/actions";
import { confirmAlert } from "@/utils/sweetAlert";

type Props = {
  categoryId: string;
  categoryName: string;
};

export default function DeleteCategoryButton({
  categoryId,
  categoryName,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    const confirmed = await confirmAlert(
      `Delete "${categoryName}"?`,
      "This category will be permanently deleted.",
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteCategory(categoryId);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Category deleted successfully.");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      title="Delete category"
    >
      <Trash2 size={16} />
    </button>
  );
}
