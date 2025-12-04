export default function Header() {
  return (
    <header className="w-full py-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6">
        <h1 className="text-xl font-bold text-black dark:text-zinc-50">
          Castpotro
        </h1>

        <nav className="flex items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
          <a href="#" className="hover:text-black dark:hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-black dark:hover:text-white">
            Features
          </a>
          <a href="#" className="hover:text-black dark:hover:text-white">
            Community
          </a>
        </nav>
      </div>
    </header>
  );
}
