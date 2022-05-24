<template>
  <q-layout
    class="main"
    view="lHh Lpr lFf"
    :style="backgroundUrl"
  >
    <Header />
    <q-page-container class="flex justify-center items-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Header from 'components/Header'
import { computed } from 'vue'
import { useQuasar } from 'quasar'

const q$ = useQuasar()

const backgroundUrl = computed(() => {
  let url = q$.dark.isActive ? require('../assets/summer-dark.webp') : require('../assets/summer.webp')
  return {
    backgroundImage: `url(${url})`
  }
})
</script>

<style lang="stylus">
.main
  background-repeat repeat
  background-color var(--postcard-page-color)
  height: 100vh
</style>
