import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Reyu Diamond transformed how I conduct business. The escrow system gives me complete peace of mind with every transaction.",
    author: "Alexander Chen",
    role: "Diamond Merchant, Hong Kong",
    rating: 5,
  },
  {
    quote: "The transparency and verification process sets a new standard in the industry. I've found my most reliable trading partners here.",
    author: "Sarah Mitchell",
    role: "Gemologist, New York",
    rating: 5,
  },
  {
    quote: "Finally, a platform that understands what professional traders need. The market insights have been invaluable for my business.",
    author: "Raj Patel",
    role: "Diamond Wholesaler, Mumbai",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-diamond-shimmer relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-champagne text-sm font-medium uppercase tracking-wider mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="card-premium p-8 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="h-10 w-10 text-champagne/30 mb-6" />

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-champagne text-champagne" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-foreground leading-relaxed mb-8 flex-1">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="border-t border-border pt-6">
                  <div className="font-display text-primary font-semibold">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
