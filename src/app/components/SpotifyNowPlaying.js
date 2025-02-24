/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSpotify, FaPlay, FaPause, FaHistory } from "react-icons/fa";

// Hook to detect mobile viewport
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  
  return isMobile;
}

// Enhanced SoundWave component with more dynamic animation
function SoundWave({ isPlaying }) {
  // Number of bars in the sound wave
  const barsCount = 12;
  
  // Create a random height sequence for more natural-looking wave
  const getRandomHeight = () => Math.floor(Math.random() * 24) + 4;
  
  return (
    <div className="flex items-end space-x-1 h-8 py-1">
      {Array.from({ length: barsCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-t-full bg-green-400"
          initial={{ height: 4 }}
          animate={isPlaying ? {
            height: [
              getRandomHeight(),
              getRandomHeight(),
              getRandomHeight(),
              getRandomHeight()
            ]
          } : { height: 4 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

// Time display that shows how long ago the track was played
function TimeAgo({ timestamp }) {
  const [timeAgo, setTimeAgo] = useState("");
  
  useEffect(() => {
    if (!timestamp) return;
    
    const calculateTimeAgo = () => {
      const now = new Date();
      const playedAt = new Date(timestamp);
      const diffMs = now - playedAt;
      
      // Convert to appropriate time unit
      const diffSec = Math.floor(diffMs / 1000);
      if (diffSec < 60) return `${diffSec} seconds ago`;
      
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
      
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
      
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    };
    
    setTimeAgo(calculateTimeAgo());
    const interval = setInterval(() => setTimeAgo(calculateTimeAgo()), 10000);
    return () => clearInterval(interval);
  }, [timestamp]);
  
  return <span className="text-xs text-gray-400">{timeAgo}</span>;
}

// Main component
export default function SpotifyNowPlaying() {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const isMobile = useIsMobile();
  const [error, setError] = useState(null);
  const [lastPolled, setLastPolled] = useState(Date.now());

  // Set default expanded state based on device type
  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  // Fetch song data from your now-playing endpoint
  async function fetchSong() {
    try {
      const res = await fetch("/api/spotify/now-playing", {
        // Add cache busting to prevent caching
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        // Add timestamp to URL to bust cache
        cache: 'no-store'
      });
      
      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }
      
      const data = await res.json();
      setLastPolled(Date.now());
      setSong(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      setError("Couldn't connect to Spotify");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSong();
    // Shorter polling interval for faster updates on play state changes
    const interval = setInterval(fetchSong, 5000);
    return () => clearInterval(interval);
  }, []);

  // Force refresh when user returns to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchSong();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Debug info
  useEffect(() => {
    if (song?.isPlaying) {
      console.log(`Playing status updated: ${song.isPlaying} at ${new Date().toISOString()}`);
    }
  }, [song?.isPlaying]);

  if (loading) {
    return (
      <motion.div
        className="fixed top-4 right-4 z-50 bg-gray-800 rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <FaSpotify className="text-green-400 text-xl animate-pulse" />
          <span className="text-white text-sm">Loading music...</span>
        </div>
      </motion.div>
    );
  }
  
  if (error) {
    return (
      <motion.div
        className="fixed top-4 right-4 z-50 bg-gray-800 rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <FaSpotify className="text-gray-400 text-xl" />
          <span className="text-white text-sm">{error}</span>
        </div>
      </motion.div>
    );
  }

  if (!song) {
    return null;
  }

  // Expanded and compact widget variants
  const expandedWidth = isMobile ? 300 : 320;
  const compactWidth = 60;
  const currentWidth = expanded ? expandedWidth : compactWidth;
  
  return (
    <motion.div
      className="fixed top-4 right-4 z-50 overflow-hidden rounded-lg shadow-xl"
      layout
      initial={{ opacity: 0, x: 50, width: currentWidth }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        width: currentWidth,
        height: 'auto'
      }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      {/* Glassmorphism backdrop */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-md z-0"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0.9 }}
      />
      
      {/* Pulsing background glow for playing state */}
      {song.isPlaying && (
        <motion.div 
          className="absolute inset-0 bg-green-500 rounded-lg z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      {/* Container for the main content */}
      <div className="relative z-10">
        {/* Header bar with toggle button */}
        <div 
          className="flex items-center justify-between p-2 border-b border-gray-700"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center">
            <FaSpotify className="text-green-400 mr-2" />
            {expanded && (
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {song.isPlaying ? (
                  <span className="text-white text-xs font-medium flex items-center">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-green-400 mr-1"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Now Playing
                  </span>
                ) : (
                  <span className="text-white text-xs font-medium flex items-center">
                    <FaHistory className="text-gray-400 text-xs mr-1" />
                    Last Played
                  </span>
                )}
              </motion.div>
            )}
          </div>
          <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
            {expanded ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="p-3">
          <div className="flex items-center">
            {/* Album artwork with glow effect for playing state */}
            <div className="relative">
              {song.albumImageUrl ? (
                <div className="relative">
                  {song.isPlaying && (
                    <motion.div 
                      className="absolute inset-0 bg-green-400 rounded-md z-0"
                      animate={{ 
                        boxShadow: ["0 0 0px rgba(74, 222, 128, 0.2)", "0 0 15px rgba(74, 222, 128, 0.6)", "0 0 0px rgba(74, 222, 128, 0.2)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <Image
                    src={song.albumImageUrl}
                    alt={song.title || "Album cover"}
                    width={50}
                    height={50}
                    className="rounded-md relative z-10"
                  />
                  
                  {/* Playing indicator */}
                  <div className="absolute -bottom-2 -right-2 z-20">
                    <motion.div 
                      className={`${song.isPlaying ? 'bg-green-500' : 'bg-gray-600'} text-black p-1 rounded-full`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: song.isPlaying ? [0.9, 1.1, 0.9] : 0.9 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {song.isPlaying ? (
                        <FaPlay size={8} />
                      ) : (
                        <FaPause size={8} />
                      )}
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
                  <FaSpotify className="text-green-400 text-xl" />
                </div>
              )}
            </div>
            
            {expanded && (
              <AnimatePresence>
                <motion.div 
                  className="ml-3 flex-1 text-white"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.h4 
                    className="font-bold text-sm truncate"
                    initial={{ y: -5 }}
                    animate={{ y: 0 }}
                  >
                    {song.title || "Unknown Track"}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-xs text-gray-300 truncate"
                    initial={{ y: -5 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    {song.artist || "Unknown Artist"}
                  </motion.p>
                  
                  {song.album && (
                    <motion.p 
                      className="text-xs text-gray-400 truncate mt-1"
                      initial={{ y: -5 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {song.album}
                    </motion.p>
                  )}
                  
                  {/* Show "played X time ago" for last played tracks */}
                  {!song.isPlaying && song.playedAt && (
                    <motion.div 
                      className="mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <TimeAgo timestamp={song.playedAt} />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          
          {/* Extended info section */}
          {expanded && (
            <motion.div 
              className="mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.2 }}
            >
              {/* Sound wave visualization only when playing */}
              {song.isPlaying ? (
                <SoundWave isPlaying={true} />
              ) : (
                <div className="h-8 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Not currently playing</span>
                </div>
              )}
              
              {/* External link to open in Spotify */}
              {song.spotifyUrl && (
                <motion.a
                  href={song.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2 rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSpotify className="mr-1" /> Open in Spotify
                </motion.a>
              )}

              {/* Debug info - remove in production */}
              <div className="mt-2 text-xs text-gray-600">
                Last checked: {new Date(lastPolled).toLocaleTimeString()}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}