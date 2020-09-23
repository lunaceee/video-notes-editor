<template>
  <div id="app" class="flex flex-col min-h-screen">
    <header class="grid grid-cols-3 m-2 md:m-8 h-56">
      <div class="col-span-1">
        <GoBack :class="[isHomePage ? 'invisible' : 'visible']" />
      </div>
      <div class="flex justify-center mt-20">
        <router-link :to="{ name: 'home' }">
          <Logo class="h-12 sm:h-16 md:h-24" />
        </router-link>
      </div>
      <div class="flex col-span-1 col-start-3 justify-end">
        <AuthDropDown :class="[isHomePage ? 'visible' : 'invisible']" />
      </div>
    </header>
    <main class="grid sm:px-4 sm:p-8 flex-grow mb-6">
      <AddVideo v-show="isHomePage" class="mb-10" />
      <router-view
        class="grid grid-flow-col xs:grid-flow-row sm:grid-flow-row md:grid-flow-col-dense lg:grid-flow-row-dense xl:grid-flow-col"
        :key="$route.path"
      />
    </main>
    <footer
      class="grid grid-row-3 h-32 items-center y-10 bg-teal-600 text-white text-center"
    >
      <span>
        Made by
        <a
          href="https://github.com/lunaceee"
          class="underline text-red-300 hover:text-teal-200 font-black"
          >lunaceee</a
        >
        ・ Powered by Vue, Firebase, Video.js, and Tailwind CSS
      </span>
    </footer>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import AddVideo from "@/components/addVideo.vue";
import AuthDropDown from "@/components/AuthDropDown.vue";
import Logo from "@/assets/icons/logo.svg";

export default {
  name: "Cuttle",
  data() {
    return {
      isMobile: false,
    };
  },
  components: {
    AddVideo,
    GoBack,
    AuthDropDown,
    Logo,
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
  },
};
</script>