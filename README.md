# scroll-world (Gemini Edition)

An agent skill — for **Google Gemini AI Agent / Antigravity SDK** — that builds an immersive, **scroll-scrubbed "fly through the world" landing page** for any industry or brand. As the visitor scrolls, a camera flies from outside each scene into its interior, then flows on to the next scene with **no cuts**. One continuous connected flight through a generated diorama world.

Original project: [oso95/scroll-world](https://github.com/oso95/scroll-world)

---

## 🛠️ Installation in Gemini Agent

### Option 1: Drop into local Workspace or `.gemini` Plugins directory

Copy the `scroll-world-gemini` folder into your Gemini configuration directory or local workspace:

```bash
# User home plugin directory
cp -R scroll-world-gemini ~/.gemini/config/plugins/scroll-world-plugin
```

## ⚡ Automatic Fallbacks & Zero-Setup Mode

- **Automatic FFmpeg Auto-Installer:** If `ffmpeg` or `ffprobe` is not found on your system, Gemini will automatically offer and run system package installation (`winget install --id Gyan.FFmpeg` on Windows, `brew install ffmpeg` on macOS, `apt-get` on Linux).
- **Zero-Setup Pure Web 3D Mode (No External Tools Required):** If Monid CLI or Higgsfield CLI are not installed, Gemini automatically switches to **Zero-Setup Pure Web 3D Mode**:
  - Uses Gemini's native `generate_image` (Imagen 3) for all diorama scene stills.
  - Requires **zero external software or API keys** (`monid`, `higgsfield`, and `ffmpeg` are not needed in this mode).
  - Employs WebGL / CSS 3D Depth Parallax Zoom inside `scrub-engine.js` to create smooth 60 FPS 3D scroll fly-through transitions.

---

## 📋 Requirements (Video Mode vs Zero-Setup Mode)

- **Option A (AI Video Mode - High Fidelity):**
  - **Monid CLI** (`seedance-2.0` pay-per-clip USD video generation) or **Higgsfield CLI**.
  - **ffmpeg / ffprobe** (Auto-installed if missing).

- **Option B (Zero-Setup Pure Web 3D Mode - Free / No Tools Required):**
  - **Gemini Agent** native `generate_image` (Imagen 3).
  - No CLI tools, GPU, or FFmpeg required! Runs 100% in browser WebGL.

---

## 🚀 How It Works

When invoked in Gemini, the skill:

1. **Interviews the user** — collects business topic, brand kit (hex colors), art direction, camera style (Fly-through / Walkthrough / Locked Isometric), mobile 9:16 preference, and budget.
2. **Generates scene stills** — using Gemini's native `generate_image`, Higgsfield (`gpt_image_2`), or Codex CLI.
3. **Generates camera clips** — 
   - *Architecture A (Forward Take)*: Continuous forward leg flights chained from actual last frames.
   - *Architecture B (Dive + Aerial Connectors)*: Dive-in clips per scene + boundary frame-locked connector clips.
4. **Encodes & Wires** — encodes optimized low-latency MP4 clips and mounts `scrub-engine.js` into HTML/Next.js/Vue.

---

## 📂 Directory Structure

```
scroll-world-gemini/
├── plugin.json
├── README.md
└── skills/
    └── scroll-world/
        ├── SKILL.md                    Main skill procedure & seamless frame-lock rules
        └── references/
            ├── prompts.md              Intake checklist & style preamble templates
            ├── pipeline.md             Bash batch generation & encoding scripts
            ├── pipeline.ps1            PowerShell batch generation & encoding scripts (Windows)
            ├── scrub-engine.js         Portable, config-driven scroll engine (blob-seek, lazy load)
            ├── index-template.html     Minimal standalone HTML page
            └── knockout.py             Background removal for floating diorama islands
```

---

## 📜 License

MIT — see original repository [oso95/scroll-world](https://github.com/oso95/scroll-world).
