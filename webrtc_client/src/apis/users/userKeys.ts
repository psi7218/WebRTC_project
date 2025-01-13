export const userKeys = {
  all: ["users"] as const, // 기본 네임스페이스
  list: () => [...userKeys.all, "list"], // 전체 목록용
  search: (keyword: string) => [...userKeys.all, "search", keyword], // 필터링된 목록용
};
