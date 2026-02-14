"use client";

import { Suspense } from "react";
import Hero from "./components/Hero";
import { BentoGrid, BentoGridItem } from "./components/ui/bento-grid";
import { FaLaptopCode, FaTools, FaArrowRight, FaGithub } from "react-icons/fa";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { selectedProjects } from "./projects/projectsData";
import ScrollReveal from "./components/ScrollReveal";

export default function Overview() {
  const router = useRouter();

  // Get first 2 projects
  const featuredProjects = selectedProjects.slice(0, 2);

  return (
    <Suspense fallback={<Loading />}>
      <main className="min-h-screen pb-20 overflow-x-hidden">
        <Hero />
        
        <section className="px-4 py-16" id="explore">
          <ScrollReveal
            className="max-w-6xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400">
                Explore My Work
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A glimpse into my recent projects and technical expertise.
              </p>
            </div>

            <BentoGrid className="max-w-6xl mx-auto">
              {/* Project 1 */}
              <BentoGridItem
                 className="md:col-span-2 md:row-span-2 min-h-[400px]"
                 header={
                   <div className="relative w-full h-full min-h-[200px] rounded-2xl overflow-hidden group">
                      <Image 
                        src={featuredProjects[0].image} 
                        alt={featuredProjects[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <span className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-medium backdrop-blur-md hover:bg-white/20 transition-colors shadow-glow">
                          View Project
                        </span>
                      </div>
                   </div>
                 }
                 title={
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">
                     {featuredProjects[0].title}
                   </span>
                 }
                 description={featuredProjects[0].description.slice(0, 100) + "..."}
                 icon={<FaLaptopCode className="text-cyan-400 text-xl" />}
                 onClick={() => router.push("/projects")}
              />

              {/* Skills / Tech Stack */}
              <BentoGridItem
                className="md:col-span-1 md:row-span-1"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 items-center justify-center p-4">
                    <div className="grid grid-cols-3 gap-3">
                       <div className="h-2 w-12 bg-cyan-500/50 rounded-full animate-pulse shadow-glow" />
                       <div className="h-2 w-8 bg-purple-500/50 rounded-full animate-pulse delay-75 shadow-glow" />
                       <div className="h-2 w-10 bg-blue-500/50 rounded-full animate-pulse delay-100 shadow-glow" />
                       <div className="h-2 w-10 bg-indigo-500/50 rounded-full animate-pulse delay-150 shadow-glow" />
                       <div className="h-2 w-12 bg-pink-500/50 rounded-full animate-pulse delay-200 shadow-glow" />
                       <div className="h-2 w-8 bg-cyan-400/50 rounded-full animate-pulse delay-300 shadow-glow" />
                    </div>
                  </div>
                }
                title="Tech Stack"
                description="Next.js • React • Tailwind • Supabase"
                icon={<FaTools className="h-4 w-4 text-purple-400" />}
                onClick={() => router.push("/skills")}
              />

              {/* Project 2 */}
              <BentoGridItem
                 className="md:col-span-1 md:row-span-1"
                 header={
                   <div className="relative w-full h-full min-h-[6rem] rounded-2xl overflow-hidden group">
                      <Image 
                        src={featuredProjects[1].image} 
                        alt={featuredProjects[1].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                         <FaArrowRight className="text-white text-3xl -rotate-45" />
                      </div>
                   </div>
                 }
                 title={featuredProjects[1].title}
                 description="Click to explore details."
                 icon={<FaGithub className="h-4 w-4 text-white/80" />}
                 onClick={() => router.push("/projects")}
              />

              {/* More Projects Link */}
               <div
                 onClick={() => router.push("/projects")}
                 className="md:col-span-3 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 p-6 flex items-center justify-center gap-4 cursor-pointer transition-all duration-500 group relative overflow-hidden"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="font-medium text-lg relative z-10">Explore all projects</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform text-cyan-400 relative z-10" />
               </div>

            </BentoGrid>
          </ScrollReveal>
        </section>
      </main>
    </Suspense>
  );
}