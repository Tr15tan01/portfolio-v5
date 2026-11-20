import { adminConfigured } from "@/lib/admin/session";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const configured = adminConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-purple-950/40 backdrop-blur">
        <h1 className="text-2xl font-black purple-gradient-text">Admin</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">Sign in to edit your projects.</p>

        {configured ? (
          <LoginForm />
        ) : (
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            The admin panel is not set up yet. Add <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code> and{" "}
            <code>ADMIN_SESSION_SECRET</code> (32+ characters) to your environment variables, then restart.
          </div>
        )}
      </div>
    </div>
  );
}
