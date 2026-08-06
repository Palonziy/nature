# Prompt templates & intake (Gemini Edition)

Everything here is fill-in-the-slots. Keep the **style preamble** byte-for-byte identical across all scene stills — that identical text is what makes the world feel like one cohesive place.

---

## Intake checklist (Step 1)

Collect and write down:

- `SUBJECT` — the business + one-line pitch.
- `BRAND_NAME` — display name.
- `PALETTE` — 4–6 named hexes (e.g. `taro #9B7EBD, cream #F5EDE0, caramel #C88A5A, matcha #8FB98A, plum #3A2E48`).
- `TONE` — brand tone (cozy, premium, playful, industrial, sleek...).
- `STYLE` — art direction choice (clay diorama, papercraft, glossy toy, claymation, neon night, photoreal).
- `SECTIONS[]` — ordered list of scenes (id, label, subject, eyebrow, title, body, tags).
- `CAMERA` — fly-through (Arch B) | walkthrough (Arch A) | locked-iso (Arch A + locked-iso clause).
- `MOBILE` — yes (native 9:16 portrait chain) / no (desktop only).
- `STILLS_SOURCE` — gemini (`generate_image` / Imagen 3) | higgsfield (`gpt_image_2`) | codex (`image_gen`).
- `VIDEO_TIER` — default `seedance_2_0` via Monid ($/clip) or Higgsfield credits (`seedance_2_0` | `kling3_0` | `seedance_2_0_mini`).

---

## Style Preamble (Default: Clay Diorama)

Reuse verbatim in every scene prompt. Swap bracketed values with brand palette:

```text
Isometric low-poly 3D diorama floating as a small rounded island on a plain solid [BG_HEX] background with a soft contact shadow beneath it. Soft matte clay 3D render, rounded toy-model shapes, gentle warm studio lighting, soft long shadows, tilt-shift miniature look. Cohesive color palette of [PALETTE]. Highly detailed, centered composition, absolutely no text, no letters, no numbers, no logos.
```

### Alternate Directions

- **Flat papercraft:** "Isometric layered paper-craft diorama, matte cardstock, clean die-cut edges, subtle drop shadows between layers."
- **Glossy toy:** "Isometric glossy vinyl-toy diorama, smooth plastic shading, soft rim light, collectible figurine look."
- **Claymation:** "Isometric stop-motion clay set, visible thumbprints, handmade plasticine texture, soft studio softbox light."
- **Neon night:** "Isometric miniature at night, warm interior glow and neon signage, moody rim light, wet reflective ground."
- **Photoreal architectural:** "Ultra-photorealistic architectural photography of a single cohesive [subject], cinematic wide-angle, warm golden-hour light, natural materials, restrained designer furnishings, a breathtaking view, editorial magazine quality, shallow depth of field, no people."

---

## Scene Still Prompt (Step 2)

```text
[STYLE PREAMBLE]
Subject: [SECTION.subject — describe the miniature scene: the building/space, a few characters doing the work, key props signaling this stage of business].
```

---

## Leg Prompt — Architecture A (Continuous Forward Take)

`--start-image = previous leg's ACTUAL last frame`. **No `--end-image`.**

```text
Single continuous cinematic camera move, no cuts. **Continue the same slow, steady forward glide.** [MID-LEG MOVE — optional]. The camera moves into [SCENE i] toward [FOCAL POINT]. **In the final second, settle back into a slow, steady forward glide toward [direction of next scene].** [STYLE tail + PALETTE]. Smooth, graceful, slow motion, subtle parallax. No text, no captions.
```

### Locked-Isometric Clause
```text
The camera keeps exactly the same high isometric angle throughout — no rotation, no orbit, no tilt. It only travels straight and level, the world sliding past beneath the same view.
```

---

## Dive-in Clip Prompt (Step 4 / Architecture B)

`--start-image = scene still`

```text
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole [SECTION.subject] from outside like a tiny model. The camera slowly glides forward and descends toward it, sweeping in toward [FOCAL POINT], as if flying inside. As the camera pushes in, the roof and upper structure gently lift and open away to reveal the warm interior. [STYLE tail + PALETTE]. Smooth, graceful, slow motion, subtle parallax. No text, no captions.
```

---

## Connector Clip Prompt (Step 5 / Architecture B)

`--start-image = dive_i LAST frame`, `--end-image = dive_{i+1} FIRST frame`

```text
Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of [SCENE i], rising into the sky, then glides forward across the connected miniature world and arrives above [SCENE i+1], beginning to descend toward it. One connected miniature clay world, seamless flowing aerial transition. [STYLE tail + PALETTE]. Smooth graceful slow motion. No text, no captions.
```
