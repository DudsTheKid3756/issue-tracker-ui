import React from "react";
import Bars from "../utils/icons/Bars";
import "./issues/issues.css";

const CommentCollapse = ({ showComment, collapseAllComments }) => {
  const commentsAsArray = Object.entries(showComment);
  const commentsShown = commentsAsArray.reduce((acc, curr) => {
    acc[curr[1]] = ++acc[curr[1]] || 1;

    return acc;
  }, {});

  return (
    <div className="barsContainer">
      {commentsShown.true > 1 ? (
        <Bars style="icon" title="Collapse Comments" onClick={() => collapseAllComments()} />
      ) : null}
    </div>
  );
};

export default CommentCollapse;
