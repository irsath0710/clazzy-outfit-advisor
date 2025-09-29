import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorInputProps {
  title: string;
  icon: string;
  selectedColor: string;
  onColorChange: (color: string) => void;
  placeholder?: string;
}

const ColorInput = ({ title, icon, selectedColor, onColorChange, placeholder }: ColorInputProps) => {
  const [inputValue, setInputValue] = useState(selectedColor);

  const handleColorChange = (color: string) => {
    setInputValue(color);
    onColorChange(color);
  };

  const commonColors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
    "#FFC0CB", "#A52A2A", "#808080", "#000080", "#008000"
  ];

  return (
    <Card className="p-6 card-gradient card-shadow transition-smooth hover:scale-[1.02]">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <Label className="text-lg font-semibold text-foreground">{title}</Label>
        </div>
        
        <div className="space-y-3">
          <div className="flex gap-3">
            <Input
              type="color"
              value={inputValue}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-16 h-12 rounded-lg border-2 cursor-pointer"
            />
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder={placeholder || "Enter color (hex, rgb, or name)"}
              className="flex-1 text-sm"
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {commonColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className="w-8 h-8 rounded-md border-2 border-border transition-smooth hover:scale-110 hover:border-primary"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        
        {selectedColor && (
          <div className="flex items-center gap-2 mt-3">
            <div
              className="w-6 h-6 rounded-full border-2 border-border"
              style={{ backgroundColor: selectedColor }}
            />
            <span className="text-sm text-muted-foreground">Selected: {selectedColor}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ColorInput;