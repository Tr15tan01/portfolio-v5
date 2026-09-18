import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-8xl font-black purple-gradient-text">404</p>
      <h1 className="mt-4 text-2xl font-bold">This page doesn&apos;t exist</h1>
      <p className="mt-2 text-muted-foreground">The link may be old or mistyped.</p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-semibold text-white">
          Go to homepage
        </Link>
        <Link href="/#contact" className="rounded-xl border-2 border-purple-400/30 px-6 py-3 font-semibold">
          Contact me
        </Link>
      </div>
    </div>
  );
}
