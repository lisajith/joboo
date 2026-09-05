import AddSkillForm from "@/components/admin/AddSkillForm";

export default function AddSkillPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Admin Panel
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Add Skill
          </h1>

          <p className="mt-3 text-muted">
            Add a new skill for your job listings.
          </p>
        </div>

        <div className="mt-10">
          <AddSkillForm />
        </div>
      </div>
    </main>
  );
}
