"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { login, type LoginState } from "../actions";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-purple-400/60 focus:bg-white/[0.06]";

export const LoginForm = () => {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Username</span>
        <input
          name="username"
          autoComplete="username"
          required
          autoFocus={!state.username}
          defaultValue={state.username}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus={!!state.username}
          className={inputClass}
        />
      </label>

      {state.error && (
        <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 p-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <LogIn className="h-4 w-4" aria-hidden="true" />
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
};
