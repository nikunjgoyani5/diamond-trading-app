import { motion } from "framer-motion";
import { CheckCircle2, FileText, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ReviewSubmit = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4 py-12
        bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.38),_transparent_65%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]
      "
    >
      {/* SINGLE FADE-IN */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="card-premium glass bg-card p-8 lg:p-12 rounded-[2rem]">
          {/* Progress */}


          {/* Header */}
          <header className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-accent-foreground shadow-sm mb-4">
              Step 3 of 3 · Identity
            </span>

            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/5">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-3xl font-semibold">Review Documents</h1>
            </div>

            <p className="text-muted-foreground max-w-sm mx-auto">
              Please verify your information carefully before submitting for
              verification.
            </p>
          </header>

          {/* Review Sections */}
          <div className="space-y-8">
            {/* Personal Info */}
            <div className="rounded-2xl border p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Full Name" value="Vidhi Doctor" />
                <InfoRow label="Date of Birth" value="12 April 2003" />
                <InfoRow label="Phone Number" value="+91 98765 43210" />
                <InfoRow label="Country" value="India" />
                <InfoRow
                  label="Address"
                  value="Ahmedabad, Gujarat – 380015"
                  full
                />
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-2xl border p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">
                  Uploaded Documents
                </h3>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <DocRow label="Government ID" />
                <DocRow label="Address Proof" />
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="mt-10 p-4 rounded-2xl bg-accent/30 border border-accent flex gap-4">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              By submitting, you confirm that the information provided is
              accurate and belongs to you. Verification may take up to 24–48
              hours.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 flex items-center justify-between border-t pt-8">
            <Button
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Button
              size="lg"
              className="btn-premium px-12 h-14 rounded-2xl text-primary-foreground font-semibold"
              onClick={() => navigate("/kyc/personal-details")}
            >
              Edit
            </Button>

            <Button
              size="lg"
              className="btn-premium px-12 h-14 rounded-2xl text-primary-foreground font-semibold"
              onClick={() => navigate("/kyc/status")}
            >
              Submit for Verification
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

/* Reusable rows */
const InfoRow = ({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
      {label}
    </p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);

const DocRow = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircle2 className="h-4 w-4 text-primary" />
    <span className="font-medium text-foreground">{label}</span>
  </div>
);

export default ReviewSubmit;
