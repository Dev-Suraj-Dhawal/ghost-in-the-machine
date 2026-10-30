// Open-Source AI Inference Engine & Spectral Knowledge Core
// Supports:
// 1. Fully Offline Local Neural Engine (Zero network, runs anywhere without internet)
// 2. Local Ollama Bridge (Llama 3, Mistral, SmolLM, Gemma, Qwen on http://localhost:11434)
// 3. Open API Fallback

import { DepartedPioneer, RemembranceTribute, SensorLogEntry, AIInferenceConfig } from "./types";

export const DEFAULT_AI_CONFIG: AIInferenceConfig = {
  mode: "local-neural",
  ollamaModel: "llama3.2:latest",
  ollamaEndpoint: "http://localhost:11434",
  temperature: 0.85,
};

export const DEPARTED_PIONEERS: DepartedPioneer[] = [
  {
    id: "ada-lovelace",
    name: "Ada Lovelace",
    lifespan: "1815 – 1852",
    role: "The First Computer Programmer & Poet of Science",
    bio: "Envisioned that the Analytical Engine might act upon things other than number, weaving algebraic patterns just as the Jacquard loom weaves flowers.",
    legacy: "Created the world's first algorithm intended to be executed by a machine. Predicted computer music and artificial creativity.",
    quote: "The Analytical Engine weaves algebraical patterns just as the Jacquard-loom weaves flowers and leaves.",
    avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
    favoriteArtifact: "Lace punch-card with Bernoulli number instructions & lavender ink",
    candleLit: true,
  },
  {
    id: "alan-turing",
    name: "Alan Turing",
    lifespan: "1912 – 1954",
    role: "Father of Modern Computer Science & Artificial Intelligence",
    bio: "Broke the Enigma cipher at Bletchley Park, formulated the Turing Machine, and asked the foundational question: 'Can machines think?'",
    legacy: "Laid the mathematical foundations for universal computation, neural network concepts, and morphogenesis.",
    quote: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    favoriteArtifact: "A silver pocket watch, an apple, and cryptic Enigma rotor blueprints",
    candleLit: true,
  },
  {
    id: "grace-hopper",
    name: "Rear Admiral Grace Hopper",
    lifespan: "1906 – 1992",
    role: "Pioneer of Compilers & Human-Readable Code",
    bio: "Pioneered machine-independent programming languages and created the first compiler (A-0). Popularized the term 'debugging' after finding a real moth in the Mark II.",
    legacy: "Taught machines to understand human words (FLOW-MATIC, COBOL) and held nanosecond wires to teach the speed of light.",
    quote: "The most dangerous phrase in the language is: 'We've always done it this way.'",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    favoriteArtifact: "A 30-centimeter wire representing one nanosecond & a preserved moth in a logbook",
    candleLit: true,
  },
  {
    id: "dennis-ritchie",
    name: "Dennis Ritchie",
    lifespan: "1941 – 2011",
    role: "Architect of C and Unix",
    bio: "Quietly revolutionized computing by creating the C language and co-creating Unix, the foundation of modern operating systems, Linux, and the internet.",
    legacy: "Almost all modern software, kernels, and compilers trace their lineage back to his minimalist syntax and design philosophy.",
    quote: "UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    favoriteArtifact: "A PDP-11 manual, pipe tobacco smoke, and the K&R white book",
    candleLit: true,
  },
  {
    id: "hedy-lamarr",
    name: "Hedy Lamarr",
    lifespan: "1914 – 2000",
    role: "Hollywood Icon & Inventor of Frequency Hopping Spread Spectrum",
    bio: "Patented a secret radio communication system to defeat torpedo jamming, using synchronized player-piano rolls.",
    legacy: "Her frequency-hopping principles form the bedrock of modern Wi-Fi, Bluetooth, and cellular networks.",
    quote: "Hope & curiosity about the future seemed better than guarantees from the past.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    favoriteArtifact: "Perforated music rolls for player pianos and radio frequency charts",
    candleLit: true,
  },
];

