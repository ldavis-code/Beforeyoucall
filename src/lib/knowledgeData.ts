/*
 * Before You Call — Educational Knowledge Tree Data
 * Design: Workshop Blueprint — Industrial Technical Manual
 * All 5 categories with equal depth of educational content
 */

export interface KnowledgeNode {
  id: string;
  title: string;
  description: string;
  icon?: string;
  children?: KnowledgeNode[];
  educationalContent?: {
    whatIs: string;
    howItWorks: string;
    commonIssues?: string[];
    safetyTips?: string[];
    proTip?: string;
    tools?: string[];
  };
  troubleshootingFlow?: TroubleshootingStep[];
}

export interface TroubleshootingStep {
  id: string;
  question: string;
  explanation: string;
  yesAction: string;
  noAction: string;
  yesNextId?: string;
  noNextId?: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  colorLight: string;
  image: string;
  icon: string;
  knowledgeTree: KnowledgeNode[];
}

// Image URLs
const IMAGES = {
  hero: "https://private-us-east-1.manuscdn.com/sessionFile/pRg9W1A5tYb5375M1FR4Hp/sandbox/yZT5Eiu2cL2Y5PWaVyTo3G-img-1_1770484195000_na1fn_aGVyby13b3Jrc2hvcA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFJnOVcxQTV0WWI1Mzc1TTFGUjRIcC9zYW5kYm94L3laVDVFaXUyY0wyWTVQV2FWeVRvM0ctaW1nLTFfMTc3MDQ4NDE5NTAwMF9uYTFmbl9hR1Z5YnkxM2IzSnJjMmh2Y0EuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=OeZAQwqS0QWxpdICiG3V81QAIdZ6axaS1HfSq7I~c1yzGbLIym4-DaJh8mqjhItqPMdhYyI-T7SEGTdWt~5m7KAGbL~YBaJMuaTgm~LEn~fmulXETROrI~VVwvvlcq9MQeZN6GERCziLFMvo0~81Aa4aXZCy9fxIeaviDs3iv8O-ncJN1vCFmK4lYV4Bau7NlRc6F4QL6SRF2hAnRhnA-fxFdooz9OGwlHzwVz8uQ1XoPKfIsEdw34OBvfev7v~pe0X6yrLFRlhGB-iZ~uKrW~MX4im8k~p8YTrT6BRrXbSniLOnkLdba5RBI-cGtq9bPlL9jBVbEo3TNS3mh-JuMg__",
  automotive: "https://private-us-east-1.manuscdn.com/sessionFile/pRg9W1A5tYb5375M1FR4Hp/sandbox/yZT5Eiu2cL2Y5PWaVyTo3G-img-2_1770484218000_na1fn_Y2F0ZWdvcnktYXV0b21vdGl2ZQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFJnOVcxQTV0WWI1Mzc1TTFGUjRIcC9zYW5kYm94L3laVDVFaXUyY0wyWTVQV2FWeVRvM0ctaW1nLTJfMTc3MDQ4NDIxODAwMF9uYTFmbl9ZMkYwWldkdmNua3RZWFYwYjIxdmRHbDJaUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=c4nTwijQVU9vJyJL0Gz2cLTXO6hSuTe48~JzOp0QJ~pLGMjlTI03T-w8EHgev5fdh-nLVReQVyxGtz4tDPsGKTNoFuZQHGh0JFeRAHPPRcr0i4O3WGSivneAkhdJgbnHeTB~uWbhA~zqc9Dh8FvJmrdbnvsynQn-JorsT-i~yehmYiSDrm8Zf8W6Eiynn6ApwGSFlo2TKbqdNrSE6joIgANkVJhNedjMc8Mux4QEMOyshTFlmK-k0meLy9YhQieaZEQRxVrJKTtB5jUQfwGzgxjJA~NExTbSUGeWs-RcKEpncznDk1zXtBSrid86kiCCLlNycx6q4sKBDG6GdZPv-g__",
  electrical: "https://private-us-east-1.manuscdn.com/sessionFile/pRg9W1A5tYb5375M1FR4Hp/sandbox/yZT5Eiu2cL2Y5PWaVyTo3G-img-3_1770484184000_na1fn_Y2F0ZWdvcnktZWxlY3RyaWNhbA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFJnOVcxQTV0WWI1Mzc1TTFGUjRIcC9zYW5kYm94L3laVDVFaXUyY0wyWTVQV2FWeVRvM0ctaW1nLTNfMTc3MDQ4NDE4NDAwMF9uYTFmbl9ZMkYwWldkdmNua3RaV3hsWTNSeWFXTmhiQS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=OuOcpJPqorF0m~HvtbJ-rNkXbFbjl37I6v~XOCJGNBaZpGNezXaDr2BVY5H3PixOusW5d9OGSkuxGtpLqPHwJMGIOko2NSUTZtZo3AzrM1FmgTiuz0wswCu2mTDi6oH~hXoSU1QL6rlIfkMh8JMOgghYGe-YO~-61OZ1u-SQ1wauhgRFF0UwTLWdCLA27TpSijyIrZMVf90oG-Yk8KvNl4arLQz039TBaXDzN5edSrQyN5NDU-8jjRUpZUYHC7rzmM1uQOIs-fFSTch0zE5Yedu~fD9mYBzxclc094SaHDJnUcgThKWXAQjehHHm1yBxR6azc8NvB5tczs8eqPa21Q__",
  lawnGarden: "https://private-us-east-1.manuscdn.com/sessionFile/pRg9W1A5tYb5375M1FR4Hp/sandbox/yZT5Eiu2cL2Y5PWaVyTo3G-img-4_1770484178000_na1fn_Y2F0ZWdvcnktbGF3bi1nYXJkZW4.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFJnOVcxQTV0WWI1Mzc1TTFGUjRIcC9zYW5kYm94L3laVDVFaXUyY0wyWTVQV2FWeVRvM0ctaW1nLTRfMTc3MDQ4NDE3ODAwMF9uYTFmbl9ZMkYwWldkdmNua3RiR0YzYmkxbllYSmtaVzQuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VgK~tStOWlb3tyUNPQiY~b3s-1gRe8ngZ2XakkSnY7KI86fKXL~6Ky9IpAeWAw1uuLhgc3YXUttppUQX3R2-spNvDSqUkpV1ZEfZBRiU6FTTCkkbgmix3~jhRXODMpPO6jgd5VStdxvLv2FOmBpnNtZcTjGZuqaNmk6h87GPwQ062h0CT~73MTotHAsA4G7WS89UYgWuO1pEUYebBKLTaD4g8nxHqMZlMOI1lVwUZmOJm~-Ty1wEnYGBN~2vOmNgGxleVMj7-NtmtS1BPabW~4PedrR8ixvk9F6x0x7Hj69BLHHHQI1OmUGnActzAUbykur-R0fUjnYMWgPDfTlQqQ__",
  motorcycle: "https://private-us-east-1.manuscdn.com/sessionFile/pRg9W1A5tYb5375M1FR4Hp/sandbox/yZT5Eiu2cL2Y5PWaVyTo3G-img-5_1770484192000_na1fn_Y2F0ZWdvcnktbW90b3JjeWNsZQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFJnOVcxQTV0WWI1Mzc1TTFGUjRIcC9zYW5kYm94L3laVDVFaXUyY0wyWTVQV2FWeVRvM0ctaW1nLTVfMTc3MDQ4NDE5MjAwMF9uYTFmbl9ZMkYwWldkdmNua3RiVzkwYjNKamVXTnNaUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PamuloqAbHIgm6QxL3qNBM9SzQJYAsXtwuOCEkTCfGgkHCzVmdh02ox3yVIB5yyFZquOVAOQwYSYOmRpOZ1mA2XqJwbSQIM2AO7AxympYpOWvFOO2h5YZlCbL2A9XvHt0FnX4r~7R17cmSi8fCu-zmCaC8Ou5P1ra0Rqyb0G7RTAzvvVh2-2FqtbaHVJp4yn8GPWSmPcAKwQxbksk4U4LNg6Pmdn25iRNiNPMVy9U4gRw04Dz4CbXFtImyP44BVVp0IPXHhfeelLei8pVguIp2loyikoOGL3zxVn~JlrzcrTteqvKR04TNuZo2IQFpUr9tGbxOY3I5NpcuqVhq~HnQ__",
};

