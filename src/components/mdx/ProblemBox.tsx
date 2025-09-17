interface ProblemBoxProps {
  title: string;
  situation: string;
  solution: string;
  className?: string;
}

export const ProblemBox = ({
  title,
  situation,
  solution,
  className = "",
}: ProblemBoxProps) => {
  return (
    <div
      className={`flex flex-col gap-y-2 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-neutral-50 dark:bg-neutral-800/50 ${className}`}
    >
      <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        {title}
      </h4>

      <div className="mb-4">
        <h5 className="!font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          상황
        </h5>
        <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-line !pl-4">
          {situation}
        </p>
      </div>

      <div>
        <h5 className="!font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          해결
        </h5>
        <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-line !pl-4">
          {solution}
        </p>
      </div>
    </div>
  );
};
