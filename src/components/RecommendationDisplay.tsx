import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecommendationDisplayProps {
  upperColor: string;
  lowerColor: string;
  shoeColor: string;
}

const RecommendationDisplay = ({ upperColor, lowerColor, shoeColor }: RecommendationDisplayProps) => {
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Basic color theory recommendations
    if (upperColor && lowerColor && shoeColor) {
      recommendations.push({
        title: "Current Combination",
        description: "Your selected colors",
        rating: "Personal Choice",
        colors: { upper: upperColor, lower: lowerColor, shoe: shoeColor }
      });
      
      // Complementary suggestions
      recommendations.push({
        title: "Neutral Balance",
        description: "Safe and elegant combination",
        rating: "Recommended",
        colors: { 
          upper: upperColor, 
          lower: "#2C2C2C", 
          shoe: "#000000" 
        }
      });
      
      recommendations.push({
        title: "Monochromatic",
        description: "Sophisticated single-color palette",
        rating: "Stylish",
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

  if (!upperColor && !lowerColor && !shoeColor) {
    return (
      <Card className="p-8 text-center card-gradient">
        <div className="space-y-4">
          <div className="text-6xl">👗</div>
          <h3 className="text-xl font-semibold text-muted-foreground">
            Select your clothing colors to get personalized recommendations
          </h3>
          <p className="text-muted-foreground">
            Choose colors for your upper wear, lower wear, and shoes to see amazing style combinations!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center fashion-gradient bg-clip-text text-transparent">
        Your Style Recommendations
      </h2>
      
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
                <div
                  className="w-full h-12 rounded-lg border-2 border-border"
                  style={{ backgroundColor: rec.colors.upper }}
                />
                <div className="text-xs text-muted-foreground">👕</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-sm font-medium">Lower</div>
                <div
                  className="w-full h-12 rounded-lg border-2 border-border"
                  style={{ backgroundColor: rec.colors.lower }}
                />
                <div className="text-xs text-muted-foreground">👖</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-sm font-medium">Shoes</div>
                <div
                  className="w-full h-12 rounded-lg border-2 border-border"
                  style={{ backgroundColor: rec.colors.shoe }}
                />
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