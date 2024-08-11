import { useState, useEffect } from "react";

const Clock = ({ onlyTime, onlyDay }) => {
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [currentTime, setCurrentTime] = useState(new Date());
  const [hour12, setHour12] = useState(true);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10 * 1000);

    return () => clearInterval(updateInterval);
  }, []);

  let day = dayList[currentTime.getDay()];
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  let month = monthList[currentTime.getMonth()];
  let date = currentTime.getDate().toLocaleString();
  let meridiem = hour < 12 ? "AM" : "PM";

  if (minute.toLocaleString().length === 1) {
    minute = "0" + minute;
  }

  if (hour12 && hour > 12) hour -= 12;

  let displayTime;
  if (onlyTime) {
    displayTime = hour + ":" + minute + " " + meridiem;
  } else if (onlyDay) {
    displayTime = day + " " + month + " " + date;
  } else {
    displayTime =
      day +
      " " +
      month +
      " " +
      date +
      " " +
      hour +
      ":" +
      minute +
      " " +
      meridiem;
  }

  return <span>{displayTime}</span>;
};

export default Clock;
