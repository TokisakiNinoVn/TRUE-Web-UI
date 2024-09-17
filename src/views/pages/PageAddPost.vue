<template>
    <AppOwnerHeader />
    <AppHeader />
    <main class="main-content">
      <div class="container mx-auto p-6 max-w-4xl">
        <h1 class="text-3xl font-bold mb-6 text-center">Thêm mới</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Cột 1: Thông tin bài đăng -->
            <div class="space-y-6">
              <!-- Tiêu đề -->
              <div class="flex flex-col">
                <label for="title" class="text-lg font-medium text-gray-900">Tiêu đề</label>
                <input
                  v-model="post.title"
                  id="title"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              
  
              <!-- Mô tả -->
              <div class="flex flex-col">
                <label for="description" class="text-lg font-medium text-gray-900">Mô tả</label>
                <textarea
                  v-model="post.description"
                  id="description"
                  rows="4"
                  required
                  class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
  
              <!-- Địa chỉ -->
              <div class="flex flex-col">
                <label for="address" class="text-lg font-medium text-gray-900">Địa chỉ</label>
                <input
                  v-model="post.address"
                  id="address"
                  type="text"
                  readonly
                  class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 cursor-not-allowed bg-gray-100"
                  @click="showAddressSelectModal = true"
                />
              </div>

              <!-- Loại phòng -->
              <div class="flex flex-col">
                <label class="text-lg font-medium text-gray-900">Loại phòng</label>
                <div class="flex space-x-6">
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="post.typeroom"
                      type="radio"
                      value="0"
                      class="text-blue-500 focus:ring-blue-500"
                    />
                    <span>Phòng trọ</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="post.typeroom"
                      type="radio"
                      value="1"
                      class="text-blue-500 focus:ring-blue-500"
                    />
                    <span>Căn hộ</span>
                  </label>
                </div>
              </div>
  
            </div>
  
            <!-- Cột 2: Ảnh và Video -->
            <div class="flex flex-col">
                <!-- Chủ -->
              <div class="flex flex-col">
                <label for="owner" class="text-lg font-medium text-gray-900">Chủ</label>
                <input
                  v-model="post.owner"
                  id="owner"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <!-- Diện tích -->
              <div class="flex flex-col">
                <label for="acreage" class="text-lg font-medium text-gray-900">Diện tích (m²)</label>
                <input
                  v-model.number="post.acreage"
                  id="acreage"
                  type="number"
                  min="1"
                  required
                  class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
               <!-- Địa chỉ chi tiết -->
               <div class="flex flex-col">
                <label for="realaddress" class="text-lg font-medium text-gray-900">Địa chỉ chi tiết</label>
                <input
                  v-model="post.realaddress"
                  id="realaddress"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <!-- Giá -->
              <div class="flex flex-col">
                <label for="price" class="text-lg font-medium text-gray-900">Giá (VND)</label>
                <input
                  v-model.number="post.price"
                  id="price"
                  type="number"
                  min="0"
                  required
                  class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <label for="files" class="text-lg font-medium text-gray-900">Ảnh hoặc Video</label>
            <input
              id="files"
              type="file"
              multiple
              @change="handleFileChange"
              class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 cursor-pointer"
            />
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div v-for="(preview, index) in filePreviews" :key="index" class="flex flex-col items-center">
                <img v-if="preview.type.startsWith('image')" :src="preview.url" class="w-32 h-32 object-cover rounded" />
                <video v-if="preview.type.startsWith('video')" :src="preview.url" class="w-32 h-32 object-cover rounded" controls />
              </div>
            </div>
          </div>
  
          <!-- Nút gửi -->
          <button
            type="submit"
            class="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Thêm Bài Đăng
          </button>
        </form>
      </div>
    </main>
    <AppFooter />
    <AppToolbar />
    <AddressSelect
      v-if="showAddressSelectModal"
      @complete="handleAddressSelected"
      @close="showAddressSelectModal = false"
    />
  </template>
  
<script setup>
import AppHeader from '@/views/components/AppHeader.vue';
import AppFooter from '@/views/components/AppFooter.vue';
import AppOwnerHeader from '@/views/components/AppOwnerHeader.vue';
import AppToolbar from '@/views/components/AppToolbar.vue';
import AddressSelect from '@/views/components/AddressSelect.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '@/store/post.store';
import { useFileStore } from '@/store/file.store';

const fileStore = useFileStore();
const router = useRouter();
const postStore = usePostStore();
const showAddressSelectModal = ref(false);
const post = ref({
  author: '',
  owner: '',
  title: '',
  description: '',
  address: '',
  realaddress: '',
  acreage: 0,
  typeroom: 0,
  price: 0,
  file: [] 
});
const filePreviews = ref([]); 

const handleFileChange = (event) => {
  const files = event.target.files;
  filePreviews.value = Array.from(files).map(file => {
    return {
      file,
      url: URL.createObjectURL(file),
      type: file.type
    };
  });
};


const handleAddressSelected = (address) => {
  post.value.address = `${address.province} - ${address.district} - ${address.commune}`;
  showAddressSelectModal.value = false;
};

const handleSubmit = async () => {
    try {

        const filePromises = filePreviews.value.map(filePreview => {
        const formData = new FormData();
        formData.append('file', filePreview.file);
        return fileStore.uploadFileAction(formData);
        });

        const fileResponses = await Promise.all(filePromises);

        post.value.file = fileResponses.flatMap(response => {
        if (Array.isArray(response)) {
            return response.map(file => file.$oid);
        } else if (response && response.$oid) {
            return [response.$oid];
        } else {
            return []; 
        }
        });

        await postStore.addPostAction(post.value);
        alert('Bài đăng đã được thêm thành công!');
        router.push('/');
    } catch (error) {
        alert('Đã xảy ra lỗi khi thêm bài đăng.');
        console.error(error);
    }
};

const updateAuthor = () => {
  const loginInfo = JSON.parse(localStorage.getItem('loginInfor'));
  if (loginInfo && loginInfo.username) {
    post.value.author = loginInfo.username;
  }
};

updateAuthor();
</script>

<style scoped>
input:focus, textarea:focus {
  outline: none;
}
</style>