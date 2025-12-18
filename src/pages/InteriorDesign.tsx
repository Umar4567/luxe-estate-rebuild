import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import PortfolioCard from "@/components/PortfolioCard";
import ServiceCard from "@/components/ServiceCard";
import { Palette, Lightbulb, Sofa, Lamp } from "lucide-react";
import interiorHero from "@/assets/interior-hero.jpg";
import livingRoom from "@/assets/living-room.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import bathroom from "@/assets/bathroom.jpg";
import office from "@/assets/office.jpg";
import diningRoom from "@/assets/dining-room.jpg";

const InteriorDesign = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [portfolioRef, portfolioInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
       className={`relative h-screen flex items-center justify-center text-center transition-all duration-1000 ${
          heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        // className={`relative h-[60vh] flex items-center justify-center text-center pt-20`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${interiorHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 z-10">
          <div className="stagger">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
              <span className="typewriter" style={{ ['--w']: '15ch', ['--chars']: '15' } as unknown as import('react').CSSProperties}>Interior Design</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Transform your space into a masterpiece with our award-winning interior design services
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section 
        ref={portfolioRef}
        className={`py-20 transition-all duration-1000 ${
          portfolioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Portfolio</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of stunning interior designs that showcase our commitment to luxury and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PortfolioCard
              image={livingRoom}
              category="Living Room"
              title="Modern Minimalist Living"
              description="Clean lines and neutral tones create a serene living space that emphasizes comfort and sophistication."
            />
            <PortfolioCard
              image={bedroom}
              category="Bedroom"
              title="Luxury Master Suite"
              description="A tranquil retreat featuring premium materials and thoughtful design elements for ultimate relaxation."
            />
            <PortfolioCard
              image={kitchen}
              category="Kitchen"
              title="Gourmet Kitchen Design"
              description="A chef-inspired kitchen combining functionality with stunning aesthetics and premium finishes."
            />
            <PortfolioCard
              image={bathroom}
              category="Bathroom"
              title="Spa-Inspired Bathroom"
              description="Transform your daily routine into a spa-like experience with luxurious materials and calming design."
            />
            <PortfolioCard
              image={office}
              category="Office"
              title="Executive Home Office"
              description="A sophisticated workspace that inspires productivity while maintaining elegance and comfort."
            />
            <PortfolioCard
              image={diningRoom}
              category="Dining Room"
              title="Elegant Dining Room"
              description="Perfect for entertaining, this dining space combines formal elegance with modern comfort."
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section 
        ref={servicesRef}
        className={`py-20 bg-secondary transition-all duration-1000 delay-200 ${
          servicesInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive interior design solutions tailored to your unique vision and lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<Sofa className="w-8 h-8" />}
              title="Full Home Design"
              description="Complete interior design services from concept to completion for your entire home."
            />
            <ServiceCard
              icon={<Palette className="w-8 h-8" />}
              title="Color Consultation"
              description="Expert color selection to create the perfect mood and atmosphere for each space."
            />
            <ServiceCard
              icon={<Lightbulb className="w-8 h-8" />}
              title="Furniture Selection"
              description="Curated furniture pieces that blend style, comfort, and functionality perfectly."
            />
            <ServiceCard
              icon={<Lamp className="w-8 h-8" />}
              title="Lighting Design"
              description="Strategic lighting solutions that enhance ambiance and highlight architectural features."
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section 
        ref={processRef}
        className={`py-20 transition-all duration-1000 delay-300 ${
          processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A seamless journey from initial concept to stunning reality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We begin with an in-depth consultation to understand your vision, lifestyle, and preferences.",
              },
              {
                step: "02",
                title: "Design Concept",
                description: "Our team creates detailed design concepts and mood boards tailored to your unique style.",
              },
              {
                step: "03",
                title: "Material Selection",
                description: "We carefully select premium materials, finishes, and furnishings that bring your vision to life.",
              },
              {
                step: "04",
                title: "Implementation",
                description: "Our expert team manages every detail of the installation and styling process.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-serif font-bold text-primary mb-4">{item.step}</div>
                <h3 className="text-xl font-serif font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        ref={ctaRef}
        className={`py-20 bg-primary text-primary-foreground transition-all duration-1000 ${
          ctaInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let our expert designers create a space that reflects your unique style and enhances your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-primary">
              Schedule Consultation
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      <FloatingActions />
      <Footer />
    </div>
  );
};

export default InteriorDesign;
