const pagination = require("../helper/pagination");
const requiredFields = require("../helper/requiredValues");

describe("UTILS", () => {
  describe("PAGINATION", () => {
    const testContent = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN"];

    it("should paginate content", () => {
      const limit = 2;
      const page = 1;
      const { items, totalPageCount } = pagination(testContent, page, limit);
      expect(items.length).toBe(limit);
      expect(totalPageCount).toBe(Math.ceil(testContent.length / limit));
    });

    it("should throw an error if limit and page is not passed", () => {
      expect(() => pagination(testContent)).toThrow();
    });

    it("should throw an error if limit and page are not numbers", () => {
      expect(() => pagination(testContent, null, 1)).toThrow();
      expect(() => pagination(testContent, 2, "aa")).toThrow();
    });

    it("should throw an error if limit is < 1", () => {
      expect(() => pagination(testContent, 1, 0)).toThrow();
    });

    it("should throw an error if page is < 1", () => {
      expect(() => pagination(testContent, 0, 1)).toThrow();
    });
  });

  describe("REQUIRED FIELDS",() => {
    it("should pass if all required fields are in payload", () => {
      const testRequiredFields = ["test_field_one", "test_field_two"];
      const testPayload = {
        test_field_one: 11,
        test_field_two: true
      }
      expect(() => requiredFields(testRequiredFields, testPayload)).not.toThrow();
    });

    it("should throw if required fields is not passed", () => {
      const testRequiredFields = ["test_field_one", "test_field_two"];
      const testPayload = {
        test_field_one: 11,
      }
      expect(() => requiredFields(testRequiredFields, testPayload)).toThrow();
    });

    it("should throw if required fields is undefined", () => {
      const testRequiredFields = ["test_field_one", "test_field_two"];
      const testPayload = {
        test_field_one: 11,
        test_field_two: undefined
      }
      expect(() => requiredFields(testRequiredFields, testPayload)).toThrow();
    });
  })
});
