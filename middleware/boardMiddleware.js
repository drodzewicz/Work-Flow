const boardMiddleWare = {};
const Board = require("../models/board");

const getBoard = async (boardId, fields) => {
    try {
        const selectFields = fields !== "" ? fields : undefined;
        const foundBoard = await Board.findOne({ _id: boardId }, selectFields);
        return foundBoard;
    } catch (error) {
        return res.status(404).json({ message: "board not found >" });
    }
}

boardMiddleWare.isBoardAuthor = async (req, res, next) => {
    const { boardId } = req.params;
    const { id } = req.user;

    const { author } = await getBoard(boardId, "author");
    if (author.toLocaleString() !== id.toLocaleString())
     return res.status(401).json({ message: "you are not the author of this board" });

    return next();
}

boardMiddleWare.isBoardMember = async (req, res, next) => {
    const { boardId } = req.params;
    const { id } = req.user;

    const { members } = await getBoard(boardId, "members");
    const indexOfMember = members.findIndex(({ user }) => user.toLocaleString() === id.toLocaleString());
    if (indexOfMember < 0)
        return res.status(403).json({ message: "you are not a member of this board" })

    return next();
}

boardMiddleWare.isBoardAdmin = async (req, res, next) => {
    const { boardId } = req.params;
    const { id } = req.user;

    const { members } = await getBoard(boardId, "members");
    const indexOfMember = members.findIndex(({ user }) => user.toLocaleString() === id.toLocaleString());
    console.log(members[indexOfMember].role);

    if (indexOfMember < 0)
        return res.status(403).json({ message: "you are not a member of this board" })
    else if (members[indexOfMember].role === "admin" || members[indexOfMember].role === "owner")
        return next();
    return res.status(401).json({ message: "you are not a authorized" })
   
}

module.exports = boardMiddleWare;