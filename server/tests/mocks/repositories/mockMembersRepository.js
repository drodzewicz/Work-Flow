const mockDatabase = require("../data");
const { mongoObject, deepCopy } = require("../utils");

module.exports = function () {
  const getMembers = jest.fn().mockReturnValue(deepCopy(mockDatabase.members));
  const addMember = jest.fn();
  const removeMember = jest.fn();
  const updateMemberRole = jest.fn();

  return {
    getMembers,
    addMember,
    removeMember,
    updateMemberRole,
  };
};
