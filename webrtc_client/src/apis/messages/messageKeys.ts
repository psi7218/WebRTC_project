export const messageKeys = {
  all: ["messages"] as const,
  list: () => [...messageKeys.all, "list"],
  getByChanneldId: (channelId: number) => [
    ...messageKeys.all,
    "getByChannelId",
    channelId,
  ],
};
