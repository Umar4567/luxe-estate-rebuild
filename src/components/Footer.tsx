import { Home as HomeIcon, Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1f2e] text-white mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-lg p-2">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-serif font-semibold">Real Estate</span>
            </div>
            <p className="text-sm text-gray-300 mb-6">
              Creating extraordinary living experiences through luxury Real Estate, innovative design, and exceptional service.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-[#2a3142] hover:bg-primary rounded-full p-2.5 transition-all duration-300 hover:scale-110 transform">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#2a3142] hover:bg-primary rounded-full p-2.5 transition-all duration-300 hover:scale-110 transform">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-[#2a3142] hover:bg-primary rounded-full p-2.5 transition-all duration-300 hover:scale-110 transform">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-[#2a3142] hover:bg-primary rounded-full p-2.5 transition-all duration-300 hover:scale-110 transform">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-[#2a3142] hover:bg-primary rounded-full p-2.5 transition-all duration-300 hover:scale-110 transform">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-primary transition-colors">Projects</Link></li>
              <li><Link to="/interior-design" className="text-gray-300 hover:text-primary transition-colors">Interior Design</Link></li>
              <li><Link to="/home-loans" className="text-gray-300 hover:text-primary transition-colors">Home Loans</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/projects" className="text-gray-300 hover:text-primary transition-colors">Luxury Properties</Link></li>
              <li><Link to="/interior-design" className="text-gray-300 hover:text-primary transition-colors">Interior Design</Link></li>
              <li><Link to="/home-loans" className="text-gray-300 hover:text-primary transition-colors">Home Financing</Link></li>
              <li className="text-gray-300">Property Management</li>
              <li className="text-gray-300">Investment Consulting</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>info@luxeestate.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} LuxeEstate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-primary transition-colors">Website Builder</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
