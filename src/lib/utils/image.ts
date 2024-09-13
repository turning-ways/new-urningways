import axios from "axios";

export function base64ToFile(
  base64String: string,
  fileName: string
): File | null {
  if (base64String === "") {
    return null;
  }

  if (typeof base64String !== "string") {
    throw new Error("Expected base64String to be a string");
  }
  try {
    // Remove the `data:image/jpeg;base64,` part if present
    const arr = base64String.split(",");

    // Check if the base64 header and the actual base64 string are separated
    if (arr.length !== 2) {
      throw new Error("Invalid base64 string");
    }

    // Extract the MIME type (optional)
    const matchResult = arr[0].match(/:(.*?);/);
    const mime = matchResult ? matchResult[1] : "application/octet-stream";

    // Convert base64 to binary string
    const bstr = atob(arr[1].replace(/\s/g, "")); // Remove any whitespace/newline characters
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // Convert the binary string to a Uint8Array
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Return the File object
    return new File([u8arr], fileName, { type: mime });
  } catch (error) {
    console.error("Failed to convert base64 to file:", error);
    throw error; // You can handle or rethrow this error depending on your needs
  }
}

export async function uploadImage(
  imageFile: File | null,
  nameAndPhone: string
): Promise<string> {
  if (!imageFile) {
    return "";
  }

  // get the signed preset from the server
  const {
    data: { signature, timestamp },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/signature?public_id=${nameAndPhone}`
  );

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "Profiles");
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("public_id", nameAndPhone);
  formData.append("api_key", `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`);

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return data.url;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error; // You can handle or rethrow this error depending on your needs
  }
}
