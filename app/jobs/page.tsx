"use client";

import { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  Search, 
  Bookmark, 
  Clock, 
  Filter, 
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

// 1. Types
type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  applicants: number;
  skills: string[];
  promoted: boolean;
  description: string;
  logoColor: string;
};

// 2. Mock Data
const ALL_JOBS: Job[] = [
  { 
    id: 1, title: "Senior React Developer", company: "TechFlow", location: "Remote", 
    type: "Full-time", postedAt: "2h ago", applicants: 45, promoted: true,
    skills: ["React", "Redux", "TypeScript"], logoColor: "bg-blue-100 text-blue-600",
    description: "We are looking for a Senior React Developer to lead our frontend team. You will be responsible for architecting scalable UI components..."
  },
  { 
    id: 2, title: "Next.js Engineer", company: "Castpotro", location: "Dhaka, BD", 
    type: "Hybrid", postedAt: "5h ago", applicants: 12, promoted: true,
    skills: ["Next.js", "Tailwind", "Node.js"], logoColor: "bg-purple-100 text-purple-600",
    description: "Join the core team at Castpotro. Experience with Server Components is a must."
  },
  { 
    id: 3, title: "UI/UX Designer", company: "Creative Minds", location: "Remote", 
    type: "Contract", postedAt: "1d ago", applicants: 89, promoted: false,
    skills: ["Figma", "Prototyping", "User Research"], logoColor: "bg-pink-100 text-pink-600",
    description: "Looking for a creative designer to revamp our mobile app experience."
  },
  { 
    id: 4, title: "Backend Developer", company: "ServerSide", location: "Sylhet, BD", 
    type: "Full-time", postedAt: "3d ago", applicants: 23, promoted: false,
    skills: ["Node.js", "PostgreSQL", "Docker"], logoColor: "bg-green-100 text-green-600",
    description: "Build robust APIs for our fintech platform. Security is priority."
  },
  { 
    id: 5, title: "Product Manager", company: "Innovate Inc", location: "Dhaka, BD", 
    type: "On-site", postedAt: "1w ago", applicants: 156, promoted: false,
    skills: ["Agile", "Jira", "Strategy"], logoColor: "bg-orange-100 text-orange-600",
    description: "Lead the product vision for our new SaaS tool."
  },
  { 
    id: 6, title: "Frontend Intern", company: "StartUp X", location: "Remote", 
    type: "Internship", postedAt: "2d ago", applicants: 200, promoted: false,
    skills: ["HTML", "CSS", "JavaScript", "React"], logoColor: "bg-indigo-100 text-indigo-600",
    description: "Great opportunity for freshers to learn modern web development."
  }
];

