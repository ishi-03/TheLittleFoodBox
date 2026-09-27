const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";

// Indian numbers ko WhatsApp ke required format me convert karta hai (91XXXXXXXXXX, no + or spaces)
const formatIndianNumber = (phone) => {
  if (!phone) return null;
  let digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  if (digits.length === 11 && digits.startsWith("0")) digits = "91" + digits.slice(1);
  return digits;
};

export const sendWhatsAppTemplate = async ({
  to,
  templateName,
  languageCode = "en_US",
  bodyParams = [],
}) => {
  const formattedTo = formatIndianNumber(to);

  if (!formattedTo) {
    console.error("WhatsApp: invalid phone number, skipping send:", to);
    return { success: false, error: "invalid_phone" };
  }

  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error(
      "WhatsApp: WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID missing in .env, skipping send"
    );
    return { success: false, error: "not_configured" };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: formattedTo,
          type: "template",
          template: {
            name: templateName,
            language: { code: languageCode },
            components: bodyParams.length
              ? [
                  {
                    type: "body",
                    parameters: bodyParams.map((text) => ({
                      type: "text",
                      text: String(text),
                    })),
                  },
                ]
              : [],
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", JSON.stringify(data));
      return { success: false, error: data };
    }

    console.log("✅ WhatsApp message sent to", formattedTo);
    return { success: true, data };
  } catch (error) {
    console.error("WhatsApp send failed:", error.message);
    return { success: false, error: error.message };
  }
};