export const messageKeys = {
  all: ["messages"] as const,
  list: () => [...messageKeys.all, "list"],
  getByChannelId: (channelId: number) => [
    ...messageKeys.all,
    "getByChannelId",
    channelId,
  ],
};
