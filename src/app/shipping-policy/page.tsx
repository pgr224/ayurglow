import React from 'react'
import { PolicyLayout } from '@/components/layout/PolicyLayout'

export const metadata = {
  title: 'Shipping Policy | AyurGlow',
  description: 'Shipping and Delivery detailed policy for AyurGlow.',
}

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="April 17, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">DELIVERY TIMELINES</h2>
        <p>
          At AyurGlow, we strive to deliver your Ayurvedic skincare products as quickly and safely as possible.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Order Processing:</strong> Most orders are processed within 24–48 hours of being placed.</li>
          <li><strong>Estimated Delivery:</strong>
            <ul className="list-circle pl-6 mt-2">
              <li>Within Gujarat: 2–4 business days.</li>
              <li>Rest of India: 4–7 business days.</li>
            </ul>
          </li>
          <li>Please note that deliveries may be delayed due to unforeseen circumstances such as natural calamities, strikes, or public holidays.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">SHIPPING CHARGES</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We offer FREE shipping on all orders above ₹500.</li>
          <li>For orders below ₹500, a nominal shipping fee of ₹50 will apply.</li>
          <li>Cash on Delivery (COD) may involve an additional convenience fee of ₹40.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">ORDER TRACKING</h2>
        <p>
          Once your order is shipped, you will receive a confirmation email and SMS with a tracking link. You can use this link to track the status of your parcel in real-time.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2 text-red-700">DAMAGED IN TRANSIT</h2>
        <p>
          If your order arrives damaged, please take a photo of the package and its contents immediately and email us at <strong>binaaesthetic05@gmail.com</strong> within 24 hours of delivery. We will arrange for a replacement or a refund after verifying the claim.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4 border-b pb-2">CONTACT US</h2>
        <div className="bg-[#F1F5F9] p-4 rounded-lg mt-4 text-sm">
          <p><strong>AyurGlow Support Team</strong></p>
          <p>Email: binaaesthetic05@gmail.com</p>
          <p>Phone: +91 91060 20550</p>
          <p>Address: Shop No 1,2 Ground Floor, Hotel Amreli Inn, Station Road, Amreli – 365601</p>
        </div>
      </section>
    </PolicyLayout>
  )
}
