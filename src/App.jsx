import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  BarChart3,
  Github,
  Linkedin,
  Mail,
  Mic,
  Phone,
  Send,
  Shield,
} from 'lucide-react';

const sectionIds = ['hero', 'overview', 'projects', 'building', 'connect'];

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'building', label: 'Building' },
  { id: 'connect', label: 'Connect' },
];

const profile = {
  name: 'Arihanth Sharma',
  role: 'Backend Engineer',
  tagline: 'I love building production-oriented backend systems with reliable architecture, strong security, and practical GenAI/LLM integrations for real-world impact.',
  resume: '/resumeV2.pdf',
  linkedin: 'https://www.linkedin.com/in/arihanthsharma15',
  github: 'https://github.com/arihanthsharma15',
  email: 'arihanthsharma10@gmail.com',
  phone: '+91 9319334144',
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const containerMotion = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const projects = [
  {
    icon: Shield,
    title: 'Aegis: Defense Telemetry',
    subtitle: 'Security',
    link: 'https://aegis-production-1d3c.up.railway.app/dashboard',
    linkLabel: 'Live Dashboard',
    bullets: [
      'Redis-backed sliding-window rate limiter for burst mitigation',
      'Blocked 20.8% of 120 simulated burst requests with 0 errors',
      '7-day persistent security dashboard for threat trend analysis',
      'Alert pipeline for repeated brute-force and anomaly spikes',
    ],
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Activity,
    title: 'SOAPify: Clinical RAG',
    subtitle: 'Architecture',
    link: 'https://soa-pify.vercel.app/',
    linkLabel: 'Live Project',
    bullets: [
      'Modular monolith architecture with clean service boundaries',
      '90% reduction in documentation time for clinical workflows',
      'Async RAG pipeline using BackgroundTasks for non-blocking flow',
      'Prompt + retrieval guardrails for dependable summarization',
    ],
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: BarChart3,
    title: 'Nefera: Multi-Tenant Identity',
    subtitle: 'Security',
    link: 'https://github.com/arihanthsharma15/Nefera',
    linkLabel: 'GitHub Repo',
    bullets: [
      'Supabase RLS for strict tenant-level data isolation',
      'Automated PHQ-9 and GAD-7 clinical scoring engine',
      'Role-scoped access control for clinician and admin workflows',
      'Audit-ready auth event tracking for compliance visibility',
    ],
    className: 'md:col-span-1 md:row-span-1',
  },
];

const overviewParagraph =
  'I am a Backend Engineer focused on building production-oriented systems that are reliable, scalable, and secure. I design high-concurrency APIs with clean architecture, integrate GenAI/LLM workflows into practical products, and optimize for real production constraints like observability, fault tolerance, and maintainability.';

const skills = [
  'Languages: Python, SQL, Java, JavaScript',
  'Frontend: React, Tailwind CSS, Chart.js',
  'Backend: FastAPI, REST APIs, JWT, RBAC, Swagger (OpenAPI), AsyncIO, Pydantic, BackgroundTasks',
  'Databases: PostgreSQL, Supabase (RLS), Redis, ChromaDB',
  'Tools & Platforms: Docker, Git, Linux (Bash/Shell), Streamlit Cloud, Railway',
  'AI/LLM: RAG, Vector Embeddings, Prompt Engineering, Groq API, Ollama APIs',
];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -55% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

function Navbar({ activeSection }) {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/15 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <p className="font-mono text-sm tracking-[0.12em] text-emerald-400">{profile.name}</p>

        <div className="ml-auto hidden items-center gap-2 text-sm md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                className={`rounded-lg px-3 py-2 transition ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'text-zinc-300 hover:text-emerald-400'
                }`}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}

function SocialRail() {
  const links = useMemo(
    () => [
      { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin },
      { href: profile.github, label: 'GitHub', icon: Github },
    ],
    []
  );

  return (
    <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center justify-center rounded-xl p-3 text-zinc-300 transition hover:-translate-y-1 hover:text-emerald-300"
            aria-label={link.label}
            title={link.label}
          >
            <Icon size={16} />
          </a>
        );
      })}
    </aside>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 pb-14 pt-20 md:px-8 md:pt-24"
    >
      <div className="relative">
        <h1 className="pointer-events-none absolute -top-12 left-4 z-10 font-mono text-2xl leading-tight text-zinc-100 md:-top-14 md:left-7 md:text-5xl">
          {profile.name} - {profile.role}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass animate-pulseGlow rounded-2xl p-7 pt-14 md:p-10 md:pt-20"
        >
          <p className="max-w-3xl text-base text-zinc-300 md:text-lg">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#overview"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/45 bg-emerald-500/15 px-5 py-3 font-medium text-emerald-300 transition hover:-translate-y-0.5 hover:bg-emerald-500/25"
            >
              View Overview <ArrowDown size={16} />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl border border-zinc-700 px-5 py-3 text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
            >
              View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Connect() {
  const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;

    if (!formEndpoint) {
      setSubmitState({
        type: 'error',
        message: 'Set VITE_FORMSPREE_ENDPOINT to receive form emails directly.',
      });
      return;
    }

    const formData = new FormData(formEl);
    setIsSubmitting(true);
    setSubmitState({ type: '', message: '' });

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const firstError = errorPayload?.errors?.[0]?.message;
        throw new Error(firstError || `Submission failed (${response.status})`);
      }

      formEl.reset();
      setSubmitState({ type: 'success', message: 'Message sent successfully.' });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error?.message || 'Message failed. Try again in a minute.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="connect" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 pb-20 md:px-8">
      <h2 className="mb-4 font-mono text-2xl text-zinc-100 md:text-3xl">Let Us Connect</h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        whileHover={{ y: -8 }}
        className="glass rounded-2xl p-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 text-zinc-200">
            <p className="text-zinc-300">
              Open to backend engineering collaborations, GenAI/LLM integrations, and
              system design opportunities.
            </p>
            <p className="inline-flex items-center gap-2 text-sm">
              <Mail size={16} className="text-emerald-400" /> {profile.email}
            </p>
            <p className="inline-flex items-center gap-2 pl-2 text-sm">
              <Phone size={16} className="text-emerald-400" /> {profile.phone}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <input
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/50"
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
            <input
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/50"
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <textarea
              className="h-28 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/50"
              name="message"
              placeholder="Your message"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/45 bg-emerald-500/15 px-5 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={14} />
            </button>
            {submitState.message ? (
              <p
                className={`text-sm ${
                  submitState.type === 'success' ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {submitState.message}
              </p>
            ) : null}
          </form>
        </div>
      </motion.div>
    </section>
  );
}

