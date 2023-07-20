export const useFormatDate = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = navigator.locale;

    const options = {
      hour: "numeric",
      minute: "numeric",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return new Intl.DateTimeFormat(locale, options).format(date) + "";
  };

  const timeSince = (dateString) => {
    const date = new Date(dateString);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      const t = Math.floor(interval);
      return `${t} year${t === 1 ? "" : "s"}`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      const t = Math.floor(interval);
      return `${t} month${t === 1 ? "" : "s"}`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      const t = Math.floor(interval);
      return `${t} day${t === 1 ? "" : "s"}`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      const t = Math.floor(interval);
      return `${t} hour${t === 1 ? "" : "s"}`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      const t = Math.floor(interval);
      return `${t} minute${t === 1 ? "" : "s"}`;
    }
    const t = Math.floor(seconds);
    return `${t} second${t === 1 ? "" : "s"}`;
  };

  const formatAsDateAndTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hrs = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format the date and time as yyyy-mm-ddThh:mm
    return `${year}-${month}-${day}T${hrs}:${minutes}`;
  };

  const formatAsDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as yyyy-mm-dd
    return `${year}-${month}-${day}`;
  };

  return { formatDate, timeSince, formatAsDateAndTime, formatAsDate };
};
