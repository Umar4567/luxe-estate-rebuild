import { Badge } from "./ui/badge";

interface PortfolioCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
}

const PortfolioCard = ({ image, category, title, description }: PortfolioCardProps) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground capitalize">{category}</Badge>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;
