<template>
  <ClientOnly>
    <div v-if="isMobile" class="kadam-mobile-banner my-4 flex justify-center">
      <div class="betGyK449681 kadam-unit"></div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const KADAM_UNIT_ID = 'betGyK449681'
const KADAM_SCRIPT_ID = 'kadam-loader-dhyshe2g'
const KADAM_SCRIPT_SRC = 'https://hdbkome.com/dhyshe2g.js'

const isMobile = ref(false)

function updateMobile() {
  if (process.server) return
  isMobile.value = window.innerWidth < 768
}

function ensureKadamLoader() {
  window.k_init = window.k_init || []

  const alreadyQueued = window.k_init.some(
    (item) => item && item.id === KADAM_UNIT_ID
  )
  if (!alreadyQueued) {
    window.k_init.push({
      id: KADAM_UNIT_ID,
      type: 'bn',
      domain: 'hdbkome.com',
      refresh: false,
      next: 0
    })
  }

  if (document.getElementById(KADAM_SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = KADAM_SCRIPT_ID
  script.async = true
  script.charset = 'utf-8'
  script.setAttribute('data-cfasync', 'false')
  script.src = KADAM_SCRIPT_SRC
  document.head.appendChild(script)
}

onMounted(() => {
  updateMobile()
  window.addEventListener('resize', updateMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMobile)
})

watch(isMobile, async (mobile) => {
  if (!mobile) return
  await nextTick()
  ensureKadamLoader()
}, { immediate: true })
</script>

<style scoped>
.kadam-mobile-banner {
  width: 100%;
}

.kadam-unit {
  width: 320px;
  max-width: 100%;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.kadam-unit :deep(iframe),
.kadam-unit :deep(ins),
.kadam-unit :deep(div),
.kadam-unit :deep(img) {
  max-width: 320px !important;
  max-height: 100px !important;
}
</style>
