import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="text-center">
      <div className="bg-primary rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <div className="text-primary-foreground">{icon}</div>
      </div>
      <h3 className="text-xl font-serif font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default ServiceCard;
