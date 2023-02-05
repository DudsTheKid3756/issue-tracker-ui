import { Reminder } from "./Reminder";

export type Issue = {
  id: number;
  title: string;
  comment: string;
  created: string;
  color: string;
  hasReminder: boolean;
  isCompleted: boolean;
  reminder: Reminder | null;
};
