// components/ImageContainer.tsx
import Image from "next/image";

interface ImageData {
  src: string;
  alt: string;
  width?: string; // "full" | "auto" | "300" 등
  className?: string; // 개별 이미지 커스텀 클래스
}

interface ImageContainerProps {
  images: ImageData[];
  className?: string;
  imageWidth?: number; // Next.js Image width
  imageHeight?: number; // Next.js Image height
}

export const ImageContainer = ({
  images,
  className = "",
  imageWidth = 800,
  imageHeight = 600,
}: ImageContainerProps) => {
  return (
    <div className={`flex flex-wrap sm:flex-row gap-4 mb-8 ${className}`}>
      {images.map((image, index) => {
        // width 속성에 따라 클래스 결정
        const getWidthClass = (width?: string) => {
          switch (width) {
            case "full":
              return "w-full";
            case "auto":
              return "w-auto";
            default:
              return "w-full sm:w-80"; // 기본값
          }
        };

        return (
          <Image
            width={imageWidth}
            height={imageHeight}
            key={index}
            src={image.src}
            alt={image.alt}
            quality={100}
            priority
            className={`${getWidthClass(image.width)} h-auto rounded-lg shadow-lg ${image.className || ""}`}
          />
        );
      })}
    </div>
  );
};
