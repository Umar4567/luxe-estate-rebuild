import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/interior-design", label: "Interior Design" },
    { path: "/home-loans", label: "Home Loans" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow">
              <HomeIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold">Real Estate</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
