import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import PropertyCard from "@/components/PropertyCard";
import MasterPlan from "@/components/MasterPlan";
import { TypewriterEffect } from "@/components/TypewriterEffect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import projectsHero from "@/assets/projects-hero.jpg";
import oceanfront1 from "@/assets/oceanfront-1.jpg";
import penthouse1 from "@/assets/penthouse-1.jpg";
import mountainVilla from "@/assets/mountain-villa.jpg";
import villa1 from "@/assets/villa-1.jpg";
import historicPenthouse from "@/assets/historic-penthouse.jpg";
import luxuryCondo from "@/assets/luxury-condo.jpg";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [propertiesRef, propertiesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [masterPlanRef, masterPlanInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const properties = [
    {
      image: oceanfront1,
      price: "$22,800,000",
      title: "Oceanfront Estate",
      location: "Malibu, CA",
      beds: 8,
      baths: 10,
      sqft: "18,000",
      type: "estate",
      features: ["Private Beach", "Guest House", "Home Theater"],
    },
    {
      image: penthouse1,
      price: "$15,200,000",
      title: "Penthouse Suite",
      location: "Manhattan, NY",
      beds: 4,
      baths: 5,
      sqft: "8,500",
      type: "penthouse",
      features: ["City Views", "Private Elevator", "Rooftop Access"],
    },
    {
      image: mountainVilla,
      price: "$12,500,000",
      title: "Mountain View Villa",
      location: "Aspen, CO",
      beds: 7,
      baths: 9,
      sqft: "15,000",
      type: "villa",
      features: ["Mountain Views", "Ski Access", "Wine Cellar"],
    },
    {
      image: villa1,
      price: "$8,500,000",
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      beds: 6,
      baths: 8,
      sqft: "12,000",
      type: "villa",
      features: ["Infinity Pool", "Home Theater", "Smart Home"],
    },
    {
      image: historicPenthouse,
      price: "$6,800,000",
      title: "Historic Penthouse",
      location: "Boston, MA",
      beds: 5,
      baths: 6,
      sqft: "7,200",
      type: "penthouse",
      features: ["Historic Charm", "Exposed Brick", "City Views"],
    },
    {
      image: luxuryCondo,
      price: "$3,200,000",
      title: "Downtown Luxury Condo",
      location: "Miami, FL",
      beds: 3,
      baths: 4,
      sqft: "4,500",
      type: "condo",
      features: ["Bay Views", "Gym Access", "Concierge"],
    },
  ];

  const filteredProperties = filter === "all" 
    ? properties 
    : properties.filter(p => p.type === filter);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
       className={`relative min-h-[65vh] flex items-center justify-center text-center transition-all duration-1000 ${
          heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${projectsHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 z-10">
          <div className="stagger">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
              <TypewriterEffect 
                text="Luxury Properties" 
                speed={80}
                className="inline-block"
              />
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover our exclusive collection of premium properties in the world's most desirable locations
            </p>
          </div>
        </div>
      </section>

      

      

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All Properties
              </Button>
              <Button 
                variant={filter === "villa" ? "default" : "outline"}
                onClick={() => setFilter("villa")}
              >
                Villas
              </Button>
              <Button 
                variant={filter === "penthouse" ? "default" : "outline"}
                onClick={() => setFilter("penthouse")}
              >
                Penthouses
              </Button>
              <Button 
                variant={filter === "estate" ? "default" : "outline"}
                onClick={() => setFilter("estate")}
              >
                Estates
              </Button>
              <Button 
                variant={filter === "condo" ? "default" : "outline"}
                onClick={() => setFilter("condo")}
              >
                Condos
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select defaultValue="price-high">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="beds">Bedrooms</SelectItem>
                  <SelectItem value="sqft">Square Feet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties header */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Featured Properties</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Curated selection of spotlight properties from our portfolio.</p>
        </div>
      </section>

      {/* Properties Grid */}
      <section 
        ref={propertiesRef}
        className={`py-12 transition-all duration-1000 ${
          propertiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, idx) => (
              <PropertyCard key={idx} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Master Plan Section */}
      <section 
        ref={masterPlanRef}
        className={`py-16 bg-secondary transition-all duration-1000 ${
          masterPlanInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Master Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the complete layout of our luxury community with all amenities, facilities, and strategic locations
            </p>
          </div>
          
          <MasterPlan />
        </div>
      </section>

      <FloatingActions />
      <Footer />
    </div>
  );
};

export default Projects;
