<template>
  <footer class="footer bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between mb-6">
        <!-- Logo and Description -->
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h1 class="text-3xl font-bold mb-2">My Website</h1>
          <p class="text-gray-300">Your one-stop shop for everything. We offer a wide range of products to suit all your needs.</p>
          <div class="mt-4 flex space-x-4">
            <a href="#" class="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition duration-150 ease-in-out">Subscribe</a>
            <a href="#" class="bg-gray-600 text-white px-3 py-2 rounded-full hover:bg-gray-700 transition duration-150 ease-in-out">Contact Us</a>
          </div>
        </div>

        <!-- Links -->
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 class="text-xl font-semibold mb-4">Quick Links</h2>
          <ul class="space-y-2">
            <li><a href="#" class="hover:underline hover:text-gray-400 transition duration-150 ease-in-out">Home</a></li>
            <li><a href="#" class="hover:underline hover:text-gray-400 transition duration-150 ease-in-out">Products</a></li>
            <li><a href="#" class="hover:underline hover:text-gray-400 transition duration-150 ease-in-out">About Us</a></li>
            <li><a href="#" class="hover:underline hover:text-gray-400 transition duration-150 ease-in-out">Contact</a></li>
            <li><a href="#" class="hover:underline hover:text-gray-400 transition duration-150 ease-in-out">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Social Media -->
        <div class="w-full md:w-1/3">
          <h2 class="text-xl font-semibold mb-4">Follow Us</h2>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              <ion-icon name="logo-facebook" class="text-3xl"></ion-icon>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              <ion-icon name="logo-twitter" class="text-3xl"></ion-icon>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              <ion-icon name="logo-instagram" class="text-3xl"></ion-icon>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              <ion-icon name="logo-linkedin" class="text-3xl"></ion-icon>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="text-center mt-8">
        <p class="text-gray-300">&copy; 2024 My Website. All rights reserved.</p>
        <p>
          <a href="mailto:support@mywebsite.com" class="hover:underline hover:text-gray-400 transition duration-150 ease-in-out">support@mywebsite.com</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  background-color: #2d3748; /* Darker background for footer */
  color: #f7fafc; /* Light text color */
  width: 100%;
}

.footer a {
  color: #e2e8f0; /* Light gray for links */
}

.footer a:hover {
  color: #cbd5e0; /* Lighter gray for link hover */
}

.footer h1 {
  color: #edf2f7; /* Light color for the header */
}

.footer h2 {
  color: #edf2f7; /* Light color for the sub-header */
}
</style>
