"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/918921520858"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 260,
      }}
      className="fixed bottom-24 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={30} />
    </motion.a>
  );
}