"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Briefcase, 
  Search, 
  User, 
  BookOpen, 
  Bell, 
  MessageSquare,
  LogOut 
} from "lucide-react";
import { logoutAction } from "../app/actions"; // Import logout action

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Network", href: "#network", icon: <User size={20} /> },
    { name: "Jobs", href: "/jobs", icon: <Briefcase size={20} /> },
    { name: "Learning", href: "/courses", icon: <BookOpen size={20} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="relative w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold overflow-hidden">
                <Image src="/icon.png" alt="Logo" width={32} height={32} className="object-cover" />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center bg-zinc-100 px-3 py-1.5 rounded-md w-64 transition-all focus-within:w-80 focus-within:ring-2 ring-primary/20">
            <Search size={16} className="text-zinc-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-500 text-zinc-800"
            />
          </div>
        </div>

        {/* Right: Navigation */}
        <nav className="flex items-center gap-1 sm:gap-6 fixed bottom-0 left-0 w-full bg-white border-t sm:border-t-0 sm:static sm:w-auto justify-around sm:justify-end py-2 sm:py-0 z-50">
          
          {/* Always show generic nav items */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex flex-col items-center justify-center w-16 sm:w-auto gap-0.5 text-xs sm:text-[10px] md:text-xs transition-colors relative
                  ${isActive ? "text-black font-medium" : "text-zinc-500 hover:text-black"}
                `}
              >
                {item.icon}
                <span className="hidden sm:block">{item.name}</span>
                {isActive && <span className="absolute -bottom-[18px] left-0 w-full h-0.5 bg-black hidden sm:block" />}
              </Link>
            );
          })}

          <div className="h-8 w-[1px] bg-zinc-200 hidden sm:block mx-2"></div>

          {/* CONDITIONAL SECTION */}
          {isLoggedIn ? (
            <>
              {/* Logged In: Show Messaging, Notifications, and Profile */}
              <Link href="#messaging" className="flex flex-col items-center justify-center text-zinc-500 hover:text-black text-[10px] md:text-xs">
                 <MessageSquare size={20} />
                 <span className="hidden sm:block">Messaging</span>
              </Link>
              
              <Link href="#notifications" className="flex flex-col items-center justify-center text-zinc-500 hover:text-black text-[10px] md:text-xs">
                 <Bell size={20} />
                 <span className="hidden sm:block">Notifs</span>
              </Link>

              {/* Profile Dropdown Trigger */}
              <div className="flex flex-col items-center group relative cursor-pointer ml-2">
                 <div className="w-6 h-6 rounded-full bg-zinc-300 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Me" />
                 </div>
                 <span className="hidden sm:block text-[10px] mt-0.5 text-zinc-500 group-hover:text-black">Me ▼</span>
                 
                 {/* Simple Dropdown for Logout */}
                 <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden group-hover:block p-2">
                    <button 
                      onClick={() => logoutAction()} 
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                 </div>
              </div>
            </>
          ) : (
            <>
              {/* Logged Out: Show Join / Sign In */}
              <div className="flex items-center gap-3 ml-2">
                <Link 
                  href="/register" 
                  className="hidden sm:block text-zinc-600 font-semibold text-sm hover:text-zinc-900"
                >
                  Join now
                </Link>
                <Link 
                  href="/login" 
                  className="border border-primary text-primary px-5 py-1.5 rounded-full font-bold text-sm hover:bg-blue-50 transition"
                >
                  Sign in
                </Link>
              </div>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}