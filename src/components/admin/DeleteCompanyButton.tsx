"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { deleteCompany } from "@/app/admin/(dashboard)/companies/actions";
import { confirmAlert } from "@/utils/sweetAlert";

type DeleteCompanyButtonProps = {
  companyId: string;
  companyName: string;
};

export default function DeleteCompanyButton({
  companyId,
  companyName,
}: DeleteCompanyButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    const confirmed = await confirmAlert(
      `Delete "${companyName}"?`,
      "This company will be permanently deleted."
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result = await deleteCompany(companyId);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Company deleted successfully.");

      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      title="Delete company"
    >
      <Trash2 size={16} />
    </button>
  );
}