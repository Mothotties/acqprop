type ImageSize = 'thumbnail' | 'medium' | 'large';

interface ImageDimensions {
  width: number;
  height: number;
}

const imageSizes: Record<ImageSize, ImageDimensions> = {
  thumbnail: { width: 150, height: 150 },
  medium: { width: 400, height: 300 },
  large: { width: 800, height: 600 },
};

export const getOptimizedImageUrl = (url: string, size: ImageSize = 'medium'): string => {
  if (!url) return '';
  
  // If it's already an optimized URL, return as is
  if (url.includes('imagedelivery.net')) {
    return url;
  }

  // If it's an Unsplash image, use their optimization API
  if (url.includes('unsplash.com')) {
    const { width, height } = imageSizes[size];
    return `${url}&w=${width}&h=${height}&q=80&fit=crop`;
  }

  // For other images, you might want to implement your own optimization logic
  // or use a third-party service
  return url;
};

export const preloadImage = (url: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
};

export const lazyLoadImage = (
  element: HTMLImageElement,
  src: string,
  onLoad?: () => void
): void => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.src = src;
        if (onLoad) {
          element.onload = onLoad;
        }
        observer.unobserve(element);
      }
    });
  });

  observer.observe(element);
};