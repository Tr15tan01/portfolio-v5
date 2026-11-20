import { redirect } from "next/navigation";
import { readPortfolio, storageMode } from "@/lib/admin/storage";
import { isAdmin } from "./actions";
import { ProjectsEditor } from "./projects-editor";

export const dynamic = "force-dynamic";

const Notice = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="max-w-lg rounded-2xl border border-amber-400/30 bg-amber-500/10 p-6 text-amber-100">{children}</div>
  </div>
);

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const mode = storageMode();
  if (!mode) {
    return (
      <Notice>
        <h1 className="mb-2 text-lg font-bold">Saving is not configured</h1>
        <p className="text-sm">
          On Netlify/Vercel the admin saves by committing to GitHub. Add <code>GITHUB_TOKEN</code> and <code>GITHUB_REPO</code>{" "}
          to your environment variables and redeploy. See README.md.
        </p>
      </Notice>
    );
  }

  let loaded: Awaited<ReturnType<typeof readPortfolio>>;
  try {
    loaded = await readPortfolio();
  } catch (err) {
    console.error("[admin] load failed", err);
    return (
      <Notice>
        <h1 className="mb-2 text-lg font-bold">Could not load portfolio.json</h1>
        <p className="text-sm">
          Check that <code>GITHUB_TOKEN</code> can read the repo and that <code>GITHUB_REPO</code> /{" "}
          <code>GITHUB_BRANCH</code> are correct.
        </p>
      </Notice>
    );
  }

  return <ProjectsEditor initialProjects={loaded.data.projects} initialVersion={loaded.version} mode={mode} />;
}
