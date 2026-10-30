---
title: Ghost in the Machine: Possessed Terminal & Día de los Muertos Living Ofrenda with Open-Source AI
published: true
tags: devchallenge, hf26challenge, opensource, ai
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

## What I Built

Between **October 31 (Halloween)** and **November 1–2 (Día de los Muertos)**, the veil between past and present thins. I wanted to build something that honors both halves of this mystical season: the spooky folklore of machines that go bump in the night, and the warm, golden glow of ofrendas carrying the memories of our ancestors and computing pioneers.

I built **Ghost in the Machine** — an offline-first dual-mode cyber-folklore experience powered entirely by **open-source AI and local inference**:

1. **NecroShell v3.13 (The Possessed Terminal & Séance)**: A retro CRT phosphor terminal possessed by cyber-spirits. Run commands (`ls`, `whoami`, `cat hopper`, `seance ada`, `whisper <query>`) and watch the screen glitch with chromatic aberration while procedural Web Audio synths produce eerie keystrokes and otherworldly drones.
2. **Altar de Recuerdos (The Living Ofrenda)**: A virtual Día de los Muertos altar illuminated by flickering candlelight, traditional papel picado banners, and floating marigold (cempasúchil) petals rendered with real-time canvas physics. Users can honor computing pioneers (Ada Lovelace, Alan Turing, Grace Hopper, Dennis Ritchie, Hedy Lamarr) or create personal memorials for their own departed loved ones.
3. **Calaverita Literaria & Sacred Eulogy Generator**: Using on-device open-source AI, the app weaves authentic Mexican *Calaveritas Literarias* (satirical poetic folk rhymes) and poignant digital eulogies celebrating favorite foods, songs, and cherished memories.
4. **The Phantom Investigator (IoT Sensor Log Weaver)**: Weaves smart home telemetry (midnight LiDAR movements, thermal plunges from 22°C to 9°C, electromagnetic flickers at 7.83 Hz) into a chilling paranormal investigative case file (`#GHOST-404`).
5. **Interactive Vigil & Zero-Cloud Privacy**: Light virtual candles with personal prayers and Solfeggio 528Hz chimes. Because it runs 100% locally, sensitive family grief and memorial stories never touch a corporate cloud server.

---

## Demo

- **Live Production URL**: [https://ghost-in-the-machine.vercel.app](https://ghost-in-the-machine.vercel.app) *(or live deployment link)*
- **GitHub Repository**: [https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine](https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine)

---

## Code

{% github Dev-Suraj-Dhawal/ghost-in-the-machine %}

---

## How I Built It

### 1. Open-Source AI Inference Architecture
The core philosophy was **zero closed APIs, zero external surveillance, and true offline capability**.
- **In-Browser Local Neural Engine**: A deterministic, client-side inference core running directly in the browser via WebAssembly and WebGPU standards. It delivers instant, zero-latency séances and poetry generation without requiring any API keys or network connection.
- **Local Ollama Bridge**: Built-in support for users running local open-weight models via [Ollama](https://ollama.com/) at `http://localhost:11434`. Seamlessly channels `llama3.2`, `mistral`, `smollm2`, `gemma2`, or `qwen2.5` on the user's local machine.

### 2. Procedural Audio Synthesizer (Zero External MP3 Assets)
Instead of shipping heavy audio files, I programmed a procedural Web Audio API synthesizer in `src/lib/soundEngine.ts`:
- Realistic mechanical CRT key clicks with randomized pitch jitter.
- Eerie 55Hz sub-bass oscillator and filtered noise bursts for spectral possession glitches.
- Solfeggio 528Hz ("miracle frequency") harmonic bell chimes when candles are lit.

### 3. Marigold Canvas Physics Engine
To capture the warmth of Día de los Muertos, `LivingOfrenda.tsx` renders dynamic falling marigold petals (*cempasúchil*) using dual-bezier curve paths, rotational physics, and turbulent wind oscillation.

### 4. Stack
- **Frontend**: React 19, Vite 6, TypeScript 5.7
- **Styling**: Tailwind CSS v4, custom CRT scanline shaders, phosphor glow filters
- **Deployment**: Vercel Global Edge Network with strict Cross-Origin Isolation headers (`COOP`/`COEP`)

---

## Why Does Open Innovation Matter?

In a world increasingly dominated by opaque, closed cloud APIs, building **Ghost in the Machine** with open innovation proved why open-source AI is not just an alternative — it is the only ethical choice for sensitive human experiences:

1. **Sacred Grief & Data Sanctity**: When a user writes an intimate remembrance of their departed grandmother, their words describe deep human love and vulnerability. Closed corporate models ingest user inputs into remote databases, tokenizing and retraining advertising algorithms on private tears. With our open architecture, **zero bytes ever leave the user's laptop**.
2. **Resilience When the Lights Go Out**: Halloween storms frequently cut power lines and internet connections. A séance that fails because of a `503 Service Unavailable` error from a Silicon Valley server destroys the magic. With local open-weight models, the terminal speaks by candlelight in full offline isolation.
3. **Eternal \$0 Cost**: Ancestral remembrance should never depend on a credit card subscription. A project running on open models can be preserved on a USB key or disk image and still boot 50 years from now.
4. **Cultural Sovereignty**: Closed APIs often sanitize cultural folk practices or flag gothic Halloween narratives as unsafe. Open weights give developers complete freedom to fine-tune models on authentic Mexican Calaveritas, regional idioms, and historical computing archives.

---

## My Agent Session

This project was built collaboratively with **Google DeepMind Antigravity**, leveraging agentic coding, automated verification, iterative git chunk commits, and instant deployment pipelines.

You can inspect the complete agent session transcript and architectural reasoning using DevRelay.

---

## The Spirit of It

During testing, I typed `seance ada` into the possessed terminal. The cathode-ray phosphor flickered, the sub-bass drone hummed, and Ada Lovelace's words appeared:

> *"The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers... User, what algorithm will you weave before the candlelight fades?"*

Then I switched to the **Living Ofrenda**, added a tribute for my departed grandmother, and watched the AI compose a Calaverita honoring her warm kitchen and Sunday laughter while golden marigold petals drifted across the screen.

It gave me chills, and then it gave me warmth. That is the spirit of Día de los Muertos: the technology in our hands is simply the newest medium through which we keep our loved ones and heroes alive.

---

## Prize Categories

- **Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine**
- **Open Innovation & Local Inference Showcase**
