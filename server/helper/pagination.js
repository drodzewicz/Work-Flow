const { response } = require("express");

const paginateContent = (items, page, limit) => {
	page = parseInt(page);
    limit = parseInt(limit);
    

    if(!isNaN(page) && !isNaN(limit)){
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedItems = items.slice(startIndex, endIndex);

        response.prev = startIndex > 1 ? page - 1 : undefined;
        response.next = items.length > page * limit ? page + 1 : undefined;
        response.items = paginatedItems;
        response.totalPageCount = Math.floor(items.length / limit) + 1;
    } else {
        response.items = items;
    }
    return response;
};

module.exports = paginateContent;