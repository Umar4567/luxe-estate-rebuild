import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import PropertyCard from "../components/PropertyCard";
import ServiceCard from "../components/ServiceCard";
import { Home as HomeIcon, Palette, Building2, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-bg.jpg";
import villa1 from "../assets/villa-1.jpg";
import penthouse1 from "../assets/penthouse-1.jpg";
import oceanfront1 from "../assets/oceanfront-1.jpg";
import mountainVilla from "../assets/mountain-villa.jpg";
import historicPenthouse from "../assets/historic-penthouse.jpg";
import luxuryCondo from "../assets/luxury-condo.jpg";
import discoveryImg from "../assets/villa-1.jpg";
import conceptImg from "../assets/penthouse-1.jpg";
import executionImg from "../assets/oceanfront-1.jpg";
import scaleImg from "../assets/mountain-villa.jpg";

const Home = () => {
  // New: modal state for story details (prevents 404 by showing details in-page)
  const [openStep, setOpenStep] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [propertiesRef, propertiesInView] = useInView({ triggerOnce: true, threshold: 0.05, rootMargin: '0px 0px -10% 0px' });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // New: storytelling horizontal strip ref
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.12 });

  // Data for storytelling strip (now with images)
  const storyItems = [
    { title: "Discovery", subtitle: "Understand client needs", brief: "Deep discovery to capture vision, budget and timeline.", image: discoveryImg },
    { title: "Concept", subtitle: "Design & planning", brief: "High-level concepts, moodboards and feasibility.", image: conceptImg },
    { title: "Execution", subtitle: "Deliver & refine", brief: "Project management, staging and delivery.", image: executionImg },
    { title: "Scale", subtitle: "Invest & manage", brief: "Ongoing property management and investment insights.", image: scaleImg },
  ];
  
  // Expanded design phases (6 steps)
  const designPhases = [
    { title: "Research & Strategy", desc: "Market analysis, user journeys and feature prioritization.", img: historicPenthouse },
    { title: "Architecture", desc: "Scalable stack, modular components and data flows.", img: luxuryCondo },
    { title: "Polish & Launch", desc: "Design system, animations, QA and production rollout.", img: penthouse1 },
    { title: "Integration & APIs", desc: "API design, third-party integrations and secure endpoints.", img: villa1 },
    { title: "Scaling & Performance", desc: "Load testing, caching, CDNs and autoscaling strategy.", img: mountainVilla },
    { title: "Operations & Support", desc: "Runbooks, monitoring, SLA and ongoing maintenance.", img: oceanfront1 },
  ];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenStep(null);
    }
    if (openStep !== null) {
      document.addEventListener("keydown", onKey);
      // focus close button after open
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.removeEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [openStep]);

  return (
    <div className="min-h-screen">
      {/* Lightweight styles used by the storytelling sections */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar{ display:none; }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
        .scroll-snap { scroll-snap-type: x mandatory; }
        .snap-child { scroll-snap-align: start; }
        .fade-slide { transition: transform .6s cubic-bezier(.2,.9,.3,1), opacity .6s ease; transform: translateY(12px); opacity:0; transition-delay: var(--delay, 0s); }
        .fade-slide.revealed { transform: translateY(0); opacity:1; }

        /* stagger helper for lists */
        .stagger-child { transition: transform .45s ease, opacity .45s ease; transform: translateY(8px); opacity: 0; transition-delay: var(--delay, 0s); }
        .stagger-child.revealed { transform: translateY(0); opacity: 1; }
        /* property card lift */
        .property-anim { transition: transform .35s ease, box-shadow .35s ease; }
        .property-anim:hover { transform: translateY(-6px); box-shadow: 0 14px 30px rgba(0,0,0,0.12); }

        /* Background-card helpers */
        .bg-card { position:relative; overflow:hidden; border-radius:12px; background-size:cover; background-position:center; }
        .bg-card::after { content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.55)); pointer-events:none; }
        .bg-card-content { position:relative; z-index:1; color:inherit; } /* use inherited text color for safety */
        .bg-zoom { transition: transform 0.6s ease, filter 0.4s ease; }
        .bg-zoom:hover { transform: scale(1.03); filter:brightness(1.02); }
        .clickable-card { cursor:pointer; outline: none; }
        .feature-reveal { max-height: 0; overflow: hidden; transition: max-height .45s ease, opacity .3s ease; opacity: 0; }
        .feature-reveal.open { max-height: 600px; opacity: 1; }
      `}</style>
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`relative h-screen flex items-center justify-center text-center transition-all duration-500 ${
          heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } parallax-bg`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 z-10">
          {/* Hero accent - floating badges */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-10 left-6 w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-floating mix-blend-color-dodge" />
            <div className="absolute bottom-24 right-8 w-20 h-20 rounded-full bg-amber-300/30 blur-2xl animate-floating" style={{ animationDelay: '0.8s' }} />
            <div className="absolute top-40 right-40 w-14 h-14 rounded-full bg-white/8 border border-white/10 animate-floating" style={{ animationDelay: '1.2s' }} />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 animate-fade-in">
            <span className="typewriter" style={{ ['--w']: '23ch', ['--chars']: '23' } as unknown as import('react').CSSProperties}>
              Luxury Living <span className="text-[#F59E0B]">Redefined</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover extraordinary properties that redefine luxury living. From stunning penthouses to oceanfront estates, find your perfect sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/projects">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                Explore Properties
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white border-0 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scrolling Storytelling — horizontal strip */}
      <section
        ref={storyRef}
        className={`py-12 transition-all duration-700 ${storyInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">How We Craft Luxury Experiences</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Scroll horizontally to follow our process — elements animate in as they enter view.</p>

          <div className="overflow-x-auto no-scrollbar scroll-snap -mx-4 px-4">
            <div className="flex gap-6 items-stretch">
              {storyItems.map((s, idx) => (
                <article
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenStep(idx)} // open modal instead of navigating to missing route
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenStep(idx); }} // keyboard opens modal
                  className={`min-w-[300px] rounded-xl p-6 shadow-md snap-child fade-slide ${storyInView ? 'revealed' : ''} bg-card bg-zoom clickable-card`}
                  style={{
                    ['--delay' as any]: `${idx * 0.08}s`,
                    transitionDelay: `${idx * 0.08}s`,
                    backgroundImage: `url(${s.image})`
                  }}
                >
                  <div className="bg-card-content">
                    <div className="text-sm text-muted-foreground mb-2">Step {idx + 1}</div>
                    <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                    <div className="text-sm text-primary mb-3">{s.subtitle}</div>
                    <p className="text-sm text-muted-foreground mb-4">{s.brief}</p>

                    {/* small feature tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/90">Planning</span>
                      <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/90">Research</span>
                    </div>

                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(ev) => { ev.stopPropagation(); setOpenStep(idx); }}
                        aria-label={`Learn more about ${s.title}`}
                      >
                        Learn more
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Vertical Storytelling — design & software process */}
      <section className="py-4 bg-secondary/5"> {/* reduced vertical padding to remove extra space */}
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-2 text-center">Designing the Platform</h2> {/* tighter bottom margin */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* reduced grid gap */}
            {designPhases.map((step, i) => (
              <div
                key={i}
                className={`p-5 rounded-lg shadow-sm fade-slide bg-card bg-zoom ${storyInView ? 'revealed' : ''}`}
                style={{
                  transitionDelay: `${i * 60}ms`, /* slightly tighter stagger and smaller padding */
                  backgroundImage: `url(${step.img})`
                }}
              >
                <div className="bg-card-content">
                  <div className="text-sm text-muted-foreground mb-2">Phase {i + 1}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>
                  {/* small feature bullets under each phase */}
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clear acceptance criteria</li>
                    <li>• Iterative deliverables</li>
                    <li>• Built-in monitoring & QA</li>
                  </ul>
                </div>
              </div>
            ))}
           </div>
         </div>
       </section>
 
      {/* Featured Properties */}
      <section 
        ref={propertiesRef}
        className={`py-20 -mt-4 bg-secondary transition-all duration-500 ${propertiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Featured Properties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked selection of our most exclusive properties, each offering unparalleled luxury and sophistication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 stagger">
            <div className={`stagger-child property-anim ${propertiesInView ? 'revealed' : ''}`} style={{ ['--delay']: propertiesInView ? '0.05s' : '0s', transitionDelay: propertiesInView ? '0.05s' : '0s' } as unknown as import('react').CSSProperties}>
              <PropertyCard
              image={villa1}
              price="$8,500,000"
              title="Modern Luxury Villa"
              location="Beverly Hills, CA"
              beds={6}
              baths={8}
              sqft="12,000"
              features={["Infinity Pool", "Home Theater", "Smart Home"]}
              />
            </div>
            <div className={`stagger-child property-anim ${propertiesInView ? 'revealed' : ''}`} style={{ ['--delay']: propertiesInView ? '0.12s' : '0s', transitionDelay: propertiesInView ? '0.12s' : '0s' } as unknown as import('react').CSSProperties}>
              <PropertyCard
              image={penthouse1}
              price="$15,200,000"
              title="Penthouse Suite"
              location="Manhattan, NY"
              beds={4}
              baths={5}
              sqft="8,500"
              features={["City Views", "Private Elevator", "Rooftop Access"]}
              />
            </div>
            <div className={`stagger-child property-anim ${propertiesInView ? 'revealed' : ''}`} style={{ ['--delay']: propertiesInView ? '0.18s' : '0s', transitionDelay: propertiesInView ? '0.18s' : '0s' } as unknown as import('react').CSSProperties}>
              <PropertyCard
              image={oceanfront1}
              price="$22,800,000"
              title="Oceanfront Estate"
              location="Malibu, CA"
              beds={8}
              baths={10}
              sqft="18,000"
              features={["Private Beach", "Guest House", "Home Theater"]}
              />
            </div>

            <div className={`stagger-child property-anim ${propertiesInView ? 'revealed' : ''}`} style={{ ['--delay']: propertiesInView ? '0.22s' : '0s' } as unknown as import('react').CSSProperties}>
              <PropertyCard
              image={mountainVilla}
              price="$12,500,000"
              title="Mountain View Villa"
              location="Aspen, CO"
              beds={7}
              baths={9}
              sqft="15,000"
              features={["Mountain Views", "Ski Access", "Wine Cellar"]}
              />
            </div>

            <div className={`stagger-child property-anim ${propertiesInView ? 'revealed' : ''}`} style={{ ['--delay']: propertiesInView ? '0.28s' : '0s' } as unknown as import('react').CSSProperties}>
              <PropertyCard
              image={historicPenthouse}
              price="$6,800,000"
              title="Historic Penthouse"
              location="Boston, MA"
              beds={5}
              baths={6}
              sqft="7,200"
              features={["Historic Charm", "Exposed Brick", "City Views"]}
              />
            </div>

            <div className={`stagger-child property-anim ${propertiesInView ? 'revealed' : ''}`} style={{ ['--delay']: propertiesInView ? '0.34s' : '0s' } as unknown as import('react').CSSProperties}>
              <PropertyCard
              image={luxuryCondo}
              price="$3,200,000"
              title="Downtown Luxury Condo"
              location="Miami, FL"
              beds={3}
              baths={4}
              sqft="4,500"
              features={["Bay Views", "Gym Access", "Concierge"]}
              />
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/projects">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section 
        ref={servicesRef}
        className={`py-20 transition-all duration-500 delay-100 ${
          servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive Real Estate solutions tailored to your unique needs and aspirations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<HomeIcon className="w-8 h-8" />}
              title="Luxury Properties"
              description="Discover exclusive properties in the most prestigious locations worldwide."
            />
            <ServiceCard
              icon={<Palette className="w-8 h-8" />}
              title="Interior Design"
              description="Transform your space with our award-winning interior design services."
            />
            <ServiceCard
              icon={<Building2 className="w-8 h-8" />}
              title="Home Financing"
              description="Secure competitive rates and flexible terms for your dream home."
            />
            <ServiceCard
              icon={<Shield className="w-8 h-8" />}
              title="Property Management"
              description="Comprehensive property management services for your investments."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className={`py-20 bg-primary text-primary-foreground transition-all duration-500 ${
          ctaInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let our expert team guide you through every step of your luxury Real Estate journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-primary">
                Get Started Today
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Step details modal (in-page) */}
      {openStep !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpenStep(null)}
        >
          <div className="max-w-2xl w-full bg-background rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold mb-1">{storyItems[openStep].title}</h3>
                <div className="text-sm text-muted-foreground mb-4">{storyItems[openStep].subtitle}</div>
              </div>
              <button ref={closeBtnRef} onClick={() => setOpenStep(null)} className="ml-4 text-sm p-2 rounded-md hover:bg-gray-100" aria-label="Close dialog">Close</button>
            </div>
            <div className="mb-4">
              <img src={storyItems[openStep].image} alt={storyItems[openStep].title} className="w-full h-40 object-cover rounded-md mb-3" />
              <p className="text-sm text-muted-foreground">{storyItems[openStep].brief}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="default" onClick={() => { /* placeholder: trigger real CTA or navigate */ setOpenStep(null); }}>
                Proceed
              </Button>
              <Button variant="outline" onClick={() => setOpenStep(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <FloatingActions />
      <Footer />
    </div>
  );
};
 
export default Home;
