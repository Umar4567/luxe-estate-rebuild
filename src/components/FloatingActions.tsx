import { Phone, MessageCircle, MessageSquare } from "lucide-react";
import { useState } from "react";
import ChatBot from "./ChatBot";

const FloatingActions = () => {
  const [showChat, setShowChat] = useState(false);

  // Contact info
  const whatsappNumber = "15551234567"; // Format: country code + number without +
  const phoneNumber = "+1 (555) 123-4567";
  const rawPhoneNumber = "15551234567"; // For tel: links

  return (
    <>
      <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hi%20I%20am%20interested%20in%20your%20luxury%20properties`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-fade-in"
          aria-label="WhatsApp"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Phone Button */}
        <a
          href={`tel:+${rawPhoneNumber}`}
          className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
          aria-label={`Call Us: ${phoneNumber}`}
          title={`Call: ${phoneNumber}`}
        >
          <Phone className="w-6 h-6" />
        </a>

        {/* Message Button */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
          aria-label="Chat with us"
          title="Chat with our team"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Bot */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </>
  );
};

export default FloatingActions;
