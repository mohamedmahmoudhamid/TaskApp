import React from "react";
import ButtonAppBar from "./appbar";

const Index = ({ myMode, setmyMode }) => {
  return (
    <div>
      <ButtonAppBar myMode={myMode} setmyMode={setmyMode} />
    </div>
  );
};

export default Index;
