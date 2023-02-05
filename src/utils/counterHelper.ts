import { Issue } from "../@types/Issue";

function dateData(today: Date) {
  return new Map([
    ["month", today.getMonth() + 1],
    ["day", today.getDate()],
    ["year", today.getFullYear()],
    ["hours", today.getHours()],
    ["minutes", today.getMinutes()],
    ["seconds", today.getSeconds()],
  ]);
}

const handleTimeout = (
  issues: Issue[],
  apiError: boolean,
  resetToday: () => void
) => {
  while (issues.length > 0 && !apiError) {
    const timerId = setInterval(resetToday, 1000);
    return () => clearInterval(timerId);
  }
  return;
};

export { dateData, handleTimeout };
