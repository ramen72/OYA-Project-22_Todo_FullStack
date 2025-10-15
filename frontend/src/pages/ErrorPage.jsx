import React from "react";
import { motion } from "framer-motion";

export default function ErrorPage({
  status = 404,
  title = "Page not found",
  description = "",
  primaryAction = { label: "Go Home", href: "/" },
  secondaryAction = { label: "Contact", href: "/contact" },
}) {
  const handleAction = (action) => (e) => {
    if (action.onClick) {
      e.preventDefault();
      action.onClick();
    }
    // if href is provided, navigation will be handled by the app/router
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center"
        role="alert"
        aria-live="polite"
      >
        {/* Left: Illustration + status */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="text-6xl md:text-7xl font-extrabold text-gray-800 dark:text-gray-100">
              {status}
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-200 dark:bg-gray-700" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h1>
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl">
            {description}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Primary button */}
            {primaryAction && (
              <a
                href={primaryAction.href || "#"}
                onClick={handleAction(primaryAction)}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {primaryAction.label}
              </a>
            )}

            {/* Secondary button */}
            {secondaryAction && (
              <a
                href={secondaryAction.href || "#"}
                onClick={handleAction(secondaryAction)}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {secondaryAction.label}
              </a>
            )}
          </div>

          <div className="mt-6 text-xs text-gray-400">
            If you believe this is an error, please contact support.
          </div>
        </div>

        {/* Right: Decorative illustration */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.97 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-64 h-40 md:w-72 md:h-48 bg-gradient-to-tr from-indigo-50 to-pink-50 dark:from-indigo-900 dark:to-pink-900 rounded-2xl flex items-center justify-center shadow-inner"
            aria-hidden="true"
          >
            {/* Simple SVG illustration */}
            <svg
              width="220"
              height="140"
              viewBox="0 0 220 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
            >
              <rect
                x="8"
                y="20"
                width="204"
                height="100"
                rx="12"
                fill="url(#g)"
              />
              <path d="M60 44h100v6H60z" fill="#fff" opacity="0.9" />
              <path d="M60 64h80v6H60z" fill="#fff" opacity="0.8" />
              <circle cx="110" cy="90" r="18" fill="#fff" opacity="0.9" />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#EEF2FF" />
                  <stop offset="1" stopColor="#FCE7F3" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
