"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-purple-500/10 hover:text-foreground"
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
};
