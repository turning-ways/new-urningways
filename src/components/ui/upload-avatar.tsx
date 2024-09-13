"use client";

import { FileUpload } from "./file-upload";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function UploadAvatar({
  image,
  setImage,
}: {
  image: string | null;
  setImage: Function;
}) {
  const removeImage = () => {
    setImage(null);
  };

  return (
    <>
      <div className="flex flex-col space-y-3 pt-4">
        <div className="px-8 space-y-3">
          <h2 className="text-xl font-medium">Your Avatar</h2>
          <p className="text-sm text-gray-500">
            This is your avatar image on turningways.
          </p>
          <div className="mt-1 flex justify-center">
            <FileUpload
              accept="images"
              className="h-24 w-24 rounded-full border border-gray-300"
              iconClassName="w-5 h-5"
              variant="plain"
              imageSrc={image}
              readFile
              onChange={({ src }) => setImage(src)}
              content={null}
              maxFileSizeMB={2}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between space-x-4 rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            Square image recommended. Accepted file types: .png, .jpg. Max file
            size: 2MB.
          </p>
          <div className="flex w-full mt-2">
            <button
              className="bg-main hover:bg-main_primary w-full py-2 rounded-md text-white"
              onClick={removeImage}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
