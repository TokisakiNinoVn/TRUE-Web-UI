import { defineStore } from 'pinia';
import { 
    add,
    update,
    getDetailsById,
    getAll,
    search,
    getLatestPosts,
    getLowestPricedPosts
} from '@/apis/modules/post.api';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    postDetails: null,
    latestPosts: [],
    lowestPricedPosts: [],
    error: null,
    loading: false
  }),
  actions: {
    async addPostAction(body) {
      this.loading = true;
      try {
        const response = await add(body);
        return response?.data || [];
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to add post';
      } finally {
        this.loading = false;
      }
    },

    async updatePostAction(id, body) {
      this.loading = true;
      try {
        const response = await update(id, body);
        return response?.data || [];
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update post';
      } finally {
        this.loading = false;
      }
    },

    async getPostDetailsById(id) {
      this.loading = true;
      try {
        const response = await getDetailsById(id);
        if (response.data.code === 200) {
          this.postDetails = response.data.data;
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch post details';
      } finally {
        this.loading = false;
      }
    },

    async getAllPostsAction(params) {
      this.loading = true;
      try {
        const response = await getAll(params);
        this.posts = response?.data || [];
        return this.posts;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch posts';
      } finally {
        this.loading = false;
      }
    },

    async searchPostsAction(query) {
      this.loading = true;
      try {
        const response = await search(query);
        this.posts = response?.data || [];
        return this.posts;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to search posts';
      } finally {
        this.loading = false;
      }
    },

    async getLatestPostsAction() {
      this.loading = true;
      try {
        const response = await getLatestPosts();
        if (response.data.code === 200) {
          this.latestPosts = response.data.data;
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch latest posts';
      } finally {
        this.loading = false;
      }
    },

    async getLowestPricedPostsAction() {
      this.loading = true;
      try {
        const response = await getLowestPricedPosts();
        this.lowestPricedPosts = response.data.data;
    
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch lowest priced posts';
      } finally {
        this.loading = false;
      }
    },
  }
});
