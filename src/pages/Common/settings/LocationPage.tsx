"use client";
import { useEffect, useState } from "react";
import { Form, Switch } from "antd";
import ReusableForm from "../../../ui/Form/ReuseForm";
import ReuseButton from "../../../ui/Button/ReuseButton";
import SearchableMapComponent, { Location } from "../../../Components/Shared/SearchableMapComponent";
import { toast } from "sonner";
import { useGetLocationQuery, useUpdateLocationMutation } from "../../../redux/features/profile/profileApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import useUserData from "../../../hooks/useUserData";
import SpinLoader from "../../../utils/SpinLoader";

// ──────────────────────────────────────────────────────────────
//  Default values (you can pull them from API later)

export default function LocationSettings() {
  const userData = useUserData();
  const { data: locationData, isFetching: locationFetching } = useGetLocationQuery({
    id: userData?.userId
  }, {
    skip: !userData,
    refetchOnMountOrArgChange: true
  });



  const coordinates = locationData?.data?.location?.deliveryOrHomeAddress

  console.log()




  const [updateLocation] = useUpdateLocationMutation();
  const [form] = Form.useForm();
  const [offerDelivery, setOfferDelivery] = useState(
    false
  );


  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: null, // Los Angeles, CA
    lng: null,
    address: null,
  });



  useEffect(() => {
    if (coordinates) {
      setCurrentLocation({
        lat: coordinates?.location.coordinates[1],
        lng: coordinates?.location.coordinates[0],
        address: coordinates?.address,
      });
    }
    if (locationData?.data?.location?.isOfferDeliveryAddressActive) {
      form.setFieldValue("offerDelivery", true);
    }
  }, [coordinates, locationData]);

  const onFinish = async () => {

    if (currentLocation?.lat && currentLocation?.lng && currentLocation?.address) {

      const data = {
        isOfferDeliveryAddressActive: offerDelivery,
        deliveryOrHomeAddress: {
          address: currentLocation?.address || "",
          location: {
            type: "Point",
            coordinates: [
              currentLocation?.lng || 0,
              currentLocation?.lat || 0
            ]
          }
        }
      };

      const res = await tryCatchWrapper(
        updateLocation,
        { body: data },
        {
          toastLoadingMessage: "Updating Location...",
          toastSuccessMessage: "Location Updated Successfully!",
          toastErrorMessage: "Failed to update location. Please try again later.",
        }
      );

      if (res?.statusCode === 200) {
        form.resetFields();
        setCurrentLocation({ lat: null, lng: null, address: null });
      }
    }
    else {
      toast.error("Please select a location");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
      <div className="">
        {/* ───── Header ───── */}
        <h1 className="text-xl font-bold text-gray-900 mb-10">
          Default Pickup Location
        </h1>

        {/* ───── Form ───── */}
        {
          locationFetching ? (
            <div className="flex items-center justify-center h-[300px]">
              <SpinLoader />
            </div>
          ) : <ReusableForm
            form={form}
            handleFinish={onFinish}
            className="bg-white rounded-xl  p-6 space-y-6"
          >
            <SearchableMapComponent
              location={currentLocation}
              setLocation={setCurrentLocation}
            />

            {/* ── Divider ── */}
            <hr className="border-gray-200" />

            {/* ── Offer Delivery Toggle ── */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Offer Delivery
                </h3>
                <p className="text-sm text-gray-600">
                  Allow guests to request vehicle delivery
                </p>
              </div>

              <Form.Item name="offerDelivery" valuePropName="checked" noStyle>
                <Switch
                  checked={offerDelivery}
                  onChange={(v) => setOfferDelivery(v)}
                  className="bg-indigo-600"
                />
              </Form.Item>
            </div>

            {/* ── Submit Button ── */}
            <div className="pt-4">
              <ReuseButton htmlType="submit" variant="secondary">Save Location</ReuseButton>
            </div>
          </ReusableForm>
        }

      </div>
    </div >
  );
}
