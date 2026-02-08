/*
 * WizardHub — Workshop Blueprint Design
 * "Before You Call" — Central landing page for all troubleshooting wizards
 * Navy background, safety orange accents, DM Sans headings
 * Search bar with real-time filtering, grid layout with wizard cards,
 * difficulty badges, and quick-launch buttons
 */
import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Zap,
  Car,
  TreePine,
  Bike,
  Flame,
  GraduationCap,
  ArrowRight,
  Clock,
  BarChart3,
  ClipboardList,
  Search,
  X,
} from "lucide-react";

/* ─── Wizard Data ─── */
interface WizardInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  totalSteps: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  topics: string[];
  keywords: string[];
}

const wizards: WizardInfo[] = [
  {
    id: "electrical",
    title: "Electrical",
    subtitle: "What's Wrong?",
    description:
      "Diagnose home electrical issues step by step — from a single dead outlet to a whole-house outage. Covers GFCI resets, breaker checks, and when to call a licensed electrician.",
    icon: <Zap className="w-7 h-7" />,
    href: "/wizard",
    difficulty: "Beginner",
    estimatedTime: "3–5 min",
    totalSteps: "30+ nodes",
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/10 to-yellow-600/5",
    borderColor: "border-yellow-500/30",
    topics: ["Dead outlets", "Tripped breakers", "Whole-house outage", "GFCI resets"],
    keywords: ["electrical", "outlet", "breaker", "gfci", "power", "lights", "no power", "outage", "circuit", "fuse", "plug", "switch", "wiring", "electrician", "home", "house"],
  },
  {
    id: "automotive",
    title: "Car Won't Start",
    subtitle: "Automotive",
    description:
      "Walk through the most common reasons a car won't start — from a completely dead dashboard to grinding noises. Covers battery, starter, fuel, and ignition diagnostics.",
    icon: <Car className="w-7 h-7" />,
    href: "/wizard/automotive",
    difficulty: "Intermediate",
    estimatedTime: "4–7 min",
    totalSteps: "40+ nodes",
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/30",
    topics: ["Dead battery", "Starter issues", "Fuel problems", "Ignition system"],
    keywords: ["car", "auto", "automotive", "vehicle", "battery", "starter", "fuel", "ignition", "engine", "won't start", "dead", "click", "crank", "grinding", "dashboard", "key", "truck", "suv"],
  },
  {
    id: "lawn-garden",
    title: "Mower Won't Start",
    subtitle: "Lawn & Garden",
    description:
      "Covers gas push mowers, riding mowers, battery-powered, and corded electric models. Diagnose fuel, spark, battery, and safety interlock issues before calling a tech.",
    icon: <TreePine className="w-7 h-7" />,
    href: "/wizard/lawn-garden",
    difficulty: "Beginner",
    estimatedTime: "3–6 min",
    totalSteps: "60+ nodes",
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/10 to-emerald-600/5",
    borderColor: "border-emerald-500/30",
    topics: ["Gas mowers", "Riding mowers", "Electric mowers", "Safety switches"],
    keywords: ["mower", "lawn", "garden", "grass", "riding", "push", "electric", "gas", "spark plug", "pull cord", "blade", "yard", "tractor", "weed", "trimmer"],
  },
  {
    id: "motorcycle",
    title: "Motorcycle Won't Start",
    subtitle: "Motorcycle",
    description:
      "Diagnose why your motorcycle won't fire — from kill switch and kickstand safety to fuel injection, carburetor, and cold-start procedures. Covers both FI and carbureted bikes.",
    icon: <Bike className="w-7 h-7" />,
    href: "/wizard/motorcycle",
    difficulty: "Intermediate",
    estimatedTime: "4–6 min",
    totalSteps: "50+ nodes",
    color: "text-orange-400",
    bgGradient: "from-orange-500/10 to-orange-600/5",
    borderColor: "border-orange-500/30",
    topics: ["Kill switch", "Fuel system", "Spark & ignition", "Safety interlocks"],
    keywords: ["motorcycle", "bike", "motorbike", "kill switch", "kickstand", "carburetor", "fuel injection", "choke", "spark", "battery", "starter", "stall", "two-wheel"],
  },
];

