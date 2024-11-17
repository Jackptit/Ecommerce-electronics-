import TableList from "../Admin/view/TableList";
import Coupon from "./view/Coupon";

const dashboardRoutes = [
  {
    path: "/discount",
    name: "Discount",
    icon: "nc-icon nc-notes",
    component: Coupon,
    layout: "/admin"
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
 
];

export default dashboardRoutes;
