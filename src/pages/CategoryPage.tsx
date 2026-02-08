/*
 * CategoryPage — Workshop Blueprint Design
 * Category hero banner with knowledge tree explorer
 * Dashed connectors, progressive disclosure, DM Sans headings
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { getCategoryBySlug } from "@/lib/knowledgeData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KnowledgeTree from "@/components/KnowledgeTree";
import { ArrowLeft, BookOpen, AlertTriangle, Zap, ArrowRight, Car, TreePine, Bike } from "lucide-react";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const category = getCategoryBySlug(params.slug || "");

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-sans font-bold text-2xl text-foreground">Category Not Found</h1>
            <Link href="/" className="text-safety-orange mt-4 inline-block font-sans font-medium">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const topicCount = category.knowledgeTree.reduce(
    (acc, node) => acc + 1 + (node.children?.length || 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Category Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${category.color}ee, ${category.color}cc, ${category.color}88)`,
            }}
          />
        </div>

        <div className="container relative z-10 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-sans font-medium transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All Categories
            </Link>

            <h1 className="font-sans font-bold text-white text-3xl md:text-4xl lg:text-5xl tracking-tight">
              {category.title}
            </h1>
            <p className="text-white/80 text-base md:text-lg mt-3 max-w-xl font-serif leading-relaxed">
              {category.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/15 text-white font-mono text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                {topicCount} Topics
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/15 text-white font-mono text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Educational Only
              </span>
            </div>
          </motion.div>
        </div>

        {/* Diagonal cut */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full block">
            <path d="M0 48L1440 0V48H0Z" fill="oklch(0.94 0.005 80)" />
          </svg>
        </div>
      </section>

      {/* Knowledge Tree */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-3xl">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 p-5 rounded-xl bg-muted/50 border border-border"
            >
              <p className="text-foreground text-sm leading-relaxed font-serif">
                {category.description}
              </p>
              <p className="text-muted-foreground text-xs mt-3 font-mono">
                Click on a branch to expand it. Look for the{" "}
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-safety-orange/10 text-safety-orange text-[10px] font-bold uppercase">
                  <BookOpen className="w-2.5 h-2.5" />
                  Learn
                </span>{" "}
                badge to dive into detailed educational content.
              </p>
            </motion.div>

            {/* Automotive Wizard CTA */}
            {category.slug === "automotive" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mb-8"
              >
                <Link
                  href="/wizard/automotive"
                  className="group flex items-center gap-4 p-5 rounded-xl bg-safety-orange/10 border-2 border-safety-orange/30 hover:border-safety-orange/60 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-safety-orange flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-navy-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-foreground text-base">
                      Car Won't Start — Troubleshooting Wizard
                    </h3>
                    <p className="text-muted-foreground text-sm font-serif mt-0.5">
                      Step-by-step diagnostic: battery, starter, fuel, ignition, and more. Know what to check before you call.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-safety-orange flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

            {/* Lawn & Garden Wizard CTA */}
            {category.slug === "lawn-garden" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mb-8"
              >
                <Link
                  href="/wizard/lawn-garden"
                  className="group flex items-center gap-4 p-5 rounded-xl bg-safety-orange/10 border-2 border-safety-orange/30 hover:border-safety-orange/60 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-safety-orange flex items-center justify-center flex-shrink-0">
                    <TreePine className="w-6 h-6 text-navy-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-foreground text-base">
                      Mower Won't Start — Troubleshooting Wizard
                    </h3>
                    <p className="text-muted-foreground text-sm font-serif mt-0.5">
                      Gas push, riding, or electric — diagnose fuel, spark, battery, and safety switch issues step by step.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-safety-orange flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

            {/* Motorcycle Wizard CTA */}
            {category.slug === "motorcycle" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mb-8"
              >
                <Link
                  href="/wizard/motorcycle"
                  className="group flex items-center gap-4 p-5 rounded-xl bg-safety-orange/10 border-2 border-safety-orange/30 hover:border-safety-orange/60 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-safety-orange flex items-center justify-center flex-shrink-0">
                    <Bike className="w-6 h-6 text-navy-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-foreground text-base">
                      Motorcycle Won't Start — Troubleshooting Wizard
                    </h3>
                    <p className="text-muted-foreground text-sm font-serif mt-0.5">
                      Kill switch, battery, fuel system, spark, safety interlocks — diagnose step by step before calling the shop.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-safety-orange flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

            {/* Wizard + Breaker Guide CTAs for Electrical */}
            {category.slug === "electrical" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mb-4"
              >
                <Link
                  href="/wizard"
                  className="group flex items-center gap-4 p-5 rounded-xl bg-safety-orange/10 border-2 border-safety-orange/30 hover:border-safety-orange/60 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-safety-orange flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-navy-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-foreground text-base">
                      Troubleshooting Wizard
                    </h3>
                    <p className="text-muted-foreground text-sm font-serif mt-0.5">
                      Something stopped working? Walk through a step-by-step diagnostic to find the problem.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-safety-orange flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

            {category.slug === "electrical" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-8"
              >
                <Link
                  href="/breaker-guide"
                  className="group flex items-center gap-4 p-5 rounded-xl bg-[#D4A843]/10 border border-[#D4A843]/30 hover:border-[#D4A843]/60 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D4A843] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-navy-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-foreground text-base">
                      Interactive Circuit Breaker Guide
                    </h3>
                    <p className="text-muted-foreground text-sm font-serif mt-0.5">
                      Explore a visual breaker panel — click any breaker to learn what it controls, its amperage, and wire gauge.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#D4A843] flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

            {/* Tree */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h2 className="font-sans font-bold text-foreground text-lg">
                  Knowledge Tree
                </h2>
              </div>
              <KnowledgeTree
                nodes={category.knowledgeTree}
                categorySlug={category.slug}
                categoryColor={category.color}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
