/*
 * NotFound — Workshop Blueprint Design
 * 404 page styled to match the industrial/technical manual aesthetic
 */
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Wrench, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-2xl bg-navy/10 flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-10 h-10 text-navy" />
          </div>
          <p className="font-mono text-6xl font-bold text-safety-orange mb-2">404</p>
          <h1 className="font-sans font-bold text-foreground text-2xl mb-3">
            Page Not Found
          </h1>
          <p className="text-muted-foreground font-serif mb-8 leading-relaxed">
            Looks like this page has been disconnected. Check the wiring — or head back to the main panel.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-safety-orange text-navy-dark font-sans font-bold text-sm hover:bg-safety-orange-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
