import React from "react";
import { StarFilled } from "@ant-design/icons";
import { getImageUrl } from "../../helpers/config/envConfig";

interface ReviewCardProps {
  review: IRating;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const serverUrl = getImageUrl();
  console.log(review);
  // ✅ Get name
  const name = review?.rater?.fullName || "Unknown User";

  // ✅ Get initials
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  // ✅ Rating number
  const rating = review?.rating || 0;

  // ✅ Format date
  const datePosted = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Optional placeholders
  const car = `Vehicle: ${review.tripId?.vehicleId?.vehicleName} - ${review.tripId?.vehicleId?.vehicleModel}`;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-5">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          {review?.rater?.profileImage?.length > 1 ? (
            <img src={serverUrl + review?.rater?.profileImage} alt="" className="w-12 h-12 object-cover rounded-full" />
          ) : (
            <div className="flex items-center justify-center bg-blue-600 text-white font-bold rounded-full h-12 w-12">
              {initials}
            </div>
          )}

          {/* User Info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-base text-[#1A202C]">{name}</h3>

            <span className="text-sm text-[#718096] font-medium mt-1">{car}</span>

          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mt-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <StarFilled
                key={i}
                className={
                  i < rating
                    ? "!text-[#FB6514] text-xl"
                    : "text-gray-300! text-xl"
                }
              />
            ))}
          </div>

          <span className="text-sm text-[#718096] font-semibold">
            • {datePosted}
          </span>
        </div>

        {/* Review Text */}
        <p className="mt-3 text-gray-800 text-base font-semibold">
          {review.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
