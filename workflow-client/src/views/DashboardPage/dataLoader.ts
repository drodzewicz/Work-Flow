import { getPinnedBoards, getMyBoards } from "@/service";

export const loader = async ({ request }) => {
  const page = new URL(request.url).searchParams.get("page");
  const { data: boardsData } = await getMyBoards({
    page: page ? parseInt(page) : 1,
    limit: 10,
  });

  const { data: pinnedBoardsData } = await getPinnedBoards();

  return { boardsData, pinnedBoardsData };
};
