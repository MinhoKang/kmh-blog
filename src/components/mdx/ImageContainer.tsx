"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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
  fixedHeight?: boolean; // 고정 높이 사용 여부
  heightClass?: string; // 커스텀 높이 클래스
}

export const ImageContainer = ({
  images,
  className = "",
  imageWidth = 800,
  imageHeight = 600,
  fixedHeight = false,
  heightClass = "h-64",
}: ImageContainerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null
  );
  const imageRef = useRef<HTMLDivElement>(null);

  const openModal = (src: string) => {
    setSelectedImage(src);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    // 배경 스크롤 방지
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    // 배경 스크롤 복원
    document.body.style.overflow = "unset";
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 0.5);
      // 줌이 1이 되면 위치 리셋
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // 터치 이벤트 핸들러들
  const getTouchDistance = (touches: React.TouchList): number => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touches = e.touches;

    if (touches.length === 1) {
      // 단일 터치 - 드래그 시작
      setIsDragging(true);
      setTouchStart({ x: touches[0].clientX, y: touches[0].clientY });
      setDragStart({
        x: touches[0].clientX - position.x,
        y: touches[0].clientY - position.y,
      });
    } else if (touches.length === 2) {
      // 두 손가락 터치 - 핀치 줌 시작
      setIsDragging(false);
      const distance = getTouchDistance(touches);
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touches = e.touches;

    if (touches.length === 1 && isDragging && touchStart) {
      // 단일 터치 드래그
      setPosition({
        x: touches[0].clientX - dragStart.x,
        y: touches[0].clientY - dragStart.y,
      });
    } else if (touches.length === 2 && lastTouchDistance) {
      // 두 손가락 핀치 줌
      const currentDistance = getTouchDistance(touches);
      const scale = currentDistance / lastTouchDistance;

      if (scale > 1.1) {
        // 줌 인
        setZoom((prev) => Math.min(prev + 0.1, 3));
        setLastTouchDistance(currentDistance);
      } else if (scale < 0.9) {
        // 줌 아웃
        setZoom((prev) => {
          const newZoom = Math.max(prev - 0.1, 0.5);
          if (newZoom === 1) {
            setPosition({ x: 0, y: 0 });
          }
          return newZoom;
        });
        setLastTouchDistance(currentDistance);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setTouchStart(null);
    setLastTouchDistance(null);
  };

  // 줌이 1이 되면 위치 자동 리셋
  useEffect(() => {
    if (zoom === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoom]);

  return (
    <>
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
              className={`${getWidthClass(image.width)} ${fixedHeight ? heightClass : "h-auto"} rounded-lg shadow-lg ${fixedHeight ? "object-cover" : "object-contain object-top"} cursor-pointer hover:opacity-90 transition-opacity ${image.className || ""}`}
              onClick={() => openModal(image.src)}
            />
          );
        })}
      </div>

      {/* 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl max-h-full overflow-hidden">
            {/* 컨트롤 버튼들 */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                disabled={zoom <= 0.5}
              >
                −
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 text-sm"
              >
                ⌂
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                disabled={zoom >= 3}
              >
                +
              </button>
              <button
                onClick={closeModal}
                className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
              >
                ×
              </button>
            </div>

            {/* 줌 레벨 표시 */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
              {Math.round(zoom * 100)}%
            </div>

            {/* 이미지 컨테이너 */}
            <div
              ref={imageRef}
              className="w-full h-full flex items-center justify-center overflow-hidden"
              style={{ touchAction: "none" }}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative"
                style={{
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transition: isDragging ? "none" : "transform 0.1s ease-out",
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <Image
                  src={selectedImage}
                  alt="확대된 이미지"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-lg select-none"
                  quality={100}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