export { IMAGES };

// ═══════════════════════════════════════════════════
// AUTOMOTIVE KNOWLEDGE TREE
// ═══════════════════════════════════════════════════
const automotiveTree: KnowledgeNode[] = [
  {
    id: "auto-engine",
    title: "Engine Systems",
    description: "Understanding how your car's engine works and common problems",
    children: [
      {
        id: "auto-engine-basics",
        title: "How an Engine Works",
        description: "The four-stroke cycle that powers your vehicle",
        educationalContent: {
          whatIs: "An internal combustion engine converts fuel into motion through a repeating four-stroke cycle: intake, compression, power, and exhaust. Think of it like breathing — the engine inhales fuel and air, squeezes them together, ignites the mixture for power, then exhales the waste gases.",
          howItWorks: "During the INTAKE stroke, the piston moves down and draws in a mixture of fuel and air. During COMPRESSION, the piston moves up and squeezes this mixture tightly. At the top, the spark plug fires — this is the POWER stroke — and the explosion pushes the piston back down, turning the crankshaft. Finally, during EXHAUST, the piston rises again to push out the burnt gases. This cycle repeats thousands of times per minute.",
          commonIssues: [
            "Misfiring — one or more cylinders not firing properly, causing rough idle or loss of power",
            "Overheating — coolant system failure causing the engine to run too hot",
            "Oil leaks — gaskets or seals deteriorating over time",
            "Knocking sounds — incorrect fuel octane or carbon buildup"
          ],
          safetyTips: [
            "Never open a radiator cap when the engine is hot",
            "Always work in a well-ventilated area",
            "Disconnect the battery before working on electrical components"
          ],
          proTip: "Listen to your engine regularly when it's running well. Knowing what 'normal' sounds like makes it much easier to identify when something changes.",
          tools: ["OBD-II Scanner", "Compression Tester", "Spark Plug Socket", "Torque Wrench"]
        }
      },
      {
        id: "auto-engine-oil",
        title: "Oil System",
        description: "Lubrication keeps your engine alive",
        educationalContent: {
          whatIs: "Engine oil is the lifeblood of your engine. It lubricates moving parts, reduces friction and heat, cleans internal surfaces, and helps seal the gaps between pistons and cylinder walls. Without proper oil, an engine would seize within minutes.",
          howItWorks: "The oil pump draws oil from the oil pan (sump) at the bottom of the engine and pushes it through the oil filter to remove contaminants. Clean oil then flows through passages (galleries) to reach the crankshaft bearings, camshaft, valve train, and piston rings. After lubricating these parts, gravity pulls the oil back down to the pan to start the cycle again.",
          commonIssues: [
            "Low oil level — burning oil or slow leaks",
            "Dirty oil — dark, gritty oil that hasn't been changed on schedule",
            "Oil pressure warning light — could indicate pump failure, low level, or worn bearings",
            "Milky oil — water or coolant contamination (head gasket issue)"
          ],
          safetyTips: [
            "Always check oil on a level surface with the engine off for at least 5 minutes",
            "Used motor oil is a carcinogen — wear gloves and dispose of it properly",
            "Never mix different oil types without understanding compatibility"
          ],
          proTip: "Check your oil every other fuel fill-up. Pull the dipstick, wipe it, reinsert fully, then read. The oil should be amber to dark brown and feel smooth between your fingers — not gritty.",
          tools: ["Oil Filter Wrench", "Drain Pan", "Funnel", "Torque Wrench for Drain Plug"]
        }
      },
      {
        id: "auto-engine-cooling",
        title: "Cooling System",
        description: "Keeping your engine at the right temperature",
        educationalContent: {
          whatIs: "The cooling system prevents your engine from overheating by circulating coolant (a mixture of water and antifreeze) through the engine block and radiator. It maintains the engine at its optimal operating temperature, typically around 195-220°F (90-105°C).",
          howItWorks: "The water pump circulates coolant through passages in the engine block, absorbing heat. Hot coolant flows to the radiator where air passing through the fins cools it down. The thermostat acts as a gate — it stays closed when the engine is cold (allowing it to warm up quickly) and opens when the engine reaches operating temperature. The coolant reservoir handles expansion as the fluid heats and cools.",
          commonIssues: [
            "Overheating — thermostat stuck closed, radiator clogged, or water pump failure",
            "Coolant leaks — cracked hoses, bad radiator, or failed water pump seal",
            "Heater not working — low coolant, air in the system, or stuck thermostat",
            "White exhaust smoke — coolant entering combustion chamber (head gasket)"
          ],
          safetyTips: [
            "NEVER open the radiator cap on a hot engine — pressurized steam can cause severe burns",
            "Coolant is toxic to animals — clean up spills immediately",
            "Let the engine cool completely before draining coolant"
          ],
          proTip: "Squeeze your radiator hoses when the engine is cold. They should feel firm but flexible. If they're mushy, cracked, or swollen, replace them before they fail on the road.",
          tools: ["Coolant Pressure Tester", "Infrared Thermometer", "Hose Clamp Pliers", "Funnel with Bleeder"]
        }
      }
    ]
  },
  {
    id: "auto-electrical",
    title: "Electrical System",
    description: "Battery, alternator, and starting system basics",
    children: [
      {
        id: "auto-battery",
        title: "Battery & Charging",
        description: "The heart of your vehicle's electrical system",
        educationalContent: {
          whatIs: "Your car battery stores electrical energy chemically and provides the burst of power needed to start the engine. Once running, the alternator takes over — generating electricity to power all systems and recharge the battery. Think of the battery as a reservoir and the alternator as the pump that keeps it full.",
          howItWorks: "A 12-volt lead-acid battery contains six cells, each producing about 2.1 volts. Inside each cell, lead plates sit in sulfuric acid electrolyte. A chemical reaction between the lead and acid produces electrons (electricity). The alternator is belt-driven by the engine and generates alternating current (AC), which a built-in rectifier converts to direct current (DC) for the car's systems.",
          commonIssues: [
            "Slow cranking — battery losing charge capacity, often due to age",
            "Clicking sound when turning key — battery too weak to engage starter",
            "Battery light on dashboard — alternator not charging properly",
            "Corroded terminals — white/green buildup preventing good electrical contact"
          ],
          safetyTips: [
            "Batteries contain sulfuric acid — wear eye protection and gloves",
            "Always disconnect the negative terminal first, reconnect it last",
            "Never create a spark near a battery — hydrogen gas is explosive"
          ],
          proTip: "A healthy battery should read 12.6V or higher with the engine off. With the engine running, you should see 13.7-14.7V — that means the alternator is charging. A multimeter is one of the most useful tools you can own.",
          tools: ["Multimeter", "Battery Terminal Cleaner", "Battery Load Tester", "Memory Saver"]
        }
      },
      {
        id: "auto-starter",
        title: "Starting System",
        description: "From key turn to engine running",
        educationalContent: {
          whatIs: "The starting system is a chain of components that work together to crank your engine. It includes the ignition switch, starter relay/solenoid, starter motor, and flywheel/flexplate. When you turn the key, you're activating a small motor powerful enough to spin a heavy engine.",
          howItWorks: "Turning the key sends a small electrical signal to the starter relay. The relay acts as a heavy-duty switch, connecting the battery's full power to the starter motor. The starter motor's small gear (pinion) extends and meshes with the flywheel's ring gear, spinning the engine. Once the engine fires and runs on its own, the pinion retracts.",
          commonIssues: [
            "Single click — starter solenoid engaging but motor not spinning (bad starter or weak battery)",
            "Rapid clicking — battery too weak to power the starter motor",
            "Grinding noise — pinion gear not properly engaging the flywheel",
            "Nothing happens — could be ignition switch, neutral safety switch, or wiring"
          ],
          proTip: "If your starter clicks once but won't crank, try gently tapping the starter motor with a wrench while someone turns the key. If it starts, the starter motor brushes are worn and it needs replacement soon."
        }
      }
    ]
  },
  {
    id: "auto-brakes",
    title: "Brake System",
    description: "How your vehicle stops safely",
    children: [
      {
        id: "auto-brakes-disc",
        title: "Disc Brakes",
        description: "The most common braking system on modern vehicles",
        educationalContent: {
          whatIs: "Disc brakes use a flat, circular metal disc (rotor) that spins with the wheel. When you press the brake pedal, hydraulic pressure squeezes brake pads against both sides of the rotor, creating friction that slows the wheel. It works on the same principle as squeezing a spinning bicycle wheel with your hand.",
          howItWorks: "Pressing the brake pedal pushes a piston in the master cylinder, creating hydraulic pressure in the brake lines. This pressure reaches the caliper — a clamp-like device straddling the rotor. Pistons inside the caliper push the brake pads against the rotor. The friction converts the vehicle's kinetic energy into heat, slowing you down. ABS (Anti-lock Braking System) rapidly pulses this pressure to prevent wheel lockup.",
          commonIssues: [
            "Squealing — brake pad wear indicators contacting the rotor (time to replace pads)",
            "Grinding — pads completely worn, metal-on-metal contact damaging the rotor",
            "Pulsating pedal — warped rotor from excessive heat",
            "Soft/spongy pedal — air in the brake lines or low brake fluid"
          ],
          safetyTips: [
            "Brake dust contains harmful particles — wear a mask when cleaning brakes",
            "Never compress the brake pedal when calipers are removed",
            "Always replace brake pads in pairs (both sides of the same axle)"
          ],
          proTip: "Most brake pads have a built-in metal tab that creates a high-pitched squeal when pads are about 75% worn. This is your early warning — don't ignore it. Replacing pads is far cheaper than replacing pads AND rotors.",
          tools: ["C-Clamp or Brake Piston Tool", "Lug Wrench", "Jack and Jack Stands", "Brake Cleaner Spray"]
        }
      }
    ]
  }
];

