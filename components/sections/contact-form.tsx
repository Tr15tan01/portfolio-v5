"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const fieldClass =
  "w-full rounded-xl border-2 border-input bg-background/70 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-purple-500 focus:bg-background";

const labelClass = "mb-2 block text-sm font-semibold";

export const ContactForm = () => {
  const { contact, site } = portfolio;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [sentTo, setSentTo] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  // Prefill from "Build one like this" / "Get a quote" links.
  useEffect(() => {
    const prefill = (subject: string) => {
      // "Business websites" (service) -> "Business website" (form option), matched on first word
      const firstWord = (v: string) => v.toLowerCase().split(/[^a-z-]/)[0];
      const match = contact.projectTypes.find(
        (t) => firstWord(t) === firstWord(subject) && firstWord(t) !== "something"
      );
      if (match) {
        setProjectType(match);
      } else {
        setMessage((m) =>
          m.trim()
            ? m
            : `Hi ${site.name.split(" ")[0]}, I'd like ${subject.charAt(0).toLowerCase()}${subject.slice(1)} for my business. `
        );
      }
      setStatus("idle");
    };

    // Arrived from another page, e.g. /projects -> /?project=...#contact
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("inquiry");
    if (fromUrl) {
      prefill(fromUrl.slice(0, 120));
      window.history.replaceState(null, "", "/#contact");
    }

    // Same page: intercept the link before Next navigates, prefill instantly.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-inquiry]");
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      prefill(link.dataset.inquiry ?? "");
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", "/#contact");
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [contact.projectTypes, site.name]);

  const openMailto = (data: Record<string, string>) => {
    const body = [
      data.message,
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.projectType && `Project: ${data.projectType}`,
      data.budget && `Budget: ${data.budget}`,
      data.timeline && `Timeline: ${data.timeline}`,
    ]
      .filter((l) => l !== undefined && l !== "")
      .join("\n");
    const subject = `New project inquiry${data.projectType ? `: ${data.projectType}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSentTo(data.email);
        setStatus("sent");
        form.reset();
        setMessage("");
        setProjectType("");
        // Conversion event for Google Analytics, if installed
        (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "generate_lead", {
          project_type: data.projectType,
          budget: data.budget,
        });
        return;
      }

      if (res.status === 503) {
        // Email service not configured yet: fall back to the visitor's mail app
        openMailto(data);
        setStatus("mailto");
        return;
      }

      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "The message couldn't be sent.");
      setStatus("error");
    } catch {
      openMailto(data);
      setStatus("mailto");
    }
  };

  if (status === "sent") {
    return (
      <div className="glass-purple rounded-3xl p-10 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-500" aria-hidden="true" />
        <h3 className="text-2xl font-bold">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thanks! I&apos;ll reply to <strong className="text-foreground">{sentTo}</strong> within {site.responseTime}.
          Check your spam folder if you don&apos;t see it.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-purple-600 hover:underline dark:text-purple-400"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass-purple space-y-5 rounded-3xl p-6 shadow-2xl shadow-purple-500/5 md:p-8"
      noValidate={false}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name *
          </label>
          <input ref={nameRef} id="name" name="name" required maxLength={100} autoComplete="name" placeholder="Jane Smith" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="jane@company.com" className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={fieldClass}
          >
            <option value="">Choose…</option>
            {contact.projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget
          </label>
          <select id="budget" name="budget" defaultValue="" className={fieldClass}>
            <option value="">Choose…</option>
            {contact.budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>
            Timeline
          </label>
          <select id="timeline" name="timeline" defaultValue="" className={fieldClass}>
            <option value="">Choose…</option>
            {contact.timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          About your project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you building, who is it for, and what should it achieve?"
          className={`${fieldClass} resize-y leading-relaxed`}
        />
      </div>

      {/* Honeypot: hidden from people, bots fill it and get silently dropped */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
          {error} You can also email me directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}

      {status === "mailto" && (
        <p role="status" className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4 text-sm">
          Your email app should have opened with the message ready. Just press send. If nothing opened, email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-lg font-bold text-white shadow-xl shadow-purple-500/25 transition-opacity hover:opacity-95 disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Free consultation, no obligation. Your details are only used to reply to you.
      </p>
    </form>
  );
};
