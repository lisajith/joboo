"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

import { updateSkill } from "@/app/admin/(dashboard)/skills/actions";

type Skill = {
  id: string;
  name: string;
  slug: string;
};

type EditSkillFormProps = {
  skill: Skill;
};

export default function EditSkillForm({ skill }: EditSkillFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await updateSkill(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="skillId" value={skill.id} />

      <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold">Skill Information</h2>

        <p className="mt-1 text-sm text-muted">
          Update the details of this skill.
        </p>

        <div className="mt-6 grid gap-5">
          <div>
            <label className="text-sm font-bold">Skill Name *</label>

            <input
              name="name"
              type="text"
              defaultValue={skill.name}
              required
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="React.js"
            />
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/skills"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold transition hover:bg-surface-soft"
        >
          <ArrowLeft size={17} />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />

          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