// ═══════════════════════════════════════════════════
// MOTORCYCLE KNOWLEDGE TREE
// ═══════════════════════════════════════════════════
const motorcycleTree: KnowledgeNode[] = [
  {
    id: "moto-engine",
    title: "Engine Types & Operation",
    description: "Understanding the powerplant of your motorcycle",
    children: [
      {
        id: "moto-engine-types",
        title: "Engine Configurations",
        description: "Single, twin, inline-four, and V-configurations",
        educationalContent: {
          whatIs: "Motorcycle engines come in several configurations, each with distinct characteristics. A single-cylinder ('thumper') is simple and torquey. A parallel twin places two cylinders side by side. A V-twin arranges them in a V shape for a unique power pulse. An inline-four lines up four cylinders for high-revving power.",
          howItWorks: "All motorcycle engines use the same four-stroke principle as cars, but with key differences. Motorcycle engines typically rev much higher (10,000-15,000 RPM vs. 6,000-7,000 for cars), are air or liquid cooled, and often use a shared oil system for the engine and transmission. The firing order and cylinder arrangement determine the engine's character — a V-twin has an uneven firing pulse that creates its distinctive rumble, while an inline-four fires evenly for smooth power.",
          commonIssues: [
            "Carburetor issues on older bikes — jets clogging from stale fuel",
            "Valve clearance changes — requires periodic checking and adjustment",
            "Chain-driven cam systems need tensioner inspection",
            "Oil consumption varies significantly by engine type"
          ],
          proTip: "Learn your engine's specific maintenance intervals. A single-cylinder dirt bike might need valve checks every 15 hours, while a touring bike's inline-four might go 16,000 miles between checks."
        }
      },
      {
        id: "moto-fuel-system",
        title: "Fuel System",
        description: "Carburetors vs. fuel injection and fuel delivery",
        educationalContent: {
          whatIs: "The fuel system delivers the right mixture of fuel and air to the engine. Older motorcycles use carburetors — mechanical devices that mix fuel and air using the Venturi effect. Modern bikes use electronic fuel injection (EFI), which precisely meters fuel using sensors and a computer (ECU).",
          howItWorks: "In a carburetor, air flowing through a narrow passage (venturi) creates a low-pressure zone that draws fuel from a small reservoir (float bowl) through calibrated jets. The rider controls airflow with the throttle. In EFI systems, a fuel pump pressurizes fuel in a rail, and injectors spray precise amounts based on data from sensors measuring air temperature, throttle position, engine speed, and oxygen content in the exhaust.",
          commonIssues: [
            "Stale fuel gumming up carburetors after storage",
            "Fuel injector clogging from poor fuel quality",
            "Fuel pump failure on EFI bikes",
            "Vacuum leaks causing lean running conditions"
          ],
          safetyTips: [
            "Gasoline is extremely flammable — work in ventilated areas away from ignition sources",
            "Use fuel stabilizer if storing a bike for more than 30 days",
            "Never use compressed air to blow out fuel passages toward your face"
          ],
          proTip: "If storing a carbureted bike, either drain the float bowls completely or fill the tank and add fuel stabilizer. Half-empty tanks allow condensation, and stale fuel in carbs creates a varnish that clogs tiny jets."
        }
      }
    ]
  },
  {
    id: "moto-drivetrain",
    title: "Drivetrain & Transmission",
    description: "Getting power to the rear wheel",
    children: [
      {
        id: "moto-chain",
        title: "Chain Drive",
        description: "The most common motorcycle final drive system",
        educationalContent: {
          whatIs: "A chain drive system transfers power from the transmission output shaft to the rear wheel using a roller chain and two sprockets. It's the most common system on motorcycles because it's lightweight, efficient, and allows easy gear ratio changes by swapping sprocket sizes.",
          howItWorks: "The front (countershaft) sprocket connects to the transmission output. The chain wraps around it and the larger rear sprocket, which is bolted to the rear wheel hub. As the engine turns the front sprocket, the chain pulls the rear sprocket and wheel. Modern O-ring and X-ring chains have sealed lubricant in each link for longer life.",
          commonIssues: [
            "Chain too loose — can skip teeth or derail, very dangerous",
            "Chain too tight — accelerates wear on sprockets and output shaft bearing",
            "Kinked links — from lack of lubrication or impact",
            "Sprocket wear — hooked or shark-fin shaped teeth indicate replacement needed"
          ],
          safetyTips: [
            "NEVER work on the chain with the engine running",
            "Always check chain slack with the bike on its side stand, not center stand",
            "Replace the chain and both sprockets together as a set"
          ],
          proTip: "Check your chain tension and lubricate it every 300-600 miles. The proper slack is usually 1-1.5 inches of vertical play at the midpoint between sprockets. A well-maintained chain can last 20,000+ miles; a neglected one might fail at 5,000.",
          tools: ["Chain Breaker/Riveter Tool", "Rear Stand", "Chain Lube", "Caliper for Sprocket Measurement"]
        }
      },
      {
        id: "moto-clutch",
        title: "Clutch System",
        description: "Connecting and disconnecting engine power",
        educationalContent: {
          whatIs: "The clutch is a pack of alternating friction and steel plates that connect the engine to the transmission. Pulling the clutch lever separates these plates, disconnecting engine power so you can shift gears. Releasing the lever re-engages them, transferring power smoothly.",
          howItWorks: "Most motorcycle clutches are 'wet' — they operate in engine oil. A stack of friction plates (with cork or fiber material) alternates with plain steel plates inside the clutch basket. Spring pressure holds them together. When you pull the clutch lever, a cable or hydraulic system pushes a pressure plate, releasing the spring force and allowing the plates to separate and spin independently.",
          commonIssues: [
            "Clutch slipping — engine revs rise but speed doesn't, worn friction plates",
            "Hard to find neutral — warped steel plates or improper cable adjustment",
            "Clutch drag — plates not fully separating, makes shifting difficult",
            "Juddering on takeoff — contaminated or glazed friction plates"
          ],
          proTip: "Adjust your clutch cable so there's about 2-3mm of free play at the lever before you feel resistance. Too tight and the clutch partially disengages (causing slip and wear). Too loose and it won't fully disengage (making shifts clunky)."
        }
      }
    ]
  },
  {
    id: "moto-tires-suspension",
    title: "Tires & Suspension",
    description: "Your connection to the road",
    children: [
      {
        id: "moto-tires",
        title: "Tire Basics",
        description: "Understanding tire types, pressure, and wear patterns",
        educationalContent: {
          whatIs: "Motorcycle tires are your only contact with the road — two patches roughly the size of credit cards support you, your bike, and all dynamic forces. Unlike car tires, motorcycle tires have a rounded profile that allows the bike to lean into turns. Front and rear tires have different tread patterns optimized for their specific roles.",
          howItWorks: "The front tire handles about 70% of braking force and provides steering input. The rear tire delivers engine power to the road and supports most of the bike's weight. Tire pressure affects the size of the contact patch — too low and the tire overheats and wears unevenly; too high and you lose grip. The rubber compound is designed to reach an optimal operating temperature where it becomes slightly sticky for maximum grip.",
          commonIssues: [
            "Center wear — from mostly straight-line highway riding",
            "Edge wear — from aggressive cornering",
            "Flat spots — from hard braking or sitting in one position too long",
            "Cracking sidewalls — age deterioration, even with good tread"
          ],
          safetyTips: [
            "Check tire pressure when tires are COLD (before riding)",
            "Replace tires older than 5 years regardless of tread depth",
            "Never mix radial and bias-ply tires on the same motorcycle"
          ],
          proTip: "The date code on your tire sidewall (DOT number) tells you when it was made. The last four digits indicate week and year — '2423' means week 24 of 2023. Even unused tires degrade over time.",
          tools: ["Tire Pressure Gauge", "Tread Depth Gauge", "Valve Core Tool", "Portable Air Compressor"]
        }
      }
    ]
  }
];

