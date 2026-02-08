/*
 * KnowledgeNodePage — Workshop Blueprint Design
 * Detailed educational content view for a single knowledge node
 * Sections: What Is It, How It Works, Common Issues, Safety, Pro Tip, Tools
 * Blueprint-style layout with dashed borders and step numbers
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { getCategoryBySlug, findNodeById } from "@/lib/knowledgeData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  BookOpen,
  Cog,
  AlertTriangle,
  Lightbulb,
  Wrench,
  ChevronRight,
  ShieldAlert,
  CircleAlert,
} from "lucide-react";

export default function KnowledgeNodePage() {
  const params = useParams<{ slug: string; nodeId: string }>();
  const category = getCategoryBySlug(params.slug || "");
  const node = category
    ? findNodeById(category.knowledgeTree, params.nodeId || "")
    : undefined;

  if (!category || !node || !node.educationalContent) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-sans font-bold text-2xl text-foreground">
              Content Not Found
            </h1>
            <Link
              href={category ? `/category/${category.slug}` : "/"}
              className="text-safety-orange mt-4 inline-block font-sans font-medium"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Go Back
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const content = node.educationalContent;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 flex items-center gap-2 text-sm font-sans">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-border" />
          <Link
            href={`/category/${category.slug}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
            style={{ color: category.color }}
          >
            {category.title}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-border" />
          <span className="text-foreground font-medium truncate">{node.title}</span>
        </div>
      </div>

      {/* Content */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-3xl">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-sans font-medium transition-colors mb-5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {category.title}
              </Link>

              <div className="flex items-start gap-4 mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-sans font-bold text-foreground text-2xl md:text-3xl tracking-tight">
                    {node.title}
                  </h1>
                  <p className="text-muted-foreground text-base mt-1 font-serif">
                    {node.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* What Is It */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mb-8"
            >
              <SectionHeader
                number="01"
                title="What Is It?"
                icon={BookOpen}
                color={category.color}
              />
              <div className="ml-14 md:ml-16">
                <p className="text-foreground text-[15px] leading-[1.8] font-serif">
                  {content.whatIs}
                </p>
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <SectionHeader
                number="02"
                title="How It Works"
                icon={Cog}
                color={category.color}
              />
              <div className="ml-14 md:ml-16">
                <div className="p-5 rounded-xl bg-navy/[0.03] border border-dashed border-blueprint/20">
                  <p className="text-foreground text-[15px] leading-[1.8] font-serif">
                    {content.howItWorks}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Common Issues */}
            {content.commonIssues && content.commonIssues.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mb-8"
              >
                <SectionHeader
                  number="03"
                  title="Common Issues"
                  icon={CircleAlert}
                  color={category.color}
                />
                <div className="ml-14 md:ml-16 space-y-2.5">
                  {content.commonIssues.map((issue, i) => {
                    const parts = issue.split(" — ");
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                      >
                        <span className="font-mono text-xs font-bold text-muted-foreground bg-muted w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          {parts.length > 1 ? (
                            <>
                              <span className="font-sans font-semibold text-sm text-foreground">
                                {parts[0]}
                              </span>
                              <span className="text-muted-foreground text-sm font-serif">
                                {" — "}
                                {parts.slice(1).join(" — ")}
                              </span>
                            </>
                          ) : (
                            <span className="text-foreground text-sm font-serif">{issue}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Safety Tips */}
            {content.safetyTips && content.safetyTips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-8"
              >
                <SectionHeader
                  number="04"
                  title="Safety First"
                  icon={ShieldAlert}
                  color="#B44D3E"
                />
                <div className="ml-14 md:ml-16">
                  <div className="p-5 rounded-xl bg-destructive/5 border border-destructive/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="font-sans font-bold text-destructive text-xs uppercase tracking-wider">
                        Important Safety Information
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {content.safetyTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                          <span className="text-foreground text-sm leading-relaxed font-serif">
                            {tip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pro Tip */}
            {content.proTip && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="mb-8"
              >
                <SectionHeader
                  number="05"
                  title="Pro Tip"
                  icon={Lightbulb}
                  color="#D4A843"
                />
                <div className="ml-14 md:ml-16">
                  <div className="p-5 rounded-xl bg-safety-orange/5 border border-safety-orange/20">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-safety-orange flex-shrink-0 mt-0.5" />
                      <p className="text-foreground text-[15px] leading-[1.8] font-serif">
                        {content.proTip}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tools Needed */}
            {content.tools && content.tools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-8"
              >
                <SectionHeader
                  number="06"
                  title="Tools You'll Need"
                  icon={Wrench}
                  color={category.color}
                />
                <div className="ml-14 md:ml-16">
                  <div className="flex flex-wrap gap-2">
                    {content.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-sans font-medium text-foreground"
                      >
                        <Wrench className="w-3 h-3 text-muted-foreground" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation to sibling nodes */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                Continue Learning
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-sm font-sans font-medium text-foreground hover:border-safety-orange/40 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Knowledge Tree
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeader({
  number,
  title,
  icon: Icon,
  color,
}: {
  number: string;
  title: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="step-badge text-white"
        style={{ backgroundColor: color }}
      >
        {number}
      </div>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color }} />
        <h2 className="font-sans font-bold text-foreground text-lg">{title}</h2>
      </div>
      <div className="flex-1 border-t border-dashed border-border ml-2" />
    </div>
  );
}
