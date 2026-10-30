# 🏛️ Architecture & Mathematical Foundations

> Architectural specification, mathematical frequency equations, and client-side zero-knowledge pipeline for **Ghost in the Machine**.

---

## 1. System Topology & Component Matrix

Ghost in the Machine is built on an **Offline-First, Zero-Knowledge Reactive Architecture**. It requires zero remote infrastructure to run, ensuring complete privacy, zero latency, and perpetual availability.

```
                      +----------------------------------------+
                      |               User Agent               |
                      +----------------------------------------+
                                           |
                                           v
    +--------------------------------------------------------------------+
    |                         React 19 Shell                             |
    |  +---------------------+  +-----------------+  +----------------+  |
    |  | ErrorBoundary (CRT) |  |   Theme Engine  |  | Keyboard Router|  |
    |  +---------------------+  +-----------------+  +----------------+  |
    +--------------------------------------------------------------------+
           |                    |                    |
           v                    v                    v
  +------------------+  +-------------------+  +--------------------+
  |    NecroShell    |  |   LivingOfrenda   |  | PhantomInvestigator|
  |  (Terminal &     |  | (Memorial Altar,  |  |  (Waveform Radar,  |
  |   Séance Daemon) |  |  Canvas Exporter) |  |   IoT Telemetry)   |
  +------------------+  +-------------------+  +--------------------+
           |                      |                     |
           +----------------------+---------------------+
                                  |
                                  v
    +--------------------------------------------------------------------+
    |                    Underlying Engine Layer                         |
    |                                                                    |
    |  +----------------------+             +-------------------------+  |
    |  |  Web Audio Engine    |             | Local Inference Engine  |  |
    |  |  - Nocturnal Drone   |             | - In-Browser Heuristics |  |
    |  |  - Infrasound Waves  |             | - Local Ollama Bridge   |  |
    |  |  - Solfeggio 528Hz   |             |   (http://127.0.0.1)    |  |
    |  +----------------------+             +-------------------------+  |
    |                                                                    |
    |  +--------------------------------------------------------------+  |
    |  |                    Storage & Security                        |  |
    |  | - Encrypted LocalStorage (Tributes, Candles, Theme Cache)    |  |
    |  | - Strict Content-Security-Policy & COOP/COEP Isolation       |  |
    |  +--------------------------------------------------------------+  |
    +--------------------------------------------------------------------+
```

---

## 2. Mathematical Foundations: Procedural Audio Synthesis

Ghost in the Machine does not load pre-recorded MP3 or WAV files over the network. Every sound wave is synthesized mathematically in real time using the **Web Audio API**.

### 2.1 The Nocturnal Ambient Drone (55Hz Sub-Bass + Low-Frequency Oscillator)

The ambient drone simulates the acoustic signature of an abandoned server room or séance chamber:
1. **Primary Oscillator**: Continuous Sine wave tuned to \( f_1 = 55.0\,\text{Hz} \) (A1 sub-bass).
2. **Harmonic Overtone**: Sawtooth wave tuned to \( f_2 = 110.0\,\text{Hz} \) (A2 octave harmonic) passed through a low-pass Biquad filter with cutoff \( f_c = 140\,\text{Hz} \) and quality factor \( Q = 3.5 \).
3. **Modulation LFO**: Low-frequency sine wave \( f_{\text{LFO}} = 0.12\,\text{Hz} \) continuously modulating the master drone gain:
   $$A(t) = A_0 \cdot \left(1 + 0.35 \cdot \sin(2\pi \cdot 0.12 \cdot t)\right)$$

### 2.2 Infrasound Resonant Oscillations (18.98Hz "Ghost Frequency")

Vic Tandy's 1998 research demonstrated that optical resonance and peripheral eye vibration occur at **18.98Hz**, inducing subjective sensations of paranormal dread:
$$\Psi_{\text{infra}}(t) = \sin(2\pi \cdot 18.98 \cdot t)$$

