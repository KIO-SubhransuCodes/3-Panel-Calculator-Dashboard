========================================================================
INTERACTIVE CALCULATOR DASHBOARD: CODE ARCHITECTURE OVERVIEW
========================================================================

This project is a modern, modular, and responsive 3-Panel Calculator 
Dashboard built using standard web technologies. The codebase is 
decoupled into three dedicated layers to ensure maintainability, 
scalability, and clean structure: Structure (index.html), 
Presentation (style.css), and Behavior (interact.js).

------------------------------------------------------------------------
1. STRUCTURAL BLUEPRINT (index.html)
------------------------------------------------------------------------
The structural layer is organized using a dynamic, accessible container 
system designed to host a multi-functional application window.

* Header Bar Container: 
  Acts as the flagship structural banner. It anchors the prominent 
  text heading ("CALCULATOR") alongside an interactive theme 
  switcher button.

* The 3-Panel Grid (.dashboard):
  - Left Panel (Mode Select): Houses semantic button nodes used to 
    switch the operating environment of the core application layout.
  - Center Panel (Calculator Display & Input System): Contains the 
    primary display terminal—split into a real-time historical trace 
    line and an active workspace line—followed by isolated markup 
    containers for Normal Matrix Layout, Scientific Matrix Layout, 
    and a specialized Unit Conversion Interface.
  - Right Panel (Recent History): Implements a standalone scrollable 
    logging container with interactive data-purging actions.

------------------------------------------------------------------------
2. STYLE & PRESENTATION LAYER (style.css)
------------------------------------------------------------------------
The layout management utilizes advanced CSS Grid and CSS Flexbox patterns, 
shifting fluidly between desktop three-column structures and stacking 
configurations for mobile screens.

* Design Tokens (:root): 
  The engine uses a global CSS variable paradigm (--bg-color, 
  --panel-bg, --accent, etc.) mapping functional color signatures for 
  a dark-by-default environment.

* Dynamic Theme Overrides ([data-theme="light"]): 
  Swaps the palette dynamically by overriding root variables when the 
  target DOM attribute changes, enabling immediate light/dark 
  transitions across all components.

* Encapsulated Component Artistry:
  - Buttons (.key): Applies strict circular grid boundaries for normal 
    operations (aspect-ratio: 1) and fluid pill-shapes for scientific 
    extensions.
  - Interface Continuity: Enforces global cubic-bezier property 
    transitions (0.3s ease) on color mutations to keep transitions 
    soft and visually professional when switching themes.

------------------------------------------------------------------------
3. BEHAVIORAL ENGINE (interact.js)
------------------------------------------------------------------------
The application engine is driven by a centralized state machine that 
handles live layout tracking, numerical accumulation, and formula 
calculation.

* State & Display Tracking:
  Tracks user updates across global variables (currentInput, 
  historyInput). It sanitizes structural calculations natively, 
  preventing user errors like duplicate decimal entries (.).

* Key Operational Systems:
  - Layout Swapping Engine (switchMode): Monitors operational triggers, 
    explicitly updating display properties while programmatically 
    toggling class properties (.active) to swap button layouts 
    instantly.
  - Mathematical Expression Router (calculate): Intercepts standard 
    mathematical keys, dynamically updates symbols (converting x to * and / to /), processes basic formulas with safe JavaScript string 
    assessment routines, and computes standalone logarithmic and 
    trigonometric expressions via the native Math library.
  - Real-time Unit Conversion Matrix: Handles localized physical weight 
    (kg to g) and length (cm to m) conversions mathematically without 
    tracking an external database, allowing conversion entries to be 
    logged directly into the main history panel.
  - History Logger (addHistoryItem): Dynamically constructs and 
    prepends isolated HTML tracking nodes into the history view, 
    logging complete calculations for quick reference.
========================================================================
