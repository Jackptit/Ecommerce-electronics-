import moment from "moment-timezone";
export default function formatDate(dateString) {
  return moment(dateString).format("YYYY-MM-DD");
  }