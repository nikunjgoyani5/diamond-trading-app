import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import type { ReactNode, ElementType } from "react";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux";

/* ================= TYPES ================= */

export type KycStatusType = "PENDING" | "APPROVED" | "REJECTED";

/* ================= CONFIG ================= */

const STATUS_CONFIG = {
  PENDING: {
    badge: "Verification in Progress",
    title: "We're Reviewing Your Details",
    description:
      "Your documents are under verification. This usually takes 24–48 hours.",
    icon: Clock,
    infoBox: (
      <div className="mb-8 p-4 rounded-2xl bg-accent/20 border border-accent text-sm">
        You'll be notified once verification is completed.
      </div>
    ),
    action: (navigate: ReturnType<typeof useNavigate>) => (
      <Button
        variant="outline"
        className="px-8 h-12 rounded-xl"
        onClick={() => navigate("/user")}
      >
        Go to Dashboard
      </Button>
    ),
  },

  APPROVED: {
    badge: "Verification Successful",
    title: "KYC Approved",
    description:
      "Your identity has been successfully verified. You now have full access to trading features.",
    icon: CheckCircle2,
    infoBox: null,
    action: (navigate: ReturnType<typeof useNavigate>) => (
      <Button
        className="btn-premium px-10 h-12 rounded-xl text-primary-foreground"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  REJECTED: {
    badge: "Verification Failed",
    title: "KYC Rejected",
    description:
      "We couldn't verify your identity with the submitted documents.",
    icon: XCircle,
    infoBox: (
      <div className="mb-8 p-4 rounded-2xl bg-destructive/10 border border-destructive text-sm text-destructive">
        Reason: Uploaded document image was unclear. Please upload a clearer
        image.
      </div>
    ),
    action: (navigate: ReturnType<typeof useNavigate>) => (
      <Button
        className="btn-premium px-10 h-12 rounded-xl text-primary-foreground"
        onClick={() => navigate("/kyc/start")}
      >
        Resubmit KYC
        <RefreshCcw className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
} satisfies Record<
  KycStatusType,
  {
    badge: string;
    title: string;
    description: string;
    icon: ElementType;
    infoBox: ReactNode;
    action: (navigate: ReturnType<typeof useNavigate>) => ReactNode;
  }
>;

/* ================= COMPONENT ================= */

const KycStatus = () => {
  const navigate = useNavigate();

  const { status } = useAppSelector((state) => state.kyc);

  // 🚫 NOT_STARTED should never stay here
  useEffect(() => {
    if (status === "NOT_STARTED") {
      navigate("/kyc/start", { replace: true });
    }
  }, [status, navigate]);

  if (status === "NOT_STARTED") return null;

  const config = STATUS_CONFIG[status as KycStatusType];
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.25),_transparent_60%)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card className="card-premium glass p-10 text-center">
          {/* TRUST BADGE */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-accent-foreground shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              {config.badge}
            </span>
          </div>

          {/* ICON */}
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-accent flex items-center justify-center">
            <Icon className="h-8 w-8 text-accent-foreground" />
          </div>

          <h1 className="text-3xl font-semibold mb-3">{config.title}</h1>

          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            {config.description}
          </p>

          {config.infoBox}

          <div className="section-divider mb-8" />

          <div className="flex justify-center">
            {config.action(navigate)}
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Secure • Confidential • Compliance Verified
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default KycStatus;
