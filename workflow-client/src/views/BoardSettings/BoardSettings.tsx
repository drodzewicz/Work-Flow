import React from "react";

import { Link, useParams } from "react-router-dom";

import Button from "@/components/general/Button/Button";

import GeneralSections from "./GeneralSections";
import MembersSection from "./MembersSection";
import RoleSections from "./RoleSections";

const BoardSettings: React.FC = () => {
  const params = useParams<{ id: string }>();
  return (
    <div>
      <Button>
        <Link to={`/board/${params.id}`}>back to board</Link>
      </Button>
      <GeneralSections />
      <hr />
      <MembersSection />
      <hr />
      <RoleSections />
    </div>
  );
};

export default BoardSettings;
