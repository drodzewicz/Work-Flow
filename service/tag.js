const Board = require("../models/board");

const tagService = {};

tagService.getBoardTags = async (req, res) => {
	const { boardId } = req.params;
	try {
		const { tags } = await Board.findOne({ _id: boardId }, "tags");
		return res.status(200).json({ tags });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

tagService.createNewTag = async (req, res) => {
	const { boardId } = req.params;
	const { name, colorCode } = req.body;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "_id tags");
		foundBoard.tags.push({ name, colorCode });
		const { tags } = await foundBoard.save();
		const addedTag = tags.pop();
		return res.status(200).json({ message: "created new tag", tag: addedTag });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};
tagService.deleteTag = async (req, res) => {
	const { boardId } = req.params;
	const { tagId } = req.params;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "tags");
		const indexOfFoundTag = foundBoard.tags.findIndex(
			({ _id }) => _id.toLocaleString() === tagId.toLocaleString()
		);
		foundBoard.tags.splice(indexOfFoundTag, 1);
		await foundBoard.save();
		return res.status(200).json({ message: "tag deleted" });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};
tagService.updateTag = async (req, res) => {
	const { boardId } = req.params;
	const { tagId } = req.params;
	const { name, colorCode } = req.body;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "tags");
		const indexOfFoundTag = foundBoard.tags.findIndex(
			({ _id }) => _id.toLocaleString() === tagId.toLocaleString()
		);
		foundBoard.tags[indexOfFoundTag].name = name;
		foundBoard.tags[indexOfFoundTag].colorCode = colorCode;
		await foundBoard.save();
		return res.status(200).json({ message: "tag updated", tag: foundBoard.tags[indexOfFoundTag] });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

module.exports = tagService;