// ═══════════════════════════════════════════════════
// LAWN & GARDEN KNOWLEDGE TREE
// ═══════════════════════════════════════════════════
const lawnGardenTree: KnowledgeNode[] = [
  {
    id: "lawn-mower",
    title: "Lawn Mower Systems",
    description: "Understanding your mower from engine to blade",
    children: [
      {
        id: "lawn-mower-engine",
        title: "Small Engine Basics",
        description: "How your mower's engine works",
        educationalContent: {
          whatIs: "Most push and riding mowers use small single-cylinder, four-stroke gasoline engines (typically 140cc-700cc). These are simpler versions of car engines — same four-stroke cycle but with fewer cylinders, air cooling instead of liquid cooling, and a horizontal or vertical crankshaft orientation depending on the mower type.",
          howItWorks: "The engine draws in air through a foam or paper air filter, mixes it with fuel from the carburetor, and ignites it with a single spark plug. Unlike car engines with complex cooling systems, small engines use aluminum fins on the cylinder and flywheel-driven air flow to dissipate heat. A governor mechanism automatically adjusts the throttle to maintain consistent RPM under varying loads — like when you hit thick grass.",
          commonIssues: [
            "Won't start after winter storage — stale fuel in carburetor",
            "Runs rough or surges — dirty air filter or carburetor needs cleaning",
            "Loses power in thick grass — dull blade, dirty air filter, or governor issue",
            "Smokes excessively — oil overfilled, tilted wrong direction, or worn rings"
          ],
          safetyTips: [
            "Always disconnect the spark plug wire before working on the blade",
            "Never tilt a mower with the carburetor side down — oil floods the air filter",
            "Let the engine cool before refueling to prevent fire"
          ],
          proTip: "At the end of mowing season, either run the engine until the fuel tank and carburetor are completely dry, or add fuel stabilizer and run for 5 minutes to circulate it. This single step prevents 90% of spring startup problems.",
          tools: ["Spark Plug Wrench", "Air Filter", "Fuel Stabilizer", "Blade Balancer"]
        }
      },
      {
        id: "lawn-mower-blade",
        title: "Blade System & Cutting",
        description: "The business end of your mower",
        educationalContent: {
          whatIs: "The blade system is what actually cuts your grass. A hardened steel blade spins at approximately 3,000 RPM, creating a powerful cutting action and airflow that lifts grass upright before cutting it. The blade shape, sharpness, and deck design all work together to determine cut quality.",
          howItWorks: "The blade bolts directly to the engine's crankshaft (on push mowers) or connects via a belt and spindle system (on riding mowers). The blade's curved ends (called 'sails' or 'wings') create an updraft that lifts grass blades vertically for a clean cut. Mulching blades have extra curves that re-circulate clippings, chopping them finer. Side-discharge blades eject clippings out a chute.",
          commonIssues: [
            "Uneven cut — bent blade, uneven deck, or low tire pressure on one side",
            "Tearing instead of cutting — dull blade that shreds grass tips (brown appearance)",
            "Excessive vibration — bent blade or loose blade bolt",
            "Scalping — deck set too low or uneven ground"
          ],
          proTip: "Sharpen your blade every 20-25 hours of use (roughly every 8-10 mowings for an average lawn). A sharp blade cuts cleanly, which helps grass heal faster and resist disease. A dull blade tears, leaving ragged brown tips.",
          tools: ["Blade Removal Tool / Socket", "Bench Grinder or File", "Blade Balancer", "Torque Wrench"]
        }
      }
    ]
  },
  {
    id: "lawn-trimmer",
    title: "String Trimmers & Edgers",
    description: "Precision cutting tools for edges and tight spaces",
    children: [
      {
        id: "lawn-trimmer-2stroke",
        title: "Two-Stroke Engines",
        description: "How 2-stroke trimmer engines differ from 4-stroke",
        educationalContent: {
          whatIs: "Many string trimmers, chainsaws, and leaf blowers use two-stroke engines. Unlike four-stroke engines that complete a power cycle in four piston movements, a two-stroke does it in just two — making them simpler, lighter, and able to run in any orientation. The trade-off is they require oil mixed into the fuel.",
          howItWorks: "In a two-stroke engine, the piston serves double duty. As it moves up (compression/power), it creates a vacuum below that draws in a fresh fuel-air-oil mixture through a port. As the piston moves down (after the power stroke), it compresses this fresh charge below while exhaust exits through a port above. The fresh charge then transfers up to the combustion chamber through transfer ports. There are no valves — just ports that the piston covers and uncovers.",
          commonIssues: [
            "Won't start — stale fuel mix, fouled spark plug, or clogged spark arrestor screen",
            "Bogs down at full throttle — fuel mixture too lean, clogged fuel filter",
            "Excessive smoke — too much oil in fuel mix",
            "Dies at idle — carburetor idle adjustment needed or air leak"
          ],
          safetyTips: [
            "Always use the manufacturer-specified fuel-to-oil ratio (usually 50:1 or 40:1)",
            "Never use automotive oil — use two-stroke specific oil",
            "Mix fuel in a proper container, not in the equipment's tank"
          ],
          proTip: "Use premium fuel (no ethanol if possible) and pre-mix it in a dedicated container. Ethanol attracts moisture and degrades rubber fuel lines. Mark your mix container clearly with the ratio and date — don't use mix older than 30 days.",
          tools: ["Fuel Mix Container with Ratio Markings", "Spark Plug Wrench", "Carburetor Adjustment Tool", "Compressed Air"]
        }
      }
    ]
  },
  {
    id: "lawn-irrigation",
    title: "Irrigation & Watering",
    description: "Keeping your lawn and garden properly hydrated",
    children: [
      {
        id: "lawn-sprinkler",
        title: "Sprinkler Systems",
        description: "Understanding in-ground irrigation",
        educationalContent: {
          whatIs: "An in-ground sprinkler system uses a network of underground pipes, valves, and pop-up sprinkler heads to water your lawn and garden automatically. A controller (timer) tells electric valves when to open, sending pressurized water to specific zones. Each zone is designed to water a specific area with the right amount of water.",
          howItWorks: "The system connects to your home's water supply through a backflow preventer (which keeps irrigation water from contaminating your drinking water). The controller sends electrical signals to solenoid valves, which open to pressurize specific zones. Water pressure pushes sprinkler heads up from ground level, and they spray in preset patterns. When the valve closes, the heads retract flush with the ground.",
          commonIssues: [
            "Dry spots — clogged nozzle, misaligned head, or insufficient overlap between heads",
            "Head won't pop up — debris in the mechanism or low water pressure",
            "Zone won't turn on — faulty solenoid valve, broken wire, or controller issue",
            "Water hammer — sudden pressure surge when valves close too quickly"
          ],
          proTip: "Walk each zone while it's running at least once a month. Look for heads that aren't popping up fully, spray patterns hitting sidewalks or buildings, and dry spots between heads. Adjusting a few heads can dramatically improve coverage and reduce water waste."
        }
      }
    ]
  }
];

