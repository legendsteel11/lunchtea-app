<script setup lang="ts">
import { t } from '../i18n'

const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="container inner">
      <div class="links">
        <span class="label">{{ t.footer.made }}</span>
        <a href="https://tabstick.com/" target="_blank" rel="noopener">{{ t.footer.tabstick }}</a>
        <a href="https://edgetree.vercel.app/" target="_blank" rel="noopener">{{ t.footer.edgetree }}</a>
      </div>

      <p class="fine">© {{ year }} · {{ t.footer.rights }}</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--border);
  padding: 32px 0 44px;
  background: var(--bg-alt);
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  text-align: center;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  font-size: 14px;
}

.links .label {
  color: #5b6377;
  font-size: 13px;
}

.links a {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.links a:hover {
  color: var(--text-strong);
  border-bottom-color: var(--accent);
}

.fine {
  font-size: 12.5px;
  color: #5b6377;
}
</style>
