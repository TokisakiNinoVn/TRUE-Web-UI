<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-900">Đăng ký tài khoản</h1>
      <form @submit.prevent="handleSignup">
        <div class="mb-5">
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
          <input v-model="username" type="text" id="username" required 
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" />
        </div>
        <div class="mb-5">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Tạo mật khẩu</label>
          <input v-model="password" type="password" id="password" required 
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Nhập lại mật khẩu</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" required 
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" />
        </div>
        <button type="submit" 
          class="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
          Đăng ký
        </button>
      </form>

      <p class="mt-4 text-center text-gray-600">Nếu đã có tài khoản hãy 
        <router-link to="/login" class="text-indigo-600 hover:underline">Đăng nhập</router-link>
      </p>
      <p class="mt-4 text-center">
        <router-link to="/" class="text-indigo-600 hover:underline flex items-center justify-center">
          Trang chủ
          <ion-icon name="planet-outline" class="ml-2"></ion-icon>
        </router-link>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/state/auth.state';

const username = ref('');
const password = ref('');
const confirmPassword = ref(''); // Thêm trường xác nhận mật khẩu
const router = useRouter();
const authStore = useAuthStore();

const handleSignup = async () => {
  if (username.value == "" || password.value =="" || confirmPassword.value=="") {
    alert('Các trường không được để trống');
    return;
  }
  if (username.value !== username.value.toLowerCase()) {
    alert('Tên đăng nhập phải viết thường.');
    return;
  }
  if (username.value.length < 8) {
    alert('Tên đăng nhập phải có hơn 8 ký tự!');
    return;
  }
  if (username.value.length < 5) {
    alert('Tên đăng nhập phải có ít nhất 5 ký tự.');
    return;
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password.value)) {
    alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('Mật khẩu và xác nhận mật khẩu không khớp. Vui lòng thử lại.');
    return;
  }

  try {
    const response = await authStore.signupUser({
      username: username.value,
      password: password.value,
    });

    if (response.status === "success") {
      alert(response.message || 'Tạo tài khoản thành công! Vui lòng đăng nhập.');
      router.push('/login');
    }
  } catch (error) {
    console.error('Signup failed:', error);
    alert('Đăng ký thất bại. Vui lòng thử lại.');
  }
};

</script>
