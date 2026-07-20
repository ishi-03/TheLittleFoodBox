import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const faqs = [
  {
    q: "How do subscriptions work?",
    a: "Choose a meal plan, select your delivery slot, customize your meals, and complete payment."
  },
  {
    q: "Can I customize my meals?",
    a: "Yes, meal customization is available depending on the selected plan. For any change of salad, please contact the owner directly."
  },
  {
    q: "Can I change my delivery slot?",
    a: "Yes, before the cutoff time and subject to availability. For any change of delivery time, please contact the owner directly."
  },
  {
    q: "Do you offer Jain or Vegan meals?",
    a: "Yes, selected meals are available in Jain and Vegan options."
  },
  {
    q: "Which payment methods are accepted?",
    a: "UPI, Debit/Credit Cards, Net Banking, and other supported payment methods."
  },
  {
    q: "Can I skip a delivery?",
    a: "Depending on your subscription, you may pause or reschedule deliveries."
  },
  {
    q: "How can I contact support?",
    a: "Email us at hello@thelittlefoodbox.com."
  }
];

const FAQs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2b2320] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-4xl font-light mb-10">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#e6ddd3] rounded-xl p-6 bg-white shadow-sm"
            >
              <h2 className="text-xl mb-3">{faq.q}</h2>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;