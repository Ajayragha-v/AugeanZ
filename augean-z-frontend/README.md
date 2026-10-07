# AUGEAN-Z — Official Web Platform

> Structural Code Intelligence, Mathematical Model Discovery, and Formal Verification.

This repository contains the complete, self-contained web platform for **AUGEAN-Z**, including:
1. **Cinematic Landing Page (`/`)**: A scroll-driven visual story depicting the journey from code chaos to formal verification and reconstruction using GSAP and ScrollTrigger.
2. **Main Debugger Interface (`/app`)**: A focused, developer-grade code debugger workbench with non-destructive diff comparisons (Before vs Fixed), native Python file upload, and real-time synthesis.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### Installation
Clone or copy this directory to your desired local environment and run:

```bash
npm install
```

### Development Server
Start the local Vite development server:

```bash
npm run dev
```

Open your browser at:
- `http://localhost:5173/` — Cinematic Landing Page
- `http://localhost:5173/app` — Main Debugger Interface

### Production Build
Create an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
augean-z-landing/
├── public/
│   └── assets/
│       ├── broken-cube.png             # Deconstructing fragmented data cube asset
│       └── reconstructed-cube.png      # Formally verified reconstructed data cube asset
├── src/
│   ├── components/
│   │   ├── debugger/
│   │   │   ├── BottomStatusBar.jsx     # Minimal developer status bar (problems, tests, status)
│   │   │   ├── CodeEditor.jsx          # Line numbers, side-by-side diff, and fix application
│   │   │   └── DebuggerApp.jsx         # Main workbench view (/app)
│   │   ├── BackgroundSystem.jsx        # HTML5 Canvas particles & ambient graphite HUD grid
│   │   ├── BreakScene.jsx              # Scene 03: Pinned 3D Cube fragmentation & letter disintegration
│   │   ├── DetectiveScene.jsx          # Scene 04: AST to category graph & .grn shape query
│   │   ├── DiscoveryScene.jsx          # Scene 05: Julia compiler candidate model search
│   │   ├── FinalScene.jsx              # Scene 08: Reconstructed cube climax & primary CTA
│   │   ├── HeroScene.jsx               # Scene 01: The Void & camera zoom
│   │   ├── Navbar.jsx                  # Minimal fixed header with brand & quick jump
│   │   ├── PipelineModal.jsx           # Complete 10-stage formal architecture modal
│   │   ├── ProblemScene.jsx            # Scene 02: Code entropy and diagnostic badges
│   │   ├── ReconstructionScene.jsx     # Scene 07: Reverse synthesis into clean Python
│   │   ├── ScrollProgress.jsx          # Vertical HUD stage progress indicator
│   │   └── VerificationScene.jsx       # Scene 06: Lean 4 formal verification & candidate choice
│   ├── services/
│   │   └── analysisService.js          # Authoritative pipeline state engine (ready for backend API)
│   ├── styles/
│   │   └── index.css                   # Graphite/violet theme, typography, scanlines, metallic styles
│   ├── App.jsx                         # Router configuration (/ and /app)
│   └── main.jsx                        # React root entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Authoritative Pipeline

All analysis operations in the background follow the formal 10-stage Augean-Z pipeline:

```
USER INPUT
    ↓
HOTT CFG
    ↓
JULIA COMPILER
    ↓
TARGET TOPOS
    ↓
MULTIPLE SOLUTIONS
    ↓
LEAN
    ↓
LLM
    ↓
INVERSE PARSER
    ↓
FIXED CODE REGENERATOR
    ↓
GREEN FLAG TEST
```

The service layer in [`src/services/analysisService.js`](src/services/analysisService.js) exposes `runPipelineAnalysis()`, which can be connected to your live backend WebSocket or REST API without altering any UI components.
