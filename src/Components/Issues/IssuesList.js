import React, { useState } from "react";
import Alert from "../../utils/icons/Alert";
import Check from "../../utils/icons/Check";
import Info from "../../utils/icons/Info";
import Pencil from "../../utils/icons/Pencil";
import TrashCan from "../../utils/icons/TrashCan";
import { orderedMap } from "../../utils/orderedMap";
import ModalComponent from "../ModalComponent";
import "./issues.css";
import ReminderComponent from "./ReminderComponent";

const IssuesList = ({
  issues,
  sortBy,
  showComment,
  toggleComment,
  toEdit,
  handleDelete,
}) => {
  const [alertInfoShown, setAlertInfoShown] = useState(false);

  return orderedMap(issues, sortBy).map((issue) => (
    <div key={issue.id} className="item">
      <div className="titleContainer d-flex justify-content-between">
        <div className="d-flex justify-content-start">
          <h3 className="d-inline">{issue.title}</h3>
          {issue.isCompleted ? (
            <Check style="check ms-1 mt-1" title="Completed" />
          ) : null}
        </div>
        <div className="d-flex justify-content-end me-3">
          <div className="d-inline">
            {issue?.reminder ? (
              <Alert
                style="icon"
                title="Reminder Info"
                onClick={() => setAlertInfoShown(true)}
              />
            ) : null}
            <Info
              style="icon"
              title="Issue Comment"
              onClick={() => toggleComment(issue.id)}
            />
            <span className="created">{issue.created}</span>
            <Pencil
              style="icon"
              title="Edit Issue"
              onClick={() => toEdit(issue, issue?.reminder)}
            />
            <TrashCan
              style="icon"
              title="Delete Issue"
              onClick={() => handleDelete(issue.id)}
            />
          </div>
        </div>
      </div>
      <ModalComponent
        component={<ReminderComponent reminder={issue?.reminder} />}
        label="Reminder Info"
        isOpen={alertInfoShown}
        onRequestClose={() => setAlertInfoShown(false)}
      />
      {showComment[issue.id] ? (
        <p className="comment" style={{ borderColor: issue.color }}>
          {issue.comment}
        </p>
      ) : (
        <p className="spacer" style={{ borderColor: issue.color }}></p>
      )}
    </div>
  ));
};

export default IssuesList;
