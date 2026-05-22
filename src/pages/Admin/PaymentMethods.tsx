import { Button, Radio, Typography } from "antd";
import ReuseButton from "../../ui/Button/ReuseButton";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const PaymentMethods = () => {
  const [selected, setSelected] = useState(1);

  const paymentMethods = [
    {
      id: 1,
      name: "MASTERCARD",
      subText: "Update card",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
      isDefault: true,
    },
    {
      id: 2,
      name: "VISA CARD",
      subText: "xxxxxxxxxx1245",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
    },
    {
      id: 3,
      name: "APPLE PAY",
      subText: "Update",
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
  ];

  const handleSelect = (id: number) => setSelected(id);
  const handleDelete = (id: number) => alert(`Delete payment method ${id}`);

  return (
    <div className="p-4 min-h-screen">
      <div className="mb-10 py-4 px-5 border border-gray-200 rounded-xl bg-white ">
        <Link to="/host/payment-methods/add">
          <ReuseButton variant="secondary">
            + Add New Payment Method
          </ReuseButton>
        </Link>
      </div>
      <div className="space-y-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="!p-6 flex items-center justify-between rounded-xl shadow-sm border border-gray-100 !w-full bg-primary-color"
          >
            <div className="flex items-center space-x-4">
              <img
                src={method.icon}
                alt={method.name}
                className="w-10 h-10 rounded-md object-contain"
              />
              <div>
                <p className="font-semibold text-gray-900">{method.name}</p>
                <Typography.Text
                  className={`text-sm  mt-1${method.subText.includes("xxxx")
                      ? "text-blue-600"
                      : "text-blue-500 cursor-pointer"
                    }`}
                >
                  {method.subText}
                </Typography.Text>
                {method.isDefault && (
                  <p className=" bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded w-fit mt-1">
                    Default
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Radio
                checked={selected === method.id}
                onChange={() => handleSelect(method.id)}
              />
              <Button
                type="text"
                icon={<MdDelete className="!text-red-500 !text-xl" />}
                onClick={() => handleDelete(method.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="text-sm text-gray-500">
          <div className="my-7 bg-[#EFF6FF] p-3 rounded-lg flex items-center-safe gap-5 ">
            <IoCheckmarkCircle className="text-2xl text-secondary-color" />
            <div>
              <p className="text-xs sm:text-sm lg:text-base font-bold  text-[#1D2939]">
                Secure Payment Processing:
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                Your payment information is encrypted and secure. We never store
                your full card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
