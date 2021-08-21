const TagService = require("../services/TagService");
const mockTagRepository = require("./mocks/repositories/mockTagRepository");
const mockDatabase = require("./mocks/data");

describe("TAG", () => {
  let tagService;
  let TagRepository;

  beforeEach(() => {
    TagRepository = mockTagRepository();
    tagService = TagService({ TagRepository });
  });

  describe("CREATE BOARD TAG", () => {
    const boardId = "board_id";
    const newTagData = { name: "new_tag", color: "RED" };
    it("should create a new tag", async () => {
      await tagService.createNewBoardTag(boardId, newTagData);
      expect(TagRepository.create).toBeCalledWith(newTagData.name, newTagData.color);
    });
    it("should add tag to the board", async () => {
      const newTag = await tagService.createNewBoardTag(boardId, newTagData);
      expect(TagRepository.addTagToBoard).toBeCalledWith(boardId, newTag._id);
    });
  });

  describe("DELETE BOARD TAG", () => {
    const tagId = mockDatabase.tags[0]._id;
    const boardId = "board_id";
    it("should delete tag", async () => {
      await tagService.deleteBoardTag(boardId, tagId);
      expect(TagRepository.delete).toHaveBeenCalledWith(tagId);
    });

    it("should remove tag from the board tag", async () => {
      await tagService.deleteBoardTag(boardId, tagId);
      expect(TagRepository.removeTagfromBoard).toHaveBeenCalledWith(boardId, tagId);
    });
  });
});
