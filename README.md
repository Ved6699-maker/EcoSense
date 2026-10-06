# 🧬 BioSim — Virtual Ecosystem Laboratory

BioSim is a browser-only science project that lets students run simplified ecosystem experiments without Arduino, sensors, or other hardware.

## What it simulates

- 🌱 Plant growth
- 🐇 Herbivore population
- 🦊 Predator population
- 🌡️ Temperature pressure
- 🌧️ Rainfall
- ☀️ Sunlight
- 📊 Population dynamics
- 🧪 Hypotheses and experiment history

## The science

The simulation uses simplified mathematical relationships inspired by ecological population models. Plant growth depends on resources and climate. Herbivores depend on plants. Predators depend on herbivores. These dependencies create feedback loops.

The project also calculates an educational **stability score** from survival and population fluctuation.

This is a learning model, not a validated ecological forecasting system.

## Experiments to try

1. Run **Balanced**.
2. Run **Drought** and compare plant and herbivore populations.
3. Run **Warming** and observe the effect of temperature stress.
4. Run **No predators** and observe the food-web response.
5. Write a hypothesis before each experiment.

## Technology

- HTML
- CSS
- JavaScript
- Canvas API
- GitHub Pages

No Arduino. No sensors. No external database. No external API.

## Project structure

```
EcoSense/
├── index.html
├── style.css
├── app.js
└── README.md
```

The repository name remains **EcoSense** so your existing GitHub project URL does not change, but the application itself has been replaced by BioSim.

## Educational objective

BioSim demonstrates how changing one environmental variable can create a chain reaction across a food web. It turns ecological concepts into an interactive experiment students can repeat and compare.
