import { Service } from "typedi";
import { User, Board } from "../models/index.js";
import { UserModel, BoardDocument, IBoard, BoardFields } from "../types/database/index.js";
import { Pagination, PaginatedResult } from "../types/utils.type.js";
import { GenericRepository } from "./generic.repository.js";
import { BoadsListQueryParams } from "src/types/queryParams/board.type.js";

@Service()
export class BoardRepository extends GenericRepository<IBoard, BoardDocument, BoardFields> {
    private userModel: UserModel;

    constructor() {
        super();
        this.fields = ["_id", "name", "description", "columns", "timeCreated"];
        this.model = Board;
        this.userModel = User;
    }

    async delete(boardId: string) {
        this.validateId(boardId);
        await this.userModel.updateMany(
            { pinnedBoards: boardId },
            { $pull: { pinnedBoards: boardId } }
        );
        await super.delete(boardId);
    }

    async getAllBoards(settings: Pagination): Promise<PaginatedResult<BoardDocument>> {
        const totalCount = await this.model.count({});
        const data = (await this.model
            .find({}, this.fields.join(" "))
            .sort({ timeCreated: "descending" })
            .limit(settings.limit * 1)
            .skip((settings.page - 1) * settings.limit)) as BoardDocument[];

        return { data, totalCount };
    }

    async getUserBoards(
        userId: string,
        settings: BoadsListQueryParams
    ): Promise<PaginatedResult<BoardDocument>> {
        this.validateId(userId);
        const query: any = {
            "members.user": userId,
        };

        if (settings?.name) {
            query.name = { $regex: new RegExp(settings?.name.toLowerCase(), "i") };
            console.log(query.name)
        }
        const totalCount = await this.model.count(query);
        const data = (await this.model
            .find(query, this.fields.join(" "))
            .sort({ timeCreated: "descending" })
            .limit(settings.limit * 1)
            .skip((settings.page - 1) * settings.limit)) as BoardDocument[];

        return { data, totalCount };
    }

    async createColumn(boardId: string, columnName: string) {
        this.validateId(boardId);
        const { columns } = await this.model.findOneAndUpdate(
            { _id: boardId },
            { $push: { columns: { name: columnName } } },
            { new: true }
        );
        return columns.pop();
    }

    async deleteColumn(boardId: string, columnId: string) {
        this.validateId(boardId);
        this.validateId(columnId);
        return await this.model.findOneAndUpdate(
            { _id: boardId },
            { $pull: { columns: { _id: columnId } } }
        );
    }
}
