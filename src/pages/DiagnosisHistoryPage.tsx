/*
 * DiagnosisHistoryPage — Workshop Blueprint Design
 * "Before You Call" — View saved diagnostic paths
 * Pull up your notes when calling a professional
 */
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useDiagnosisHistory, type SavedDiagnosis } from "@/hooks/useDiagnosisHistory";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ClipboardList,
  Trash2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Zap,
  Car,
  TreePine,
  Bike,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Phone,
  ArrowRight,
} from "lucide-react";

const WIZARD_META: Record<string, { label: string; icon: React.ReactNode; color: string; href: string }> = {
  electrical: {
    label: "Electrical",
    icon: <Zap className="w-4 h-4" />,
    color: "text-yellow-500",
    href: "/wizard",
  },
  automotive: {
    label: "Car Won't Start",
    icon: <Car className="w-4 h-4" />,
    color: "text-blue-400",
    href: "/wizard/automotive",
  },
  "lawn-garden": {
    label: "Mower Won't Start",
    icon: <TreePine className="w-4 h-4" />,
    color: "text-emerald-400",
    href: "/wizard/lawn-garden",
  },
  motorcycle: {
    label: "Motorcycle Won't Start",
    icon: <Bike className="w-4 h-4" />,
    color: "text-orange-400",
    href: "/wizard/motorcycle",
  },
};

function OutcomeIcon({ type }: { type: string }) {
  if (type === "resolved") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
  if (type === "call-tech") return <Phone className="w-5 h-5 text-blue-500" />;
  return <AlertTriangle className="w-5 h-5 text-red-500" />;
}

