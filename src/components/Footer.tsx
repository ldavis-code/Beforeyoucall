/*
 * Footer — Workshop Blueprint Design
 * "Before You Call" branding, navy background, educational disclaimer
 */
import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t-2 border-navy-light mt-auto">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-safety-orange/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-safety-orange" />
            </div>
            <div>
              <p className="font-sans font-bold text-warm-white text-sm">Before You Call</p>
              <p className="font-mono text-[10px] text-safety-orange tracking-wider">IF IT'S SMOKIN', IT'S BROKEN</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="max-w-md">
            <p className="text-steel text-xs leading-relaxed font-serif">
              This website is for <span className="text-safety-orange font-medium">educational purposes only</span>. 
              Always consult a qualified professional before attempting repairs. 
              Working with engines, electrical systems, and mechanical equipment carries inherent risks. 
              Follow all manufacturer safety guidelines.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-navy-light flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-steel/60 text-xs font-mono">
            &copy; {new Date().getFullYear()} Before You Call &mdash; BeforeYouCall.app
          </p>
          <p className="text-steel/40 text-[10px] font-mono uppercase tracking-widest">
            If It's Smokin', It's Broken
          </p>
        </div>
      </div>
    </footer>
  );
}
