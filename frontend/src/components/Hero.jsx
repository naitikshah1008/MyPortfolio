import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiServer,
  FiTerminal,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useProfileStore from "../store/profileStore";
import { loadGsapWithScrollTrigger } from "../utils/animations";

const fallbackRoles = [
  "Full Stack Developer",
  "Backend Engineer",
  "Software Engineer",
  "MERN Stack Developer",
];

const stackHighlights = [
  { icon: FiServer, label: "Backend", value: "Java, Spring Boot, APIs" },
  { icon: FiDatabase, label: "Data", value: "PostgreSQL, Redis, Kafka" },
  { icon: FiCpu, label: "Systems", value: "Reliable, scalable workflows" },
];

const normalizeProfileUrl = (value, baseUrl) => {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  return `${baseUrl}${value.replace(/^@/, "")}`;
};

const Hero = () => {
  const profile = useProfileStore((state) => state.profile);

  const [displayedText, setDisplayedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const heroRef = useRef(null);
  const workspaceRef = useRef(null);
  const socialRef = useRef(null);

  const name = profile?.name || "Naitik Shah";
  const bio =
    profile?.bio ||
    "I build practical web products with a focus on reliable systems, clean interfaces, and thoughtful user flows.";
  const roles = profile?.roles?.length > 0 ? profile.roles : fallbackRoles;
  const activeRole = displayedText || roles[currentRoleIndex % roles.length];
  const profileImage = profile?.profileImage?.url;

  useEffect(() => {
    if (!profile || !heroRef.current) return undefined;

    let ctx;
    let cancelled = false;

    loadGsapWithScrollTrigger().then((gsap) => {
      if (cancelled || !heroRef.current) return;

      ctx = gsap.context(() => {
        gsap.from(".hero-text", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        });

        if (workspaceRef.current) {
          gsap.from(workspaceRef.current, {
            y: 24,
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
            delay: 0.2,
          });
        }

        gsap.from(".social-icon", {
          y: 8,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.45,
        });
      }, heroRef);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [profile]);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex % roles.length];
    const typingSpeed = isDeleting ? 45 : 85;
    const pauseTime = isDeleting ? 420 : 1700;

    if (!isDeleting && displayedText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return undefined;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentRoleIndex(0);
    setIsDeleting(false);
  }, [profile?.roles]);

  return (
    <section
      ref={heroRef}
      className="relative -mt-20 flex min-h-screen items-center overflow-hidden border-b border-slate-200 bg-slate-50 pt-20 text-slate-950 dark:border-white/10 dark:bg-dark-900 dark:text-white"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,145,178,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(8,145,178,0.07)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(to_right,rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(103,232,249,0.055)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(236,254,255,0.88)_0%,rgba(248,250,252,0.78)_45%,rgba(251,246,238,0.58)_100%)] dark:bg-[linear-gradient(120deg,rgba(8,145,178,0.18)_0%,rgba(7,16,23,0)_38%,rgba(169,105,45,0.14)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent dark:from-dark-900" />

      <div className="container relative z-10 px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6">
            <div className="hero-text inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white/80 px-4 py-2 font-mono text-sm font-semibold text-primary-800 shadow-sm dark:!border-dark-700 dark:!bg-dark-800 dark:!text-primary-200 dark:!shadow-none">
              <FiTerminal size={16} />
              ~/portfolio/main
            </div>

            <div className="hero-text space-y-3">
              <p className="text-lg font-semibold text-slate-700 dark:text-gray-300">
                Hi, I am
              </p>
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] text-slate-950 dark:text-white md:text-6xl lg:text-7xl">
                {name}
              </h1>
            </div>

            <div className="hero-text flex min-h-14 w-full max-w-2xl items-center gap-3 rounded-lg border border-slate-300 bg-white/90 px-4 py-3 font-mono text-lg font-semibold text-slate-900 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:!border-dark-700 dark:!bg-dark-800 dark:!text-gray-100 dark:!shadow-[0_14px_34px_rgba(0,0,0,0.18)] md:text-xl">
              <span className="text-primary-700 dark:text-primary-300">$</span>
              <span className="truncate text-primary-800 dark:text-primary-100">
                {activeRole}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block h-6 w-0.5 bg-primary-700 dark:bg-primary-300"
              />
            </div>

            <p className="hero-text max-w-2xl text-base leading-8 text-slate-700 dark:text-gray-300 md:text-lg">
              {bio}
            </p>

            <div className="hero-text flex flex-wrap gap-3 pt-1">
              <Link
                to="/projects"
                className="btn-primary min-h-14 gap-2 px-8 text-base md:text-lg"
              >
                View Projects
                <FiArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-14 w-40 items-center justify-center whitespace-nowrap rounded-lg border border-primary-600 px-8 py-3 text-base font-semibold text-primary-800 transition-colors hover:bg-primary-50 dark:!border-primary-300 dark:!text-white dark:hover:!bg-dark-800 md:text-lg"
              >
                Let's Talk
              </Link>
            </div>

            <div ref={socialRef} className="flex items-center gap-3 pt-2">
              {profile?.github && (
                <a
                  href={normalizeProfileUrl(
                    profile.github,
                    "https://github.com/"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon rounded-lg border border-slate-200 bg-white p-3 text-slate-700 shadow-sm transition-colors hover:border-primary-500 hover:text-primary-700 dark:!border-dark-700 dark:!bg-dark-800 dark:!text-gray-300 dark:!shadow-none dark:hover:!border-primary-300 dark:hover:!text-primary-200"
                  aria-label="GitHub"
                >
                  <FiGithub size={18} />
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={normalizeProfileUrl(
                    profile.linkedin,
                    "https://linkedin.com/in/"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon rounded-lg border border-slate-200 bg-white p-3 text-slate-700 shadow-sm transition-colors hover:border-primary-500 hover:text-primary-700 dark:!border-dark-700 dark:!bg-dark-800 dark:!text-gray-300 dark:!shadow-none dark:hover:!border-primary-300 dark:hover:!text-primary-200"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={18} />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="social-icon rounded-lg border border-slate-200 bg-white p-3 text-slate-700 shadow-sm transition-colors hover:border-primary-500 hover:text-primary-700 dark:!border-dark-700 dark:!bg-dark-800 dark:!text-gray-300 dark:!shadow-none dark:hover:!border-primary-300 dark:hover:!text-primary-200"
                  aria-label="Email"
                >
                  <FiMail size={18} />
                </a>
              )}
            </div>
          </div>

          <div ref={workspaceRef} className="relative">
            <div className="rounded-lg border border-slate-200 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:!border-dark-700 dark:!bg-dark-800 dark:!shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:!border-dark-700">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="font-mono text-xs text-slate-500 dark:text-gray-400">
                  engineer.profile.ts
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-2">
                <div className="border-b border-slate-200 p-5 dark:!border-dark-700 md:border-b-0 md:border-r">
                  <pre className="overflow-hidden whitespace-pre-wrap font-mono text-sm leading-7 text-slate-700 dark:text-gray-300 md:text-[15px]">
                    <code>
                      <span className="text-slate-500 dark:text-gray-500">const</span>{" "}
                      <span className="text-primary-700 dark:text-primary-300">engineer</span>{" "}
                      <span className="text-slate-500 dark:text-gray-500">=</span>{" "}
                      <span className="text-slate-950 dark:text-gray-100">{"{"}</span>
                      {"\n  "}
                      <span className="text-slate-500 dark:text-gray-400">name:</span>{" "}
                      <span className="text-emerald-700 dark:text-emerald-300">"{name}"</span>,
                      {"\n  "}
                      <span className="text-slate-500 dark:text-gray-400">role:</span>{" "}
                      <span className="text-emerald-700 dark:text-emerald-300">"{activeRole}"</span>,
                      {"\n  "}
                      <span className="text-slate-500 dark:text-gray-400">focus:</span>{" "}
                      <span className="text-slate-950 dark:text-gray-100">[</span>
                      <span className="text-emerald-700 dark:text-emerald-300">"APIs"</span>,{" "}
                      <span className="text-emerald-700 dark:text-emerald-300">"data"</span>
                      <span className="text-slate-950 dark:text-gray-100">]</span>,
                      {"\n  "}
                      <span className="text-slate-500 dark:text-gray-400">ships:</span>{" "}
                      <span className="text-slate-950 dark:text-gray-100">[</span>
                      <span className="text-emerald-700 dark:text-emerald-300">"reliable"</span>
                      <span className="text-slate-950 dark:text-gray-100">]</span>
                      {"\n"}
                      <span className="text-slate-950 dark:text-gray-100">{"}"}</span>;
                      {"\n\n"}
                      <span className="text-accent-700 dark:text-accent-300">export default</span>{" "}
                      <span className="text-primary-700 dark:text-primary-300">build</span>
                      <span className="text-slate-950 dark:text-gray-100">(engineer)</span>;
                    </code>
                  </pre>
                </div>

                <div className="flex flex-col justify-between p-4">
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:!border-dark-700 dark:!bg-dark-700">
                    <div className="aspect-[4/5] bg-slate-100 dark:bg-dark-700">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-7xl font-bold text-primary-700 dark:text-primary-300">
                            {name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 font-mono text-xs text-emerald-900 dark:!border-dark-700 dark:!bg-dark-700 dark:!text-emerald-100">
                    <div className="mb-2 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <FiCode size={14} />
                      production-ready
                    </div>
                    <div className="space-y-1 text-slate-700 dark:text-gray-300">
                      <div>status: available</div>
                      <div>tests: passing</div>
                      <div>deploy: stable</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 border-t border-slate-200 p-4 dark:!border-dark-700 md:grid-cols-3">
                {stackHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:!border-dark-700 dark:!bg-dark-700"
                    >
                      <div className="mb-2 flex items-center gap-2 text-primary-700 dark:text-primary-200">
                        <Icon size={16} />
                        <span className="font-mono text-xs">{item.label}</span>
                      </div>
                      <p className="text-sm leading-6 text-slate-700 dark:text-gray-300">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
