<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-r from-gray-300 to-gray-700 text-white">
    <!-- Header -->
    <Header />
    <div class="flex justify-center items-start gap-2 px-2">
      <aside class="hidden xl:block shrink-0 pt-2">
        <KadamVideoAd vast-url="https://hdacode.com/get_data?blockID=449687&format=vast" />
      </aside>
      <div class="max-w-7xl w-full min-w-0 flex flex-col md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-4">
        <main class="order-2 md:order-1 xl:col-span-4 md:col-span-3 pb-2">
          <slot />
        </main>
        <Sidebar class="order-1 md:order-2 pt-2" :is_open="isDesktopComputed" />
      </div>
    </div>

    <KadamFooterBanner />

    <!-- Footer -->
    <Footer />
  </div>

</template>

<script setup>
// Components are auto-imported in Nuxt 3
import { onMounted, computed } from 'vue'
import Header from '~/components/layout/Header.vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import Footer from '~/components/layout/Footer.vue';
import KadamVideoAd from '~/components/KadamVideoAd.vue';
import KadamFooterBanner from '~/components/KadamFooterBanner.vue';
const route = useRoute()
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} Free Download` : 'Free Download'
  },
  meta: [

    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://1331x.com${route.path}` },
    { property: 'og:site_name', content: 'Ultimate Torrent Hub' }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://1331x.com${route.path}`
    }
  ],
})

useSchemaOrg([
  defineWebSite({
    name: 'Torrent free download'
  })
])

const isDesktop = ref(false);
const isMounted = ref(false);

// Computed property that ensures SSR/client consistency
const isDesktopComputed = computed(() => {
  if (!isMounted.value) {
    return false; // Always false during SSR and initial render
  }
  return isDesktop.value;
});

onMounted(async () => {
  isDesktop.value = window.innerWidth >= 1024 && !('ontouchstart' in window);
  isMounted.value = true;
})



</script>