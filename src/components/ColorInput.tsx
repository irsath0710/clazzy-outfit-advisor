import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ColorInputProps {
  title: string;
  icon: string;
  selectedColor: string;
  onColorChange: (color: string) => void;
  placeholder?: string;
  selectedImage?: string;
  onImageChange?: (image: string | null) => void;
}

const ColorInput = ({ title, icon, selectedColor, onColorChange, placeholder, selectedImage, onImageChange }: ColorInputProps) => {
  const [inputValue, setInputValue] = useState(selectedColor);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (color: string) => {
    setInputValue(color);
    onColorChange(color);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    if (onImageChange) {
      onImageChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
        
        <div className="space-y-4">
          {/* Image Upload Section */}
          {onImageChange && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Upload Image (Optional)</Label>
              {selectedImage ? (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt={`${title} preview`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 h-12"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Color Input Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Color Selection</Label>
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