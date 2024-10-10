const { supabase } = require("../config/supabase");

const uploadFileToSupaBase = async (bucketName, filepath, file, token) => {
  const { originalname, buffer, mimetype } = file;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filepath, buffer, {
      contentType: mimetype,
      headers: { Authorization: `Bearer ${token}` },
    });
  if (error) {
    console.error(error.message);
    return null;
  }
  return data;
};

const downloadFile = async (bucketName, filepath) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .download(filepath);
  return { data, error };
};

const deleteFiles = async (bucketName, filepath) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filepath]);
  return { data, error };
};

module.exports = {
  uploadFileToSupaBase,
  downloadFile,
  deleteFiles,
};
