import { Card, CardContent } from "@/components/ui/card";
import { Image, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
}

export function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images?.length) {
    return (
      <Card className="relative overflow-hidden h-[200px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Image className="w-8 h-8" />
            <span>No images available</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden h-[200px]">
      <CardContent className="p-0 h-full">
        <div className="relative h-full">
          <img
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs">
              Image {currentImageIndex + 1} of {images.length}
            </p>
          </div>
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={previousImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}