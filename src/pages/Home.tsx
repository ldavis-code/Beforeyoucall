/*
 * Home Page — Workshop Blueprint Design
 * "Before You Call" — If It's Smokin', It's Broken
 * Hero with workshop image, wizard CTA, category grid, educational mission
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { categories, IMAGES } from "@/lib/knowledgeData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Car,
  Bike,
  Trees,
  Cog,
  Zap,
  ArrowRight,
  BookOpen,
  Shield,
  Lightbulb,
  Flame,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Car,
  Bike,
  Trees,
  Cog,
  Zap,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Workshop tools on workbench"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/90 to-navy/70" />
        </div>

        <div className="container relative z-10 py-20 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-safety-orange/15 border border-safety-orange/30 text-safety-orange font-mono text-xs font-bold uppercase tracking-widest mb-6">
                <Flame className="w-3.5 h-3.5" />
                If It's Smokin', It's Broken
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-bold text-warm-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
            >
              Know What to{" "}
              <span className="text-safety-orange">Check</span>
              <span className="text-steel">.</span>
              <br />
              <span className="text-safety-orange">Before</span>{" "}
              You Call
              <span className="text-steel">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-steel text-lg md:text-xl leading-relaxed max-w-xl font-serif"
            >
              Interactive troubleshooting wizards and knowledge trees that teach you 
              the fundamentals of automotive, motorcycle, lawn equipment, combustion engines, 
              and home electrical systems. Check the basics before calling a pro.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/wizards"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-safety-orange text-navy-dark font-sans font-bold text-sm hover:bg-safety-orange-light transition-colors"
              >
                <Zap className="w-4 h-4" />
                Start the Wizard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-steel/30 text-steel font-sans font-medium text-sm hover:border-warm-white hover:text-warm-white transition-colors"
              >
                Browse Knowledge Trees
              </a>
            </motion.div>
          </div>
        </div>

        {/* Diagonal cut bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
            <path d="M0 60L1440 0V60H0Z" fill="oklch(0.94 0.005 80)" />
          </svg>
        </div>
      </section>

      {/* Wizard Highlight Banner */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/wizards"
              className="group flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-2xl bg-navy border-2 border-navy-light hover:border-safety-orange/40 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-safety-orange flex items-center justify-center flex-shrink-0">
                <Zap className="w-8 h-8 text-navy-dark" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-sans font-bold text-warm-white text-xl md:text-2xl">
                  Electrical Troubleshooting Wizard
                </h2>
                <p className="text-steel text-sm md:text-base mt-1.5 font-serif max-w-lg">
                  Something stopped working? Walk through a step-by-step diagnostic — 
                  from safety checks to finding the problem. Know exactly what to tell the electrician.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-safety-orange text-navy-dark font-sans font-bold text-sm group-hover:bg-safety-orange-light transition-colors">
                  Start Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-8 md:py-12">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: BookOpen,
                title: "Learn the Fundamentals",
                text: "Each knowledge tree starts with core concepts and branches into specific systems. Understand the 'why' before the 'how'.",
              },
              {
                icon: Lightbulb,
                title: "Troubleshoot with Confidence",
                text: "Step-by-step diagnostic thinking helps you identify problems systematically — not just guess and replace parts.",
              },
              {
                icon: Shield,
                title: "Know When to Call a Pro",
                text: "Every topic includes safety warnings and best practices. Know your limits — and know exactly what to tell the professional.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-foreground text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-serif">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-safety-orange font-bold uppercase tracking-widest">
              Choose Your Path
            </span>
            <h2 className="font-sans font-bold text-foreground text-3xl md:text-4xl mt-3 tracking-tight">
              Knowledge Categories
            </h2>
            <p className="text-muted-foreground text-base mt-3 max-w-lg mx-auto font-serif">
              Five interconnected domains of practical knowledge. Each category contains 
              an interactive tree of topics you can explore at your own pace.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Cog;
              const topicCount = cat.knowledgeTree.reduce(
                (acc, node) => acc + 1 + (node.children?.length || 0),
                0
              );

              return (
                <motion.div key={cat.id} variants={itemVariants}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="group block bg-card rounded-xl border border-border overflow-hidden hover:border-transparent hover:shadow-lg transition-all duration-300"
                    style={{
                      ["--cat-color" as string]: cat.color,
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          background: `linear-gradient(to top, ${cat.color}, transparent)`,
                        }}
                      />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: cat.color }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-sans font-bold text-white text-lg leading-tight drop-shadow-md">
                            {cat.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-muted-foreground text-sm leading-relaxed font-serif line-clamp-2">
                        {cat.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {topicCount} topics
                        </span>
                        <span
                          className="inline-flex items-center gap-1 text-sm font-sans font-semibold transition-colors"
                          style={{ color: cat.color }}
                        >
                          Explore
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-safety-orange font-bold uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="font-sans font-bold text-foreground text-3xl md:text-4xl mt-3 tracking-tight">
              Learn Like a Technician
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                step: "01",
                title: "Pick a Category",
                text: "Choose from automotive, motorcycle, lawn & garden, engines, or electrical.",
              },
              {
                step: "02",
                title: "Explore the Tree",
                text: "Expand branches to discover topics. Each node represents a system or concept.",
              },
              {
                step: "03",
                title: "Read & Learn",
                text: "Dive into educational content with 'What Is It', 'How It Works', and common issues.",
              },
              {
                step: "04",
                title: "Know Before You Call",
                text: "Use the wizard to diagnose issues and know exactly what to tell the professional.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className="step-badge bg-navy text-safety-orange text-lg mx-auto mb-4 w-12 h-12">
                  {item.step}
                </div>
                <h3 className="font-sans font-bold text-foreground text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm font-serif leading-relaxed">
                  {item.text}
                </p>
                {i < 3 && (
                  <div className="hidden md:block mt-4">
                    <ArrowRight className="w-4 h-4 text-border mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-navy py-14">
        <div className="container text-center">
          <h2 className="font-sans font-bold text-warm-white text-2xl md:text-3xl tracking-tight">
            Something not working right?
          </h2>
          <p className="text-steel mt-3 max-w-md mx-auto font-serif">
            Use the troubleshooting wizard to figure out what's wrong — and know what to say when you call.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/wizards"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-safety-orange text-navy-dark font-sans font-bold text-sm hover:bg-safety-orange-light transition-colors"
            >
              <Zap className="w-4 h-4" />
              Start the Wizard
            </Link>
            {categories.slice(0, 2).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-steel/30 text-steel font-sans font-medium text-sm hover:border-safety-orange hover:text-safety-orange transition-colors"
              >
                {cat.title}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
