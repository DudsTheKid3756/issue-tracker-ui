import React from "react";
import { Issue } from "../../@types/Issue";

const Notification: React.FC<{ info: Issue }> = ({ info }) => {
  return (
    <>
      <h3 className="">Issue Alert</h3>
      <div className="">
        <h5 className="">{info.title}</h5>
        <p className="">{info.comment}</p>
        <span className="">
          {info.reminder?.date} {info.reminder?.time}
        </span>
      </div>
    </>
  );
};

export default Notification;
