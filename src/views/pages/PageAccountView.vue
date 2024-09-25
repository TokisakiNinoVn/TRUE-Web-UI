<template>
  <AppOwnerHeader />
  <AppHeader />
  <AppNavAccount />
  <div id="main" class="w-full min-h-screen flex items-center justify-center bg-gray-100">
    <div class="card bg-white w-full max-w-4xl p-6 rounded-lg shadow-md">
      <div class="top-card mb-4">
        <h1 class="text-3xl font-semibold text-gray-800">Hồ sơ của tôi</h1>
        <p class="text-gray-600 mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <form class="main-form flex flex-col space-y-4" @submit.prevent="handleSubmit">
        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div class="form-left w-full md:w-1/2">
            <table class="w-full">
              <tbody>
                <tr>
                  <td class="text-right pr-4 font-medium text-gray-700"><label for="username">Tên đăng nhập</label></td>
                  <td class="text-left font-semibold text-gray-900"><span>{{ username }}</span></td>
                </tr>
                <tr>
                  <td class="text-right pr-4 font-medium text-gray-700"><label for="phone">Số điện thoại</label></td>
                  <td class="text-left"><input class="border border-gray-300 rounded p-2 w-full" v-model="userInfo.phone" id="phone" type="text" /></td>
                </tr>
                <tr>
                  <td class="text-right pr-4 font-medium text-gray-700"><label for="address">Địa chỉ</label></td>
                  <td class="text-left font-semibold text-gray-900">
                    <span>{{ userInfo.address }}</span>
                    <button type="button" class="text-blue-500 hover:underline ml-2" @click="showAddressSelect">Thay đổi</button>
                  </td>
                </tr>
                <tr>
                  <td class="text-right pr-4 font-medium text-gray-700"><label for="email">Email</label></td>
                  <td class="text-left"><input class="border border-gray-300 rounded p-2 w-full" v-model="userInfo.email" id="email" type="email" /></td>
                </tr>
                <tr>
                  <td class="text-right pr-4 font-medium text-gray-700"><label>Giới tính</label></td>
                  <td class="text-left">
                    <div class="space-x-4">
                      <label class="inline-flex items-center">
                        <input type="radio" v-model="userInfo.gender" value="1" class="form-radio" />
                        <span class="ml-2">Nam</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input type="radio" v-model="userInfo.gender" value="0" class="form-radio" />
                        <span class="ml-2">Nữ</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input type="radio" v-model="userInfo.gender" value="other" class="form-radio" />
                        <span class="ml-2">Khác</span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-right pr-4 font-medium text-gray-700"><label for="birthday">Ngày sinh</label></td>
                  <td class="text-left"><span>{{ formattedBirthday }}</span></td>
                </tr>
              </tbody>
            </table>
            <div class="mt-4">
              <label class="font-medium text-gray-700" for="bio">Bio</label>
              <textarea class="border border-gray-300 rounded p-2 w-full mt-2" v-model="userInfo.bio" id="bio"></textarea>
            </div>
          </div>
          <div class="form-right flex flex-col items-center space-y-4 md:space-y-0 md:items-start">
            <img :src="userInfo.avatarUrl" alt="User Avatar" class="avatar w-24 h-24 rounded-full object-cover" />
            <input type="file" class="mt-2" @change="handleAvatarUpload" />
          </div>
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Lưu</button>
      </form>
      <div class="tool-account mt-4 flex space-x-4">
        <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" @click="logoutUser">Đăng xuất</button>
        <button class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" @click="deleteAccount">Xóa tài khoản</button>
      </div>
    </div>
  </div>
  <AppFooter />
  <AppToolbar />
  <AddressSelect v-if="showAddressSelectModal" @addressSelected="handleAddressSelected" @close="showAddressSelectModal = false" />
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';

import moment from 'moment';
import AppOwnerHeader from '@/views/components/AppOwnerHeader.vue';
import AppHeader from '@/views/components/AppHeader.vue';
import AppFooter from '@/views/components/AppFooter.vue';
import AppToolbar from '@/views/components/AppToolbar.vue';
import AppNavAccount from '@/views/components/AppNavAccount.vue';
import instance from '@/apis/axiosConfig';
import AddressSelect from '@/views/components/AppAddressSelect.vue';

const router = useRoute();
const username = router.params.username;
const { logoutUser } = useAuthStore();
const formattedBirthday = ref('');
const showAddressSelectModal = ref(false);
const userInfo = ref({
  username: '',
  phone: '',
  address: '',
  email: '',
  gender: '',
  birthday: '',
  avatarUrl: '',
  bio: ''
});

onMounted(() => {
  const accountInfo = localStorage.getItem('inforAccount');
  if (accountInfo) {
    const parsedAccount = JSON.parse(accountInfo);
    if (parsedAccount.username === username) {
      userInfo.value = { 
        ...parsedAccount.userInfor, 
        avatarUrl: `${instance.defaults.baseURL}${parsedAccount.userInfor.avatar.imageUrl}` 
      };
      formattedBirthday.value = moment(userInfo.value.birthday).format('DD/MM/YYYY');
    }
  }
});

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userInfo.value.avatarUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Format the birthday in the desired format
// const formatBirthday = () => {
//   const date = new Date(userInfo.value.birthday);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   userInfo.value.birthday = `${day}/${month}/${year}`;
// };

const showAddressSelect = () => {
  showAddressSelectModal.value = true; // Mở modal AddressSelect
};

const handleAddressSelected = (newAddress) => {
  userInfo.value.address = newAddress; // Cập nhật địa chỉ mới từ AddressSelect
  showAddressSelectModal.value = false; // Đóng modal sau khi chọn
};

const handleSubmit = () => {
  // Handle form submission logic here
  console.log('Thông tin đã được lưu:', userInfo.value);
};

// async function logout() {
//   const response = await logoutUser();
//   if (response.status === 'success') {
//     localStorage.removeItem('token');
//     localStorage.removeItem('loginInfor');
//     localStorage.setItem('isLoggedIn', 'false');
//     this.token = '';
//     this.user = null;
//     router.push('/');
//   } else {
//       alert(response.message);
//     }
// }

const deleteAccount = () => {
};

</script>


<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

input:focus, textarea:focus {
  outline: none;
}

#main {
  width: 100vw;
  min-height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  /* width: 900px;   */
  background-color: rgba(216, 216, 216, 0.651);
}

.column-1 {
  display: flex;
  justify-content: flex-end;
  width: 150px;
}
/* .column-2 {
  width: 700px !important;
} */

</style>
