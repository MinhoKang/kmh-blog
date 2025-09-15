import { useState, useCallback } from "react";

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

  return {
    selectedImage,
    isLoading,
    isModalOpen,
    openModal,
    closeModal,
    handleImageLoad,
  };
};
