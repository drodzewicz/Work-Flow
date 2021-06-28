const Board = require("../../models/board");
const Tag = require("../../models/tag");
const processErrors = require("../../helper/errorHandler");

const tagService = {};

tagService.getBoardTags = async (req, res) => {
	const { boardId } = req.params;
	try {
		const { tags } = await Board.findOne({ _id: boardId }, "tags");
		return res.status(200).json({ tags });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};
tagService.createNewTag = async (req, res) => {
	const { boardId } = req.params;
	const { name, color } = req.body;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "tags");

		const tagIndex = foundBoard.tags.findIndex(({ color: tagColor }) => tagColor === color);
		const newTag = { color, name };
		if (tagIndex > -1) {
			foundBoard.tags[tagIndex] = newTag;
		} else {
			foundBoard.tags.push(newTag);
		}
		await foundBoard.save();
		return res.status(200).json({ message: "created new tag", tag: newTag });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};
tagService.deleteTag = async (req, res) => {
	const { boardId, color } = req.params;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "tags");
		foundBoard.tags = foundBoard.tags.filter((tag) => tag.color !== color);
		await foundBoard.save();
		return res.status(200).json({ message: "tag deleted" });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};

module.exports = tagService;
