import { useInView } from "react-intersection-observer";
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ValueCard from "@/components/ValueCard";
import { Star, Shield, Lightbulb } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import teamMember from "@/assets/team-member.jpg";
import livingRoom from "@/assets/living-room.jpg";
import office from "@/assets/office.jpg";
import bedroom from "@/assets/bedroom.jpg";

const About = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [showTeamModal, setShowTeamModal] = useState(false);
  const teamMembers = [
    { id: 1, name: "Sarah Johnson", role: "Chief Executive Officer", bio: "20+ years in luxury Real Estate. Harvard MBA." },
    { id: 2, name: "Michael Chen", role: "Chief Operations Officer", bio: "Oversees operations across 50+ markets worldwide." },
    { id: 3, name: "Victoria Martinez", role: "Head of Sales", bio: "Award-winning agent with $1B+ in transactions." },
    { id: 4, name: "James Wilson", role: "Legal & Compliance", bio: "Ensures all transactions meet highest standards." },
    { id: 5, name: "Emily Rodriguez", role: "Client Relations Manager", bio: "Dedicated to exceptional client service & support." },
    { id: 6, name: "David Kumar", role: "Technology Officer", bio: "Leads innovation in Real Estate technology." },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`relative h-screen flex items-center justify-center text-center transition-all duration-1000 ${
          heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${aboutHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 z-10">
          <div className="stagger">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
              <span className="typewriter" style={{ ['--w']: '17ch', ['--chars']: '17' } as unknown as CSSProperties}>About Real Estate</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Redefining luxury Real Estate through innovation, expertise, and unparalleled service
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section 
        ref={storyRef}
        className={`py-20 transition-all duration-1000 ${
          storyInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2008, Real Estate emerged from a vision to transform the luxury Real Estate experience. We believe that finding the perfect home should be as extraordinary as the properties themselves.
              </p>
              <p className="text-muted-foreground mb-4">
                Our journey began with a simple principle: combine deep market expertise with innovative technology and personalized service to create an unmatched Real Estate experience.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to be recognized as one of the leading luxury Real Estate firms, having facilitated over $2.5 billion in transactions across the world's most prestigious markets.
              </p>
            </div>
            <div className="relative">
              <img 
                src={teamMember} 
                alt="Team Member" 
                className="rounded-2xl shadow-xl w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-serif font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section 
        ref={statsRef}
        className={`py-20 bg-secondary transition-all duration-1000 delay-200 ${
          statsInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">$2.5B+</div>
              <div className="text-muted-foreground">Properties Sold</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Luxury Markets</div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section 
        ref={teamRef}
        className={`py-20 transition-all duration-1000 ${
          teamInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our passionate team of experts brings decades of combined experience in luxury Real Estate, design, and finance.
          </p>
          <Button size="lg" onClick={() => setShowTeamModal(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Explore Our Team
          </Button>
        </div>
      </section>

      {/* Team Modal Overlay */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-bold">Meet Our Team</h3>
              <button onClick={() => setShowTeamModal(false)} className="text-2xl text-muted-foreground">✕</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/10 rounded mb-3 flex items-center justify-center">
                    <div className="text-4xl font-serif text-primary/50">{member.name.charAt(0)}</div>
                  </div>
                  <h4 className="font-semibold text-lg">{member.name}</h4>
                  <p className="text-sm text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Our Team in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <img src={teamMember} alt="Team collaboration" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <img src={livingRoom} alt="Office workspace" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <img src={office} alt="Meeting room" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section 
        ref={valuesRef}
        className={`py-20 bg-secondary transition-all duration-1000 delay-300 ${
          valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Star className="w-8 h-8" />}
              title="Excellence"
              description="We pursue perfection in every detail, from property selection to client service."
            />
            <ValueCard
              icon={<Shield className="w-8 h-8" />}
              title="Integrity"
              description="Transparency and honesty form the foundation of all our relationships."
            />
            <ValueCard
              icon={<Lightbulb className="w-8 h-8" />}
              title="Innovation"
              description="We embrace technology and new approaches to enhance the Real Estate experience."
            />
          </div>
        </div>
      </section>

      <FloatingActions />
      <Footer />
    </div>
  );
};

export default About;
