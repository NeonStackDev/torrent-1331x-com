<template>
  <ClientOnly>
    <div class="kadam-footer-banner my-4 flex justify-center px-2">
      <div class="QGyKee449690 kadam-unit"></div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'

const KADAM_UNIT_ID = 'QGyKee449690'
const KADAM_SCRIPT_ID = 'kadam-loader-h78tny7k'
const KADAM_SCRIPT_SRC = 'https://hdbkome.com/h78tny7k.js'

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

onMounted(async () => {
  await nextTick()
  ensureKadamLoader()
})
</script>

<style scoped>
.kadam-footer-banner {
  width: min(100%, 1020px);
  height: 156px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.kadam-unit {
  width: 100%;
  height: 100%;
  min-height: 156px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.kadam-unit :deep(iframe),
.kadam-unit :deep(ins),
.kadam-unit :deep(div),
.kadam-unit :deep(img) {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>