/* ─── Search Helpers ─── */
function matchesSearch(wizard: WizardInfo, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const terms = q.split(/\s+/);
  const searchable = [
    wizard.title,
    wizard.subtitle,
    wizard.description,
    ...wizard.topics,
    ...wizard.keywords,
  ]
    .join(" ")
    .toLowerCase();
  return terms.every((term) => searchable.includes(term));
}

/* ─── Quick Suggestion Chips ─── */
const suggestions = [
  { label: "Car won't start", query: "car won't start" },
  { label: "No power", query: "no power" },
  { label: "Mower", query: "mower" },
  { label: "Motorcycle", query: "motorcycle" },
  { label: "Battery", query: "battery" },
  { label: "Breaker", query: "breaker" },
];

/* ─── Difficulty Badge ─── */
function DifficultyBadge({ level }: { level: WizardInfo["difficulty"] }) {
  const config = {
    Beginner: {
      bg: "bg-emerald-500/15",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      dots: 1,
    },
    Intermediate: {
      bg: "bg-amber-500/15",
      text: "text-amber-400",
      border: "border-amber-500/30",
      dots: 2,
    },
    Advanced: {
      bg: "bg-red-500/15",
      text: "text-red-400",
      border: "border-red-500/30",
      dots: 3,
    },
  }[level];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className="flex gap-0.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i < config.dots ? "bg-current" : "bg-current/20"}`}
          />
        ))}
      </span>
      {level}
    </span>
  );
}

