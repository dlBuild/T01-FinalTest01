import { Link, useParams, Navigate } from 'react-router-dom';

/**
 * Public policy pages. Cashfree reviews these before approving your domain for live payments
 * (Contact Us, Terms and Conditions, Refunds and Cancellations), so they must open WITHOUT login.
 *
 * >>> BEFORE GOING LIVE: set the real contact details below (or via VITE_* variables at build time)
 * >>> and have the wording checked against how you actually sell and refund.
 */
const CONTACT = {
  business: import.meta.env.VITE_BUSINESS_NAME || 'Project T01',
  email: import.meta.env.VITE_SUPPORT_EMAIL || 'support@example.com',
  phone: import.meta.env.VITE_SUPPORT_PHONE || '+91 00000 00000',
  address: import.meta.env.VITE_BUSINESS_ADDRESS || 'Your registered business address, City, State, PIN, India',
};

const P = ({ children }) => <p className="leading-relaxed text-navy-800/80">{children}</p>;
const UL = ({ items }) => <ul className="list-disc pl-6 space-y-1.5 leading-relaxed text-navy-800/80">{items.map((i, n) => <li key={n}>{i}</li>)}</ul>;
const LAST_UPDATED = 'November 24, 2026'; // change this each time you edit the terms
const H = ({ children }) => <h2 className="text-xl font-extrabold mt-8 mb-2">{children}</h2>;

const H3 = ({ children }) => <h3 className="text-lg font-bold mt-6 mb-1">{children}</h3>;

