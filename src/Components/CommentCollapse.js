import React from "react";
import Bars from "../Utils/Icons/Bars";
import classes from "./Issues/Issues.module.css";

const CommentCollapse = ({ showComment, collapseAllComments }) => {
  const commentsAsArray = Object.entries(showComment);
  const commentsShown = commentsAsArray.reduce((acc, curr) => {
    acc[curr[1]] = ++acc[curr[1]] || 1;

    return acc;
  }, {});

  return (
    <div className={classes.barsContainer}>
      {commentsShown.true > 1 ? (
        <Bars title="Collapse Comments" onClick={() => collapseAllComments()} />
      ) : null}
    </div>
  );
};

export default CommentCollapse;
