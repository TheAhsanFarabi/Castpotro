"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Learn. Build. Collaborate.",
  "Showcase your projects.",
  "Turn skills into Earning!",
];

function Typewriter({
  words,
  speed = 90,
}: {
  words: string[];
  speed?: number;
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    if (index === words.length) return;
    const timeout = setTimeout(() => {
      if (forward) {
        if (subIndex === words[index].length) {
          setForward(false);
        } else {
          setSubIndex((s) => s + 1);
        }
      } else {
        if (subIndex === 0) {
          setForward(true);
          setIndex((i) => (i + 1) % words.length);
        } else {
          setSubIndex((s) => s - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, forward, words, speed]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold">
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-1 h-6 bg-foreground ml-1 animate-pulse" />
    </span>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="mx-auto max-w-6xl px-6 py-20 flex flex-col-reverse gap-12 lg:flex-row items-center">
        {/* Left */}
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl leading-tight text-foreground">
            A place to <b className="text-green-600">learn</b>,{" "}
            <b className="text-red-600">build</b> and{" "}
            <b className="text-blue-600">earn</b>
          </h1>

          <div className="mt-4 text-xl text-zinc-600 max-w-xl">
            <Typewriter words={phrases} speed={70} />
          </div>

          <p className="mt-6 text-zinc-600 max-w-xl">
            Castpotro is a youth-first learning & collaboration hub — projects,
            mentorship, and a marketplace for skills. Join the community and
            start building real stuff.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setOpen(true)}
              className="bg-primary text-white px-6 py-3 rounded-full shadow hover:shadow-lg transition"
            >
              Join the Community
            </button>

            <a
              href="#features"
              className="bg-secondary text-white px-6 py-3 rounded-full shadow hover:shadow-lg transition"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-6 flex gap-4 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Active mentors: <strong className="ml-1">24</strong>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              Projects live: <strong className="ml-1">12</strong>
            </div>
          </div>
        </div>

        {/* Right: Floating Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/hero.png"
            alt="Illustration"
            className="w-full max-w-md animate-float"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "Projects",
              desc: "Find real tasks to build your portfolio.",
            },
            {
              title: "Courses",
              desc: "Short micro-courses with community mentors.",
            },
            {
              title: "Marketplace",
              desc: "Get paid for small freelance gigs.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-white shadow-card border"
            >
              <h3 className="font-semibold text-lg text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">{f.desc}</p>
              <button className="mt-4 text-sm px-3 py-2 rounded-full border border-zinc-200 hover:bg-zinc-50">
                Learn more
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN MODAL */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-foreground">
              Join Castpotro
            </h3>
            <p className="text-zinc-600 mt-2">
              Drop your email and we’ll add you to the community updates.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks — you're on the list! (demo)");
                setOpen(false);
              }}
              className="mt-4 flex flex-col gap-3"
            >
              <input
                required
                type="email"
                placeholder="you@domain.com"
                className="w-full rounded-lg border px-4 py-2"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-primary text-white">
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
