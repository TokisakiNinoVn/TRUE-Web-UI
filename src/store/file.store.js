import { defineStore } from 'pinia';
import { uploadFile, getFile } from '@/apis/modules/file.api';

export const useFileStore = defineStore('file', {
  state: () => ({
    files: [], // Lưu trữ danh sách file
    file: null, // Lưu trữ thông tin của một file cụ thể
    error: null, // Lưu trữ thông tin lỗi
    loading: false // Trạng thái tải dữ liệu
  }),
  actions: {
    // Hàm lấy thông tin file dựa trên ID
    async getFileAction(fileId) {
      this.loading = true;
      try {
        const response = await getFile(fileId);
        this.file = response.data; // Lưu thông tin file vào state
        return response.data || {};
      } catch (err) {
        // Xử lý lỗi nếu có
        this.error = err.response?.data?.message || 'Failed to get file information';
      } finally {
        this.loading = false;
      }
    },

    // Hàm upload file
    async uploadFileAction(formData) {
      this.loading = true;
      try {
        const response = await uploadFile(formData);
        this.files.push(response.data); // Thêm file vào danh sách files
        return response.data || {};
      } catch (err) {
        // Xử lý lỗi nếu có
        this.error = err.response?.data?.message || 'Failed to upload file';
      } finally {
        this.loading = false;
      }
    },
  },
});
