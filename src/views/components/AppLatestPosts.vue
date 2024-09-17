<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4"><ion-icon name="pencil-outline"></ion-icon>Mới nhất</h2>
    <div v-if="loading" class="text-gray-500">Đang tải...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div class="flex w-full flex-wrap" v-if="posts.length">
      <div v-for="post in posts" :key="post._id" class="one-item bg-white border border-gray-200 rounded-lg shadow-md mb-6 overflow-hidden max-w-[400px] mr-10 transition-transform transform hover:scale-105 hover:shadow-lg">
        <div class="relative w-full pb-[125%]">
          <img :src="getImageUrl(post.file[0]?.fileUrl)" alt="Post Image" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
          <p class="text-gray-700"><strong>Giá:</strong> {{ post.price }}</p>
          <p class="text-gray-500"><strong>Cập nhật:</strong> {{ new Date(post.updatedAt).toLocaleDateString() }}</p>
          <button @click="viewDetails(post._id)" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Xem Chi Tiết</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '@/store/post.store';
import instance from '@/apis/axiosConfig';

const postStore = usePostStore();
const router = useRouter();
const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const getImageUrl = (fileUrl) => {
  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
  if (!fileUrl) return instance.defaults.baseURL + '/uploads/images/posts/default.png';
  const isVideo = videoExtensions.some(ext => fileUrl.toLowerCase().endsWith(ext));
  if (isVideo) return instance.defaults.baseURL + '/uploads/images/posts/default.png';
  return instance.defaults.baseURL + fileUrl;
};


const loadLatestPosts = async () => {
  try {
    await postStore.getLatestPostsAction();
    posts.value = postStore.latestPosts;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch latest posts';
  } finally {
    loading.value = false;
  }
};

const viewDetails = (id) => {
  router.push({ name: 'PostDetails', params: { id } });
};

onMounted(loadLatestPosts);
</script>

<style scoped>

.one-item {
  width: 250px;
}
</style>
