// app/courses/[id]/page.tsx
import { courses } from "../../lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await params in Next.js 16
  const course = courses.find((c) => c.id === id);

  if (!course) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <Link href="/register" className="text-sm text-zinc-500 hover:text-primary mb-6 block">
        ← Back to recommendations
      </Link>

      <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
        <div className="bg-zinc-100 h-48 flex items-center justify-center">
          {/* Placeholder for course image */}
          <span className="text-4xl text-zinc-300 font-bold">Course Preview</span>
        </div>
        
        <div className="p-8">
          <div className="flex gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {course.category}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {course.level}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg text-zinc-600 mb-8">{course.description}</p>

          <div className="border-t pt-8">
            <h3 className="font-semibold text-lg mb-4">What you'll learn</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-600">
              <li className="flex items-center gap-2">✅ Core Concepts</li>
              <li className="flex items-center gap-2">✅ Real-world Project</li>
              <li className="flex items-center gap-2">✅ Best Practices</li>
              <li className="flex items-center gap-2">✅ Final Certification</li>
            </ul>
          </div>

          <button className="w-full mt-8 bg-primary text-white py-4 rounded-xl text-lg font-bold hover:bg-opacity-90 transition">
            Enroll Now (Free)
          </button>
        </div>
      </div>
    </div>
  );
}