// Mock User Profile Skills (In a real app, this comes from the DB)
const USER_SKILLS = ["React", "JavaScript", "HTML", "CSS", "Next.js", "Tailwind"];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<"recommended" | "saved">("recommended");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showEligibility, setShowEligibility] = useState(false);
  
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  // Handlers
  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleApply = () => {
    if (selectedJob) {
      setAppliedIds(prev => [...prev, selectedJob.id]);
      alert("Application Submitted! (Demo)");
    }
  };

  // Eligibility Logic
  const checkEligibility = (jobSkills: string[]) => {
    const matched = jobSkills.filter(skill => USER_SKILLS.includes(skill));
    const missing = jobSkills.filter(skill => !USER_SKILLS.includes(skill));
    const score = Math.round((matched.length / jobSkills.length) * 100);
    return { matched, missing, score };
  };

  const filteredJobs = ALL_JOBS.filter(job => 
    (job.title.toLowerCase().includes(search.toLowerCase()) || 
     job.company.toLowerCase().includes(search.toLowerCase())) &&
    (activeTab === "saved" ? savedIds.includes(job.id) : true)
  );

  return (
    <div className="bg-zinc-50 min-h-screen pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER & FILTERS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-bold text-zinc-900">Find your next role</h1>
             <p className="text-zinc-500 mt-2">Curated jobs matching your skills and interests.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-lg border shadow-sm">
             <button 
               onClick={() => setActiveTab("recommended")}
               className={`px-4 py-2 rounded-md text-sm font-semibold transition ${activeTab === "recommended" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"}`}
             >
               Recommended
             </button>
             <button 
               onClick={() => setActiveTab("saved")}
               className={`px-4 py-2 rounded-md text-sm font-semibold transition ${activeTab === "saved" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"}`}
             >
               Saved ({savedIds.length})
             </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-2xl mb-10">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
           <input 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder="Search by job title, company, or keywords..." 
             className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-primary/20 outline-none text-zinc-700 bg-white"
           />
           <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-800 transition">
             Search
           </button>
        </div>

        {/* GRID VIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length === 0 ? (
             <div className="col-span-full text-center py-20 text-zinc-500">No jobs found.</div>
          ) : (
             filteredJobs.map((job) => (
               <div 
                 key={job.id} 
                 onClick={() => { setSelectedJob(job); setShowEligibility(false); }}
                 className="group bg-white rounded-2xl p-6 border border-zinc-200 hover:border-zinc-300 hover:shadow-lg transition cursor-pointer relative flex flex-col h-full"
               >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${job.logoColor}`}>
                        {job.company[0]}
                     </div>
                     <button 
                       onClick={(e) => toggleSave(e, job.id)}
                       className={`p-2 rounded-full ${savedIds.includes(job.id) ? "text-blue-600 bg-blue-50" : "text-zinc-400 hover:bg-zinc-50"}`}
                     >
                        <Bookmark size={20} fill={savedIds.includes(job.id) ? "currentColor" : "none"} />
                     </button>
                  </div>

                  {/* Job Info */}
                  <div className="mb-4 flex-1">
                     <h3 className="font-bold text-lg text-zinc-900 group-hover:text-primary transition">{job.title}</h3>
                     <p className="text-zinc-600 font-medium">{job.company}</p>
                     
                     <div className="flex flex-wrap gap-2 mt-3 text-xs text-zinc-500 font-medium">
                        <span className="bg-zinc-100 px-2 py-1 rounded-md flex items-center gap-1">
                           <MapPin size={12}/> {job.location}
                        </span>
                        <span className="bg-zinc-100 px-2 py-1 rounded-md flex items-center gap-1">
                           <Building2 size={12}/> {job.type}
                        </span>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md flex items-center gap-1">
                           <Clock size={12}/> {job.postedAt}
                        </span>
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                     <span className="text-xs text-zinc-400">{job.applicants} applicants</span>
                     <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                        View Details <ArrowRight size={14} />
                     </span>
                  </div>
               </div>
             ))
          )}
        </div>
      </div>

      {/* MODAL - JOB DETAILS & ELIGIBILITY */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
           
           {/* Modal Content */}
           <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl ${selectedJob.logoColor}`}>
                       {selectedJob.company[0]}
                    </div>
                    <div>
                       <h2 className="text-xl font-bold text-zinc-900">{selectedJob.title}</h2>
                       <p className="text-zinc-500 text-sm">{selectedJob.company} · {selectedJob.location}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-zinc-100 rounded-full">
                    <X size={24} className="text-zinc-500" />
                 </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                 
                 {/* ELIGIBILITY CHECKER SECTION */}
                 <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200">
                    <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-zinc-800 flex items-center gap-2">
                         <CheckCircle2 className="text-green-600" size={20} /> Eligibility Check
                       </h3>
                       {!showEligibility ? (
                          <button 
                            onClick={() => setShowEligibility(true)}
                            className="text-sm bg-white border border-zinc-300 px-3 py-1.5 rounded-full font-semibold hover:bg-zinc-50 transition shadow-sm"
                          >
                            Am I eligible?
                          </button>
                       ) : (
                          <span className="text-xs font-bold bg-white border px-2 py-1 rounded">Based on your profile</span>
                       )}
                    </div>

                    {showEligibility && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                         {(() => {
                            const { matched, missing, score } = checkEligibility(selectedJob.skills);
                            const isEligible = score >= 70;
                            
                            return (
                               <div className="space-y-4">
                                  {/* Score Bar */}
                                  <div className="space-y-1">
                                     <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                        <span className={isEligible ? "text-green-600" : "text-orange-600"}>
                                           {isEligible ? "Great Match!" : "Skill Gap Detected"}
                                        </span>
                                        <span>{score}% Match</span>
                                     </div>
                                     <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full ${isEligible ? "bg-green-500" : "bg-orange-500"} transition-all duration-1000`} 
                                          style={{ width: `${score}%` }} 
                                        />
                                     </div>
                                  </div>

                                  {/* Analysis Grid */}
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                     <div>
                                        <p className="font-semibold text-zinc-700 mb-2">✅ You have:</p>
                                        <ul className="space-y-1">
                                           {matched.length > 0 ? matched.map(s => (
                                              <li key={s} className="flex items-center gap-1.5 text-zinc-600">
                                                 <CheckCircle2 size={12} className="text-green-500"/> {s}
                                              </li>
                                           )) : <li className="text-zinc-400 italic">No matches found</li>}
                                        </ul>
                                     </div>
                                     <div>
                                        <p className="font-semibold text-zinc-700 mb-2">❌ Missing:</p>
                                        <ul className="space-y-1">
                                           {missing.length > 0 ? missing.map(s => (
                                              <li key={s} className="flex items-center gap-1.5 text-zinc-600">
                                                 <AlertCircle size={12} className="text-orange-500"/> {s}
                                              </li>
                                           )) : <li className="text-green-600 italic">None! You are fully qualified.</li>}
                                        </ul>
                                     </div>
                                  </div>

                                  {/* Recommendation Action */}
                                  {missing.length > 0 && (
                                     <div className="bg-white p-3 rounded-lg border border-orange-100 flex items-start gap-3">
                                        <GraduationCap className="text-orange-500 shrink-0 mt-0.5" size={18} />
                                        <div>
                                           <p className="text-sm font-bold text-zinc-800">Upskill to apply</p>
                                           <p className="text-xs text-zinc-500 mt-1">
                                              We recommend taking the <Link href="/courses" className="text-blue-600 underline">Advanced {missing[0]} Course</Link> to increase your chances.
                                           </p>
                                        </div>
                                     </div>
                                  )}
                               </div>
                            );
                         })()}
                      </div>
                    )}
                 </div>

                 {/* Description */}
                 <div>
                    <h3 className="font-bold text-lg mb-2">About the role</h3>
                    <p className="text-zinc-600 leading-relaxed text-sm">{selectedJob.description}</p>
                 </div>

                 {/* Skills Tags */}
                 <div>
                    <h3 className="font-bold text-sm mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                       {selectedJob.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-xs font-medium border border-zinc-200">
                             {skill}
                          </span>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white p-6 border-t flex gap-4">
                 <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/20" onClick={handleApply}>
                    {appliedIds.includes(selectedJob.id) ? "Application Sent" : "Apply Now"}
                 </button>
                 <button className="px-6 py-3 border border-zinc-200 rounded-xl font-bold hover:bg-zinc-50 text-zinc-700 transition">
                    Save
                 </button>
              </div>

           </div>
        </div>
      )}

    </div>
  );
}