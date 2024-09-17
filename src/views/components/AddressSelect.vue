<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
      <!-- Close Button -->
      <button 
        @click="closeForm"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
      >
        &times;
      </button>

      <!-- Selected Address Display -->
      <div class="mb-6 text-center text-gray-900">
        <p class="text-lg font-semibold mb-1">Địa chỉ đã chọn</p>
        <p class="text-base">{{ selectedProvinceName }} - {{ selectedDistrictName }} - {{ selectedCommuneName }}</p>
      </div>

      <!-- Province Selector -->
      <div class="mb-4">
        <label for="province" class="block text-sm font-medium text-gray-900">
          Tỉnh thành
        </label>
        <div class="relative">
          <select
            v-model="selectedProvince"
            @change="fetchDistricts"
            class="mt-1 block w-full rounded border-2 border-gray-300 bg-white text-gray-700 sm:text-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">--Chọn tỉnh thành--</option>
            <option
              v-for="province in provinces"
              :key="province.idProvince"
              :value="province.idProvince"
            >
              {{ province.name }}
            </option>
          </select>
          <div class="absolute top-2.5 right-2 flex items-center" v-if="loadingProvince">
            <img
              class="h-4 w-4"
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt="Loading"
            />
          </div>
        </div>
      </div>

      <!-- District Selector -->
      <div class="mb-4">
        <label for="district" class="block text-sm font-medium text-gray-900">
          Quận huyện
        </label>
        <div class="relative">
          <select
            v-model="selectedDistrict"
            @change="fetchCommunes"
            class="mt-1 block w-full rounded border-2 border-gray-300 bg-white text-gray-700 sm:text-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">--Chọn quận huyện--</option>
            <option
              v-for="district in districts"
              :key="district.idDistrict"
              :value="district.idDistrict"
            >
              {{ district.name }}
            </option>
          </select>
          <div class="absolute top-2.5 right-2 flex items-center" v-if="loadingDistrict">
            <img
              class="h-4 w-4"
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt="Loading"
            />
          </div>
        </div>
      </div>

      <!-- Commune Selector -->
      <div class="mb-6">
        <label for="commune" class="block text-sm font-medium text-gray-900">
          Phường xã
        </label>
        <div class="relative">
          <select
            v-model="selectedCommune"
            class="mt-1 block w-full rounded border-2 border-gray-300 bg-white text-gray-700 sm:text-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">--Chọn phường xã--</option>
            <option
              v-for="commune in communes"
              :key="commune.idCommune"
              :value="commune.idCommune"
            >
              {{ commune.name }}
            </option>
          </select>
          <div class="absolute top-2.5 right-2 flex items-center" v-if="loadingCommune">
            <img
              class="h-4 w-4"
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt="Loading"
            />
          </div>
        </div>
      </div>

      <!-- Complete Button -->
      <button
        @click="completeSelection"
        class="w-full mt-4 bg-green-500 text-white rounded py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Hoàn thành
      </button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      provinces: [],
      districts: [],
      communes: [],
      selectedProvince: '',
      selectedDistrict: '',
      selectedCommune: '',
      loadingProvince: true,
      loadingDistrict: false,
      loadingCommune: false,
    };
  },
  computed: {
    selectedProvinceName() {
      return this.provinces.find(p => p.idProvince === this.selectedProvince)?.name || '';
    },
    selectedDistrictName() {
      return this.districts.find(d => d.idDistrict === this.selectedDistrict)?.name || '';
    },
    selectedCommuneName() {
      return this.communes.find(c => c.idCommune === this.selectedCommune)?.name || '';
    },
  },
  methods: {
    async fetchProvinces() {
      try {
        const response = await fetch("https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province");
        const data = await response.json();
        this.provinces = data;
        this.loadingProvince = false;
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    },
    async fetchDistricts() {
      if (!this.selectedProvince) return;
      this.loadingDistrict = true;
      try {
        const response = await fetch(`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district/?idProvince=${this.selectedProvince}`);
        const data = await response.json();
        this.districts = data;
        this.loadingDistrict = false;
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    },
    async fetchCommunes() {
      if (!this.selectedDistrict) return;
      this.loadingCommune = true;
      try {
        const response = await fetch(`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune/?idDistrict=${this.selectedDistrict}`);
        const data = await response.json();
        this.communes = data;
        this.loadingCommune = false;
      } catch (error) {
        console.error("Error fetching communes:", error);
      }
    },
    closeForm() {
      this.$emit('close');
    },
    completeSelection() {
      if (this.selectedProvince && this.selectedDistrict && this.selectedCommune) {
        const selectedAddress = {
          province: this.selectedProvinceName,
          district: this.selectedDistrictName,
          commune: this.selectedCommuneName,
        };
        this.$emit('complete', selectedAddress);
        this.closeForm(); 
      } else {
        alert("Vui lòng chọn đầy đủ Tỉnh thành, Quận huyện và Phường xã.");
      }
    }
  },
  mounted() {
    this.fetchProvinces();
  },
};
</script>

<style scoped>
/* Tailwind utility classes are used for styling; additional custom styles are minimal */
</style>
