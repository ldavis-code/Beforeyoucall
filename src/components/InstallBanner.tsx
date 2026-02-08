/*
 * InstallBanner — Workshop Blueprint Design
 * Floating install prompt for PWA — appears when app is installable
 * Shows at the bottom of the screen with dismiss option
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function InstallBanner() {
  const { isInstallable, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  if (!isInstallable || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-5"
      >
        <div className="max-w-lg mx-auto bg-navy border border-navy-light rounded-2xl shadow-2xl overflow-hidden">
          {/* Top accent line */}
          <div className="h-1 bg-gradient-to-r from-safety-orange via-safety-orange-light to-safety-orange" />

          <div className="p-4 flex items-center gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-safety-orange/15 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-safety-orange" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="font-sans font-bold text-warm-white text-sm">
                Install Before You Call
              </h3>
              <p className="text-steel text-xs mt-0.5 font-serif leading-snug">
                Add to your home screen for offline access and quick troubleshooting.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setDismissed(true)}
                className="p-2 rounded-lg text-steel/50 hover:text-steel hover:bg-white/5 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={install}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-safety-orange text-navy-dark font-sans font-bold text-xs transition-colors hover:bg-safety-orange-light active:scale-[0.97]"
              >
                <Download className="w-3.5 h-3.5" />
                Install
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
