# Forest Patrol — Game Design Document

## Concept

A forest mystery game about building a **chain of testimonies** to uncover a hidden killer. You play as a remote ranger post operator, deciding who to let into your cabin and who to turn away — all while piecing together fragmented survivor stories.

---

## Figma Frame Naming Conventions

All game screens follow these naming patterns (from Figma page `There Something In The Forest`):

| Pattern | Examples |
|---|---|
| `{Screen Type}` | `Main Menu` |
| `{Screen Type} - {Phase} #{N}` | `People at the door - Night time #1`, `Integration -Day light #3` |
| `{Screen Type} - {Phase}` | `people list - daylight`, `radio - daylight` |
| `{Screen Type} - {Phase} {Description}` | `radio - daylight 1-5 gave info on detail of the creature seen in the forest` |
| `{Transition Name} between {Phase A} - {Phase B}` | `Window mechanic transition between day - night time` |
| Internal layout frames | `Frame 1` through `Frame N` (nested components within screens) |

### Rules
- All gameplay screens carry a `DAY-{N}` label (top-left, `#87dac6`, VCR_OSD_Mono, 48px)
- Phase indicators: `- Night time` (night), `-Day light` / `- daylight` (day)
- Variants are numbered `#1` through `#5` per screen type
- Internal reusable layout frames are numbered sequentially (`Frame 1`, `Frame 2`, ...)

---

## Screen Map

### 1. Main Menu (title screen)
- **Frame name:** `Main Menu` (2 variants: vertical layout + title layout)
- **Title text:** "Forest Patrol" (96px, white, VCR_OSD_Mono, centered)
- **Menu items:** Play Game / Settings / Exit
- **Font:** SF Pro:Bold for vertical variant, VCR_OSD_Mono for title variant
- **Colors:** `#87dac6` (highlight), white (text), `#025b45` border

### 2. Window Mechanic Transition
- **Frame name:** `Window mechanic transition between day - night time`
- Forest trees visible through a crosshair window overlay
- Bottom text bar: "There are movements in the woods but the nights are so cold..."
- Acts as a narrative/visual transition between day and night phases

### 3. Night Phase: People at the Door
- **Frame name:** `People at the door - Night time #{N}` (N = 1–5)
- A visitor arrives at the cabin and speaks through the door
- **Dialogue box:** character text + ghosted "LET ME IN" blur text behind it
- **Character dialogue tone examples:**
  - Friendly: "Hello there fellow human!..."
  - Urgent: "LET ME IN"
  - Grateful: "Thank you dear"
  - Aggressive: "Cruel Human!"
- **Player actions:** "Let them in" / "Go Away" (two buttons side by side)
- **Let them in** button: `#cacaca` fill, `#025b45` border, `#025b45` text
- **Go Away** button: transparent fill, white border, `#87dac6` text
- Follow-up dialogue (survivor explains first meeting, ask follow-up question) happens within the same screen flow

### 4. Day Phase Step 1: Radio
- **Frame name:** `radio - daylight 1-5 gave info on detail of the creature seen in the forest`
- Creature/sighting image displayed on the left (rotated, luminosity + saturation blend)
- Radio transcript panel on the right with lore/information text
- Provides incomplete/partial creature info — builds world lore and hints

### 5. Day Phase Step 2: People List (Roster)
- **Frame name:** `people list - daylight`
- **5 character slots** displayed vertically on the left side (200x200px each):
  - Slots 1–4: character portraits (images with `#011c16` backgrounds)
  - Slot 5: empty (reserved/not yet filled)
- **Selected character info panel** on the right:
  - "First Arrival" section — the survivor's initial story
  - "Further Question" section — deeper clues obtained through questioning
- **Top bar actions:**
  - "Interogate" [sic] button — `#011c16` fill, white text
  - "skip the night" button — `#191b1b` fill, `#71717a` muted text

### 6. Day Phase Step 3: Integration (Interrogation)
- **Frame name:** `Integration -Day light #{N}` (N = 1–5)
- Same visual structure as night phase door screen but during daytime
- **Character dialogue tone examples:**
  - Casual: "Sup sherrif! ..."
  - Cooperative: "What do you want to know?"
  - Evasive: "Well i was ..."
  - Hostile: "You'll regret this..."
