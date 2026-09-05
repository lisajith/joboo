import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import EditSkillForm from "@/components/admin/EditSkillForm";

type EditSkillPageProps = {
  params: Promise<{
    skillId: string;
  }>;
};

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { skillId } = await params;

  const supabase = await createClient();

  const { data: skill, error } = await supabase
    .from("skills")
    .select("id, name, slug")
    .eq("id", skillId)
    .single();

  if (error || !skill) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Admin Panel
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Edit Skill
          </h1>

          <p className="mt-3 text-muted">Update the details of this skill.</p>
        </div>

        <div className="mt-10">
          <EditSkillForm skill={skill} />
        </div>
      </div>
    </main>
  );
}
