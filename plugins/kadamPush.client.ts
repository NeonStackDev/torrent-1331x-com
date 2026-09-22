export default defineNuxtPlugin(() => {
  if (process.server) return

  window.wpnConfig = {
    utm_source: 'kd',
    utm_campaign: 449683,
    utm_content: '',
    domain: window.location.host,
    delay: 3,
    nextTimeout: 72,
    ical: 0,
    proto: window.location.protocol,
    push_url: 'https://puhyjyf.com/78447.js'
  }

  if (document.getElementById('kadam-push-script')) return

  const script = document.createElement('script')
  script.id = 'kadam-push-script'
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.src = window.wpnConfig.push_url
  document.head.appendChild(script)
})
