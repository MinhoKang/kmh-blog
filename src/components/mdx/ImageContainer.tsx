"use client";

import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useImageModal } from "@/hooks";
import { cn } from "@/lib/utils";

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
    isLoading,
    isModalOpen,
    openModal,
    closeModal,
    handleImageLoad,
  } = useImageModal();

  return (
    <>
      <div className={`flex flex-wrap sm:flex-row gap-4 ${className}`}>
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
      {isModalOpen && selectedImage && (
        <div
          className={cn(
            "fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4",
            "transition-opacity duration-200 ease-in-out"
          )}
        >
          <div className="relative max-w-6xl max-h-full overflow-hidden"></div>
          {/* 닫기 버튼 */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={closeModal}
              className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
            >
              ×
            </button>
          </div>

          {/* 이미지 컨테이너 */}
          <div
            className="w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => {
              // 배경 클릭 시에만 모달 닫기
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={3}
              centerOnInit={true}
              wheel={{ step: 0.1 }}
              pinch={{ step: 5 }}
              doubleClick={{ disabled: false }}
              panning={{ disabled: false }}
              limitToBounds={true}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  {/* 줌 컨트롤 버튼들 */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        zoomOut();
                      }}
                      className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                      disabled={false}
                    >
                      −
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetTransform();
                      }}
                      className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 text-sm"
                    >
                      ⌂
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        zoomIn();
                      }}
                      className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                      disabled={false}
                    >
                      +
                    </button>
                  </div>

                  <TransformComponent
                    wrapperClass="w-full h-full"
                    contentClass="w-full h-full flex items-center justify-center"
                  >
                    <div
                      className="relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={selectedImage}
                        alt="확대된 이미지"
                        width={1200}
                        height={800}
                        className="max-w-full max-h-full object-contain rounded-lg select-none"
                        quality={100}
                        draggable={false}
                        onLoad={handleImageLoad}
                      />

                      {/* 로딩 스피너 */}
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                      )}
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}
    </>
  );
};
