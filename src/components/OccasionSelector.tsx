import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface OccasionSelectorProps {
  selectedOccasion: string;
  onOccasionChange: (occasion: string) => void;
}

const occasions = [
  {
    id: "outing",
    label: "Casual Outing",
    emoji: "🚶‍♀️",
    description: "Relaxed, comfortable style for everyday activities"
  },
  {
    id: "dating",
    label: "Date Night",
    emoji: "💕",
    description: "Romantic, elegant look that impresses"
  },
  {
    id: "function",
    label: "Formal Function",
    emoji: "🎭",
    description: "Professional, sophisticated attire for events"
  },
  {
    id: "movie",
    label: "Movie Night",
    emoji: "🎬",
    description: "Cozy, comfortable style for entertainment"
  }
];

const OccasionSelector = ({ selectedOccasion, onOccasionChange }: OccasionSelectorProps) => {
  return (
    <Card className="p-6 card-gradient card-shadow">
      <div className="space-y-6">
        <div className="text-center">
          <Label className="text-2xl font-bold fashion-gradient bg-clip-text text-transparent">
            Choose Your Occasion
          </Label>
          <p className="text-muted-foreground mt-2">
            Select the event type for personalized style recommendations
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {occasions.map((occasion) => (
            <Button
              key={occasion.id}
              variant={selectedOccasion === occasion.id ? "fashion" : "outline"}
              onClick={() => onOccasionChange(occasion.id)}
              className="h-auto p-4 flex flex-col items-center space-y-2 transition-bounce hover:scale-105"
            >
              <span className="text-2xl">{occasion.emoji}</span>
              <span className="font-semibold text-sm">{occasion.label}</span>
              <span className="text-xs text-center opacity-80 font-normal">
                {occasion.description}
              </span>
            </Button>
          ))}
        </div>
        
        {selectedOccasion && (
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium">
              Selected: <span className="fashion-gradient bg-clip-text text-transparent">
                {occasions.find(o => o.id === selectedOccasion)?.label}
              </span>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OccasionSelector;