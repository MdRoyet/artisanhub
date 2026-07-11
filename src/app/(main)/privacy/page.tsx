import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-secondary">
            Privacy Policy & Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: January 1, 2025
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 p-5 rounded-xl border bg-muted/30">
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Table of Contents
          </h2>
          <ul className="space-y-2 text-sm">
            {[
              "1. Information We Collect",
              "2. How We Use Your Information",
              "3. Information Sharing",
              "4. Data Security",
              "5. Cookies & Tracking",
              "6. Your Rights",
              "7. Marketplace Terms",
              "8. Returns & Refunds",
              "9. Intellectual Property",
              "10. Contact Us",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.split(".")[0].slice(1)}`}
                  className="text-primary hover:underline"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <Section
            id="information-we-collect"
            title="1. Information We Collect"
            content="We collect information you provide directly, including your name, email address, shipping address, and payment information when you make a purchase. If you create an account, we store your profile information and order history. We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, and browsing patterns through cookies and similar technologies."
          />

          <Section
            id="how-we-use"
            title="2. How We Use Your Information"
            content="We use your information to process and fulfill your orders, communicate with you about purchases and account matters, improve our website and personalize your experience, send you marketing communications (with your consent), detect and prevent fraud and unauthorized transactions, and comply with legal obligations. We never sell your personal information to third parties."
          />

          <Section
            id="information-sharing"
            title="3. Information Sharing"
            content="We share information only with: artisans who fulfill your orders (they receive your name and shipping address only), payment processors who handle transactions securely, shipping carriers who deliver your orders, and analytics services that help us understand how our site is used. We do not sell, rent, or trade your personal information."
          />

          <Section
            id="data-security"
            title="4. Data Security"
            content="We implement industry-standard security measures including SSL encryption for all data transmission, secure password hashing using bcrypt, JWT-based authentication with expiration, and regular security audits. While no system is completely secure, we take every reasonable precaution to protect your information."
          />

          <Section
            id="cookies"
            title="5. Cookies & Tracking"
            content="We use essential cookies to maintain your session and authentication. We use analytics cookies to understand how visitors interact with our site. We do not use advertising cookies or sell data to ad networks. You can control cookie preferences through your browser settings at any time."
          />

          <Section
            id="your-rights"
            title="6. Your Rights"
            content="You have the right to access your personal data, request correction of inaccurate data, request deletion of your data (subject to legal obligations), opt out of marketing communications at any time, download a copy of your data, and lodge a complaint with a supervisory authority if you believe we have not handled your data properly."
          />

          <Separator />

          <Section
            id="marketplace-terms"
            title="7. Marketplace Terms"
            content="ArtisanHub serves as a marketplace connecting buyers with independent artisans. We do not manufacture, store, or ship products directly. Each artisan is an independent seller responsible for the quality, accuracy of descriptions, and timely delivery of their products. While we vet all artisans before onboarding, ArtisanHub acts as an intermediary and is not a party to the sale contract between buyer and artisan."
          />

          <Section
            id="returns"
            title="8. Returns & Refunds"
            content="Due to the handmade nature of products, returns are accepted within 30 days of delivery for items in their original condition. Slight variations in color, size, and texture are not considered defects but hallmarks of authentic craftsmanship. Custom-made items are non-refundable unless they arrive damaged or significantly different from the agreed description. Refunds are processed to the original payment method within 7-10 business days."
          />

          <Section
            id="intellectual-property"
            title="9. Intellectual Property"
            content="All content on ArtisanHub, including the website design, logo, and original written content, is our intellectual property. Product images and descriptions belong to the artisans who created them. You may not reproduce, distribute, or use any content from this site without prior written permission from the respective rights holder."
          />

          <Section
            id="contact-us"
            title="10. Contact Us"
            content="If you have questions about this Privacy Policy or Terms of Service, please contact us at: Email: privacy@artisanhub.com, Address: 123 Artisan Lane, Craft District, Jaipur 302001, India. We aim to respond to all inquiries within 48 business hours."
          />
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  return (
    <section id={id}>
      <h2 className="text-lg font-heading font-semibold text-foreground mb-3">
        {title}
      </h2>
      <p className="leading-relaxed">{content}</p>
    </section>
  );
}