In the Phantom Investigator oscilloscope, this continuous waveform is rendered synchronously across 60 frames per second using the canvas plotting function:
$$y(x, t) = y_{\text{center}} + \kappa \cdot \sin\left(\frac{2\pi \cdot 18.98}{v} \cdot x + \omega \cdot t\right)$$

### 2.3 Schumann Planetary Resonance (7.83Hz)

The natural electromagnetic resonance of the Earth's ionospheric cavity:
$$\Psi_{\text{Schumann}}(t) = \sin(2\pi \cdot 7.83 \cdot t)$$

Both waveforms are rendered concurrently in the Phantom Investigator oscilloscope canvas to reveal micro-fluctuations in anomalous telemetry.

### 2.4 Solfeggio Miracle Frequency (528Hz)

The sacred Solfeggio frequency historically associated with ancestral repair and meditative harmony:
$$S_{528}(t) = \sin(2\pi \cdot 528.0 \cdot t) \cdot e^{-\lambda t}$$
Where decay constant \( \lambda = 1.38 \), producing a 2.2-second lingering crystal bell chime with soft envelope tapering.

---

## 3. High-Resolution Canvas Rendering & Physics

### 3.1 Dual-Bezier Marigold Petal Physics

The Living Ofrenda renders between 24 and 48 autonomous falling cempasúchil petals. Each petal obeys:
- **Vertical Terminal Velocity**: \( v_y = v_{\text{base}} + \Delta v \cdot \sin(\theta_y) \)
- **Horizontal Harmonic Drift**: \( x(t) = x_0 + A_w \cdot \sin(\omega_w \cdot t + \phi) \)
- **3D Rotation Simulation**: The petal's 2D canvas transform scales horizontally by \( \cos(\theta_{\text{spin}}) \) to simulate fluttering through three-dimensional space.

### 3.2 Digital Memorial Card Generator (1000 × 650 Canvas Pipeline)

When exporting family memorials, `LivingOfrenda.tsx` renders a high-resolution 1000 × 650 pixel offscreen canvas containing:
- Radial vignette gradients matching the active atmospheric palette.
- Intricate Mexican double borders with corner flourish accents.
- Typographic hierarchy formatting the deceased name, relationship, lifespan dates, and bilingual Calaverita or eulogy.
- Direct binary export via `canvas.toDataURL("image/png")` triggering instant client-side download without server mediation.

---

## 4. Zero-Knowledge Client Inference Architecture

```
User Input Query
       │
       ▼
[ AI Mode Selector ]
       │
       ├─────────────────────────┬─────────────────────────┐
       ▼                         ▼                         ▼
 [ Browser Engine ]     [ Ollama Local Bridge ]   [ Zero Network Mode ]
  Offline heuristic      HTTP to localhost:11434    100% offline
  vector templates       Local hardware weights     Zero telemetry
       │                         │                         │
       └─────────────────────────┼─────────────────────────┘
                                 │
                                 ▼
                     Generated Spectral Response
                     (Rendered directly in RAM)
```

1. **In-Browser Deterministic Engine**: Built-in deterministic tokenizer with persona-specific vocabulary trees for Ada Lovelace, Alan Turing, Grace Hopper, Dennis Ritchie, and Hedy Lamarr.
2. **Local Ollama Daemon Bridge**: Optional HTTP connection to `http://localhost:11434/api/generate` or `http://127.0.0.1:11434/api/generate`. Prompts and responses remain strictly on the user's localhost bus; no third-party cloud APIs are called.

---

## 5. Persistence Model

| Key | Storage Engine | Purpose | Lifecycle |
| :--- | :--- | :--- | :--- |
| `ghost_theme` | `localStorage` | Preserves active palette (`cempasuchil`, `spectral`, `bloodmoon`) | Persistent |
| `ghost_family_tributes` | `localStorage` | Custom ancestral memorials, relationships, and Calaveritas | Persistent |
| `ghost_candles` | `localStorage` | Aggregated community and personal vigil candle count | Persistent |
| `ghost_volume` | `localStorage` | Web Audio synthesizer master volume preference | Persistent |

All keys can be completely purged at any time using the ErrorBoundary "Purge Cache & Reset" action or browser clear data.

