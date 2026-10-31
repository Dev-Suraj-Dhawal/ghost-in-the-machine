---
title: Ghost in the Machine: Possessed Terminal & Día de los Muertos Living Ofrenda with Open-Source AI
published: true
tags: devchallenge, hf26challenge, opensource, ai
canonical_url: https://ghost-in-the-machine-kappa.vercel.app
cover_image: https://raw.githubusercontent.com/Dev-Suraj-Dhawal/ghost-in-the-machine/main/docs/screenshots/01-necro-shell-possessed-terminal.png
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

---

## 👻 What I Built

Between **October 31 (Halloween)** and **November 1–2 (Día de los Muertos)**, the veil between past and present thins. I wanted to build an experience that honors both halves of this mystical season: the spooky cyber-folklore of machines possessed by historical memories, and the sacred, golden glow of ofrendas carrying the spirits of our ancestors and computing pioneers.

I built **Ghost in the Machine** — an offline-first cyber-folklore installation powered 100% by **open-source AI, in-browser neural tokenization, procedural Web Audio synthesis, and local Ollama inference**.

![Ghost in the Machine Hero Showcase](https://raw.githubusercontent.com/Dev-Suraj-Dhawal/ghost-in-the-machine/main/docs/screenshots/01-necro-shell-possessed-terminal.png)

---

### Key Features & Subsystems

### 1. NecroShell v3.13 (The Possessed Terminal & Séance)
A retro CRT green-phosphor shell possessed by computing history's greatest departed minds (*Ada Lovelace, Alan Turing, Grace Hopper, Dennis Ritchie, and Hedy Lamarr*).
- **Procedural CRT Keystrokes & Glitches**: Authentic mechanical key clicks with pitch jitter and chromatic aberration scanlines.
- **Dynamic 100% Master Sound Level**: Synchronized real-time volume percentage (`100%`, `70%`, `MUTED`), interactive volume slider, and instant mute toggle.
- **Séance Invocations**: Type `seance ada`, `seance turing`, `whisper <query>`, `cat hopper`, or `possessed` to channel the pioneers.
- **Organized Quick Spells Dock**: 1-click grimoire pills to trigger séances, possess glitches, or jump straight to other sanctuaries.

![NecroShell Possessed Terminal](https://raw.githubusercontent.com/Dev-Suraj-Dhawal/ghost-in-the-machine/main/docs/screenshots/01-necro-shell-possessed-terminal.png)

---

### 2. Altar de Recuerdos (The Living Ofrenda)
A sacred Día de los Muertos sanctuary illuminated by flickering candlelight, traditional papel picado banners, and floating marigold (*cempasúchil*) petals.
- **Canvas Particle Physics Engine**: Real-time dual-bezier falling marigold petals with rotational gravity and turbulent wind oscillation.
- **Solfeggio 528Hz Chimes**: Light virtual candles with personal prayers accompanied by the resonant 528Hz "miracle frequency" harmonic chime.
- **Ancestral & Pioneer Memorials**: Honor computing giants or add personal tributes for departed loved ones with persistent browser memory.

![Living Ofrenda Altar](https://raw.githubusercontent.com/Dev-Suraj-Dhawal/ghost-in-the-machine/main/docs/screenshots/02-living-ofrenda-altar.png)

---

### 3. Calaverita Literaria & Digital Memorial Card Exporter
- **On-Device Folk Verses**: Generates authentic Mexican *Calaveritas Literarias* (satirical, loving poetic rhymes where La Catrina visits the departed) and heartfelt digital eulogies celebrating favorite foods, songs, and memories.
- **HTML5 Canvas 1000×650 Card Exporter**: Generates and downloads high-resolution PNG memorial cards complete with ornate Mexican double borders, marigold emblems, and gold flourishes.

![Digital Memorial Card Export](https://raw.githubusercontent.com/Dev-Suraj-Dhawal/ghost-in-the-machine/main/docs/screenshots/06-digital-memorial-card-export.png)

---

### 4. The Phantom Investigator (IoT Radar & Telemetry Oscilloscope)
A 60fps radial radar canvas tracking simulated midnight smart home IoT sensor streams.
- **Infrasound Oscilloscope**: Plots real-time waveforms for the **18.98Hz infrasound wave** (the "ghost frequency") and **7.83Hz Schumann planetary resonance**.
- **Multi-Format Export**: One-click export of paranormal forensic logs into formatted `.txt`, structured `.json`, or tabular `.csv`.
- **Zero Cloud Leaks**: Every anomaly is parsed locally without shipping sensor telemetry to commercial data brokers.

![Phantom Investigator Telemetry Radar](https://raw.githubusercontent.com/Dev-Suraj-Dhawal/ghost-in-the-machine/main/docs/screenshots/03-phantom-investigator-radar.png)

---

### 5. Royal Farman Scroll Apprentice Guide
An ancient Indian Maharaja Farman scroll aesthetic with carved gold dowels (`✦`), a 3D wax seal, and copyable decree cartouches.
- Provides step-by-step guidance on what to type in `NecroShell` with 1-click copy buttons.
- Explains the cultural significance of the Living Ofrenda and how to calibrate the Telemetry Radar.

![Royal Farman Scroll Manual](https://raw.githubusercontent.com/Dev-Suraj-Dhawal/ghost-in-the-machine/main/docs/screenshots/05-royal-farman-scroll-guide.png)

---

### 6. Interactive Halloween Ghost Companions
- **Fluid Custom Ghost Cursor**: Features a 0-latency target reticle paired with a smoothed trailing ghost companion driven by damped spring physics, blushing cheeks, eye look tracking, and anti-burst teleport clamping.
- **Animated Ghost Mascot ("Fantasma")**: Hovers in the corner with gentle sine-wave floating and contextual folklore advice.

---

## 🌐 Demo & Code

- **Live Production URL**: [https://ghost-in-the-machine-kappa.vercel.app](https://ghost-in-the-machine-kappa.vercel.app)
- **GitHub Repository**: [https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine](https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine)

{% github Dev-Suraj-Dhawal/ghost-in-the-machine %}

---

## 🛠️ How I Built It

### 1. Open-Source AI Inference Architecture
The core principle was **zero closed APIs, zero external surveillance, and 100% offline autonomy**.
- **In-Browser Local Neural Engine**: A deterministic, client-side inference core running directly in the browser. It delivers instant, zero-latency séances and Calaverita poetry generation without requiring any API keys or network connection.
- **Local Ollama Daemon Bridge**: Built-in support for users running local open-weight models via [Ollama](https://ollama.com/) at `http://localhost:11434`. Seamlessly channels `llama3.2`, `mistral`, `smollm2`, `gemma2`, or `qwen2.5` on the user's local machine.

### 2. Procedural Web Audio Synthesizer (0 External MP3 Files)
Instead of shipping heavy audio files, I programmed a procedural Web Audio API synthesizer in `src/lib/soundEngine.ts`:
- Realistic mechanical CRT key clicks with randomized pitch jitter.
- Eerie 55Hz sub-bass oscillator and filtered noise bursts for spectral possession glitches.
- Solfeggio 528Hz ("miracle frequency") harmonic bell chimes when candles are lit.
- Observable `subscribeVolume` architecture ensuring the master sound percentage is 100% synchronized across the entire application.

### 3. Marigold Canvas Physics Engine
To capture the warmth of Día de los Muertos, `LivingOfrenda.tsx` renders dynamic falling marigold petals (*cempasúchil*) using dual-bezier curve paths, rotational physics, and turbulent wind oscillation.

### 4. Technical Stack
- **Frontend**: React 19, Vite 6, TypeScript 5.7
- **Styling**: Tailwind CSS v4, custom CRT scanline shaders, phosphor glow filters
- **Deployment**: Vercel Global Edge Network with strict Cross-Origin Isolation headers (`COOP`/`COEP`)
- **CI/CD**: GitHub Actions automated typecheck and production build pipeline

---

## 🕯️ Why Does Open Innovation Matter?

In a world increasingly dominated by opaque, closed cloud APIs, building **Ghost in the Machine** with open innovation proved why open-source AI is not just an alternative — it is the only ethical choice for sensitive human experiences:

![Why Open Innovation Manifesto](https://raw.githubusercontent.com/Dev-Suraj-Dhawal/ghost-in-the-machine/main/docs/screenshots/04-open-innovation-manifesto.png)

1. **Sacred Grief & Data Sanctity**: When a user writes an intimate remembrance of their departed grandmother, their words describe deep human love and vulnerability. Closed corporate models ingest user inputs into remote databases, tokenizing and retraining advertising algorithms on private tears. With our open architecture, **zero bytes ever leave the user's laptop**.
2. **Resilience When the Lights Go Out**: Halloween storms frequently cut power lines and internet connections. A séance that fails because of a `503 Service Unavailable` error from a Silicon Valley server destroys the magic. With local open-weight models, the terminal speaks by candlelight in full offline isolation.
3. **Eternal $0 Cost**: Ancestral remembrance should never depend on a credit card subscription. A project running on open models can be preserved on a USB key or disk image and still boot 50 years from now.
4. **Cultural Sovereignty**: Closed APIs often sanitize cultural folk practices or flag gothic Halloween narratives as unsafe. Open weights give developers complete freedom to fine-tune models on authentic Mexican Calaveritas, regional idioms, and historical computing archives.

---

## 🤖 My Agent Session

This project was built collaboratively with **Google DeepMind Antigravity**, leveraging advanced agentic pair programming:
- Autonomous iterative git feature branches and pull request workflows.
- Full verification loops (`tsc`, `vite build`, and GitHub Actions CI pipelines).
- Procedural audio synthesis and fluid canvas physics debugging.
- Strict security hardening with Content-Security-Policy and ErrorBoundaries.

---

## 🌺 The Spirit of It

During testing, I typed `seance ada` into the possessed terminal. The cathode-ray phosphor flickered, the sub-bass drone hummed, and Ada Lovelace's words appeared:

> *"The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers... User, what algorithm will you weave before the candlelight fades?"*

Then I switched to the **Living Ofrenda**, added a tribute for my departed grandmother, and watched the AI compose a Calaverita honoring her warm kitchen and Sunday laughter while golden marigold petals drifted across the screen.

It gave me chills, and then it gave me warmth. That is the spirit of Día de los Muertos: the technology in our hands is simply the newest medium through which we keep our loved ones and heroes alive.

---

## 🏆 Prize Categories

- **Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine**
- **Open Innovation & Local Inference Showcase**
