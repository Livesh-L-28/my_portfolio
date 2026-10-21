import React from "react";

export const GithubIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    className={`shrink-0 ${className}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ maxWidth: "100%", maxHeight: "100%" }}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    className={`shrink-0 ${className}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ maxWidth: "100%", maxHeight: "100%" }}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const PythonIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    className={`shrink-0 ${className}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ maxWidth: "100%", maxHeight: "100%" }}
  >
    <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.81v.825H3.9S0 5.78 0 11.904c0 6.123 3.404 5.91 3.404 5.91h2.032v-2.857s-.11-3.404 3.35-3.404h5.753s3.242.053 3.242-3.136V2.656S18.243 0 11.914 0zm-3.21 1.705a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752h-5.81v-.825h8.116s3.9.453 3.9-5.671c0-6.123-3.404-5.91-3.404-5.91h-2.032v2.857s.11 3.404-3.35 3.404H9.461s-3.242-.053-3.242 3.136v5.776S5.757 24 12.086 24zm3.21-1.705a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z" />
  </svg>
);
