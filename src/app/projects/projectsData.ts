export const selectedProjects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "A modern portfolio built with Next.js and Tailwind CSS showcasing personal projects and skills. It features smooth animations using Framer Motion, dynamic project filtering, and GitHub integration for real-time repository data.",
      url: "https://portfolio-dashboard-git-main-abdisalam02s-projects.vercel.app/",
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
      url: "https://recipes-app-qnwl-git-databseforbuild-abdisalam02s-projects.vercel.app/",
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
      title: "Music App",
      description:
        "A dynamic music app that leverages Spotify and Deezer APIs to fetch playlist data and song previews. The app offers engaging games such as rating playlists, guessing songs and lyrics, and even hosts tournaments featuring your favorite tracks.",
      url: "https://rate-playlist-git-main-abdisalam02s-projects.vercel.app/",
      image: "/images/Music.png", // Updated path for Music App
      tech: ["React", "Spotify API", "Deezer API", "Supabase", "AI Integration"],
      features: [
        "Fetches playlist data and song previews",
        "Playlist rating game",
        "Guess the song and lyric games",
        "Competitive song tournaments",
      ],
      year: 2023,
      gallery: [
        "/images/Music1.png",
        "/images/Music2.png",
        "/images/Music3.png",
        "/images/Music4.png",
      ],
    },
  ];
  