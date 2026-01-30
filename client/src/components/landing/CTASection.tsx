import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
    const navigate  = useNavigate();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Card */}
          <div className="bg-primary rounded-3xl p-12 md:p-16 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-champagne/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-champagne/20 flex items-center justify-center"
              >
                <Diamond className="h-10 w-10 text-champagne" />
              </motion.div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6">
                Ready to Start Trading?
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                Join thousands of verified traders who trust Reyu Diamond 
                for secure, transparent diamond transactions.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-champagne text-primary group px-10 py-6 text-base" 
                 onClick={() => navigate("/register")}>
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground px-10 py-6 text-base"
                >
                  Contact Sales
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/60">
                <span>✓ No credit card required</span>
                <span>✓ Free verification</span>
                <span>✓ 24/7 support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
