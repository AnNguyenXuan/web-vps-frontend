import api, { handleError } from "./Api";

const s3Api = {

  /**
   * Kiểm tra user hiện tại đã có tài khoản S3 hay chưa
   * @returns {Promise<{exists: boolean}>}
   */
  checkStatus: async () => {
    try {
      const response = await api.get("/s3/status");
      console.log("Kết quả API:", response);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * @param {{placement: "hdd"|"ssd"}} payload
   * @returns {Promise<{
   *   version:number, access_key:string,
   *   secret_key:string, default_placement:"hdd"|"ssd",
   * }>}
   */
  generateKeyRequest: async (payload) => {
    try {
      const res = await api.post("/s3/generate-key", payload); // gửi JSON body
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },


  /**
   * Import file key (.json) để liên kết với dịch vụ S3 hiện có
   * Hỗ trợ 2 biến thể field:
   *  - endpoint, access_key, secret_key
   *  - endpoint, access_key_id, secret_access_key
   * @param {File|Blob} file - Tệp .json
   * @returns {Promise<{
   *  success: boolean,
   *  message?: string,
   *  normalized?: { access_key: string, secret_key: string, default_placement: string }
   * }>}
   */

  importKeys: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/s3/import-keys", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Liệt kê danh sách bucket của user
   * @returns {Promise<Array<{
   *  name: string,
   *  object_count: number,
   *  size_bytes: number,
   *  created_at: string | null,
   *  owner: string | null
   * }>>}
   */
  listBuckets: async () => {
    try {
      const response = await api.get("/s3/buckets");
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

export default s3Api;
