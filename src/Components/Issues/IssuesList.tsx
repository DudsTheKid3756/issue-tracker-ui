import React, { useState } from "react";

import { Issue } from "src/@types/Issue";
import { Reminder } from "src/@types/Reminder";
import Alert from "../../utils/icons/Alert";
import Check from "../../utils/icons/Check";
import Info from "../../utils/icons/Info";
import Pencil from "../../utils/icons/Pencil";
import TrashCan from "../../utils/icons/TrashCan";
import ModalComponent from "../ModalComponent";
import ReminderComponent from "./ReminderComponent";

type IssuesListProps = {
  issues: Issue[];
  showComment: {};
  toggleComment: (id: number) => void;
  toEdit: (issue: Issue, reminder: Reminder) => void;
  handleDelete: (id: number) => void;
};

const IssuesList: React.FC<IssuesListProps> = ({
  issues,
  showComment,
  toggleComment,
  toEdit,
  handleDelete,
}) => {
  const [alertInfoShown, setAlertInfoShown] = useState(false);

  return (
    <>
      {issues.map((issue: Issue) => (
        <div key={issue.id} className="">
          <div className="">
            <h3 className="">{issue.title}</h3>
            <Info
              title="Issue Comment"
              onClick={() => toggleComment(issue.id)}
            />
            <span className="">{issue.created}</span>
            <Pencil
              title="Edit Issue"
              onClick={() => toEdit(issue, issue.reminder!)}
            />
            <TrashCan
              title="Delete Issue"
              onClick={() => handleDelete(issue.id)}
            />
            {issue.isCompleted ? <Check title="Completed" /> : null}
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
          {showComment[issue.id as keyof typeof showComment] ? (
            <p className="" style={{ borderColor: issue.color }}>
              {issue.comment}
            </p>
          ) : (
            <p className="" style={{ borderColor: issue.color }}></p>
          )}
        </div>
      ))}
      ;
    </>
  );
};

export default IssuesList;
