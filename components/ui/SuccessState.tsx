"use client";

import { motion } from "framer-motion";

interface SuccessStateProps {
  icon?: "check" | "heart";
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function SuccessState({ icon = "check", title, subtitle, children }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      {/* Animated icon with ring pulse */}
      <div className="relative mb-4">
        {/* Pulse rings */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", repeat: Infinity, repeatDelay: 0.5 }}
          className="absolute inset-0 rounded-full bg-coral/20"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2, repeat: Infinity, repeatDelay: 0.5 }}
          className="absolute inset-0 rounded-full bg-coral/15"
        />

        {/* Icon circle */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="relative w-20 h-20 rounded-full bg-gradient-to-br from-coral to-coral-hover flex items-center justify-center shadow-lg shadow-coral/25"
        >
          {icon === "check" ? (
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="w-9 h-9 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          ) : (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.4 }}
              className="w-9 h-9 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </motion.svg>
          )}
        </motion.div>
      </div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        className="font-display text-[28px] md:text-[36px] text-text-base leading-tight"
      >
        {title}
      </motion.h3>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="text-[16px] md:text-[17px] text-text-muted mt-1 max-w-[400px] leading-relaxed whitespace-pre-line"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Optional children (buttons, etc.) */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
          className="mt-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
