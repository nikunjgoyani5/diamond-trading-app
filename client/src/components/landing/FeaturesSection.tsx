import { motion } from "framer-motion";
import { Shield, Eye, Wallet, MessageCircle, BarChart3, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Escrow Protection",
    description: "Every transaction is secured through our trusted escrow system, ensuring complete protection for both parties.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Complete visibility into diamond specifications, pricing history, and seller reputation at every step.",
    gradient: "from-champagne/20 to-amber-500/20",
  },
  {
    icon: Wallet,
    title: "Secure Payments",
    description: "Multiple payment options with bank-grade security and instant settlement confirmations.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: MessageCircle,
    title: "Real-time Communication",
    description: "Seamless in-app messaging to negotiate deals and build lasting business relationships.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description: "Access real-time pricing data, market trends, and insights to make informed trading decisions.",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Award,
    title: "Verified Traders",
    description: "All users undergo thorough KYC verification, ensuring you only trade with legitimate partners.",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const FeaturesSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-diamond-shimmer/30 to-background" />
      
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
            Why Reyu Diamond
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6">
            Trading Made <span className="text-gradient">Trustworthy</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've built a platform where security meets sophistication, 
            giving you complete confidence in every transaction.
          </p>
          <div className="section-divider mt-10" />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card-premium p-8 group"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}>
                <feature.icon className="h-7 w-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
