import React from 'react'
import { PolicyLayout } from '@/components/layout/PolicyLayout'

export const metadata = {
  title: 'Privacy Policy | AyurGlow',
  description: 'Privacy Policy for AyurGlow - Ayurvedic Aesthetics by Dr. Bina G. Rabadia.',
}

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="April 17, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4">OBJECTIVE, SCOPE AND APPLICABILITY</h2>
        <p>
          AyurGlow (“Company”, “we”, “our”, “us”) respects an individual’s privacy and is committed to protecting the same. This Privacy Policy (“Policy”) describes how we collect, use, disclose and transfer Personal Information (as defined below), through platforms controlled by the Company viz. ayurglow.in and mobile sites/application (the “Platforms”) of the individuals who browse, or access the Platform or provide information on or through the Platform, or whose information the Company otherwise collects, receives or processes in connection with the offer and sale of its products (“Products”) (hereinafter, collectively referred to as “Customers”, “you”, “your”) and ensure its compliance with applicable laws and regulations.
        </p>
        <p>
          By accessing and/or using our Platform and providing the information as explained in this Policy, you consent to the collection and use of the information you disclose on the Platform in accordance with this Policy. If you are not comfortable with any of the terms or policies described in this Policy, you may choose to discontinue usage of the Platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4">HOW DO WE COLLECT YOUR PERSONAL INFORMATION?</h2>
        <p>
          We collect and receive the Personal Information in the following ways:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>When you submit your Personal Information:</strong> We collect and store information you provide while using our Platform, such as when you register, place orders, subscribe to newsletters, or contact our customer care.</li>
          <li><strong>Automatic collection:</strong> We automatically collect certain types of information whenever you interact with us, including your IP address, browser version, and how you use our Platform through cookies and other technologies.</li>
          <li><strong>Other sources:</strong> We might receive information about you from other sources, such as updated delivery and address information from third parties.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4">WHAT PERSONAL INFORMATION DO WE COLLECT?</h2>
        <p>
          The Company limits itself to collect information which is necessary to ensure accurate services. This includes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your name, e-mail and postal addresses, phone number(s), and country.</li>
          <li>Financial information such as bank account or payment instrument details for processing transactions.</li>
          <li>Product interest information and your opinions/preferences.</li>
          <li>Technical data about your device and system.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4">HOW DO WE USE THE INFORMATION?</h2>
        <p>
          We use your Personal Information to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Verify your identity and fulfill Product purchases.</li>
          <li>Communicate with you about your account and orders.</li>
          <li>Send newsletters, surveys, and marketing communications (with your consent).</li>
          <li>Comply with legal obligations and prevent fraudulent activities.</li>
          <li>Improve our Products and services based on customer research and feedback.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4">SHARING OF PERSONAL INFORMATION</h2>
        <p>
          We do not rent or sell your Personal Information to any third party. We may share your information with limited partners/service providers who perform services on our behalf (e.g., courier companies, payment processors) and are subject to strict confidentiality. We may also disclose information as required by law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4">SECURITY</h2>
        <p>
          We use appropriate technical and organizational measures to protect the personal information that we collect and process about you. However, please be aware that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#022C22] mt-8 mb-4">CONTACT US</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy, you may contact our Grievance Officer:
        </p>
        <div className="bg-[#F1F5F9] p-4 rounded-lg mt-4 text-sm">
          <p><strong>Name:</strong> Dr. Bina G. Rabadia</p>
          <p><strong>Address:</strong> Shop No 1,2 Ground Floor, Hotel Amreli Inn, Station Road, Amreli – 365601</p>
          <p><strong>Email:</strong> binaaesthetic05@gmail.com</p>
          <p><strong>Phone:</strong> +91 91060 20550</p>
        </div>
      </section>
    </PolicyLayout>
  )
}
