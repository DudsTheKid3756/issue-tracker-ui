const dateData = (today) => {
  return new Map([
    ["month", today.getMonth() + 1],
    ["day", today.getDate()],
    ["year", today.getFullYear()],
    ["hours", today.getHours()],
    ["minutes", today.getMinutes()],
    ["seconds", today.getSeconds()],
  ]);
};

const handleTimeout = (issues, apiError, resetToday) => {
  while (issues.length > 0 && !apiError) {
    const timerId = setInterval(resetToday, 1000);
    return () => {
      console.log("log");
      clearInterval(timerId);
    };
  }
};

export { dateData, handleTimeout };
