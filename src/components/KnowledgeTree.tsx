/*
 * KnowledgeTree — Workshop Blueprint Design
 * Interactive expandable tree with dashed connector lines
 * Progressive disclosure of educational content
 */
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, BookOpen } from "lucide-react";
import type { KnowledgeNode } from "@/lib/knowledgeData";

interface KnowledgeTreeProps {
  nodes: KnowledgeNode[];
  categorySlug: string;
  categoryColor: string;
  level?: number;
}

export default function KnowledgeTree({
  nodes,
  categorySlug,
  categoryColor,
  level = 0,
}: KnowledgeTreeProps) {
  return (
    <div className={level > 0 ? "tree-connector" : ""}>
      {nodes.map((node, index) => (
        <TreeNode
          key={node.id}
          node={node}
          categorySlug={categorySlug}
          categoryColor={categoryColor}
          level={level}
          isLast={index === nodes.length - 1}
        />
      ))}
    </div>
  );
}

function TreeNode({
  node,
  categorySlug,
  categoryColor,
  level,
  isLast,
}: {
  node: KnowledgeNode;
  categorySlug: string;
  categoryColor: string;
  level: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(level === 0);
  const hasChildren = node.children && node.children.length > 0;
  const hasContent = !!node.educationalContent;

  return (
    <div className={`${level > 0 ? "mb-2" : "mb-4"}`}>
      {/* Node Header */}
      <div
        className={`group flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer ${
          level === 0
            ? "bg-card border border-border hover:border-safety-orange/40 shadow-sm"
            : "hover:bg-muted/50"
        }`}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
        }}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren ? (
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.15 }}
            className="mt-0.5 flex-shrink-0"
          >
            <ChevronRight
              className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
            />
          </motion.div>
        ) : (
          <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
          </div>
        )}

        {/* Node Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`font-sans font-semibold transition-colors group-hover:text-foreground ${
                level === 0 ? "text-base" : "text-sm"
              }`}
              style={level === 0 ? { color: categoryColor } : undefined}
            >
              {node.title}
            </h3>
            {hasContent && (
              <Link
                href={`/category/${categorySlug}/${node.id}`}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-safety-orange/10 text-safety-orange hover:bg-safety-orange/20 transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                Learn
              </Link>
            )}
          </div>
          <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">
            {node.description}
          </p>
        </div>

        {/* Child count badge */}
        {hasChildren && (
          <span className="flex-shrink-0 font-mono text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
            {node.children!.length}
          </span>
        )}
      </div>

      {/* Children */}
      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-1">
              <KnowledgeTree
                nodes={node.children!}
                categorySlug={categorySlug}
                categoryColor={categoryColor}
                level={level + 1}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
