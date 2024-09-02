import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type Props = {};

const BeatLoader = (props: Props) => {
  return (
    <div className="w-fit animate-pulse">
      <HiOutlineDotsHorizontal size={50} />
    </div>
  );
};

export default BeatLoader;
