import React from "react";
import Bars from "../utils/icons/Bars";

type CommentCollapsePropsType = {
  showComment: { [id: number]: any };
  collapseAllComments: () => void;
};

const CommentCollapse: React.FC<CommentCollapsePropsType> = ({
  showComment,
  collapseAllComments,
}) => {
  const commentsAsArray = Object.entries(showComment);
  const commentsShown = commentsAsArray.reduce<typeof showComment>(
    (acc, curr) => {
      acc[curr[1]] = ++acc[curr[1]] || 1;

      return acc;
    },
    {}
  );

  return (
    <div className="">
      {commentsShown["true" as unknown as keyof typeof commentsShown] > 1 ? (
        <Bars title="Collapse Comments" onClick={() => collapseAllComments()} />
      ) : null}
    </div>
  );
};

export default CommentCollapse;
