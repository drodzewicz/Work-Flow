import React from "react";

import { useParams } from "react-router-dom";

import useGetBoardRoles from "@/service/useGetBoardRoles";

const RoleSections = () => {
  const params = useParams<{ id: string }>();
  const { data: roles = {} } = useGetBoardRoles({ boardId: params.id ?? "" });
  return (
    <section>
      <h2>Roles</h2>
      {Object.entries(roles).map(([role, { permissions }]) => (
        <div>
          <strong>{role}: </strong>
          {permissions.map((permission) => (
            <small>{permission}</small>
          ))}
        </div>
      ))}
    </section>
  );
};

export default RoleSections;
