export const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":").map(Number);

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
};