function OutcomeBadge({ type }: { type: string }) {
  const styles =
    type === "resolved"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : type === "call-tech"
        ? "bg-blue-100 text-blue-700 border-blue-200"
        : "bg-red-100 text-red-700 border-red-200";
  const label =
    type === "resolved" ? "Self-Resolved" : type === "call-tech" ? "Call a Pro" : "Safety Stop";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-sans font-bold border ${styles}`}>
      <OutcomeIcon type={type} />
      {label}
    </span>
  );
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
}

function DiagnosisCard({
  diagnosis,
  onDelete,
}: {
  diagnosis: SavedDiagnosis;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const meta = WIZARD_META[diagnosis.wizardType] || WIZARD_META.electrical;

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-4 flex items-start gap-3">
        <div className="mt-0.5">
          <OutcomeIcon type={diagnosis.outcome.type} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`inline-flex items-center gap-1 text-xs font-sans font-semibold ${meta.color}`}>
              {meta.icon}
              {meta.label}
            </span>
            <OutcomeBadge type={diagnosis.outcome.type} />
          </div>
          <h3 className="font-sans font-bold text-foreground text-sm leading-snug">
            {diagnosis.outcome.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-xs font-mono">
            <Clock className="w-3 h-3" />
            {formatDate(diagnosis.timestamp)}
            <span className="mx-1">·</span>
            {diagnosis.steps.length} steps
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onDelete(diagnosis.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border pt-3">
              {/* Outcome Message */}
              <div
                className={`rounded-lg p-3 mb-3 text-sm font-serif leading-relaxed ${
                  diagnosis.outcome.type === "resolved"
                    ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500"
                    : diagnosis.outcome.type === "call-tech"
                      ? "bg-blue-50 text-blue-800 border-l-4 border-blue-500"
                      : "bg-red-50 text-red-800 border-l-4 border-red-500"
                }`}
              >
                {diagnosis.outcome.message}
              </div>

              {/* Pro Tip */}
              {diagnosis.outcome.tip && (
                <div className="rounded-lg p-3 mb-3 bg-amber-50 border-l-4 border-amber-400 text-sm text-amber-800 font-serif leading-relaxed">
                  <strong className="font-sans">Pro Tip:</strong> {diagnosis.outcome.tip}
                </div>
              )}

              {/* Call Script */}
              {diagnosis.outcome.script && (
                <div className="rounded-lg p-3 mb-3 bg-white border border-blue-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-sm">📋</span>
                    <strong className="text-xs font-sans text-foreground">What to Say When You Call:</strong>
                  </div>
                  <p className="text-sm leading-relaxed text-navy bg-slate-50 rounded-lg p-3 italic font-serif">
                    "{diagnosis.outcome.script}"
                  </p>
                  <button
                    onClick={() => handleCopy(diagnosis.outcome.script!)}
                    className={`mt-2 px-3 py-1.5 rounded-lg border text-xs font-sans font-semibold transition-colors ${
                      copiedScript
                        ? "border-emerald-300 text-emerald-600 bg-emerald-50"
                        : "border-blue-200 text-blue-600 bg-white hover:bg-blue-50"
                    }`}
                  >
                    {copiedScript ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied!
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Copy Script
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* Steps Timeline */}
              <div className="mt-3">
                <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Diagnostic Path
                </p>
                <div className="space-y-0">
                  {diagnosis.steps.map((step, i) => {
                    const isLast = i === diagnosis.steps.length - 1;
                    const stepColor =
                      step.type === "safety-gate"
                        ? "border-red-300 bg-red-50"
                        : step.type === "resolved"
                          ? "border-emerald-300 bg-emerald-50"
                          : step.type === "call-tech"
                            ? "border-blue-300 bg-blue-50"
                            : step.type === "stop"
                              ? "border-red-300 bg-red-50"
                              : "border-border bg-muted/30";
                    return (
                      <div key={i} className="flex gap-3">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center w-5 flex-shrink-0">
                          <div className={`w-2.5 h-2.5 rounded-full border-2 mt-1.5 ${stepColor}`} />
                          {!isLast && <div className="w-px flex-1 bg-border" />}
                        </div>
                        {/* Step content */}
                        <div className={`pb-3 flex-1 min-w-0 ${isLast ? "" : ""}`}>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{step.icon}</span>
                            <span className="text-xs font-sans font-semibold text-foreground truncate">
                              {step.title}
                            </span>
                          </div>
                          {step.selectedOption && (
                            <p className="text-[11px] text-muted-foreground font-serif mt-0.5 ml-5 truncate">
                              → {step.selectedOption}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Re-run link */}
              <Link
                href={meta.href}
                className="inline-flex items-center gap-1.5 mt-2 text-safety-orange text-xs font-sans font-semibold hover:underline"
              >
                Run this wizard again
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DiagnosisHistoryPage() {
  const { history, removeDiagnosis, clearAll } = useDiagnosisHistory();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearAll = () => {
    if (confirmClear) {
      clearAll();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-navy py-10">
          <div className="container">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-safety-orange flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-navy-dark" />
              </div>
              <h1 className="font-sans font-extrabold text-warm-white text-2xl md:text-3xl tracking-tight">
                My Saved Diagnoses
              </h1>
            </div>
            <p className="text-steel font-serif text-sm md:text-base ml-[52px]">
              Review your diagnostic history. Pull up your notes when calling a professional.
            </p>
          </div>
        </div>

        <div className="container py-8">
          {history.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-sans font-bold text-foreground text-lg mb-2">
                No Saved Diagnoses Yet
              </h2>
              <p className="text-muted-foreground font-serif text-sm max-w-md mx-auto mb-6">
                When you complete a troubleshooting wizard, your diagnostic path will be saved here automatically. You can review your steps and pull up "What to Say" scripts when calling a professional.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(WIZARD_META).map(([key, meta]) => (
                  <Link
                    key={key}
                    href={meta.href}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border bg-card text-foreground font-sans font-medium text-sm hover:border-safety-orange hover:bg-safety-orange/5 transition-all"
                  >
                    <span className={meta.color}>{meta.icon}</span>
                    {meta.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Header with count and clear */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-sans font-medium text-muted-foreground">
                  {history.length} saved diagnosis{history.length !== 1 ? "es" : ""}
                </p>
                <button
                  onClick={handleClearAll}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-colors ${
                    confirmClear
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "border border-border text-muted-foreground hover:text-red-500 hover:border-red-300"
                  }`}
                >
                  {confirmClear ? "Confirm Clear All" : "Clear All"}
                </button>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {history.map((d) => (
                    <DiagnosisCard key={d.id} diagnosis={d} onDelete={removeDiagnosis} />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
