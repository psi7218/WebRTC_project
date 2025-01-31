export const friendKeys = {
  all: ["friends"] as const,
  lists: () => [...friendKeys.all, "list"] as const,
  list: (filters: string) => [...friendKeys.lists(), { filters }] as const,
  details: () => [...friendKeys.all, "detail"] as const,
  detail: (id: number) => [...friendKeys.details(), id] as const,
} as const;
