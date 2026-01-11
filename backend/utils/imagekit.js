// ImageKit DISABLED for local development

const imagekit = null;

export const uploadToImageKit = async () => {
  throw new Error("ImageKit is disabled in local development");
};

export const deleteFromImageKit = async () => {
  return;
};

export const getImageKitAuthParams = () => {
  return null;
};

export default imagekit;
