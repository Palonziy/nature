---
name: scroll-world
description: >
  Build an immersive scroll-scrubbed "fly through the world" landing page for any
  industry or brand using Monid, Higgsfield, Codex, or Gemini Imagen 3. As the visitor scrolls, a pre-rendered camera
  flies from outside each scene into its interior, then flows on to the next scene
  with NO cuts — one continuous connected flight (Emons-style isometric diorama world,
  or any art direction you pick). The skill interviews the user for topic, story beats, and brand kit,
  then generates cohesive scenes + seamless camera clips and wires a portable, framework-agnostic scroll-scrub engine.
  Use when the user wants a "3D world" / "browse-through-the-industry" hero, a scroll cinematic, a diorama landing, or to
  turn a business into a scrollable world.
---

# scroll-world (Gemini Agent Edition)

Produces a landing page where **scroll drives a camera**: it dives from outside a scene into its interior, then flies out and into the next scene, continuously, with no visible cuts. The visuals are AI-generated — stills via Gemini `generate_image` (Imagen 3), Higgsfield (`gpt_image_2`), or Codex CLI (`image_gen`); the video chain via **Monid by default** (pay-per-clip Seedance 2.0; Higgsfield credits as fallback) — and the page scrubs pre-rendered video by scroll position.

**What you generate:** N scene stills → N "dive-in" camera clips → N-1 "connector" clips that join consecutive scenes seamlessly → a portable scrub engine that plays the whole chain as one flight.

