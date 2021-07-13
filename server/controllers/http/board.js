const Board = require("../../models/board");
const User = require("../../models/user");
const Task = require("../../models/task");
const Tag = require("../../models/tag");
const paginateConetnt = require("../../helper/pagination");

const boardService = {};

boardService.createNewBoard = async (req, res) => {
  const { id: authorId } = req.user;
  const { name, description } = req.body;
  const members = [{ user: authorId, role: "OWNER" }];
  const newBoard = new Board({ name, description, members, author: authorId });
  try {
    await newBoard.save();
    return res.json({
      message: "new board successfuly created",
      board: newBoard,
    });
  } catch (error) {
    next(error);
  }
};
boardService.updateBoard = async (req, res) => {
  const { name, description } = req.body;
  const { boardId } = req.params;
  try {
    await Board.findOneAndUpdate({ _id: boardId }, { name, description });
    return res.json({
      boardId,
      message: "board successfuly updated",
    });
  } catch (error) {
    next(error);
  }
};
boardService.getMyBoards = async (req, res) => {
  const { id } = req.user;
  const { page, limit } = req.query;
  try {
    let foundMyBoards = await Board.find(
      { "members.user": id },
      "description name _id author"
    ).sort({ timeCreated: -1 });

    let { pinnedBoards } = await User.findById(id).populate({
      path: "pinnedBoards",
      select: "_id",
    });

    foundMyBoards = foundMyBoards.map((board) => {
      const isAuthor = board.author.toLocaleString() === id.toLocaleString();
      const pinned =
        pinnedBoards.findIndex(({ _id }) => {
          return _id.toLocaleString() === board._id.toLocaleString();
        }) > -1;
      return {
        ...board.toObject(),
        pinned,
        isAuthor,
      };
    });

    let { items: boards, prev, next, totalPageCount } = paginateConetnt(foundMyBoards, page, limit);

    return res.json({ boards, prev, next, totalPageCount });
  } catch (error) {
    next(error);
  }
};
boardService.getMyPinnedBoards = async (req, res) => {
  const { id } = req.user;
  try {
    let { pinnedBoards } = await User.findById(id).populate({
      path: "pinnedBoards",
      select: "description name _id author",
    });
    pinnedBoards = pinnedBoards.map((board) => ({
      ...board.toObject(),
      pinned: true,
      isAuthor: board.author.toLocaleString() === id.toLocaleString(),
    }));

    return res.status(200).json({ boards: pinnedBoards });
  } catch (error) {
    next(error);
  }
};
boardService.getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const { short } = req.query;
  try {
    if (short === "true") {
      const foundBoard = await Board.findOne({ _id: boardId }, "_id name description author");
      return res.status(200).json(foundBoard);
    }
    foundBoard = await Board.findOne(
      { _id: boardId },
      "_id name description author columns"
    ).populate({
      path: "columns",
      populate: {
        path: "tasks",
        populate: {
          path: "people tags",
          select: "_id username avatarImageURL color name",
        },
      },
    });
    return res.status(200).json(foundBoard);
  } catch (error) {
    next(error);
  }
};
boardService.togglePinBoard = async (req, res) => {
  const { boardId } = req.query;
  const { id } = req.user;

  try {
    const foundUser = await User.findById(id);
    const indexOfPinnedBoard =
      foundUser.pinnedBoards &&
      foundUser.pinnedBoards.findIndex((pinedBoardId) => pinedBoardId.toLocaleString() === boardId);
    if (indexOfPinnedBoard > -1) {
      foundUser.pinnedBoards.splice(indexOfPinnedBoard, 1);
      foundUser.save();
      return res
        .status(200)
        .json({ message: `unpinned board with id: ${boardId}`, pinned: false, boardId });
    } else {
      foundUser.pinnedBoards.push(boardId);
      foundUser.save();
      return res
        .status(200)
        .json({ message: `pinned board with id: ${boardId}`, pinned: true, boardId });
    }
  } catch (error) {
    next(error);
  }
};
boardService.deleteBoard = async (req, res) => {
  const { id } = req.user;
  const { boardId } = req.params;

  try {
    const { author, tags } = await Board.findById(boardId);
    if (author.toLocaleString() !== id.toLocaleString()) {
      return res.status(401).json({ message: "you are not the author of this Board" });
    }
    // delete tasks
    await Task.deleteMany({ board: boardId });
    // delete tags
    await Tag.deleteMany({ _id: { $in: tags } });
    // delete board
    await Board.findByIdAndDelete(boardId);

    // find deleted board in user profiles in 'pinned boards'
    let foundUserPinnedBoards = await User.find({ pinnedBoards: boardId });
    // and then remove them
    foundUserPinnedBoards = foundUserPinnedBoards.map((user) => {
      const tempPinnedBoards = user.pinnedBoards;
      tempPinnedBoards.splice(tempPinnedBoards.indexOf(boardId), 1);
      const tempUser = {
        ...user.toObject(),
        pinnedBoards: tempPinnedBoards,
      };
      return tempUser;
    });
    return res.status(200).json({ message: `successfully deleted board with id: ${boardId}` });
  } catch (error) {
    next(error);
  }
};
boardService.leaveBoard = async (req, res) => {
  const { id } = req.user;
  const { boardId } = req.params;

  try {
    const foundBoard = await Board.findById(boardId);

    foundBoard.members = foundBoard.members.filter(
      ({ user }) => user.toLocaleString() !== id.toLocaleString()
    );
    foundBoard.save();

    const foundUser = await User.findById(id);
    foundUser.pinnedBoards = foundUser.pinnedBoards.filter(
      (pinnedBoardId) => pinnedBoardId.toLocaleString() !== boardId.toLocaleString()
    );
    foundUser.save();
    return res.status(200).json({ message: `successfully left board of id: ${boardId}` });
  } catch (error) {
    next(error);
  }
};

module.exports = boardService;
