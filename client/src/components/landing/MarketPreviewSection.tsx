import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const marketData = [
    
  {
    name: "Round Brilliant",
    carat: "1.00 - 1.50 ct",
    avgPrice: "$5,420",
    change: "+2.4%",
    trending: true,
    clarity: "VVS1-VVS2",
  },
  {
    name: "Princess Cut",
    carat: "2.00 - 2.50 ct",
    avgPrice: "$8,750",
    change: "+1.8%",
    trending: true,
    clarity: "VS1-VS2",
  },
  {
    name: "Emerald Cut",
    carat: "1.50 - 2.00 ct",
    avgPrice: "$6,890",
    change: "-0.5%",
    trending: false,
    clarity: "VVS1-VVS2",
  },
  {
    name: "Oval Brilliant",
    carat: "1.00 - 1.50 ct",
    avgPrice: "$5,120",
    change: "+3.2%",
    trending: true,
    clarity: "IF-VVS1",
  },
];

const MarketPreviewSection = () => {
    const navigate = useNavigate();
  return (
    <section id="marketplace" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-champagne text-sm font-medium uppercase tracking-wider mb-4 block">
              Market Intelligence
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6">
              Real-Time <span className="text-gradient">Market Insights</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Stay ahead with live pricing data, trend analysis, and comprehensive 
              market intelligence. Make informed decisions backed by real data.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Live price tracking across all diamond categories",
                "Historical data and trend predictions",
                "Personalized notifications for your preferences",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <Sparkles className="h-5 w-5 text-champagne flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <Button size="lg" className="btn-premium text-primary-foreground group"
             onClick={() => navigate("/marketplace")}>
              Explore Full Marketplace
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Market Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {marketData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-display text-lg font-semibold text-primary">
                      {item.name}
                    </h4>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {item.clarity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.carat}</p>
                </div>

                <div className="text-right">
                  <div className="font-display text-xl font-semibold text-primary mb-1">
                    {item.avgPrice}
                  </div>
                  <div className={`flex items-center justify-end gap-1 text-sm font-medium ${
                    item.trending ? "text-emerald-600" : "text-rose-500"
                  }`}>
                    {item.trending ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {item.change}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Updated in real-time • Data from 50,000+ transactions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketPreviewSection;
