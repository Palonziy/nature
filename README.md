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

---

## 📋 Requirements

- **Gemini Agent / Antigravity SDK** with access to `run_command`, `generate_image`, `view_file`, `write_to_file`, and interactive questions (`ask_question`).
- **Monid CLI** (optional, recommended video backend) — `seedance-2.0` pay-per-clip video generation.
- **Higgsfield CLI** (optional) — stills generation (`gpt_image_2`), video fallback (`seedance_2_0`, `kling3_0`).
- **Gemini Native Image Generation** (`generate_image` / Imagen 3) — available natively inside Gemini Agent.
- **ffmpeg / ffprobe** — frame extraction and high-performance video encoding (`-g 8`, `-g 4` keyframe optimization).
- **Python 3** with `Pillow` (optional background knockout for floating dioramas).

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
