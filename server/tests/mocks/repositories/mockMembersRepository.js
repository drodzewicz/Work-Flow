const mockDatabase = require("../data");
const { mongoObject } = require("../utils");

module.exports = function () {
  const getMembers = jest.fn().mockReturnValue([]);
  const addMember = jest.fn();
  const removeMember = jest.fn();
  const updateMemberRole = jest.fn();


  return {
    getMembers,
    addMember,
    removeMember,
    updateMemberRole
  };
};
