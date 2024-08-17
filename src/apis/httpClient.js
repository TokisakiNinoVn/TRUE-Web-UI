// import axios from "axios";
// import { useAuthStore } from "@/store/auth.store";
// import packageJson  from "../../package.json";
// import { useAppStore } from '@/store/app.store';

// const MEDIA_SERVER = import.meta.env.VITE_MEDIA_SERVER;
// const SOCKET_SERVER = import.meta.env.VITE_SOCKET_SERVER;
// export {
//   MEDIA_SERVER,
//   SOCKET_SERVER
// }

// // Nên cấu hình để switch tự động giữa hai môi trường dev và prod
// const baseURL = import.meta.env.VITE_API_BASE_URL;

// const httpClient = axios.create({
//   baseURL,
//   headers: {
//     devicetype: "WEB",
//     deviceinfo: navigator.userAgent,
//   },
// });

// // middlewares xử lý trước khi gửi request
// httpClient.interceptors.request.use(
//   function (config) {
//     const accessToken = localStorage.getItem("accessToken") || "";
//     config = {
//       ...config,
//       headers: { Authorization: `Bearer ${accessToken}`, "app-version": `${packageJson?.versionCode || 0}` }
//     }
//     return config;
//   },
//   function (error) {
//     console.log(error);
//     throw error;
// })

// // middlewares xử lý ngay khi nhận được response
// httpClient.interceptors.response.use(
//   function (response) {
//     const responseDefault = {
//       message: "Lỗi máy chủ không trả dữ liệu hoặc cấu trúc trả về không đúng quy ước.",
//       data: {}
//     }
//     const {data = responseDefault} = response;
//     return data;
//   },
//   function(error) {
//     const { response } = error;
//     //  Unauthorized Error (status: 401)
//     if (response && response.status === 401) {
//       // show alert cảnh bảo
//       const { showUnauthorizedAlert} = useAppStore();
//       showUnauthorizedAlert(response?.data?.message || "Mã token không hợp lệ. Hãy đăng nhập lại để tiếp tục")
//       // Redirect to login page
//       const { logOutAction } = useAuthStore();
//       logOutAction();
//     } else {
//       throw response?.data || "Unknow Error";
//     }
//   }
// );

// export default httpClient;
