/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { BsSafe2 } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { FaCircle, FaStar } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { PiCellSignalFullBold } from "react-icons/pi";
// import Testimonial from "../../Testimonial";

interface ViewActivityModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}
const ViewActivityModal: React.FC<ViewActivityModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[90%]"
    >
      <div className="p-2">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color">
            Activity Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-integralcf font-bold">
                Beginner Surf Lessons
              </h1>
              <div className="flex justify-between items-center gap-2 mt-8">
                <div className="flex items-center gap-1">
                  <MdLocationPin className="text-2xl text-[#667085]" />
                  <span className="font-semibold text-base sm:text-lg lg:text-xl text-[#667085]">
                    New York, New York
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-2xl text-[#FFC700]" />
                  <span className="font-semibold text-base sm:text-lg lg:text-xl text-[#667085]">
                    4.5(20)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-start items-center gap-2 ">
              {/* Avatar */}
              <img
                src={AllImages.cover}
                alt={currentRecord?.name}
                className="w-auto h-60 object-cover rounded"
              />
              <img
                src={AllImages.cover}
                alt={currentRecord?.name}
                className="w-auto h-60 object-cover rounded"
              />
              <img
                src={AllImages.cover}
                alt={currentRecord?.name}
                className="w-auto h-60 object-cover rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
            <div className="flex flex-col gap-8">
              {/* About the Activity */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  About the Activity
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-base-color mt-5">
                  Experience the stunning Sydney coastline from a unique
                  perspective with our guided kayaking tour. Perfect for
                  beginners and intermediate paddlers.
                </p>
              </div>
              {/* Here’s the thing that are available: */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  Here’s the thing that are available:{" "}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 mt-5">
                  <div className="flex items-center gap-2">
                    <BsSafe2 className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Locker
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsSafe2 className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Locker
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsSafe2 className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Locker
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsSafe2 className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Locker
                    </span>
                  </div>
                </div>
              </div>
              {/* What’s Included: */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  What's Included:
                </h3>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Professional instructor
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Professional instructor
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Professional instructor
                    </span>
                  </div>
                </div>
              </div>
              {/* Group capacity: */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  Group capacity:
                </h3>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex items-center gap-2">
                    <LuUsers className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Max 25+ members group size
                    </span>
                  </div>
                </div>
              </div>
              {/* Location: */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  Location:
                </h3>
                <div className="flex flex-col gap-3 mt-5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29208.80556098383!2d90.406912!3d23.77942835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72f05cbe08d%3A0x813b8f01a01d464e!2sPublic%20Order%20Management!5e0!3m2!1sen!2sbd!4v1757583896442!5m2!1sen!2sbd"
                    width="600"
                    height="300"
                    loading="lazy"
                  ></iframe>

                  <div className="flex items-center gap-2">
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Manly Wharf, East Esplanade, Manly NSW 2095
                    </span>
                  </div>
                </div>
              </div>
              {/* About your host */}
              {/* <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  About your host:
                </h3>
                <div className="flex flex-col gap-3 mt-5">
                  <Testimonial />
                </div>
              </div> */}
            </div>
            <div>
              {/* About this Experiences */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  About this Experiences
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-base-color mt-5">
                  Join us for an unforgettable 3-hour kayaking adventure along
                  Sydney's stunning coastline. Our experienced guides will lead
                  you through the crystal-clear waters of Manly Cove, sharing
                  local knowledge and ensuring your safety throughout the
                  journey. Perfect for both beginners and intermediate paddlers,
                  this tour combines adventure, nature, and exercise.
                </p>
              </div>
              <div>
                <div className="flex flex-col gap-2 mt-5">
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Professional certified instructor
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Professional certified instructor
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Professional certified instructor
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Professional certified instructor
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 mt-5">
                  <div className="flex items-center gap-2">
                    <FaCircle className="text-base-color text-xs " />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Swimwear and quick-dry clothing
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCircle className="text-base-color text-xs " />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Swimwear and quick-dry clothing
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCircle className="text-base-color text-xs " />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Swimwear and quick-dry clothing
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCircle className="text-base-color text-xs " />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Swimwear and quick-dry clothing
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 mt-5">
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      All participants must be able to swim
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      All participants must be able to swim
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      All participants must be able to swim
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      All participants must be able to swim
                    </span>
                  </div>
                </div>
              </div>
              {/* Do's: */}
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  Do's:
                </h3>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Follow instructor's guidance
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Follow instructor's guidance
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Follow instructor's guidance
                    </span>
                  </div>
                </div>
              </div>
              {/* Don'ts: */}
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  Don'ts:
                </h3>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      No alcohol before or during activitys
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      No alcohol before or during activitys
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkSharp className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      No alcohol before or during activitys
                    </span>
                  </div>
                </div>
              </div>
              {/* Skills level required */}
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  Skills level required:
                </h3>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex items-center gap-2">
                    <PiCellSignalFullBold className="text-base-color text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Advanced/Pro
                    </span>
                  </div>
                </div>
              </div>
              {/* Location: */}
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
                  Location:
                </h3>
                <div className="flex flex-col gap-3 mt-5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29208.80556098383!2d90.406912!3d23.77942835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72f05cbe08d%3A0x813b8f01a01d464e!2sPublic%20Order%20Management!5e0!3m2!1sen!2sbd!4v1757583896442!5m2!1sen!2sbd"
                    width="600"
                    height="300"
                    loading="lazy"
                  ></iframe>

                  <div className="flex items-center gap-2">
                    <span className="text-base-color text-sm sm:text-base lg:text-lg">
                      Manly Wharf, East Esplanade, Manly NSW 2095
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewActivityModal;
