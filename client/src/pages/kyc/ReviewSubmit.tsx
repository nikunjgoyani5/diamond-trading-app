import { motion } from "framer-motion";
import { CheckCircle2, FileText, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { kycActions } from "@/store/slices/kycSlice";
import { useEffect } from "react";

// Helper components for displaying info
const InfoRow = ({ label, value, full = false }: { label: string; value: string; full?: boolean }) => (
  <div className={full ? "col-span-full" : ""}>
    <dt className="text-muted-foreground mb-1">{label}</dt>
    <dd className="font-medium text-primary">{value}</dd>
  </div>
);

const DocRow = ({ label }: { label: string }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
    <span className="font-medium text-primary">{label}</span>
    <CheckCircle2 className="h-5 w-5 text-green-500" />
  </div>
);

const ReviewSubmit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status, loading } = useAppSelector((state) => state.kyc);

  // TODO: Replace with actual form data from Redux when implemented
  // For now, using placeholder data
  const personalDetails = {
    fullName: "Vidhi Doctor",
    dateOfBirth: "12 April 2003",
    phoneNumber: "+91 98765 43210",
    country: "India",
    address: "Ahmedabad, Gujarat – 380015",
  };

  const documents = {
    governmentId: "Aadhaar Card",
    addressProof: "PAN Card",
  };

  useEffect(() => {
  console.log("KYC STATUS:", status);
}, [status]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = () => {
    // Dispatch the final KYC submission action
    dispatch(kycActions.submitKycRequest());
    navigate("/user");
  };

  /* ---------- REDIRECT ON SUCCESS ---------- */
  useEffect(() => {
    if (status === "PENDING") {
      navigate("/kyc/status", { replace: true });
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.38),_transparent_65%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="card-premium glass bg-card p-8 lg:p-12 rounded-[2rem]">
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

          {/* Review Sections (UI unchanged) */}
          <div className="space-y-8">
            <div className="rounded-2xl border p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Full Name" value={personalDetails.fullName} />
                <InfoRow label="Date of Birth" value={personalDetails.dateOfBirth} />
                <InfoRow label="Phone Number" value={personalDetails.phoneNumber} />
                <InfoRow label="Country" value={personalDetails.country} />
                <InfoRow
                  label="Address"
                  value={personalDetails.address}
                  full
                />
              </div>
            </div>

            <div className="rounded-2xl border p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">
                  Uploaded Documents
                </h3>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <DocRow label={documents.governmentId} />
                <DocRow label={documents.addressProof} />
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="mt-10 p-4 rounded-2xl bg-accent/30 border border-accent flex gap-4">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              By submitting, you confirm that the information provided is
              accurate and belongs to you. Verification may take up to 24-48
              hours.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 flex items-center justify-between border-t pt-8">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Back
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate("/kyc/personal-details")}
            >
              Edit
            </Button>

            <Button
              size="lg"
              className="btn-premium px-12 h-14 rounded-2xl text-primary-foreground font-semibold"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit for Verification"}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReviewSubmit;
