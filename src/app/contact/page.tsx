"use client";

import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function Contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100); // Simulate loading delay
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <h1 className="text-3xl font-bold">Contact Page</h1>;
}
