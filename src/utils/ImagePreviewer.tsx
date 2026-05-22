/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { FaDownload } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { useLazyDownloadFileQuery } from "../redux/features/files/fileApi";

const ImagePreviewer = ({
  imageUrl,
  image,
  msg,
  userData,
  imgHeight,
}: {
  imageUrl: string;
  image: string;
  msg: any;
  userData: any;
  imgHeight?: number;
}) => {
  const [triggerDownload, { isFetching }] = useLazyDownloadFileQuery();
  if (!image) return null;

  const filePath = image.replace(/\\/g, "/");
  const fileUrl = `${imageUrl}${filePath}`;
  const isImage = /\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i.test(filePath);
  const getFileName = (path: string) => path.split("/").pop() || "download";

  const isSentByUser =
    msg?.sender?._id === userData?.userId ||
    msg?.sender?.toString() === userData?.userId;

  // const handleDownload = async (url: string, filename: string) => {
  //   setisFetching(true);
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) throw new Error("Failed to fetch file");
  //     const blob = await response.blob();
  //     saveAs(blob, filename);
  //     toast.success("File downloaded successfully");
  //   } catch (err) {
  //     console.error("Download failed", err);
  //     toast.error("Download failed. Please try again.");
  //   } finally {
  //     setisFetching(false);
  //   }
  // };
  const handleDownload = async (url: string, filename: string) => {
    try {
      const blob = await triggerDownload({ url }).unwrap();
      saveAs(blob, filename);
      toast.success("File downloaded successfully");
    } catch (err) {
      console.error("Download failed", err);
      toast.error("Download failed. Please try again.");
    }
  };

  return isImage ? (
    <PhotoProvider>
      <div
        className="relative group w-32"
        style={{ height: imgHeight ? `${imgHeight}px` : "auto" }}
      >
        <PhotoView src={fileUrl}>
          <img
            src={fileUrl}
            alt="Image"
            className={`cursor-pointer h-32 w-full object-cover object-top rounded-md border border-[#0F75BD] ${isSentByUser ? "order-last" : "order-first"
              }`}
          />
        </PhotoView>

        {/* Hover download button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(fileUrl, getFileName(filePath));
          }}
          disabled={isFetching}
          className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
        >
          {isFetching ? (
            <AiOutlineLoading3Quarters className="animate-spin text-sm" />
          ) : (
            <FaDownload className="text-sm" />
          )}
        </button>
      </div>
    </PhotoProvider>
  ) : (
    <div className="flex items-center gap-2 px-3 py-2 rounded text-white bg-secondary-color shadow max-w-xs text-sm">
      <span className="truncate max-w-[150px]">{getFileName(filePath)}</span>
      <button
        onClick={() => handleDownload(fileUrl, getFileName(filePath))}
        disabled={isFetching}
        className="focus:outline-none disabled:opacity-50 ml-auto"
      >
        {isFetching ? (
          <AiOutlineLoading3Quarters className="animate-spin text-[#ffffff99] text-base" />
        ) : (
          <FaDownload className="text-[#ffffff99] hover:text-white cursor-pointer text-base" />
        )}
      </button>
    </div>
  );
};

export default ImagePreviewer;