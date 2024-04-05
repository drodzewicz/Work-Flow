import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import memberURL from "./url";

type PaginatedBoardMembersList = { members: BoradMember[]; totalCount: number };

type MemberListQueryKey = ReturnType<(typeof memberQueryKeys)["listPaginated"]>;

type OptionsType = Omit<
    UseQueryOptions<
        PaginatedBoardMembersList,
        AxiosError,
        PaginatedBoardMembersList,
        MemberListQueryKey
    >,
    "queryKey" | "queryFn"
>;

type GetBoardMembersProps = { boardId: string; page: number; limit: number } & OptionsType;

const useGetBoardMembers = ({ boardId, page, limit, ...options }: GetBoardMembersProps) => {
    const client = useAuthClient();

    const fetchMembersList: QueryFunction<PaginatedBoardMembersList, MemberListQueryKey> = async ({
        queryKey: [{ listId, pagination }],
    }) => {
        const response = await client.get(memberURL.index(listId), { params: pagination });
        return response.data;
    };

    return useQuery({
        ...options,
        queryKey: memberQueryKeys.listPaginated(boardId, { page, limit }),
        queryFn: fetchMembersList,
    });
};

export default useGetBoardMembers;
