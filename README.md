# Inverse Kinematics Lab
> [Live Demo](https://robertlupas.github.io/inverse-kinematics-lab/)

A small browser demo for experimenting with 2D [inverse kinematics (IK)](https://en.wikipedia.org/wiki/Inverse_kinematics) using diferent algorithms. It could be useful if you want to see how different algorithms solve IK, or even [plug in a custom algorithm](#using-a-custom-algo).

## What it does

- Draws a chain of bones from a fixed base point
- Lets you move the target (X/Y) and change the number of bones
- Uses your preferred algorithm
- Shows errors like *target unreachable* when the target is beyond the chain's total length

## IK Algos

- **FABRIK** (Forward And Backward Reaching IK)
- **CCD** (Cyclic Coordinate Descent)

## Controls

- **X/Y**: target position offsets
- **Bones**: total number of bones
- **IK Algorithm**: FABRIK/CCD
- **Reset**: returns everything to the defaults

> Note: the app is only usable on larger screens (desktop/tablet)

# Using a custom algo

You can write a custom algorithm like the ones in [`lib/ik-algos/`](https://github.com/RobertLupas/inverse-kinematics-lab/tree/main/lib/ik-algos). It has to return a `Point` (with x/y coordinates). Then add it to the `IKType` enum in [`lib/ik.ts`](https://github.com/RobertLupas/inverse-kinematics-lab/tree/main/lib/ik.ts), and plug it into the `renderIK()` switch and into the UI's dropdown.

## Scripts

### Run locally

```bash
bun install
bun dev
```

### Build

```bash
bun run build
```

The build is outputted to `dist/`, inside a standalone HTML file.

## Project layout

- `index.html` - self explanatory 😅
- `index.ts` - reads UI values, renders to the canvas
- `lib/`:
    - `ik.ts` - IK dispatch & rendering
    - `ik-algos/`: The algos
        - `fabrik.ts`
        - `ccd.ts`
    - `render.ts` - canvas rendering helpers
    - `math.ts` - basic vector/geometry helpers
    - `logHandlers.ts` - error/log display helpers
    - `utils.ts` - basic DOM helpers

## Todo

- [ ] Add a checkbox to allow rendering of unreachable targets
- [ ] Make it easier to implement custom algos or edit included ones.
