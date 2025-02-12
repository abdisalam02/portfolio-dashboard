/* eslint react/no-unescaped-entities: "off" */

"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

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
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center mb-8">Get in Touch</h1>

      {/* Social Media Section */}
      <div className="flex justify-center space-x-8 mb-12">
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <FaLinkedin className="text-blue-600 text-3xl" />
        </a>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <FaGithub className="text-gray-800 text-3xl" />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <FaTwitter className="text-blue-400 text-3xl" />
        </a>
      </div>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}

function ContactForm() {
  // Replace "xvgzbbqa" with your actual Formspree project ID
  const [state, handleSubmit] = useForm("xvgzbbqa");

  if (state.succeeded) {
    return (
      <div className="p-4 bg-green-100 border border-green-500 text-green-700 rounded text-center font-semibold">
        Thanks for reaching out! I&apos;ll get back to you soon.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 shadow-md rounded-lg dark:bg-gray-800"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        ></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
