import instance from '@/apis/axiosConfig';

// Thêm bài đăng mới
const add = async (body) => instance.post('/auth/post/', body);

// Chỉnh sửa bài đăng theo ID
const update = async (id, body) => instance.patch(`/auth/post/${id}`, body);

// Lấy thông tin chi tiết bài đăng theo ID
const getDetailsById = async (id) => instance.get(`/public/post/details/${id}`);

// Lấy tất cả bài đăng
const getAll = async (params) => instance.get('/public/post/all', { params });

// Tìm kiếm bài đăng
const search = async (query) => instance.get('/public/post/search', { params: query });

// Lấy 10 bài đăng mới nhất
const getLatestPosts = async () => instance.get('/public/post/latest');

// Lấy 10 bài đăng có giá thấp nhất
const getLowestPricedPosts = async () => instance.get('/public/post/lowest-price');

export {
    add,
    update,
    getDetailsById,
    getAll,
    search,
    getLatestPosts,
    getLowestPricedPosts
};
