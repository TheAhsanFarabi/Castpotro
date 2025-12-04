export default function Home() {
  return (
    <div className="flex w-full items-center justify-center py-32">
      <main className="max-w-3xl flex flex-col items-center text-center gap-10 px-6">
        <h1 className="text-4xl font-bold leading-tight text-black dark:text-zinc-50">
          Welcome to Castpotro
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
          Castpotro is a youth-driven ecosystem where creators, learners, and 
          builders come together to grow, collaborate, and level up. 
        </p>

        <div className="flex gap-4 mt-4">
          <a
            href="#"
            className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
          >
            Join the Community
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            Explore Features
          </a>
        </div>
      </main>
    </div>
  );
}
