<template>
  <ClientOnly>
    <div
      v-if="isDesktop"
      class="kadam-video-wrap"
      :class="{ 'is-visible': hasFill }"
    >
      <div ref="adContainer" class="kadam-video-ad">
        <video
          ref="videoEl"
          class="kadam-video-el"
          playsinline
          muted
        ></video>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  vastUrl: { type: String, required: true }
})

const IMA_SCRIPT_ID = 'google-ima3-sdk'
const IMA_SCRIPT_SRC = 'https://imasdk.googleapis.com/js/sdkloader/ima3.js'
const REQUEST_W = 640
const REQUEST_H = 360
const RETRY_MS = 20000

const isDesktop = ref(false)
const hasFill = ref(false)
const adContainer = ref(null)
const videoEl = ref(null)

let adsLoader = null
let adsManager = null
let adDisplayContainer = null
let resizeHandler = null
let retryTimer = null

function updateDesktop() {
  if (process.server) return
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  isDesktop.value = window.innerWidth >= 1280 && !hasTouch
}

function loadImaScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.ima) {
      resolve()
      return
    }
    const existing = document.getElementById(IMA_SCRIPT_ID)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('IMA load failed')))
      return
    }
    const script = document.createElement('script')
    script.id = IMA_SCRIPT_ID
    script.src = IMA_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('IMA load failed'))
    document.head.appendChild(script)
  })
}

function destroyAds() {
  try { adsManager?.destroy() } catch {}
  try { adsLoader?.destroy() } catch {}
  adsManager = null
  adsLoader = null
}

function hideAndRetry() {
  hasFill.value = false
  destroyAds()
  if (retryTimer) return
  retryTimer = setTimeout(() => {
    retryTimer = null
    requestVast()
  }, RETRY_MS)
}

function onAdsManagerLoaded(event) {
  const { ima } = window.google
  adsManager = event.getAdsManager(videoEl.value)

  adsManager.addEventListener(ima.AdEvent.Type.LOADED, () => {
    hasFill.value = true
  })
  adsManager.addEventListener(ima.AdEvent.Type.STARTED, () => {
    hasFill.value = true
  })
  adsManager.addEventListener(ima.AdErrorEvent.Type.AD_ERROR, hideAndRetry)
  adsManager.addEventListener(ima.AdEvent.Type.COMPLETE, hideAndRetry)
  adsManager.addEventListener(ima.AdEvent.Type.ALL_ADS_COMPLETED, hideAndRetry)

  try {
    adsManager.init(REQUEST_W, REQUEST_H, ima.ViewMode.NORMAL)
    adsManager.start()
  } catch {
    hideAndRetry()
  }
}

function requestVast() {
  if (!adContainer.value || !videoEl.value || !window.google?.ima) return

  destroyAds()
  hasFill.value = false
  const { ima } = window.google

  if (!adDisplayContainer) {
    adDisplayContainer = new ima.AdDisplayContainer(adContainer.value, videoEl.value)
    adDisplayContainer.initialize()
  }

  adsLoader = new ima.AdsLoader(adDisplayContainer)
  adsLoader.addEventListener(
    ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false
  )
  adsLoader.addEventListener(
    ima.AdErrorEvent.Type.AD_ERROR,
    hideAndRetry,
    false
  )

  const request = new ima.AdsRequest()
  request.adTagUrl = props.vastUrl
  request.linearAdSlotWidth = REQUEST_W
  request.linearAdSlotHeight = REQUEST_H
  request.nonLinearAdSlotWidth = REQUEST_W
  request.nonLinearAdSlotHeight = REQUEST_H
  adsLoader.requestAds(request)
}

onMounted(async () => {
  updateDesktop()
  resizeHandler = () => updateDesktop()
  window.addEventListener('resize', resizeHandler)
  if (!isDesktop.value) return

  try {
    await loadImaScript()
    await nextTick()
    requestVast()
  } catch {
    hasFill.value = false
  }
})

onBeforeUnmount(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (retryTimer) clearTimeout(retryTimer)
  destroyAds()
})
</script>

<style scoped>
.kadam-video-wrap {
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}

.kadam-video-wrap.is-visible {
  width: 300px;
  height: auto;
  overflow: visible;
  pointer-events: auto;
}

.kadam-video-ad {
  position: relative;
  width: 300px;
  aspect-ratio: 16 / 9;
  background: #111;
  overflow: hidden;
}

.kadam-video-el {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}
</style>
