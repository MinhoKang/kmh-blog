import { ExternalLink, Calendar, User } from "lucide-react";
import Image from "next/image";

import { fetchLinkPreview } from "@/actions/link-preview";
import { cn } from "@/lib/utils";

interface LinkPreviewProps {
  url: string;
  className?: string;
}

export const LinkPreview = async ({ url, className }: LinkPreviewProps) => {
  const previewData = await fetchLinkPreview(url);

  if (!previewData) {
    return (
      <div
        className={cn(
          "border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-6",
          "bg-neutral-50 dark:bg-neutral-800",
          className
        )}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          {url}
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden mb-6",
        "bg-white dark:bg-neutral-900 hover:shadow-lg transition-shadow",
        className
      )}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        <div className="flex flex-col sm:flex-row">
          {previewData.image && (
            <div className="sm:w-48 h-32 sm:h-auto bg-neutral-100 dark:bg-neutral-800 relative">
              <Image
                src={previewData.image}
                alt={previewData.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 192px"
              />
            </div>
          )}

          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2">
                {previewData.title}
              </h3>
              <ExternalLink className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-1" />
            </div>

            {previewData.description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                {previewData.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500">
              {previewData.siteName && (
                <span className="font-medium">{previewData.siteName}</span>
              )}

              {previewData.publishedTime && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(previewData.publishedTime).toLocaleDateString()}
                  </span>
                </div>
              )}

              {previewData.author && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{previewData.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
