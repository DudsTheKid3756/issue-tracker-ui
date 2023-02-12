function dateData(today) {
  return new Map([
    ["month", today.getMonth() + 1],
    ["day", today.getDate()],
    ["year", today.getFullYear()],
    ["hours", today.getHours()],
    ["minutes", today.getMinutes()],
    ["seconds", today.getSeconds()],
  ]);
}

function handleTimeout(issues, apiError, resetToday) {
  while (issues.length > 0 && !apiError) {
    const timerId = setInterval(resetToday, 1000);
    return () => clearInterval(timerId);
  }
}

export { dateData, handleTimeout };
