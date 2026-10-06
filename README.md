# 🌱 EcoSense

**Smart Environmental Monitoring and Health Index System**

EcoSense is a science + hardware + software project that turns environmental sensor readings into an easy-to-understand **Environmental Health Index (0–100)**.

## Current version

The GitHub dashboard starts in **Simulation Mode**, so it works immediately without hardware. Values change automatically every few seconds and the score/trend update live.

### Measurements
- 🌡️ Temperature
- 💧 Humidity
- 🌫️ Air quality
- 🔊 Noise
- 💡 Light

### Science model

The educational index combines weighted component scores:

| Factor | Weight |
|---|---:|
| Temperature | 20% |
| Humidity | 15% |
| Air quality | 35% |
| Noise | 20% |
| Light | 10% |

> This is a student-project model and is not intended to replace certified environmental or medical measurements.

## Hardware roadmap

The `arduino/EcoSense.ino` file contains the starter Arduino firmware. The next version can connect real sensors and replace simulation data with live readings.

## Project structure

```
EcoSense/
├── index.html
├── style.css
├── app.js
├── data/
│   └── sample-data.json
└── arduino/
    └── EcoSense.ino
```

## Goal

Build a low-cost environmental station that **senses → processes → combines → explains** environmental conditions.

Made for science exhibitions, college projects, and experimentation.
