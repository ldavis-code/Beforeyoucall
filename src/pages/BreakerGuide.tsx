/*
 * BreakerGuide — Workshop Blueprint Design
 * Interactive circuit breaker panel visualization
 * Shows which breaker goes to which appliance
 * Educational tool for understanding home electrical panels
 */
import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/knowledgeData";
import {
  ArrowLeft,
  Zap,
  AlertTriangle,
  Info,
  ChevronRight,
} from "lucide-react";

interface BreakerInfo {
  id: string;
  position: number;
  side: "left" | "right";
  label: string;
  amps: number;
  type: "single" | "double";
  appliances: string[];
  wireGauge: string;
  description: string;
  isGFCI?: boolean;
  isAFCI?: boolean;
}

const breakerPanel: BreakerInfo[] = [
  // Left side
  {
    id: "main",
    position: 0,
    side: "left",
    label: "Main Breaker",
    amps: 200,
    type: "double",
    appliances: ["Entire house"],
    wireGauge: "2/0 AWG",
    description:
      "The main breaker controls all power to your home. It's a double-pole breaker that disconnects both 120V legs simultaneously. Use this to shut off all power for major work or emergencies.",
  },
  {
    id: "kitchen1",
    position: 1,
    side: "left",
    label: "Kitchen Outlets",
    amps: 20,
    type: "single",
    appliances: ["Countertop outlets", "Toaster", "Coffee maker", "Blender"],
    wireGauge: "12 AWG",
    isGFCI: true,
    description:
      "Kitchen countertop circuits require 20A GFCI protection per code. Two separate 20A circuits are required for countertop receptacles to handle multiple small appliances simultaneously.",
  },
  {
    id: "kitchen2",
    position: 2,
    side: "left",
    label: "Kitchen Outlets 2",
    amps: 20,
    type: "single",
    appliances: ["Additional countertop outlets", "Stand mixer", "Air fryer"],
    wireGauge: "12 AWG",
    isGFCI: true,
    description:
      "The second required kitchen countertop circuit. Having two circuits prevents overloading when using multiple appliances at once — like running the toaster and microwave simultaneously.",
  },
  {
    id: "fridge",
    position: 3,
    side: "left",
    label: "Refrigerator",
    amps: 20,
    type: "single",
    appliances: ["Refrigerator / Freezer"],
    wireGauge: "12 AWG",
    description:
      "Refrigerators should be on a dedicated 20A circuit. They draw significant startup current when the compressor kicks on. Sharing this circuit with other appliances can cause nuisance tripping.",
  },
  {
    id: "dishwasher",
    position: 4,
    side: "left",
    label: "Dishwasher",
    amps: 20,
    type: "single",
    appliances: ["Dishwasher"],
    wireGauge: "12 AWG",
    description:
      "Dishwashers require a dedicated 20A circuit. The heating element for drying draws significant current. Often shares a circuit with the garbage disposal (alternating use).",
  },
  {
    id: "microwave",
    position: 5,
    side: "left",
    label: "Microwave",
    amps: 20,
    type: "single",
    appliances: ["Microwave oven"],
    wireGauge: "12 AWG",
    description:
      "A built-in or over-the-range microwave needs its own dedicated 20A circuit. Microwaves typically draw 12-15 amps, leaving little room for anything else on the circuit.",
  },
  {
    id: "washer",
    position: 6,
    side: "left",
    label: "Washing Machine",
    amps: 20,
    type: "single",
    appliances: ["Clothes washer"],
    wireGauge: "12 AWG",
    description:
      "Washing machines need a dedicated 20A circuit. The motor draws high startup current, and modern washers with heaters draw even more. GFCI protection is required in laundry areas.",
  },
  // Right side
  {
    id: "range",
    position: 1,
    side: "right",
    label: "Electric Range",
    amps: 50,
    type: "double",
    appliances: ["Electric stove / Oven"],
    wireGauge: "6 AWG",
    description:
      "Electric ranges require a dedicated 50A/240V double-pole circuit. The large wire gauge (6 AWG) handles the high current draw of heating elements. Uses a special 4-prong outlet (NEMA 14-50).",
  },
  {
    id: "dryer",
    position: 2,
    side: "right",
    label: "Electric Dryer",
    amps: 30,
    type: "double",
    appliances: ["Clothes dryer"],
    wireGauge: "10 AWG",
    description:
      "Electric dryers need a dedicated 30A/240V double-pole circuit. The heating element runs on 240V for efficiency. Uses a 4-prong outlet (NEMA 14-30). Gas dryers only need a standard 120V/15A circuit.",
  },
  {
    id: "ac",
    position: 3,
    side: "right",
    label: "Central A/C",
    amps: 40,
    type: "double",
    appliances: ["Central air conditioning compressor"],
    wireGauge: "8 AWG",
    description:
      "Central AC compressors require a dedicated 240V circuit, typically 30-60A depending on the unit size. The breaker size must match the unit's nameplate specifications. A disconnect switch is required near the outdoor unit.",
  },
  {
    id: "waterheater",
    position: 4,
    side: "right",
    label: "Water Heater",
    amps: 30,
    type: "double",
    appliances: ["Electric water heater"],
    wireGauge: "10 AWG",
    description:
      "Electric water heaters typically need a dedicated 30A/240V circuit. The heating elements draw significant current. Tankless electric water heaters may require multiple circuits or much larger breakers (up to 150A total).",
  },
  {
    id: "bathroom",
    position: 5,
    side: "right",
    label: "Bathroom",
    amps: 20,
    type: "single",
    appliances: ["Bathroom outlets", "Hair dryer", "Electric razor"],
    wireGauge: "12 AWG",
    isGFCI: true,
    description:
      "Bathroom circuits require 20A GFCI protection. Hair dryers alone can draw 12-15 amps. Each bathroom should ideally have its own circuit, though code allows one GFCI circuit to serve multiple bathrooms.",
  },
  {
    id: "bedroom",
    position: 6,
    side: "right",
    label: "Bedrooms",
    amps: 15,
    type: "single",
    appliances: ["Bedroom outlets", "Lamps", "Phone chargers", "TV"],
    wireGauge: "14 AWG",
    isAFCI: true,
    description:
      "Bedroom circuits are typically 15A and require AFCI protection per modern code. AFCI breakers detect dangerous electrical arcs that could cause fires — especially important in bedrooms where people sleep.",
  },
];

