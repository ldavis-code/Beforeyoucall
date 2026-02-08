/*
 * Automotive Troubleshooting Wizard — "Car Won't Start" Decision Tree
 * "Before You Call" — If It's Smokin', It's Broken
 * Safety-first diagnostic flow for no-start conditions
 */

export type AutoNodeType = "safety-gate" | "question" | "action" | "stop" | "resolved" | "call-tech";
export type AutoSeverity = "critical" | "warning";

export interface AutoWizardOption {
  label: string;
  next: string;
  icon?: string;
}

export interface AutoWizardNode {
  id: string;
  type: AutoNodeType;
  icon: string;
  title: string;
  subtitle?: string;
  question?: string;
  checks?: string[];
  yesResult?: string;
  noResult?: string;
  message?: string;
  details?: string[];
  severity?: AutoSeverity;
  next?: string;
  instruction?: string;
  learn?: string;
  options?: AutoWizardOption[];
  tip?: string;
  script?: string;
}

export const AUTO_WIZARD_TREE: Record<string, AutoWizardNode> = {
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
      "👃 Smell — Gasoline, burning rubber, hot metal, or rotten eggs (sulfur)",
      "👀 See — Smoke from under the hood, leaking fluids, or sparks",
      "👂 Hear — Hissing, grinding, or loud popping when turning the key",
      "✋ Feel — Excessive heat from the hood (engine may have overheated)",
      "💧 Fluids — Puddles under the car (green = coolant, dark = oil, pink = transmission)",
    ],
    yesResult: "stop-emergency",
    noResult: "what-happens",
  },

  "stop-emergency": {
    id: "stop-emergency",
    type: "stop",
    icon: "🛑",
    title: "Stop. Do Not Proceed.",
    message: "If it's smokin', it's broken.",
    details: [
      "🔑 Turn the key OFF. Remove it from the ignition.",
      "🚗 Do NOT try to start it again.",
      "👃👀👂✋ Use your senses to pinpoint the problem:",
      "• Gasoline smell — Could be a fuel leak. Do not start the car. Move away.",
      "• Smoke from under hood — Could be overheating, oil leak on exhaust, or electrical fire.",
      "• Rotten egg smell — Catalytic converter issue or battery venting hydrogen sulfide.",
      "• Hissing — Pressurized fluid leak (coolant, vacuum line).",
      "• Fluid puddles — Note the color and location for the mechanic.",
      "📝 Write down what you noticed. This saves the mechanic diagnostic time.",
      "📞 Call a mechanic or roadside assistance. If there's active fire — call 911.",
    ],
    severity: "critical",
  },

  /* ═══════════════════════════════════════════════════
     WHAT HAPPENS WHEN YOU TURN THE KEY?
     ═══════════════════════════════════════════════════ */
  "what-happens": {
    id: "what-happens",
    type: "question",
    icon: "🔑",
    title: "What Happens When You Turn the Key?",
    subtitle: "This is the single most important diagnostic clue.",
    options: [
      { label: "Nothing at all — completely dead", next: "dead-nothing", icon: "💀" },
      { label: "Clicking sound (single click)", next: "single-click", icon: "🔊" },
      { label: "Rapid clicking (machine gun)", next: "rapid-click", icon: "⚡" },
      { label: "Engine cranks but won't fire", next: "cranks-no-start", icon: "🔄" },
      { label: "Engine starts then immediately dies", next: "starts-then-dies", icon: "💨" },
      { label: "Grinding or whining noise", next: "grinding-noise", icon: "⚙️" },
    ],
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 1: COMPLETELY DEAD
     ═══════════════════════════════════════════════════ */
  "dead-nothing": {
    id: "dead-nothing",
    type: "action",
    icon: "💀",
    title: "Completely Dead — No Lights, No Sound",
    instruction: "Turn the headlights on (or try to). Check if the dashboard lights up at all when you turn the key to the ON position (don't try to start — just turn to where the warning lights should appear).",
    learn: "A completely dead car almost always points to a battery or connection issue. The battery provides ALL electrical power when the engine isn't running.",
    question: "Do the dashboard lights or headlights come on at all?",
    options: [
      { label: "No — nothing lights up", next: "dead-check-terminals" },
      { label: "Dim/flickering lights", next: "rapid-click" },
      { label: "Lights are bright and normal", next: "dead-lights-work" },
    ],
  },

  "dead-check-terminals": {
    id: "dead-check-terminals",
    type: "action",
    icon: "🔋",
    title: "Check Battery Terminals",
    instruction: "Pop the hood. Look at the battery terminals (the metal posts on top of the battery with cables attached). Look for white, green, or blue crusty buildup. Check if the cables feel loose — can you wiggle them by hand?",
    learn: "Corrosion acts like an insulator, blocking electricity from flowing. A loose terminal can completely kill all power even with a fully charged battery.",
    question: "What do the terminals look like?",
    options: [
      { label: "Heavy corrosion (white/green crust)", next: "fix-corrosion" },
      { label: "Cable is loose — I can wiggle it", next: "fix-loose-terminal" },
      { label: "Terminals look clean and tight", next: "dead-battery-age" },
    ],
  },

  "fix-corrosion": {
    id: "fix-corrosion",
    type: "action",
    icon: "🧹",
    title: "Clean the Corrosion",
    instruction: "Mix baking soda and water into a paste. Apply it to the corroded terminals with an old toothbrush. Scrub until the metal is visible. Dry thoroughly. Reconnect cables tightly — negative (black/−) last.",
    learn: "Battery acid reacts with the lead terminals and copper cables, creating lead sulfate (white) or copper sulfate (green/blue). This buildup is resistive and can prevent enough current from reaching the starter.",
    question: "After cleaning, does the car start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-corrosion" },
      { label: "No — still dead", next: "dead-battery-age" },
    ],
  },

  "resolved-corrosion": {
    id: "resolved-corrosion",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Corroded Terminals",
    message: "Corrosion was blocking the electrical connection. Your battery and starter are fine.",
    tip: "Apply a thin coat of petroleum jelly or battery terminal protector spray to prevent future corrosion. If corrosion keeps coming back quickly, your battery may be overcharging (alternator issue) or the battery is venting acid (needs replacement).",
  },

  "fix-loose-terminal": {
    id: "fix-loose-terminal",
    type: "action",
    icon: "🔧",
    title: "Tighten the Terminal",
    instruction: "Use a 10mm wrench (most common size) to tighten the terminal clamp bolt. The cable should not move at all when you try to twist it by hand. Tighten snug — don't overtighten or you can crack the battery post.",
    learn: "A loose terminal creates an intermittent connection. The car might work fine one day and be completely dead the next, especially after hitting a bump.",
    question: "After tightening, does the car start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-loose-terminal" },
      { label: "No — still dead", next: "dead-battery-age" },
    ],
  },

  "resolved-loose-terminal": {
    id: "resolved-loose-terminal",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Loose Battery Terminal",
    message: "The cable wasn't making solid contact with the battery post.",
    tip: "Check your terminals every oil change. If the clamp is worn and won't stay tight, replace it — terminal clamps are inexpensive at any auto parts store.",
  },

  "dead-battery-age": {
    id: "dead-battery-age",
    type: "action",
    icon: "📅",
    title: "How Old Is Your Battery?",
    instruction: "Look for a date sticker on top of the battery. It usually shows month/year of manufacture or installation. Most batteries last 3–5 years.",
    learn: "Car batteries degrade over time even with perfect maintenance. Cold weather is especially hard on older batteries — a battery that worked fine in summer can fail on the first cold morning.",
    question: "How old is the battery?",
    options: [
      { label: "Less than 3 years old", next: "dead-jump-start" },
      { label: "3–5 years old", next: "dead-jump-start" },
      { label: "Over 5 years or unknown", next: "dead-old-battery" },
    ],
  },

  "dead-old-battery": {
    id: "dead-old-battery",
    type: "action",
    icon: "🪫",
    title: "Battery Is Likely Dead",
    instruction: "A battery over 5 years old that won't hold a charge is at the end of its life. You can try a jump start to get to a parts store, but plan on replacing it.",
    question: "Do you have jumper cables or a jump pack?",
    options: [
      { label: "Yes — I can try a jump", next: "dead-jump-start" },
      { label: "No — I need help", next: "call-tech-battery" },
    ],
  },

  "dead-jump-start": {
    id: "dead-jump-start",
    type: "action",
    icon: "⚡",
    title: "Try a Jump Start",
    instruction: "Connect jumper cables in this order: (1) RED to dead battery positive (+), (2) RED to good battery positive (+), (3) BLACK to good battery negative (−), (4) BLACK to unpainted metal on dead car's engine block (NOT the dead battery). Let the good car run for 2–3 minutes, then try starting the dead car.",
    learn: "Connecting to the engine block instead of the dead battery's negative terminal prevents sparks near the battery, which can vent hydrogen gas.",
    question: "What happened?",
    options: [
      { label: "It started!", next: "jump-started-check" },
      { label: "Still nothing — completely dead", next: "call-tech-battery" },
      { label: "It cranks but won't fire", next: "cranks-no-start" },
    ],
  },

  "jump-started-check": {
    id: "jump-started-check",
    type: "action",
    icon: "🔋",
    title: "It Started — But Why Was It Dead?",
    instruction: "Let the engine run for at least 15–20 minutes to recharge the battery. Drive to an auto parts store — most will test your battery and alternator for free.",
    learn: "A jump start gets you going, but doesn't tell you WHY the battery died. It could be: the battery is old, the alternator isn't charging, or something was left on draining it.",
    question: "What caused the dead battery?",
    options: [
      { label: "I left lights/accessories on", next: "resolved-left-on" },
      { label: "It just died on its own", next: "resolved-battery-test" },
      { label: "This keeps happening", next: "recurring-dead" },
    ],
  },

  "resolved-left-on": {
    id: "resolved-left-on",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Accessory Left On",
    message: "Your battery was drained by something left on overnight. The battery itself is probably fine.",
    tip: "If your car doesn't have automatic headlight shutoff, make it a habit to check lights before locking up. Interior lights and phone chargers can also drain a battery overnight.",
  },

  "resolved-battery-test": {
    id: "resolved-battery-test",
    type: "resolved",
    icon: "✅",
    title: "Get the Battery Tested",
    message: "Drive to an auto parts store for a free battery and charging system test. This will tell you if the battery needs replacing or if the alternator is failing.",
    tip: "Most auto parts stores (AutoZone, O'Reilly, Advance) will test your battery and alternator for free while you wait. They can also install a new battery in the parking lot if needed.",
  },

  "recurring-dead": {
    id: "recurring-dead",
    type: "call-tech",
    icon: "📞",
    title: "Recurring Dead Battery — Call a Mechanic",
    message: "A battery that keeps dying usually means a parasitic draw (something draining it when the car is off) or a failing alternator. This requires electrical diagnosis.",
    script: "Hi, my car battery keeps dying. I've jump-started it [NUMBER] times in the past [TIMEFRAME]. The battery is [AGE] years old. No lights are being left on. I'd like the charging system and parasitic draw tested.",
  },

  "call-tech-battery": {
    id: "call-tech-battery",
    type: "call-tech",
    icon: "📞",
    title: "Call for Help",
    message: "You need a jump start or tow. Most roadside assistance services (AAA, insurance roadside, etc.) can jump-start or replace your battery on the spot.",
    script: "Hi, my car won't start — completely dead, no lights or dashboard. The battery terminals look [clean/corroded]. The battery is [AGE] years old. I'm located at [LOCATION]. I need a jump start or battery replacement.",
  },

  "dead-lights-work": {
    id: "dead-lights-work",
    type: "action",
    icon: "💡",
    title: "Lights Work But Nothing Happens",
    instruction: "If your dashboard lights up normally but turning the key to START produces absolutely nothing — no click, no crank, no sound — the issue is likely in the starting circuit, not the battery.",
    learn: "The battery has enough power for lights but the signal isn't reaching the starter motor. This could be the ignition switch, neutral safety switch, starter relay, or wiring.",
    question: "Is your car an automatic or manual transmission?",
    options: [
      { label: "Automatic", next: "auto-neutral-safety" },
      { label: "Manual / Stick shift", next: "manual-clutch-switch" },
    ],
  },

  "auto-neutral-safety": {
    id: "auto-neutral-safety",
    type: "action",
    icon: "🅿️",
    title: "Check the Neutral Safety Switch",
    instruction: "Make sure the gear selector is firmly in PARK. Try shifting to NEUTRAL and turning the key. Some cars won't start if the shifter isn't fully seated in Park.",
    learn: "The neutral safety switch prevents the car from starting in gear. If it's worn or misaligned, it may not detect that you're in Park, blocking the start signal.",
    question: "Did it start in Neutral?",
    options: [
      { label: "Yes — started in Neutral!", next: "resolved-neutral-safety" },
      { label: "No — still nothing", next: "check-starter-relay" },
    ],
  },

  "resolved-neutral-safety": {
    id: "resolved-neutral-safety",
    type: "resolved",
    icon: "✅",
    title: "Problem Found — Neutral Safety Switch",
    message: "Your car started in Neutral, which means the Park position sensor is worn or misaligned.",
    tip: "This is a temporary workaround. Have the neutral safety switch inspected and replaced — it's usually an inexpensive repair. Until then, try Neutral if Park doesn't work.",
  },

  "manual-clutch-switch": {
    id: "manual-clutch-switch",
    type: "action",
    icon: "🦶",
    title: "Check the Clutch Safety Switch",
    instruction: "Push the clutch pedal all the way to the floor — firmly. Try starting. Some clutch switches require the pedal to be fully depressed to complete the circuit.",
    learn: "Manual transmission cars have a clutch safety switch that prevents starting unless the clutch is fully pressed. This prevents the car from lurching forward in gear.",
    question: "Did it start with the clutch fully pressed?",
    options: [
      { label: "Yes — it started!", next: "resolved-clutch-switch" },
      { label: "No — still nothing", next: "check-starter-relay" },
    ],
  },

  "resolved-clutch-switch": {
    id: "resolved-clutch-switch",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Clutch Not Fully Engaged",
    message: "The clutch safety switch needs the pedal fully to the floor.",
    tip: "If you have to push extra hard or find a 'sweet spot' to get it to start, the clutch switch may be going bad. It's a simple, inexpensive replacement.",
  },

  "check-starter-relay": {
    id: "check-starter-relay",
    type: "action",
    icon: "🔌",
    title: "Check the Starter Relay / Fuse",
    instruction: "Open the fuse box (usually under the hood or under the dashboard — check your owner's manual). Look for the starter relay or starter fuse. Check if the fuse is blown (broken metal strip visible through the clear plastic).",
    learn: "The starter relay is the switch that sends high-amperage power from the battery to the starter motor. A blown fuse or failed relay will prevent any power from reaching the starter.",
    question: "What did you find?",
    options: [
      { label: "Found a blown fuse", next: "resolved-blown-fuse" },
      { label: "Fuses look fine / can't tell", next: "call-tech-no-crank" },
    ],
  },

  "resolved-blown-fuse": {
    id: "resolved-blown-fuse",
    type: "resolved",
    icon: "✅",
    title: "Blown Starter Fuse Found",
    message: "Replace the fuse with one of the same amperage rating (printed on the fuse). If the new fuse blows immediately, there's a short circuit — stop and call a mechanic.",
    tip: "Keep a set of spare fuses in your glove box. They cost a few dollars and can save you a tow. Never replace a fuse with a higher amperage — it can cause a fire.",
  },

  "call-tech-no-crank": {
    id: "call-tech-no-crank",
    type: "call-tech",
    icon: "📞",
    title: "Call a Mechanic",
    message: "Lights work, battery is good, but nothing happens when you turn the key. This is likely an ignition switch, starter relay, or starter motor issue.",
    script: "Hi, my car won't start. The battery is good — all lights and dashboard work normally. When I turn the key to start, nothing happens — no click, no crank, no sound. I've tried both Park and Neutral. Fuses look OK. The car is a [YEAR MAKE MODEL].",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 2: SINGLE CLICK
     ═══════════════════════════════════════════════════ */
  "single-click": {
    id: "single-click",
    type: "action",
    icon: "🔊",
    title: "Single Click — Starter Solenoid Engaging",
    instruction: "A single loud click usually means the starter solenoid is engaging but the starter motor can't turn. This is different from rapid clicking (which is a weak battery).",
    learn: "The solenoid is an electromagnetic switch on top of the starter. When it clicks, it's trying to push the starter gear into the flywheel and send power to the motor. One click = solenoid works, motor doesn't.",
    question: "Let's check the battery first. Are your headlights bright?",
    options: [
      { label: "Yes — headlights are bright", next: "single-click-starter" },
      { label: "No — headlights are dim", next: "rapid-click" },
      { label: "Headlights don't work at all", next: "dead-check-terminals" },
    ],
  },

  "single-click-starter": {
    id: "single-click-starter",
    type: "action",
    icon: "🔧",
    title: "The Starter Motor Is Likely the Problem",
    instruction: "Try this: have someone turn the key to START while you gently tap the starter motor with a wrench or small hammer. The starter is a cylinder-shaped motor bolted to the engine near the bottom — follow the thick red cable from the battery to find it.",
    learn: "Tapping the starter can temporarily free stuck brushes (the internal contacts that deliver electricity to the spinning part). If it starts after tapping, the starter is worn and needs replacement soon.",
    question: "What happened?",
    options: [
      { label: "It started after tapping!", next: "resolved-starter-tap" },
      { label: "Still just clicks", next: "call-tech-starter" },
      { label: "I can't reach the starter", next: "call-tech-starter" },
    ],
  },

  "resolved-starter-tap": {
    id: "resolved-starter-tap",
    type: "resolved",
    icon: "✅",
    title: "Starter Motor Is Failing",
    message: "Tapping freed the stuck brushes temporarily, but the starter is on its way out.",
    tip: "Drive directly to a mechanic or auto parts store. This trick works sometimes, but the starter will fail completely soon — usually at the worst possible time. Starter replacement is typically $200–$500 depending on the vehicle.",
  },

  "call-tech-starter": {
    id: "call-tech-starter",
    type: "call-tech",
    icon: "📞",
    title: "Call a Mechanic — Starter Failure",
    message: "A single click with a good battery is almost always a failed starter motor. This requires removal and replacement.",
    script: "Hi, my car won't start. I get a single loud click when I turn the key. Battery is good — headlights are bright, dashboard works. I've tried [tapping the starter / couldn't reach it]. The car is a [YEAR MAKE MODEL].",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 3: RAPID CLICKING
     ═══════════════════════════════════════════════════ */
  "rapid-click": {
    id: "rapid-click",
    type: "action",
    icon: "⚡",
    title: "Rapid Clicking — Weak Battery",
    instruction: "Rapid clicking (sounds like a machine gun or playing card in bicycle spokes) means the battery has some charge but not enough to turn the starter. The solenoid keeps engaging and disengaging rapidly.",
    learn: "The starter motor needs a huge burst of current — 100 to 300 amps. If the battery can only deliver a fraction of that, the solenoid clicks but the motor can't spin. Think of it like trying to push-start a car uphill — you have some energy but not enough.",
    question: "Do you have jumper cables or a jump pack?",
    options: [
      { label: "Yes — I can try a jump", next: "dead-jump-start" },
      { label: "No — I need help", next: "call-tech-battery" },
    ],
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 4: CRANKS BUT WON'T START
     ═══════════════════════════════════════════════════ */
  "cranks-no-start": {
    id: "cranks-no-start",
    type: "action",
    icon: "🔄",
    title: "Engine Cranks But Won't Fire",
    instruction: "The engine is spinning (you can hear the 'ruh-ruh-ruh' sound) but it won't catch and run. This means the battery and starter are fine — the problem is fuel, spark, or air.",
    learn: "An engine needs three things to run: fuel, spark, and air. If it cranks but won't fire, one of these three is missing. We'll check the most common causes first.",
    question: "How much fuel do you have?",
    options: [
      { label: "Gauge shows fuel / I recently filled up", next: "cranks-check-fuel-pump" },
      { label: "Gauge shows empty or near empty", next: "cranks-out-of-gas" },
      { label: "Fuel gauge isn't working / I'm not sure", next: "cranks-out-of-gas" },
    ],
  },

  "cranks-out-of-gas": {
    id: "cranks-out-of-gas",
    type: "action",
    icon: "⛽",
    title: "Could Be Out of Fuel",
    instruction: "Fuel gauges can be inaccurate, especially on older cars. If there's any doubt, add 1–2 gallons of gas and try again. After adding fuel, turn the key to ON (don't start) for 3 seconds, then OFF, then ON again — this cycles the fuel pump to prime the system.",
    learn: "Running a car completely dry can also introduce air into the fuel lines. Cycling the key primes the pump and pushes fuel through the system.",
    question: "After adding fuel, does it start?",
    options: [
      { label: "Yes — it was out of gas!", next: "resolved-out-of-gas" },
      { label: "No — still cranks but won't fire", next: "cranks-check-fuel-pump" },
    ],
  },

  "resolved-out-of-gas": {
    id: "resolved-out-of-gas",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Out of Fuel",
    message: "The tank was empty. Fuel gauges aren't always accurate, especially near the bottom.",
    tip: "Try not to run below 1/4 tank regularly. The fuel pump sits inside the tank and uses gasoline for cooling — running low can overheat and shorten its life. In cold weather, a near-empty tank can also develop condensation.",
  },

  "cranks-check-fuel-pump": {
    id: "cranks-check-fuel-pump",
    type: "action",
    icon: "🔊",
    title: "Listen for the Fuel Pump",
    instruction: "Turn the key to ON (don't start the engine — just to where the dashboard lights come on). Listen carefully near the rear of the car. You should hear a brief humming/whirring sound for 2–3 seconds — that's the fuel pump priming.",
    learn: "The electric fuel pump pressurizes the fuel system before you start the engine. If you don't hear it, the pump may have failed, the relay may be bad, or the fuse may be blown.",
    question: "Did you hear the fuel pump?",
    options: [
      { label: "Yes — I heard the hum", next: "cranks-check-spark" },
      { label: "No — silence", next: "cranks-fuel-pump-dead" },
      { label: "I can't tell / too noisy", next: "cranks-check-spark" },
    ],
  },

  "cranks-fuel-pump-dead": {
    id: "cranks-fuel-pump-dead",
    type: "action",
    icon: "⛽",
    title: "Fuel Pump May Be Dead",
    instruction: "Check the fuse box for the fuel pump fuse and relay. The fuse box diagram is on the lid or in your owner's manual. Look for a blown fuse.",
    learn: "A failed fuel pump is one of the most common causes of 'cranks but won't start.' The pump is inside the fuel tank on most modern cars and typically lasts 100,000–150,000 miles.",
    question: "What did you find?",
    options: [
      { label: "Found a blown fuel pump fuse", next: "resolved-fuel-fuse" },
      { label: "Fuses look OK", next: "call-tech-fuel-pump" },
    ],
  },

  "resolved-fuel-fuse": {
    id: "resolved-fuel-fuse",
    type: "resolved",
    icon: "✅",
    title: "Blown Fuel Pump Fuse",
    message: "Replace the fuse with the same amperage. If it blows again immediately, there's a short in the fuel pump circuit — do not keep replacing fuses.",
    tip: "A blown fuel pump fuse can sometimes indicate the pump is drawing too much current because it's failing. If the fuse blows again, the pump likely needs replacement.",
  },

  "call-tech-fuel-pump": {
    id: "call-tech-fuel-pump",
    type: "call-tech",
    icon: "📞",
    title: "Call a Mechanic — Fuel Delivery Issue",
    message: "No fuel pump sound with good fuses suggests a failed pump, bad relay, or wiring issue. This requires professional diagnosis.",
    script: "Hi, my car cranks but won't start. I can't hear the fuel pump priming when I turn the key to ON. I checked the fuel pump fuse and it looks OK. The car has [MILEAGE] miles. It's a [YEAR MAKE MODEL].",
  },

  "cranks-check-spark": {
    id: "cranks-check-spark",
    type: "action",
    icon: "⚡",
    title: "Check for Spark — Security Light",
    instruction: "Look at your dashboard when you turn the key to ON. Is there a security light (key icon, padlock, or car-with-key symbol) that stays on or flashes? This could indicate the anti-theft system is blocking the engine from starting.",
    learn: "Modern cars have immobilizer systems that prevent the engine from starting if the key's chip isn't recognized. A weak key fob battery, damaged key, or system glitch can trigger this.",
    question: "Is a security/immobilizer light on?",
    options: [
      { label: "Yes — security light is on/flashing", next: "security-system" },
      { label: "No — no security light", next: "cranks-cold-weather" },
    ],
  },

  "security-system": {
    id: "security-system",
    type: "action",
    icon: "🔐",
    title: "Anti-Theft System May Be Triggered",
    instruction: "Try these steps: (1) Lock and unlock the car with the key fob. (2) Wait 10 minutes with the key in ON position — some systems reset after a timeout. (3) Try your spare key if you have one. (4) Replace the key fob battery.",
    learn: "The immobilizer chip in your key sends a unique code to the car's computer. If the computer doesn't receive the right code, it blocks the fuel injectors or ignition system from operating.",
    question: "Did any of these work?",
    options: [
      { label: "Yes — it started!", next: "resolved-security" },
      { label: "No — still won't start", next: "call-tech-security" },
    ],
  },

  "resolved-security": {
    id: "resolved-security",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Anti-Theft Reset",
    message: "The immobilizer system was triggered and has been reset.",
    tip: "If this happens again, replace your key fob battery first. If the problem persists, you may need a new key programmed by a dealer or locksmith.",
  },

  "call-tech-security": {
    id: "call-tech-security",
    type: "call-tech",
    icon: "📞",
    title: "Call a Dealer or Locksmith",
    message: "The anti-theft system needs professional reset or a new key programmed to the vehicle.",
    script: "Hi, my car cranks but won't start and the security/immobilizer light is on. I've tried locking/unlocking with the fob and waiting 10 minutes. My spare key [also doesn't work / I don't have one]. It's a [YEAR MAKE MODEL].",
  },

  "cranks-cold-weather": {
    id: "cranks-cold-weather",
    type: "question",
    icon: "🌡️",
    title: "Is It Cold Outside?",
    subtitle: "Temperature affects multiple systems that can prevent starting.",
    options: [
      { label: "Yes — below freezing or very cold", next: "cranks-cold-tips" },
      { label: "No — normal temperature", next: "call-tech-cranks" },
    ],
  },

  "cranks-cold-tips": {
    id: "cranks-cold-tips",
    type: "action",
    icon: "❄️",
    title: "Cold Weather No-Start",
    instruction: "In extreme cold: (1) Turn the key to ON for 5 seconds without starting — this lets the fuel pump build pressure. (2) Turn off ALL accessories (heat, radio, lights). (3) Try starting for no more than 10 seconds. (4) Wait 30 seconds between attempts. (5) Try up to 3 times total.",
    learn: "Cold thickens oil, weakens batteries, and can cause fuel delivery issues. Diesel engines are especially affected. If your car has a block heater, plug it in for 2–3 hours before trying again.",
    question: "Did it start after cold-weather attempts?",
    options: [
      { label: "Yes — it finally caught!", next: "resolved-cold" },
      { label: "No — still won't fire", next: "call-tech-cranks" },
    ],
  },

  "resolved-cold": {
    id: "resolved-cold",
    type: "resolved",
    icon: "✅",
    title: "Cold Start Successful",
    message: "Extreme cold makes starting harder. Let the engine warm up for a few minutes before driving.",
    tip: "If cold starts are a recurring problem: have your battery tested (cold cranking amps drop with age), consider a block heater, and use the correct weight winter oil. A battery under 3 years old should handle cold starts fine.",
  },

  "call-tech-cranks": {
    id: "call-tech-cranks",
    type: "call-tech",
    icon: "📞",
    title: "Call a Mechanic — Cranks But Won't Start",
    message: "The engine turns over but won't fire. This could be a fuel, spark, or sensor issue that requires diagnostic equipment.",
    script: "Hi, my car cranks normally but won't start. The battery is strong. I [can/cannot] hear the fuel pump. No security light on the dashboard. It's [cold/normal temperature] outside. The car has [MILEAGE] miles. It's a [YEAR MAKE MODEL]. This started [suddenly / has been getting worse].",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 5: STARTS THEN DIES
     ═══════════════════════════════════════════════════ */
  "starts-then-dies": {
    id: "starts-then-dies",
    type: "action",
    icon: "💨",
    title: "Starts Then Immediately Dies",
    instruction: "The engine fires and runs for 1–3 seconds, then shuts off. Try this: turn the key to ON (don't start) for 3 seconds, then OFF, then ON for 3 seconds, then try starting. This double-primes the fuel system.",
    learn: "An engine that starts briefly proves the battery, starter, and spark are working. The problem is almost always fuel delivery or an idle control issue. The engine can't maintain combustion without sustained fuel flow.",
    question: "After double-priming, what happened?",
    options: [
      { label: "It stays running now!", next: "resolved-fuel-prime" },
      { label: "Still starts and dies", next: "starts-dies-throttle" },
    ],
  },

  "resolved-fuel-prime": {
    id: "resolved-fuel-prime",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Fuel System Needed Priming",
    message: "The fuel system had lost pressure. Double-cycling the key rebuilt it.",
    tip: "If this happens regularly, your fuel pump check valve may be leaking, allowing pressure to bleed off when the car sits. A mechanic can test fuel pressure to confirm.",
  },

  "starts-dies-throttle": {
    id: "starts-dies-throttle",
    type: "action",
    icon: "🦶",
    title: "Try Holding the Gas Pedal",
    instruction: "Press the gas pedal slightly (about 1/4 of the way down) while turning the key. If the engine stays running while you hold the pedal but dies when you let go, the idle control system has an issue.",
    learn: "The Idle Air Control (IAC) valve or electronic throttle body controls airflow at idle. If it's stuck or dirty, the engine can't maintain idle speed on its own.",
    question: "What happened?",
    options: [
      { label: "Runs with gas pedal, dies without", next: "resolved-idle-issue" },
      { label: "Still dies even with gas pedal", next: "call-tech-starts-dies" },
    ],
  },

  "resolved-idle-issue": {
    id: "resolved-idle-issue",
    type: "resolved",
    icon: "✅",
    title: "Idle Control Problem Found",
    message: "The engine can run but can't maintain idle on its own. The idle air control valve or throttle body is likely dirty or failing.",
    tip: "A throttle body cleaning is a common maintenance item and can often fix this. It's a spray-and-wipe job that many DIYers can handle. If cleaning doesn't help, the IAC valve may need replacement.",
  },

  "call-tech-starts-dies": {
    id: "call-tech-starts-dies",
    type: "call-tech",
    icon: "📞",
    title: "Call a Mechanic",
    message: "An engine that starts and immediately dies needs diagnostic scanning to check fuel pressure, sensors, and computer codes.",
    script: "Hi, my car starts for about [1-3] seconds then dies immediately. I've tried priming the fuel system by cycling the key. Holding the gas pedal [does/doesn't] keep it running. No warning lights before this started. It's a [YEAR MAKE MODEL] with [MILEAGE] miles.",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 6: GRINDING NOISE
     ═══════════════════════════════════════════════════ */
  "grinding-noise": {
    id: "grinding-noise",
    type: "action",
    icon: "⚙️",
    title: "Grinding or Whining Noise",
    instruction: "Stop trying to start the car immediately. A grinding noise during starting means metal is contacting metal improperly. This can cause expensive damage if you keep trying.",
    learn: "Grinding usually means the starter gear (pinion) isn't properly engaging with the flywheel ring gear. The teeth may be worn, the starter may be misaligned, or the flywheel teeth are damaged. Continuing to grind can destroy both components.",
    question: "Describe the sound more precisely:",
    options: [
      { label: "Grinding — metal on metal", next: "stop-grinding" },
      { label: "High-pitched whining/spinning", next: "whining-starter" },
      { label: "Clicking then grinding", next: "stop-grinding" },
    ],
  },

  "stop-grinding": {
    id: "stop-grinding",
    type: "stop",
    icon: "🛑",
    title: "Stop — Do Not Keep Trying",
    message: "Grinding during starting will damage the flywheel and starter. Each attempt makes it worse and more expensive.",
    severity: "warning",
    next: "call-tech-grinding",
  },

  "call-tech-grinding": {
    id: "call-tech-grinding",
    type: "call-tech",
    icon: "📞",
    title: "Call a Mechanic — Starter/Flywheel Issue",
    message: "Grinding means the starter gear and flywheel aren't meshing properly. This needs hands-on inspection.",
    script: "Hi, my car makes a grinding noise when I try to start it. I stopped trying after [NUMBER] attempts to avoid damage. The grinding is [constant / intermittent]. The car is a [YEAR MAKE MODEL]. I need a tow to your shop.",
  },

  "whining-starter": {
    id: "whining-starter",
    type: "action",
    icon: "🔊",
    title: "Starter Spins But Doesn't Engage",
    instruction: "A high-pitched whining means the starter motor is spinning but the gear isn't extending to mesh with the flywheel. The starter spins freely without turning the engine.",
    learn: "This is called 'freewheeling.' The starter solenoid should push the pinion gear out to engage the flywheel, but the mechanism is stuck or broken. The starter needs replacement.",
    question: "Understood — what would you like to do?",
    options: [
      { label: "I need to call for help", next: "call-tech-grinding" },
      { label: "Can I try anything else?", next: "call-tech-grinding" },
    ],
  },
};
