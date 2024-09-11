import { defineStore } from 'pinia';
import { getUserInfo, updateUser } from '@/apis/modules/accounts.api';

export const useAccountStore = defineStore('accounts', {
  state: () => ({
    account: null,
    loading: false,
    error: null,
  }),
  actions: {
    async getInforAccount(accountId) {
      try {
        this.loading = true;
        this.error = null;
        
        const response = await getUserInfo(accountId) || {};
        
        return response?.data || [];
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch account information';
      } finally {
        this.loading = false;
      }
    },

    async updateAccount(accountId, updatedData) {
      try {
        this.loading = true;
        this.error = null;

        const response = await updateUser(accountId, updatedData);

        this.account = response.data;
      } catch (err) {
        // Xử lý lỗi nếu có
        this.error = err.response?.data?.message || 'Failed to update account information';
      } finally {
        this.loading = false;
      }
    },
  },
});
