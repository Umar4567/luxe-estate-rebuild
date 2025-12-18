import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

/**
 * AnimationShowcase Component
 * 
 * Demonstrates various animation techniques used in Luxe Estate:
 * 1. Fade In + Scale
 * 2. Slide In (translate)
 * 3. Stagger animation
 * 4. Hover effects
 * 5. Scroll-triggered animations
 */

export const AnimationShowcase = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="space-y-20 py-20">
      {/* Animation 1: Fade In + Scale */}
      <section
        ref={ref1}
        className={`p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl transition-all duration-1000 ${
          inView1 ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-2xl font-bold mb-2">1. Fade In + Scale</h2>
        <p className="text-gray-600">
          Combines opacity and scale for a smooth entrance effect.
        </p>
        <p className="text-sm text-gray-500 mt-2">Code: `opacity-100 scale-100`</p>
      </section>

      {/* Animation 2: Slide In (Translate) */}
      <section
        ref={ref2}
        className={`p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl transition-all duration-1000 ${
          inView2
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-10"
        }`}
      >
        <h2 className="text-2xl font-bold mb-2">2. Slide In (Translate)</h2>
        <p className="text-gray-600">
          Elements slide in from the left with opacity transition.
        </p>
        <p className="text-sm text-gray-500 mt-2">Code: `translate-x-0 / -translate-x-10`</p>
      </section>

      {/* Animation 3: Stagger (Multiple items with delay) */}
      <section ref={ref3}>
        <h2 className="text-2xl font-bold mb-4">3. Stagger Animation</h2>
        <p className="text-gray-600 mb-6">
          Multiple elements animate in sequence with staggered delays.
        </p>
        <div className="stagger grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`p-6 bg-purple-100 rounded-lg transition-all duration-500 ${
                inView3
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: inView3 ? `${i * 0.1}s` : "0s",
              }}
            >
              <div className="text-3xl font-bold text-purple-600">#{i}</div>
              <p className="text-sm text-gray-600 mt-2">Item {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Animation 4: Hover Effects */}
      <section ref={ref4} className="p-8">
        <h2 className="text-2xl font-bold mb-4">4. Hover Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hover Scale */}
          <div
            className="p-6 bg-orange-100 rounded-lg transition-all duration-300 
                         hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <h3 className="font-bold mb-2">Scale + Shadow</h3>
            <p className="text-sm text-gray-600">
              Hover to see scale and shadow effects
            </p>
          </div>

          {/* Hover Color Change */}
          <div
            className="p-6 bg-pink-100 rounded-lg transition-all duration-300 
                         hover:bg-pink-200 hover:-translate-y-2 cursor-pointer"
          >
            <h3 className="font-bold mb-2">Color + Translate</h3>
            <p className="text-sm text-gray-600">
              Hover for color and elevation change
            </p>
          </div>
        </div>
      </section>

      {/* Animation 5: Button States */}
      <section className="p-8 bg-gray-50 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">5. Button Animations</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            Scale on Hover
          </Button>
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-white transition-all duration-300"
          >
            Color Change
          </Button>
          <Button
            variant="ghost"
            className="hover:translate-x-2 transition-all duration-300"
          >
            Slide Right →
          </Button>
        </div>
      </section>

      {/* Animation 6: Custom CSS Animation */}
      <section className="p-8 bg-indigo-50 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">6. Custom CSS Animation</h2>
        <div className="flex items-center justify-center">
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 bg-indigo-500 rounded-full animate-pulse"
              style={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping" />
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Pulse + Ping for attention-grabbing effects
        </p>
      </section>

      {/* Code Example */}
      <section className="p-8 bg-gray-900 text-white rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Implementation Example</h2>
        <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-xs">
          {`// Scroll-triggered animation with useInView
const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

// Apply animation classes based on inView state
<div
  ref={ref}
  className={inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
>
  Content animates when scrolled into view
</div>

// Staggered children with delays
{items.map((item, i) => (
  <div key={i} style={{ transitionDelay: (i * 0.1) + 's' }}>
    {item}
  </div>
))}`}
        </pre>
      </section>
    </div>
  );
};

export default AnimationShowcase;
