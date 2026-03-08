# 🌌 Cosmic Timeline Explorer

An interactive 3D visualization of cosmic history — from the Big Bang to human civilization. Built to explore and showcase the incredible journey of 13.8 billion years of existence.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=flat-square&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?style=flat-square&logo=framer)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **3D Cosmic Background** - Animated star field using React Three Fiber (Three.js)
- **Interactive Timeline** - Horizontal scrolling timeline with expandable era cards
- **Rich Data Visualization** - 17 major eras from the Big Bang to modern civilization
- **Smooth Animations** - Fluid transitions powered by Framer Motion
- **Global State Management** - Zustand for clean, efficient state handling
- **Type-Safe** - Full TypeScript implementation
- **Responsive Design** - Works on desktop and mobile devices
- **Futuristic UI** - Glass-morphism, gradients, and neon glow effects

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Components & Rendering |
| **TypeScript** | Type Safety & Developer Experience |
| **Vite** | Lightning-fast Build Tool |
| **React Three Fiber** | Declarative 3D Graphics (Three.js) |
| **@react-three/drei** | Useful Three.js Helpers |
| **Framer Motion** | Declarative Animations |
| **Zustand** | Lightweight State Management |
| **Tailwind CSS 4** | Utility-first Styling |

## 🛠️ Architecture

```
src/
├── components/           # React Components
│   ├── CosmicBackground.tsx   # 3D WebGL star field
│   ├── Header.tsx             # App header with branding
│   ├── TimelineTrack.tsx      # Horizontal scrolling container
│   ├── EraCard.tsx            # Interactive era cards
│   ├── DetailModal.tsx        # Full details overlay
│   └── Navigation.tsx         # Zoom/reset controls
├── data/
│   └── timelineData.ts        # Complete cosmic history data
├── store/
│   └── timelineStore.ts       # Zustand state management
├── types/
│   └── timeline.ts            # TypeScript type definitions
├── App.tsx                    # Main application
└── main.tsx                   # Entry point
```

## 🎯 Key Concepts Demonstrated

### 3D Graphics with React Three Fiber
```typescript
// Generating procedural star positions in 3D space
function generateStarPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    // Spherical to Cartesian conversion
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}
```

### Modern State Management with Zustand
```typescript
export const useTimelineStore = create<TimelineStore>()(
  devtools(
    (set) => ({
      selectedEra: null,
      expandedEras: new Set<string>(),
      toggleExpanded: (eraId) =>
        set((state) => {
          const newExpanded = new Set(state.expandedEras);
          newExpanded.has(eraId) ? newExpanded.delete(eraId) : newExpanded.add(eraId);
          return { expandedEras: newExpanded };
        }),
    }),
    { name: 'timeline-store' }
  )
);
```

### Type-Safe Data Modeling
```typescript
export interface TimelineEra {
  id: string;
  era: EraType;
  icon: string;
  title: string;
  time: string;
  timeValue: number;
  description: string;
  subEvents: SubEvent[];
  color: string;
  funFact?: string;
}
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/SivaRamSV/humans.git
cd humans

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Deployment

This project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

The site will be available at: `https://sivaramsv.github.io/humans/`

## 🎨 Design Philosophy

- **Cosmic Aesthetic**: Dark backgrounds with vibrant accent colors (cyan, purple, pink)
- **Glass Morphism**: Translucent cards with backdrop blur effects
- **Micro-interactions**: Subtle animations that enhance user experience
- **Information Density**: Rich content without overwhelming the user

## 📚 What I Learned

Building this project deepened my understanding of:

1. **WebGL & 3D Graphics** - Creating performant particle systems with thousands of points
2. **React Performance** - Using `useMemo` and `Suspense` for optimization
3. **Modern React Patterns** - Hooks, context, and component composition
4. **Animation Libraries** - Declarative animations with Framer Motion
5. **State Management** - When and how to use global state effectively
6. **TypeScript** - Modeling complex domain data with types

## 🤔 Why This Project?

> "We are a way for the universe to know itself." — Carl Sagan

After watching a documentary about dinosaurs, I became fascinated with the scale of cosmic history. This project visualizes that journey — putting into perspective that humans have existed for just 0.007% of Earth's history, and Earth itself is just 1/3 the age of the universe.

## 📄 License

MIT License - feel free to use this project for learning or inspiration!

---

Built with curiosity and code by **SivaRam SV** | [GitHub](https://github.com/SivaRamSV)
