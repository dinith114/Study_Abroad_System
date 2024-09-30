
const nlp = require('compromise');

const processMessage = (msg) => {
    const doc = nlp(msg.toLowerCase());
    
    // Check if the user's message is asking about services
    if (doc.has('service') || doc.has('offer')) {
        return "We offer web development, mobile app development, and digital marketing services.";
    }

    // Check if the user's message is asking about contact information
    if (doc.has('contact') || doc.has('support')) {
        return "You can contact our support team via email at support@yourdomain.com or call us at (123) 456-7890.";
    }

    // Check if the user's message is asking about location
    if (doc.has('location') || doc.has('address')) {
        return "Our main office is located at 1234 Elm Street, Suite 567, Cityville, Country.";
    }

    // Fallback response if no intent is matched
    return "I'm not sure about that. Can you ask something else or provide more details?";
};

module.exports = { processMessage };

