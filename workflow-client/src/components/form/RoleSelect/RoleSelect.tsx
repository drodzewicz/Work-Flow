import React from "react";

import { getRoleIcon } from "@/utils/role";
import Select, { ActionMeta, SingleValue, components } from "react-select";

type BoardRoles = Record<string, { permissions: string[] }>;

type RoleSelectProps = {
  roles: BoardRoles;
  disabled?: boolean;
  initialValue?: string;
  onSelect?: (role: string) => void;
};

const Option: React.FC<any> = (props) => {
  const Icon = getRoleIcon(props.data.value);
  return (
    <components.Option {...props}>
      <div>
        <Icon />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const SingleValueCustom: React.FC<any> = (props) => {
  const Icon = getRoleIcon(props.data.value);
  return (
    <components.SingleValue {...props}>
      <div>
        <Icon />
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const RoleSelect: React.FC<RoleSelectProps> = ({ roles, onSelect, initialValue, disabled }) => {
  const rolesList = Object.keys(roles).map((role) => ({ value: role, label: role }));

  const onSelectHandler = (
    data: SingleValue<{ label: string; value: string }>,
    actions: ActionMeta<{ label: string; value: string }>
  ) => {
    if (actions.action === "select-option") {
      const role = data?.value ?? "";
      onSelect?.(role);
    }
  };

  return (
    <Select
      isDisabled={disabled}
      defaultValue={rolesList.find((role) => role.value === initialValue)}
      options={rolesList}
      onChange={onSelectHandler}
      components={{ Option: Option, SingleValue: SingleValueCustom }}
    />
  );
};

export default RoleSelect;
