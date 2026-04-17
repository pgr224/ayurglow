import React from 'react'
import { PolicyLayout } from '@/components/layout/PolicyLayout'

export const metadata = {
  title: 'Product Disclaimer | AyurGlow',
  description: 'Medical and usage disclaimer for AyurGlow Ayurvedic products.',
}

export default function DisclaimerPage() {
  return (
    <PolicyLayout title="Product Disclaimer" lastUpdated="April 17, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2 uppercase tracking-wide">GENERAL USAGE</h2>
        <p>
          Please review the relevant product label, warnings, and directions carefully before use. We recommend a patch test for all products, especially if you have sensitive skin or pre-existing medical conditions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2 uppercase tracking-wide">1. Medical Disclaimer</h2>
        <p>
          AyurGlow products are Ayurvedic and aesthetic in nature. They are NOT intended to diagnose, treat, cure, or prevent any disease. The information provided on this website is for educational purposes only and is not a substitute for professional medical advice.
        </p>
        <p className="bg-primary/5 p-4 rounded-lg font-medium border-l-4 border-primary">
          If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using our products.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2 uppercase tracking-wide">2. Natural Ingredients</h2>
        <p>
          Our products are made with natural and Ayurvedic ingredients. Because of this, you may notice slight variations in color, texture, or scent between batches. This is normal and does not affect the efficacy or safety of the product.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2 uppercase tracking-wide">3. Patch Test Instructions</h2>
        <p>
          To perform a patch test:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Apply a small amount of the product to the inside of your elbow or behind the ear.</li>
          <li>Keep the area dry and wait for 24 hours.</li>
          <li>If you experience any redness, burning, itching, or irritation, discontinue use immediately.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2 uppercase tracking-wide">4. Skin Purging</h2>
        <p>
          When introducing new active ingredients (like Retinol or Vitamin C), some individuals may experience "skin purging"—a temporary breakout as the skin renews itself. This usually resolves within 4–6 weeks. If irritation persists or is severe, please consult a dermatologist.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2 uppercase tracking-wide">5. Limitation of Liability</h2>
        <p>
          By purchasing our products, you acknowledge that natural ingredients can still cause sensitivity in some individuals. AyurGlow shall not be held responsible for allergic reactions or sensitivities.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">CONTACT FOR INDIVIDUAL ADVICE</h2>
        <p>
          For personalized skincare advice, we recommend consulting with Dr. Bina G. Rabadia or our team of specialists at our clinic.
        </p>
        <div className="bg-[#F1F5F9] p-4 rounded-lg mt-4 text-sm">
          <p><strong>AyurGlow Aesthetics</strong></p>
          <p>Shop No 1,2 Ground Floor, Hotel Amreli Inn, Station Road, Amreli – 365601</p>
          <p><strong>Email:</strong> binaaesthetic05@gmail.com</p>
          <p><strong>Phone:</strong> +91 91060 20550</p>
        </div>
      </section>
    </PolicyLayout>
  )
}
