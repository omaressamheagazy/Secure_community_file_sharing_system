<script setup lang="ts">
import { ref } from 'vue'
const selectedOption = ref<string>('')
const isOptionSelected = ref<boolean>(false)
  const emit = defineEmits(['getSelectedValue'])


const handleChange = () => {
  isOptionSelected.value = true
  emit('getSelectedValue', selectedOption.value)

}
</script>

<template>
  <div class="mb-4.5">
    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
      Assing role to user
    </label>

    <div class="relative z-20 bg-transparent dark:bg-form-input">
      <select 
        required
        v-model="selectedOption"
        class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        :class="{ 'text-black dark:text-white': isOptionSelected }"
        @change="handleChange"
      >
        <option value="" class="text-black font-black	" disabled selected>Select System role</option>
        <option value="Admin" class="text-body dark:text-bodydark">Admin</option>
        <option value="normal" class="text-body dark:text-bodydark">Nomral user</option>
        <option value="Editor" class="text-body dark:text-bodydark">Editor</option>
        <option value="" class="text-black font-black	" disabled selected>Select Custom role</option>
        <option value="IT" class="text-body dark:text-bodydark">IT</option>
        <option value="software_engineer" class="text-body dark:text-bodydark">Software engineer</option>
        <option value="HR" class="text-body dark:text-bodydark">HR</option>
      </select>


      <span class="absolute right-4 top-1/2 z-30 -translate-y-1/2">
        <svg
          class="fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.8">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
              fill=""
            ></path>
          </g>
        </svg>
      </span>
    </div>
  </div>
</template>
