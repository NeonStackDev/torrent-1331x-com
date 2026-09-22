declare global {
  interface Window {
    __loadKadamHeaderPopunder?: () => void
  }
}

export default defineNuxtPlugin(() => {
  if (process.server) return

  window.__loadKadamHeaderPopunder = () => {
    if (document.getElementById('kadam-popunder-script')) return

    if (!document.querySelector('.ezkfel449692')) {
      const holder = document.createElement('div')
      holder.className = 'ezkfel449692'
      holder.style.display = 'none'
      document.body.appendChild(holder)
    }

    const script = document.createElement('script')
    script.id = 'kadam-popunder-script'
    script.src = 'https://hdbtop.com/code/ezkfel449692'
    script.setAttribute('data-cfasync', 'false')
    document.head.appendChild(script)
  }
})
