import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

import { inventorySchema } from "@/schemas/inventory.schema";

import {
  ArrowLeft,
  Upload,
  Camera,
  X,
  CheckCircle,
  Info,
} from "lucide-react";

import DashboardShell from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InventoryFormValues = z.infer<typeof inventorySchema>;

const shapes = ["Round", "Princess", "Emerald", "Oval", "Cushion", "Pear", "Marquise", "Heart", "Radiant", "Asscher"];
const colors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const clarities = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"];
const cuts = ["Excellent", "Very Good", "Good", "Fair", "Poor"];
const labs = ["GIA", "AGS", "IGI", "HRD", "EGL"];

const AddInventory = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      fluorescence: "None",
    },
  });

  /* ---------------- Image handlers ---------------- */

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateImages = () => {
    if (images.length === 0) return "At least one image is required";
    if (images.length > 5) return "Maximum 5 images allowed";

    for (const file of images) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        return "Only JPG, PNG, or WEBP images allowed";
      }
      if (file.size > 5 * 1024 * 1024) {
        return "Each image must be under 5MB";
      }
    }
    return null;
  };

  const onSubmit = (data: InventoryFormValues) => {
    const imageError = validateImages();
    if (imageError) {
      alert(imageError);
      return;
    }

    console.log("VALIDATED PAYLOAD", {
      ...data,
      images,
    });

    navigate("/user/inventory");
  };

  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/user/inventory" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            Add Diamond to Inventory
          </h1>
          <p className="text-muted-foreground">
            Enter the diamond details to add it to your inventory
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Images */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-xl">Diamond Images</CardTitle>
                <CardDescription>
                  Upload high-quality images of your diamond (max 5 images)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                      <img
                        src={URL.createObjectURL(image)}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <Label htmlFor="images" className="cursor-pointer">
                      <div className="aspect-square rounded-xl border-2 border-dashed flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleImageUpload}
                      />
                    </Label>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* BASIC INFO */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="font-display text-xl">Diamond Specifications</CardTitle>
              <CardDescription>Enter the 4Cs and other technical specifications</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Shape */}
              <div className="space-y-2">
                <Label>Shape</Label>
                <Select onValueChange={(v) => setValue("shape", v)}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    {shapes.map((s) => (
                      <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.shape && <p className="text-sm text-destructive">{errors.shape.message}</p>}
              </div>

              {/* Carat */}
              <div className="space-y-2">
                <Label>Carat Weight</Label>
                <Input {...register("carat")} className="h-12 rounded-xl" />
                {errors.carat && <p className="text-sm text-destructive">{errors.carat.message}</p>}
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label>Color</Label>
                <Select onValueChange={(v) => setValue("color", v)}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.color && <p className="text-sm text-destructive">{errors.color.message}</p>}
              </div>

              {/* Clarity */}
              <div className="space-y-2">
                <Label>Clarity</Label>
                <Select onValueChange={(v) => setValue("clarity", v)}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select clarity" />
                  </SelectTrigger>
                  <SelectContent>
                    {clarities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clarity && <p className="text-sm text-destructive">{errors.clarity.message}</p>}
              </div>

            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="font-display text-xl">Pricing & Details</CardTitle>
              <CardDescription>Set your asking price and add notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Price</Label>
                <Input {...register("price")} className="h-12 rounded-xl" />
                {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
              </div>

              <div>
                <Label>Description</Label>
                <Textarea {...register("description")} />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>

              <div className="p-4 bg-blue-500/10 rounded-xl flex gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Your diamond will be added to your private inventory.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/user/inventory")} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="btn-premium flex-1">
              <CheckCircle className="h-5 w-5 mr-2" />
              Add to Inventory
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
};

export default AddInventory;
