import React from "react";
import bars from "../Utils/Icons/bars.svg";
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
        <img
          className={classes.icon}
          src={bars}
          onClick={() => collapseAllComments()}
        />
      ) : null}
    </div>
  );
};

export default CommentCollapse;
