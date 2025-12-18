import { ReactNode } from "react";

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-8 text-center shadow-sm">
      <div className="bg-primary rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
        <div className="text-primary-foreground">{icon}</div>
      </div>
      <h3 className="text-xl font-serif font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default ValueCard;
