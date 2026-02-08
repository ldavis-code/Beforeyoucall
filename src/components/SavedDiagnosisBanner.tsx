/*
 * SavedDiagnosisBanner — Shows after a diagnosis is auto-saved
 * Appears at the bottom of terminal wizard cards with a link to history
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList } from "lucide-react";

export default function SavedDiagnosisBanner({ saved }: { saved: boolean }) {
  if (!saved) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="mt-4 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-navy-dark/80 border border-navy-light"
    >
      <div className="flex items-center gap-2 text-emerald-400 text-sm font-sans font-semibold">
        <CheckCircle2 className="w-4 h-4" />
        Diagnosis saved!
      </div>
      <Link
        href="/my-diagnoses"
        className="inline-flex items-center gap-1.5 text-safety-orange text-xs font-sans font-semibold hover:underline"
      >
        <ClipboardList className="w-3.5 h-3.5" />
        View History
      </Link>
    </motion.div>
  );
}
