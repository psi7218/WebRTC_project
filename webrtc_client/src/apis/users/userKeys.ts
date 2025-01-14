export const userKeys = {
  all: ["users"] as const, // 기본 네임스페이스
  list: () => [...userKeys.all, "list"], // 전체 목록용
  search: (keyword: string) => [...userKeys.all, "search", keyword], // 필터링된 목록용(아이디로 알아낼때)
  detail: (id: string | number) => [...userKeys.all, "detail", id.toString()], // id값으로 특정 유저 조회
};
