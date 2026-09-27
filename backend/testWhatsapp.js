import "dotenv/config";
import { sendWhatsAppTemplate } from "./services/whatsappService.js";

// apna WhatsApp number yahan daalo (jo Meta dashboard me verified recipient bhi hai)
const TEST_NUMBER = "918236055718"; // <-- apna 10-digit ya 91-prefixed number daalo

const run = async () => {
  const result = await sendWhatsAppTemplate({
    to: TEST_NUMBER,
    templateName: "hello_world",
    languageCode: "en_US",
    bodyParams: [], // hello_world me koi param nahi hota
  });
  console.log("Result:", result);
};

run();