// ═══════════════════════════════════════════════════
// ENGINE / COMBUSTIBLE KNOWLEDGE TREE
// ═══════════════════════════════════════════════════
const engineTree: KnowledgeNode[] = [
  {
    id: "engine-fundamentals",
    title: "Combustion Engine Fundamentals",
    description: "Core principles that apply to all internal combustion engines",
    children: [
      {
        id: "engine-4stroke",
        title: "The Four-Stroke Cycle",
        description: "Intake, Compression, Power, Exhaust — the heartbeat of most engines",
        educationalContent: {
          whatIs: "The four-stroke cycle is the operating principle behind most engines in cars, trucks, motorcycles, generators, and lawn equipment. Invented by Nikolaus Otto in 1876, it converts the chemical energy in fuel into rotational mechanical energy through four distinct piston movements (strokes).",
          howItWorks: "STROKE 1 — INTAKE: The piston moves down, the intake valve opens, and a fuel-air mixture is drawn into the cylinder. STROKE 2 — COMPRESSION: Both valves close, the piston moves up, compressing the mixture to about 1/8th to 1/10th its original volume. This compression heats the mixture and makes the combustion more powerful. STROKE 3 — POWER: The spark plug fires, igniting the compressed mixture. The rapid expansion of burning gases forces the piston down with tremendous force, turning the crankshaft. STROKE 4 — EXHAUST: The exhaust valve opens, the piston moves up, pushing the burnt gases out through the exhaust system. Then the cycle repeats.",
          commonIssues: [
            "Loss of compression — worn piston rings, burned valves, or blown head gasket",
            "Timing issues — stretched timing chain or slipped timing belt",
            "Pre-ignition/detonation — fuel igniting before the spark plug fires",
            "Carbon buildup — deposits on valves and pistons reducing efficiency"
          ],
          proTip: "Understanding the four-stroke cycle helps you diagnose almost any engine problem. If an engine needs fuel, air, spark, and compression to run — and it's not running — one of those four things is missing or wrong. Systematically check each one."
        }
      },
      {
        id: "engine-2stroke",
        title: "The Two-Stroke Cycle",
        description: "Simpler, lighter, but different maintenance needs",
        educationalContent: {
          whatIs: "A two-stroke engine completes a power cycle in just two piston strokes (one crankshaft revolution) instead of four. This means a two-stroke fires once every revolution, while a four-stroke fires once every two revolutions — giving two-strokes a significant power-to-weight advantage. They're commonly found in chainsaws, leaf blowers, outboard motors, and some motorcycles.",
          howItWorks: "The two-stroke engine has no valves. Instead, it uses ports (holes) in the cylinder wall that the piston covers and uncovers as it moves. As the piston rises, it compresses the fuel-air-oil mixture above while drawing fresh mixture into the crankcase below through a reed valve. When the spark fires, the piston is driven down. It first uncovers the exhaust port (letting burnt gases escape), then uncovers the transfer port (allowing fresh mixture from the crankcase to enter the cylinder). The cycle then repeats.",
          commonIssues: [
            "Fouled spark plug — too much oil in the fuel mix",
            "Seized piston — too little oil in the mix or running too lean",
            "Reed valve failure — cracked or warped reeds cause poor performance",
            "Exhaust port carbon buildup — restricts exhaust flow"
          ],
          safetyTips: [
            "ALWAYS use the correct fuel-to-oil ratio specified by the manufacturer",
            "Two-stroke exhaust is more toxic than four-stroke — work in ventilated areas",
            "Never run a two-stroke without oil in the fuel — seizure happens in seconds"
          ],
          proTip: "The most common two-stroke ratios are 50:1 (most modern equipment) and 40:1 (older or high-performance). That's 2.6 oz of oil per gallon at 50:1, or 3.2 oz per gallon at 40:1. Use a measuring cup — guessing leads to problems."
        }
      },
      {
        id: "engine-diesel",
        title: "Diesel Engines",
        description: "Compression ignition — no spark plugs needed",
        educationalContent: {
          whatIs: "Diesel engines use compression ignition instead of spark ignition. They compress air so tightly (to ratios of 15:1 to 25:1, compared to 8:1 to 12:1 for gasoline engines) that the air temperature exceeds the ignition point of diesel fuel. When fuel is injected into this superheated air, it ignites spontaneously. This makes diesel engines more thermally efficient than gasoline engines.",
          howItWorks: "The intake stroke draws in only air (no fuel). The compression stroke squeezes this air to extreme pressure and temperature (over 900°F / 480°C). Near the top of compression, a fuel injector sprays finely atomized diesel fuel directly into the cylinder. The fuel ignites on contact with the hot air — no spark plug needed. The power stroke drives the piston down, and the exhaust stroke clears the cylinder. Modern diesels use electronic common-rail injection systems that can inject fuel multiple times per cycle for smoother, cleaner combustion.",
          commonIssues: [
            "Hard starting in cold weather — glow plugs not heating properly",
            "Black smoke — incomplete combustion, often from dirty injectors or turbo issues",
            "White smoke — water in fuel, failed head gasket, or low compression",
            "Fuel system air — diesel systems are very sensitive to air in the fuel lines"
          ],
          proTip: "Diesel fuel can gel in cold weather. If you live in a cold climate, use winter-blend diesel or add an anti-gel additive before temperatures drop below 20°F (-7°C). A gelled fuel filter will leave you stranded."
        }
      }
    ]
  },
  {
    id: "engine-fuel",
    title: "Fuel Systems",
    description: "How fuel gets from the tank to the combustion chamber",
    children: [
      {
        id: "engine-carb",
        title: "Carburetors",
        description: "Mechanical fuel mixing — simple but effective",
        educationalContent: {
          whatIs: "A carburetor is a mechanical device that mixes fuel with air in the correct ratio for combustion. Despite being replaced by fuel injection in most modern vehicles, carburetors are still widely used in small engines, older vehicles, and some motorcycles. Understanding them teaches fundamental principles of fuel delivery.",
          howItWorks: "Air flows through a tube with a narrow section called a venturi. As air speeds up through this restriction (Bernoulli's principle), pressure drops. This low pressure draws fuel up through a small tube (jet) from a reservoir (float bowl). The float bowl maintains a constant fuel level using a float and needle valve — like a toilet tank. Different circuits handle idle, mid-range, and full-throttle operation, each with its own jet and passage sizes.",
          commonIssues: [
            "Flooding — stuck float needle allowing too much fuel in",
            "Lean running — clogged jets from old fuel varnish",
            "Rich running — choke stuck closed or float level too high",
            "Surging — partially clogged pilot jet affecting idle circuit"
          ],
          proTip: "When cleaning a carburetor, never use wire to poke through jets — you'll enlarge the precisely calibrated holes. Use carburetor cleaner spray and compressed air. Soak stubborn carbs in an ultrasonic cleaner if available.",
          tools: ["Carburetor Cleaner Spray", "Compressed Air", "Small Wire Gauge Set", "Float Level Gauge"]
        }
      },
      {
        id: "engine-fi",
        title: "Fuel Injection",
        description: "Electronic precision fuel delivery",
        educationalContent: {
          whatIs: "Fuel injection systems use electronically controlled injectors to spray precise amounts of fuel into the engine. An onboard computer (ECU) calculates the exact fuel needed based on data from multiple sensors. This provides better fuel economy, lower emissions, easier starting, and more consistent performance than carburetors.",
          howItWorks: "A fuel pump (usually inside the fuel tank) pressurizes fuel to 40-60 PSI and sends it to a fuel rail that feeds all injectors. The ECU reads sensors for engine speed, air flow/pressure, throttle position, coolant temperature, oxygen content in exhaust, and more. It calculates the precise injector opening time (measured in milliseconds) to deliver the right amount of fuel. The injector is an electromagnetic valve — when energized, it opens and sprays atomized fuel.",
          commonIssues: [
            "Check engine light — often a sensor reading out of range",
            "Poor fuel economy — oxygen sensor degraded, sending incorrect data",
            "Rough idle — dirty injector not spraying properly",
            "Hard starting — fuel pump losing pressure or leaking injector"
          ],
          proTip: "An OBD-II scanner is essential for diagnosing fuel injection issues. Even a basic $20 Bluetooth scanner paired with a free phone app can read trouble codes that point you directly to the problem sensor or system."
        }
      }
    ]
  },
  {
    id: "engine-ignition",
    title: "Ignition Systems",
    description: "Creating the spark that starts combustion",
    children: [
      {
        id: "engine-spark",
        title: "Spark Plugs & Coils",
        description: "Generating 40,000+ volts to ignite fuel",
        educationalContent: {
          whatIs: "The ignition system transforms your battery's 12 volts into the 40,000+ volts needed to create a spark across the spark plug gap. This spark ignites the compressed fuel-air mixture at precisely the right moment. Modern systems use individual coils for each cylinder (coil-on-plug), while older systems used a single coil and distributor.",
          howItWorks: "An ignition coil is essentially a transformer. It has a primary winding (few hundred turns of thick wire) and a secondary winding (tens of thousands of turns of thin wire). When current flows through the primary winding and is suddenly interrupted, the collapsing magnetic field induces a very high voltage in the secondary winding. This high voltage travels to the spark plug, where it jumps across a small gap (typically 0.028-0.060 inches), creating the spark that ignites the fuel mixture.",
          commonIssues: [
            "Misfiring — worn spark plug, cracked insulator, or failing coil",
            "Hard starting — weak spark from worn plugs or low coil output",
            "Poor fuel economy — spark not strong enough for complete combustion",
            "Engine knock — incorrect spark timing"
          ],
          proTip: "Reading a spark plug tells you a lot about engine health. Light tan/gray is ideal. Black and sooty means too rich. White and blistered means too lean or overheating. Oily means oil is getting past rings or valve seals. Learn to read your plugs.",
          tools: ["Spark Plug Socket (5/8\" or 13/16\")", "Gap Gauge", "Spark Tester", "Anti-Seize Compound"]
        }
      }
    ]
  }
];