export default function BreakerGuide() {
  const [selectedBreaker, setSelectedBreaker] = useState<BreakerInfo | null>(
    null
  );

  const leftBreakers = breakerPanel.filter((b) => b.side === "left");
  const rightBreakers = breakerPanel.filter((b) => b.side === "right");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.electrical}
            alt="Circuit breaker panel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4A843]/90 via-[#D4A843]/85 to-[#D4A843]/70" />
        </div>

        <div className="container relative z-10 py-14 md:py-18">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/category/electrical"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-sans font-medium transition-colors mb-5"
            >
              <ArrowLeft className="w-4 h-4" />
              Electrical Knowledge Tree
            </Link>

            <h1 className="font-sans font-bold text-navy-dark text-3xl md:text-4xl tracking-tight">
              Circuit Breaker Guide
            </h1>
            <p className="text-navy-dark/80 text-base md:text-lg mt-2 max-w-xl font-serif leading-relaxed">
              Interactive guide to understanding your home's breaker panel.
              Click on any breaker to learn what it controls and why it's sized
              that way.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full block">
            <path d="M0 48L1440 0V48H0Z" fill="oklch(0.94 0.005 80)" />
          </svg>
        </div>
      </section>

      {/* Safety Warning */}
      <section className="py-6">
        <div className="container">
          <div className="max-w-4xl mx-auto p-4 rounded-xl bg-destructive/5 border border-destructive/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-sans font-bold text-destructive text-sm">
                Safety Warning
              </p>
              <p className="text-foreground text-sm font-serif mt-1 leading-relaxed">
                This guide is for <strong>educational purposes only</strong>.
                Working inside a breaker panel is extremely dangerous and should
                only be done by a licensed electrician. The panel cover should
                never be removed by an unqualified person — exposed bus bars
                carry lethal voltage even when individual breakers are off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Panel */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Panel Visualization */}
              <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <h2 className="font-sans font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#D4A843]" />
                    Breaker Panel
                  </h2>

                  {/* Panel Box */}
                  <div className="bg-[#6B7280] rounded-xl p-3 shadow-lg border-2 border-[#4B5563]">
                    {/* Main Breaker */}
                    <div className="mb-3">
                      <BreakerSlot
                        breaker={breakerPanel.find((b) => b.id === "main")!}
                        isSelected={selectedBreaker?.id === "main"}
                        onClick={() =>
                          setSelectedBreaker(
                            breakerPanel.find((b) => b.id === "main")!
                          )
                        }
                        isMain
                      />
                    </div>

                    <div className="border-t border-[#4B5563] pt-3">
                      {/* Two columns */}
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                        {(() => {
                          const leftNonMain = leftBreakers.filter(b => b.id !== "main");
                          const rows = Math.max(leftNonMain.length, rightBreakers.length);
                          return Array.from({ length: rows }, (_, i) => {
                            const left = leftNonMain[i];
                            const right = rightBreakers[i];
                            return (
                              <React.Fragment key={i}>
                                {left ? (
                                  <BreakerSlot
                                    breaker={left}
                                    isSelected={selectedBreaker?.id === left.id}
                                    onClick={() => setSelectedBreaker(left)}
                                  />
                                ) : (
                                  <div />
                                )}
                                {right ? (
                                  <BreakerSlot
                                    breaker={right}
                                    isSelected={selectedBreaker?.id === right.id}
                                    onClick={() => setSelectedBreaker(right)}
                                  />
                                ) : (
                                  <div />
                                )}
                              </React.Fragment>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* Panel label */}
                    <div className="mt-3 pt-2 border-t border-[#4B5563] text-center">
                      <span className="font-mono text-[9px] text-[#9CA3AF] uppercase tracking-widest">
                        200A Service Panel
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs font-mono mt-3 text-center">
                    Click any breaker to see details
                  </p>
                </div>
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {selectedBreaker ? (
                    <motion.div
                      key={selectedBreaker.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                    >
                      <BreakerDetail breaker={selectedBreaker} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 text-center"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                        <Zap className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-sans font-bold text-foreground text-lg">
                        Select a Breaker
                      </h3>
                      <p className="text-muted-foreground text-sm mt-2 max-w-xs font-serif">
                        Click on any breaker in the panel to learn what it
                        controls, its amperage rating, and why it's configured
                        that way.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breaker Size Reference Table */}
      <section className="py-10 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans font-bold text-foreground text-xl mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#D4A843]" />
              Quick Reference: Breaker Sizes & Wire Gauges
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-navy text-warm-white">
                    <th className="px-4 py-3 text-left font-sans font-bold text-xs uppercase tracking-wider">
                      Breaker Size
                    </th>
                    <th className="px-4 py-3 text-left font-sans font-bold text-xs uppercase tracking-wider">
                      Wire Gauge
                    </th>
                    <th className="px-4 py-3 text-left font-sans font-bold text-xs uppercase tracking-wider">
                      Voltage
                    </th>
                    <th className="px-4 py-3 text-left font-sans font-bold text-xs uppercase tracking-wider">
                      Common Uses
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      amps: "15A",
                      wire: "14 AWG",
                      voltage: "120V",
                      uses: "Lighting, bedrooms, living room outlets",
                    },
                    {
                      amps: "20A",
                      wire: "12 AWG",
                      voltage: "120V",
                      uses: "Kitchen, bathroom, garage, outdoor outlets",
                    },
                    {
                      amps: "30A",
                      wire: "10 AWG",
                      voltage: "240V",
                      uses: "Electric dryer, water heater",
                    },
                    {
                      amps: "40A",
                      wire: "8 AWG",
                      voltage: "240V",
                      uses: "Electric range (small), central AC",
                    },
                    {
                      amps: "50A",
                      wire: "6 AWG",
                      voltage: "240V",
                      uses: "Electric range (large), EV charger",
                    },
                    {
                      amps: "60A",
                      wire: "4 AWG",
                      voltage: "240V",
                      uses: "Large central AC, sub-panel feed",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="bg-card hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-foreground">
                        {row.amps}
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {row.wire}
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {row.voltage}
                      </td>
                      <td className="px-4 py-3 font-serif text-foreground">
                        {row.uses}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground text-xs font-mono mt-4">
              Note: Always follow local electrical codes. Wire gauge must match
              breaker size — never use a larger breaker with smaller wire.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────

function BreakerSlot({
  breaker,
  isSelected,
  onClick,
  isMain = false,
}: {
  breaker: BreakerInfo;
  isSelected: boolean;
  onClick: () => void;
  isMain?: boolean;
}) {
  const isDouble = breaker.type === "double";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded transition-all ${
        isMain ? "p-2" : "p-1.5"
      } ${
        isSelected
          ? "bg-[#D4A843] ring-2 ring-[#D4A843] ring-offset-1 ring-offset-[#6B7280]"
          : "bg-[#1F2937] hover:bg-[#374151]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Toggle indicator */}
          <div
            className={`w-3 h-5 rounded-sm flex-shrink-0 ${
              isSelected ? "bg-[#92400E]" : "bg-[#4B5563]"
            }`}
          />
          <span
            className={`text-[10px] font-mono truncate ${
              isSelected ? "text-[#1F2937] font-bold" : "text-[#D1D5DB]"
            }`}
          >
            {breaker.label}
          </span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {breaker.isGFCI && (
            <span className="text-[7px] font-mono font-bold bg-[#059669] text-white px-1 rounded">
              GFCI
            </span>
          )}
          {breaker.isAFCI && (
            <span className="text-[7px] font-mono font-bold bg-[#7C3AED] text-white px-1 rounded">
              AFCI
            </span>
          )}
          <span
            className={`text-[9px] font-mono font-bold px-1 rounded ${
              isSelected
                ? "bg-[#92400E] text-[#FDE68A]"
                : "bg-[#374151] text-[#9CA3AF]"
            }`}
          >
            {breaker.amps}A
          </span>
        </div>
      </div>
      {isDouble && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <div
            className={`w-3 h-5 rounded-sm flex-shrink-0 ${
              isSelected ? "bg-[#92400E]" : "bg-[#4B5563]"
            }`}
          />
          <span
            className={`text-[8px] font-mono ${
              isSelected ? "text-[#1F2937]" : "text-[#6B7280]"
            }`}
          >
            240V Double-Pole
          </span>
        </div>
      )}
    </button>
  );
}

function BreakerDetail({ breaker }: { breaker: BreakerInfo }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#D4A843] flex items-center justify-center flex-shrink-0">
          <Zap className="w-6 h-6 text-navy-dark" />
        </div>
        <div>
          <h2 className="font-sans font-bold text-foreground text-xl">
            {breaker.label}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="font-mono text-xs font-bold bg-navy text-warm-white px-2 py-0.5 rounded">
              {breaker.amps}A
            </span>
            <span className="font-mono text-xs font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded">
              {breaker.type === "double" ? "240V" : "120V"}
            </span>
            <span className="font-mono text-xs font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded">
              {breaker.wireGauge}
            </span>
            {breaker.type === "double" && (
              <span className="font-mono text-xs font-bold bg-[#D4A843]/15 text-[#D4A843] px-2 py-0.5 rounded">
                Double-Pole
              </span>
            )}
            {breaker.isGFCI && (
              <span className="font-mono text-xs font-bold bg-[#059669]/15 text-[#059669] px-2 py-0.5 rounded">
                GFCI Protected
              </span>
            )}
            {breaker.isAFCI && (
              <span className="font-mono text-xs font-bold bg-[#7C3AED]/15 text-[#7C3AED] px-2 py-0.5 rounded">
                AFCI Protected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-5 rounded-xl bg-navy/[0.03] border border-dashed border-blueprint/20">
        <p className="text-foreground text-[15px] leading-[1.8] font-serif">
          {breaker.description}
        </p>
      </div>

      {/* Appliances */}
      <div>
        <h3 className="font-sans font-bold text-foreground text-sm mb-3 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#D4A843]" />
          Connected Appliances
        </h3>
        <div className="flex flex-wrap gap-2">
          {breaker.appliances.map((app, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-sans font-medium text-foreground"
            >
              <ChevronRight className="w-3 h-3 text-[#D4A843]" />
              {app}
            </span>
          ))}
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-card border border-border text-center">
          <p className="font-mono text-lg font-bold text-foreground">
            {breaker.amps}A
          </p>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Amperage
          </p>
        </div>
        <div className="p-3 rounded-lg bg-card border border-border text-center">
          <p className="font-mono text-lg font-bold text-foreground">
            {breaker.type === "double" ? "240V" : "120V"}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Voltage
          </p>
        </div>
        <div className="p-3 rounded-lg bg-card border border-border text-center">
          <p className="font-mono text-lg font-bold text-foreground">
            {breaker.wireGauge}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Wire Gauge
          </p>
        </div>
      </div>
    </div>
  );
}
