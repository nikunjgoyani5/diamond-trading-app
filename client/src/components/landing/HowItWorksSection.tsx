import { motion } from "framer-motion";
import { UserCheck, ListPlus, Gavel, ShieldCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Get Verified",
    description: "Complete your KYC verification to join our trusted community of diamond traders.",
    step: "01",
  },
  {
    icon: ListPlus,
    title: "List or Browse",
    description: "Create detailed listings from your inventory or explore thousands of certified diamonds.",
    step: "02",
  },
  {
    icon: Gavel,
    title: "Place Bids",
    description: "Make competitive offers on listings that match your requirements and preferences.",
    step: "03",
  },
  {
    icon: ShieldCheck,
    title: "Secure Escrow",
    description: "Funds are held safely in escrow until both parties confirm successful delivery.",
    step: "04",
  },
  {
    icon: CheckCircle,
    title: "Complete Deal",
    description: "Finalize the transaction with confidence and build your reputation score.",
    step: "05",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-champagne text-sm font-medium uppercase tracking-wider mb-4 block">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6">
            How Reyu Diamond Works
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed">
            From verification to completion, every step is designed 
            for simplicity, security, and peace of mind.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className="text-champagne/30 font-display text-6xl font-bold mb-4">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-champagne group-hover:border-champagne">
                    <step.icon className="h-8 w-8 text-champagne transition-colors duration-500 group-hover:text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
