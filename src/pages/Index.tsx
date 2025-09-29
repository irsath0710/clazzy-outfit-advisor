import { useState } from "react";
import { Button } from "@/components/ui/button";
import ColorInput from "@/components/ColorInput";
import RecommendationDisplay from "@/components/RecommendationDisplay";
import OccasionSelector from "@/components/OccasionSelector";
import heroImage from "@/assets/hero-fashion.jpg";

const Index = () => {
  const [upperColor, setUpperColor] = useState("");
  const [lowerColor, setLowerColor] = useState("");
  const [shoeColor, setShoeColor] = useState("");
  const [occasion, setOccasion] = useState("");
  const [upperImage, setUpperImage] = useState<string | null>(null);
  const [lowerImage, setLowerImage] = useState<string | null>(null);
  const [shoeImage, setShoeImage] = useState<string | null>(null);

  const handleReset = () => {
    setUpperColor("");
    setLowerColor("");
    setShoeColor("");
    setOccasion("");
    setUpperImage(null);
    setLowerImage(null);
    setShoeImage(null);
  };

  const hasAnyInput = upperColor || lowerColor || shoeColor || occasion || upperImage || lowerImage || shoeImage;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="hero-gradient absolute inset-0 opacity-90" />
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6">
              Clazzy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Get personalized outfit recommendations based on occasion, colors, and your actual clothing items.
              Upload photos or select colors to create perfect combinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button variant="hero" size="lg" className="min-w-48">
                Get Started ✨
              </Button>
              <Button variant="outline" size="lg" className="min-w-48 bg-white/10 border-white/30 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 fashion-gradient bg-clip-text text-transparent">
              Your Personal Style Assistant
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your occasion, upload clothing images or select colors for AI-powered outfit recommendations
            </p>
          </div>

          {/* Occasion Selector */}
          <div className="mb-12">
            <OccasionSelector
              selectedOccasion={occasion}
              onOccasionChange={setOccasion}
            />
          </div>

          {/* Clothing Input Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <ColorInput
              title="Upper Wear"
              icon="👕"
              selectedColor={upperColor}
              onColorChange={setUpperColor}
              selectedImage={upperImage || undefined}
              onImageChange={setUpperImage}
              placeholder="Shirt, t-shirt, blouse..."
            />
            <ColorInput
              title="Lower Wear"
              icon="👖"
              selectedColor={lowerColor}
              onColorChange={setLowerColor}
              selectedImage={lowerImage || undefined}
              onImageChange={setLowerImage}
              placeholder="Pants, jeans, skirt..."
            />
            <ColorInput
              title="Footwear"
              icon="👟"
              selectedColor={shoeColor}
              onColorChange={setShoeColor}
              selectedImage={shoeImage || undefined}
              onImageChange={setShoeImage}
              placeholder="Shoes, sneakers, boots..."
            />
          </div>

          {/* Action Buttons */}
          {hasAnyInput && (
            <div className="flex justify-center gap-4 mb-12">
              <Button variant="fashion" size="lg" onClick={handleReset}>
                Reset All
              </Button>
              <Button variant="secondary" size="lg">
                Save Combination
              </Button>
            </div>
          )}

          {/* Recommendations */}
          <RecommendationDisplay
            upperColor={upperColor}
            lowerColor={lowerColor}
            shoeColor={shoeColor}
            occasion={occasion}
            upperImage={upperImage || undefined}
            lowerImage={lowerImage || undefined}
            shoeImage={shoeImage || undefined}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold fashion-gradient bg-clip-text text-transparent">
              Clazzy
            </h3>
            <p className="text-muted-foreground">
              Your personal fashion color consultant, powered by smart algorithms and style expertise.
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Clazzy</span>
              <span>•</span>
              <span>Style • Color • Fashion</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;