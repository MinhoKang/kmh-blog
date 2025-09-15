import { useState, useRef, useEffect, useCallback } from "react";

interface UseImageModalReturn {
  selectedImage: string | null;
  zoom: number;
  position: { x: number; y: number };
  isDragging: boolean;
  dragStart: { x: number; y: number };
  touchStart: { x: number; y: number } | null;
  lastTouchDistance: number | null;
  isLoading: boolean;
  imageRef: React.RefObject<HTMLDivElement | null>;
  openModal: (src: string) => void;
  closeModal: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleReset: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleWheel: (e: React.WheelEvent) => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleImageLoad: () => void;
}

export const useImageModal = (): UseImageModalReturn => {
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
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((src: string) => {
    setSelectedImage(src);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsLoading(true);
    // 배경 스크롤 방지
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsLoading(false);
    // 배경 스크롤 복원
    document.body.style.overflow = "unset";
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 0.5);
      // 줌이 1이 되면 위치 리셋
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    },
    [handleZoomIn, handleZoomOut]
  );

  // 터치 이벤트 핸들러들
  const getTouchDistance = useCallback((touches: React.TouchList): number => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
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
    },
    [position, getTouchDistance]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
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
    },
    [isDragging, touchStart, dragStart, lastTouchDistance, getTouchDistance]
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setTouchStart(null);
    setLastTouchDistance(null);
  }, []);

  // 줌이 1이 되면 위치 자동 리셋
  useEffect(() => {
    if (zoom === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoom]);

  return {
    selectedImage,
    zoom,
    position,
    isDragging,
    dragStart,
    touchStart,
    lastTouchDistance,
    isLoading,
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
    handleImageLoad,
  };
};
