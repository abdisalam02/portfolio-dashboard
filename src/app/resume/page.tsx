"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaExternalLinkAlt, FaFilePdf, FaTimes } from "react-icons/fa";
import Loading from "../Loading";
import TextReveal from "../components/TextReveal";
import MagneticButton from "../components/MagneticButton";

const resumeUrl = "https://flowcv.com/resume/ampnadi1f62w";
const pdfPath = "/images/resume.pdf";

export default function ResumePage() {
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Abdisalam_Gure_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewOnline = () => {
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <TextReveal
            text="Resume"
            type="fadeUp"
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
          />
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            View or download my professional experience and qualifications.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton
            onClick={handleDownload}
            className="flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full shadow-glow hover:scale-105 transition-transform"
            magneticStrength={0.3}
          >
            <FaDownload className="text-lg" />
            <span>Download PDF</span>
          </MagneticButton>

          <MagneticButton
            onClick={handleViewOnline}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full backdrop-blur-md hover:bg-white/10 transition-colors"
            magneticStrength={0.3}
          >
            <FaExternalLinkAlt className="text-lg" />
            <span>View Online</span>
          </MagneticButton>

          <MagneticButton
            onClick={() => setFullscreen(true)}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full backdrop-blur-md hover:bg-white/10 transition-colors"
            magneticStrength={0.3}
          >
            <FaFilePdf className="text-lg" />
            <span>Fullscreen</span>
          </MagneticButton>
        </motion.div>

        {/* PDF Viewer Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10">
            {/* Holographic Border Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 pointer-events-none" />
            
            <div className="relative p-2 md:p-4 h-[600px] md:h-[800px]">
              {pdfError ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <FaFilePdf className="text-4xl text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-white font-medium">Unable to load PDF preview.</p>
                    <p className="text-white/50">Please use the download or view online options.</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`${pdfPath}#toolbar=1&navpanes=0&scrollbar=0`}
                  className="w-full h-full rounded-2xl bg-white"
                  title="Resume PDF"
                  onError={() => setPdfError(true)}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
            <p className="text-white/60 text-sm">
              Looking for a custom version?{" "}
              <a href="/contact" className="text-cyan-400 hover:underline font-medium">
                Contact me directly
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50"
              onClick={() => setFullscreen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-8 z-50 rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl"
            >
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <MagneticButton
                  onClick={handleDownload}
                  className="p-3 bg-white text-black rounded-full shadow-lg hover:bg-gray-100"
                  magneticStrength={0.2}
                >
                  <FaDownload />
                </MagneticButton>
                <MagneticButton
                  onClick={() => setFullscreen(false)}
                  className="p-3 bg-white/10 text-white border border-white/10 rounded-full shadow-lg hover:bg-white/20 backdrop-blur-md"
                  magneticStrength={0.2}
                >
                  <FaTimes />
                </MagneticButton>
              </div>
              <iframe
                src={`${pdfPath}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full bg-white"
                title="Resume PDF Fullscreen"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
