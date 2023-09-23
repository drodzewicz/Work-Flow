const selfURL = {
  index: "/self" as const,
  notifications: () => `${selfURL.index}/notification` as const,
  deleteNotification: (notificationId: string) =>
    `${selfURL.notifications()}/${notificationId}` as const,
  pinnedBards: () => `${selfURL.index}/pinnedBoards` as const,
  boards: () => `${selfURL.index}/boards` as const,
  togglePin: (boardId: string) => `${selfURL.pinnedBards()}/${boardId}` as const,
};

export default selfURL;
