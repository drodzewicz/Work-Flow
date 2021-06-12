const Board = require("../../models/board");
const Tag = require("../../models/tag");
const processErrors = require("../../helper/errorHandler");

const tagService = {};

tagService.getBoardTags = async (req, res) => {
	const { boardId } = req.params;
	try {
		const { tags } = await Board.findOne({ _id: boardId }, "tags").populate("tags");
		return res.status(200).json({ tags });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};
tagService.createNewTag = async (req, res) => {
	const { boardId } = req.params;
	const { name, colorCode } = req.body;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "tags");

		const newTag = new Tag({ name, colorCode });
		const saveTag = await newTag.save();
		foundBoard.tags.push(saveTag);
		await foundBoard.save();
		return res.status(200).json({ message: "created new tag", tag: saveTag });
	} catch (error) {
		return res.status(400).json({
			message: Tag.processErrors(error),
		});
	}
};
tagService.deleteTag = async (req, res) => {
	const { boardId } = req.params;
	const { tagId } = req.params;
	try {
		await Tag.findOneAndDelete({ _id: tagId});
		await Board.findOneAndUpdate({ _id: boardId }, { $pull: { tags: tagId } });
		return res.status(200).json({ message: "tag deleted" });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};
tagService.updateTag = async (req, res) => {
	const { tagId } = req.params;
	const { name, colorCode } = req.body;
	try {
		const updatedTag = await Tag.findOneAndUpdate({_id: tagId}, {name, colorCode});
		return res.status(200).json({ message: "tag updated", tag: updatedTag });
	} catch (error) {
		return res.status(400).json({
			message: Tag.processErrors(error),
		});
	}
};

module.exports = tagService;
