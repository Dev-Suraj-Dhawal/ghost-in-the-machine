# 🤝 Contributing to Ghost in the Machine

Thank you for your interest in contributing to **Ghost in the Machine**! We welcome contributions that uphold the project's core principles: **Zero-Knowledge Privacy**, **Procedural Web Audio Artistry**, and **Ancestral Cultural Sanctity**.

---

## 🛠️ Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine.git
   cd ghost-in-the-machine
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Dev Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Verify TypeScript & Production Build**
   ```bash
   npm run build
   ```

---

## 🌿 Branch Naming Conventions

All contributions must originate from a dedicated feature branch with the appropriate category prefix:

| Prefix | Description | Example |
| :--- | :--- | :--- |
| `feat/` | New functionality or interactive components | `feat/investigator-radar-emf-visualizer` |
| `fix/` | Bug fixes, visual repairs, or acoustic adjustments | `fix/canvas-scale-retina-dpi` |
| `sec/` | Security patches, CSP headers, or sandbox hardening | `sec/enterprise-security-headers-and-hardening` |
| `docs/` | Architecture specs, guides, or API documentation | `docs/architectural-spec-and-security-model` |
| `chore/` | Dependency upgrades, build scripts, or CI workflows | `chore/upgrade-vite-and-eslint` |

---

## ✍️ Conventional Commit Specification

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
<type>(<optional scope>): <short summary in lowercase imperative>

[optional body explaining context and technical motivation]

[optional footer with issue references]
```

### Examples:
- `feat(audio): add solfeggio 528hz bell chime and master gain attenuation`
- `fix(canvas): resolve double border flourish clipping on high-dpi displays`
- `sec(headers): enforce strict content security policy and frame ancestors restriction`

---

## 📋 Pull Request Checklist

Before submitting a Pull Request, please ensure:

- [ ] `npm run build` passes with **0 errors** and **0 warnings**.
- [ ] No external audio files (.mp3, .wav) or third-party tracking scripts are introduced. All audio must remain procedural via Web Audio API.
- [ ] No remote telemetry or analytics libraries are added. All data must remain 100% client-side.
- [ ] Comments and docstrings are preserved and written clearly.
- [ ] PR title adheres to conventional commit syntax.
- [ ] PR description includes a detailed summary and verification steps.

---

## 📜 Code of Conduct

We are committed to providing a friendly, respectful, and harassment-free environment for all contributors, regardless of background, identity, or experience level. Treat all ancestral remembrances, cultural traditions, and community members with dignity.

