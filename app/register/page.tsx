"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { registerAction } from "../actions";

// Mock course data (same as before)
const courses = [
  { id: "1", title: "Full-Stack Web Bootcamp", category: "Web", level: "Beginner", description: "Learn HTML, CSS, JS, and React." },
  { id: "2", title: "Python for Data Science", category: "Data", level: "Beginner", description: "Analyze data using Pandas." },
  { id: "3", title: "Advanced React Patterns", category: "Web", level: "Advanced", description: "Master hooks and performance." },
  { id: "4", title: "Mobile Apps with React Native", category: "Mobile", level: "Intermediate", description: "Build iOS and Android apps." },
  { id: "5", title: "Intro to Machine Learning", category: "Data", level: "Intermediate", description: "Build your first neural network." },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  
  // Connect to Server Action
  const [state, formAction, isPending] = useActionState(registerAction, null);

  // When server returns success, generate recommendations and move to final step
  useEffect(() => {
    if (state?.success) {
      generateRecommendations();
      setStep(5);
    }
  }, [state?.success]);

  const generateRecommendations = () => {
    const categoryPref = answers["interest"];
    const levelPref = answers["level"];

    let matches = courses.filter(
      (c) => c.category === categoryPref || c.level === levelPref
    );
    
    if (matches.length < 3) {
      const remaining = courses.filter((c) => !matches.includes(c));
      matches = [...matches, ...remaining];
    }
    setRecommendations(matches.slice(0, 3));
  };

  const handleNext = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Get Started</h1>
        <p className="text-zinc-500">Step {step} of 5</p>
        <div className="h-2 w-full bg-zinc-200 mt-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${(step / 5) * 100}%` }} 
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
        
        {/* QUESTION 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What is your current experience level?</h2>
            {["Beginner", "Intermediate", "Advanced"].map((opt) => (
              <button
                key={opt}
                onClick={() => handleNext("level", opt)}
                className="block w-full text-left p-4 rounded-lg border hover:border-primary hover:bg-zinc-50 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* QUESTION 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What area interests you the most?</h2>
            {["Web", "Data", "Mobile", "General"].map((opt) => (
              <button
                key={opt}
                onClick={() => handleNext("interest", opt)}
                className="block w-full text-left p-4 rounded-lg border hover:border-primary hover:bg-zinc-50 transition"
              >
                {opt == "General" ? "Not sure / General" : opt + " Development"}
              </button>
            ))}
          </div>
        )}

        {/* QUESTION 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">How do you prefer to learn?</h2>
            {["Video Tutorials", "Documentation / Reading", "Building Projects"].map((opt) => (
              <button
                key={opt}
                onClick={() => handleNext("style", opt)}
                className="block w-full text-left p-4 rounded-lg border hover:border-primary hover:bg-zinc-50 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* STEP 4: REGISTRATION FORM */}
        {step === 4 && (
          <form action={formAction} className="space-y-4">
            <h2 className="text-xl font-semibold">Create your account to save progress.</h2>
            
            {/* Hidden Inputs to pass previous answers to server */}
            <input type="hidden" name="level" value={answers["level"]} />
            <input type="hidden" name="interest" value={answers["interest"]} />
            <input type="hidden" name="style" value={answers["style"]} />

            <div>
                <label className="text-sm font-medium text-zinc-700">Full Name</label>
                <input name="name" required placeholder="John Doe" className="w-full p-3 border rounded-lg mt-1" />
            </div>

            <div>
                <label className="text-sm font-medium text-zinc-700">Email Address</label>
                <input name="email" type="email" required placeholder="you@domain.com" className="w-full p-3 border rounded-lg mt-1" />
            </div>

            <div>
                <label className="text-sm font-medium text-zinc-700">Password</label>
                <input name="password" type="password" required placeholder="Create a password" className="w-full p-3 border rounded-lg mt-1" />
            </div>

            {state?.message && (
                <p className="text-red-500 text-sm">{state.message}</p>
            )}

            <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-primary text-white p-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {isPending ? "Creating Account..." : "Register & View Recommendations"}
            </button>
            
            <p className="text-center text-sm text-zinc-500">
                Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
            </p>
          </form>
        )}

        {/* STEP 5: RESULTS */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
                <h2 className="text-2xl font-bold">Account Created!</h2>
                <p className="text-zinc-600">Here are your personalized course matches.</p>
            </div>
            
            <div className="grid gap-4">
              {recommendations.map((course) => (
                <Link 
                  key={course.id} 
                  href={`/courses/${course.id}`}
                  className="block p-4 border rounded-xl hover:shadow-md transition bg-zinc-50 group"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold group-hover:text-primary">{course.title}</h3>
                    <span className="text-xs bg-white border px-2 py-1 rounded-full">{course.level}</span>
                  </div>
                  <p className="text-sm text-zinc-600 mt-1">{course.description}</p>
                </Link>
              ))}
            </div>
            <Link href="/profile" className="block w-full text-center bg-zinc-800 text-white py-3 rounded-lg font-medium mt-6 hover:bg-black">
              Go to my Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}