const PAGES = {
  contact: {
    title: 'Contact us',
    body: (
      <>
        <P>Questions about a product, your account or a payment? Write to us and we will reply within 2 working days.</P>
        <div className="card p-6 mt-6 space-y-2">
          <p><strong>{CONTACT.business}</strong></p>
          <p>Email: <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p>Phone: {CONTACT.phone}</p>
          <p>Address: {CONTACT.address}</p>
        </div>
      </>
    ),
  },
  terms: {
    title: 'Terms and Conditions',
    tagline: 'Clear expectations. Honest commitments. Meaningful growth.',
    body: (
      <>
        <P>Welcome to Project T01.</P>
        <P>We are glad to have you here.</P>
        <P>T01 was started with a simple belief: every student and young person deserves access to useful knowledge, practical learning resources and better guidance to make informed decisions about their future.</P>
        <P>In India, many students and graduates face challenges when choosing careers, developing practical skills, preparing for employment and understanding the opportunities available to them.</P>
        <P>We believe that the right information, when presented clearly and made accessible, can help people take better steps towards their goals.</P>
        <P>Our journey begins with small digital products and learning resources, with the larger vision of building meaningful solutions for education, career development, skill enhancement and personal growth.</P>
        <P>These Terms and Conditions explain how you can access and use Project T01, purchase our products and interact with our platform.</P>
        <P>By accessing our website, creating an account or purchasing any product from T01, you agree to the terms outlined below. Please read them carefully before using our services.</P>
        <H>1. About Project T01</H>
        <P>Project T01 is an initiative focused on helping students, graduates and young people make better decisions about education, careers, skills and personal development.</P>
        <P>Our current offerings may include:</P>
        <UL items={[
          "Digital e-books and educational guides.",
          "Career roadmaps and career exploration resources.",
          "Interview preparation materials.",
          "Skill development resources.",
          "Resume and portfolio-building guides.",
          "Learning materials and practical educational resources.",
          "Other digital products related to education and personal growth.",
        ]} />
        <P>We are starting small, learning from real people and continuously improving our products based on genuine needs and feedback.</P>
        <P>Our long-term vision is to expand into structured learning systems, career development programs and personalised guidance.</P>
        <H>2. Acceptance of Terms</H>
        <P>By visiting our website, creating an account, purchasing a digital product or using any service offered by Project T01, you acknowledge that you have read, understood and agreed to these Terms and Conditions.</P>
        <P>If you do not agree with these terms, please do not use our website or purchase our products.</P>
        <P>You must be legally capable of entering into a binding agreement under applicable Indian law to make purchases independently. If you are under 18, purchases should be made with the involvement and consent of a parent or legal guardian, as applicable.</P>
        <H>3. Products and Services We Offer</H>
        <P>Project T01 primarily provides digital educational products and learning resources.</P>
        <P>These may include e-books, downloadable or online reading materials, guides, roadmaps and other digital resources.</P>
        <P>Important information about our products:</P>
        <UL items={[
          "All products are delivered digitally.",
          "No physical books, packages or other physical items are shipped unless explicitly stated.",
          "Product descriptions explain the contents and intended purpose of each purchase.",
          "Product formats and access methods may vary.",
          "Access is provided according to the details mentioned on the respective product page.",
        ]} />
        <P>We aim to describe our products as accurately as possible so customers understand what they are purchasing.</P>
        <H>4. Pricing and Payments</H>
        <P>All product prices on Project T01 are displayed in Indian Rupees (INR).</P>
        <P>Unless otherwise stated, displayed prices include applicable taxes.</P>
        <P>Payments are processed through our authorised payment partner, Cashfree Payments.</P>
        <P>By making a purchase, you agree to:</P>
        <UL items={[
          "Provide accurate payment and billing information.",
          "Complete the payment through the available payment methods.",
          "Ensure that you are authorised to use the selected payment method.",
          "Avoid fraudulent, unauthorised or misleading transactions.",
        ]} />
        <P>Project T01 does not intentionally collect or store complete card details, UPI PINs or banking passwords. Payment processing is handled through the payment provider's secure systems.</P>
        <P>Payment confirmation and transaction processing are subject to the payment provider and relevant banking systems.</P>
        <H>5. Account Registration and Security</H>
        <P>Some features and purchased products may require you to create an account on Project T01.</P>
        <P>When creating an account, you agree to provide accurate and up-to-date information.</P>
        <P>You are responsible for:</P>
        <UL items={[
          "Maintaining the confidentiality of your login credentials.",
          "Keeping your password secure.",
          "All activities carried out through your account, subject to applicable law.",
          "Informing us if you suspect unauthorised access to your account.",
        ]} />
        <P>You must not:</P>
        <UL items={[
          "Create accounts using false or misleading information.",
          "Access another person's account without permission.",
          "Attempt to bypass account security.",
          "Use the platform for fraudulent or unlawful activities.",
        ]} />
        <P>Project T01 reserves the right to investigate suspicious activity and take appropriate action in accordance with applicable laws and these terms.</P>
        <H>6. Product Access After Purchase</H>
        <P>We aim to make purchasing and accessing digital products simple.</P>
        <P>Once your payment is successfully confirmed by Cashfree Payments, access to the purchased product is generally granted automatically through your registered account.</P>
        <P>Please note:</P>
        <UL items={[
          "Product access depends on successful payment confirmation.",
          "Access is generally linked to the account used during purchase.",
          "You should use the correct registered email address when purchasing.",
          "Access may occasionally be delayed due to technical or payment-processing issues.",
        ]} />
        <P>If your bank account has been debited but the product is not available in your account within a few minutes, please contact our support team with your Order ID and transaction details.</P>
        <P>We will investigate the issue and work towards providing product access or an appropriate resolution.</P>
        <H>7. Personal Use and Restrictions</H>
        <P>All digital products purchased from Project T01 are intended for individual learning and personal use unless a different licence is explicitly provided.</P>
        <P>When you purchase a product, you receive a limited, non-exclusive, non-transferable right to access and use that product for its intended personal purpose.</P>
        <P>You are not permitted to:</P>
        <UL items={[
          "Share your account credentials with others.",
          "Redistribute or resell purchased digital products.",
          "Copy or reproduce our content for commercial purposes.",
          "Upload our products to public websites, groups or file-sharing platforms.",
          "Modify, republish or distribute our materials without written permission.",
          "Claim our original content as your own.",
          "Use our resources in ways that violate applicable laws or intellectual property rights.",
        ]} />
        <P>We encourage learning, personal development and responsible use of knowledge.</P>
        <P>However, unauthorised distribution or commercial exploitation of our content is not permitted.</P>
        <H>8. Intellectual Property and Ownership</H>
        <P>All original content available through Project T01 belongs to Project T01 or its respective content owners and licensors.</P>
        <P>This includes:</P>
        <UL items={[
          "E-books and educational materials.",
          "Written guides and roadmaps.",
          "Learning resources and original content.",
          "Website design and branding.",
          "Logos, graphics and visual elements.",
          "Original frameworks and educational materials.",
        ]} />
        <P>Purchasing a digital product does not transfer ownership or copyright to the customer.</P>
        <P>You receive permission to use the purchased product for personal learning purposes, subject to the applicable licence.</P>
        <P>Any unauthorised copying, redistribution, resale or commercial use may result in appropriate legal action under applicable intellectual property laws.</P>
        <H>9. Educational Disclaimer</H>
        <P>Project T01 creates educational and informational resources to support learning, career exploration and personal development.</P>
        <P>Our content is intended to help users understand opportunities, develop skills and make more informed decisions.</P>
        <P>However, we do not guarantee:</P>
        <UL items={[
          "Employment or job placement.",
          "Admission to any educational institution.",
          "Selection in interviews or competitive examinations.",
          "Salary increases or promotions.",
          "Business success or financial outcomes.",
          "Any specific career or personal achievement.",
        ]} />
        <P>Individual outcomes depend on many factors, including personal effort, qualifications, experience, market conditions and external opportunities.</P>
        <P>Our products are designed to provide guidance and support, not guaranteed results.</P>
        <P>Users are encouraged to evaluate their individual circumstances and make independent decisions.</P>
        <H>10. User Responsibilities and Acceptable Use</H>
        <P>We want Project T01 to remain a safe, useful and respectful learning environment.</P>
        <P>When using our website, you agree not to:</P>
        <UL items={[
          "Engage in fraudulent or unlawful activities.",
          "Attempt to disrupt or damage our website.",
          "Upload malicious software or harmful files.",
          "Interfere with the security or functionality of our platform.",
          "Misuse our website or content for unauthorised commercial purposes.",
          "Violate the rights of other users or third parties.",
        ]} />
        <P>We reserve the right to take reasonable action if these terms are violated, subject to applicable law.</P>
        <H>11. Refunds and Cancellations</H>
        <P>Since our products are digital and access is generally provided immediately after successful payment, orders cannot ordinarily be cancelled once product access has been granted.</P>
        <P>However, we understand that payment errors and technical issues can occur.</P>
        <P>Refunds may be considered in genuine situations such as:</P>
        <UL items={[
          "Duplicate payments for the same product.",
          "Successful payment without product access.",
          "Incorrect charges resulting from a payment-related technical issue.",
        ]} />
        <P>Where appropriate, we may provide product access or issue a refund for the affected amount.</P>
        <P>For complete information about eligibility, procedures and timelines, please read our separate <Link to="/refund-policy" className="text-sky-brand font-semibold underline">Refunds and Cancellations Policy</Link>.</P>
        <P>Nothing in this section limits any consumer rights available under applicable law.</P>
        <H>12. Website Availability and Technical Issues</H>
        <P>We aim to keep Project T01 accessible and functioning properly.</P>
        <P>However, temporary interruptions may occur because of:</P>
        <UL items={[
          "Scheduled maintenance.",
          "Technical upgrades.",
          "Internet or server issues.",
          "Payment gateway interruptions.",
          "Security-related maintenance.",
          "Circumstances beyond our reasonable control.",
        ]} />
        <P>We will make reasonable efforts to restore services and minimise interruptions.</P>
        <P>We cannot guarantee uninterrupted or error-free website availability at all times.</P>
        <H>13. Privacy and Personal Information</H>
        <P>We respect your privacy and understand the importance of protecting personal information.</P>
        <P>Information collected through Project T01 may be used for purposes such as:</P>
        <UL items={[
          "Creating and managing user accounts.",
          "Processing purchases and payments.",
          "Providing access to purchased products.",
          "Responding to customer support requests.",
          "Maintaining website security.",
          "Improving our products and services.",
          "Meeting applicable legal obligations.",
        ]} />
        <P>Payment information is handled through our payment partner's systems in accordance with their applicable processes and policies.</P>
        <P>For complete details about the information we collect, how we use it and how we protect it, please read our separate <Link to="/privacy" className="text-sky-brand font-semibold underline">Privacy Policy</Link>.</P>
        <H>14. Third-Party Services</H>
        <P>Project T01 may rely on third-party services to operate certain website features and processes.</P>
        <P>These may include payment gateways, hosting providers, email services and other technology partners.</P>
        <P>For example, Cashfree Payments helps process customer transactions.</P>
        <P>The use of these services may be subject to the respective third party's terms, conditions and privacy policies.</P>
        <P>Project T01 is not responsible for independent third-party services beyond its reasonable control, subject to applicable law.</P>
        <H>15. Changes to Products and Services</H>
        <P>As T01 continues to grow, we may introduce new products, improve existing resources or discontinue certain offerings.</P>
        <P>We may also update product descriptions, website features and learning materials to improve quality and relevance.</P>
        <P>We aim to keep product information accurate and communicate material changes appropriately.</P>
        <P>Where a change materially affects an existing purchase, we will handle the matter fairly and in accordance with applicable law and the relevant purchase terms.</P>
        <H>16. Changes to These Terms</H>
        <P>Project T01 may revise or update these Terms and Conditions from time to time.</P>
        <P>Updates may be made to reflect:</P>
        <UL items={[
          "Changes in our products and services.",
          "Improvements to our website.",
          "New features or business requirements.",
          "Changes in applicable laws and regulations.",
        ]} />
        <P>The latest version will be published on this page along with its updated date.</P>
        <P>Your continued use of the website after updated terms become effective will constitute acceptance of those terms where legally applicable.</P>
        <P>If you do not agree with the updated terms, you should discontinue using the affected services.</P>
        <H>17. Limitation of Liability</H>
        <P>Project T01 aims to provide useful, accurate and practical educational resources.</P>
        <P>However, to the extent permitted by applicable law, we do not guarantee that all content will always be complete, current, error-free or suitable for every individual's circumstances.</P>
        <P>We are not responsible for career, educational or personal decisions made solely on the basis of our materials.</P>
        <P>Nothing in these terms excludes or limits liability that cannot legally be excluded or limited under applicable Indian law, including applicable consumer protection rights.</P>
        <H>18. Governing Law and Disputes</H>
        <P>These Terms and Conditions are governed by the laws of India.</P>
        <P>Any disputes arising in connection with the use of Project T01 will be addressed in accordance with applicable Indian laws and regulations.</P>
        <P>We encourage customers to contact our support team first so that genuine concerns can be understood and resolved wherever possible.</P>
        <P>Nothing in this section restricts your statutory rights to seek remedies through appropriate consumer protection authorities or legal forums.</P>
        <H>19. Contact and Customer Support</H>
        <P>If you have questions, concerns or difficulties related to these Terms and Conditions, product purchases, payments or account access, please contact us.</P>
        <div className="card p-6 space-y-2">
          <p><strong>Project:</strong> T01</p>
          <p><strong>Email:</strong> <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p><strong>Support:</strong> Customer assistance for product access, payment-related concerns and general enquiries.</p>
        </div>
        <P>We will make reasonable efforts to review your concerns and provide an appropriate response.</P>
        <H>20. Related Policies</H>
        <P>For a better understanding of how Project T01 operates, we encourage you to review our other policies:</P>
        <UL items={[
          <><Link to="/refund-policy" className="text-sky-brand font-semibold underline">Refunds and Cancellations Policy</Link>: Understand our refund eligibility, payment issues and cancellation conditions.</>,
          <><Link to="/privacy" className="text-sky-brand font-semibold underline">Privacy Policy</Link>: Understand how your personal information is collected, used and protected.</>,
        ]} />
        <div className="mt-14 pt-8 border-t border-navy-800/15 space-y-4">
          <h2 className="font-display text-2xl font-extrabold">A Message from Project T01</h2>
          <P>We started T01 because we believe that young people deserve better opportunities to learn, grow and make informed decisions about their future.</P>
          <P>We have seen how students struggle to choose careers, how graduates search for practical guidance and how many young people feel overwhelmed by information without knowing what to do next.</P>
          <P>We believe that access to useful knowledge should not be unnecessarily complicated or expensive.</P>
          <P>Our journey begins with affordable digital products and practical learning resources. As we grow, we hope to develop more structured learning experiences, career programs and guidance systems that address real problems faced by young people in India.</P>
          <P>We are not claiming to have every answer today.</P>
          <P>We are learning, listening and building step by step.</P>
          <P>Our commitment is to create useful solutions, communicate honestly and treat every person who becomes part of this journey with respect.</P>
          <P>Because T01 is not just about selling information.</P>
          <P>It is about helping people find direction, develop their abilities and take meaningful steps towards the future they want to build.</P>
          <P>Thank you for being part of our journey.</P>
          <p className="font-bold">Project T01</p>
          <p className="text-navy-800/70">Starting small. Building meaningful solutions.</p>
          <p className="text-navy-800/70">Your journey matters. Let's make the next step clearer.</p>
        </div>
        <p className="mt-8 text-sm text-navy-800/60">Last Updated: {LAST_UPDATED}</p>
      </>
    ),
  },
  'refund-policy': {
    title: 'Refunds and Cancellations',
    tagline: 'Your trust matters. Our responsibility comes first.',
    body: (
      <>
        <P>At T01, we believe that learning, career development and personal growth should be accessible, practical and valuable for everyone.</P>
        <P>We started T01 with a simple purpose: to help students, graduates and young people in India make better decisions about their education, careers, skills and personal growth.</P>
        <P>We understand that when someone purchases a digital product, they are not simply spending money. They are investing in their learning, their development and their future.</P>
        <P>That is why we believe every purchase should come with clarity, transparency and a fair experience.</P>
        <P>This Refunds and Cancellations Policy explains how we handle payments, product access, cancellations and refund requests.</P>
        <P>Our goal is simple: to treat every customer fairly and resolve genuine payment or product-access issues responsibly.</P>
        <H>1. Our Approach to Refunds</H>
        <P>T01 primarily offers digital products such as:</P>
        <UL items={[
          "Career roadmaps and educational guides.",
          "Skill development resources.",
          "Interview preparation materials.",
          "Resume and career-building resources.",
          "Learning guides and other digital resources.",
        ]} />
        <P>Since these products are delivered digitally and access is generally provided immediately after successful payment, they cannot be physically returned.</P>
        <P>For this reason, once access to a digital product has been successfully granted, an order generally cannot be cancelled or refunded simply because a customer changes their mind or no longer wishes to use the product.</P>
        <P>However, we understand that technical issues and payment errors can happen.</P>
        <P>We do not want customers to lose money because of a problem on our side.</P>
        <P>Therefore, we provide refunds in the genuine situations explained below.</P>
        <H>2. When Are You Eligible for a Refund?</H>
        <P>We will review and provide a full refund for the affected amount in the following situations:</P>
        <H3>A. Duplicate Payments</H3>
        <P>If you are charged more than once for the same product or order, we will refund the additional payment.</P>
        <H3>B. Payment Successful but Product Not Unlocked</H3>
        <P>If money has been deducted from your account but you have not received access to the purchased product, please contact us.</P>
        <P>After verifying the transaction, we will either:</P>
        <UL items={[
          "Provide access to the purchased product, if you prefer; or",
          "Issue a full refund for the affected payment.",
        ]} />
        <H3>C. Incorrect or Failed Transactions</H3>
        <P>If a payment-related technical issue results in an incorrect charge, we will investigate the transaction and take appropriate action to resolve it.</P>
        <P>Our intention is to ensure that you receive what you paid for or get your eligible money back.</P>
        <H>3. Refunds We Generally Do Not Provide</H>
        <P>Since T01 products are digital and can be accessed immediately after purchase, refunds are generally not available in the following situations:</P>
        <UL items={[
          "You purchased a product but later changed your mind.",
          "You purchased the wrong product after reviewing its description and details.",
          "You no longer wish to use the product after receiving access.",
          "You expected something different from what was clearly described on the product page.",
          "You have already received access and successfully downloaded or used the product.",
        ]} />
        <P>We encourage everyone to carefully read the product description and understand what is included before making a purchase.</P>
        <P>However, if you believe there is a genuine issue with your purchase, you can always contact our support team for review.</P>
        <H>4. Failed Payments and Bank Refunds</H>
        <P>Sometimes a payment may fail even after your bank account shows a deduction.</P>
        <P>In such cases, the amount is generally not received or retained by T01.</P>
        <P>The bank or payment service provider usually processes the reversal automatically.</P>
        <P>In most cases, the amount is returned within 5–7 working days, depending on your bank and payment provider.</P>
        <P>If the amount has not been credited after this period, please contact your bank or payment provider and share your transaction details with our support team if assistance is needed.</P>
        <H>5. How to Request a Refund</H>
        <P>We want the refund process to be simple and understandable.</P>
        <P>If you experience a duplicate payment, missing product access or another genuine payment issue, follow these steps:</P>
        <H3>Step 1 — Contact Us</H3>
        <P>Send an email to our support team:</P>
        <P><strong>Email:</strong> <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></P>
        <H3>Step 2 — Include Your Order Details</H3>
        <P>Please provide:</P>
        <UL items={[
          "Your Order ID.",
          "Registered email address.",
          "Product name.",
          "Payment transaction ID, if available.",
          "A brief explanation of the issue.",
          "Payment screenshot, if relevant.",
        ]} />
        <H3>Step 3 — Allow Us to Review</H3>
        <P>Our team will verify the transaction and investigate the reported issue.</P>
        <P>If additional information is required, we may contact you.</P>
        <H3>Step 4 — Refund or Resolution</H3>
        <P>Once your refund request is reviewed and approved, the eligible amount will be returned to your original payment method.</P>
        <H>6. Refund Request Time Limit</H>
        <P>To help us investigate transactions efficiently, please submit your refund request within 7 days from the date of purchase.</P>
        <P>Requests received after this period may require additional review and will be handled in accordance with applicable laws and regulations.</P>
        <P>We encourage customers to contact us as soon as they notice a payment or product-access issue.</P>
        <H>7. Refund Processing Time</H>
        <P>Once a refund has been approved, it will be initiated through the original payment method.</P>
        <P>The time required for the amount to appear in your bank account or payment method may depend on your bank, card issuer or payment service provider.</P>
        <P>Please note that T01 cannot directly control the time taken by banks or payment providers to complete the refund.</P>
        <P>You will be informed about the refund status through the contact details associated with your order, wherever possible.</P>
        <H>8. Our Commitment to Students and Young People</H>
        <P>T01 was started with the belief that young people deserve better access to useful knowledge, practical guidance and opportunities for growth.</P>
        <P>We know that many students and fresh graduates carefully manage their money. Every purchase matters, especially when someone is investing in their education or career with limited resources.</P>
        <P>We do not take that trust lightly.</P>
        <P>Our purpose is not simply to sell digital products. We want to create resources that genuinely help people understand their options, develop valuable skills and move forward with greater confidence.</P>
        <P>We are starting small, learning from real people and continuously improving what we offer.</P>
        <P>That also means taking responsibility when something does not work as expected.</P>
        <P>We believe that a trustworthy initiative is not defined only by the products it creates, but also by how it treats people when problems arise.</P>
        <P>Your trust is important to us, and we want every interaction with T01 to reflect that belief.</P>
        <H>9. Policy Updates</H>
        <P>T01 may update this Refunds and Cancellations Policy from time to time to reflect changes in our products, services, payment processes or applicable legal requirements.</P>
        <P>Any updated policy will be published on this page with its revised effective date.</P>
        <P>We encourage customers to review this page before making a purchase.</P>
        <H>10. Need Help? Contact Us</H>
        <P>If you have questions about a payment, refund, cancellation or product-access issue, our support team is here to help.</P>
        <div className="card p-6 space-y-2">
          <p><strong>Email:</strong> <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p><strong>Project:</strong> T01</p>
        </div>
        <P>We will make reasonable efforts to understand your concern and provide an appropriate resolution.</P>
        <div className="mt-14 pt-8 border-t border-navy-800/15 space-y-4">
          <h2 className="font-display text-2xl font-extrabold">A Final Note from T01</h2>
          <P>We started this journey because we believe that every student and young person deserves a better opportunity to learn, grow and build their future.</P>
          <P>We know we are at the beginning of something, and we still have a lot to learn.</P>
          <P>But one thing will remain important as we grow: treating people with honesty, respect and fairness.</P>
          <P>Thank you for trusting T01 and being a part of our journey.</P>
          <p className="font-bold">T01 — Starting small. Building meaningful solutions.</p>
          <p className="text-navy-800/70">Your journey matters. Let's make the next step clearer.</p>
        </div>
        <p className="mt-8 text-sm text-navy-800/60">Last Updated: {LAST_UPDATED}</p>
      </>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    tagline: 'Your privacy matters. Your trust matters even more.',
    body: (
      <>
        <P>At Project T01, we believe that building meaningful solutions begins with building trust.</P>
        <P>We started T01 with a simple purpose: to help students, graduates and young people in India make better decisions about their education, careers, skills and personal growth.</P>
        <P>We understand that when you create an account, purchase a digital product or use our learning resources, you trust us with your personal information.</P>
        <P>We take that responsibility seriously.</P>
        <P>This Privacy Policy explains what information we collect, why we collect it, how we use it, how we protect it and what choices you have regarding your personal information.</P>
        <P>Our approach is simple:</P>
        <P>We collect only the information we reasonably need to operate our platform, provide our services and improve your experience. We do not sell your personal information.</P>
        <P>Please read this policy carefully to understand how Project T01 handles your information.</P>
        <H>1. About Project T01</H>
        <P>Project T01 is an initiative focused on helping students, graduates and young people make better decisions about education, careers, skills and personal development.</P>
        <P>Our current offerings include digital educational products and learning resources such as:</P>
        <UL items={[
          "Career roadmaps and educational guides.",
          "Skill development resources.",
          "Interview preparation materials.",
          "Resume and career-building resources.",
          "Digital e-books and learning materials.",
        ]} />
        <P>Our long-term vision is to develop more structured learning systems, career development programs and personalised guidance.</P>
        <P>As we grow, protecting the privacy and trust of our users will remain an important responsibility.</P>
        <P>This Privacy Policy applies to information collected through our website, user accounts, purchases and related services.</P>
        <H>2. Information We Collect</H>
        <P>We collect limited personal information that helps us operate Project T01 and provide the services you request.</P>
        <P>Depending on how you use our platform, we may collect the following information.</P>
        <H3>A. Personal Information</H3>
        <P>When you create an account or purchase a product, we may collect:</P>
        <UL items={[
          "Your name.",
          "Your email address.",
          "Your mobile phone number.",
          "Your account login information.",
        ]} />
        <H3>B. Account Security Information</H3>
        <P>We use password protection to help secure your account.</P>
        <P>Your password is stored in a hashed and encrypted-protection format rather than as ordinary readable text. We do not intentionally store your password in plain text.</P>
        <H3>C. Learning and Activity Information</H3>
        <P>To provide a better learning experience, we may collect limited information about your activity on our platform, including:</P>
        <UL items={[
          "Reading progress.",
          "Purchased products.",
          "Product access history.",
          "Order history.",
          "Account-related activity.",
        ]} />
        <P>This information helps us maintain your account and provide access to the products you have purchased.</P>
        <H3>D. Payment and Transaction Information</H3>
        <P>When you purchase a digital product, payment processing is handled through our payment partner, Cashfree Payments.</P>
        <P>For processing your transaction, Cashfree may receive information such as:</P>
        <UL items={[
          "Your name.",
          "Your email address.",
          "Your mobile number.",
          "The order amount.",
          "Transaction-related details.",
        ]} />
        <P>Your payment may also be processed using information you provide directly to Cashfree or your selected payment provider.</P>
        <P>Project T01 does not intentionally collect or store your complete debit card details, UPI PINs or banking passwords.</P>
        <P>Payment information is handled through the relevant payment provider's systems and policies.</P>
        <H>3. How We Use Your Information</H>
        <P>We use your personal information only for legitimate purposes connected to operating Project T01 and providing our services.</P>
        <P>These purposes may include:</P>
        <H3>Account Management</H3>
        <UL items={[
          "Creating and maintaining your account.",
          "Allowing you to sign in securely.",
          "Managing your account information.",
          "Helping you recover account access.",
        ]} />
        <H3>Product Access and Delivery</H3>
        <UL items={[
          "Unlocking digital products after successful payment.",
          "Providing access to purchased e-books and learning resources.",
          "Saving your reading progress where supported.",
          "Maintaining your purchase history.",
        ]} />
        <H3>Payment Processing</H3>
        <UL items={[
          "Processing orders through Cashfree Payments.",
          "Confirming successful transactions.",
          "Verifying payment status.",
          "Resolving failed or duplicate payment issues.",
          "Handling eligible refund requests.",
        ]} />
        <H3>Communication and Customer Support</H3>
        <UL items={[
          "Sending account-related emails.",
          "Sending purchase confirmations and order updates.",
          "Responding to your questions and support requests.",
          "Informing you about important service-related changes.",
        ]} />
        <H3>Platform Improvement and Security</H3>
        <UL items={[
          "Maintaining website functionality.",
          "Identifying and resolving technical problems.",
          "Protecting accounts against unauthorised access.",
          "Improving the quality and reliability of our services.",
        ]} />
        <P>We aim to use information only for purposes that are relevant to the services you receive.</P>
        <H>4. How We Share Your Information</H>
        <P>Your personal information is not something we sell.</P>
        <P>Project T01 does not sell your personal information to advertisers or unrelated third parties.</P>
        <P>However, certain information may need to be shared with trusted service providers to operate our platform.</P>
        <P>These may include:</P>
        <H3>A. Cashfree Payments</H3>
        <P>We use Cashfree Payments to process transactions.</P>
        <P>When you make a purchase, relevant information such as your name, email address, mobile number and order amount may be shared with Cashfree to facilitate payment processing and transaction verification.</P>
        <P>Cashfree processes information according to its own applicable terms and privacy practices.</P>
        <H3>B. Technology and Hosting Providers</H3>
        <P>We may use trusted service providers for:</P>
        <UL items={[
          "Website hosting.",
          "Database management.",
          "Account authentication.",
          "Email delivery.",
          "Website security.",
          "Technical maintenance.",
        ]} />
        <P>These providers may process limited information when required to perform services on our behalf.</P>
        <H3>C. Legal Requirements</H3>
        <P>We may disclose information if required to do so under applicable laws, legal processes, court orders or valid requests from authorised government authorities.</P>
        <P>We may also take appropriate action where disclosure is necessary to protect our legal rights, users or platform security.</P>
        <P>We aim to limit information sharing to what is reasonably necessary for the relevant purpose.</P>
        <H>5. Cookies and Similar Technologies</H>
        <P>Project T01 uses essential cookies to support the basic functionality of our website.</P>
        <P>For example, we use a secure and essential cookie to help keep you signed in to your account.</P>
        <P>These cookies help us:</P>
        <UL items={[
          "Maintain your login session.",
          "Support secure account access.",
          "Provide essential website functionality.",
        ]} />
        <P>We do not currently use advertising cookies or cookies designed to track you for personalised advertising.</P>
        <P>If our use of cookies changes in the future, we will update this Privacy Policy and provide any additional information or choices required by applicable law.</P>
        <H>6. How We Protect Your Information</H>
        <P>Protecting your personal information is an important responsibility.</P>
        <P>We take reasonable technical and organisational measures to protect information against:</P>
        <UL items={[
          "Unauthorised access.",
          "Accidental loss.",
          "Misuse.",
          "Unauthorised disclosure.",
          "Unauthorised alteration.",
        ]} />
        <P>Our security practices may include:</P>
        <UL items={[
          "Password hashing.",
          "Secure account authentication.",
          "Restricted access to account information.",
          "Secure communication where supported.",
          "Appropriate security measures through our technology providers.",
        ]} />
        <P>However, no website, digital platform or internet-based system can guarantee complete security.</P>
        <P>We continuously aim to improve our security practices as Project T01 develops.</P>
        <H>7. How Long We Keep Your Information</H>
        <P>We retain personal information only for as long as reasonably necessary for the purposes explained in this policy, subject to applicable legal requirements.</P>
        <P>Different types of information may be retained for different periods.</P>
        <P>For example:</P>
        <UL items={[
          "Account information may be retained while your account remains active.",
          "Learning progress may be retained to support your learning experience.",
          "Order and payment records may be retained for accounting, tax, financial and legal requirements.",
          "Customer support communications may be retained where necessary to resolve issues and maintain service records.",
        ]} />
        <P>Even if you request account deletion, certain transaction records may need to be retained where required by applicable law.</P>
        <P>When information is no longer required, we will take reasonable steps to delete it or otherwise handle it appropriately.</P>
        <H>8. Your Privacy Rights and Choices</H>
        <P>We believe you should have reasonable control over your personal information.</P>
        <P>Depending on applicable law, you may have the right to:</P>
        <H3>Access Your Information</H3>
        <P>Ask us about the personal information associated with your account.</P>
        <H3>Correct Your Information</H3>
        <P>Request corrections if your name, email address, mobile number or other account information is inaccurate.</P>
        <H3>Request Account Deletion</H3>
        <P>Ask us to delete your account and associated personal information, subject to applicable legal retention requirements.</P>
        <H3>Ask Privacy-Related Questions</H3>
        <P>Contact us if you have questions about how your information is collected, used or shared.</P>
        <P>To make a request, please contact:</P>
        <P><strong>Email:</strong> <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></P>
        <P>Please include your registered email address and a brief explanation of your request.</P>
        <P>We may need to verify your identity before processing certain requests.</P>
        <P>We will handle valid requests in accordance with applicable Indian data protection laws.</P>
        <H>9. Children's Privacy</H>
        <P>Project T01 is primarily designed for students, graduates and young people.</P>
        <P>We recognise that some students using educational resources may be under 18.</P>
        <P>Where applicable, we handle personal information relating to children in accordance with the requirements of Indian data protection laws, including applicable rules concerning parental or guardian consent.</P>
        <P>We do not knowingly seek to collect children's personal information in violation of applicable legal requirements.</P>
        <P>If you believe that a child's information has been collected or used improperly, please contact us so that we can review the matter.</P>
        <H>10. Third-Party Websites and Services</H>
        <P>Our website may contain links to external websites, services or resources.</P>
        <P>These may include payment providers, educational resources or other third-party platforms.</P>
        <P>Please understand that external websites operate under their own privacy policies and practices.</P>
        <P>Project T01 does not control how independent third-party websites collect or use your information.</P>
        <P>We encourage you to review their privacy policies before sharing personal information with them.</P>
        <H>11. Updates to This Privacy Policy</H>
        <P>As Project T01 grows, we may introduce new products, services, features and technology.</P>
        <P>Our information-handling practices may also change over time.</P>
        <P>We may update this Privacy Policy to reflect:</P>
        <UL items={[
          "New products and services.",
          "Changes in our technology.",
          "Improvements to our security practices.",
          "Changes in how information is collected or used.",
          "Changes in applicable laws and regulations.",
        ]} />
        <P>The latest version will be published on this page with its updated date.</P>
        <P>Where required by applicable law, we will provide additional notice or obtain consent for material changes.</P>
        <P>We encourage you to review this page periodically.</P>
        <H>12. Contact Us About Privacy</H>
        <P>If you have questions, concerns or requests regarding your personal information or this Privacy Policy, please contact us.</P>
        <div className="card p-6 space-y-2">
          <p><strong>Project:</strong> T01</p>
          <p><strong>Email:</strong> <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p><strong>Purpose:</strong> Privacy-related questions, account information corrections, account deletion requests and other data-related concerns.</p>
        </div>
        <P>We will make reasonable efforts to understand your concern and respond appropriately.</P>
        <div className="mt-14 pt-8 border-t border-navy-800/15 space-y-4">
          <h2 className="font-display text-2xl font-extrabold">A Message from Project T01</h2>
          <P>We started T01 because we believe that every young person deserves a better opportunity to learn, grow and build a meaningful future.</P>
          <P>Across India, students and graduates face uncertainty about careers, a lack of practical guidance and difficulties accessing useful learning resources.</P>
          <P>We want to contribute to solving these problems through affordable digital products, practical educational resources and, eventually, more structured learning and career development solutions.</P>
          <P>But building something meaningful is not just about the products we create.</P>
          <P>It is also about the trust people place in us.</P>
          <P>When you create an account or purchase something from T01, you trust us with your information. We understand that this trust must be respected.</P>
          <P>That is why we aim to collect only what we need, use information responsibly and communicate our practices clearly.</P>
          <P>We are starting small, learning from real people and building step by step.</P>
          <P>As we grow, our commitment to transparency, responsibility and respect for our users will remain part of who we are.</P>
          <P>Because meaningful solutions should always begin with trust.</P>
          <P>Thank you for being part of our journey.</P>
        </div>
        <p className="mt-8 text-sm text-navy-800/60">Last Updated: {LAST_UPDATED}</p>
      </>
    ),
  },
};

export default function Legal({ page }) {
  const p = PAGES[page];
  if (!p) return <Navigate to="/" replace />;
  return (
    <div className="container-t01 py-16 max-w-3xl">
      <span className="section-tag">{CONTACT.business}</span>
      <h1 className="text-4xl font-extrabold mb-2">{p.title}</h1>
      {p.tagline && <p className="text-lg text-navy-800/70 mb-6">{p.tagline}</p>}
      {p.body}
    </div>
  );
}



// import { Link, useParams, Navigate } from 'react-router-dom';

// /**
//  * Public policy pages. Cashfree reviews these before approving your domain for live payments
//  * (Contact Us, Terms and Conditions, Refunds and Cancellations), so they must open WITHOUT login.
//  *
//  * >>> BEFORE GOING LIVE: set the real contact details below (or via VITE_* variables at build time)
//  * >>> and have the wording checked against how you actually sell and refund.
//  */
// const CONTACT = {
//   business: import.meta.env.VITE_BUSINESS_NAME || 'Project T01',
//   email: import.meta.env.VITE_SUPPORT_EMAIL || 'support@example.com',
//   phone: import.meta.env.VITE_SUPPORT_PHONE || '+91 00000 00000',
//   address: import.meta.env.VITE_BUSINESS_ADDRESS || 'Your registered business address, City, State, PIN, India',
// };

// const P = ({ children }) => <p className="leading-relaxed text-navy-800/80">{children}</p>;
// const H = ({ children }) => <h2 className="text-xl font-extrabold mt-8 mb-2">{children}</h2>;

// const PAGES = {
//   contact: {
//     title: 'Contact us',
//     body: (
//       <>
//         <P>Questions about a product, your account or a payment? Write to us and we will reply within 2 working days.</P>
//         <div className="card p-6 mt-6 space-y-2">
//           <p><strong>{CONTACT.business}</strong></p>
//           <p>Email: <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
//           <p>Phone: {CONTACT.phone}</p>
//           <p>Address: {CONTACT.address}</p>
//         </div>
//       </>
//     ),
//   },
//   terms: {
//     title: 'Terms and Conditions',
//     body: (
//       <>
//         <P>By creating an account or buying from {CONTACT.business} you agree to these terms.</P>
//         <H>What we sell</H>
//         <P>We sell digital e-books and learning resources that you read online in your account. No physical item is shipped. All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise.</P>
//         <H>Your account</H>
//         <P>You are responsible for keeping your password safe. Access to a purchased product is personal to your account and must not be shared, resold or copied.</P>
//         <H>Access after purchase</H>
//         <P>Access is granted automatically once the payment is confirmed by our payment partner, Cashfree Payments. If your payment is debited but access does not appear within a few minutes, contact us with your order ID.</P>
//         <H>Content</H>
//         <P>The content is for learning purposes and does not guarantee a job, admission or any specific career outcome. All content remains the property of {CONTACT.business}.</P>
//         <H>Changes</H>
//         <P>We may update these terms or our content from time to time. Continued use of the site means you accept the updated terms.</P>
//         <P>See also our <Link to="/refund-policy" className="text-sky-brand font-semibold underline">Refunds and Cancellations</Link> and <Link to="/privacy" className="text-sky-brand font-semibold underline">Privacy Policy</Link>.</P>
//       </>
//     ),
//   },
//   'refund-policy': {
//     title: 'Refunds and Cancellations',
//     body: (
//       <>
//         <P>Because our products are digital and unlocked instantly after payment, an order cannot be cancelled once access has been granted. We still want you to be happy, so:</P>
//         <H>When we refund</H>
//         <P>If you were charged more than once for the same product, or you were charged and the product did not unlock, we will refund the affected amount in full (or unlock the product, if you prefer).</P>
//         <H>Failed payments</H>
//         <P>If a payment fails, the amount is not kept by us. If your bank has debited the amount, it is normally returned by the bank/payment partner automatically within 5-7 working days.</P>
//         <H>How to ask</H>
//         <P>Email <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> with your order ID within 7 days of purchase. Approved refunds go back to the original payment method.</P>
//       </>
//     ),
//   },
//   privacy: {
//     title: 'Privacy Policy',
//     body: (
//       <>
//         <P>We collect only what we need to run your account and take payments.</P>
//         <H>What we collect</H>
//         <P>Your name, email, mobile number, an encrypted (hashed) password, your reading progress, and your order history.</P>
//         <H>How we use it</H>
//         <P>To sign you in, unlock the products you buy, process payments through Cashfree Payments (they receive your name, email, phone and order amount), and send account and order emails. We do not sell your data.</P>
//         <H>Cookies</H>
//         <P>We use one secure, essential cookie to keep you signed in. We do not use advertising cookies.</P>
//         <H>Your choices</H>
//         <P>You can ask us to correct or delete your account by writing to <a className="text-sky-brand font-semibold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Order records may be kept as required for accounting.</P>
//       </>
//     ),
//   },
// };

// export default function Legal({ page }) {
//   const p = PAGES[page];
//   if (!p) return <Navigate to="/" replace />;
//   return (
//     <div className="container-t01 py-16 max-w-3xl">
//       <span className="section-tag">{CONTACT.business}</span>
//       <h1 className="text-4xl font-extrabold mb-6">{p.title}</h1>
//       {p.body}
//     </div>
//   );
// }
