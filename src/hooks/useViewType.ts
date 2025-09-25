"use client";

import { useState, useEffect } from "react";

import { ViewType } from "@/components/common/ViewTypeToggle";

export function useViewType(
  storageKey: string,
  defaultValue: ViewType = "list"
) {
  const [viewType, setViewType] = useState<ViewType>(defaultValue);

  // 초기 로드 시 localStorage에서 값 가져오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedViewType = localStorage.getItem(storageKey) as ViewType;
      if (
        savedViewType &&
        (savedViewType === "list" || savedViewType === "grid")
      ) {
        setViewType(savedViewType);
      }
    }
  }, [storageKey]);

  // viewType 변경 시 localStorage에 저장
  const handleViewTypeChange = (newViewType: ViewType) => {
    setViewType(newViewType);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newViewType);
    }
  };

  return {
    viewType,
    setViewType: handleViewTypeChange,
  };
}
