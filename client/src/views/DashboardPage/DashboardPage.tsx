import React from "react";

import Box from "@/components/layout/Box";

import "./DashboardPage.scss";
import PinnedBoardsSection from "./PinnedBoardsSection";
import AllUserBoardsSection from "./AllUserBoardsSection";

const DashboardPage: React.FC = () => {
    return (
        <Box className="board-dashboard">
            <PinnedBoardsSection />
            <AllUserBoardsSection />
        </Box>
    );
};

export default DashboardPage;
