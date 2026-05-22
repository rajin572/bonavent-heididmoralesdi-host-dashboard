/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import VechiclesOverviewCards from "../../Components/Vehicles/VechiclesOverviewCards";
import VehiclesCard from "../../Components/Vehicles/VehiclesCard";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import AdminAddVehicleModal from "../../ui/Modal/AdminVehicle/AdminAddVehicleModal";
import ViewAdminVehicleModal from "../../ui/Modal/AdminVehicle/ViewAdminVehicleModal";
import AdminEditVehicleModal from "../../ui/Modal/AdminVehicle/AdminEditVehicleModal";
import { useGetVehicleQuery } from "../../redux/features/vehicle/vehicleApi";
import { IVehicleInformation } from "../../types/vehical.type";
import SpinLoader from "../../utils/SpinLoader";

const AdminVehicles = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetVehicleQuery({
    searchTerm: search,
  }, {
    refetchOnMountOrArgChange: true
  });

  const allVehicles: IVehicleInformation[] = data?.data?.data
  console.log(allVehicles);

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewModal = (record: any) => {
    setCurrentRecord(record);
    setViewModalVisible(true);
  };

  const showAddModal = () => {
    setAddModalVisible(true);
  };
  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setEditModalVisible(true);
  };

  const handleCancel = () => {
    setViewModalVisible(false);
    setAddModalVisible(false);
    setEditModalVisible(false);
    setCurrentRecord(null);
  };


  return (
    <div>
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-bold mb-3">
            Vehicles
          </h1>
          <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-[#667085] mb-5">
            Manage and monitor your vehicles
          </h3>
        </div>
        <ReuseButton
          onClick={showAddModal}
          variant="secondary"
          className="!w-fit"
        >
          Add Vehicle
        </ReuseButton>
      </div>
      <VechiclesOverviewCards />
      <div className="bg-primary-color p-5 rounded-xl shadow flex flex-col md:flex-row md:justify-between items-center gap-5 mt-10">
        <div className="w-full">
          <ReuseSearchInput
            placeholder="Search vehicles by name or plate number..."
            setSearch={(value) => { setSearch(value) }}
            setPage={() => { }}
          />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isFetching ? <div className="flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-3"><SpinLoader /></div> : allVehicles?.map((item: IVehicleInformation) => (
          <div className="mb-4" key={item?._id}>
            {" "}
            <VehiclesCard
              item={item}
              handleViewDetails={showViewModal}
              handleEdit={showEditModal}
            />
          </div>
        ))}
      </div>
      <AdminAddVehicleModal
        isAddModalVisible={addModalVisible}
        handleCancel={handleCancel}
      />
      <ViewAdminVehicleModal
        isViewModalVisible={viewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        showEditModal={showEditModal}
      />
      <AdminEditVehicleModal
        isAddModalVisible={editModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />

    </div>
  );
};

export default AdminVehicles;
