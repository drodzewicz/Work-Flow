const boardMiddleWare = {};
const Board = require("../models/board");

const getBoard = async (boardId, fields) => {
    try {
        const selectFields = fields !== "" ? fields : undefined;
        const foundBoard = await Board.findOne({ _id: boardId }, selectFields);
        return { success: true, foundBoard };
    } catch (error) {
        return { message: "board not found", error: true };
    }
}

boardMiddleWare.isBoardAuthor = async (req, res, next) => {
    const { boardId } = req.params;
    const { id } = req.user;

    const { foundBoard, success, error, message } = await getBoard(boardId, "author");
    if(error) return res.status(404).json({ message });
    else if (success && foundBoard.author.toLocaleString() !== id.toLocaleString())
        return res.status(401).json({ message: "you are not the author of this board" });

    return next();
}

boardMiddleWare.isBoardMember = async (req, res, next) => {
    const { boardId } = req.params;
    const { id } = req.user;

    const { foundBoard, success, error, message } = await getBoard(boardId, "members");
    if(error) return res.status(404).json({ message });
    else if(success) {
        const indexOfMember = foundBoard.members.findIndex(({ user }) => user.toLocaleString() === id.toLocaleString());
        if (indexOfMember < 0)
            return res.status(403).json({ message: "you are not a member of this board" })
    }

    return next();
}

boardMiddleWare.isBoardAdmin = async (req, res, next) => {
    const { boardId } = req.params;
    const { id } = req.user;

    const { foundBoard, success, error, message } = await getBoard(boardId, "members");
    if(error) return res.status(404).json({ message });
    else if(success) {
        const indexOfMember = foundBoard.members.findIndex(({ user }) => user.toLocaleString() === id.toLocaleString());
        if (indexOfMember < 0)
            return res.status(403).json({ message: "you are not a member of this board" })
        else if (foundBoard.members[indexOfMember].role === "ADMIN" || foundBoard.members[indexOfMember].role === "OWNER")
            return next();
        return res.status(401).json({ message: "you are not a authorized" })
    }
}

module.exports = boardMiddleWare;