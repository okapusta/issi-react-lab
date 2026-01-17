import React from "react";

import { useParams } from "react-router";

const Actor = () => {
  const params = useParams();
  return (
    <>
      Hello world from actors  {params.id} :)
    </>
  )
}

export default Actor;
