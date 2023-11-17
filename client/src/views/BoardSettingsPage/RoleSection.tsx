import useBoardId from "@/hooks/useBoardId";

import { useGetBoardRoles, useGetAvailablePermissions } from "@/service/permission";

import RoleTable from "@/components/general/RoleTable/RoleTable";

const RoleSection = () => {
  const boardId = useBoardId();

  const { data: allPermissions = [] } = useGetAvailablePermissions();
  const { data: roles = {} } = useGetBoardRoles({ boardId });

  return (
    <section>
      <RoleTable permissions={allPermissions} roles={roles} />
    </section>
  );
};

export default RoleSection;
