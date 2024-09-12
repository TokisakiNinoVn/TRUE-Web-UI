<template>
  <AppHeader />
  <AppNavAccount />

  <div id="main" class="w-full min-h-screen flex items-center justify-center">
    <div class="card bg-gray-200 w-[900px] flex flex-col p-6">
      <div class="top-card flex flex-col">
        <h1 class="text-2xl text-left font-semibold">Hồ sơ của tôi</h1>
        <span class="text-base text-left text-gray-600">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <form class="main-form flex flex-col mt-4 space-y-4" @submit.prevent="handleSubmit">
        <div class="main-forms flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div class="form-left ">
            <table class="w-full">
              <tr>
                <td class="column-1 text-right pr-2 font-medium"><label for="username">Tên đăng nhập</label></td>
                <td class="column-2 text-left font-semibold"><span>{{ username }}</span></td>
              </tr>
              <tr>
                <td class="column-1 text-right pr-2 font-medium"><label for="phone">Số điện thoại</label></td>
                <td class="column-2 text-left"><input class="border border-gray-300 rounded p-2 w-full" v-model="userInfo.phone" id="phone" type="text" /></td>
              </tr>
              <tr>
                <td class="column-1 text-right pr-2 font-medium"><label for="address">Địa chỉ</label></td>
                <td class="column-2 text-left"><input class="border border-gray-300 rounded p-2 w-full" v-model="userInfo.address" id="address" type="text" /></td>
              </tr>
              <tr>
                <td class="column-1 text-right pr-2 font-medium"><label for="email">Email</label></td>
                <td class="column-2 text-left"><input class="border border-gray-300 rounded p-2 w-full" v-model="userInfo.email" id="email" type="email" /></td>
              </tr>
              <tr>
                <td class="column-1 text-right pr-2 font-medium"><label>Giới tính</label></td>
                <td class="column-2">
                  <div class="space-x-2">
                    <label class="inline-flex items-center space-x-1">
                      <input type="radio" v-model="userInfo.gender" value="1" />
                      <span>Nam</span>
                    </label>
                    <label class="inline-flex items-center space-x-1">
                      <input type="radio" v-model="userInfo.gender" value="0" />
                      <span>Nữ</span>
                    </label>
                    <label class="inline-flex items-center space-x-1">
                      <input type="radio" v-model="userInfo.gender" value="other" />
                      <span>Khác</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="column-1 text-right pr-2 font-medium"><label for="birthday">Ngày sinh</label></td>
                <td class="column-2 text-left"><input class="border border-gray-300 rounded p-2 w-full" v-model="userInfo.birthday" id="birthday" type="date" @change="formatBirthday" /></td>
              </tr>
            </table>

            <div class="mt-4">
              <label class="font-medium" for="bio">Bio</label>
              <textarea class="border border-gray-300 rounded p-2 w-full mt-2" v-model="userInfo.bio" id="bio"></textarea>
            </div>
          </div>
          <div class="form-right flex flex-col justify-center pl-4">
            <img :src="userInfo.avatarUrl" alt="User Avatar" class="avatar w-[100px] h-[100px] rounded-full object-cover mb-4" />
            <input type="file" class="mt-2" @change="handleAvatarUpload" />
          </div>
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Lưu</button>
      </form>
      <div class="tool-account mt-4 space-x-4">
        <button class="btn-tool-account bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" @click="logout">Đăng xuất</button>
        <button class="btn-tool-account bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" @click="deleteAccount">Xóa tài khoản</button>
      </div>
    </div>
  </div>
  <AppFooter />
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/views/components/AppHeader.vue';
import AppFooter from '@/views/components/AppFooter.vue';
import AppNavAccount from '@/views/components/AppNavAccount.vue';

const route = useRoute();
const username = route.params.username;

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
      userInfo.value = { ...parsedAccount.userInfor, avatarUrl: parsedAccount.userInfor.avatar };
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
const formatBirthday = () => {
  const date = new Date(userInfo.value.birthday);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  userInfo.value.birthday = `${day}/${month}/${year}`;
};

const handleSubmit = () => {
  // Handle form submission logic here
  console.log('Thông tin đã được lưu:', userInfo.value);
};

const logout = () => {
  // Handle logout logic here
};

const deleteAccount = () => {
  // Handle account deletion logic here
};

</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

input:focus {
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
  width: 700px;
  background-color: rgba(216, 216, 216, 0.651);
}

.column-1 {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  width: 150px;
}
/* .column-2 {
  width: 700px !important;
} */

</style>
