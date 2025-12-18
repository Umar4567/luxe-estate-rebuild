# Animation & Design Excellence Guide

## Overview
This guide covers building excellent animations in the Luxe Estate project. We use Tailwind CSS, React hooks, and CSS keyframes to create smooth, performant animations.

---

## What You Need to Build Animations

### 1. **Tailwind CSS Utilities**
Tailwind provides built-in animation classes:
```tailwindcss
animate-fade-in       /* Fade in effect */
animate-slide-up      /* Slide up effect */
animate-bounce        /* Bounce effect */
animate-pulse         /* Pulse effect */
animate-spin          /* Spinning effect */
transition-all        /* Smooth transitions */
duration-300          /* 300ms duration */
duration-500          /* 500ms duration */
duration-1000         /* 1000ms duration */
```

**Usage:**
```jsx
<div className="animate-fade-in duration-500">
  Content fades in over 500ms
</div>
```

---

### 2. **CSS Keyframes (Custom Animations)**
Define custom animations in `src/index.css`:

```css
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-typewriter {
  animation: typewriter 3s steps(40, end) forwards;
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}
```

---

### 3. **React Hooks for Animation Triggers**
Use `react-intersection-observer` to trigger animations when elements enter the viewport:

```jsx
import { useInView } from "react-intersection-observer";

const MyComponent = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      Animates when scrolled into view
    </div>
  );
};
```

---

### 4. **Stagger Animation Pattern**
Create cascading animations for multiple elements:

```css
.stagger > * {
  animation: fadeInUp 0.6s ease-out forwards;
}

.stagger > :nth-child(1) { animation-delay: 0s; }
.stagger > :nth-child(2) { animation-delay: 0.1s; }
.stagger > :nth-child(3) { animation-delay: 0.2s; }
```

**HTML:**
```jsx
<div className="stagger">
  <h1>Title</h1>
  <p>Subtitle</p>
  <button>CTA</button>
</div>
```

---

## Animation Types Used in Luxe Estate

### 1. **Fade & Opacity**
```jsx
className={`transition-all duration-500 ${
  inView ? 'opacity-100' : 'opacity-0'
}`}
```

### 2. **Translate (Slide)**
```jsx
className={`transition-all duration-500 ${
  inView ? 'translate-y-0' : 'translate-y-10'
}`}
```

### 3. **Scale**
```jsx
className={`transition-all duration-500 ${
  inView ? 'scale-100' : 'scale-95'
}`}
```

### 4. **Typewriter Effect**
Applied to headings. Already implemented in `TypewriterEffect.tsx` component.

### 5. **Hover Effects**
```jsx
className="hover:shadow-xl hover:scale-105 transition-all duration-300"
```

---

## Best Practices for Animation Design

### ✅ **DO:**
- **Keep animations under 500ms** for UI interactions
- **Use `transition-all duration-300`** for smooth hover effects
- **Trigger on scroll** using `useInView` for dramatic entries
- **Stagger animations** for visual interest (0.1s increments)
- **Test on mobile** – animations should be smooth at 60fps
- **Use `transform`** and `opacity` (GPU-accelerated) instead of left/right
- **Add `will-change`** CSS for complex animations: `will-change: transform`

### ❌ **DON'T:**
- **Animate properties like `width`, `height`** – use `scale` instead
- **Use `animation-delay` excessively** – keeps content hidden too long
- **Create animations longer than 1 second** for page loads (frustrating)
- **Animate on every interaction** – reserved for key moments
- **Forget `pointer-events: none`** during animations if blocking clicks

---

## Example: Excellent Animation Pattern

### Hero Section (Current Implementation)
```jsx
const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

<section 
  ref={heroRef}
  className={`transition-all duration-500 ${
    heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
  }`}
>
  <div className="stagger">
    <h1 className="animate-fade-in">Title</h1>
    <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>Subtitle</p>
    <button className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
      CTA
    </button>
  </div>
</section>
```

**Result:** Fade-in + staggered elements = smooth, professional entry

---

## Adding New Animations

### Step 1: Define in `index.css`
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

### Step 2: Use in Component
```jsx
<div className="animate-fade-in-up">Your content</div>
```

### Step 3: Combine with Tailwind
```jsx
className={`animate-fade-in-up duration-500 delay-100 ${
  condition ? 'visible' : 'invisible'
}`}
```

---

## Performance Optimization

### 1. **Use `will-change` for GPU Acceleration**
```css
.animated-element {
  will-change: transform, opacity;
}
```

### 2. **Reduce Motion for Accessibility**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. **Lazy Load Animations**
Only trigger animations for visible elements using `useInView`.

---

## Animation Timing Guide

| Duration | Use Case |
|----------|----------|
| **100-150ms** | Micro-interactions (hover, button states) |
| **300-500ms** | Element transitions, fade-ins |
| **600-800ms** | Page section reveals |
| **1000ms** | Full page hero animations |
| **> 1s** | Avoid – users perceive as slow |

---

## Tailwind Config Customization

If you need custom animations, extend `tailwind.config.ts`:

```ts
export default {
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out',
        fadeInUp: 'fadeInUp 0.6s ease-out',
      },
    },
  },
};
```

---

## Current Animations in Luxe Estate Project

### ✅ Implemented:
1. **Typewriter Effect** – Hero headings
2. **Fade In** – Page sections on scroll
3. **Scale + Opacity** – Card hovers
4. **Stagger** – Multiple element sequences
5. **Slide** – Modal overlays
6. **Shadow transitions** – Button hovers

### 🎯 Recommended Additions:
1. **Parallax scrolling** – Hero background movement
2. **Counter animations** – Stats section numbers
3. **Carousel transitions** – Property cards
4. **Loading skeletons** – Async data
5. **Gesture animations** – Mobile swipes

---

## Testing Animations

### In Browser DevTools:
1. Open DevTools → Rendering
2. Enable "Paint flashing" to spot inefficient redraws
3. Check FPS meter while scrolling
4. Target: **60 FPS** for smooth animations

### Performance Checklist:
- [ ] Animations use `transform` and `opacity`
- [ ] `will-change` applied for complex animations
- [ ] `useInView` used for scroll triggers
- [ ] Mobile performance tested
- [ ] Reduced motion respected

---

## Resources

- **Tailwind Docs:** https://tailwindcss.com/docs/animation
- **React Intersection Observer:** https://github.com/thebuilder/react-intersection-observer
- **CSS Animations Guide:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations
- **Web Performance:** https://web.dev/animations-guide/

