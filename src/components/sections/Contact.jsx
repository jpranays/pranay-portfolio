import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Send, CheckCircle,
  AlertCircle, Code2, Twitter, Package,
} from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";
import { cn } from "../../utils/cn";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be under 500 characters"),
});

const SOCIAL_LINKS = [
  {
    href: "https://github.com/jpranays",
    icon: Github,
    label: "GitHub",
    handle: "@jpranays",
    hoverColor: "group-hover:text-slate-700 dark:group-hover:text-slate-200",
  },
  {
    href: "https://www.linkedin.com/in/jpranays",
    icon: Linkedin,
    label: "LinkedIn",
    handle: "linkedin.com/in/jpranays",
    hoverColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  },
  {
    href: "https://x.com/jpranays",
    icon: Twitter,
    label: "Twitter / X",
    handle: "@jpranays",
    hoverColor: "group-hover:text-sky-500 dark:group-hover:text-sky-400",
  },
  {
    href: "mailto:pranay1315@gmail.com",
    icon: Mail,
    label: "Email",
    handle: "pranay1315@gmail.com",
    hoverColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
  },
  {
    href: "https://www.npmjs.com/~jpranays",
    icon: Package,
    label: "npm",
    handle: "npmjs.com/~jpranays",
    hoverColor: "group-hover:text-red-500 dark:group-hover:text-red-400",
  },
  {
    href: "https://leetcode.com/u/jpranays",
    icon: Code2,
    label: "LeetCode",
    handle: "@jpranays",
    hoverColor: "group-hover:text-yellow-500 dark:group-hover:text-yellow-400",
  },
];

function InputField({ id, label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400"
            role="alert"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm " +
  "text-slate-800 dark:text-slate-200 " +
  "placeholder-slate-400 dark:placeholder-slate-600 " +
  "bg-slate-50 dark:bg-white/[0.04] " +
  "border border-slate-200 dark:border-white/[0.08] " +
  "focus:outline-none focus:border-orange-500/50 focus:bg-white dark:focus:bg-white/[0.06] focus:ring-1 focus:ring-orange-500/30 " +
  "transition-all duration-200";

const inputErrorClass =
  "border-red-400/60 dark:border-red-500/40 focus:border-red-400/50 focus:ring-red-500/20";

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setStatus("loading");
    try {
      const params = new URLSearchParams({
        "form-name": "contact",
        "bot-field": "",
        name: data.name,
        email: data.email,
        message: data.message,
      });

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (res.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="section-container">
        <AnimatedSection>
          <p className="section-label">
            <span className="glow-dot" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-heading" className="section-title">
            Let&apos;s{" "}
            <span className="gradient-text">connect</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, an opportunity to discuss, or just want to say hi?
            I&apos;d love to hear from you.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — 3 cols */}
          <AnimatedSection delay={0.1} className="lg:col-span-3">
            <div className="glass-card p-6 sm:p-8">
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Contact form"
              >
                {/* Netlify hidden fields — NOT managed by RHF */}
                <input type="hidden" name="form-name" value="contact" />
                <p hidden aria-hidden="true">
                  <label>
                    Don&apos;t fill this out:{" "}
                    <input name="bot-field" />
                  </label>
                </p>

                <div className="space-y-5">
                  <InputField id="name" label="Your name" error={errors.name?.message}>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      className={cn(inputClass, errors.name && inputErrorClass)}
                      {...register("name")}
                    />
                  </InputField>

                  <InputField id="email" label="Email address" error={errors.email?.message}>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      className={cn(inputClass, errors.email && inputErrorClass)}
                      {...register("email")}
                    />
                  </InputField>

                  <InputField id="message" label="Message" error={errors.message?.message}>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      className={cn(inputClass, "resize-none", errors.message && inputErrorClass)}
                      {...register("message")}
                    />
                  </InputField>

                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={cn(
                      "btn-primary w-full justify-center",
                      (status === "loading" || status === "success") &&
                        "opacity-70 cursor-not-allowed pointer-events-none"
                    )}
                    aria-live="polite"
                    aria-label={
                      status === "loading"
                        ? "Sending message"
                        : status === "success"
                        ? "Message sent successfully"
                        : "Send message"
                    }
                  >
                    {status === "loading" && (
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    {status === "success" && (
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                    )}
                    {status === "loading"
                      ? "Sending…"
                      : status === "success"
                      ? "Message sent!"
                      : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                  </button>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 text-sm text-red-500 dark:text-red-400"
                        role="alert"
                      >
                        <AlertCircle className="w-4 h-4" aria-hidden="true" />
                        Something went wrong. Email me directly at{" "}
                        <a
                          href="mailto:pranay1315@gmail.com"
                          className="underline hover:text-red-400 dark:hover:text-red-300"
                        >
                          pranay1315@gmail.com
                        </a>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </AnimatedSection>

          {/* Right column — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Availability card */}
            <AnimatedSection delay={0.15}>
              <div className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0 animate-pulse"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Open to opportunities
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Available for full-time, freelance, or open-source collaboration.
                      Typical response: under 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Social links */}
            <AnimatedSection delay={0.2} className="flex-1">
              <div className="glass-card p-5">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                  Find me online
                </p>
                <ul className="space-y-1" role="list">
                  {SOCIAL_LINKS.map(({ href, icon: Icon, label, handle, hoverColor }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        aria-label={`${label}: ${handle}`}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-2.5 rounded-xl",
                          "text-slate-500 dark:text-slate-400 transition-all duration-200",
                          "hover:bg-slate-100 dark:hover:bg-white/[0.04]",
                          hoverColor
                        )}
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] flex items-center justify-center flex-shrink-0 group-hover:border-slate-300 dark:group-hover:border-white/[0.12] transition-colors">
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-400 dark:text-slate-600 font-mono leading-none mb-0.5">
                            {label}
                          </p>
                          <p className="text-sm font-medium truncate leading-none">
                            {handle}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);
