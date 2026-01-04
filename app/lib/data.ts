export type Course = {
  id: string;
  title: string;
  category: "Web" | "Data" | "Mobile" | "General";
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
};

export const courses: Course[] = [
  { id: "1", title: "Full-Stack Web Bootcamp", category: "Web", level: "Beginner", description: "Learn HTML, CSS, JS, and React from scratch." },
  { id: "2", title: "Python for Data Science", category: "Data", level: "Beginner", description: "Analyze data using Pandas and NumPy." },
  { id: "3", title: "Advanced React Patterns", category: "Web", level: "Advanced", description: "Master hooks, performance, and architecture." },
  { id: "4", title: "Mobile Apps with React Native", category: "Mobile", level: "Intermediate", description: "Build iOS and Android apps with one codebase." },
  { id: "5", title: "Intro to Machine Learning", category: "Data", level: "Intermediate", description: "Build your first neural network." },
  { id: "6", title: "DevOps & CI/CD Pipelines", category: "General", level: "Intermediate", description: "Automate deployment and server management." },
  { id: "7", title: "Next.js 16 Mastery", category: "Web", level: "Intermediate", description: "Build server-side rendered apps with the App Router." },
  { id: "8", title: "Cybersecurity Fundamentals", category: "General", level: "Beginner", description: "Protect networks and applications from attacks." },
  { id: "9", title: "Backend with Node.js", category: "Web", level: "Beginner", description: "Build robust APIs and manage databases." },
  { id: "10", title: "UI/UX Design for Developers", category: "General", level: "Beginner", description: "Learn to design beautiful interfaces." },
];