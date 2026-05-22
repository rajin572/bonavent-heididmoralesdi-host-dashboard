/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TransactionTable from "../../ui/Tables/TransactionTable";
import TransactionViewModal from "../../ui/Modal/Transactions/TransactionViewModal";
import EarningOverviewCards from "../../Components/Earning/EarningOverviewCards";
import EarningChartOverview from "../../Components/Earning/EarningChartOverview";
import EarningsPieChart from "../../Components/Chart/PieChart";
// import ReuseButton from "../../ui/Button/ReuseButton";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useGetEarningQuery, useGetEarningStatusQuery, useGetWithdrawQuery } from "../../redux/features/earning/earning";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import WithdrawTable from "../../ui/Tables/WithdrawTable";

const AdminAllTransaction = () => {
  const [option, setOption] = useState<"transactions" | "withdrawals">("transactions");

  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: earningStatus, isFetching } = useGetEarningStatusQuery({}, {
    refetchOnMountOrArgChange: true
  });

  const allStatus = earningStatus?.data

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);


  const { data: transaction, isFetching: isFetchingTransaction } = useGetEarningQuery({
    page,
    limit
  }, {
    skip: option !== "transactions",
    refetchOnMountOrArgChange: true
  })


  const allTransactions = transaction?.data?.result
  const totalTransactions = transaction?.data?.meta?.total


  const { data: withdraw, isFetching: isFetchingwithdraw } = useGetWithdrawQuery({
    page,
    limit
  }, {
    skip: option !== "withdrawals",
    refetchOnMountOrArgChange: true
  })


  const allwithdraws = withdraw?.data?.result
  const totalwithdraws = withdraw?.data?.meta?.total

  console.log(allwithdraws)

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2">
        <div className="mb-10">
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-bold mb-3">
            Earnings & Analytics
          </h1>
          <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-[#667085] ">
            Track your revenue and financial performance
          </h3>
        </div>
      </div>
      <EarningOverviewCards allStatus={allStatus} isFetching={isFetching} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <div className="lg:col-span-2">
          <EarningChartOverview />
        </div>
        <EarningsPieChart data={allStatus?.vehicleWiseEaringCurrentYear} />
      </div>

      {/* <div className="p-5 rounded-xl border border-gray-200 bg-primary-color space-y-2 my-10 shadow">
        <div className="flex justify-between items-center gap-5 w-full">
          <p className=" text-xs sm:text-sm lg:text-base font-bold text-gray-700">
            Payout Status
          </p>
          <p className=" bg-[#B9F8CF] text-[#008236] font-semibold text-xs px-2 py-1 rounded-md ">
            Active
          </p>
        </div>
        <div className="my-4">
          <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-500">
            Payout Status
          </p>
          <p className=" text-xs sm:text-sm lg:text-base font-semibold text-gray-700">
            Bank of America ****1234
          </p>
        </div>

        <ReuseButton
          variant="outline"
          onClick={() => router("/host/payment-methods")}
        >
          Edit Payment Method
        </ReuseButton>
      </div> */}

      <div className="p-5 rounded-xl border border-gray-200 bg-primary-color space-y-2 my-10 shadow">
        <Link to="https://www.usa.gov/taxes" target="_blank">
          <div className="flex justify-between items-center gap-5 w-full">
            <p className=" text-xs sm:text-sm lg:text-base font-bold text-gray-700">
              Tax Information
            </p>
            <MdOutlineKeyboardArrowRight className=" size-6 text-gray-700" />
          </div>
        </Link>
      </div>

      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <div className="mb-10 flex justify-between items-center gap-5">
          <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl  font-bold my-3">
            Transaction History
          </h1>
          <ReuseSelect
            options={[
              {
                label: "Transactions",
                value: "transactions",
              },
              {
                label: "Withdrawals",
                value: "withdrawals",
              },
            ]}
            value={option}
            onChange={(value) => setOption(value)}
            placeholder="Select Option"
            name="ratings"
            wrapperClassName=" !w-fit !m-0 !p-0"
            selectClassName="!m-0 !p-0 min-w-[200px]"
            formClassName="!m-0 !p-0"
          />
        </div>
        {
          option === "transactions" ? (
            <TransactionTable
              data={allTransactions}
              loading={isFetchingTransaction}
              showViewModal={showViewUserModal}
              setPage={setPage}
              page={page}
              total={totalTransactions}
              limit={limit}
            />
          ) : (
            <WithdrawTable
              data={allwithdraws}
              loading={isFetchingwithdraw}
              showViewModal={showViewUserModal}
              setPage={setPage}
              page={page}
              total={totalwithdraws}
              limit={limit}
            />
          )
        }

      </div>
      <TransactionViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        option={option}
      />
    </div>
  );
};

export default AdminAllTransaction;
