import React from "react";

import { Link, useParams } from "react-router-dom";

import Box from "@/components/layout/Box";

import GeneralSections from "./GeneralSections";
import MembersSection from "./MembersSection";
import RoleSections from "./RoleSections";

const BoardSettingsPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  return (
    <Box className="flex flex-col">
      <div className="flex flex-row mb-3 justify-end">
        <button className="btn ml-0 mr-auto">
          <Link to={`/board/${params.id}`}>back to board</Link>
        </button>
        <button className="btn">Leave board</button>
        <button className="btn">Delete Board</button>
      </div>
      <GeneralSections />
      <RoleSections />
      <MembersSection />
    </Box>
  );
};

export default BoardSettingsPage;