**The one rule that makes or breaks it:** seams must be *frame-identical*. Read [Step 5 — Connectors](#step-5--connectors-architecture-b-only) before generating any connector. Getting this wrong produces a visible "pop" between scenes.

Do not assume a frontend framework. The scrub engine in `references/scrub-engine.js` is self-contained vanilla JS (it builds its own DOM + injects its own CSS into a container you give it), so it drops into plain HTML, Next.js, Vue, a Python-served page, anything.

---

## Step 0 — Bootstrap & Environment Check

Use `run_command` in your terminal environment (PowerShell / Bash):

1. **Automatic FFmpeg Check & Auto-Installation:**
   Check if `ffmpeg` and `ffprobe` are on system `$PATH` (`ffmpeg -version`).
   If `ffmpeg` is missing, automatically install it via system package manager:
   - **Windows:** `winget install --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements`
   - **macOS:** `brew install ffmpeg`
   - **Linux:** `sudo apt-get update && sudo apt-get install -y ffmpeg`

2. **Monid CLI / Higgsfield CLI Check:**
   - Check `monid --version` and `monid balance`.
   - Check `higgsfield workspace list`.

3. **AUTOMATIC FALLBACK — Mode B (Zero-Setup Pure Web 3D Mode):**
   If `monid` and `higgsfield` CLIs are absent or unauthenticated (or if the user requests zero external setup / zero credit spend):
   - Automatically fall back to **Zero-Setup Pure Web 3D Mode**.
   - Gemini generates all scene stills natively using `generate_image` (Imagen 3).
   - Video generation CLIs and `ffmpeg` are **NOT required** in Zero-Setup Mode!
   - The engine uses 3D WebGL / CSS 3D Parallax Depth Zoom to dive smoothly into each scene still as the user scrolls.

4. **Gemini Native Image Gen (`generate_image`):** Native Imagen 3 via Gemini tool `generate_image` is available directly for stills (or Codex CLI if `codex login status` reports a valid session).
5. **Platform Note:** Windows environments can use `references/pipeline.ps1` (PowerShell) or `references/pipeline.md` (Bash).

---

## Step 1 — Interview the user

Ask the user plain prose questions (or use `ask_question` tool for structured choices).

1. **Subject:** Ask openly: *"What should this world be about? Your business, a client's, or any idea — a word or a sentence is fine."*
2. **Brand Kit:** Offer 3 paths:
   - Import from URL: `higgsfield marketing-studio brand-kits fetch --url <site> --wait`
   - User provides 4–6 hex colors + brand name + tone.
   - You propose palette + name for user approval.
3. **Art Direction:** Default is "soft matte low-poly **clay diorama**, isometric, tilt-shift miniature, warm light." Alternatives: flat papercraft, glossy toy, claymation, neon night, photoreal architectural.
4. **Camera Style:**
   - **"Fly through the world"** (Architecture B): camera dives into each scene, pulls up and out, hops to next scene.
   - **"One continuous walkthrough"** (Architecture A): single forward flight that glides through scenes continuously.
   - **"Locked isometric glide"** (Architecture A + locked-iso clause): fixed angle throughout, world slides past.
5. **The Journey (Sections):** Propose 5–7 ordered scenes (e.g. farms → kitchen → shop → delivery → plaza → hero product). Each section gets: description, eyebrow, title, body line, tags.
6. **Mobile Version:** Desktop only VS Native 9:16 portrait chain (~2x credits/time).
7. **Budget & Engines:** State estimates (N stills + 2N-1 videos) and confirm before rendering.

---

## Step 2 — Generate Scene Stills

One image per section, all sharing the exact same **style preamble** for cohesion.

- **Option A (Gemini Native):** Call tool `generate_image` with prompt from `references/prompts.md`.
- **Option B (Higgsfield `gpt_image_2`):**
  `higgsfield generate create gpt_image_2 --prompt "$(cat still_i.txt)" --aspect_ratio 3:2 --resolution 2k --quality high --wait --wait-timeout 15m --json`
- **Option C (Codex `image_gen`):**
  `codex exec -C "$WORK" -s workspace-write --skip-git-repo-check 'Use the image generation tool ($imagegen) to generate: ...' < /dev/null`

Review stills before continuing — ensure color palette and camera angle consistency across all N scenes.

---

## Step 3 — (Optional) Float the Scenes

If scenes sit on floating diorama islands, run background knockout with `references/knockout.py` to produce transparent PNG/WebP assets.

---

## Step 4 — Camera Architecture & Video Chain

Pick **ONE** model for the entire video chain:

| Model | start/end image | Notes |
|---|---|---|
| `seedance_2_0` (default via Monid / Higgsfield) | ✓ / ✓ | Full chain (legs + connectors). `--mode std --resolution 1080p`. |
| `kling3_0` | ✓ / ✓ | Full chain (`--mode std --sound off`, 720p native). |
| `seedance_2_0_mini` | ✓ / ✓ | Previz / draft tier (720p). |

### Architecture A: Continuous Forward Take
Sequential generation: leg 0 starts from still 0. Each subsequent leg uses `--start-image` set to the **previous leg's ACTUAL last frame** (extracted via ffmpeg). No `--end-image`.

### Architecture B: Dive-in + Aerial Connectors
Dive clips start from scene stills. Connectors link dive_i's LAST frame to dive_{i+1}'s FIRST frame.

---

## Step 5 — Connectors (Architecture B only)

Extract boundary frames from rendered dive clips (NEVER the raw diorama stills):

```bash
ffmpeg -sseof -0.15 -i dive_i.mp4 -frames:v 1 -q:v 2 dive_i_last.png
ffmpeg -ss 0 -i dive_{i+1}.mp4 -frames:v 1 -q:v 2 dive_next_first.png
```

Generate connector clip: `--start-image dive_i_last.png` and `--end-image dive_next_first.png`.

---

## Step 6 — Video Encoding for Smooth Scrubbing

Encode MP4s with small GOP (`-g 8`) and FastStart for blob-seeking in browser:

```bash
ffmpeg -i src.mp4 -an -vf "unsharp=5:5:0.8:5:5:0.0" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart out.mp4
```

For mobile variants (if opted-in): encode 720p portrait (`scale=-2:720` or `720:-2`), `-g 4`, `crf 23`.

---

## Step 7 — Assemble the Page

Copy `references/scrub-engine.js` and `references/index-template.html` into the user's project:

```javascript
mountScrollWorld(document.getElementById('world'), {
  brand: { name: 'Brand Name' },
  diveScroll: 1.3, connScroll: 0.9,
  sections: [
    {
      id: 'farm', label: 'The Farms',
      still: 'assets/farm.webp', clip: 'assets/vid/farm.mp4',
      clipMobile: 'assets/vid/farm-m.mp4', stillMobile: 'assets/farm-m.webp',
      accent: '#8FB98A', eyebrow: 'From leaf to sip', title: 'It starts here.',
      body: 'Description...', tags: ['Tag1', 'Tag2']
    }
  ],
  connectors: ['assets/vid/conn1.mp4'],
  connectorsMobile: ['assets/vid/conn1-m.mp4']
});
```

---

## Step 8 — Seam QA & Verification

1. Verify seam frames in browser/headless view — ensure no visual jump between `dive_i` end and `conn_i` start.
2. Verify `video.seekable` is active (blob-seeking enabled).
3. Test touch / mobile behavior, safe-area offsets, and reduced-motion fallback.

---

## Reference Documents

- `references/prompts.md` — Complete prompt templates & camera grammar.
- `references/pipeline.md` — Bash generation & encoding scripts.
- `references/pipeline.ps1` — Windows PowerShell generation & encoding scripts.
- `references/scrub-engine.js` — Self-contained vanilla JS scroll engine.
- `references/index-template.html` — HTML mounting template.
- `references/knockout.py` — Python background transparency tool.
