import { Diamond, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Pricing", href: "#pricing" },
    { label: "API Access", href: "#api" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Press", href: "#press" },
    { label: "Blog", href: "#blog" },
  ],
  legal: [
    { label: "Terms of Service", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Compliance", href: "#compliance" },
    { label: "Security", href: "#security" },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6">
              <Diamond className="h-8 w-8 text-champagne" />
              <span className="font-display text-xl font-semibold">Reyu Diamond</span>
            </a>
            <p className="text-primary-foreground/60 max-w-sm mb-8 leading-relaxed">
              The future of diamond trading. Secure, transparent, and sophisticated 
              marketplace for verified traders worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:contact@reyudiamond.com" className="flex items-center gap-3 text-primary-foreground/60 hover:text-champagne transition-colors">
                <Mail className="h-5 w-5" />
                <span>contact@reyudiamond.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-primary-foreground/60 hover:text-champagne transition-colors">
                <Phone className="h-5 w-5" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/60">
                <MapPin className="h-5 w-5" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-champagne transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-champagne transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-champagne transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © {currentYear} Reyu Diamond. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-primary-foreground/40 text-sm">
              Secured with bank-grade encryption
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
