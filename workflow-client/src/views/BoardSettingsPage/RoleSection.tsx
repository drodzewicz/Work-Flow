import React from "react";

import { getRoleIcon } from "@/utils/role";
import Select from "react-select";

import useBoardId from "@/hooks/useBoardId";

import { useGetBoardRoles, useGetAvailablePermissions } from "@/service/permission";

const RoleSection = () => {
  const boardId = useBoardId();

  const { data: allPermissions = [] } = useGetAvailablePermissions();
  const { data: roles = {} } = useGetBoardRoles({ boardId });

  return (
    <section>
      <h2 className="text-lg font-bold mb-3">User Roles</h2>
      <hr />
      <small>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas rem officiis alias sequi
        optio iure nam velit aut quae provident laboriosam, laudantium voluptatum laborum veritatis
        recusandae, dolor eveniet. Similique tempore qui corporis sed, sequi eos!
      </small>
      {Object.entries(roles).map(([role, { permissions }]) => {
        const RoleIcon = getRoleIcon(role);
        return (
          <div key={role}>
            <strong>
              <RoleIcon />
              {role}:{" "}
            </strong>
            <Select
              className="flex-grow"
              isMulti
              defaultValue={permissions.map((permission) => ({
                value: permission,
                label: permission,
              }))}
              isDisabled={true}
              options={allPermissions.map((permission) => ({
                value: permission,
                label: permission,
              }))}
            />
          </div>
        );
      })}
    </section>
  );
};

export default RoleSection;