/* ─── Wizard Card ─── */
function WizardCard({ wizard, index }: { wizard: WizardInfo; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      <Link href={wizard.href} className="block group">
        <div
          className={`relative bg-gradient-to-br ${wizard.bgGradient} rounded-2xl border ${wizard.borderColor} p-6 md:p-7 transition-all duration-300 hover:border-safety-orange/50 hover:shadow-lg hover:shadow-safety-orange/5 hover:-translate-y-1`}
        >
          {/* Top Row: Icon + Difficulty */}
          <div className="flex items-start justify-between mb-5">
            <div
              className={`w-14 h-14 rounded-xl bg-navy-dark/60 border border-white/10 flex items-center justify-center ${wizard.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              {wizard.icon}
            </div>
            <DifficultyBadge level={wizard.difficulty} />
          </div>

          {/* Title */}
          <p className="font-mono text-[10px] text-steel/60 uppercase tracking-widest mb-1">
            {wizard.subtitle}
          </p>
          <h3 className="font-sans font-bold text-warm-white text-xl mb-2 group-hover:text-safety-orange transition-colors">
            {wizard.title}
          </h3>

          {/* Description */}
          <p className="font-serif text-steel text-sm leading-relaxed mb-5">
            {wizard.description}
          </p>

          {/* Topics */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {wizard.topics.map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-steel/70 text-[11px] font-mono"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Meta Row */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/8">
            <span className="inline-flex items-center gap-1.5 text-steel/50 text-xs font-mono">
              <Clock className="w-3 h-3" />
              {wizard.estimatedTime}
            </span>
            <span className="inline-flex items-center gap-1.5 text-steel/50 text-xs font-mono">
              <BarChart3 className="w-3 h-3" />
              {wizard.totalSteps}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-safety-orange text-sm font-sans font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Start
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WIZARD HUB PAGE
   ═══════════════════════════════════════════════════════════ */
export default function WizardHub() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () => wizards.filter((w) => matchesSearch(w, query)),
    [query]
  );

  const hasQuery = query.trim().length > 0;

  /* Keyboard shortcut: "/" to focus search */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && isFocused) {
        inputRef.current?.blur();
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFocused]);

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-safety-orange/8 via-transparent to-transparent" />
        <div className="container relative py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-safety-orange/10 border border-safety-orange/20 mb-5">
              <Flame className="w-3.5 h-3.5 text-safety-orange" />
              <span className="font-mono text-[11px] text-safety-orange tracking-widest uppercase">
                Troubleshooting Wizards
              </span>
            </div>
            <h1 className="font-sans font-extrabold text-warm-white text-4xl md:text-5xl leading-tight mb-4">
              Pick Your{" "}
              <span className="text-safety-orange">Problem.</span>
              <br />
              Follow the Steps.
            </h1>
            <p className="font-serif text-steel text-lg leading-relaxed mb-8 max-w-xl">
              Interactive decision trees that walk you through what to check —
              step by step — before calling a professional. Each wizard ends
              with exactly what to say when you make the call.
            </p>

            {/* ─── Search Bar ─── */}
            <div className="max-w-lg">
              <div
                className={`relative flex items-center rounded-xl border-2 transition-all duration-300 ${
                  isFocused
                    ? "border-safety-orange bg-navy-dark shadow-lg shadow-safety-orange/10"
                    : "border-white/15 bg-white/[0.04] hover:border-white/25"
                }`}
              >
                <Search
                  className={`absolute left-4 w-5 h-5 transition-colors ${
                    isFocused ? "text-safety-orange" : "text-steel/50"
                  }`}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="What's broken? Try &quot;car won't start&quot; or &quot;no power&quot;..."
                  className="w-full bg-transparent pl-12 pr-20 py-3.5 text-warm-white font-sans text-sm placeholder:text-steel/40 focus:outline-none"
                />
                {hasQuery ? (
                  <button
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className="absolute right-4 p-1 rounded-md text-steel/50 hover:text-warm-white hover:bg-white/10 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="absolute right-4 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-steel/40 text-[11px] font-mono">
                    /
                  </span>
                )}
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestions.map((s) => (
                  <button
                    key={s.query}
                    onClick={() => {
                      setQuery(s.query);
                      inputRef.current?.focus();
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                      query.toLowerCase() === s.query.toLowerCase()
                        ? "bg-safety-orange/20 border-safety-orange/40 text-safety-orange"
                        : "bg-white/[0.04] border-white/10 text-steel/50 hover:text-steel hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Meta Links */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="inline-flex items-center gap-2 text-steel/50 text-sm font-mono">
                <GraduationCap className="w-4 h-4" />
                Educational Only — Not a Repair Manual
              </div>
              <Link
                href="/my-diagnoses"
                className="inline-flex items-center gap-1.5 text-safety-orange text-sm font-sans font-semibold hover:underline"
              >
                <ClipboardList className="w-3.5 h-3.5" />
                View Saved Diagnoses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wizard Grid */}
      <section className="container pb-16 md:pb-24">
        {/* Results Count */}
        {hasQuery && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <p className="text-steel/60 text-sm font-mono">
              {filtered.length === 0
                ? "No wizards match your search"
                : `${filtered.length} wizard${filtered.length !== 1 ? "s" : ""} found`}
              {" · "}
              <button
                onClick={() => setQuery("")}
                className="text-safety-orange hover:underline"
              >
                Clear search
              </button>
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((wizard, i) => (
                  <WizardCard key={wizard.id} wizard={wizard} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-5">
                <Search className="w-8 h-8 text-steel/30" />
              </div>
              <h3 className="font-sans font-bold text-warm-white text-lg mb-2">
                No matching wizards
              </h3>
              <p className="font-serif text-steel text-sm max-w-md mx-auto mb-5">
                We don't have a wizard for "{query}" yet. Try a different search
                term, or browse our knowledge trees for educational content on
                that topic.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setQuery("")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-safety-orange text-navy-dark font-sans font-semibold text-sm hover:bg-safety-orange-light transition-colors"
                >
                  Show All Wizards
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-light border border-white/10 text-warm-white font-sans font-semibold text-sm hover:bg-navy-light/80 hover:border-safety-orange/30 transition-all"
                >
                  Browse Knowledge Trees
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        {!hasQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-white/[0.03] border border-white/8">
              <p className="font-sans font-semibold text-warm-white text-base">
                Don't see your problem?
              </p>
              <p className="font-serif text-steel text-sm max-w-md">
                Browse our knowledge trees for in-depth educational content on
                automotive, motorcycle, lawn & garden, engine, and electrical
                systems.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-1 px-5 py-2.5 rounded-xl bg-navy-light border border-white/10 text-warm-white font-sans font-semibold text-sm hover:bg-navy-light/80 hover:border-safety-orange/30 transition-all"
              >
                Browse Knowledge Trees
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
