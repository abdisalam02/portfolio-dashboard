/* eslint react/no-unescaped-entities: "off" */
"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

// A simple variant for the overall sections
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [loading, setLoading] = useState(true);

  // Simulate a brief loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I'd love to hear from you! Whether you have a question or just want to say hi, feel free to drop a message.
        </motion.p>
      </div>

      {/* Social Media Section */}
      <motion.div
        className="flex justify-center space-x-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform transform hover:scale-110"
        >
          <FaLinkedin className="text-blue-600 text-3xl" />
        </motion.a>
        <motion.a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform transform hover:scale-110"
        >
          <FaGithub className="text-gray-800 text-3xl" />
        </motion.a>
        <motion.a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform transform hover:scale-110"
        >
          <FaTwitter className="text-blue-400 text-3xl" />
        </motion.a>
      </motion.div>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}

function ContactForm() {
  // Replace "xvgzbbqa" with your actual Formspree project ID
  const [state, handleSubmit] = useForm("xvgzbbqa");

  // Variant function for dropping in fields with custom delay
  const dropIn = (custom: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.4 },
    },
  });

  if (state.succeeded) {
    return (
      <motion.div
        className="p-6 bg-green-100 border border-green-500 text-green-700 rounded-lg text-center font-semibold"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        Thanks for reaching out! I'll get back to you soon.
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      animate="visible"
      className="space-y-6 bg-white dark:bg-gray-800 p-8 shadow-xl rounded-lg transition duration-300"
    >
      <motion.div variants={dropIn(0)}>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
        />
      </motion.div>

      <motion.div variants={dropIn(1)}>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
        />
      </motion.div>

      <motion.div variants={dropIn(2)}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </motion.div>

      <motion.div variants={dropIn(3)}>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
        ></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </motion.div>

      <motion.div variants={dropIn(4)}>
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {state.submitting ? "Sending..." : "Send Message"}
        </button>
      </motion.div>
    </motion.form>
  );
}
