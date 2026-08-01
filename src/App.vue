<script setup lang="ts">
import { inject } from '@vercel/analytics'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ComingSoonSlots from './components/ComingSoonSlots.vue'
import AboutSection from './components/AboutSection.vue'
import PlaySection from './components/PlaySection.vue'
import DownloadSection from './components/DownloadSection.vue'
import NoticeSection from './components/NoticeSection.vue'
import AppFooter from './components/AppFooter.vue'

inject()
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <ComingSoonSlots />
    <AboutSection />
    <PlaySection />
    <DownloadSection />
    <NoticeSection />
  </main>
  <AppFooter />
</template>
