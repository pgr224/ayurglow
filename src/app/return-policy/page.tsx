import React from 'react'
import { PolicyLayout } from '@/components/layout/PolicyLayout'

export const metadata = {
  title: 'Return & Refund Policy | AyurGlow',
  description: 'Detailed policy regarding returns, replacements, and refunds for AyurGlow products.',
}

export default function ReturnPolicyPage() {
  return (
    <PolicyLayout title="Return & Refund Policy" lastUpdated="April 17, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4">GENERAL GUIDELINES</h2>
        <p>
          At AyurGlow, we take immense pride in the quality of our Ayurvedic products. Due to the personal care nature of our items, we follow a strict return policy to ensure hygiene and safety.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 uppercase tracking-wide text-red-700 bg-red-50 p-2 border-l-4 border-red-700">Non-Returnable Items</h2>
        <p className="mt-2 text-sm text-red-800 italic">
          Please note that returns are NOT accepted for the following, unless the product is received in a damaged or wrong condition:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Items that have been opened, used, or altered.</li>
          <li>Items without original packaging and seals.</li>
          <li>Free gifts or promotional items.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">ELIGIBILITY FOR REPLACEMENT/REFUND</h2>
        <p>
          You are eligible for a replacement or refund only if:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The product received is damaged or defective.</li>
          <li>The product received is different from what was ordered.</li>
          <li>The product has expired by the time of delivery.</li>
        </ul>
        <p className="mt-4 font-semibold text-[#022C22] bg-primary/10 p-4 rounded-lg">
          Note: Any claim for damage or wrong product must be reported within 24 hours of delivery with a clear unboxing video.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">HOW TO REQUEST A RETURN?</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Email us at <strong>binaaesthetic05@gmail.com</strong> or WhatsApp us at <strong>+91 91060 20550</strong>.</li>
          <li>Provide your Order ID and attach a photo/video of the issue.</li>
          <li>Our team will review the request and respond within 48 hours.</li>
          <li>If approved, we will initiate a pickup or ask you to ship it back (shipping costs will be reimbursed for valid claims).</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">REFUND PROCESS</h2>
        <p>
          Once the returned item is received and inspected, we will notify you of the approval or rejection of your refund.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Approved Refunds:</strong> Will be processed to your original payment method or bank account within 5–7 business days.</li>
          <li><strong>COD Orders:</strong> Refunds will be made via bank transfer or store credit.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">CONTACT INFORMATION</h2>
        <div className="bg-[#F1F5F9] p-4 rounded-lg mt-4 text-sm">
          <p><strong>AyurGlow Support Team</strong></p>
          <p>Shop No 1,2 Ground Floor, Hotel Amreli Inn, Station Road, Amreli – 365601</p>
          <p><strong>Email:</strong> binaaesthetic05@gmail.com</p>
          <p><strong>Phone:</strong> +91 91060 20550</p>
        </div>
      </section>
    </PolicyLayout>
  )
}
