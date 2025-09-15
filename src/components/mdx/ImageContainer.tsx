"use client";

import Image from "next/image";

import { useImageModal } from "@/hooks";

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
  const {
    selectedImage,
    zoom,
    position,
    isDragging,
    imageRef,
    openModal,
    closeModal,
    handleZoomIn,
    handleZoomOut,
    handleReset,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useImageModal();

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