// ═══════════════════════════════════════════════════
// ELECTRICAL KNOWLEDGE TREE
// ═══════════════════════════════════════════════════
const electricalTree: KnowledgeNode[] = [
  {
    id: "elec-basics",
    title: "Electrical Fundamentals",
    description: "Understanding voltage, current, and resistance",
    children: [
      {
        id: "elec-concepts",
        title: "Core Concepts",
        description: "Voltage, amperage, and resistance — the three pillars",
        educationalContent: {
          whatIs: "Electricity is the flow of electrons through a conductor. Three fundamental measurements describe this flow: Voltage (V) is the electrical pressure pushing electrons — like water pressure in a pipe. Current/Amperage (A) is the volume of electron flow — like gallons per minute. Resistance (Ohms/Ω) is opposition to flow — like the pipe diameter. These three are related by Ohm's Law: V = I × R.",
          howItWorks: "In your home, electricity arrives from the utility at 240 volts (split into two 120V legs). The main breaker panel distributes this to circuits throughout your house. Each circuit is a loop — electricity flows out on the 'hot' wire (black or red), through the device, and returns on the 'neutral' wire (white). The ground wire (green or bare copper) is a safety path that carries current only if something goes wrong.",
          commonIssues: [
            "Tripped breaker — circuit overloaded with too many devices",
            "Flickering lights — loose connection, failing switch, or utility issue",
            "Warm outlets — overloaded circuit or loose wire connection",
            "GFCI tripping — ground fault detected (moisture or damaged wiring)"
          ],
          safetyTips: [
            "ALWAYS turn off the breaker and verify power is off with a tester before working",
            "Never work on electrical systems in wet conditions",
            "Electricity can kill — if you're unsure, hire a licensed electrician",
            "Never touch both the hot and neutral wires simultaneously"
          ],
          proTip: "Buy a non-contact voltage tester (about $15-20). Hold it near a wire or outlet and it beeps/lights up if voltage is present. Test it on a known live circuit first to confirm it's working, then test your work area. This simple tool can save your life.",
          tools: ["Non-Contact Voltage Tester", "Multimeter", "Wire Strippers", "Circuit Tester"]
        }
      }
    ]
  },
  {
    id: "elec-breaker",
    title: "Circuit Breaker Panel",
    description: "The nerve center of your home's electrical system",
    children: [
      {
        id: "elec-breaker-basics",
        title: "How Circuit Breakers Work",
        description: "Your home's built-in safety system",
        educationalContent: {
          whatIs: "A circuit breaker is an automatic safety switch that 'trips' (turns off) when it detects too much current flowing through a circuit. This prevents wires from overheating and causing fires. Your breaker panel (also called a load center) contains all the breakers for your home, organized by circuit.",
          howItWorks: "Inside a breaker, there are two trip mechanisms. A bimetallic strip bends when heated by sustained overcurrent (like running too many appliances) — this handles slow overloads. An electromagnetic coil trips instantly when it detects a sudden surge (like a short circuit). When either mechanism trips, it physically separates the contacts, cutting power to that circuit. To reset, you must manually flip the breaker off fully, then back on.",
          commonIssues: [
            "Breaker trips repeatedly — overloaded circuit, short circuit, or ground fault",
            "Breaker won't reset — internal mechanism damaged or active fault on circuit",
            "Buzzing from panel — loose connection or failing breaker",
            "Breaker feels hot — overloaded or poor connection"
          ],
          safetyTips: [
            "Never replace a breaker with a higher-amperage one — the wiring can't handle it",
            "Keep the area around your breaker panel clear and accessible",
            "If a breaker trips repeatedly, find the cause — don't just keep resetting it",
            "The panel cover should only be removed by a qualified electrician"
          ],
          proTip: "Label every breaker in your panel. Turn off one breaker at a time and walk through your house noting what lost power. Write it on the panel directory. This 30-minute task saves enormous time during emergencies and repairs."
        }
      },
      {
        id: "elec-breaker-types",
        title: "Types of Breakers",
        description: "Standard, GFCI, AFCI, and double-pole breakers",
        educationalContent: {
          whatIs: "Not all breakers are the same. Standard breakers protect against overcurrent. GFCI (Ground Fault Circuit Interrupter) breakers detect tiny current leaks to ground — protecting you from shock. AFCI (Arc Fault Circuit Interrupter) breakers detect dangerous electrical arcs — protecting against fires. Double-pole breakers provide 240V for large appliances.",
          howItWorks: "A STANDARD breaker trips when current exceeds its rating (e.g., 15A or 20A). A GFCI breaker constantly compares current on the hot and neutral wires — if they differ by as little as 5 milliamps (meaning current is leaking somewhere), it trips in 1/40th of a second. An AFCI breaker uses electronics to detect the unique signature of electrical arcs (sparking) in damaged wiring. DOUBLE-POLE breakers connect to both 120V legs, providing 240V for dryers, ranges, and AC units.",
          commonIssues: [
            "GFCI tripping in bathroom/kitchen — moisture in outlet or appliance with ground fault",
            "AFCI nuisance tripping — some appliances (vacuums, treadmills) create normal arcs that trigger it",
            "240V appliance not working — one leg of double-pole breaker tripped",
            "Old panel with no GFCI/AFCI — code may require upgrade during renovation"
          ],
          proTip: "Test your GFCI breakers (and outlets) monthly by pressing the 'Test' button. It should trip immediately. Press 'Reset' to restore power. If it doesn't trip when tested, it's defective and must be replaced — it won't protect you in a real fault."
        }
      },
      {
        id: "elec-breaker-appliance",
        title: "Breakers & Home Appliances",
        description: "Which breaker size for which appliance",
        educationalContent: {
          whatIs: "Every electrical appliance in your home needs a circuit with the right breaker size and wire gauge. Using too small a breaker causes nuisance tripping. Using too large a breaker is dangerous — the wiring could overheat before the breaker trips. The breaker protects the wire, not the appliance.",
          howItWorks: "Breaker sizing follows the National Electrical Code (NEC). The breaker amperage must match the wire gauge: 15A breakers use 14-gauge wire, 20A use 12-gauge, 30A use 10-gauge, 40A use 8-gauge, and 50A use 6-gauge. Dedicated circuits (serving only one appliance) are required for high-draw items. The general rule is that continuous loads should not exceed 80% of the breaker rating.",
          commonIssues: [
            "Kitchen breaker tripping — too many appliances on one 20A circuit",
            "Dryer not heating — one leg of the 30A double-pole breaker tripped",
            "AC unit tripping breaker — compressor drawing too much current (dirty coils or low refrigerant)",
            "Space heater tripping bedroom breaker — 1500W heater draws 12.5A on a 15A circuit, leaving little room for anything else"
          ],
          proTip: "Know the big draws in your home: Electric dryer (30A/240V), Electric range (40-50A/240V), Central AC (30-60A/240V), Water heater (30A/240V), Microwave (20A/120V dedicated), Dishwasher (20A/120V dedicated), Refrigerator (20A/120V dedicated). Each of these should be on its own dedicated circuit."
        }
      }
    ]
  },
  {
    id: "elec-wiring",
    title: "Home Wiring Basics",
    description: "Understanding the wires in your walls",
    children: [
      {
        id: "elec-wire-types",
        title: "Wire Types & Colors",
        description: "What each wire color means and common cable types",
        educationalContent: {
          whatIs: "Residential wiring uses color-coded insulation to identify each wire's function. This isn't just convention — it's a safety system. Knowing wire colors helps you understand what you're looking at inside a junction box or outlet. The most common residential cable is NM (Non-Metallic) sheathed cable, commonly called 'Romex' after the brand name.",
          howItWorks: "BLACK wire = Hot (carries current from panel to device). WHITE wire = Neutral (return path for current). GREEN or BARE COPPER = Ground (safety path, carries current only during a fault). RED wire = Second hot (used in 240V circuits, 3-way switches, or interconnected smoke detectors). NM cable is labeled by gauge and conductor count: '14/2' means 14-gauge wire with 2 conductors plus ground. '12/3' means 12-gauge with 3 conductors plus ground.",
          commonIssues: [
            "Backstab connections failing — push-in connections on outlets loosening over time",
            "Aluminum wiring (pre-1972 homes) — requires special connectors and outlets",
            "Knob-and-tube wiring — very old, no ground wire, insulation may be deteriorated",
            "Overloaded junction boxes — too many wires crammed in, creating heat"
          ],
          safetyTips: [
            "ALWAYS assume a wire is live until you've tested it with a voltage tester",
            "Never splice wires outside of a junction box — all connections must be accessible",
            "Use wire nuts rated for the number and gauge of wires being connected",
            "When in doubt about wire color or function, call an electrician"
          ],
          proTip: "When you open a junction box and see a white wire connected to a switch or marked with black tape, it's being used as a hot wire (called a 'switch leg'). This is legal but should be marked with black or red tape to indicate it's not a neutral. Always test — don't assume."
        }
      },
      {
        id: "elec-outlets",
        title: "Outlets & Switches",
        description: "The connection points you interact with daily",
        educationalContent: {
          whatIs: "Outlets (receptacles) provide connection points for plugging in devices. Standard 120V outlets have two vertical slots and a round ground hole. The taller slot is neutral, the shorter is hot, and the round hole is ground. Switches control the flow of electricity to lights and outlets. Understanding these helps you safely replace worn-out devices.",
          howItWorks: "Inside an outlet, the hot wire connects to the brass-colored screw, the neutral to the silver screw, and the ground to the green screw. When you plug something in, the prongs make contact with internal spring clips connected to these wires, completing the circuit. A standard single-pole switch simply breaks the hot wire — when off, no current flows to the fixture. Three-way switches (used in pairs for controlling a light from two locations) use a more complex arrangement with 'traveler' wires between them.",
          commonIssues: [
            "Outlet won't hold plugs — internal spring contacts worn out (replace the outlet)",
            "Outlet sparks when plugging in — normal if brief, concerning if sustained",
            "Switch buzzes — dimmer switch with incompatible bulb, or failing switch",
            "Only one outlet in a room works — others may be daisy-chained from the dead one"
          ],
          proTip: "If an outlet stops working, check three things before calling an electrician: 1) Is the breaker tripped? 2) Is there a GFCI outlet upstream that has tripped? (Check bathrooms, kitchen, garage, and exterior — one GFCI often protects multiple outlets.) 3) Is the outlet controlled by a wall switch?"
        }
      }
    ]
  }
];

