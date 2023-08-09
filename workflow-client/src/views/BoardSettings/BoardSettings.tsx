import React from "react";

import { Link, useParams } from "react-router-dom";

import Button from "@/components/general/Button/Button";

import ContainerBox from "@/components/layout/ContainerBox";

import GeneralSections from "./GeneralSections";
import MembersSection from "./MembersSection";
import RoleSections from "./RoleSections";

const BoardSettings: React.FC = () => {
  const params = useParams<{ id: string }>();
  return (
    <ContainerBox className="flex flex-col">
      <div className="flex flex-row mb-3 justify-end">
        <Button className="ml-0 mr-auto">
          <Link to={`/board/${params.id}`}>back to board</Link>
        </Button>
        <Button>Leave board</Button>
        <Button>Delete Board</Button>
      </div>
      <GeneralSections />
      <RoleSections />
      <MembersSection />
    </ContainerBox>
  );
};

export default BoardSettings;
