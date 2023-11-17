const selfURL = {
  index: "/self" as const,
  notifications: () => `${selfURL.index}/notifications` as const,
  deleteNotification: (notificationId: string) =>
    `${selfURL.notifications()}/${notificationId}` as const,
  pinnedBards: () => `${selfURL.index}/pinnedBoards` as const,
  boards: () => `${selfURL.index}/boards` as const,
  avatar: () => `${selfURL.index}/avatar` as const,
  togglePin: (boardId: string) => `${selfURL.pinnedBards()}/${boardId}` as const,
};

export default selfURL;
