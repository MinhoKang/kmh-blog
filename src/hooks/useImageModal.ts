import { useState, useCallback, useEffect } from "react";

interface UseImageModalReturn {
  selectedImage: string | null;
  isLoading: boolean;
  isModalOpen: boolean;
  openModal: (src: string) => void;
  closeModal: () => void;
  handleImageLoad: () => void;
}

export const useImageModal = (): UseImageModalReturn => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((src: string) => {
    setSelectedImage(src);
    setIsLoading(true);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setIsLoading(false);
    setIsModalOpen(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isModalOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // 스크롤 위치 복원 (부드러운 모션 없이 즉시)
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        // smooth 스크롤 비활성화하고 즉시 이동
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
        // 스크롤 동작을 다시 smooth로 복원
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "smooth";
        }, 0);
      }
    }

    // cleanup function
    return () => {
      if (isModalOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        if (scrollY) {
          // smooth 스크롤 비활성화하고 즉시 이동
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
          // 스크롤 동작을 다시 smooth로 복원
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = "smooth";
          }, 0);
        }
      }
    };
  }, [isModalOpen]);

  return {
    selectedImage,
    isLoading,
    isModalOpen,
    openModal,
    closeModal,
    handleImageLoad,
  };
};
