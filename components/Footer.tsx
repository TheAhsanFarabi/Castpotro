export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-zinc-200 dark:border-zinc-800 mt-20">
      <div className="mx-auto max-w-5xl px-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        © {new Date().getFullYear()} Castpotro. All rights reserved.
      </div>
    </footer>
  );
}
