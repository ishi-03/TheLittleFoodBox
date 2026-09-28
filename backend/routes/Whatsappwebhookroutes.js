import express from "express";

const router = express.Router();

// Meta yeh GET call karta hai jab dashboard mein "Verify and save" dabate ho
router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Incoming customer messages + delivery status (sent/delivered/read/failed) yahan aate hain
router.post("/webhook", (req, res) => {
  // Meta ko turant 200 do, warna wo baar-baar retry karta hai
  res.sendStatus(200);

  try {
    const entries = req.body?.entry || [];

    for (const entry of entries) {
      for (const change of entry.changes || []) {
        const value = change.value || {};

        for (const msg of value.messages || []) {
          console.log(
            "📩 WhatsApp incoming:",
            msg.from,
            msg.type,
            msg.text?.body || ""
          );
        }

        for (const st of value.statuses || []) {
          console.log(
            "📬 WhatsApp status:",
            st.recipient_id,
            st.status,
            st.errors ? JSON.stringify(st.errors) : ""
          );
        }
      }
    }
  } catch (err) {
    console.error("WhatsApp webhook error:", err);
  }
});

export default router;