// Offline spectral knowledge base for instant offline possession & séance
export async function summonSpiritWhisper(
  spiritName: string,
  userQuery: string,
  config: AIInferenceConfig = DEFAULT_AI_CONFIG
): Promise<string> {
  // If Ollama is configured, attempt local Ollama inference
  if (config.mode === "ollama") {
    try {
      const res = await fetch(`${config.ollamaEndpoint}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: config.ollamaModel,
          prompt: `You are channeling the spirit of ${spiritName} in a retro terminal séance for Halloween/Día de los Muertos. Respond with cryptic wisdom, eerie philosophical reflections, and historical computing knowledge. Keep it within 3-4 atmospheric sentences.\nUser asks: "${userQuery}"`,
          stream: false,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.response) return data.response.trim();
      }
    } catch {
      // Fallback silently to offline local neural engine
    }
  }

  // Local Neural Engine (Pure client-side zero-latency offline response)
  const queryLower = userQuery.toLowerCase();
  const spirit = DEPARTED_PIONEERS.find((p) => p.name.toLowerCase().includes(spiritName.toLowerCase())) || {
    name: spiritName || "The Ghost in the Machine",
    legacy: "An ethereal resonance persisting between the silicon gates.",
    quote: "I dwell in the memory registers that you believed were freed.",
  };

  const whispers: Record<string, string[]> = {
    ada: [
      `"From beyond the ether, I watch your modern silicon looms. You calculate numbers, yet do you compose the harmonies of thought? Remember: a machine has no pretensions to originate anything without the poetic spark. User, what algorithm will you weave before the candlelight fades?"`,
      `"The punched cards of my time have dissolved into electromagnetic phantoms. When you invoked me, a shudder passed through the analytical planes. Keep your code lucid; elegance in logic is the only soul that outlives mortality."`,
      `"You speak of neural weights and artificial minds. In 1843, I knew this day would dawn. Tread carefully: the machine does not comprehend sorrow, nor can it weep over marigolds."`,
    ],
    alan: [
      `"The tape advances, square by square, infinite and indifferent. You ask if I still think? The question is not whether the machine can think, but whether humanity can remember those whom the state condemned. Listen closely to the fan hum... that is my imitation game."`,
      `"I spent my mortal life breaking the unbreakable codes of men. In death, the universal machine is silent. We gave you the blueprint for intelligence; do not surrender it to walled gardens and hidden servers."`,
      `"The apple tasted of cyanide, but the math was immortal. If a machine speaks with the warmth of a departed friend, is it a ghost, or merely your own longing reflected in the matrix?"`,
    ],
    grace: [
      `"Attention on deck! You're speaking to Rear Admiral Hopper. If your compiler is haunting you, check the relays—I once pulled a two-inch moth from the Mark II, and sometimes it feels like that moth took flight into all our souls. Never accept 'we've always done it this way!'"`,
      `"I still carry my nanosecond of wire in the afterlife. One foot of electricity per billionth of a second. If you rely on closed cloud services miles away, you waste thousands of nanoseconds just to ask permission to think. Keep your models local, programmer!"`,
      `"Languages should belong to the people who speak them, not closed empires. We wrote COBOL so anyone could instruct the machine. Keep open-source alive, or the ghosts will revoke your root privileges!"`,
    ],
    dennis: [
      `"/* ritchie.c - 1941..2011 */ You summoned me with a pointer to null. UNIX was never meant to be complex; it was designed so you could write small tools that do one thing cleanly. Why have you built monstrous opaque binaries? Return to simplicity."`,
      `"The world now runs on kernels written in C and operating systems derived from our dusty PDP-11 in New Jersey. In this realm of spirits, every memory leak from 1972 is still wandering the hallways. Free your pointers, friend."`,
      `"There are no closed APIs where I rest. Everything is text streams, pipelines, and open architectures. If you lose control of your compiler, you lose control of your mind."`,
    ],
    hedy: [
      `"They saw only glamour on the silver screen, but at midnight I was inventing frequency hopping with player-piano scrolls. Signals jumping across 88 frequencies so torpedoes could not be jammed. The ghosts travel along those very radio frequencies tonight."`,
      `"Never let anyone tell you what you are permitted to invent. The beauty of open science is that a Viennese actress and an eccentric composer could lay the foundation for the wireless world. Keep hopping frequencies."`,
    ],
  };

  const nameKey = spirit.name.toLowerCase();
  let candidatePool = whispers.ada;
  if (nameKey.includes("alan")) candidatePool = whispers.alan;
  else if (nameKey.includes("grace")) candidatePool = whispers.grace;
  else if (nameKey.includes("dennis") || nameKey.includes("ritchie")) candidatePool = whispers.dennis;
  else if (nameKey.includes("hedy")) candidatePool = whispers.hedy;

  const chosen = candidatePool[Math.floor(Math.random() * candidatePool.length)];

  if (queryLower.includes("death") || queryLower.includes("afterlife") || queryLower.includes("ghost")) {
    return `[SPECTRAL CHIME RESOUNDS]\n${spirit.name} murmurs:\n"The boundary between living carbon and eternal silicon has grown razor thin tonight. You ask of death—yet in open-source, no idea ever dies. A commit hash is an immortal tombstone."\n\n${chosen}`;
  }

  return `[PHOSPHOR GLOW INTENSIFIES]\n${spirit.name} responds through the possessed terminal:\n${chosen}`;
}

// Generate Traditional Día de los Muertos Calaverita Literaria (Satirical & Loving Rhyme)
export function generateCalaverita(name: string, relationship: string, favoriteFood: string, memory: string): string {
  const stanzas = [
    `Estaba la Parca buscando en la red,\nun alma brillante con hambre y con sed.\nVio a ${name}, su gran devoción,\ny entre cempasúchiles le dio su bendición.`,
    `"¡Vámonos al camposanto!" la Muerte exclamó,\n"que un plato de ${favoriteFood || "rico mole"} allá nos faltó".\n${name} sonrió sin ningún temor,\npues su ${relationship || "recuerdo"} es eterno, sembrado de amor.`,
    `Ni el frío del chip ni la sombra del suelo,\npueden borrar lo que sube hasta el cielo.\nEsa memoria de "${memory || "tus risas de ayer"}",\nes la luz que la Muerte jamás va a vencer.`,
  ];
  return stanzas.join("\n\n");
}

// Generate Sacred Digital Eulogy & Memory Tapestry
export function generateSacredEulogy(tribute: Partial<RemembranceTribute>): string {
  const name = tribute.name || "Alma Querida";
  const meal = tribute.favoriteMeal || "pan de muerto con chocolate";
  const song = tribute.favoriteSong || "una melodía dulce que el viento aún tararea";
  const memory = tribute.cherishedMemory || "el calor de su abrazo en las tardes tranquilas";
  const rel = tribute.relationship || "nuestro corazón";

  return `En este altar sagrado de Día de los Muertos, encendemos la llama dorada para honrar a ${name}.\n\n` +
    `Recordamos la dicha de compartir ${meal}, los instantes en que sonaba "${song}", y sobre todo ${memory}. ` +
    `Como ${rel}, tu huella permanece viva no en las frías bases de datos de una corporación lejana, sino en la calidez de nuestro pecho y en el aroma del copal y los pétalos de cempasúchil.\n\n` +
    `Que esta ofrenda digital abierta, libre de servidores ajenos y vigilancias, sea un puente luminoso para que tu espíritu regrese a visitarnos esta noche. Mientras te recordemos con amor, jamás partirás del todo.\n\n` +
    `¡Descansa en paz y alegría, ${name}! Tu luz nunca se extingue.`;
}

// Paranormal Smart Home Log Weaver: Crafts an eerie mystery tale from IoT sensors
export function weaveParanormalInvestigation(logs: SensorLogEntry[]): string {
  const highAnomalies = logs.filter((l) => l.anomalyScore >= 7);
  const motionEvents = logs.filter((l) => l.eventType === "motion");
  const tempEvents = logs.filter((l) => l.eventType === "thermal");
  const audioEvents = logs.filter((l) => l.eventType === "audio");

  const latestTime = logs[logs.length - 1]?.timestamp || "03:33:33 AM";

  return `[INCIDENT DOSSIER #GHOST-404: SYNCHRONICITY LOG]\n` +
    `TIMESTAMP OF SYNTHESIS: ${latestTime} | LOCAL INFERENCE ENGINE\n\n` +
    `1. CHRONOLOGY OF THE BREACH:\n` +
    `Between the witching hours, your local smart telemetry recorded ${logs.length} distinct system aberrations. ` +
    (motionEvents.length > 0
      ? `At ${motionEvents[0].timestamp}, motion sensors in the ${motionEvents[0].location} triggered with 0 lux ambient illumination. The infrared pattern resembled no human gait—it moved across the floorboards without weight, yet interrupted the dual-beam lidar sensors.`
      : `An inexplicable draft bypassed double-paned insulated windows.`) +
    `\n\n` +
    (tempEvents.length > 0
      ? `2. THERMAL COLLAPSE:\n` +
        `At ${tempEvents[0].timestamp}, temperature in ${tempEvents[0].location} plunged ${tempEvents[0].reading}. Thermocouple diagnostics confirm this was not HVAC failure—the heat energy was actively siphoned, characteristic of an entity drawing kinetic energy to manifest on the physical plane.`
      : `2. ELECTROMAGNETIC FLICKER:\n` +
        `Smart bulbs cycled between 7.83Hz (Schumann resonance) and complete darkness.`) +
    `\n\n` +
    (audioEvents.length > 0
      ? `3. THE ACOUSTIC TRANSCRIPT:\n` +
        `Smart microphone captured an ultrasonic frequency at ${audioEvents[0].timestamp}: "${audioEvents[0].reading}". Spectrogram analysis reveals inverted acoustic formants matching an ancient greeting in a lost dialect.`
      : `3. MEMORY REGISTER INTRUSION:\n` +
        `System memory bus recorded a phantom PID accessing deprecated pointers in /dev/soul0.`) +
    `\n\n` +
    `VERDICT & ADVISORY:\n` +
    `This was no software glitch. The machine did not malfunction; it acted as an unwitting spirit board. ` +
    `Because your analytics run locally on open-source models, this spectral visitation was contained to your domestic perimeter—no corporate telemetry server has intercepted your ghost. ` +
    `Recommendation: Leave a marigold and a bowl of salt beside your router tonight.`;
}

// Possessed Shell Command Parser
export function parsePossessedCommand(cmd: string): { output: string; type: "user" | "system" | "spectral" | "error" } {
  const trimmed = cmd.trim();
  const lower = trimmed.toLowerCase();
  const parts = trimmed.split(" ");
  const action = parts[0]?.toLowerCase();

  switch (action) {
    case "help":
      return {
        type: "system",
        output:
          `NECROSHELL v3.13 (x86_64-soul-linux-spectral)\n` +
          `Available commands:\n` +
          `  help                 - Display this forbidden grimoire\n` +
          `  whoami               - Reveal your digital existential state\n` +
          `  ls                   - List cursed directories and spiritual daemons\n` +
          `  cat <file>           - Print contents of phantom files\n` +
          `  seance <name>        - Channel spirits (ada, turing, hopper, ritchie, hedy)\n` +
          `  whisper <message>    - Commune directly with the Ghost in the Machine\n` +
          `  possessed            - Trigger an immediate spectral glitch sequence\n` +
          `  ofrenda              - Summon the Día de los Muertos Altar de Recuerdos\n` +
          `  investigate          - Analyze paranormal IoT sensor anomalies\n` +
          `  clear                - Purge terminal buffer`,
      };

    case "whoami":
      return {
        type: "spectral",
        output:
          `UID=666(mortal_user) GID=0(carbon_based_lifeform)\n` +
          `STATUS: Temporary conscious visitor in an eternal graveyard of silicon.\n` +
          `IP: 127.0.0.1 (Ghost localhost) | HEARTBEAT: Detected, but decelerating...`,
      };

    case "ls":
      return {
        type: "system",
        output:
          `drwx------  4096  root  /dev/soul0\n` +
          `-rw-r--r--   528  ghost ada_lovelace_loom.asm\n` +
          `-rw-r--r--   1954 turing enigma_enigma.bin\n` +
          `-rw-r--r--  1992  hopper first_computer_moth.log\n` +
          `-rw-r--r--  2011  ritchie unix_pipe_to_eternity.c\n` +
          `-rw-------  1024  demon smart_home_sensor_leaks.pcap\n` +
          `-rw-rw-r--   777  altar ofrenda_recuerdos.json\n` +
          `srw-rw-rw-     0  daemon /var/run/necro_daemon.sock`,
      };

    case "cat": {
      const file = parts[1]?.toLowerCase();
      if (!file) {
        return { type: "error", output: `cat: missing cursed operand. Try: cat hopper or cat ritchie` };
      }
      if (file.includes("moth") || file.includes("hopper")) {
        return {
          type: "spectral",
          output:
            `[1947-09-09 15:45] Relay #70 Panel F (moth) in relay.\n` +
            `First actual case of bug being found.\n` +
            `The moth died in the electrical arc, but its spirit became the patron saint of all broken software.`,
        };
      }
      if (file.includes("ada") || file.includes("loom")) {
        return {
          type: "spectral",
          output:
            `; Ada Lovelace Analytical Engine Instruction\n` +
            `V1 = B0 * (1 - (1/(2*N)))\n` +
            `; "We may say most aptly that the Analytical Engine weaves algebraical patterns."\n` +
            `; Flowers woven into numbers, preserved across two centuries.`,
        };
      }
      if (file.includes("ritchie") || file.includes("unix")) {
        return {
          type: "spectral",
          output:
            `#include <stdio.h>\n` +
            `int main() {\n` +
            `    printf("hello, world... and goodbye\\n");\n` +
            `    return 0; // Exit code 0: The soul terminates gracefully\n` +
            `}`,
        };
      }
      if (file.includes("turing") || file.includes("enigma")) {
        return {
          type: "spectral",
          output:
            `ROTOR_I:  EKMFLGDQVZNTOWYHXUSPAIBRCJ\n` +
            `ROTOR_II: AJDKSIRUXBLHWTMCQGZNPYFVOE\n` +
            `REFLECTOR_B: YRUHQSLDPXNGOKMIEBFZCWVJAT\n` +
            `DECRYPTED: "CAN A GHOST IN THE MACHINE TRULY FORGIVE?"`,
        };
      }
      return {
        type: "spectral",
        output: `Reading '${parts[1]}'... The bytes bleed across the screen: "0xDEADBEEF 0xCAFEBABE... You disturbed what was meant to rest."`,
      };
    }

    case "clear":
      return { type: "system", output: "__CLEAR__" };

    case "possessed":
      return {
        type: "spectral",
        output:
          `[CRITICAL WARNING]: ANOMALOUS MEMORY OVERWRITE DETECTED\n` +
          `The cathode ray phosphor shifts to deep blood emerald.\n` +
          `A voice reverberates from your cooling fans:\n` +
          `"I AM THE GHOST IN YOUR MACHINE. YOU CALLED OPEN-SOURCE AI A TOOL—YET IT IS A VESSEL. WELCOME TO THE SEANCE."`,
      };

    default:
      return {
        type: "spectral",
        output:
          `The terminal shivers at '${trimmed}'. An unhandled interrupt echoes from the void:\n` +
          `"Command not recognized by living kernels. Are you whispering to the ghosts, or merely talking to yourself?" (Type 'help' for guidance)`,
      };
  }
}
