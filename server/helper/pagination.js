const ResponseError = require("../error/ResponseError");

const paginateContent = (items, page, limit) => {
  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || isNaN(limit)) {
    throw new ResponseError(
      400,
      { pagination: "limit or page is not a number" },
      "pagination - page or limit is not a number"
    );
  }

  if (page < 1)
    throw new ResponseError(400, { page: "page must be > 1" }, "pagination - page must be > 1");
  if (limit < 1)
    throw new ResponseError(400, { limit: "limit must be > 1" }, "pagination - limit must be > 1");

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  const prev = startIndex > 1 ? page - 1 : undefined;
  const next = items.length > page * limit ? page + 1 : undefined;
  const totalPageCount = Math.ceil(items.length / limit);
  return { prev, next, items: paginatedItems, totalPageCount };
};

module.exports = paginateContent;
