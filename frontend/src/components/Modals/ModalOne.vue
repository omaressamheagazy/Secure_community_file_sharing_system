<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import { ref } from 'vue'
const props = defineProps(['title', 'buttonName', 'modalName'])
const target = ref(null)
const modalOpen = ref(false)

onClickOutside(target, () => {
  modalOpen.value = false
})
</script>

<template>
  <div>
    <div @click="modalOpen = true"
      class="flex py-2 cursor-pointer px-5 font-medium hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
      {{ modalName }}
    </div>

    <div v-show="modalOpen"
      class="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div ref="target"
        class="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5">
        <h3 class="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          {{ title }}
        </h3>
        <span class="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        <!--  content -->
        <div class="text-left">
          <slot></slot>

        </div>

        <!-- Content end -->
        <div class="-mx-3 flex flex-wrap gap-y-4">
          <div class="w-full px-3 2xsm:w-1/2">
            <button @click="modalOpen = false"
              class="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              Cancel
            </button>
          </div>
          <div class="w-full px-3 2xsm:w-1/2">
            <button @click="$emit('submit')"
              class="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90">
              {{ buttonName  }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
