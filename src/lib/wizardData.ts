/*
 * Troubleshooting Wizard — Decision Tree Data
 * "Before You Call" — If It's Smokin', It's Broken
 * Electrical troubleshooting flow with safety-first approach
 */

export type NodeType = "safety-gate" | "question" | "action" | "stop" | "resolved" | "call-tech";
export type Severity = "critical" | "warning";

export interface WizardOption {
  label: string;
  next: string;
  icon?: string;
}

export interface WizardNode {
  id: string;
  type: NodeType;
  icon: string;
  title: string;
  subtitle?: string;
  question?: string;
  checks?: string[];
  yesResult?: string;
  noResult?: string;
  message?: string;
  details?: string[];
  severity?: Severity;
  next?: string;
  instruction?: string;
  learn?: string;
  options?: WizardOption[];
  tip?: string;
  script?: string;
}

export const WIZARD_TREE: Record<string, WizardNode> = {
  entry: {
    id: "entry",
    type: "safety-gate",
    icon: "🔥",
    title: "Safety Check",
    subtitle: "Before we check anything, let's make sure you're safe.",
    question: "Use your senses. Do you notice any of the following?",
    checks: [
      "👃 Smell — Burning, melting plastic, or hot metal",
      "👀 See — Smoke, scorch marks, sparks, or discoloration",
      "👂 Hear — Buzzing, crackling, humming, or popping",
      "✋ Feel — Heat from outlet, switch, or cord (back of your hand, don't grab)",
      "💧 Water — Moisture or standing water near electrical components",
    ],
    yesResult: "stop-emergency",
    noResult: "scope",
  },
  "stop-emergency": {
    id: "stop-emergency",
    type: "stop",
    icon: "🛑",
    title: "Stop. Do Not Proceed.",
    message: "If it's smokin', it's broken.",
    details: [
      "🔌 Shut it off or unplug it. If you can safely reach the breaker, turn it off.",
      "👃👀👂✋ Use your senses to pinpoint the problem:",
      "• Smell — Follow the burning smell. Is it at the outlet? The cord? The panel? The appliance?",
      "• Look — Where is the smoke or discoloration coming from?",
      "• Listen — Is the buzzing at the wall, the fixture, or the panel?",
      "• Touch — Is the outlet warm? The cord? The device? (Back of your hand only — don't grab.)",
      "📝 Write down what you found. This helps the electrician find the problem faster.",
      "📞 Call a licensed electrician. If there's active fire or you can't shut it off — call 911.",
    ],
    severity: "critical",
  },
  scope: {
    id: "scope",
    type: "question",
    icon: "🔍",
    title: "What stopped working?",
    subtitle: "Let's figure out what's wrong.",
    options: [
      { label: "One outlet", next: "one-outlet-gfci", icon: "🔌" },
      { label: "Multiple outlets", next: "multi-outlet-where", icon: "⚡" },
      { label: "One room", next: "one-room-lights", icon: "🏠" },
      { label: "Breaker keeps tripping", next: "breaker-unplug", icon: "⚠️" },
      { label: "Whole house", next: "whole-house-main", icon: "🏗️" },
    ],
  },
  "one-outlet-gfci": {
    id: "one-outlet-gfci",
    type: "action",
    icon: "🔘",
    title: "Check for a GFCI Outlet",
    instruction:
      "Look for an outlet with TEST and RESET buttons. Check the same room, nearby bathrooms, kitchen, garage, and exterior walls.",
    learn: "GFCI outlets protect people from shock. One GFCI can protect multiple downstream outlets — a tripped GFCI in your bathroom could kill an outlet in your bedroom.",
    question: "Did you find a GFCI outlet?",
    options: [
      { label: "Yes, found one", next: "one-outlet-gfci-reset" },
      { label: "No GFCI found", next: "one-outlet-breaker" },
    ],
  },
  "one-outlet-gfci-reset": {
    id: "one-outlet-gfci-reset",
    type: "action",
    icon: "👆",
    title: "Press the RESET Button",
    instruction: "Press the RESET button firmly on the GFCI outlet. You should hear a click.",
    question: "Did it click and reset?",
    options: [
      { label: "Yes — outlet works now", next: "resolved-gfci" },
      { label: "Yes — but my outlet is still dead", next: "one-outlet-breaker" },
      { label: "No — won't reset", next: "stop-gfci-wont-reset" },
    ],
  },
  "resolved-gfci": {
    id: "resolved-gfci",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — GFCI Was Tripped",
    message: "Your GFCI outlet had tripped, cutting power downstream. The safety system worked.",
    tip: "If this happens frequently, a device may be drawing too much or there's moisture in the circuit.",
  },
  "stop-gfci-wont-reset": {
    id: "stop-gfci-wont-reset",
    type: "call-tech",
    icon: "📞",
    title: "Time to Call a Professional",
    message: "A GFCI that won't reset may have a ground fault or wiring issue.",
    script:
      "Hi, I have a GFCI outlet that won't reset. I've pressed the reset button firmly and it won't click or stay engaged. The outlet is in my [ROOM]. Other outlets nearby are also not working.",
  },
  "one-outlet-breaker": {
    id: "one-outlet-breaker",
    type: "action",
    icon: "⚡",
    title: "Check Your Breaker Panel",
    instruction:
      "Go to your breaker panel. Look for a breaker that's slightly off-center — not fully ON and not fully OFF. This is the tripped position.",
    question: "Did you find a tripped breaker?",
    options: [
      { label: "Yes, found one", next: "one-outlet-breaker-reset" },
      { label: "No — all look normal", next: "one-outlet-test-nearby" },
    ],
  },
  "one-outlet-breaker-reset": {
    id: "one-outlet-breaker-reset",
    type: "action",
    icon: "🔄",
    title: "Reset the Breaker",
    instruction: "Flip the tripped breaker fully to OFF first, then firmly to ON. Do this once only.",
    learn: "Breakers trip to prevent wire fires. Never hold or force a breaker into the ON position.",
    question: "What happened?",
    options: [
      { label: "Stayed on — outlet works", next: "resolved-breaker" },
      { label: "Stayed on — outlet still dead", next: "one-outlet-test-nearby" },
      { label: "Tripped again immediately", next: "stop-breaker-trips" },
    ],
  },
  "resolved-breaker": {
    id: "resolved-breaker",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Breaker Was Tripped",
    message: "The breaker protecting that circuit had tripped. Power should be restored.",
    tip: "If it trips again, you may be overloading the circuit. Spread high-draw appliances across different circuits.",
  },
  "stop-breaker-trips": {
    id: "stop-breaker-trips",
    type: "stop",
    icon: "🛑",
    title: "Stop — Breaker Tripping Repeatedly",
    message: "A breaker that trips twice is telling you something is wrong. Do not reset it again.",
    severity: "warning",
    next: "call-tech-breaker-trips",
  },
  "call-tech-breaker-trips": {
    id: "call-tech-breaker-trips",
    type: "call-tech",
    icon: "📞",
    title: "Call a Licensed Electrician",
    message: "Repeated trips can indicate a short circuit, ground fault, or overloaded wiring.",
    script:
      "Hi, I have a breaker that keeps tripping. I reset it once and it tripped again immediately. I've unplugged everything on that circuit and it still trips. The breaker is labeled [LABEL]. No smoke or burning smell.",
  },
  "one-outlet-test-nearby": {
    id: "one-outlet-test-nearby",
    type: "action",
    icon: "🔌",
    title: "Test a Nearby Outlet",
    instruction:
      "Plug something you know works — a phone charger or lamp — into the nearest outlet to the dead one.",
    question: "Does the nearby outlet work?",
    options: [
      { label: "Yes — nearby works fine", next: "one-outlet-visual" },
      { label: "No — nearby is also dead", next: "multi-outlet-gfci-check" },
    ],
  },
  "one-outlet-visual": {
    id: "one-outlet-visual",
    type: "action",
    icon: "👁️",
    title: "Visual Check Only",
    instruction:
      "Look at the dead outlet. Do NOT remove anything. Check for: cracked cover plate, outlet loose or pulled from wall, discoloration or darkening.",
    learn: "A single dead outlet with neighbors working is usually a failed outlet or loose wire connection.",
    question: "Does anything look wrong?",
    options: [
      { label: "Looks normal", next: "call-tech-single-outlet" },
      { label: "Cracked, loose, or discolored", next: "stop-damaged-outlet" },
      { label: "Warm to the touch", next: "stop-warm-outlet" },
    ],
  },
  "stop-warm-outlet": {
    id: "stop-warm-outlet",
    type: "stop",
    icon: "🛑",
    title: "Stop — Warm Outlet Detected",
    message:
      "A warm outlet can indicate a loose connection or overloaded wiring. Do not use it. Turn off the breaker for this circuit.",
    severity: "critical",
    next: "call-tech-single-outlet",
  },
  "stop-damaged-outlet": {
    id: "stop-damaged-outlet",
    type: "stop",
    icon: "⚠️",
    title: "Visible Damage — Do Not Use",
    message: "A damaged outlet should not be used until inspected and replaced by a professional.",
    severity: "warning",
    next: "call-tech-single-outlet",
  },
  "call-tech-single-outlet": {
    id: "call-tech-single-outlet",
    type: "call-tech",
    icon: "📞",
    title: "Call a Professional",
    message: "You've done the right checks. This outlet needs hands-on diagnosis.",
    script:
      "Hi, I have a dead outlet in my [ROOM]. I've checked GFCI outlets and they're fine. Breaker is not tripped. Nearby outlets work. The outlet [looks normal / is cracked / feels warm]. I haven't removed anything.",
  },
  "multi-outlet-where": {
    id: "multi-outlet-where",
    type: "question",
    icon: "⚡",
    title: "Where Are the Dead Outlets?",
    subtitle: "This helps narrow down the circuit.",
    options: [
      { label: "All in the same room", next: "multi-outlet-gfci-check" },
      { label: "In different rooms", next: "multi-outlet-gfci-check" },
      { label: "I'm not sure", next: "multi-outlet-gfci-check" },
    ],
  },
  "multi-outlet-gfci-check": {
    id: "multi-outlet-gfci-check",
    type: "action",
    icon: "🔘",
    title: "Check All GFCI Outlets",
    instruction:
      "Walk through your home and press RESET on every GFCI outlet. Common locations: bathrooms, kitchen near sink, garage, exterior walls, basement, laundry.",
    learn: "Multiple dead outlets usually means one tripped GFCI or breaker is cutting power to the whole chain.",
    question: "Did resetting a GFCI restore power?",
    options: [
      { label: "Yes — outlets are back", next: "resolved-gfci-multi" },
      { label: "No — still dead", next: "multi-outlet-breaker" },
    ],
  },
  "resolved-gfci-multi": {
    id: "resolved-gfci-multi",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — GFCI Protected Multiple Outlets",
    message: "One GFCI was tripped, cutting power to all downstream outlets.",
    tip: "If it keeps tripping, plug devices in one at a time to find the culprit.",
  },
  "multi-outlet-breaker": {
    id: "multi-outlet-breaker",
    type: "action",
    icon: "⚡",
    title: "Check Your Breaker Panel",
    instruction: "Look for any breaker in the tripped position. Reset: flip fully OFF, then firmly ON.",
    question: "What happened?",
    options: [
      { label: "Found and reset — power restored", next: "resolved-breaker" },
      { label: "No tripped breakers found", next: "call-tech-multi" },
      { label: "Breaker tripped again", next: "stop-breaker-trips" },
    ],
  },
  "call-tech-multi": {
    id: "call-tech-multi",
    type: "call-tech",
    icon: "📞",
    title: "Call a Professional",
    message: "Multiple dead outlets with no tripped GFCI or breaker suggests a wiring issue.",
    script:
      "Hi, I have multiple outlets not working in my [ROOM(S)]. I've reset all GFCI outlets. No breakers appear tripped. No smoke, heat, or unusual smells.",
  },
  "one-room-lights": {
    id: "one-room-lights",
    type: "question",
    icon: "💡",
    title: "What's Working in the Room?",
    subtitle: "This tells us if it's one circuit or multiple.",
    options: [
      { label: "Lights work, outlets dead", next: "multi-outlet-gfci-check" },
      { label: "Outlets work, lights dead", next: "one-room-switch" },
      { label: "Everything is dead", next: "multi-outlet-gfci-check" },
    ],
  },
  "one-room-switch": {
    id: "one-room-switch",
    type: "action",
    icon: "🔦",
    title: "Check Switch and Bulbs",
    instruction:
      "Try the switch. If nothing, replace the bulb with one you know works. Check for multiple switches controlling the same light (3-way switches).",
    learn: "Lights and outlets in the same room are often on different circuits.",
    question: "What did you find?",
    options: [
      { label: "New bulb works", next: "resolved-bulb" },
      { label: "New bulb doesn't work either", next: "one-room-breaker" },
    ],
  },
  "resolved-bulb": {
    id: "resolved-bulb",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Burned Out Bulb",
    message: "Sometimes it really is the simple thing.",
    tip: "LED bulbs last much longer. If bulbs burn out frequently in the same fixture, the fixture may have a wiring issue.",
  },
  "one-room-breaker": {
    id: "one-room-breaker",
    type: "action",
    icon: "⚡",
    title: "Check the Lighting Circuit Breaker",
    instruction: "Look for a breaker labeled for that room's lights. Reset if tripped: OFF first, then ON.",
    question: "What happened?",
    options: [
      { label: "Lights are back", next: "resolved-breaker" },
      { label: "No change", next: "call-tech-room" },
      { label: "Breaker trips again", next: "stop-breaker-trips" },
    ],
  },
  "call-tech-room": {
    id: "call-tech-room",
    type: "call-tech",
    icon: "📞",
    title: "Call a Professional",
    message: "Dead lights with a good bulb and no tripped breaker suggests a switch or wiring issue.",
    script:
      "Hi, lights in my [ROOM] aren't working. I replaced the bulb with a known working one. Breaker is not tripped. Outlets in the room work fine. The switch [feels normal / feels loose / makes no click].",
  },
  "breaker-unplug": {
    id: "breaker-unplug",
    type: "action",
    icon: "🔌",
    title: "Unplug Everything on That Circuit",
    instruction:
      "Unplug every device on the tripping circuit. Space heaters, microwaves, hair dryers, AC units — everything. Then reset the breaker one more time.",
    learn: "Breakers trip for three reasons: overload (too many devices), short circuit (wiring fault), or ground fault (current going where it shouldn't).",
    question: "With everything unplugged, what happened?",
    options: [
      { label: "Breaker holds — stays on", next: "breaker-overload" },
      { label: "Still trips with nothing plugged in", next: "stop-breaker-trips" },
    ],
  },
  "breaker-overload": {
    id: "breaker-overload",
    type: "action",
    icon: "📊",
    title: "Find the Culprit",
    instruction: "Plug devices back in one at a time. Wait 30 seconds between each.",
    learn: "A standard circuit is 15 or 20 amps. A space heater alone draws 12–15 amps. Add a hair dryer and you've exceeded capacity.",
    question: "What happened?",
    options: [
      { label: "Trips with one specific device", next: "resolved-device" },
      { label: "Only trips with multiple devices on", next: "resolved-capacity" },
    ],
  },
  "resolved-device": {
    id: "resolved-device",
    type: "resolved",
    icon: "✅",
    title: "Problem Found — Faulty Device",
    message: "One device is causing the trip. It likely has an internal short or ground fault.",
    tip: "Stop using that device. If under warranty, contact the manufacturer. Do not try to repair electrical devices yourself.",
  },
  "resolved-capacity": {
    id: "resolved-capacity",
    type: "resolved",
    icon: "✅",
    title: "Problem Found — Circuit Overload",
    message: "You're drawing more power than the circuit can handle. Most common reason breakers trip.",
    tip: "Spread high-draw appliances across different circuits. Space heaters, microwaves, hair dryers, and AC units are the usual suspects.",
  },
  "whole-house-main": {
    id: "whole-house-main",
    type: "action",
    icon: "🏗️",
    title: "Check Your Main Breaker",
    instruction:
      "The main breaker is the large breaker at the top or bottom of your panel, usually rated 100–200 amps. Check if tripped. Reset once: fully OFF, then firmly ON.",
    learn: "The main breaker controls all power to your home.",
    question: "What happened?",
    options: [
      { label: "Reset fixed it", next: "resolved-main" },
      { label: "Main looks fine — not tripped", next: "whole-house-neighbors" },
      { label: "Main trips again", next: "stop-main-trips" },
    ],
  },
  "resolved-main": {
    id: "resolved-main",
    type: "resolved",
    icon: "✅",
    title: "Power Restored",
    message: "Your main breaker had tripped, cutting all power.",
    tip: "A main breaker trip is unusual. If it happens again, call an electrician immediately.",
  },
  "whole-house-neighbors": {
    id: "whole-house-neighbors",
    type: "action",
    icon: "🏘️",
    title: "Check With Neighbors",
    instruction: "Are your neighbors' lights on? Ask if they have power. Look for utility trucks.",
    question: "Do your neighbors have power?",
    options: [
      { label: "Neighbors are out too", next: "resolved-utility" },
      { label: "Just me", next: "call-tech-whole-house" },
    ],
  },
  "resolved-utility": {
    id: "resolved-utility",
    type: "resolved",
    icon: "✅",
    title: "Utility Outage",
    message: "This is a power company issue, not your home's wiring.",
    tip: "Contact your electric utility to report the outage. Check their website or app for outage maps and restoration estimates.",
  },
  "stop-main-trips": {
    id: "stop-main-trips",
    type: "stop",
    icon: "🛑",
    title: "Stop — Main Breaker Tripping",
    message: "A main breaker that won't hold is a serious issue. Do not reset again.",
    severity: "critical",
    next: "call-tech-whole-house",
  },
  "call-tech-whole-house": {
    id: "call-tech-whole-house",
    type: "call-tech",
    icon: "📞",
    title: "Call Immediately",
    message: "Whole-house power loss with no utility outage requires professional diagnosis.",
    script:
      "Hi, I've lost all power to my home. My neighbors have power. The main breaker [was not tripped / tripped again after reset]. No storms or obvious external damage. No smoke or burning smell.",
  },
};
