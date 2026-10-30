# 🛡️ Security Policy & Threat Model

> Comprehensive security specifications, threat models, and vulnerability disclosure policies for **Ghost in the Machine**.

---

## 1. Zero-Leakage Architecture & Threat Model

Ghost in the Machine processes sacred ancestral memories, personal tributes, and synthetic IoT telemetry. Traditional cloud architectures ingest these sensitive strings into commercial model training sets or external log processors. 

Our threat model operates under the principle of **Cryptographic and Architectural Zero-Knowledge**:

| Threat Vector | Mitigation Strategy | Implementation |
| :--- | :--- | :--- |
| **Grief & Family Data Ingestion** | Zero cloud database; zero external analytics or trackers. | All tributes are stored solely in the user's browser `localStorage` or held ephemerally in RAM. |
| **Model Weight Poisoning** | Sandboxed local inference models. | Supports local offline heuristic engine or user-managed local [Ollama](https://ollama.com) instances over `127.0.0.1`. |
| **Cross-Origin Script Hijacking (XSS)** | Strict Content Security Policy (CSP) and React automatic contextual escaping. | Restricts origins to `'self'` and local development ports. No untrusted CDN scripts or third-party tracking scripts. |
| **Clickjacking & UI Redressing** | Frame embedding prohibition. | Enforces `X-Frame-Options: DENY` and `frame-ancestors 'none'`. |
| **Spectre / Meltdown Timing Attacks** | Process isolation headers. | Configures `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: credentialless`. |
| **Hardware Device Fingerprinting** | Restrictive Permissions Policy. | Disables all unauthorized device APIs: `camera=()`, `microphone=()`, `geolocation=()`, `browsing-topics=()`. |

---

## 2. HTTP Security Headers Matrix

The edge server configuration in `vercel.json` enforces enterprise defense-in-depth headers on all routes:

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' http://localhost:* http://127.0.0.1:*; media-src 'self' blob: data:; object-src 'none'; frame-ancestors 'none';"
}
```

- **`Strict-Transport-Security`**: `max-age=63072000; includeSubDomains; preload` (forces HTTPS for 2 years).
- **`X-Content-Type-Options`**: `nosniff` (prevents MIME-type confusion attacks).
- **`Referrer-Policy`**: `strict-origin-when-cross-origin` (prevents leaking query params or session state).
- **`Permissions-Policy`**: Disallows hardware sensor snooping (`camera=()`, `microphone=()`, `geolocation=()`).

---

## 3. Client-Side Input Sanitization & Local Storage Hygiene

1. **HTML Canvas Export Safety**: Generated tribute cards render user inputs through native Canvas 2D text rendering API (`fillText`), preventing raw HTML injection or script execution inside rendered images.
2. **Dynamic Log Downloads**: Telemetry exports (.txt, .json, .csv) are created as ephemeral `Blob` URLs with explicit MIME types (`text/csv;charset=utf-8;`) and revoked immediately via `URL.revokeObjectURL(url)` to prevent memory leaks and dangling blob pointers.
3. **Emergency Cache Purge**: The `ErrorBoundary` interface includes an emergency cache purge routine that completely flushes `localStorage` and `sessionStorage` in the event of malformed state or schema migration incompatibilities.

---

## 4. Reporting a Vulnerability

If you discover a security vulnerability within this repository, please report it privately:

1. **Do not create a public GitHub issue** for undisclosed security vulnerabilities.
2. Please open a draft **GitHub Security Advisory** under the [Security tab](https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine/security) or email the maintainer directly.
3. Include detailed steps to reproduce the vulnerability, sample payloads, and expected vs observed behavior.
4. Security reports will be acknowledged within 24 hours, and patches will be deployed to `main` and production Vercel environments immediately upon verification.

