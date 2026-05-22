//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/overview.svg";
import vehiclesLogo from "/images/dashboard-logo/vehicles.svg";
import bookingLogo from "/images/dashboard-logo/booking.svg";
import earningLogo from "/images/dashboard-logo/earning.svg";
import reviewLogo from "/images/dashboard-logo/review.svg";
import messageLogo from "/images/dashboard-logo/message.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Notifications from "../pages/Common/Notifications";
import AdminAllTransaction from "../pages/Admin/AdminAllTransaction";
import AdminBookingRequest from "../pages/Admin/AdminBookingRequest";
import AdminVehicles from "../pages/Admin/AdminVehicles";
import AdminVehiclesAvaibility from "../pages/Admin/AdminVehiclesAvaibility";
import AvailabilityForm from "../pages/Admin/AdminVehiclesAvaibilityEditPage";
import PaymentMethods from "../pages/Admin/PaymentMethods";
import AddPaymentMethod from "../pages/Admin/AddPaymentMethod";
import AdminReviews from "../pages/Admin/AdminReviews";
import ConversationPage from "../pages/Admin/ConversationPage";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "vehicles",
    element: <AdminVehicles />,
    key: "vehicles",
    name: "Vehicles",
    icon: vehiclesLogo,
  },
  {
    path: "vehicles/availability/:id",
    element: <AdminVehiclesAvaibility />,
    key: "vehicles",
  },
  {
    path: "vehicles/availability/update/:id",
    element: <AvailabilityForm />,
    key: "vehicles",
  },
  {
    path: "payment-methods",
    element: <PaymentMethods />,
    key: "payment-methods",
  },
  {
    path: "payment-methods/add",
    element: <AddPaymentMethod />,
    key: "payment-methods",
  },
  {
    path: "booking-request",
    element: <AdminBookingRequest />,
    key: "booking-request",
    name: "Booking",
    icon: bookingLogo,
  },

  // {
  //   key: "hosts",
  //   name: "Host",
  //   icon: hostsLogo,
  //   children: [
  //     {
  //       key: "all-hosts",
  //       path: "hosts/all-hosts",
  //       name: "All Hosts",
  //       icon: <span>&#8226;</span>,
  //       element: <AdminAllHosts />,
  //     },
  //     {
  //       key: "hosts-request",
  //       path: "hosts/hosts-request",
  //       name: "Host Request",
  //       icon: <span>&#8226;</span>,
  //       element: <AllHostRequest />,
  //     },
  //     {
  //       key: "reviews",
  //       path: "hosts/reviews",
  //       name: "Reviews",
  //       icon: <span>&#8226;</span>,
  //       element: <AdminHostReview />,
  //     },
  //   ],
  // },
  // {
  //   path: "category",
  //   element: <AdminAllCategory />,
  //   key: "category",
  //   name: "Category",
  //   icon: categoryLogo,
  // },
  // {
  //   key: "activity",
  //   name: "Activity",
  //   icon: activityLogo,
  //   children: [
  //     {
  //       key: "all-activity",
  //       path: "activity/all-activity",
  //       name: "All Activity",
  //       icon: <span>&#8226;</span>,
  //       element: <AdminAllActivity />,
  //     },
  //     {
  //       key: "activity-request",
  //       path: "activity/activity-request",
  //       name: "Activity Request",
  //       icon: <span>&#8226;</span>,
  //       element: <AdminActivityRequest />,
  //     },
  //   ],
  // },
  // {
  //   key: "promo",
  //   name: "Promo",
  //   icon: promoLogo,
  //   children: [
  //     {
  //       key: "all-promo",
  //       path: "promo/all-promo",
  //       name: "All Promo",
  //       icon: <span>&#8226;</span>,
  //       element: <AdminAllPromo />,
  //     },
  //     {
  //       key: "promo-request",
  //       path: "promo/promo-request",
  //       name: "Promo Request",
  //       icon: <span>&#8226;</span>,
  //       element: <AdminPromoRequest />,
  //     },
  //   ],
  // },
  {
    path: "earning",
    element: <AdminAllTransaction />,
    key: "earning",
    name: "Earning",
    icon: earningLogo,
  },
  {
    path: "reviews",
    element: <AdminReviews />,
    key: "reviews",
    name: "Reviews",
    icon: reviewLogo,
  },

  {
    path: "messages",
    element: <ConversationPage />,
    key: "messages",
    name: "Messages",
    icon: messageLogo,
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
];
