import React, { useState } from "react";

import Alert from "../../utils/icons/Alert";
import Check from "../../utils/icons/Check";
import Pencil from "../../utils/icons/Pencil";
import Info from "../../utils/icons/Info";
import ModalComponent from "../ModalComponent";
import classes from "./Issues.module.css";
import ReminderComponent from "./ReminderComponent";
import TrashCan from "../../utils/icons/TrashCan";

const IssuesList = ({
  issues,
  showComment,
  toggleComment,
  toEdit,
  handleDelete,
}) => {
  const [alertInfoShown, setAlertInfoShown] = useState(false);

  return issues.map((issue) => (
    <div key={issue.id} className={classes.item}>
      <div className={classes.titleContainer}>
        <h3 className={classes.title}>{issue.title}</h3>
        <Info title="Issue Comment" onClick={() => toggleComment(issue.id)} />
        <span className={classes.created}>{issue.created}</span>
        <Pencil onClick={() => toEdit(issue, issue.reminder)} />
        <TrashCan onClick={() => handleDelete(issue.id)} />
        {issue.isCompleted ? <Check /> : null}
        {issue.reminder ? (
          <>
            <Alert
              title="Reminder Info"
              onClick={() => setAlertInfoShown(true)}
            />
            <ModalComponent
              component={<ReminderComponent reminder={issue?.reminder} />}
              label="Reminder Info"
              isOpen={alertInfoShown}
              onRequestClose={() => setAlertInfoShown(false)}
            />
          </>
        ) : null}
      </div>
      {showComment[issue.id] ? (
        <p className={classes.comment} style={{ borderColor: issue.color }}>
          {issue.comment}
        </p>
      ) : (
        <p className={classes.spacer} style={{ borderColor: issue.color }}></p>
      )}
    </div>
  ));
};

export default IssuesList;
