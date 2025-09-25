"use client";

export type ViewType = "list" | "grid";

interface ViewTypeToggleProps {
  viewType: ViewType;
  onViewTypeChange: (viewType: ViewType) => void;
  className?: string;
}

export function ViewTypeToggle({
  viewType,
  onViewTypeChange,
  className = "",
}: ViewTypeToggleProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => onViewTypeChange("list")}
        className={`p-2 rounded-md transition-all duration-200 ${
          viewType === "list"
            ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        }`}
        aria-label="List view"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </button>

      <button
        onClick={() => onViewTypeChange("grid")}
        className={`p-2 rounded-md transition-all duration-200 ${
          viewType === "grid"
            ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        }`}
        aria-label="Grid view"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"
          />
        </svg>
      </button>
    </div>
  );
}
