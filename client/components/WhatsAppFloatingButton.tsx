import React from "react";
import whatsappIcon from "./whatsapp-icon.png";

// WhatsApp number: country code + number (digits only)
const WHATSAPP_NUMBER = "919045562847";

// Default message
const DEFAULT_MESSAGE =
  "Hello! I am interested in Accord Power Digital Products. Could you please provide me with more details?";

export default function WhatsAppFloatingButton() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-transparent"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="h-14 w-14 cursor-pointer transition-transform hover:scale-110 active:scale-95"
      />
    </a>
  );
}
