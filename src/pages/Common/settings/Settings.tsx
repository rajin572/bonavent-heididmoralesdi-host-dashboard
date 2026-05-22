import React from "react";
import ReusableTabs from "../../../ui/ReusableTabs";
import SecurityPage from "./SecurityPage";
import LocationSettings from "./LocationPage";

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState("upcoming");
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-bold mb-3">
          Bookings Management
        </h1>
        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-[#667085] mb-5">
          Track and manage all your vehicle bookings
        </h3>
      </div>

      <div className="mt-10">
        <ReusableTabs
          tabs={[
            {
              label: "Location",
              value: "upcoming",
              content: <LocationSettings />,
            },
            {
              label: "Security",
              value: "active",
              content: <SecurityPage />,
            },
          ]}
          align="left"
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="filled"
        />
      </div>
    </div>
  );
};

export default Settings;