function Overview() {
  return (
    <section id="overview" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
      <h2 className="mb-4 font-mono text-2xl text-zinc-100 md:text-3xl">Overview</h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        whileHover={{ y: -8 }}
        className="glass rounded-2xl p-6"
      >
        <p className="text-sm leading-7 text-zinc-200 md:text-base">{overviewParagraph}</p>
        <div className="mt-6 space-y-2">
          <h3 className="font-mono text-base text-emerald-300">Skills</h3>
          {skills.map((skill) => (
            <p
              key={skill}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm text-zinc-200"
            >
              {skill}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ProjectsBento() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 className="text-emerald-400" size={20} />
        <h2 className="font-mono text-2xl text-zinc-100 md:text-3xl">What I Have Created?</h2>
      </div>

      <motion.div
        variants={containerMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid auto-rows-[minmax(210px,auto)] grid-cols-1 gap-4 md:grid-cols-3"
      >
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.title}
              variants={cardMotion}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`glass group rounded-2xl p-6 shadow-glow transition ${project.className}`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-emerald-300">
                  <Icon size={14} /> {project.subtitle}
                </span>
                {project.status ? (
                  <span className="font-mono text-xs text-zinc-400">[{project.status}]</span>
                ) : null}
              </div>
              <h3 className="text-xl font-semibold text-zinc-100">{project.title}</h3>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm text-emerald-300 hover:text-emerald-200"
                >
                  {project.linkLabel || 'Open Project'}
                </a>
              ) : null}
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {project.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function BuildingNow() {
  const points = [
    'Answers patient calls automatically using voice AI',
    'Understands patient requests through conversation',
    'Creates structured tasks for clinic staff',
    'Escalates to humans when needed (critical feature)',
    'Reduces administrative burden by 50-70%',
  ];

  return (
    <section id="building" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
      <div className="mb-6 flex items-center gap-3">
        <Mic className="text-emerald-400" size={20} />
        <h2 className="font-mono text-2xl text-zinc-100 md:text-3xl">What Am I Building?</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        whileHover={{ y: -8 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="font-mono text-xl text-zinc-100">CliniqAI</h3>
        <p className="mt-2 text-sm text-emerald-300">Building this for US healthcare.</p>
        <p className="mt-4 text-sm text-zinc-300">
          Problem Statement: Clinics lose significant time handling repetitive inbound calls,
          which overloads front-desk staff and delays patient service.
        </p>
        <p className="mt-3 text-sm text-zinc-300">
          Solution: An AI-powered phone system for medical clinics that:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-zinc-200">
          {points.map((point) => (
            <li key={point} className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

export default function App() {
  const activeSection = useActiveSection();

  return (
    <main className="scan-grid min-h-screen bg-obsidian text-zinc-100">
      <Navbar activeSection={activeSection} />
      <SocialRail />
      <Hero />
      <Overview />
      <ProjectsBento />
      <BuildingNow />
      <Connect />
    </main>
  );
}
