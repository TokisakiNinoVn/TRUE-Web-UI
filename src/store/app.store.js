// Utilities
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    miniLoading: false,
    notification: {
      active: false,
      message: "Nội dung thông báo mặc định"
    },
    isMiniMenu: false,
    openDialog: false,
    dialogLoadling: false,
    miniDialogLoading: false,
    dialogCircularProgressLoading: false,
    isShowUpgradeApp: false,
    upgradeApp: {
      isShow: false,
      message: "Phiên bản ứng dụng quá thấp. Vui lòng cập nhật ứng dụng"
    },
    isUnauthorized: false,
  }),
  getters: {
    isLoading: state => state?.loading || false,
    hasNotification: state => state?.notification?.active || false,
    notificationContent: state => state?.notification?.message || "",
    isDrawerMenuMini: state => state?.isMiniMenu || false,
    isOpenDialog: state => state?.openDialog || false,
    isMiniLoading: state => state?.miniLoading || false,
    isDialogLoading: state => state?.dialogLoadling || false,
    isMiniDialogLoading: state => state?.miniDialogLoading || false,
    isDialogCircularProgressLoading: state => state?.dialogCircularProgressLoading || false
  },
  actions: {
    showDialogCircularProgressLoading() {
      this.dialogCircularProgressLoading = true;
    },
    hideDialogCircularProgressLoading(){
      this.dialogCircularProgressLoading = false;
    },
    showLoadingAction() {
      this.loading = true;
    },
    hideLoadingAction() {
      this.loading = false;
    },
    showErrorAlert(content = "Đã có lỗi") {
      toast.error(content);
    },
    showSuccessAlert(content = "Thao tác thành công!") {
      toast.success(content);
    },
    showWaringAlert(content = "Có một cảnh báo") {
      toast.warning(content);
    },
    showNotification(content = "thông báo"){
      this.notification = {active: true, message: content};
    },
    hideNotification() {
      this.notification = {active: false, message: ""};
    },
    toggleDrawerMenu() {
      this.isMiniMenu = !this.isMiniMenu;
    },
    showDialog(isShow) {
      this.openDialog = isShow;
    },
    showMiniLoading() {
      this.miniLoading = true;
    },
    hideMiniLoading() {
      this.miniLoading = false;
    },
    showDialogLoading() {
      this.dialogLoadling = true;
    },
    hideDialogLoading() {
      this.dialogLoadling = false;
    },
    showMiniDialogLoading() {
      this.miniDialogLoading = true;
    },
    hideMiniDialogLoading() {
      this.miniDialogLoading = false;
    },
    requireUpgradeApp(message = "Phiên bản ứng dụng quá thấp. Vui lòng cập nhật ứng dụng") {
      if(this.upgradeApp?.isShow == false) {
        this.upgradeApp.isShow = true;
        this.upgradeApp.message = message;
      }
    },
    showUnauthorizedAlert(message = "Đã có lỗi token") {
      if(this.isUnauthorized == false) {
        toast.error(message);
        this.isUnauthorized = true
      }
    }
  }
})

