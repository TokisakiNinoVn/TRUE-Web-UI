import instance from '@/apis/axiosConfig';

// Hàm upload file
const uploadFile = async (formData) => instance.post('/auth/file/upload',
    formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
});


const getFile = async (fileId) =>  instance.get(`/public/file/${fileId}`);

export {
  uploadFile,
  getFile
};