// ═══════════════════════════════════════════════════
// CATEGORY DEFINITIONS
// ═══════════════════════════════════════════════════
export const categories: Category[] = [
  {
    id: "automotive",
    slug: "automotive",
    title: "Automotive",
    subtitle: "Vehicle Systems & Maintenance",
    description: "Learn how your car works from engine to brakes. Understand the systems that keep you safe on the road and how to identify common issues before they become expensive repairs.",
    color: "#B44D3E",
    colorLight: "#D4756A",
    image: IMAGES.automotive,
    icon: "Car",
    knowledgeTree: automotiveTree,
  },
  {
    id: "motorcycle",
    slug: "motorcycle",
    title: "Motorcycle",
    subtitle: "Two-Wheeled Mechanics",
    description: "Explore the mechanical systems unique to motorcycles — from engine configurations and chain drives to tire dynamics and clutch operation. Essential knowledge for every rider.",
    color: "#4B6A8A",
    colorLight: "#7A9AB8",
    image: IMAGES.motorcycle,
    icon: "Bike",
    knowledgeTree: motorcycleTree,
  },
  {
    id: "lawn-garden",
    slug: "lawn-garden",
    title: "Lawn & Garden",
    subtitle: "Outdoor Equipment & Care",
    description: "Master the equipment that keeps your outdoor spaces beautiful. From small engine maintenance to irrigation systems, learn to keep your tools running and your lawn thriving.",
    color: "#3D6B4F",
    colorLight: "#6B9B7F",
    image: IMAGES.lawnGarden,
    icon: "Trees",
    knowledgeTree: lawnGardenTree,
  },
  {
    id: "engine",
    slug: "engine",
    title: "Engine / Combustible",
    subtitle: "Internal Combustion Fundamentals",
    description: "Deep-dive into how combustion engines work — four-stroke, two-stroke, and diesel. Understand fuel systems, ignition, and the universal principles that power everything from lawnmowers to trucks.",
    color: "#8B5E3C",
    colorLight: "#B8896A",
    image: IMAGES.automotive,
    icon: "Cog",
    knowledgeTree: engineTree,
  },
  {
    id: "electrical",
    slug: "electrical",
    title: "Electrical",
    subtitle: "Home Electrical Systems",
    description: "Understand your home's electrical system from the breaker panel to every outlet. Learn about circuit breakers, wire types, safety practices, and how to identify common electrical issues.",
    color: "#D4A843",
    colorLight: "#E8C87A",
    image: IMAGES.electrical,
    icon: "Zap",
    knowledgeTree: electricalTree,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function findNodeById(nodes: KnowledgeNode[], id: string): KnowledgeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}
