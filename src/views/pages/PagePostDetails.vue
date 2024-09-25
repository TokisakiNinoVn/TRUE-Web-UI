<template>
  <div class="min-h-screen bg-gray-100">
    <AppOwnerHeader />
    <AppHeader />
    <main class="py-8">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center text-gray-900">Chi tiết</h2>

        <!-- Loading and Error States -->
        <div v-if="loading" class="text-xl text-center text-gray-500">Đang tải...</div>
        <div v-if="error" class="text-xl text-center text-red-500 mt-4">{{ error }}</div>

        <!-- Post Details -->
        <div v-if="post" class="bg-white shadow-lg rounded-lg p-6 flex">
          <!-- Image Column -->
          <div class="w-1/3 flex flex-col items-center">
            <div v-if="post.file.length" class="w-full">
              <h4 class="text-2xl font-semibold mb-4 text-gray-800">Hình ảnh và Video</h4>
              <div class="space-y-4">
                <div v-for="file in post.file" :key="file._id" class="flex flex-col items-center">
                  <!-- Image File -->
                  <div v-if="file.typefile === 'Images'" class="w-full mb-4">
                    <img :src="getFileUrl(file.fileUrl)" alt="Post Image" class="w-full h-auto rounded-lg shadow-lg" />
                  </div>
                  <!-- Video File -->
                  <div v-if="file.typefile === 'Videos'" class="w-full">
                    <video :src="getFileUrl(file.fileUrl)" controls class="w-full h-auto rounded-lg shadow-lg"></video>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Information Column -->
          <div class="w-2/3 pl-6 flex flex-col justify-start">
            <h3 class="text-3xl font-semibold mb-6 text-gray-800">{{ post.title }}</h3>
            <div class="space-y-4 mb-6">
              <p class="text-lg text-gray-700"><strong>Chủ sở hữu:</strong> {{ post.owner }}</p>
              <p class="text-lg text-gray-700"><strong>Diện tích:</strong> {{ post.acreage }} m²</p>
              <p class="text-lg text-gray-700"><strong>Giá:</strong> {{ post.price }}</p>
              <p class="text-lg text-gray-700"><strong>Người đăng:</strong> {{ post.author }}</p>
              <p class="text-lg text-gray-700"><strong>Địa chỉ:</strong> {{ post.address }}</p>
              <p class="text-lg text-gray-700"><strong>Địa chỉ chi tiết:</strong> {{ post.realaddress }}</p>
            </div>
            <div class="mb-8">
              <p class="text-lg text-gray-700"><strong>Mô tả:</strong></p>
              <p class="text-base text-gray-600 mt-2">{{ post.description }}</p>
            </div>
          </div>
        </div>

        <!-- Comments Section -->
        <div v-if="post" class="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h4 class="text-2xl font-semibold mb-4 text-gray-800">Bình luận</h4>
          <div v-if="comments.length" class="space-y-4">
            <div v-for="comment in comments" :key="comment.id" class="border-b pb-4 mb-4">
              <p class="text-base text-gray-800"><strong>{{ comment.author }}:</strong> {{ comment.content }}</p>
            </div>
          </div>
          <div v-else class="text-base text-gray-500">Chưa có bình luận nào.</div>

          <!-- Add Comment Input -->
          <div class="mt-6">
            <textarea v-model="newComment" rows="3" class="w-full border border-gray-300 rounded-lg p-2 text-gray-700" placeholder="Viết bình luận..."></textarea>
            <button @click="postComment" class="bg-blue-500 text-white px-4 py-2 rounded mt-4" :disabled="!newComment">Gửi bình luận</button>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
    <AppToolbar />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/store/post.store';
import instance from '@/apis/axiosConfig';

import AppHeader from '@/views/components/AppHeader.vue';
import AppFooter from '@/views/components/AppFooter.vue';
import AppOwnerHeader from '@/views/components/AppOwnerHeader.vue';
import AppToolbar from '@/views/components/AppToolbar.vue';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const post = ref(null);
const loading = ref(true);
const error = ref(null);
const comments = ref([]);
const newComment = ref('');

// Load post details
const loadPostDetails = async () => {
  try {
    await postStore.getPostDetailsById(route.params.id);
    post.value = postStore.postDetails;
    // Load existing comments (fake data for now, replace with actual API call) 
    comments.value = [
      { id: 1, author: 'Tokisaki Nino', content: 'Chỗ này bao uy tín, vừa rẻ vừa xịn' },
      { id: 2, author: 'NT Thùy Dung', content: 'Tạm được' },
    ];
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch post details';
  } finally {
    loading.value = false;
  }
};

// Get file URL
const getFileUrl = (fileUrl) => {
  if (!fileUrl) return instance.defaults.baseURL + '/uploads/images/posts/default.png';
  return instance.defaults.baseURL + fileUrl;
};

// Post a new comment
const postComment = () => {
  const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
  const accountInfo = JSON.parse(localStorage.getItem('inforAccount'));

  if (!loggedInStatus || !accountInfo) {
    router.push('/login');
    return;
  }

  // Simulate adding the new comment (replace with actual API call)
  const comment = {
    id: Date.now(),
    author: accountInfo.fullname,
    content: newComment.value,
  };
  comments.value.push(comment);
  newComment.value = ''; // Clear input after posting
};

onMounted(loadPostDetails);
</script>


<style scoped>
main {
  min-height: 100vh;
}

input:focus {
  outline: none;
}
</style>
