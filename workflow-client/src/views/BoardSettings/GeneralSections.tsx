import React from "react";

import { useParams } from "react-router-dom";

import useGetBoard from "@/service/useGetBoard";

import Button from "@/components/general/Button";

const GeneralSections: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetBoard({ boardId: params.id });
  return (
    <section>
      <h2>General</h2>
      <input value={data?.name} />
      <br />
      <textarea value={data?.description} />
      <Button>save changes</Button>

      <Button>Leave board</Button>
      <Button>Delete Board</Button>
    </section>
  );
};

export default GeneralSections;
