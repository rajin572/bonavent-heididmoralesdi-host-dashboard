import EditProfile from "../Components/Dashboard/Profile/EditProfile";
import Settings from "../pages/Common/settings/Settings";

//* ------------------ICONS------------------
import profileLogo from "/images/dashboard-logo/profile.svg";
import settingLogo from "/images/dashboard-logo/setting.svg";

export const commonPaths = [
  {
    path: "profile",
    element: <EditProfile />,
    key: "profile",
    name: "Profile",
    icon: profileLogo,
  },
  {
    key: "setting",
    name: "Setting",
    icon: settingLogo,
    path: "setting",
    element: <Settings />,
  },
];
