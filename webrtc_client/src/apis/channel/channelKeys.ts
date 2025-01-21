export const channelKeys = {
  all: ["channels"] as const,
  list: () => [...channelKeys.all, "list"],
  search: (participatingId: number) => [
    ...channelKeys.all,
    "search",
    participatingId,
  ],
  getChannelsById: (serverId: number) => [
    ...channelKeys.all,
    "getChannelSById",
    serverId,
  ],
};
