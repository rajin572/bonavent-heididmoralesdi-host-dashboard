import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const PaymentStatusPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Payout Status</h2>
          <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Active
          </span>
        </div>

        <div className="">
          <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 -mx-3 rounded transition-colors">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Payment Methods
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Manage cards and bank accounts
              </p>
            </div>
            <Link to="/host/payment-methods">
              <BiChevronRight className="text-gray-400" size={24} />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Payout Schedule
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          You'll receive payouts every 15 days. Next payout scheduled for
          October 30, 2025.
        </p>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900">
                Pending Balance
              </span>
              <span className="text-lg font-bold text-gray-900">$1,250</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900">
                Total Paid Out (2025)
              </span>
              <span className="text-lg font-bold text-gray-900">$27,250</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
