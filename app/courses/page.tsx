import Link from "next/link";
import { PlayCircle } from "lucide-react";

// Simplified data (in case lib/data.ts is missing)
const courses = [
  { id: "1", title: "Full-Stack Web Bootcamp", category: "Web", author: "Castpotro Team" },
  { id: "2", title: "Python for Data Science", category: "Data", author: "Dr. Angela" },
  { id: "3", title: "Advanced React Patterns", category: "Web", author: "Kent C." },
  { id: "4", title: "Mobile Apps with React Native", category: "Mobile", author: "Simon G." },
  { id: "5", title: "Intro to Machine Learning", category: "Data", author: "Andrew N." },
  { id: "6", title: "DevOps & CI/CD Pipelines", category: "General", author: "Nana" },
  { id: "7", title: "Next.js 16 Mastery", category: "Web", author: "Vercel Team" },
  { id: "8", title: "Cybersecurity Fundamentals", category: "General", author: "HackerOne" },
  { id: "9", title: "Backend with Node.js", category: "Web", author: "Maximilian" },
  { id: "10", title: "UI/UX Design for Developers", category: "General", author: "Gary S." },
];

export default function CoursesPage() {
  return (
    <div className="bg-zinc-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Learning Center</h1>
            <p className="text-zinc-500 mt-2">Skill up with top-rated courses from industry experts.</p>
          </div>
          <div className="text-blue-600 font-bold hover:underline cursor-pointer">My Learning</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              href={`/courses/${course.id}`}
              className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden hover:shadow-lg transition group"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-zinc-200 flex items-center justify-center relative">
                 <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle size={24} fill="currentColor" />
                 </div>
              </div>
              
              <div className="p-4">
                 <h3 className="font-bold text-zinc-900 line-clamp-2 h-12 mb-1 group-hover:text-blue-600 group-hover:underline">
                    {course.title}
                 </h3>
                 <p className="text-xs text-zinc-500 mb-3">{course.author}</p>
                 
                 <div className="flex justify-between items-center text-xs text-zinc-500">
                    <span className="bg-zinc-100 px-2 py-1 rounded border">{course.category}</span>
                    <span>4.8 ★ (120)</span>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}