/**
 * 날짜 범위를 포맷팅하는 함수
 * @param startDate 시작일 (YYYY-MM, YYYY-MM-DD, YYYY 형식)
 * @param endDate 종료일 (YYYY-MM, YYYY-MM-DD, YYYY 형식)
 * @returns 포맷된 날짜 범위 문자열
 */
export function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate && !endDate) return "2024-01-01";
  if (!startDate) return endDate!;
  if (!endDate) return startDate;

  // 정확한 날짜 형식 (YYYY-MM-DD)인지 확인
  const isExactDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date);

  if (isExactDate(startDate) && isExactDate(endDate)) {
    return `${startDate} ~ ${endDate}`;
  } else {
    return `${startDate} ~ ${endDate}`;
  }
}

/**
 * startDate 기준으로 프로젝트를 정렬하는 함수 (최신순)
 * @param a 첫 번째 프로젝트
 * @param b 두 번째 프로젝트
 * @returns 정렬 결과
 */
export function sortProjectsByStartDate(
  a: { startDate?: string },
  b: { startDate?: string }
): number {
  // startDate가 없는 경우 맨 뒤로
  if (!a.startDate && !b.startDate) return 0;
  if (!a.startDate) return 1;
  if (!b.startDate) return -1;

  // startDate 비교 (최신순 - 오래된 것이 아래로)
  return b.startDate.localeCompare(a.startDate);
}
