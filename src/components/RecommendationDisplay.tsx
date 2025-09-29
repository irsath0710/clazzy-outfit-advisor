import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecommendationDisplayProps {
  upperColor: string;
  lowerColor: string;
  shoeColor: string;
  occasion: string;
  upperImage?: string;
  lowerImage?: string;
  shoeImage?: string;
}

const RecommendationDisplay = ({ upperColor, lowerColor, shoeColor, occasion, upperImage, lowerImage, shoeImage }: RecommendationDisplayProps) => {
  const getOccasionInfo = () => {
    const occasions = {
      outing: { name: "Casual Outing", style: "relaxed and comfortable" },
      dating: { name: "Date Night", style: "romantic and elegant" },
      function: { name: "Formal Function", style: "professional and sophisticated" },
      movie: { name: "Movie Night", style: "cozy and comfortable" }
    };
    return occasions[occasion as keyof typeof occasions] || { name: "General", style: "versatile" };
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const occasionInfo = getOccasionInfo();
    
    // Basic color theory recommendations
    if (upperColor && lowerColor && shoeColor) {
      recommendations.push({
        title: `Current ${occasionInfo.name} Look`,
        description: `Your selected colors for a ${occasionInfo.style} occasion`,
        rating: "Personal Choice",
        colors: { upper: upperColor, lower: lowerColor, shoe: shoeColor },
        images: { upper: upperImage, lower: lowerImage, shoe: shoeImage }
      });
      
      // Occasion-specific suggestions
      if (occasion === "dating") {
        recommendations.push({
          title: "Romantic Elegance",
          description: "Perfect for making a memorable impression",
          rating: "Date Perfect",
          colors: { 
            upper: upperColor, 
            lower: "#2C2C2C", 
            shoe: "#8B4513" 
          }
        });
      } else if (occasion === "function") {
        recommendations.push({
          title: "Professional Polish",
          description: "Sophisticated and business-appropriate",
          rating: "Meeting Ready",
          colors: { 
            upper: upperColor, 
            lower: "#1F2937", 
            shoe: "#000000" 
          }
        });
      } else if (occasion === "outing") {
        recommendations.push({
          title: "Casual Cool",
          description: "Relaxed yet put-together style",
          rating: "Day Perfect",
          colors: { 
            upper: upperColor, 
            lower: "#4A5568", 
            shoe: "#FFFFFF" 
          }
        });
      } else if (occasion === "movie") {
        recommendations.push({
          title: "Cozy Comfort",
          description: "Comfortable for long movie sessions",
          rating: "Comfort First",
          colors: { 
            upper: upperColor, 
            lower: "#2D3748", 
            shoe: "#718096" 
          }
        });
      }
      
      recommendations.push({
        title: "Monochromatic Style",
        description: "Sophisticated single-color palette",
        rating: "Always Chic",
        colors: { 
          upper: upperColor, 
          lower: adjustBrightness(upperColor, -20), 
          shoe: adjustBrightness(upperColor, -40) 
        }
      });
    }
    
    return recommendations;
  };

  const adjustBrightness = (color: string, amount: number) => {
    // Simple brightness adjustment (basic implementation)
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  const recommendations = generateRecommendations();

  if (!upperColor && !lowerColor && !shoeColor && !occasion) {
    return (
      <Card className="p-8 text-center card-gradient">
        <div className="space-y-4">
          <div className="text-6xl">👗</div>
          <h3 className="text-xl font-semibold text-muted-foreground">
            Select your occasion and clothing details
          </h3>
          <p className="text-muted-foreground">
            Choose an occasion, add colors or images for your clothing items to get personalized style recommendations!
          </p>
        </div>
      </Card>
    );
  }

  const occasionInfo = getOccasionInfo();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold fashion-gradient bg-clip-text text-transparent">
          Your {occasionInfo.name} Style Recommendations
        </h2>
        {occasion && (
          <p className="text-muted-foreground">
            Curated for a {occasionInfo.style} occasion
          </p>
        )}
      </div>
      
      <div className="grid gap-4">
        {recommendations.map((rec, index) => (
          <Card key={index} className="p-6 card-gradient card-shadow transition-smooth hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{rec.title}</h3>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {rec.rating}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mb-4">{rec.description}</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="text-sm font-medium">Upper</div>
                {rec.images?.upper ? (
                  <div className="relative">
                    <img
                      src={rec.images.upper}
                      alt="Upper wear"
                      className="w-full h-20 object-cover rounded-lg border-2 border-border"
                    />
                    <div 
                      className="absolute inset-0 rounded-lg border-2 border-border opacity-30"
                      style={{ backgroundColor: rec.colors.upper }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-12 rounded-lg border-2 border-border"
                    style={{ backgroundColor: rec.colors.upper }}
                  />
                )}
                <div className="text-xs text-muted-foreground">👕</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-sm font-medium">Lower</div>
                {rec.images?.lower ? (
                  <div className="relative">
                    <img
                      src={rec.images.lower}
                      alt="Lower wear"
                      className="w-full h-20 object-cover rounded-lg border-2 border-border"
                    />
                    <div 
                      className="absolute inset-0 rounded-lg border-2 border-border opacity-30"
                      style={{ backgroundColor: rec.colors.lower }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-12 rounded-lg border-2 border-border"
                    style={{ backgroundColor: rec.colors.lower }}
                  />
                )}
                <div className="text-xs text-muted-foreground">👖</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-sm font-medium">Shoes</div>
                {rec.images?.shoe ? (
                  <div className="relative">
                    <img
                      src={rec.images.shoe}
                      alt="Footwear"
                      className="w-full h-20 object-cover rounded-lg border-2 border-border"
                    />
                    <div 
                      className="absolute inset-0 rounded-lg border-2 border-border opacity-30"
                      style={{ backgroundColor: rec.colors.shoe }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-12 rounded-lg border-2 border-border"
                    style={{ backgroundColor: rec.colors.shoe }}
                  />
                )}
                <div className="text-xs text-muted-foreground">👟</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationDisplay;