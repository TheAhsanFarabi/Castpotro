import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUsers } from "../lib/db";
import { User as UserIcon, MapPin, Building2, Calendar } from "lucide-react";

export default async function ProfilePage() {
  // 1. Check for Session Cookie
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    redirect("/login");
  }

  // 2. Fetch User Data
  const users = await getUsers();
  const user = users.find((u) => u.id === sessionId);

  if (!user) {
    redirect("/login");
  }

  // 3. Generate dynamic content based on registration data
  const headline = `${user.level} ${user.interest} Developer`;
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-zinc-100 min-h-screen pb-10">
      <div className="max-w-5xl mx-auto pt-6 px-0 sm:px-4 flex flex-col md:flex-row gap-6">
        
        {/* Main Column */}
        <main className="flex-3 w-full md:w-[70%] space-y-4">
          
          {/* Identity Card */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden relative">
            {/* Banner */}
            <div className="h-32 md:h-48 bg-gradient-to-r from-zinc-700 to-zinc-900"></div>
            
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                 {/* Dynamic Avatar */}
                 <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-zinc-200 flex items-center justify-center text-zinc-500">
                    {initials ? (
                      <span className="text-4xl font-bold tracking-widest">{initials}</span>
                    ) : (
                      <UserIcon size={64} />
                    )}
                 </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                   <h1 className="text-2xl font-bold text-zinc-900">{user.name}</h1>
                   <p className="text-zinc-600 mt-1">{headline} | Learning via {user.style}</p>
                   <p className="text-zinc-500 text-sm mt-2 flex items-center gap-1">
                      <MapPin size={14} /> Dhaka, Bangladesh · <span className="text-blue-600 font-medium cursor-pointer">Contact info</span>
                   </p>
                </div>
                <div className="hidden sm:block">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-full transition">
                    Open to work
                  </button>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-6 rounded-full transition">Add Section</button>
                 <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-1.5 px-6 rounded-full transition">Edit profile</button>
                 <button className="border border-zinc-400 text-zinc-600 hover:bg-zinc-100 font-medium py-1.5 px-4 rounded-full transition">More</button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-3">About</h2>
            <p className="text-zinc-700 leading-relaxed">
              I am a <strong>{user.level}</strong> developer passionate about <strong>{user.interest}</strong> development. 
              I prefer learning through {user.style} and am currently building my skills on Castpotro.
            </p>
          </div>

          {/* Experience Section (Placeholder / Dynamic) */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">Experience</h2>
            
            <div className="flex gap-4 mb-6">
               <div className="w-12 h-12 bg-zinc-100 rounded flex items-center justify-center font-bold text-zinc-500">
                  <Building2 size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-zinc-900">Member</h3>
                 <p className="text-sm text-zinc-700">Castpotro Community · Part-time</p>
                 <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                    <Calendar size={12}/> Jan 2025 - Present
                 </p>
                 <p className="text-sm text-zinc-600 mt-2">
                    Active learner and contributor in the {user.interest} track.
                 </p>
               </div>
            </div>
          </div>

        </main>

        {/* Sidebar */}
        <aside className="hidden md:block w-[30%] space-y-4">
           <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="font-semibold text-zinc-700">Profile Language</h3>
                 <span className="text-zinc-400">✏️</span>
              </div>
              <p className="text-sm text-zinc-500">English</p>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4">
              <h3 className="font-semibold text-zinc-700 mb-3">Community Members</h3>
              {users.filter(u => u.id !== user.id).slice(0, 3).map(otherUser => (
                <div key={otherUser.id} className="flex gap-3 mb-4 last:mb-0 items-start">
                   <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-500 text-xs">
                      {otherUser.name.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">{otherUser.name}</h4>
                      <p className="text-xs text-zinc-500 line-clamp-1">{otherUser.interest} Enthusiast</p>
                      <button className="mt-1 text-xs border rounded-full px-3 py-1 font-semibold hover:bg-zinc-50">Connect</button>
                   </div>
                </div>
              ))}
              {users.length <= 1 && <p className="text-xs text-zinc-400">No other members yet.</p>}
           </div>
        </aside>
      </div>
    </div>
  );
}