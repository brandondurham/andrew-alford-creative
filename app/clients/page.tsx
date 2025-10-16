"use client";

import { useState } from "react";

// Components
import { ContentMasthead } from "@/components/ContentMasthead";
import { Content } from "@/components/Content";

// Utils
import { classes } from "@/utils";

export default function ClientPortal({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    const timeout = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 2000);
    return () => clearTimeout(timeout);
  };
  return (
    <Content className={className}>
      <ContentMasthead>Client Portal</ContentMasthead>
      <article
        className={classes(
          "flex flex-col gap-4 font-ringside-regular font-medium leading-[1.2] text-pretty bg-gray-100",
          "p-[2vw] lg:p-[1vw] pb-[6vh] lg:pb-[6vh] font-semibold"
        )}
      >
        <h2>Client Portal</h2>
        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="email">Email Address</label>
          <input
            className={classes(
              "border-b-2 border-gray-900 w-full px-0 py-2",
              "disabled:opacity-30 disabled:cursor-not-allowed"
            )}
            disabled={isSubmitting}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            value={email}
          />
          {isSubmitted && (
            <div className="text-theme-p animate-fade-in">
              <p>
                We’re sorry. We can’t seem to find that email in our system.
                Please try again.
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end text-background">
          <button
            className={classes(
              "cursor-pointer",
              isSubmitting ? "opacity-30 cursor-not-allowed" : ""
            )}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Enter"}
          </button>
        </div>
      </article>
    </Content>
  );
}
