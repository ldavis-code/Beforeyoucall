/*
 * Lawn & Garden Troubleshooting Wizard — "Mower Won't Start" Decision Tree
 * "Before You Call" — If It's Smokin', It's Broken
 * Safety-first diagnostic flow for push mowers, riding mowers, and electric mowers
 */

export type MowerNodeType = "safety-gate" | "question" | "action" | "stop" | "resolved" | "call-tech";
export type MowerSeverity = "critical" | "warning";

export interface MowerWizardOption {
  label: string;
  next: string;
  icon?: string;
}

export interface MowerWizardNode {
  id: string;
  type: MowerNodeType;
  icon: string;
  title: string;
  subtitle?: string;
  question?: string;
  checks?: string[];
  yesResult?: string;
  noResult?: string;
  message?: string;
  details?: string[];
  severity?: MowerSeverity;
  next?: string;
  instruction?: string;
  learn?: string;
  options?: MowerWizardOption[];
  tip?: string;
  script?: string;
}

export const MOWER_WIZARD_TREE: Record<string, MowerWizardNode> = {
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
      "👃 Smell — Strong gasoline odor, burning oil, or hot metal",
      "👀 See — Smoke from the engine, leaking fuel, or sparks",
      "👂 Hear — Unusual grinding, knocking, or loud backfiring",
      "✋ Feel — Excessive heat from the engine housing",
      "💧 Fluids — Gas puddle under the mower or oil dripping from the deck",
    ],
    yesResult: "stop-emergency",
    noResult: "mower-type",
  },

  "stop-emergency": {
    id: "stop-emergency",
    type: "stop",
    icon: "🛑",
    title: "Stop. Do Not Proceed.",
    message: "If it's smokin', it's broken.",
    details: [
      "🔑 Turn the mower OFF. Remove the key or disconnect the spark plug wire.",
      "⛽ If you smell gas — do NOT try to start it. Gas may be pooling near hot engine parts.",
      "🔥 If you see smoke — let the engine cool completely (at least 30 minutes).",
      "💧 If fuel is leaking — move the mower away from any ignition sources.",
      "🔌 Electric mower? Unplug it or remove the battery immediately.",
      "📝 Note what you observed — this helps the repair tech diagnose faster.",
      "📞 If there's active fire — call 911. Do not attempt to extinguish a fuel fire with water.",
    ],
    severity: "critical",
  },

  /* ═══════════════════════════════════════════════════
     WHAT TYPE OF MOWER?
     ═══════════════════════════════════════════════════ */
  "mower-type": {
    id: "mower-type",
    type: "question",
    icon: "🌿",
    title: "What Type of Mower?",
    subtitle: "Different mowers have different starting systems and common failure points.",
    options: [
      { label: "Gas push mower (pull cord)", next: "gas-push-start", icon: "🏃" },
      { label: "Gas riding mower / lawn tractor", next: "riding-mower-start", icon: "🚜" },
      { label: "Battery-powered electric mower", next: "electric-battery-start", icon: "🔋" },
      { label: "Corded electric mower", next: "corded-electric-start", icon: "🔌" },
    ],
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 1: GAS PUSH MOWER (PULL CORD)
     ═══════════════════════════════════════════════════ */
  "gas-push-start": {
    id: "gas-push-start",
    type: "action",
    icon: "🏃",
    title: "Gas Push Mower — Pull Cord",
    instruction: "First, let's check the basics. Make sure the bail lever (the handle bar you squeeze to run the mower) is held down while pulling the cord. Check that the throttle is set to START or FAST (not STOP). If your mower has a primer bulb (small rubber button on the side), press it 3 times.",
    learn: "The bail lever is a safety device — it kills the engine when you let go. If it's not engaged, the ignition circuit stays open and the mower can't start. The primer bulb pushes raw fuel into the carburetor to help cold starts.",
    question: "What happens when you pull the cord?",
    options: [
      { label: "Nothing — cord pulls freely, no sound", next: "pull-cord-free" },
      { label: "Cord is stuck — won't pull or very hard to pull", next: "cord-stuck" },
      { label: "Engine turns over but won't fire", next: "gas-cranks-no-start" },
      { label: "Engine fires briefly then dies", next: "gas-starts-dies" },
      { label: "Engine backfires or pops", next: "gas-backfire" },
    ],
  },

  "pull-cord-free": {
    id: "pull-cord-free",
    type: "action",
    icon: "🪢",
    title: "Cord Pulls Freely — No Resistance",
    instruction: "If the pull cord comes out with no resistance at all, the recoil starter mechanism is broken or the cord has disconnected from the engine flywheel. Look at the cord — is it frayed or does it retract back when you let go?",
    learn: "The pull cord wraps around a recoil spring and engages with the flywheel to spin the engine. If the engagement pawls are broken or the cord is disconnected, pulling does nothing.",
    question: "Does the cord retract back?",
    options: [
      { label: "Yes — retracts but no engine engagement", next: "call-tech-recoil" },
      { label: "No — cord hangs loose / doesn't retract", next: "call-tech-recoil" },
    ],
  },

  "call-tech-recoil": {
    id: "call-tech-recoil",
    type: "call-tech",
    icon: "📞",
    title: "Call a Small Engine Repair Shop",
    message: "The recoil starter assembly needs repair or replacement. This is a mechanical issue inside the engine housing.",
    script: "Hi, my push mower's pull cord has no resistance — the engine doesn't turn over when I pull it. The cord [does/doesn't] retract. It's a [BRAND MODEL]. I'd like the recoil starter inspected.",
  },

  "cord-stuck": {
    id: "cord-stuck",
    type: "action",
    icon: "✊",
    title: "Cord Won't Pull or Extremely Hard",
    instruction: "First, disconnect the spark plug wire (pull the rubber boot off the spark plug tip) for safety. Then try to turn the blade by hand (wear thick gloves). Check underneath for debris, sticks, or rope wrapped around the blade shaft.",
    learn: "A seized cord usually means something is mechanically blocking the engine from turning — either debris jammed in the blade, a hydro-locked cylinder (oil or gas flooded into the combustion chamber), or internal engine seizure.",
    question: "What did you find?",
    options: [
      { label: "Debris wrapped around the blade", next: "resolved-debris" },
      { label: "Blade turns freely but cord is still stuck", next: "cord-stuck-internal" },
      { label: "Blade won't turn at all", next: "engine-seized" },
    ],
  },

  "resolved-debris": {
    id: "resolved-debris",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Debris Cleared",
    message: "Debris was jamming the blade and preventing the engine from turning. Clear all material, reconnect the spark plug wire, and try starting again.",
    tip: "Always check the underside of the deck before each mow. Sticks, rocks, and old grass clippings can accumulate and cause jams. Tip the mower on its side (air filter UP, carburetor UP) to inspect safely.",
  },

  "cord-stuck-internal": {
    id: "cord-stuck-internal",
    type: "action",
    icon: "🔧",
    title: "Possible Hydro-Lock",
    instruction: "Remove the spark plug using a spark plug socket (usually 13/16\" or 3/4\"). Look inside the cylinder — is it wet with oil or gas? If so, the cylinder is hydro-locked. Crank the engine a few times with the plug out to blow out the excess fluid. Wipe the plug dry and reinstall.",
    learn: "Hydro-lock happens when liquid (oil or gas) fills the combustion chamber. Liquids don't compress like air, so the piston can't move. This commonly happens when a mower is tipped on the wrong side (carburetor down) or overfilled with oil.",
    question: "After clearing the cylinder, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-hydrolock" },
      { label: "No — still stuck", next: "engine-seized" },
    ],
  },

  "resolved-hydrolock": {
    id: "resolved-hydrolock",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Hydro-Lock Cleared",
    message: "Excess fluid was preventing the piston from moving. The engine should run normally now.",
    tip: "When tipping your mower for maintenance, always tip it with the air filter and carburetor facing UP. This prevents oil from flooding the cylinder. Also check your oil level — overfilling causes this too.",
  },

  "engine-seized": {
    id: "engine-seized",
    type: "call-tech",
    icon: "📞",
    title: "Engine May Be Seized",
    message: "If the blade and crankshaft won't turn at all, the engine may have seized from lack of oil, overheating, or internal failure. This usually requires professional diagnosis.",
    script: "Hi, my push mower engine is seized — the pull cord won't move and the blade won't turn by hand. I've checked for debris and it's clear. The mower is a [BRAND MODEL], approximately [AGE] years old. I'd like to know if it's worth repairing or replacing.",
  },

  /* ═══════════════════════════════════════════════════
     GAS MOWER: CRANKS BUT WON'T START
     ═══════════════════════════════════════════════════ */
  "gas-cranks-no-start": {
    id: "gas-cranks-no-start",
    type: "action",
    icon: "🔄",
    title: "Engine Turns Over But Won't Fire",
    instruction: "The engine is spinning when you pull the cord, but it won't catch and run. An engine needs three things: fuel, spark, and air. Let's check fuel first — how old is the gas in the tank?",
    learn: "Gasoline goes stale in as little as 30 days. Stale gas forms varnish that clogs the tiny passages in the carburetor. This is the #1 reason mowers won't start at the beginning of the season.",
    question: "How old is the fuel?",
    options: [
      { label: "Fresh — filled recently (within 2 weeks)", next: "check-fuel-flow" },
      { label: "Been sitting for a month or more", next: "stale-fuel" },
      { label: "Left over from last season", next: "stale-fuel" },
      { label: "I'm not sure", next: "stale-fuel" },
    ],
  },

  "stale-fuel": {
    id: "stale-fuel",
    type: "action",
    icon: "⛽",
    title: "Drain and Replace the Old Fuel",
    instruction: "Drain the old gas from the tank completely. You can siphon it out with a turkey baster or small hand pump, or tip the mower (air filter UP) to pour it into an approved container. Fill with fresh gasoline. If your mower has a primer bulb, press it 5–6 times with the fresh fuel.",
    learn: "Old gasoline loses its volatile compounds and becomes harder to ignite. Worse, it leaves gummy deposits in the carburetor jets — tiny brass passages as thin as a human hair. Even a small amount of varnish can block fuel flow completely.",
    question: "After fresh fuel and priming, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-stale-fuel" },
      { label: "No — still won't fire", next: "check-spark-plug" },
    ],
  },

  "resolved-stale-fuel": {
    id: "resolved-stale-fuel",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Stale Fuel",
    message: "Old gasoline was the culprit. Fresh fuel restored proper combustion.",
    tip: "At the end of each mowing season, either run the tank dry or add fuel stabilizer (like Sta-Bil). This prevents varnish buildup over winter. Always use fresh gas at the start of the season — never use leftover fuel from last year.",
  },

  "check-fuel-flow": {
    id: "check-fuel-flow",
    type: "action",
    icon: "⛽",
    title: "Check Fuel Flow to the Carburetor",
    instruction: "If the fuel is fresh, check that it's actually reaching the carburetor. Look for a fuel shutoff valve (if your mower has one) — make sure it's OPEN. Check the fuel line for kinks or cracks. If you have a primer bulb, press it — you should feel resistance and see fuel moving through the clear fuel line (if visible).",
    learn: "Even with fresh fuel in the tank, a clogged fuel filter, kinked line, or closed shutoff valve will starve the carburetor. No fuel to the carb = no start.",
    question: "Is fuel flowing?",
    options: [
      { label: "Yes — fuel seems to be flowing", next: "check-spark-plug" },
      { label: "No — fuel line is kinked or cracked", next: "resolved-fuel-line" },
      { label: "I can't tell", next: "check-spark-plug" },
    ],
  },

  "resolved-fuel-line": {
    id: "resolved-fuel-line",
    type: "resolved",
    icon: "✅",
    title: "Fuel Line Issue Found",
    message: "A kinked, cracked, or disconnected fuel line was preventing fuel from reaching the engine.",
    tip: "Replacement fuel line is inexpensive and available at any hardware store. Bring a small section of the old line to match the diameter. Fuel line hardens and cracks with age — replace it every few years as preventive maintenance.",
  },

  /* ═══════════════════════════════════════════════════
     SPARK PLUG DIAGNOSTICS
     ═══════════════════════════════════════════════════ */
  "check-spark-plug": {
    id: "check-spark-plug",
    type: "action",
    icon: "⚡",
    title: "Check the Spark Plug",
    instruction: "Remove the spark plug using a spark plug socket (usually 13/16\" or 3/4\"). Examine the electrode (the tip with the small gap). What does it look like?",
    learn: "The spark plug fires thousands of times per minute, igniting the fuel-air mixture. A fouled, worn, or damaged plug can't produce a strong enough spark. Spark plugs are the easiest and cheapest thing to replace on a small engine.",
    question: "What does the spark plug look like?",
    options: [
      { label: "Black and sooty / wet with fuel", next: "fouled-plug" },
      { label: "White or blistered", next: "overheated-plug" },
      { label: "Light tan/brown — looks normal", next: "test-spark" },
      { label: "Electrode is worn down or damaged", next: "replace-plug" },
    ],
  },

  "fouled-plug": {
    id: "fouled-plug",
    type: "action",
    icon: "🖤",
    title: "Fouled Spark Plug — Carbon or Fuel Buildup",
    instruction: "Clean the plug with a wire brush or replace it (spark plugs cost $3–5). If it's wet with fuel, the engine is getting too much gas (flooded). Let it dry for 10 minutes with the plug out, then reinstall and try starting WITHOUT using the primer or choke.",
    learn: "A black, sooty plug means the engine is running rich (too much fuel, not enough air). This can be caused by a dirty air filter, stuck choke, or over-priming. A wet plug means the cylinder is flooded with raw fuel.",
    question: "After cleaning/replacing the plug, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-fouled-plug" },
      { label: "No — still won't fire", next: "check-air-filter" },
    ],
  },

  "resolved-fouled-plug": {
    id: "resolved-fouled-plug",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Fouled Spark Plug",
    message: "The spark plug was fouled and couldn't produce a strong spark. A clean or new plug restored ignition.",
    tip: "Replace the spark plug at the start of every mowing season — it's the single best maintenance item for reliable starting. Also check your air filter — a clogged filter causes rich running which fouls plugs faster.",
  },

  "overheated-plug": {
    id: "overheated-plug",
    type: "action",
    icon: "🔥",
    title: "Overheated Spark Plug",
    instruction: "A white or blistered plug indicates the engine has been running too hot (lean condition — not enough fuel or too much air). Replace the plug. Check that the cooling fins on the engine aren't clogged with grass and debris.",
    learn: "An overheated engine can warp the head gasket, score the cylinder walls, or damage the piston. Clean the cooling fins and make sure the engine shroud (the plastic cover) is in place — it directs air over the fins for cooling.",
    question: "After replacing the plug and cleaning cooling fins, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-overheated" },
      { label: "No — still won't fire", next: "check-air-filter" },
    ],
  },

  "resolved-overheated": {
    id: "resolved-overheated",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Overheating Addressed",
    message: "The engine was overheating due to blocked cooling fins or a lean fuel condition. New plug and clean fins should resolve it.",
    tip: "After every few mows, blow out the grass clippings from around the engine with compressed air or a leaf blower. Packed grass acts like insulation and prevents cooling. Never remove the engine shroud — it's critical for airflow.",
  },

  "replace-plug": {
    id: "replace-plug",
    type: "action",
    icon: "🔧",
    title: "Replace the Worn Spark Plug",
    instruction: "Take the old plug to a hardware store or auto parts store to match the replacement. Common small engine plugs: Champion RJ19LM, NGK BR2LM, or Briggs & Stratton 796112. Gap the new plug to spec (usually 0.030\") using a gap tool. Install hand-tight, then 1/4 turn with the socket.",
    learn: "Spark plug electrodes erode over time from the constant electrical arcing. A worn electrode creates a wider gap that requires more voltage to jump — eventually the ignition coil can't produce enough voltage and the spark becomes too weak to ignite fuel.",
    question: "After installing the new plug, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-new-plug" },
      { label: "No — still won't fire", next: "check-air-filter" },
    ],
  },

  "resolved-new-plug": {
    id: "resolved-new-plug",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — New Spark Plug",
    message: "The old spark plug was too worn to produce a reliable spark.",
    tip: "Replace the spark plug every season or every 100 hours of use. Keep a spare in your garage — they're cheap insurance against a no-start situation.",
  },

  "test-spark": {
    id: "test-spark",
    type: "action",
    icon: "⚡",
    title: "Test for Spark",
    instruction: "With the plug removed, reconnect the spark plug wire to the plug. Hold the plug's metal body against the engine block (bare metal). Have someone pull the cord (or pull it yourself carefully while holding the plug with insulated pliers). Watch for a blue spark jumping across the electrode gap.",
    learn: "This tests the entire ignition circuit — from the flywheel magnets, through the ignition coil, down the wire, and across the plug gap. A strong blue spark means ignition is working. A weak orange spark or no spark means the coil or flywheel key may be bad.",
    question: "Did you see a spark?",
    options: [
      { label: "Yes — strong blue spark", next: "check-air-filter" },
      { label: "Weak orange/yellow spark", next: "weak-spark" },
      { label: "No spark at all", next: "no-spark" },
    ],
  },

  "weak-spark": {
    id: "weak-spark",
    type: "action",
    icon: "🟡",
    title: "Weak Spark — Ignition Coil Issue",
    instruction: "A weak spark usually means the ignition coil is failing or the gap between the coil and flywheel is too wide. Check the coil air gap — it should be about the thickness of a business card (0.010–0.012\"). Also check that the kill wire from the bail lever isn't grounding out.",
    learn: "The ignition coil is mounted next to the flywheel. As magnets on the flywheel pass the coil, they induce a high-voltage pulse. If the coil is weak or the gap is too wide, the induced voltage drops below what's needed to fire the plug.",
    question: "Can you adjust the coil gap?",
    options: [
      { label: "I adjusted it — now it sparks strong", next: "resolved-coil-gap" },
      { label: "Still weak / I can't adjust it", next: "call-tech-ignition" },
    ],
  },

  "resolved-coil-gap": {
    id: "resolved-coil-gap",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Coil Gap Adjusted",
    message: "The ignition coil was too far from the flywheel magnets, producing a weak spark.",
    tip: "Use a business card or feeler gauge as a spacer when setting the coil gap. Loosen the coil mounting screws, place the spacer between the coil and flywheel, let the magnets pull the coil in, then tighten the screws and remove the spacer.",
  },

  "no-spark": {
    id: "no-spark",
    type: "action",
    icon: "❌",
    title: "No Spark at All",
    instruction: "Check the bail lever kill switch — is the wire intact and connected? Disconnect the kill wire from the coil (it's usually a single small wire). Test for spark again with the kill wire disconnected.",
    learn: "The bail lever grounds the ignition coil to kill the engine. If the kill wire is shorted or the switch is stuck, it permanently grounds the coil — preventing any spark. Disconnecting it isolates whether the problem is the coil or the safety circuit.",
    question: "With the kill wire disconnected, is there spark now?",
    options: [
      { label: "Yes — spark with kill wire off!", next: "resolved-kill-switch" },
      { label: "No — still no spark", next: "check-flywheel-key" },
    ],
  },

  "resolved-kill-switch": {
    id: "resolved-kill-switch",
    type: "resolved",
    icon: "✅",
    title: "Problem Found — Kill Switch / Bail Lever",
    message: "The kill switch circuit is grounding out the ignition coil. The bail lever switch, wiring, or connector is faulty.",
    tip: "Inspect the kill wire for bare spots where it might be touching the engine frame. Check the bail lever switch — sometimes the spring breaks and the switch stays in the 'kill' position. This is a simple repair for a small engine shop.",
  },

  "check-flywheel-key": {
    id: "check-flywheel-key",
    type: "action",
    icon: "🔑",
    title: "Check the Flywheel Key",
    instruction: "The flywheel key is a small, soft metal piece that aligns the flywheel with the crankshaft. If the mower hit a hard object (rock, stump), the key may have sheared. This throws off ignition timing completely. Checking it requires removing the flywheel — this is getting into advanced territory.",
    learn: "The flywheel key is designed to shear on impact to protect the crankshaft. When it shears, the flywheel shifts position, and the magnets no longer pass the coil at the right time — resulting in no spark or severely mistimed spark.",
    question: "Did the mower recently hit something hard?",
    options: [
      { label: "Yes — it hit a rock or stump", next: "call-tech-flywheel" },
      { label: "No — it just stopped working", next: "call-tech-ignition" },
    ],
  },

  "call-tech-flywheel": {
    id: "call-tech-flywheel",
    type: "call-tech",
    icon: "📞",
    title: "Call a Small Engine Repair Shop — Flywheel Key",
    message: "The flywheel key likely sheared when the mower hit an object. This is a common and inexpensive repair, but requires a flywheel puller tool.",
    script: "Hi, my mower hit a [rock/stump/object] and now it won't start — no spark. I suspect the flywheel key is sheared. It's a [BRAND MODEL]. The key replacement should be straightforward.",
  },

  "call-tech-ignition": {
    id: "call-tech-ignition",
    type: "call-tech",
    icon: "📞",
    title: "Call a Small Engine Repair Shop — Ignition",
    message: "No spark with the kill wire disconnected means the ignition coil has likely failed. Coil replacement is a common small engine repair.",
    script: "Hi, my mower has no spark. I've tested with a known good plug and disconnected the kill wire — still no spark. The coil gap looks correct. It's a [BRAND MODEL]. I'd like the ignition coil tested and likely replaced.",
  },

  /* ═══════════════════════════════════════════════════
     AIR FILTER CHECK
     ═══════════════════════════════════════════════════ */
  "check-air-filter": {
    id: "check-air-filter",
    type: "action",
    icon: "💨",
    title: "Check the Air Filter",
    instruction: "Remove the air filter cover (usually one screw or a snap clip). Pull out the filter element. Hold it up to the light — can you see light through it? A clogged filter chokes the engine of air.",
    learn: "The engine needs a precise ratio of fuel to air (about 14.7:1 by weight). A dirty air filter restricts airflow, making the mixture too rich (too much fuel, not enough air). This causes hard starting, black smoke, and poor performance.",
    question: "What condition is the air filter in?",
    options: [
      { label: "Filthy — caked with dirt/grass", next: "dirty-air-filter" },
      { label: "Looks clean / light passes through", next: "carburetor-issue" },
      { label: "It's a foam filter — it's oily and dark", next: "dirty-air-filter" },
    ],
  },

  "dirty-air-filter": {
    id: "dirty-air-filter",
    type: "action",
    icon: "🧹",
    title: "Clean or Replace the Air Filter",
    instruction: "Paper filter: tap it gently to remove loose dirt, or replace it ($5–10). Foam filter: wash it in warm soapy water, squeeze dry, apply a light coat of clean engine oil, and squeeze out the excess. Reinstall and try starting.",
    learn: "A clean air filter is critical for proper combustion. Most mower manufacturers recommend checking the filter every 25 hours of use and replacing it annually.",
    question: "After cleaning/replacing the filter, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-air-filter" },
      { label: "No — still won't fire", next: "carburetor-issue" },
    ],
  },

  "resolved-air-filter": {
    id: "resolved-air-filter",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Dirty Air Filter",
    message: "The clogged air filter was starving the engine of air, preventing proper combustion.",
    tip: "Check your air filter every 5–10 hours of mowing. In dusty conditions, check it every use. A pre-filter (foam wrap around the paper element) catches the big stuff and extends filter life significantly.",
  },

  "carburetor-issue": {
    id: "carburetor-issue",
    type: "action",
    icon: "⚙️",
    title: "Likely a Carburetor Problem",
    instruction: "If you have fresh fuel, good spark, and a clean air filter but the mower still won't start, the carburetor is almost certainly clogged. Try spraying a 2-second burst of carburetor cleaner or starting fluid directly into the air filter opening, then immediately try to start.",
    learn: "If the engine fires briefly with starting fluid but dies, it confirms the carburetor isn't delivering fuel. The jets and passages are clogged with varnish from old gas. The carburetor needs cleaning or rebuilding.",
    question: "What happened with starting fluid?",
    options: [
      { label: "Fired briefly then died — confirms carb issue", next: "call-tech-carb" },
      { label: "Nothing — didn't fire at all", next: "call-tech-general" },
      { label: "I don't have starting fluid", next: "call-tech-carb" },
    ],
  },

  "call-tech-carb": {
    id: "call-tech-carb",
    type: "call-tech",
    icon: "📞",
    title: "Carburetor Needs Cleaning",
    message: "The carburetor passages are clogged. A small engine shop can clean or rebuild it, or you can replace the entire carburetor (often cheaper than a rebuild on budget mowers — $15–30 on Amazon).",
    script: "Hi, my mower cranks but won't start. I have fresh fuel, good spark, and a clean air filter. It fires briefly with starting fluid then dies, so the carburetor isn't delivering fuel. It's a [BRAND MODEL]. I'd like the carburetor cleaned or replaced.",
  },

  "call-tech-general": {
    id: "call-tech-general",
    type: "call-tech",
    icon: "📞",
    title: "Call a Small Engine Repair Shop",
    message: "You've checked fuel, spark, and air — the three essentials. The issue may be compression, valve timing, or an internal engine problem that requires professional diagnosis.",
    script: "Hi, my mower won't start. I've checked: fresh fuel, spark plug [has/doesn't have] spark, air filter is clean. It doesn't fire even with starting fluid. It's a [BRAND MODEL], approximately [AGE] years old with [HOURS] hours of use.",
  },

  /* ═══════════════════════════════════════════════════
     GAS MOWER: STARTS THEN DIES
     ═══════════════════════════════════════════════════ */
  "gas-starts-dies": {
    id: "gas-starts-dies",
    type: "action",
    icon: "💨",
    title: "Starts Briefly Then Dies",
    instruction: "An engine that fires and runs for 1–5 seconds proves spark and compression are working. The problem is almost always fuel delivery. Check: Is the fuel cap vent clogged? (Loosen the cap slightly and try starting — if it runs, the vent is blocked.) Is the choke stuck closed?",
    learn: "The fuel cap has a tiny vent hole that lets air into the tank as fuel is consumed. If it's clogged, a vacuum forms and fuel stops flowing — like holding your thumb over a straw. The engine starts on the fuel in the carburetor bowl but dies when it runs out.",
    question: "Did loosening the fuel cap help?",
    options: [
      { label: "Yes — runs with loose cap!", next: "resolved-fuel-cap" },
      { label: "No — still dies after a few seconds", next: "starts-dies-carb" },
    ],
  },

  "resolved-fuel-cap": {
    id: "resolved-fuel-cap",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Clogged Fuel Cap Vent",
    message: "The fuel cap vent was blocked, creating a vacuum that stopped fuel flow.",
    tip: "Clean the vent hole with a thin wire or needle. If the cap is old and the vent is permanently clogged, replace the cap — they're usually under $10. Some caps have a small screen that gets clogged with debris.",
  },

  "starts-dies-carb": {
    id: "starts-dies-carb",
    type: "action",
    icon: "⚙️",
    title: "Carburetor Fuel Delivery Issue",
    instruction: "The engine starts on the fuel in the carburetor bowl but can't sustain flow. This is typically a partially clogged main jet or a stuck float needle in the carburetor.",
    learn: "The carburetor bowl holds a small reserve of fuel. The float valve controls flow from the tank. If the float is stuck or the main jet is partially blocked, the bowl empties faster than it refills — and the engine starves.",
    question: "Would you like to try cleaning the carburetor bowl, or call a tech?",
    options: [
      { label: "I'll try cleaning the bowl", next: "clean-carb-bowl" },
      { label: "I'd rather call a tech", next: "call-tech-carb" },
    ],
  },

  "clean-carb-bowl": {
    id: "clean-carb-bowl",
    type: "action",
    icon: "🔧",
    title: "Clean the Carburetor Bowl",
    instruction: "Turn off the fuel (if there's a shutoff valve) or clamp the fuel line. Remove the single bolt at the bottom of the carburetor bowl. Catch the fuel in a rag. Clean the bolt (it often has a small hole that acts as a jet) and the bowl with carburetor cleaner. Reinstall and try starting.",
    learn: "The bowl bolt on many Briggs & Stratton engines doubles as the main jet — it has a tiny hole that meters fuel. If this hole is clogged with even a speck of debris, the engine won't get enough fuel to run.",
    question: "After cleaning the bowl, does it run?",
    options: [
      { label: "Yes — runs great now!", next: "resolved-carb-bowl" },
      { label: "No — still dies", next: "call-tech-carb" },
    ],
  },

  "resolved-carb-bowl": {
    id: "resolved-carb-bowl",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Dirty Carburetor Bowl",
    message: "Debris in the carburetor bowl or a clogged jet was restricting fuel flow.",
    tip: "Use fuel stabilizer in your gas to prevent varnish buildup. Consider adding an inline fuel filter between the tank and carburetor if your mower doesn't have one — they cost about $3 and catch debris before it reaches the carb.",
  },

  /* ═══════════════════════════════════════════════════
     GAS MOWER: BACKFIRE
     ═══════════════════════════════════════════════════ */
  "gas-backfire": {
    id: "gas-backfire",
    type: "action",
    icon: "💥",
    title: "Engine Backfires or Pops",
    instruction: "Backfiring through the carburetor (intake) or exhaust usually indicates a timing or valve issue. If the mower recently hit something, the flywheel key may have sheared, throwing off timing.",
    learn: "Backfiring means fuel is igniting at the wrong time — either before the intake valve closes (intake backfire) or after the exhaust valve opens (exhaust backfire). A sheared flywheel key is the most common cause on mowers.",
    question: "Did the mower recently hit a hard object?",
    options: [
      { label: "Yes — hit a rock, stump, or root", next: "call-tech-flywheel" },
      { label: "No — it just started doing this", next: "call-tech-valve" },
    ],
  },

  "call-tech-valve": {
    id: "call-tech-valve",
    type: "call-tech",
    icon: "📞",
    title: "Call a Small Engine Repair Shop — Valve Issue",
    message: "Backfiring without impact damage suggests a valve adjustment issue or a failing head gasket. These require professional tools to diagnose and repair.",
    script: "Hi, my mower is backfiring when I try to start it. It hasn't hit anything recently. It's a [BRAND MODEL] with approximately [HOURS] hours. I'd like the valves and timing checked.",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 2: RIDING MOWER / LAWN TRACTOR
     ═══════════════════════════════════════════════════ */
  "riding-mower-start": {
    id: "riding-mower-start",
    type: "action",
    icon: "🚜",
    title: "Riding Mower / Lawn Tractor",
    instruction: "Riding mowers have multiple safety interlocks that prevent starting. Before diagnosing engine issues, let's check the safety system. Make sure: (1) You're sitting in the seat. (2) The blade engagement (PTO) is OFF/disengaged. (3) The parking brake is SET. (4) The transmission is in NEUTRAL or PARK.",
    learn: "Riding mowers have a seat switch, blade switch, brake switch, and neutral switch. ALL must be in the correct position or the starter won't engage. This is the most common 'won't start' issue on riding mowers — it's not broken, it's a safety interlock.",
    question: "With all safety switches in the correct position, what happens when you turn the key?",
    options: [
      { label: "Nothing — completely dead", next: "riding-dead" },
      { label: "Clicking but won't crank", next: "riding-clicking" },
      { label: "Cranks but won't fire", next: "gas-cranks-no-start" },
      { label: "Starts then dies", next: "riding-starts-dies" },
    ],
  },

  "riding-dead": {
    id: "riding-dead",
    type: "action",
    icon: "💀",
    title: "Completely Dead — No Response",
    instruction: "Check the battery. Riding mower batteries are typically 12V lead-acid, located under the seat or under the hood. Look at the terminals — are they corroded (white/green crust)? Are the cables tight? Try turning on the headlights — do they come on?",
    learn: "Unlike push mowers, riding mowers rely entirely on a battery to power the electric starter. A dead or weak battery is the #1 cause of no-start on riding mowers, especially after winter storage.",
    question: "What's the battery condition?",
    options: [
      { label: "Corroded terminals", next: "riding-corrosion" },
      { label: "Loose cables", next: "riding-loose-cable" },
      { label: "No headlights — battery seems dead", next: "riding-charge-battery" },
      { label: "Headlights work — battery seems fine", next: "riding-safety-switches" },
    ],
  },

  "riding-corrosion": {
    id: "riding-corrosion",
    type: "action",
    icon: "🧹",
    title: "Clean Corroded Battery Terminals",
    instruction: "Disconnect the negative (−) cable first, then positive (+). Scrub terminals and cable ends with a wire brush or baking soda paste. Rinse with water, dry completely. Reconnect positive first, then negative.",
    learn: "Corrosion creates resistance that can prevent the high amperage needed by the starter motor. Even a thin layer of corrosion can drop voltage enough to prevent starting.",
    question: "After cleaning, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-riding-corrosion" },
      { label: "No — still dead", next: "riding-charge-battery" },
    ],
  },

  "resolved-riding-corrosion": {
    id: "resolved-riding-corrosion",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Corroded Terminals",
    message: "Corrosion was blocking the electrical connection to the starter.",
    tip: "Apply dielectric grease or battery terminal protector spray after cleaning to prevent future corrosion. Check terminals at the start of each mowing season.",
  },

  "riding-loose-cable": {
    id: "riding-loose-cable",
    type: "action",
    icon: "🔧",
    title: "Tighten Battery Cables",
    instruction: "Use a wrench to tighten the terminal bolts. The cables should not move at all when you try to wiggle them.",
    question: "After tightening, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-riding-cable" },
      { label: "No — still dead", next: "riding-charge-battery" },
    ],
  },

  "resolved-riding-cable": {
    id: "resolved-riding-cable",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Loose Battery Cable",
    message: "A loose cable was preventing power from reaching the starter motor.",
    tip: "Vibration from mowing loosens connections over time. Check cable tightness monthly during mowing season.",
  },

  "riding-charge-battery": {
    id: "riding-charge-battery",
    type: "action",
    icon: "🔋",
    title: "Charge or Replace the Battery",
    instruction: "Connect a battery charger or trickle charger. Most riding mower batteries are 12V. Charge for 4–8 hours on a low setting (2 amp). If you have a multimeter, a fully charged 12V battery should read 12.6V or higher. Below 12.0V, the battery may not recover.",
    learn: "Lead-acid batteries self-discharge over time, especially in cold storage. A battery left uncharged over winter can sulfate internally and lose capacity permanently. A battery maintainer during off-season prevents this.",
    question: "After charging, does it start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-riding-battery-charge" },
      { label: "No — battery won't hold charge", next: "call-tech-riding-battery" },
    ],
  },

  "resolved-riding-battery-charge": {
    id: "resolved-riding-battery-charge",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Dead Battery Recharged",
    message: "The battery was discharged and needed recharging.",
    tip: "Use a battery maintainer (trickle charger) during winter storage. It keeps the battery topped off and prevents sulfation. Riding mower batteries typically last 3–4 years — replace proactively if yours is older.",
  },

  "call-tech-riding-battery": {
    id: "call-tech-riding-battery",
    type: "call-tech",
    icon: "📞",
    title: "Battery Needs Replacement",
    message: "If the battery won't hold a charge after 8+ hours on a charger, it's dead. Most hardware stores and auto parts stores carry riding mower batteries.",
    script: "I need a 12V riding mower battery for a [BRAND MODEL]. The current battery is [AGE] years old and won't hold a charge. Can you help me find the right replacement?",
  },

  "riding-safety-switches": {
    id: "riding-safety-switches",
    type: "action",
    icon: "🔒",
    title: "Check Safety Interlock Switches",
    instruction: "The battery is good but nothing happens when you turn the key. This almost always means a safety switch isn't engaged. Try this sequence: (1) Sit firmly in the seat and bounce slightly. (2) Make sure the blade PTO lever is fully OFF. (3) Set the parking brake firmly. (4) Move the shift lever to Neutral, then back to Neutral again. (5) Try starting.",
    learn: "Safety switches can wear out or get dirty. The seat switch is under the seat and activates from your weight. The PTO switch must be in the OFF position. Some mowers require the brake pedal to be pressed while starting.",
    question: "Did it start after checking all switches?",
    options: [
      { label: "Yes — one of the switches wasn't fully engaged", next: "resolved-safety-switch" },
      { label: "No — still nothing", next: "call-tech-riding-switch" },
    ],
  },

  "resolved-safety-switch": {
    id: "resolved-safety-switch",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Safety Interlock",
    message: "One of the safety switches wasn't fully engaged, preventing the starter from operating.",
    tip: "If a particular switch keeps causing problems, it may be worn and need replacement. The seat switch is the most common failure — they wear out from vibration. Never bypass a safety switch — they exist to prevent serious injury.",
  },

  "call-tech-riding-switch": {
    id: "call-tech-riding-switch",
    type: "call-tech",
    icon: "📞",
    title: "Call a Repair Shop — Safety Switch or Starter",
    message: "With a good battery and all safety switches checked, the issue may be a failed safety switch, starter solenoid, or ignition switch. These require testing with a multimeter.",
    script: "Hi, my riding mower won't start. Battery is good (headlights work), I've checked all safety switches — seat, PTO off, brake set, neutral. Nothing happens when I turn the key. It's a [BRAND MODEL]. I'd like the starting circuit diagnosed.",
  },

  "riding-clicking": {
    id: "riding-clicking",
    type: "action",
    icon: "🔊",
    title: "Clicking But Won't Crank",
    instruction: "A clicking sound means the solenoid is engaging but the battery doesn't have enough power to turn the starter motor. This is almost always a weak battery or poor connection.",
    learn: "The starter solenoid is an electromagnetic switch. It clicks when it receives the start signal, but if battery voltage is too low (or connections are resistive), there isn't enough amperage to spin the heavy starter motor.",
    question: "Have you tried charging or jump-starting the battery?",
    options: [
      { label: "No — let me try charging it", next: "riding-charge-battery" },
      { label: "Yes — battery is fully charged", next: "call-tech-riding-starter" },
    ],
  },

  "call-tech-riding-starter": {
    id: "call-tech-riding-starter",
    type: "call-tech",
    icon: "📞",
    title: "Call a Repair Shop — Starter Motor",
    message: "Clicking with a fully charged battery usually means the starter motor or solenoid has failed.",
    script: "Hi, my riding mower clicks when I turn the key but won't crank. The battery is fully charged and connections are clean and tight. It's a [BRAND MODEL]. I suspect the starter or solenoid needs replacement.",
  },

  "riding-starts-dies": {
    id: "riding-starts-dies",
    type: "action",
    icon: "💨",
    title: "Starts Then Dies — Seat Switch?",
    instruction: "On riding mowers, the most common cause of 'starts then immediately dies' is the seat safety switch. If the switch doesn't detect your weight, it kills the engine after 1–2 seconds. Sit firmly, bounce slightly, and try again. Also check that the PTO (blade engagement) is OFF.",
    learn: "The seat switch gives a brief grace period for starting, then checks if someone is seated. A worn switch, a light rider, or a loose connector can cause it to read 'no operator' and kill the engine.",
    question: "After firmly seating and checking PTO, does it stay running?",
    options: [
      { label: "Yes — stays running now!", next: "resolved-seat-switch" },
      { label: "No — still dies after a few seconds", next: "gas-starts-dies" },
    ],
  },

  "resolved-seat-switch": {
    id: "resolved-seat-switch",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Seat Switch",
    message: "The seat safety switch wasn't detecting your weight properly.",
    tip: "If this keeps happening, the seat switch may need replacement. It's usually mounted under the seat with two wires. A new one costs $10–20 and takes 5 minutes to install.",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 3: BATTERY-POWERED ELECTRIC MOWER
     ═══════════════════════════════════════════════════ */
  "electric-battery-start": {
    id: "electric-battery-start",
    type: "action",
    icon: "🔋",
    title: "Battery-Powered Electric Mower",
    instruction: "Check the battery charge level — most batteries have LED indicators. Press the battery test button. How many lights are showing?",
    learn: "Lithium-ion mower batteries have built-in protection circuits that prevent operation when the charge is too low, the battery is too hot, or the battery is too cold. The LED indicators tell you the state of charge.",
    question: "What do the battery LEDs show?",
    options: [
      { label: "No lights at all", next: "electric-dead-battery" },
      { label: "1 light (low charge)", next: "electric-charge-battery" },
      { label: "3–4 lights (good charge)", next: "electric-safety-check" },
      { label: "Lights are flashing/blinking", next: "electric-error-code" },
    ],
  },

  "electric-dead-battery": {
    id: "electric-dead-battery",
    type: "action",
    icon: "🪫",
    title: "Battery Shows No Charge",
    instruction: "Place the battery on the charger. Check that the charger LED shows it's receiving power (green or red light). Some chargers won't charge a deeply discharged battery — if the charger light doesn't come on, try removing and reinserting the battery.",
    learn: "Lithium-ion batteries have a minimum voltage threshold. If they discharge below this level, the charger's protection circuit may refuse to charge them to prevent damage. Some chargers have a 'recovery' mode for deeply discharged batteries.",
    question: "Does the charger accept the battery?",
    options: [
      { label: "Yes — it's charging now", next: "electric-charge-battery" },
      { label: "No — charger won't recognize it", next: "call-tech-electric-battery" },
    ],
  },

  "electric-charge-battery": {
    id: "electric-charge-battery",
    type: "action",
    icon: "🔌",
    title: "Charge the Battery Fully",
    instruction: "Let the battery charge completely (all LEDs solid). This can take 1–4 hours depending on the battery size. Don't try to use a partially charged battery for the first start of the season.",
    question: "After a full charge, does the mower start?",
    options: [
      { label: "Yes — it starts!", next: "resolved-electric-charge" },
      { label: "No — still won't start", next: "electric-safety-check" },
    ],
  },

  "resolved-electric-charge": {
    id: "resolved-electric-charge",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Battery Needed Charging",
    message: "The battery was too low to operate the mower's motor and safety systems.",
    tip: "Store lithium-ion batteries at 40–60% charge in a cool, dry place during winter. Don't leave them on the charger indefinitely or store them fully depleted — both reduce battery lifespan.",
  },

  "electric-safety-check": {
    id: "electric-safety-check",
    type: "action",
    icon: "🔒",
    title: "Check Safety Features",
    instruction: "Electric mowers have safety interlocks too. Check: (1) Is the safety key/pin inserted? (Many have a removable safety key.) (2) Is the bail lever being held while pressing start? (3) Is the battery fully clicked into place? (4) Is the grass bag attached? (Some models require it.)",
    learn: "Most electric mowers require you to hold the bail lever AND press a start button simultaneously. The safety key must be inserted. Some models also require the grass bag or mulch plug to be in place.",
    question: "After checking all safety features, does it start?",
    options: [
      { label: "Yes — missed a safety feature!", next: "resolved-electric-safety" },
      { label: "No — still won't start", next: "electric-motor-check" },
    ],
  },

  "resolved-electric-safety": {
    id: "resolved-electric-safety",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Safety Feature Not Engaged",
    message: "A safety interlock was preventing the mower from starting.",
    tip: "Keep the safety key in a consistent spot (many people clip it to the handle). If you lose it, replacements are available from the manufacturer — don't try to bypass the safety system.",
  },

  "electric-motor-check": {
    id: "electric-motor-check",
    type: "action",
    icon: "⚡",
    title: "Check for Blade Obstruction",
    instruction: "Tip the mower on its side (battery removed first!). Check if the blade spins freely by hand. Debris, grass buildup, or a bent blade can prevent the motor from turning.",
    learn: "Electric motors have overcurrent protection. If the blade is jammed, the motor draws too much current and the protection circuit shuts it down immediately — often before you even hear the motor try to spin.",
    question: "Does the blade spin freely?",
    options: [
      { label: "No — debris or obstruction found", next: "resolved-electric-debris" },
      { label: "Yes — blade is free", next: "call-tech-electric" },
    ],
  },

  "resolved-electric-debris": {
    id: "resolved-electric-debris",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Blade Obstruction Cleared",
    message: "Debris was preventing the blade from spinning, triggering the motor's overcurrent protection.",
    tip: "Clean the underside of the deck after every few mows. Grass buildup reduces cutting performance and can jam the blade. A putty knife or plastic scraper works well for removing packed grass.",
  },

  "electric-error-code": {
    id: "electric-error-code",
    type: "action",
    icon: "⚠️",
    title: "Battery LEDs Flashing — Error Code",
    instruction: "Flashing LEDs usually indicate a protection mode. Common patterns: rapid flashing = battery too hot or too cold, alternating flash = internal cell imbalance, single flash repeating = communication error with mower.",
    learn: "Lithium-ion batteries have a Battery Management System (BMS) that monitors temperature, voltage, and current. Flashing LEDs are the BMS telling you something is outside normal operating range.",
    question: "What's the situation?",
    options: [
      { label: "Battery feels hot — used recently or in sun", next: "electric-hot-battery" },
      { label: "It's cold outside (below 40°F / 5°C)", next: "electric-cold-battery" },
      { label: "Battery is room temperature", next: "call-tech-electric-battery" },
    ],
  },

  "electric-hot-battery": {
    id: "electric-hot-battery",
    type: "action",
    icon: "🌡️",
    title: "Battery Is Too Hot",
    instruction: "Let the battery cool in the shade for 30–60 minutes. Don't charge a hot battery and don't leave it in direct sunlight. Once cool, try again.",
    learn: "Lithium-ion batteries generate heat during use and charging. Operating above 113°F (45°C) triggers thermal protection to prevent damage or thermal runaway (a dangerous chain reaction).",
    question: "After cooling, does it work?",
    options: [
      { label: "Yes — works after cooling!", next: "resolved-electric-heat" },
      { label: "No — still flashing", next: "call-tech-electric-battery" },
    ],
  },

  "resolved-electric-heat": {
    id: "resolved-electric-heat",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Battery Overheated",
    message: "The battery's thermal protection was triggered. It needed time to cool down.",
    tip: "On hot days, take breaks during long mowing sessions to let the battery cool. Store batteries in the shade, not in a hot garage or car. Avoid charging immediately after heavy use — let the battery rest 15 minutes first.",
  },

  "electric-cold-battery": {
    id: "electric-cold-battery",
    type: "action",
    icon: "❄️",
    title: "Battery Is Too Cold",
    instruction: "Bring the battery indoors and let it warm to room temperature (at least 50°F / 10°C). This may take 1–2 hours. Don't try to charge or use a frozen battery.",
    learn: "Cold temperatures slow the chemical reactions inside lithium-ion cells, reducing available power. Below about 40°F (5°C), most mower batteries won't deliver enough current to spin the motor. Charging a cold battery can cause permanent damage.",
    question: "After warming, does it work?",
    options: [
      { label: "Yes — works at room temperature!", next: "resolved-electric-cold" },
      { label: "No — still won't work", next: "call-tech-electric-battery" },
    ],
  },

  "resolved-electric-cold": {
    id: "resolved-electric-cold",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Battery Too Cold",
    message: "The battery was below its minimum operating temperature.",
    tip: "Store batteries indoors during cold months. If you need to mow in cool weather, keep the battery inside until you're ready to start. Lithium-ion batteries perform best between 50–85°F (10–30°C).",
  },

  "call-tech-electric-battery": {
    id: "call-tech-electric-battery",
    type: "call-tech",
    icon: "📞",
    title: "Contact the Manufacturer",
    message: "The battery may have an internal cell failure or BMS malfunction. Most mower batteries have a 2–5 year warranty.",
    script: "Hi, my [BRAND] mower battery shows [flashing LEDs / won't charge / won't hold charge]. The battery is [AGE] years old. It's at room temperature and the charger [does/doesn't] recognize it. I'd like to check warranty coverage for a replacement.",
  },

  "call-tech-electric": {
    id: "call-tech-electric",
    type: "call-tech",
    icon: "📞",
    title: "Contact the Manufacturer or Dealer",
    message: "With a charged battery, clear blade, and all safety features engaged, the issue is likely the motor controller, wiring, or an internal component. Electric mower repairs are best handled by authorized service centers.",
    script: "Hi, my [BRAND MODEL] electric mower won't start. Battery is fully charged, blade spins freely, all safety features are engaged. No error codes on the battery. I'd like to bring it in for diagnosis.",
  },

  /* ═══════════════════════════════════════════════════
     BRANCH 4: CORDED ELECTRIC MOWER
     ═══════════════════════════════════════════════════ */
  "corded-electric-start": {
    id: "corded-electric-start",
    type: "action",
    icon: "🔌",
    title: "Corded Electric Mower",
    instruction: "Check the basics: (1) Is the extension cord plugged into a working outlet? Test the outlet with another device. (2) Is the cord fully inserted into the mower? (3) Check the entire length of the extension cord for cuts, kinks, or damage. (4) Is the cord rated for outdoor use and the right gauge? (12 or 14 gauge, 100ft max.)",
    learn: "Corded mowers need a heavy-duty outdoor extension cord. A cord that's too thin (16 gauge) or too long causes voltage drop, which can prevent the motor from starting or cause it to overheat. Always use a 12-gauge cord for runs over 50 feet.",
    question: "After checking the cord and outlet, what happens?",
    options: [
      { label: "Outlet is dead — no power", next: "corded-check-breaker" },
      { label: "Power is good but mower won't start", next: "corded-safety-check" },
      { label: "Motor hums but blade won't spin", next: "corded-blade-stuck" },
    ],
  },

  "corded-check-breaker": {
    id: "corded-check-breaker",
    type: "resolved",
    icon: "✅",
    title: "Check the Circuit Breaker or GFCI",
    message: "The outlet has no power. Check your home's breaker panel for a tripped breaker. If the outlet is a GFCI (has Test/Reset buttons), press the Reset button. Outdoor outlets are often on GFCI circuits that trip from moisture.",
    tip: "If the breaker keeps tripping when you plug in the mower, the mower may have a short circuit or the circuit is overloaded. Don't share the circuit with other high-draw devices. Use the Electrical Wizard on this site for breaker troubleshooting!",
  },

  "corded-safety-check": {
    id: "corded-safety-check",
    type: "action",
    icon: "🔒",
    title: "Check Safety Features",
    instruction: "Corded mowers typically require: (1) Hold the bail lever AND press the start button simultaneously. (2) Some have a safety lock-out button that must be pressed first. Check your manual for the correct start sequence.",
    question: "After following the correct start sequence, does it start?",
    options: [
      { label: "Yes — I was doing the sequence wrong!", next: "resolved-corded-sequence" },
      { label: "No — still won't start", next: "corded-blade-stuck" },
    ],
  },

  "resolved-corded-sequence": {
    id: "resolved-corded-sequence",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Incorrect Start Sequence",
    message: "The safety start sequence requires specific button/lever combinations in the right order.",
    tip: "Most corded mowers require: (1) Hold bail lever, (2) Press and hold safety button, (3) Press start button. All three must be engaged simultaneously. It can feel awkward at first.",
  },

  "corded-blade-stuck": {
    id: "corded-blade-stuck",
    type: "action",
    icon: "⚙️",
    title: "Motor Hums or Won't Spin",
    instruction: "Unplug the mower immediately. Check underneath for debris jamming the blade. If the motor hums but the blade doesn't spin, the blade may be stuck or the motor capacitor may have failed.",
    learn: "Electric motors use a start capacitor to provide the initial burst of torque to get the blade spinning. If the capacitor fails, the motor hums (tries to run) but can't overcome the initial resistance to start spinning.",
    question: "Is the blade jammed?",
    options: [
      { label: "Yes — debris found and cleared", next: "resolved-corded-debris" },
      { label: "No — blade is free but motor just hums", next: "call-tech-corded" },
    ],
  },

  "resolved-corded-debris": {
    id: "resolved-corded-debris",
    type: "resolved",
    icon: "✅",
    title: "Problem Solved — Blade Obstruction",
    message: "Debris was preventing the blade from spinning.",
    tip: "Always unplug a corded mower before checking underneath. Clean the deck regularly to prevent buildup that can jam the blade.",
  },

  "call-tech-corded": {
    id: "call-tech-corded",
    type: "call-tech",
    icon: "📞",
    title: "Motor or Capacitor Failure",
    message: "A humming motor that won't spin (with a clear blade) usually means the start capacitor has failed. This is repairable but requires electrical knowledge.",
    script: "Hi, my corded electric mower hums when I try to start it but the blade won't spin. The blade is not jammed. I suspect the start capacitor. It's a [BRAND MODEL]. Is this worth repairing?",
  },
};
