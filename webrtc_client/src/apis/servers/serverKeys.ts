export const serverKeys = {
  all: ["servers"] as const,
  list: () => [...serverKeys.all, "serverList"],
  getServerById: (serverId: number) => [
    ...serverKeys.all,
    "getServerById",
    serverId,
  ],
  byUserId: (userId: number) => [...serverKeys.all, "byUserId", userId],
};
