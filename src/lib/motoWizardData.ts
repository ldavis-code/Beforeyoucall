/*
 * Motorcycle Troubleshooting Wizard — "Motorcycle Won't Start" Decision Tree
 * "Before You Call" — If It's Smokin', It's Broken
 * Safety-first diagnostic flow for all motorcycle types
 */

export type MotoNodeType = "safety-gate" | "question" | "action" | "stop" | "resolved" | "call-tech";
export type MotoSeverity = "critical" | "warning";

export interface MotoWizardOption {
  label: string;
  next: string;
  icon?: string;
}

export interface MotoWizardNode {
  id: string;
  type: MotoNodeType;
  icon: string;
  title: string;
  subtitle?: string;
  question?: string;
  checks?: string[];
  yesResult?: string;
  noResult?: string;
  message?: string;
  details?: string[];
  severity?: MotoSeverity;
  next?: string;
  instruction?: string;
  learn?: string;
  options?: MotoWizardOption[];
  tip?: string;
  script?: string;
}

export const MOTO_WIZARD_TREE: Record<string, MotoWizardNode> = {
  /* ═══════════════════════════════════════════════════
     ENTRY — SAFETY GATE
     ═══════════════════════════════════════════════════ */
  entry: {
    id: "entry",
    type: "safety-gate",
    icon: "🔥",
    title: "Safety Check",
    subtitle: "Before we diagnose anything, let's make sure you're safe.",
    question: "Use your senses. Do you notice any of the following?",
    checks: [
      "👃 Smell — Strong gasoline odor, burning oil, or electrical burning smell",
      "👀 See — Smoke from the engine, leaking fuel, exposed wires, or sparks",
      "👂 Hear — Hissing from the fuel system or unusual electrical buzzing",
      "✋ Feel — Excessive heat from the engine or electrical components",
      "💧 Fluids — Fuel puddle under the bike, coolant leak, or oil dripping",
    ],
    yesResult: "stop-emergency",
    noResult: "kill-switch-check",
  },

  "stop-emergency": {
    id: "stop-emergency",
    type: "stop",
    icon: "🛑",
    title: "Stop. Do Not Proceed.",
    message: "If it's smokin', it's broken.",
    details: [
      "🔑 Turn the ignition OFF. Remove the key.",
      "⛽ If you smell gas — do NOT try to start it. Fuel may be pooling near hot engine parts.",
      "🔥 If you see smoke — let the engine cool completely before investigating.",
      "💧 If fuel is leaking — move away from the bike. Do not smoke or use open flames nearby.",
      "⚡ If you see sparks or smell electrical burning — disconnect the battery negative terminal if safe to do so.",
      "📝 Note what you observed — this helps the mechanic diagnose faster.",
      "📞 If there's active fire — call 911. Use a dry chemical extinguisher (Class B) if available. Never use water on a fuel fire.",
    ],
    severity: "critical",
  },

  /* ═══════════════════════════════════════════════════
     THE #1 GOTCHA — KILL SWITCH
     ═══════════════════════════════════════════════════ */
  "kill-switch-check": {
    id: "kill-switch-check",
    type: "action",
    icon: "🔴",
    title: "Check the Kill Switch",
    instruction: "This is the #1 most common reason a motorcycle won't start. Look at the red kill switch on the right handlebar. Make sure it's in the RUN position (not OFF/STOP). It's easy to accidentally bump it, especially when parking or putting on gloves.",
    learn: "The kill switch (engine cut-off switch) breaks the ignition circuit completely. When it's in the OFF position, no electricity reaches the ignition system — the starter won't crank and the dash may or may not light up depending on the bike. Every experienced rider has been embarrassed by this at least once.",
    question: "Is the kill switch in the RUN position?",
    options: [
      { label: "It was OFF — switched it to RUN, now it starts!", next: "resolved-kill-switch" },
      { label: "Yes, it's in RUN — still won't start", next: "what-happens" },
    ],
  },

  "resolved-kill-switch": {
    id: "resolved-kill-switch",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Kill Switch Was Off",
    message: "The engine kill switch was in the OFF position, preventing the ignition system from operating.",
    tip: "Make the kill switch part of your pre-ride check: Key ON, kill switch RUN, neutral light on, then start. Some riders develop a habit of always flipping the kill switch to RUN as they mount the bike.",
  },

  /* ═══════════════════════════════════════════════════
     WHAT HAPPENS WHEN YOU TRY TO START?
     ═══════════════════════════════════════════════════ */
  "what-happens": {
    id: "what-happens",
    type: "question",
    icon: "🏍️",
    title: "What Happens When You Press the Start Button?",
    subtitle: "Turn the key to ON, make sure the kill switch is at RUN, and press the starter button. What do you observe?",
    options: [
      { label: "Completely dead — no dash lights, no sound at all", next: "completely-dead", icon: "💀" },
      { label: "Dash lights up but starter doesn't engage (no click, no crank)", next: "lights-no-crank", icon: "💡" },
      { label: "Single click but engine doesn't turn", next: "single-click", icon: "🔊" },
      { label: "Starter cranks slowly / sounds weak", next: "slow-crank", icon: "🐌" },
      { label: "Starter cranks normally but engine won't fire", next: "cranks-no-start", icon: "🔄" },
      { label: "Engine fires briefly then dies immediately", next: "starts-then-dies", icon: "💨" },
    ],
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 1: COMPLETELY DEAD
     ═══════════════════════════════════════════════════ */
  "completely-dead": {
    id: "completely-dead",
    type: "action",
    icon: "💀",
    title: "Completely Dead — No Power at All",
    instruction: "No dash lights, no neutral indicator, no headlight — the bike has zero electrical power. Check the battery connections first. Locate the battery (usually under the seat or a side panel). Are the terminals corroded (white/green crust)? Are the cables tight?",
    learn: "Motorcycles are entirely dependent on the battery for starting (unlike kick-start only bikes). A completely dead electrical system means either the battery is dead, the connections are broken, or a main fuse has blown.",
    question: "What do the battery terminals look like?",
    options: [
      { label: "Corroded — white/green buildup on terminals", next: "clean-terminals" },
      { label: "Loose — cables wiggle on the posts", next: "tighten-terminals" },
      { label: "Clean and tight — look fine", next: "check-main-fuse" },
    ],
  },

  "clean-terminals": {
    id: "clean-terminals",
    type: "action",
    icon: "🧹",
    title: "Clean Corroded Battery Terminals",
    instruction: "Disconnect the negative (−) cable first, then positive (+). Scrub terminals and cable ends with a wire brush, old toothbrush, or baking soda paste (1 tbsp baking soda + water). Rinse with clean water, dry completely. Reconnect positive (+) first, then negative (−).",
    learn: "Corrosion creates electrical resistance. Even a thin layer can prevent the high amperage (100+ amps) needed by the starter motor. Motorcycle batteries are smaller than car batteries, so any resistance has a bigger impact.",
    question: "After cleaning, does the bike power up?",
    options: [
      { label: "Yes — dash lights on, it starts!", next: "resolved-corrosion" },
      { label: "No — still completely dead", next: "check-main-fuse" },
    ],
  },

  "resolved-corrosion": {
    id: "resolved-corrosion",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Corroded Terminals",
    message: "Corrosion was blocking the electrical connection between the battery and the bike's electrical system.",
    tip: "Apply dielectric grease or battery terminal protector spray after cleaning to prevent future corrosion. Check terminals every spring before riding season. If corrosion keeps returning quickly, the battery may be overcharging (voltage regulator issue).",
  },

  "tighten-terminals": {
    id: "tighten-terminals",
    type: "action",
    icon: "🔧",
    title: "Tighten Battery Connections",
    instruction: "Use the appropriate wrench or socket (usually 8mm or 10mm) to tighten the terminal bolts. The cables should not move at all when you try to wiggle them. Check both the battery end AND the other end of each cable (where it connects to the frame ground and starter solenoid).",
    question: "After tightening, does the bike power up?",
    options: [
      { label: "Yes — it starts!", next: "resolved-loose-terminal" },
      { label: "No — still dead", next: "check-main-fuse" },
    ],
  },

  "resolved-loose-terminal": {
    id: "resolved-loose-terminal",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Loose Battery Connection",
    message: "A loose terminal was preventing power from reaching the electrical system.",
    tip: "Motorcycle vibration loosens connections over time. Check terminal tightness at the start of each riding season and after any long ride on rough roads. Consider using nylon-insert lock nuts if your terminals keep loosening.",
  },

  "check-main-fuse": {
    id: "check-main-fuse",
    type: "action",
    icon: "⚡",
    title: "Check the Main Fuse",
    instruction: "Locate the main fuse — it's usually near the battery, in a small inline holder or in the main fuse box. It's typically 20A–30A and often red or yellow. Pull it out and inspect the metal strip inside. Is it broken/melted? Most bikes include a spare main fuse taped to the fuse box cover.",
    learn: "The main fuse protects the entire electrical system. If it blows, absolutely nothing works — no lights, no starter, no horn. A blown main fuse usually means a short circuit somewhere, but it can also blow from a loose battery connection causing a spark.",
    question: "What's the main fuse condition?",
    options: [
      { label: "Blown — metal strip is broken/melted", next: "replace-main-fuse" },
      { label: "Looks good — fuse is intact", next: "battery-voltage-check" },
      { label: "I can't find the main fuse", next: "battery-voltage-check" },
    ],
  },

  "replace-main-fuse": {
    id: "replace-main-fuse",
    type: "action",
    icon: "🔧",
    title: "Replace the Main Fuse",
    instruction: "Replace with the EXACT same amperage fuse (check the number printed on it). Most bikes have a spare taped to the fuse box lid. Never use a higher-rated fuse — this can cause a fire. After replacing, turn the key on.",
    learn: "If the new fuse blows immediately, there's an active short circuit in the wiring. Do NOT keep replacing fuses — each blown fuse is protecting you from a potential fire. The short needs to be found and repaired.",
    question: "After replacing the fuse, does the bike power up?",
    options: [
      { label: "Yes — it works!", next: "resolved-fuse" },
      { label: "New fuse blew immediately", next: "call-tech-short" },
      { label: "Fuse holds but bike still won't start", next: "what-happens" },
    ],
  },

  "resolved-fuse": {
    id: "resolved-fuse",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Blown Main Fuse",
    message: "The main fuse had blown, cutting all electrical power to the bike.",
    tip: "A blown main fuse can be a one-time event (caused by a spark when reconnecting the battery) or a symptom of a wiring problem. If it blows again, there's a short circuit that needs professional diagnosis. Always carry a spare fuse in your toolkit.",
  },

  "call-tech-short": {
    id: "call-tech-short",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — Short Circuit",
    message: "The main fuse is blowing immediately upon replacement, indicating an active short circuit in the wiring harness. This requires professional diagnosis with a multimeter to trace the short.",
    script: "Hi, my motorcycle's main fuse keeps blowing immediately when replaced. The battery connections are clean and tight. It's a [YEAR MAKE MODEL]. I suspect a short circuit in the wiring. I'd like to have the electrical system diagnosed.",
  },

  "battery-voltage-check": {
    id: "battery-voltage-check",
    type: "action",
    icon: "🔋",
    title: "Battery May Be Completely Dead",
    instruction: "If you have a multimeter, check the battery voltage. A healthy 12V motorcycle battery should read 12.4V or higher. Below 12.0V, it likely won't start the bike. Below 10V, the battery may not recover. If you don't have a multimeter, try jump-starting from a car battery (engine OFF) or a portable jump pack.",
    learn: "Motorcycle batteries are small (typically 8–14 amp-hours vs. 50+ for cars). They discharge faster when sitting, especially in cold weather. A motorcycle battery left unused for 2–3 months can discharge below recovery threshold.",
    question: "Can you test or jump the battery?",
    options: [
      { label: "Jump start worked — it runs!", next: "resolved-dead-battery" },
      { label: "Voltage is below 10V / won't jump", next: "call-tech-battery" },
      { label: "I can't test it — no tools available", next: "call-tech-battery" },
    ],
  },

  "resolved-dead-battery": {
    id: "resolved-dead-battery",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Dead Battery",
    message: "The battery was too discharged to power the starter. Jump-starting confirmed the rest of the system works.",
    tip: "Ride for at least 30 minutes to recharge the battery via the stator/alternator. If the battery keeps dying, it may need replacement (motorcycle batteries last 2–4 years) or the charging system (stator/regulator-rectifier) may be failing. Use a battery tender during storage — this is the single best thing you can do for motorcycle battery life.",
  },

  "call-tech-battery": {
    id: "call-tech-battery",
    type: "call-tech",
    icon: "📞",
    title: "Battery Needs Replacement or Charging",
    message: "The battery is deeply discharged or dead. Most motorcycle shops and auto parts stores can test and replace motorcycle batteries. Bring your old battery for core exchange credit.",
    script: "Hi, I need a battery for my [YEAR MAKE MODEL]. The current battery is completely dead — no dash lights at all. It's [AGE] years old. Can you help me find the right replacement? I'll bring the old one for core exchange.",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 2: LIGHTS ON BUT NO CRANK
     ═══════════════════════════════════════════════════ */
  "lights-no-crank": {
    id: "lights-no-crank",
    type: "action",
    icon: "💡",
    title: "Dash Lights On But Starter Won't Engage",
    instruction: "The battery has enough power for lights but the starter motor doesn't even try to engage. On most motorcycles, you MUST have the clutch lever pulled in to activate the starter. Check: (1) Is the clutch lever fully pulled in? (2) Is the bike in NEUTRAL? (Some bikes require neutral OR clutch, others require both.) (3) Is the kickstand UP? (Most bikes have a kickstand safety switch that prevents starting in gear with the stand down.)",
    learn: "Modern motorcycles have multiple safety interlocks: clutch switch, neutral switch, kickstand switch, and tip-over sensor. ALL conditions must be met or the starter circuit stays open. These switches prevent the bike from lurching forward unexpectedly.",
    question: "After checking all safety switches, what happens?",
    options: [
      { label: "It starts! — I wasn't pulling the clutch / stand was down", next: "resolved-safety-switch" },
      { label: "Still nothing — all switches correct", next: "check-starter-button" },
    ],
  },

  "resolved-safety-switch": {
    id: "resolved-safety-switch",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Safety Interlock",
    message: "A safety switch wasn't in the correct position, preventing the starter from engaging.",
    tip: "Develop a start-up routine: Key ON → Kill switch RUN → Neutral (green N light) → Clutch IN → Kickstand UP → Press start. If you're in gear, you MUST hold the clutch. Some bikes (especially newer ones) require the clutch even in neutral.",
  },

  "check-starter-button": {
    id: "check-starter-button",
    type: "action",
    icon: "🔘",
    title: "Check the Starter Button Circuit",
    instruction: "With the key ON, kill switch at RUN, clutch pulled in, and kickstand up — press the starter button firmly. Listen carefully for any click from the starter relay (solenoid), usually located near the battery. If you hear nothing at all, the starter button, wiring, or one of the safety switches may be faulty.",
    learn: "The starter button sends a low-current signal to the starter relay. The relay then sends high current from the battery to the starter motor. If the relay doesn't click, the signal isn't reaching it — either the button is bad, a safety switch is open, or there's a wiring issue.",
    question: "Do you hear any click from the relay?",
    options: [
      { label: "No click at all — completely silent", next: "check-clutch-switch" },
      { label: "I hear a faint click", next: "single-click" },
    ],
  },

  "check-clutch-switch": {
    id: "check-clutch-switch",
    type: "action",
    icon: "🤚",
    title: "Test the Clutch Safety Switch",
    instruction: "The clutch switch is a small button on the clutch lever perch. With the key ON, try rapidly squeezing and releasing the clutch lever while pressing the start button. Sometimes the switch contact gets dirty or misaligned. Also try putting the bike in neutral (green N light on) — some bikes bypass the clutch switch in neutral.",
    learn: "The clutch switch is a simple contact switch that wears out over time. Dirt, corrosion, or a slightly bent lever can prevent it from making contact. It's one of the most common 'won't start' causes on older bikes.",
    question: "Did working the clutch lever help?",
    options: [
      { label: "Yes — it starts after working the clutch!", next: "resolved-clutch-switch" },
      { label: "No — still nothing", next: "check-kickstand-switch" },
    ],
  },

  "resolved-clutch-switch": {
    id: "resolved-clutch-switch",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Clutch Switch Contact",
    message: "The clutch safety switch had a dirty or intermittent contact. Working the lever cleaned the contact enough to complete the circuit.",
    tip: "If this keeps happening, the clutch switch may need replacement ($10–20 part). You can also clean the switch contacts with electrical contact cleaner spray. Some riders install a clutch switch bypass, but this removes an important safety feature.",
  },

  "check-kickstand-switch": {
    id: "check-kickstand-switch",
    type: "action",
    icon: "🦵",
    title: "Test the Kickstand Safety Switch",
    instruction: "Put the bike in neutral (green N light). Raise the kickstand fully and try starting. Now put the stand down and try again. The kickstand switch is at the base of the kickstand pivot — check if the spring is returning the stand fully or if it's hanging slightly down.",
    learn: "The kickstand switch prevents starting in gear with the stand down (which would cause the bike to fall over when you ride away). But a faulty switch can prevent starting even in neutral. The switch plunger can get caked with road grime.",
    question: "Did manipulating the kickstand help?",
    options: [
      { label: "Yes — starts with stand fully up!", next: "resolved-kickstand" },
      { label: "No — still won't engage starter", next: "call-tech-starter-circuit" },
    ],
  },

  "resolved-kickstand": {
    id: "resolved-kickstand",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Kickstand Switch",
    message: "The kickstand safety switch wasn't fully engaging, preventing the starter from operating.",
    tip: "Clean the kickstand switch area with contact cleaner and lubricate the pivot. Check that the return spring pulls the stand up firmly. If the switch is intermittent, replacement is inexpensive ($15–30). Some riders zip-tie the switch plunger in the 'up' position as a temporary fix, but this removes the safety feature.",
  },

  "call-tech-starter-circuit": {
    id: "call-tech-starter-circuit",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — Starter Circuit",
    message: "With all safety switches checked and the relay not clicking, the issue is likely a faulty starter relay, starter button, or wiring problem. This requires electrical diagnosis with a multimeter.",
    script: "Hi, my [YEAR MAKE MODEL] won't start. Dash lights work, battery is good, kill switch is on RUN, clutch is pulled in, kickstand is up, and it's in neutral. The starter relay doesn't click when I press the button. I'd like the starter circuit diagnosed — could be the relay, button, or wiring.",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 3: SINGLE CLICK
     ═══════════════════════════════════════════════════ */
  "single-click": {
    id: "single-click",
    type: "action",
    icon: "🔊",
    title: "Single Click — Starter Relay Engages But Motor Doesn't Turn",
    instruction: "A single click means the starter relay (solenoid) is receiving the signal and trying to send power to the starter motor, but the motor isn't spinning. This is usually a battery issue — the battery has enough voltage for the relay but not enough amperage for the starter motor. Check: How old is the battery? Has the bike been sitting for a while?",
    learn: "The starter relay needs only a small amount of current to click. But the starter motor needs 80–150+ amps to spin the engine. A weak battery can click the relay but can't deliver the high current the motor demands. Think of it like a faucet that drips but can't fill a bucket.",
    question: "How long has the bike been sitting?",
    options: [
      { label: "Rode it recently (within a week)", next: "single-click-recent" },
      { label: "Been sitting 2+ weeks to a few months", next: "single-click-sitting" },
      { label: "Stored all winter / 3+ months", next: "single-click-stored" },
    ],
  },

  "single-click-recent": {
    id: "single-click-recent",
    type: "action",
    icon: "🔋",
    title: "Battery May Be Failing",
    instruction: "If the bike was running recently but now only clicks, the battery may be on its last legs. Try this: turn the key OFF, wait 30 seconds, then try again. Sometimes a brief rest lets the battery recover enough for one more attempt. Also check that the headlight isn't on (some bikes have always-on headlights that drain a weak battery).",
    learn: "A battery that was working fine yesterday can fail suddenly. Internal cell damage, a cracked plate, or a dead cell can cause instant failure. If the battery is more than 3 years old, sudden failure is common.",
    question: "After resting, does it crank?",
    options: [
      { label: "Yes — it started after resting!", next: "resolved-weak-battery-warning" },
      { label: "No — still just clicks", next: "try-jump-start" },
    ],
  },

  "resolved-weak-battery-warning": {
    id: "resolved-weak-battery-warning",
    type: "resolved",
    icon: "⚠️",
    title: "It Started — But Your Battery Is Weak",
    message: "The battery started the bike after resting, but this is a warning sign. A healthy battery should start the bike immediately without needing to rest.",
    tip: "Get the battery tested at an auto parts store (free at most). If it's more than 3 years old, replace it proactively before it leaves you stranded. Ride for at least 30 minutes to recharge. If it happens again tomorrow, the battery or charging system is failing.",
  },

  "single-click-sitting": {
    id: "single-click-sitting",
    type: "action",
    icon: "🔌",
    title: "Battery Discharged From Sitting",
    instruction: "Batteries self-discharge over time, and motorcycle batteries are small. Two weeks of sitting can drop a marginal battery below starting threshold. Try jump-starting with a portable jump pack or from a car battery (car engine OFF). If you have a battery charger, charge on the motorcycle/small battery setting (1–2 amps) for 4–8 hours.",
    learn: "Motorcycle batteries lose about 1% of charge per day just sitting. Alarm systems, clocks, and ECU standby power drain them faster. A battery that was at 80% when you parked it could be at 60% after three weeks — not enough to crank a cold engine.",
    question: "After charging or jumping, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-discharged" },
      { label: "No — still just clicks even after charging", next: "call-tech-starter-motor" },
    ],
  },

  "resolved-discharged": {
    id: "resolved-discharged",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Battery Was Discharged",
    message: "The battery had discharged from sitting and didn't have enough amperage to turn the starter motor.",
    tip: "If you don't ride regularly, connect a battery tender (trickle charger) when the bike is parked. They cost $25–40 and plug into a pigtail connector you wire to the battery permanently. This is the #1 maintenance item for motorcycles that sit between rides.",
  },

  "single-click-stored": {
    id: "single-click-stored",
    type: "action",
    icon: "❄️",
    title: "Battery Likely Dead From Storage",
    instruction: "A motorcycle battery stored for 3+ months without a tender is almost certainly dead or severely discharged. Try charging it with a smart charger that has a 'recovery' or 'desulfation' mode. If the charger shows an error or won't charge, the battery needs replacement.",
    learn: "When lead-acid batteries sit discharged, lead sulfate crystals form on the plates and harden over time (sulfation). After 3–6 months of sitting discharged, the sulfation becomes permanent and the battery can't be recovered. This is why battery tenders are so important for seasonal riders.",
    question: "Can the battery be recovered?",
    options: [
      { label: "Charger is working — charging now", next: "resolved-discharged" },
      { label: "Charger shows error / won't charge", next: "call-tech-battery" },
    ],
  },

  "try-jump-start": {
    id: "try-jump-start",
    type: "action",
    icon: "⚡",
    title: "Try Jump-Starting",
    instruction: "Use a portable jump pack (lithium jump starters work great for motorcycles) or jumper cables from a car battery. IMPORTANT: If jumping from a car, the car engine must be OFF — a running car's alternator can damage motorcycle electronics. Connect positive (+) to positive, negative (−) to a ground point on the frame (not the battery negative terminal). Try starting.",
    learn: "Jump-starting bypasses the weak battery by providing external amperage. If the bike starts with a jump but not on its own, the battery is the problem. If it still won't start even with a jump, the starter motor or solenoid may be faulty.",
    question: "Does it start with a jump?",
    options: [
      { label: "Yes — it starts with the jump!", next: "resolved-dead-battery" },
      { label: "No — still just clicks even with jump", next: "call-tech-starter-motor" },
    ],
  },

  "call-tech-starter-motor": {
    id: "call-tech-starter-motor",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — Starter Motor",
    message: "If the bike clicks but won't crank even with a known-good power source, the starter motor or solenoid has likely failed. The starter motor brushes may be worn, or the solenoid contacts may be burned.",
    script: "Hi, my [YEAR MAKE MODEL] clicks once when I press start but the engine doesn't turn over. I've tried jump-starting with a good battery — still just clicks. Battery connections are clean and tight. I suspect the starter motor or solenoid needs repair or replacement.",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 4: SLOW CRANK
     ═══════════════════════════════════════════════════ */
  "slow-crank": {
    id: "slow-crank",
    type: "action",
    icon: "🐌",
    title: "Starter Cranks Slowly — Sounds Weak",
    instruction: "The starter is turning the engine but too slowly to fire. This is almost always a weak battery. The engine needs a minimum cranking speed to generate enough spark and fuel pressure. Check: Is it cold outside? Cold weather thickens oil and reduces battery output simultaneously.",
    learn: "At 32°F (0°C), a battery delivers only about 65% of its rated cranking amps. At the same time, cold oil is thicker and harder to crank through. This double-whammy is why cold morning starts are the hardest on a motorcycle battery.",
    question: "What's the temperature?",
    options: [
      { label: "Cold — below 50°F / 10°C", next: "cold-start-tips" },
      { label: "Warm / normal temperature", next: "slow-crank-warm" },
    ],
  },

  "cold-start-tips": {
    id: "cold-start-tips",
    type: "action",
    icon: "❄️",
    title: "Cold Weather Starting Tips",
    instruction: "In cold weather, try these steps in order: (1) Turn the key ON and let the fuel pump prime (listen for the whine, about 2–3 seconds). (2) If your bike has a choke, pull it fully out. (3) Don't touch the throttle — let the ECU/carb handle the cold start mixture. (4) Press and hold the starter for no more than 5 seconds at a time, with 10-second rests between attempts. (5) If it fires briefly, keep trying — it may need a few attempts in cold weather.",
    learn: "Cold engines need a richer fuel mixture (more fuel, less air) to start. Carbureted bikes use a choke to restrict airflow. Fuel-injected bikes use a cold-start enrichment map in the ECU. Cranking too long overheats the starter motor and drains the battery faster.",
    question: "After following cold-start procedure, does it start?",
    options: [
      { label: "Yes — it started after a few tries!", next: "resolved-cold-start" },
      { label: "No — cranking is getting weaker", next: "try-jump-start" },
    ],
  },

  "resolved-cold-start": {
    id: "resolved-cold-start",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Cold Start",
    message: "The combination of cold weather, thicker oil, and reduced battery output made starting difficult. The bike started after proper cold-start procedure.",
    tip: "In cold weather: let the bike warm up for 1–2 minutes before riding. If cold starts are consistently difficult, consider a battery with higher CCA (Cold Cranking Amps) rating, or switch to a lighter-weight synthetic oil that flows better in cold temperatures.",
  },

  "slow-crank-warm": {
    id: "slow-crank-warm",
    type: "action",
    icon: "🔋",
    title: "Weak Battery in Warm Weather",
    instruction: "Slow cranking in warm weather means the battery is weak, dying, or the connections have resistance. Clean the terminals, check cable tightness, and try again. If it's still slow, the battery needs charging or replacement.",
    learn: "A healthy motorcycle battery should spin the starter briskly and confidently. If it sounds like it's struggling in warm weather, the battery has lost capacity. Lead-acid batteries degrade gradually — they don't just die one day, they get progressively weaker.",
    question: "After cleaning terminals, does it crank normally?",
    options: [
      { label: "Yes — cranks strong now, starts fine!", next: "resolved-corrosion" },
      { label: "No — still slow even with clean terminals", next: "try-jump-start" },
    ],
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 5: CRANKS BUT WON'T START
     ═══════════════════════════════════════════════════ */
  "cranks-no-start": {
    id: "cranks-no-start",
    type: "action",
    icon: "🔄",
    title: "Cranks Normally But Won't Fire",
    instruction: "The starter is spinning the engine at normal speed, but it won't catch and run. This means the battery and starter are fine — the problem is fuel, spark, or air. Let's start with fuel. What type of fuel system does your bike have?",
    learn: "An engine needs three things to run: fuel, spark, and compression. If it cranks normally, compression is likely fine (the starter wouldn't spin easily with zero compression). So we're looking at fuel delivery or ignition.",
    question: "What fuel system does your bike have?",
    options: [
      { label: "Fuel injection (most bikes 2005+)", next: "fi-fuel-check", icon: "💉" },
      { label: "Carburetor(s)", next: "carb-fuel-check", icon: "⚙️" },
      { label: "I'm not sure", next: "fi-fuel-check", icon: "❓" },
    ],
  },

  /* ─── Fuel Injection Path ─── */
  "fi-fuel-check": {
    id: "fi-fuel-check",
    type: "action",
    icon: "💉",
    title: "Fuel Injection — Check Fuel Delivery",
    instruction: "Turn the key to ON (don't press start yet). Listen carefully — you should hear the fuel pump whine/buzz for about 2–3 seconds as it pressurizes the fuel rail. It's a high-pitched whirring sound, usually from under the tank or near the rear of the bike.",
    learn: "Fuel-injected bikes have an electric fuel pump that pressurizes the fuel system when you turn the key on. If the pump doesn't run, the injectors can't spray fuel. The pump primes for a few seconds, then shuts off until you crank the engine.",
    question: "Do you hear the fuel pump prime?",
    options: [
      { label: "Yes — I hear the pump whine", next: "fi-check-spark" },
      { label: "No — silence when key turns on", next: "fi-no-pump" },
      { label: "I can't tell / too noisy", next: "fi-check-spark" },
    ],
  },

  "fi-no-pump": {
    id: "fi-no-pump",
    type: "action",
    icon: "⛽",
    title: "Fuel Pump Not Running",
    instruction: "Check the fuel pump fuse in the fuse box (consult your owner's manual for location — usually under the seat). Also check the fuel pump relay if accessible. Make sure the tank has fuel — the low fuel light may not work if the bike has been sitting.",
    learn: "The fuel pump is controlled by the ECU through a relay. A blown fuse, bad relay, or failed pump will prevent fuel delivery entirely. Also, some bikes have a tip-over sensor (bank angle sensor) that cuts the fuel pump if the bike falls over — it may need to be reset by cycling the key.",
    question: "What did you find?",
    options: [
      { label: "Blown fuse — replaced it, pump runs now", next: "resolved-fuel-fuse" },
      { label: "Fuse is good, still no pump sound", next: "fi-tip-over-sensor" },
      { label: "Tank was empty!", next: "resolved-empty-tank" },
    ],
  },

  "resolved-fuel-fuse": {
    id: "resolved-fuel-fuse",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Fuel Pump Fuse",
    message: "The fuel pump fuse was blown, preventing the pump from pressurizing the fuel system.",
    tip: "If the fuse blows again, the fuel pump may be drawing too much current (failing pump) or there's a short in the fuel pump wiring. Don't keep replacing fuses — get the pump tested.",
  },

  "resolved-empty-tank": {
    id: "resolved-empty-tank",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Out of Fuel",
    message: "The tank was empty. It happens to everyone at least once!",
    tip: "Motorcycle fuel gauges are notoriously inaccurate, especially on older bikes. Track your mileage and know your bike's range. Most bikes have a reserve — on carbureted bikes it's a petcock position, on fuel-injected bikes the low fuel light is your warning. When the light comes on, you typically have 20–40 miles remaining.",
  },

  "fi-tip-over-sensor": {
    id: "fi-tip-over-sensor",
    type: "action",
    icon: "📐",
    title: "Check the Tip-Over Sensor",
    instruction: "Most fuel-injected bikes have a tip-over sensor (bank angle sensor) that kills the fuel pump if the bike falls over. If the bike was dropped, knocked over, or even leaned too far on the kickstand, this sensor may have tripped. To reset: turn the key OFF, wait 10 seconds, make sure the bike is fully upright, then turn the key ON again. Listen for the fuel pump.",
    learn: "The tip-over sensor is a safety device that prevents fuel from pumping if the bike is on its side (fire risk). Some sensors are mercury switches, others are accelerometers. They can be overly sensitive, especially on bikes with soft suspension that lean a lot on the stand.",
    question: "After resetting with the bike upright, does the pump prime?",
    options: [
      { label: "Yes — pump runs now, bike starts!", next: "resolved-tip-over" },
      { label: "No — still no pump", next: "call-tech-fuel-pump" },
    ],
  },

  "resolved-tip-over": {
    id: "resolved-tip-over",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Tip-Over Sensor Tripped",
    message: "The tip-over sensor had been triggered, cutting the fuel pump as a safety measure.",
    tip: "If this happens frequently without the bike actually falling over, the sensor may be overly sensitive or mounted loosely. Check that the sensor is securely bolted in its bracket. Some aftermarket sensors are adjustable.",
  },

  "call-tech-fuel-pump": {
    id: "call-tech-fuel-pump",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — Fuel Pump",
    message: "The fuel pump isn't running despite a good fuse and reset tip-over sensor. The pump itself, the relay, or the wiring may have failed.",
    script: "Hi, my [YEAR MAKE MODEL] cranks but won't start. The fuel pump doesn't prime when I turn the key on — no whine sound. I've checked the fuse (good), reset the tip-over sensor, and confirmed there's fuel in the tank. I suspect the fuel pump or relay has failed.",
  },

  /* ─── Spark Check (FI bikes) ─── */
  "fi-check-spark": {
    id: "fi-check-spark",
    type: "action",
    icon: "⚡",
    title: "Check for Spark",
    instruction: "Remove one spark plug (use the correct spark plug socket — usually 16mm or 18mm for motorcycles). Reconnect the plug wire/coil to the plug. Hold the plug's metal body against the engine case (bare metal ground). Crank the engine and watch for a spark jumping across the electrode gap.",
    learn: "This tests the entire ignition chain: ECU signal → ignition coil → spark plug wire → plug. A strong blue spark means ignition is working. No spark or a weak orange spark points to an ignition problem. Always test with the plug grounded to the engine — an ungrounded coil can damage the ECU.",
    question: "Did you see a spark?",
    options: [
      { label: "Yes — strong blue spark", next: "fi-good-spark" },
      { label: "Weak / orange spark", next: "check-plugs-condition" },
      { label: "No spark at all", next: "no-spark-fi" },
    ],
  },

  "fi-good-spark": {
    id: "fi-good-spark",
    type: "action",
    icon: "✅",
    title: "Good Spark — Fuel Delivery Issue",
    instruction: "You have spark and the fuel pump runs, but the engine won't fire. The injectors may be clogged (common after long storage with old fuel), or the fuel may be stale. How old is the fuel in the tank?",
    learn: "Fuel-injected bikes are less prone to fuel issues than carbureted bikes, but stale fuel can still clog injector nozzles. The injector spray pattern becomes disrupted, delivering fuel in streams instead of a fine mist — making combustion difficult.",
    question: "How old is the fuel?",
    options: [
      { label: "Fresh — filled recently", next: "call-tech-injector" },
      { label: "Been sitting for months", next: "stale-fuel-fi" },
    ],
  },

  "stale-fuel-fi": {
    id: "stale-fuel-fi",
    type: "action",
    icon: "⛽",
    title: "Drain Stale Fuel",
    instruction: "Drain the old fuel from the tank (siphon or disconnect the fuel line at the tank). Fill with fresh premium fuel. Crank for 10–15 seconds (in 5-second bursts with rests) to flush the old fuel through the injectors. If it fires briefly, keep trying — it may take several attempts to purge the old fuel.",
    learn: "Stale fuel in a fuel-injected system is less catastrophic than in carburetors (no tiny jets to clog), but it can still gum up injector tips and fuel filters. Fresh fuel is always the first step after storage.",
    question: "After fresh fuel, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-stale-fuel" },
      { label: "No — still won't fire", next: "call-tech-injector" },
    ],
  },

  "resolved-stale-fuel": {
    id: "resolved-stale-fuel",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Stale Fuel",
    message: "Old fuel was preventing proper combustion. Fresh fuel restored operation.",
    tip: "Before storing your bike, add fuel stabilizer to a full tank and run the engine for 5 minutes to circulate it through the entire fuel system. This prevents varnish and gum formation during storage.",
  },

  "call-tech-injector": {
    id: "call-tech-injector",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — Fuel Injection",
    message: "You have spark and the fuel pump runs, but the engine won't fire. The injectors may be clogged, the fuel pressure regulator may be faulty, or there could be a sensor issue (crank position sensor, cam sensor) preventing the ECU from firing the injectors.",
    script: "Hi, my [YEAR MAKE MODEL] cranks but won't start. I have confirmed spark and the fuel pump primes. Fuel is [fresh/old]. I suspect clogged injectors or a sensor issue. Are there any error codes stored? I'd like the fuel injection system diagnosed.",
  },

  "no-spark-fi": {
    id: "no-spark-fi",
    type: "action",
    icon: "❌",
    title: "No Spark — Check the Basics",
    instruction: "No spark on a fuel-injected bike could be: (1) A failed crank position sensor (the ECU doesn't know the engine is turning). (2) A failed ignition coil. (3) A wiring issue. (4) A failed ECU (rare). Check if the dashboard shows any warning lights or error codes. Some bikes flash a code on the check engine light.",
    learn: "The ECU uses the crank position sensor to time the spark. If this sensor fails, the ECU doesn't fire the coils at all — resulting in zero spark on all cylinders. This is different from a single bad coil, which would affect only one cylinder.",
    question: "Is the check engine light on or flashing?",
    options: [
      { label: "Yes — check engine light is on/flashing", next: "call-tech-ecu" },
      { label: "No warning lights", next: "check-plugs-condition" },
    ],
  },

  "call-tech-ecu": {
    id: "call-tech-ecu",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — ECU / Sensor Error",
    message: "A check engine light with no spark indicates a sensor or ECU fault. The shop can read the diagnostic codes to pinpoint the exact sensor that's failed.",
    script: "Hi, my [YEAR MAKE MODEL] cranks but won't start and has no spark. The check engine light is [on/flashing]. I'd like the diagnostic codes read to identify the failed sensor. The bike has [MILES] miles.",
  },

  "check-plugs-condition": {
    id: "check-plugs-condition",
    type: "action",
    icon: "🔌",
    title: "Check Spark Plug Condition",
    instruction: "Examine the spark plug(s) you removed. What do they look like?",
    learn: "Spark plug condition tells you a lot about what's happening inside the engine. The color, deposits, and wear pattern are diagnostic clues that even professional mechanics rely on.",
    question: "What do the plugs look like?",
    options: [
      { label: "Black and sooty / wet with fuel", next: "fouled-plugs" },
      { label: "Light tan/brown — look normal", next: "replace-plugs-anyway" },
      { label: "Electrode worn down / gap too wide", next: "replace-plugs-anyway" },
      { label: "White or blistered", next: "overheated-plugs" },
    ],
  },

  "fouled-plugs": {
    id: "fouled-plugs",
    type: "action",
    icon: "🖤",
    title: "Fouled Spark Plugs",
    instruction: "Clean the plugs with a wire brush or replace them. If they're wet with fuel, the engine is flooded. Let the plugs dry for 10 minutes, reinstall, and try starting with the throttle held wide open (this leans out the mixture and helps clear a flood). Crank for 5 seconds, release, wait 10 seconds, repeat.",
    learn: "Fouled plugs on a motorcycle often happen from short rides that don't let the engine reach full operating temperature, excessive idling, or a rich-running condition. Flooding happens from repeated failed start attempts — each crank squirts more fuel into the cylinder.",
    question: "After cleaning/replacing plugs, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-fouled-plugs" },
      { label: "No — still won't fire", next: "call-tech-ignition" },
    ],
  },

  "resolved-fouled-plugs": {
    id: "resolved-fouled-plugs",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Fouled Spark Plugs",
    message: "The spark plugs were fouled with carbon or fuel, preventing a strong enough spark for ignition.",
    tip: "Replace spark plugs every 8,000–12,000 miles (check your owner's manual). If plugs foul frequently, investigate the cause — it could be a rich-running condition from a dirty air filter, faulty O2 sensor, or carb jetting issue.",
  },

  "replace-plugs-anyway": {
    id: "replace-plugs-anyway",
    type: "action",
    icon: "🔧",
    title: "Replace Spark Plugs",
    instruction: "Even if the plugs look okay, try replacing them with new ones of the correct type and gap. Motorcycle spark plugs are inexpensive ($3–8 each). Use the exact type specified in your owner's manual. Gap them to spec using a gap tool.",
    question: "After new plugs, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-new-plugs" },
      { label: "No — still won't fire", next: "call-tech-ignition" },
    ],
  },

  "resolved-new-plugs": {
    id: "resolved-new-plugs",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — New Spark Plugs",
    message: "The old spark plugs were too worn to produce reliable ignition.",
    tip: "Keep a set of spare plugs in your motorcycle toolkit. They're the most common wear item and the easiest to replace on the road.",
  },

  "overheated-plugs": {
    id: "overheated-plugs",
    type: "call-tech",
    icon: "📞",
    title: "Overheated Plugs — Possible Engine Issue",
    message: "White or blistered plugs indicate the engine has been running extremely hot (lean condition). This could be caused by an air leak in the intake, a cooling system issue, or incorrect fuel mapping. Don't continue running the engine until the cause is found — overheating can cause serious engine damage.",
    script: "Hi, my [YEAR MAKE MODEL] won't start and the spark plugs are white/blistered, indicating overheating. I'm concerned about a lean condition or cooling issue. I'd like the fuel system and cooling system inspected before I run it again.",
  },

  "call-tech-ignition": {
    id: "call-tech-ignition",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — Ignition System",
    message: "With new plugs and confirmed fuel delivery, the ignition coils, plug wires, or crank position sensor may be faulty. These require professional testing.",
    script: "Hi, my [YEAR MAKE MODEL] cranks but won't start. I've replaced the spark plugs, confirmed the fuel pump runs, and checked for spark — [weak/no spark]. I'd like the ignition system diagnosed — coils, crank sensor, and wiring.",
  },

  /* ─── Carburetor Path ─── */
  "carb-fuel-check": {
    id: "carb-fuel-check",
    type: "action",
    icon: "⚙️",
    title: "Carbureted Bike — Check Fuel Delivery",
    instruction: "First, check the petcock (fuel valve). It's usually on the left side of the tank with positions: ON, OFF, RES (reserve), and sometimes PRI (prime). Turn it to ON (or RES if the tank is low). If your bike has a vacuum-operated petcock, turn it to PRI to force fuel flow. Also, is the choke ON? Pull the choke lever out for cold starts.",
    learn: "The petcock controls fuel flow from the tank to the carburetor. Vacuum-operated petcocks only flow fuel when the engine is running (creating vacuum). The PRI (prime) position bypasses the vacuum and lets fuel flow by gravity — useful for filling empty carb bowls after storage.",
    question: "With the petcock on and choke pulled, does it start?",
    options: [
      { label: "Yes — petcock was off or choke wasn't on!", next: "resolved-petcock" },
      { label: "No — still won't fire", next: "carb-bowl-check" },
    ],
  },

  "resolved-petcock": {
    id: "resolved-petcock",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Petcock / Choke",
    message: "The fuel petcock was in the wrong position or the choke wasn't engaged for a cold start.",
    tip: "Make the petcock part of your start-up routine. After parking, some riders turn the petcock to OFF to prevent fuel from slowly leaking past worn carburetor float needles (which can flood the engine or leak fuel onto the ground). Remember to turn it back to ON before starting!",
  },

  "carb-bowl-check": {
    id: "carb-bowl-check",
    type: "action",
    icon: "⛽",
    title: "Check if Fuel Is Reaching the Carbs",
    instruction: "With the petcock on ON or PRI, look for a drain screw at the bottom of each carburetor bowl. Place a rag underneath and loosen the screw slightly. Fuel should drip out. If no fuel comes out, the carb bowls are empty — fuel isn't flowing from the tank.",
    learn: "Carburetor bowls hold a small reserve of fuel. If they're empty, fuel isn't reaching the carbs — either the petcock is clogged, the fuel line is kinked, or the fuel filter is blocked. If the bowls have fuel but the bike won't start, the jets inside the carb are likely clogged.",
    question: "Does fuel come out of the bowl drain?",
    options: [
      { label: "Yes — fuel flows from the bowl", next: "carb-jets-clogged" },
      { label: "No — bowls are empty, no fuel flow", next: "carb-no-fuel-flow" },
    ],
  },

  "carb-no-fuel-flow": {
    id: "carb-no-fuel-flow",
    type: "action",
    icon: "🚫",
    title: "No Fuel Reaching Carburetors",
    instruction: "Check the fuel line from the petcock to the carbs. Is it kinked, cracked, or disconnected? Try disconnecting the fuel line at the carb end and turning the petcock to PRI — fuel should flow freely into a container. If no fuel comes out, the petcock or in-tank fuel filter is clogged.",
    learn: "Fuel lines on older bikes harden and crack with age. The in-tank filter screen on the petcock can get clogged with rust or debris, especially on bikes with steel tanks that develop internal rust.",
    question: "Does fuel flow from the disconnected line?",
    options: [
      { label: "Yes — fuel flows from the line", next: "carb-float-stuck" },
      { label: "No — nothing comes out", next: "call-tech-petcock" },
    ],
  },

  "carb-float-stuck": {
    id: "carb-float-stuck",
    type: "action",
    icon: "🔧",
    title: "Carburetor Float May Be Stuck",
    instruction: "Fuel flows to the carb but won't enter the bowl. The float needle valve is likely stuck closed. Try tapping the side of the carburetor bowl gently with the handle of a screwdriver while the petcock is on PRI. This can free a stuck float.",
    learn: "The float valve controls fuel level in the carburetor bowl, like a toilet fill valve. If the float or needle gets stuck (from varnish, corrosion, or debris), fuel can't enter the bowl. Gentle tapping can sometimes free it temporarily.",
    question: "After tapping, does fuel enter the bowl?",
    options: [
      { label: "Yes — fuel flowing now, bike starts!", next: "resolved-stuck-float" },
      { label: "No — still stuck", next: "call-tech-carb-rebuild" },
    ],
  },

  "resolved-stuck-float": {
    id: "resolved-stuck-float",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Stuck Float Valve",
    message: "The carburetor float needle was stuck closed, preventing fuel from entering the bowl.",
    tip: "This is a temporary fix — the float will likely stick again. The carburetor needs to be removed and cleaned, with the float needle and seat inspected. Add fuel stabilizer to prevent varnish buildup that causes sticking.",
  },

  "call-tech-petcock": {
    id: "call-tech-petcock",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — Fuel Delivery",
    message: "No fuel is flowing from the petcock. The petcock valve, in-tank filter, or vacuum line (on vacuum petcocks) may be clogged or failed.",
    script: "Hi, my [YEAR MAKE MODEL] won't start — no fuel is reaching the carburetors. The petcock doesn't flow fuel even in the PRI position. I suspect the petcock or in-tank filter is clogged. It's a carbureted bike with [MILES] miles.",
  },

  "carb-jets-clogged": {
    id: "carb-jets-clogged",
    type: "action",
    icon: "⚙️",
    title: "Carburetors Likely Need Cleaning",
    instruction: "Fuel is in the bowls but the engine won't fire — the internal jets are almost certainly clogged with varnish from old fuel. How long has the bike been sitting?",
    learn: "Carburetor jets are tiny brass passages (some as small as 0.5mm). Even a thin film of varnish from stale fuel can block them completely. This is the #1 reason carbureted motorcycles won't start after winter storage. The pilot/slow jet clogs first because it's the smallest.",
    question: "How long has the bike been sitting with fuel in it?",
    options: [
      { label: "A few weeks — maybe the fuel is just old", next: "try-starting-fluid-carb" },
      { label: "Months / all winter", next: "call-tech-carb-rebuild" },
    ],
  },

  "try-starting-fluid-carb": {
    id: "try-starting-fluid-carb",
    type: "action",
    icon: "💨",
    title: "Try Starting Fluid",
    instruction: "Spray a 1-second burst of starting fluid (ether) or carburetor cleaner into each carburetor intake (remove the air filter to access). Immediately try to start. If it fires briefly and dies, the carbs need cleaning. If it doesn't fire at all, check spark.",
    learn: "Starting fluid is extremely volatile and ignites easily. If the engine fires on starting fluid but not on its own fuel, it confirms the carburetors aren't delivering fuel — the jets are clogged. This is a definitive diagnostic test.",
    question: "What happened?",
    options: [
      { label: "Fired briefly then died — confirms carb issue", next: "call-tech-carb-rebuild" },
      { label: "Didn't fire at all", next: "fi-check-spark" },
    ],
  },

  "call-tech-carb-rebuild": {
    id: "call-tech-carb-rebuild",
    type: "call-tech",
    icon: "📞",
    title: "Carburetors Need Cleaning / Rebuild",
    message: "The carburetor jets are clogged with varnish from old fuel. The carbs need to be removed, disassembled, soaked in carburetor cleaner, and all jets blown out with compressed air. On multi-cylinder bikes, this also includes synchronizing the carbs after reassembly.",
    script: "Hi, my [YEAR MAKE MODEL] has been sitting for [TIME] and won't start. Fuel reaches the carb bowls but the engine won't fire (confirmed with starting fluid test). The carbs need cleaning. It's a [NUMBER]-cylinder bike with [NUMBER] carburetors. Can you give me an estimate for a carb clean and sync?",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 6: STARTS THEN DIES
     ═══════════════════════════════════════════════════ */
  "starts-then-dies": {
    id: "starts-then-dies",
    type: "action",
    icon: "💨",
    title: "Engine Fires Briefly Then Dies",
    instruction: "The engine catches and runs for 1–5 seconds, proving spark and compression work. The problem is sustained fuel delivery. On carbureted bikes: Is the choke on? Is the petcock on ON (not OFF or RES with an empty main tank)? On fuel-injected bikes: Is the fuel fresh?",
    learn: "An engine that fires and dies is running on the small amount of fuel in the carburetor bowls or fuel rail, but can't sustain flow. This is a fuel delivery problem, not an ignition problem.",
    question: "What type of fuel system?",
    options: [
      { label: "Carburetor — choke is on, petcock is on", next: "starts-dies-carb" },
      { label: "Fuel injection", next: "starts-dies-fi" },
    ],
  },

  "starts-dies-carb": {
    id: "starts-dies-carb",
    type: "action",
    icon: "⚙️",
    title: "Starts & Dies — Carbureted",
    instruction: "Try this: hold the throttle open slightly (about 1/4 turn) while starting. If it stays running with throttle but dies at idle, the pilot/slow jet is clogged. Also try turning the petcock to PRI to force fuel flow — if it runs on PRI but not ON, the vacuum petcock diaphragm is torn.",
    learn: "At idle, the engine runs on the pilot jet circuit (the smallest passages in the carb). These clog first from old fuel. The main jet only feeds fuel at higher RPMs. A bike that runs with throttle but dies at idle has a classic pilot jet clog.",
    question: "What happens with throttle?",
    options: [
      { label: "Runs with throttle, dies at idle — pilot jet", next: "call-tech-carb-rebuild" },
      { label: "Runs on PRI but not ON — vacuum petcock", next: "call-tech-petcock" },
      { label: "Dies regardless", next: "call-tech-carb-rebuild" },
    ],
  },

  "starts-dies-fi": {
    id: "starts-dies-fi",
    type: "action",
    icon: "💉",
    title: "Starts & Dies — Fuel Injected",
    instruction: "Check: (1) Is the fuel cap vent clear? Loosen the cap and try — if it runs with a loose cap, the vent is blocked. (2) Is the fuel filter clogged? (Usually inside the tank on FI bikes.) (3) Check for vacuum leaks — listen for hissing around the throttle bodies and intake boots.",
    learn: "A fuel-injected bike that starts and dies often has a fuel pressure issue (weak pump, clogged filter) or an air leak that disrupts the fuel-air ratio. The ECU can compensate for small issues but not large ones.",
    question: "Did loosening the fuel cap help?",
    options: [
      { label: "Yes — runs with loose cap!", next: "resolved-fuel-cap-vent" },
      { label: "No — still dies", next: "call-tech-fi-diagnosis" },
    ],
  },

  "resolved-fuel-cap-vent": {
    id: "resolved-fuel-cap-vent",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Fuel Cap Vent Blocked",
    message: "The fuel cap vent was blocked, creating a vacuum in the tank that stopped fuel flow.",
    tip: "Clean the vent hole in the fuel cap with a thin wire or compressed air. If the cap has a charcoal canister vent system, the canister may be saturated and need replacement.",
  },

  "call-tech-fi-diagnosis": {
    id: "call-tech-fi-diagnosis",
    type: "call-tech",
    icon: "📞",
    title: "Call a Motorcycle Shop — Fuel Injection Diagnosis",
    message: "The bike starts but can't sustain running. This could be a fuel pressure issue, vacuum leak, or sensor problem. Professional diagnosis with a fuel pressure gauge and diagnostic scanner is needed.",
    script: "Hi, my [YEAR MAKE MODEL] starts and runs for a few seconds then dies. Fuel cap vent is clear. It's fuel injected with [MILES] miles. I suspect a fuel delivery or sensor issue. Can you run diagnostics?",
  },
};
