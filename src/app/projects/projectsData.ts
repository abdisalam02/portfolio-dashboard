export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  github?: string;
  image: string;
  tech: string[];
  features: string[];
  year: number;
  gallery: string[];
}

export const selectedProjects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A modern portfolio built with Next.js and Tailwind CSS showcasing personal projects and skills. It features smooth animations using Framer Motion, dynamic project filtering, and GitHub integration for real-time repository data.",
    url: "https://portfolio-dashboard-git-main-abdisalam02s-projects.vercel.app/",
    github: "https://github.com/abdisalam02/portfolio-dashboard",
    image: "/images/portfolio.png", // Updated path: public/images/portfolio.png
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    features: [
      "Responsive design",
      "Dynamic project filtering",
      "GitHub API integration",
    ],
    year: 2023,
    gallery: [
      "/images/portfolio.png",
      "/images/portfolio1.png",
      "/images/portfolio2.png",
      "/images/portfolio3.png", // corrected typo from 'porfolio3.png'
    ],
  },
  {
    id: 2,
    title: "Recipes App",
    description:
      "An innovative recipe platform that allows users to add recipes via an input form or JSON upload, view and favourite recipes, fetch nutritional information via NutriAPI, store data using Supabase, and even integrate AI prompts for creative recipe suggestions.",
    url: "https://recipes-app-git-databseforbuild-abdisalam02s-projects.vercel.app/",
    github: "https://github.com/abdisalam02/recipes-app",
    image: "/images/Recipe.png", // Updated path
    tech: ["React", "NutriAPI", "Supabase", "AI Integration"],
    features: [
      "User recipe submissions",
      "Nutritional info fetching",
      "Favouriting recipes",
      "AI recipe generation",
    ],
    year: 2023,
    gallery: [
      "/images/Recipe.png",
      "/images/Recipes1.png",
      "/images/Recipes2.png",
      "/images/Recipes3.png",
    ],
  },
  {
    id: 3,
    title: "Task App",
    description:
      "A fun and engaging task management game developed to challenge friends and earn points by completing tasks. Built with Next.js, it leverages Supabase for authentication, messaging, notifications, and storage. Users can send messages, compete for points, and unlock achievements.",
    url: "https://tasks-app-git-main-abdisalam02s-projects.vercel.app/signin",
    github: "https://github.com/abdisalam02/tasks-app",
    image: "/images/Taks.png", // Updated path
    tech: ["Next.js", "Supabase", "SupabaseAuth", "Realtime Notifications"],
    features: [
      "Task challenges",
      "Friend competitions",
      "In-app messaging",
      "Achievements and leaderboards",
    ],
    year: 2023,
    gallery: [
      "/images/Tasks1.png",
      "/images/Tasks2.png",
      "/images/Tasks3.png",
      "/images/Tasks4.png",
    ],
  },
  {
    id: 4,
    title: "MusicBoxd",
    description:
      "A modern music discovery and social platform inspired by Letterboxd, but for music enthusiasts. MusicBoxd allows users to discover, rate, review, and share their favorite tracks and albums while building a community around music appreciation. Features Spotify integration for discovery, 5-star rating system, social activity feeds, and 30-second track previews.",
    url: "https://rate-playlist-3cw5-git-musicboxd-abdisalam02s-projects.vercel.app/",
    github: "https://github.com/abdisalam02/MusicBoxd",
    image: "/images/Music.png", // Updated path for Music App
    tech: ["Next.js 15", "React 19", "TypeScript", "Spotify API", "Deezer API", "Supabase", "NextAuth.js", "Tailwind CSS", "Framer Motion"],
    features: [
      "Spotify & Deezer API integration for music discovery",
      "5-star rating system with detailed reviews",
      "Social activity feeds and user profiles",
      "30-second track previews with mini player",
      "Community rankings and recommendations",
      "Spotify OAuth authentication",
      "Real-time activity subscriptions",
      "Responsive design with dark theme"
    ],
    year: 2024,
    gallery: [
      "/images/musicboxd1.png",
      "/images/musicboxd2.png",
      "/images/musicboxd3.png",
      "/images/musicboxd4.png",
    ],
  },
];
