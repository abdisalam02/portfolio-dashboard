/* eslint react/no-unescaped-entities: "off" */
"use client";

import { useEffect, useState } from "react";
import Loading from "../../Loading";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/abdisalam02/repos");
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data: Repo[] = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading delay
    const timer = setTimeout(() => fetchRepos(), 100);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">All GitHub Repositories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              {repo.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              {repo.description || "No description available."}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 font-medium hover:underline"
            >
              View Repository
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
