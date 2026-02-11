import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/hooks/redux";
import { kycActions } from "@/store/slices/kycSlice";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSkipKyc = () => {
    dispatch(kycActions.skipKyc());
    navigate("/user", { replace: true });
  };

  const [uploads, setUploads] = useState({
    govId: false,
    address: false,
  });

  const toggleUpload = (key: "govId" | "address") => {
    setUploads((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    dispatch(kycActions.goToStep("REVIEW_DOCUMENTS"));
    navigate("/kyc/review-submit");
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4 py-12
        bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.38),_transparent_65%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]
      "
    >
      {/* SINGLE FADE-IN (like PersonalDetails) */}
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
              Step 2 of 3 · Identity
            </span>

            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/5">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-3xl font-semibold">Verification Documents</h1>
            </div>

            <p className="text-muted-foreground max-w-sm mx-auto">
              Please upload clear, readable copies of the required documents.
            </p>
          </header>

          {/* Upload Grid – ALL VISIBLE */}
          <div className="grid gap-6 sm:grid-cols-2">
            <UploadBox
              title="Aadhar Card"
              icon={<UploadCloud />}
              isActive={uploads.govId}
              onClick={() => toggleUpload("govId")}
            />

            <UploadBox
              title="PAN Card"
              icon={<FileText />}
              isActive={uploads.address}
              onClick={() => toggleUpload("address")}
            />
          </div>

          {/* Guidelines */}
          <div className="mt-10 p-4 rounded-2xl bg-accent/30 border border-accent flex gap-4">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <strong className="block text-primary mb-1">
                Upload Guidelines
              </strong>
              • Max size 5MB per file <br />
              • Documents must be valid and unexpired <br />• All corners must
              be clearly visible
            </div>
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
              disabled={!uploads.govId || !uploads.address}
              onClick={handleContinue}
            >
              Continue
            </Button>

            <Button
              variant="ghost"
              className="text-muted-foreground"
              onClick={handleSkipKyc}
            >
              Skip for now
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

/* Upload Tile */
const UploadBox = ({ title, desc, icon, isActive, onClick }: any) => (
  <div
    onClick={onClick}
    className={cn(
      "cursor-pointer border-2 border-dashed rounded-[1.5rem] p-6 text-center transition-all duration-300",
      isActive
        ? "border-primary bg-primary/5"
        : "border-border hover:border-primary/50 hover:bg-muted/30",
    )}
  >
    <div className="flex justify-center mb-4">
      <div
        className={cn(
          "h-14 w-14 rounded-2xl flex items-center justify-center transition-all",
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-accent text-accent-foreground",
        )}
      >
        {isActive ? <CheckCircle2 className="h-7 w-7" /> : icon}
      </div>
    </div>

    <h3 className="font-semibold text-primary mb-1">{title}</h3>
    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
      {desc}
    </p>

    {isActive && (
      <div className="mt-4 inline-flex text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
        FILE ATTACHED
      </div>
    )}
  </div>
);

export default DocumentUpload;
