/*
 * MowerWizardPage — Workshop Blueprint Design
 * "Before You Call" — Lawn & Garden Troubleshooting Wizard: Mower Won't Start
 * Interactive step-by-step diagnostic flow with safety-first approach
 * Navy background, safety orange accents, DM Sans headings
 */
import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MOWER_WIZARD_TREE, type MowerWizardNode, type MowerNodeType } from "@/lib/mowerWizardData";
import { useDiagnosisHistory, generateDiagnosisId, type DiagnosisStep, type SavedDiagnosis } from "@/hooks/useDiagnosisHistory";
import SavedDiagnosisBanner from "@/components/SavedDiagnosisBanner";
import {
  ArrowLeft,
  Flame,
  RotateCcw,
  Copy,
  Check,
  GraduationCap,
  TreePine,
  ChevronLeft,
} from "lucide-react";

/* ─── Progress Dots ─── */
function ProgressDots({
  history,
  currentType,
}: {
  history: string[];
  currentType: MowerNodeType;
}) {
  const types: MowerNodeType[] = history.map(
    (id) => MOWER_WIZARD_TREE[id]?.type || ("question" as MowerNodeType)
  );
  types.push(currentType);
  return (
    <div className="flex gap-1.5 justify-center py-2">
      {types.map((t, i) => {
        const isLast = i === types.length - 1;
        const colorClass =
          t === "stop" || t === "safety-gate"
            ? "bg-red-500"
            : t === "resolved"
              ? "bg-emerald-500"
              : t === "call-tech"
                ? "bg-blue-500"
                : isLast
                  ? "bg-safety-orange"
                  : "bg-white/20";
        return (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${colorClass} ${isLast ? "w-6" : "w-2"}`}
          />
        );
      })}
    </div>
  );
}

/* ─── Safety Banner ─── */
function SafetyBanner() {
  return (
    <div className="bg-gradient-to-r from-red-950/80 to-red-900/60 border border-red-800/40 rounded-xl px-4 py-3 flex items-center gap-3 mb-5">
      <Flame className="w-5 h-5 text-red-400 flex-shrink-0" />
      <p className="text-red-300 text-sm font-serif leading-snug">
        <strong className="text-red-200 font-sans">Rule #1:</strong> If it's
        smokin', it's broken. Disconnect the spark plug wire before working under the deck.
      </p>
    </div>
  );
}

/* ─── Card Wrapper ─── */
function WizardCard({
  node,
  onSelect,
  onContinue,
  onRestart,
  saved,
}: {
  node: MowerWizardNode;
  onSelect: (id: string, optionLabel?: string) => void;
  onContinue: (id: string) => void;
  onRestart: () => void;
  saved: boolean;
}) {
  const [copiedScript, setCopiedScript] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const OptionButton = ({
    children,
    onClick,
    icon,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    icon?: string;
  }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border-2 border-border bg-card text-foreground font-sans font-medium text-sm text-left transition-all hover:border-safety-orange hover:bg-safety-orange/5 active:scale-[0.98]"
    >
      {icon && <span className="text-xl flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );

  const CardHeader = ({
    icon,
    title,
    subtitle,
    colorClass,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    colorClass?: string;
  }) => (
    <div className="text-center mb-5">
      <div className="text-4xl mb-3">{icon}</div>
      <h2
        className={`font-sans font-bold text-xl leading-tight ${colorClass || "text-foreground"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm mt-1.5 font-serif">
          {subtitle}
        </p>
      )}
    </div>
  );

  const InstructionBox = ({ text }: { text: string }) => (
    <div className="bg-warm-cream rounded-xl px-4 py-3.5 border-l-4 border-safety-orange mb-4 text-sm leading-relaxed text-foreground font-serif">
      {text}
    </div>
  );

  const LearnBox = ({ text }: { text: string }) => (
    <div className="bg-blue-50 rounded-xl px-4 py-3.5 border-l-4 border-blue-500 mb-4 text-sm leading-relaxed text-blue-900 font-serif">
      <strong className="font-sans text-blue-700">
        <GraduationCap className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
        Why:
      </strong>{" "}
      {text}
    </div>
  );

  /* ─── SAFETY GATE ─── */
  if (node.type === "safety-gate") {
    return (
      <div className="bg-card rounded-2xl p-6 md:p-7 shadow-lg">
        <CardHeader icon={node.icon} title={node.title} subtitle={node.subtitle} />
        <p className="font-sans font-semibold text-foreground text-sm mb-3">
          {node.question}
        </p>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-6">
          {node.checks?.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 py-1.5 text-red-700 text-sm font-medium"
            >
              <span className="text-red-400 flex-shrink-0">⚠️</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onSelect(node.yesResult!, "Yes — I notice this")}
            className="flex-1 py-3.5 rounded-xl border-2 border-red-500 bg-transparent text-red-600 font-sans font-bold text-sm transition-colors hover:bg-red-50 active:scale-[0.98]"
          >
            Yes — I notice this
          </button>
          <button
            onClick={() => onSelect(node.noResult!, "No — all clear")}
            className="flex-1 py-3.5 rounded-xl border-0 bg-emerald-600 text-white font-sans font-bold text-sm transition-colors hover:bg-emerald-700 active:scale-[0.98]"
          >
            No — all clear
          </button>
        </div>
      </div>
    );
  }

  /* ─── QUESTION / ACTION ─── */
  if (node.type === "question" || node.type === "action") {
    return (
      <div className="bg-card rounded-2xl p-6 md:p-7 shadow-lg">
        <CardHeader icon={node.icon} title={node.title} subtitle={node.subtitle} />
        {node.instruction && <InstructionBox text={node.instruction} />}
        {node.learn && <LearnBox text={node.learn} />}
        {node.question && (
          <p className="font-sans font-semibold text-foreground text-sm mb-4">
            {node.question}
          </p>
        )}
        <div className="flex flex-col gap-2.5">
          {node.options?.map((opt, i) => (
            <OptionButton key={i} onClick={() => onSelect(opt.next, opt.label)} icon={opt.icon}>
              {opt.label}
            </OptionButton>
          ))}
        </div>
      </div>
    );
  }

  /* ─── STOP ─── */
  if (node.type === "stop") {
    const isCritical = node.severity === "critical";
    return (
      <div
        className={`rounded-2xl p-6 md:p-7 shadow-lg border-2 ${
          isCritical
            ? "bg-red-50 border-red-500"
            : "bg-amber-50 border-amber-500"
        }`}
      >
        <CardHeader
          icon={node.icon}
          title={node.title}
          colorClass={isCritical ? "text-red-700" : "text-amber-800"}
        />
        <p
          className={`text-base leading-relaxed text-center font-bold font-sans ${
            isCritical ? "text-red-800" : "text-amber-900"
          }`}
        >
          {node.message}
        </p>
        {node.details && (
          <div
            className={`rounded-xl p-4 mt-4 border-l-4 ${
              isCritical
                ? "bg-red-100/60 border-red-500"
                : "bg-amber-100/60 border-amber-500"
            }`}
          >
            {node.details.map((line, i) => {
              const isSubItem = line.startsWith("•");
              return (
                <p
                  key={i}
                  className={`leading-relaxed font-serif ${
                    isCritical ? "text-red-800" : "text-amber-900"
                  } ${isSubItem ? "text-[13px] ml-5 my-0.5" : "text-sm font-semibold font-sans"} ${
                    !isSubItem && i > 0 ? "mt-3" : ""
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        )}
        <div className="flex gap-3 mt-6">
          {node.next && (
            <button
              onClick={() => onContinue(node.next!)}
              className="flex-1 py-3.5 rounded-xl bg-safety-orange text-navy-dark font-sans font-bold text-sm transition-colors hover:bg-safety-orange-light active:scale-[0.98]"
            >
              What to Tell the Tech →
            </button>
          )}
          <button
            onClick={onRestart}
            className={`py-3.5 px-5 rounded-xl border-2 border-border bg-card text-foreground font-sans font-semibold text-sm transition-colors hover:bg-muted active:scale-[0.98] ${
              node.next ? "" : "flex-1"
            }`}
          >
            Start Over
          </button>
        </div>
        <SavedDiagnosisBanner saved={saved} />
      </div>
    );
  }

  /* ─── RESOLVED ─── */
  if (node.type === "resolved") {
    return (
      <div className="bg-emerald-50 rounded-2xl p-6 md:p-7 shadow-lg border-2 border-emerald-500">
        <CardHeader icon={node.icon} title={node.title} colorClass="text-emerald-700" />
        <p className="text-emerald-800 text-base leading-relaxed text-center font-serif">
          {node.message}
        </p>
        {node.tip && (
          <div className="bg-white/70 rounded-xl p-4 mt-4 border-l-4 border-emerald-500 text-emerald-700 text-sm leading-relaxed font-serif">
            <strong className="font-sans">Pro Tip:</strong> {node.tip}
          </div>
        )}
        <button
          onClick={onRestart}
          className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-sans font-bold text-sm mt-6 transition-colors hover:bg-emerald-700 active:scale-[0.98]"
        >
          Check Something Else
        </button>
        <SavedDiagnosisBanner saved={saved} />
      </div>
    );
  }

  /* ─── CALL TECH ─── */
  if (node.type === "call-tech") {
    return (
      <div className="bg-blue-50 rounded-2xl p-6 md:p-7 shadow-lg border-2 border-blue-500">
        <CardHeader icon={node.icon} title={node.title} colorClass="text-blue-800" />
        <p className="text-blue-700 text-sm leading-relaxed text-center font-serif">
          {node.message}
        </p>
        {node.script && (
          <div className="bg-white rounded-xl p-5 mt-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">📋</span>
              <strong className="text-foreground text-sm font-sans">
                What to Say When You Call:
              </strong>
            </div>
            <p className="text-sm leading-relaxed text-navy bg-slate-50 rounded-lg p-3.5 italic font-serif">
              "{node.script}"
            </p>
            <button
              onClick={() => handleCopy(node.script!)}
              className={`mt-3 px-4 py-2 rounded-lg border text-xs font-sans font-semibold transition-colors ${
                copiedScript
                  ? "border-emerald-300 text-emerald-600 bg-emerald-50"
                  : "border-blue-200 text-blue-600 bg-white hover:bg-blue-50"
              }`}
            >
              {copiedScript ? (
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3 h-3" /> Copied!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Copy className="w-3 h-3" /> Copy Script
                </span>
              )}
            </button>
          </div>
        )}
        <button
          onClick={onRestart}
          className="w-full py-3.5 rounded-xl bg-navy text-warm-white font-sans font-bold text-sm mt-5 transition-colors hover:bg-navy-light active:scale-[0.98]"
        >
          Start Over
        </button>
        <SavedDiagnosisBanner saved={saved} />
      </div>
    );
  }

  return null;
}

/* ═══════════════════════════════════════════════════════════
   MOWER WIZARD PAGE
   ═══════════════════════════════════════════════════════════ */
export default function MowerWizardPage() {
  const [currentId, setCurrentId] = useState("entry");
  const [history, setHistory] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const node = MOWER_WIZARD_TREE[currentId];
  const { addDiagnosis } = useDiagnosisHistory();

  const isTerminal = node && (node.type === "resolved" || node.type === "call-tech" || node.type === "stop");

  const saveDiagnosis = useCallback((terminalId: string) => {
    const terminalNode = MOWER_WIZARD_TREE[terminalId];
    if (!terminalNode) return;
    const steps: DiagnosisStep[] = [...history, terminalId].map((id) => {
      const n = MOWER_WIZARD_TREE[id];
      return { nodeId: id, title: n?.title || id, icon: n?.icon || "\u2753", type: n?.type || "question", selectedOption: selectedOptions[id] };
    });
    const diagnosis: SavedDiagnosis = {
      id: generateDiagnosisId(), wizardType: "lawn-garden", wizardLabel: "Mower Won't Start",
      timestamp: Date.now(), steps,
      outcome: { type: terminalNode.type as "resolved" | "call-tech" | "stop", title: terminalNode.title, message: terminalNode.message || terminalNode.title, script: terminalNode.script, tip: terminalNode.tip },
    };
    addDiagnosis(diagnosis);
    setSaved(true);
  }, [history, selectedOptions, addDiagnosis]);

  useEffect(() => {
    if (isTerminal && !saved) { saveDiagnosis(currentId); }
  }, [currentId, isTerminal, saved, saveDiagnosis]);

  const goTo = useCallback(
    (id: string, optionLabel?: string) => {
      if (optionLabel) { setSelectedOptions((prev) => ({ ...prev, [currentId]: optionLabel })); }
      setHistory((prev) => [...prev, currentId]);
      setCurrentId(id);
      setSaved(false);
    },
    [currentId]
  );

  const goBack = useCallback(() => {
    if (history.length) {
      setCurrentId(history[history.length - 1]);
      setHistory((h) => h.slice(0, -1));
      setSaved(false);
    }
  }, [history]);

  const restart = useCallback(() => {
    setHistory([]);
    setSelectedOptions({});
    setCurrentId("entry");
    setSaved(false);
  }, []);

  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-[#0F2847] to-[#162F54]">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-navy-light">
        <div className="max-w-xl mx-auto px-5 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <TreePine className="w-5 h-5 text-safety-orange" />
              <h1 className="font-sans font-extrabold text-warm-white text-lg tracking-tight">
                Mower Won't Start
              </h1>
            </div>
            <p className="font-mono text-[10px] text-safety-orange tracking-widest uppercase ml-[30px]">
              Before You Call &middot; Lawn & Garden
            </p>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={goBack}
                className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-steel text-sm font-sans font-medium transition-colors hover:bg-white/10 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}
            {history.length > 1 && (
              <button
                onClick={restart}
                className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-steel transition-colors hover:bg-white/10"
                title="Start over"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress & Disclaimer */}
      <div className="max-w-xl mx-auto px-5 pt-4">
        <ProgressDots history={history} currentType={node?.type || ("question" as MowerNodeType)} />
        <div className="text-center mt-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-steel/60 text-[11px] font-mono bg-white/[0.04] rounded-md px-3 py-1.5">
            <GraduationCap className="w-3 h-3" />
            Educational Guide Only — Know what to check before you call
          </span>
        </div>
      </div>

      {/* Card Area */}
      <div ref={cardRef} className="max-w-xl mx-auto px-5 pb-6">
        <SafetyBanner />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {node && (
              <WizardCard
                node={node}
                onSelect={goTo}
                onContinue={goTo}
                onRestart={restart}
                saved={saved}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="max-w-xl mx-auto px-5 py-6 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <Link
            href="/category/lawn-garden"
            className="inline-flex items-center gap-2 text-steel/50 text-sm font-sans hover:text-steel transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Lawn & Garden Knowledge
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-steel/50 text-sm font-sans hover:text-steel transition-colors"
          >
            Home
          </Link>
        </div>
        <p className="text-white/15 text-[11px] font-mono leading-relaxed">
          Before You Call &middot; Educational guidance only.
          <br />
          Always disconnect spark plug wire before working under the mower deck.
          <br />
          Consult a certified small engine technician for repairs.
        </p>
      </div>
    </div>
  );
}
