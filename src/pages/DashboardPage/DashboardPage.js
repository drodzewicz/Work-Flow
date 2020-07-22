import React from 'react';
import BoardCard from "components/BoardCard/BoardCard";

function DashboardPage() {
  return (
    <div className="dashboard-container">
      <BoardCard boardTitle="jeden" to={"board/1"} />
      <BoardCard boardTitle="jeden" to={"board/2"} />
      <BoardCard boardTitle="jeden" to={"board/3"} />
    </div>
  )
}

export default DashboardPage