- **Player actions:** "Tell Story" / "Kick Them" (two buttons side by side)
- **Tell Story** button: `#cacaca` fill, `#025b45` border, `#025b45` text
- **Kick Them** button: transparent fill, white border, `#87dac6` text
- **Hidden sub-actions** (Frame 7, visibility toggled): "Check Skin" / "Check Nails" — investigation sub-mechanics that appear during interrogation to inspect characters for clues

---

## Screen Flow Per Day

```
[Window Transition] → [Night: People at the Door] → [Day: Radio] → [Day: People List] → [Day: Integration]
```

- 5 Days total (DAY-1 through DAY-5)
- 2–3 visitors per night
- Window transition plays between each day-night cycle

---

## Gameplay Loop

### Night Phase — People at the Door
- A visitor arrives at the cabin door and speaks
- Player reads the visitor's initial dialogue
- Choice: **Let them in** or **Go Away**
- If let in: visitor explains their first meeting (story), player can ask follow-up questions
- Turning someone away is permanent — they are gone

### Day Phase — Three-Step Flow
1. **Radio** — Listen to incomplete reports about forest activity and creature sightings. Lore-building with clues.
2. **People List** — Review the roster of everyone currently inside the cabin. Select a person to see their "First Arrival" story and "Further Question" answers. Click "Interogate" to open the integration screen.
3. **Integration** — Interrogate the selected character. Ask them to **Tell Story** (gain more chain links) or **Kick Them** (banish them from the cabin). Investigation sub-actions ("Check Skin", "Check Nails") may appear for closer inspection.

---

## Characters

### Core Characters (Story Anchors)
These define the mystery chain:
- Mike
- Roy
- Ara
- Zen
- Isabel
- (Killer hidden as one of them OR outsider depending on design)

### Supporting Visitors
- Provide single clues
- Each adds ONE link to the chain of events
- Can be wrong or incomplete (not fully lying)
- Unique dialogue personalities as seen in Figma (friendly, urgent, grateful, aggressive, casual, cooperative, evasive, hostile)

---

## Chain Mechanic

Every character connects to another:

```
Example: Mike → Roy → Ara → Zen → Unknown Man
```

Player must reconstruct the full chain from:
- Radio reports (lore and creature details)
- Visitor testimonies (at the door and during integration)
- Window transition hints (forest movement observations)

---

## Killer Design

- Appears as a normal visitor
- 90% truthful information
- 10% impossible knowledge (the crack the player must find)

### False Flag Design (Other Characters)
- 70% suspicious behavior
- 30% explainable mistakes

### Killer Effect (when inside the cabin)
- Some survivors may disappear at night
- Radio reports show conflicting deaths
- Stories become inconsistent
- No instant obvious reveal

---

## Ending Conditions

### Good Ending
- Killer is identified correctly OR neutralized before Day 5 ends

### Bad Ending
- Killer survives until Day 5
- OR too many innocent people are turned away/kicked out
- OR cabin becomes unstable (everyone lost / trust collapses)

---

## Design System

### Fonts
| Usage | Font | Weight | Size |
|---|---|---|---|
| Title ("Forest Patrol") | VCR_OSD_Mono | Regular | 96px |
| Menu items (title variant) | VCR_OSD_Mono | Regular | 40px |
| Menu items (vertical variant) | SF Pro | Bold | 40px |
| Day label ("DAY-1") | VCR_OSD_Mono | Regular | 48px |
| Dialogue text | VCR_OSD_Mono | Regular | 48px |
| Button labels | VCR_OSD_Mono | Regular | 40px |
| People list labels | VCR_OSD_Mono | Regular | 32–36px |

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--foreground` | `#87dac6` | Primary text, highlights, glow |
| `--background-dark` | `#011c16` | Panel backgrounds, character slots |
| `--border-dark` | `#025b45` | Button borders, panel borders |
| `--background-mid` | `#03231c` | People list container |
| `--button-fill` | `#cacaca` | Primary action button fill |
| `--button-muted` | `#191b1b` | Secondary/muted button fill |
| `--text-muted` | `#71717a` | Muted text (skip button) |
| `--white` | `#ffffff` / white | Borders, text |
| `--ghost-text` | `rgba(135,218,198,0.2)` | Blurred "LET ME IN" background text |

### Canvas
- Resolution: **1920 × 1080**
- All screens use the same background image (`image 3` — forest scene)
- Radial gradient overlay for vignette/atmosphere effect
- Dialogue box: 649px wide, positioned at (917, 207)
