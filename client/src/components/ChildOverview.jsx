import React from "react";
import { MdChildCare } from "react-icons/md";
// import { BsFillPeopleFill } from "react-icons/bs";<BsFillPeopleFill />
// import { AiOutlineDollar } from "react-icons/ai";<AiOutlineDollar />
// import { BsFillCalendar2CheckFill } from "react-icons/bs";<BsFillCalendar2CheckFill />
// import { BsFillPersonPlusFill } from "react-icons/bs";<BsFillPersonPlusFill />

export default function ChildOverview() {
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <div className="flex ">
        <MdChildCare />
        Children Overview
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
