import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Diamond, 
  DollarSign, 
  Bell, 
  Sliders,
  Save,
  RotateCcw
} from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const diamondShapes = [
  "Round", "Princess", "Cushion", "Oval", "Emerald", 
  "Pear", "Marquise", "Radiant", "Asscher", "Heart"
];

const diamondColors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const diamondClarity = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"];
const diamondCuts = ["Excellent", "Very Good", "Good", "Fair"];

const UserPreferences = () => {
  const [selectedShapes, setSelectedShapes] = useState<string[]>(["Round", "Princess", "Oval"]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["D", "E", "F", "G"]);
  const [selectedClarity, setSelectedClarity] = useState<string[]>(["VVS1", "VVS2", "VS1"]);
  const [selectedCuts, setSelectedCuts] = useState<string[]>(["Excellent", "Very Good"]);
  const [caratRange, setCaratRange] = useState([0.5, 3.0]);
  const [priceRange, setPriceRange] = useState([1000, 50000]);
  const [notifications, setNotifications] = useState({
    newListings: true,
    priceDrops: true,
    bidUpdates: true,
    dealAlerts: true,
    weeklyDigest: false,
    marketTrends: true,
  });

  const toggleSelection = (
    item: string, 
    selected: string[], 
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(s => s !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
                Diamond Preferences
              </h1>
              <p className="text-muted-foreground mt-1">
                Set your preferences to receive personalized diamond recommendations
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Diamond Shape Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Diamond className="h-5 w-5 text-accent" />
                  Diamond Shape
                </CardTitle>
                <CardDescription>
                  Select your preferred diamond shapes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {diamondShapes.map((shape) => (
                    <Badge
                      key={shape}
                      variant={selectedShapes.includes(shape) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedShapes.includes(shape) 
                          ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => toggleSelection(shape, selectedShapes, setSelectedShapes)}
                    >
                      {shape}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Color Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-accent" />
                  Color Grade
                </CardTitle>
                <CardDescription>
                  Select acceptable color grades (D is colorless)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {diamondColors.map((color) => (
                    <Badge
                      key={color}
                      variant={selectedColors.includes(color) ? "default" : "outline"}
                      className={`cursor-pointer transition-all min-w-[40px] justify-center ${
                        selectedColors.includes(color) 
                          ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => toggleSelection(color, selectedColors, setSelectedColors)}
                    >
                      {color}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Clarity Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Diamond className="h-5 w-5 text-accent" />
                  Clarity Grade
                </CardTitle>
                <CardDescription>
                  Select acceptable clarity grades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {diamondClarity.map((clarity) => (
                    <Badge
                      key={clarity}
                      variant={selectedClarity.includes(clarity) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedClarity.includes(clarity) 
                          ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => toggleSelection(clarity, selectedClarity, setSelectedClarity)}
                    >
                      {clarity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cut Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-accent" />
                  Cut Quality
                </CardTitle>
                <CardDescription>
                  Select acceptable cut grades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {diamondCuts.map((cut) => (
                    <Badge
                      key={cut}
                      variant={selectedCuts.includes(cut) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedCuts.includes(cut) 
                          ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => toggleSelection(cut, selectedCuts, setSelectedCuts)}
                    >
                      {cut}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Carat Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Diamond className="h-5 w-5 text-accent" />
                  Carat Weight
                </CardTitle>
                <CardDescription>
                  Set your preferred carat range
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Min: {caratRange[0]} ct</span>
                  <span className="text-muted-foreground">Max: {caratRange[1]} ct</span>
                </div>
                <Slider
                  value={caratRange}
                  onValueChange={setCaratRange}
                  min={0.1}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="min-carat" className="text-xs text-muted-foreground">Minimum</Label>
                    <Input
                      id="min-carat"
                      type="number"
                      value={caratRange[0]}
                      onChange={(e) => setCaratRange([parseFloat(e.target.value), caratRange[1]])}
                      step={0.1}
                      min={0.1}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="max-carat" className="text-xs text-muted-foreground">Maximum</Label>
                    <Input
                      id="max-carat"
                      type="number"
                      value={caratRange[1]}
                      onChange={(e) => setCaratRange([caratRange[0], parseFloat(e.target.value)])}
                      step={0.1}
                      max={10}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Price Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Price Range
                </CardTitle>
                <CardDescription>
                  Set your budget range (USD)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">${priceRange[0].toLocaleString()}</span>
                  <span className="text-muted-foreground">${priceRange[1].toLocaleString()}</span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={100}
                  max={500000}
                  step={100}
                  className="w-full"
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="min-price" className="text-xs text-muted-foreground">Minimum</Label>
                    <Input
                      id="min-price"
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      step={100}
                      min={100}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="max-price" className="text-xs text-muted-foreground">Maximum</Label>
                    <Input
                      id="max-price"
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      step={100}
                      max={500000}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Preferences - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-accent" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose which notifications you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-listings">New Listings</Label>
                      <p className="text-xs text-muted-foreground">
                        Get notified when matching diamonds are listed
                      </p>
                    </div>
                    <Switch
                      id="new-listings"
                      checked={notifications.newListings}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, newListings: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="price-drops">Price Drops</Label>
                      <p className="text-xs text-muted-foreground">
                        Alerts when prices drop on saved items
                      </p>
                    </div>
                    <Switch
                      id="price-drops"
                      checked={notifications.priceDrops}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, priceDrops: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="bid-updates">Bid Updates</Label>
                      <p className="text-xs text-muted-foreground">
                        Updates on your active bids
                      </p>
                    </div>
                    <Switch
                      id="bid-updates"
                      checked={notifications.bidUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, bidUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="deal-alerts">Deal Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Notifications for deal status changes
                      </p>
                    </div>
                    <Switch
                      id="deal-alerts"
                      checked={notifications.dealAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, dealAlerts: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-xs text-muted-foreground">
                        Weekly summary of market activity
                      </p>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, weeklyDigest: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="market-trends">Market Trends</Label>
                      <p className="text-xs text-muted-foreground">
                        Insights on diamond market trends
                      </p>
                    </div>
                    <Switch
                      id="market-trends"
                      checked={notifications.marketTrends}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, marketTrends: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default UserPreferences;
