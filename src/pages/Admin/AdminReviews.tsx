import { FaRegStar, FaStar } from "react-icons/fa6";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import ReviewCard from "../../Components/Review/ReviewCard";
import { useState } from "react";
import { useGetReviewQuery, useGetReviewStatusQuery } from "../../redux/features/review/reviewApi";
import useUserData from "../../hooks/useUserData";
import { FaStarHalfAlt } from "react-icons/fa";
import { Pagination } from "antd";
import SpinLoader from "../../utils/SpinLoader";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        if (index + 1 <= rating)
          return <FaStar key={index} className="text-white size-5" />;
        if (index + 0.5 <= rating)
          return <FaStarHalfAlt key={index} className="text-white size-5" />;
        return <FaRegStar key={index} className="text-white size-5" />;
      })}
    </div>
  );
};

const AdminReviews = () => {
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const userData = useUserData();
  const { data, isFetching } = useGetReviewStatusQuery({ id: userData?.userId }, {
    skip: !userData?.userId,
    refetchOnMountOrArgChange: true
  });

  const ratings = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: data?.data?.rating?.[rating] ?? 0,
  }));
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);



  const { data: reviewData, isFetching: isReviewFetching } = useGetReviewQuery({ id: userData?.userId, page, limit, rating, searchTerm: search }, {
    skip: isFetching || !userData?.userId,
    refetchOnMountOrArgChange: true,
  });


  const allReviews: IRating[] = reviewData?.data?.data;
  const totalReviews = reviewData?.data?.meta?.total ?? 0;

  console.log(allReviews);



  return (
    <div>
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-bold mb-3">
            Reviews & Ratings
          </h1>
          <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-[#667085] mb-5">
            See what guests are saying about your vehicles
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <div
            style={{
              background: "linear-gradient(0deg, #4A5FD8 0%, #6078EA 100%)",
            }}
            className="p-8 rounded-2xl text-center text-primary-color"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              {data?.data?.hostInfo?.averageRating}
            </h2>

            <div className="flex flex-row items-center justify-center gap-1">
              <StarRating rating={Number(data?.data?.hostInfo?.averageRating)} />
            </div>

            <p className="text-xs sm:text-sm lg:text-base mt-4">{totalRatings} reviews</p>
          </div>
          <div className="space-y-6 bg-primary-color p-8 mt-10 rounded-2xl shadow">
            <h2 className="text-2xl font-bold">Rating Breakdown</h2>
            <div className="space-y-3">
              {ratings.map((rating) => {
                const percentage = (
                  (rating.count / totalRatings) *
                  100
                ).toFixed(1);

                return (
                  <div
                    key={rating.rating}
                    className="flex items-center space-x-4"
                  >
                    {/* Stars */}
                    <div className="flex  space-x-1 flex-row items-center justify-center w-10">
                      <span className="text-base">{rating.rating}</span>{" "}
                      <FaStar className="text-[#FB6514] size-5" />
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1 bg-gray-300 rounded-full h-2.5 w-[100%]">
                      <div
                        className="bg-secondary-color h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    {/* Rating Count */}
                    <span className="text-sm w-4">{rating.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-primary-color p-5 rounded-xl shadow flex flex-col md:flex-row md:justify-between items-center gap-5 mb-5">
            <div className="w-full">
              <ReuseSearchInput
                placeholder="Search reviews..."
                setSearch={(value) => setSearch(value)}
                setPage={(page) => setPage(page)}
              />
            </div>
            <ReuseSelect
              options={[
                {
                  label: "All Ratings",
                  value: "",
                },
                {
                  label: "1 Star",
                  value: "1",
                },
                {
                  label: "2 Stars",
                  value: "2",
                },
                {
                  label: "3 Stars",
                  value: "3",
                },
                {
                  label: "4 Stars",
                  value: "4",
                },
                {
                  label: "5 Stars",
                  value: "5",
                },
              ]}
              value="All"
              onChange={(value: string) => setRating(value)}
              placeholder="Ratings"
              name="ratings"
              wrapperClassName=" !w-fit !m-0 !p-0"
              selectClassName="!m-0 !p-0 min-w-[200px]"
              formClassName="!m-0 !p-0"
            />
          </div>
          {isReviewFetching ? <SpinLoader /> : allReviews?.map((r) => (
            <ReviewCard
              key={r?._id}
              review={r}
            />
          ))}

          <Pagination
            current={page}
            pageSize={limit}
            total={totalReviews}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
