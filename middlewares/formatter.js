const { formatDistanceToNow } = require("date-fns");

exports.formatDate = (data) => {
  const date = new Date(data);
  const formattedDate = formatDistanceToNow(date, { includeSeconds: true });
  return formattedDate;
};
