<script setup lang="ts">
import { ref, toRef } from 'vue'
import DropdownDefault from '@/components/Dropdowns/DropdownDefault.vue'
const props = defineProps(['totalCommunities', 'totalFiles'])


const hexToRgb = (hex: string): string => {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `${r}, ${g}, ${b}`
}

const dataList = ref([
  {
    icon: `<svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.01313 5.3272C4.76381 5.3272 4.52469 5.42625 4.34839 5.60254C4.17209 5.77884 4.07305 6.01796 4.07305 6.26728V23.8154C4.07305 24.0648 4.17209 24.3039 4.34839 24.4802C4.52469 24.6565 4.76381 24.7555 5.01313 24.7555H25.0682C25.3175 24.7555 25.5566 24.6565 25.7329 24.4802C25.9092 24.3039 26.0082 24.0648 26.0082 23.8154V10.0276C26.0082 9.77828 25.9092 9.53916 25.7329 9.36286C25.5566 9.18656 25.3175 9.08752 25.0682 9.08752H13.7872C13.2633 9.08752 12.7741 8.82571 12.4835 8.38983L10.4418 5.3272H5.01313ZM2.13261 3.38676C2.89657 2.62279 3.93272 2.1936 5.01313 2.1936H11.2803C11.8042 2.1936 12.2934 2.45542 12.584 2.8913L14.6257 5.95392H25.0682C26.1486 5.95392 27.1847 6.38311 27.9487 7.14707C28.7126 7.91104 29.1418 8.94719 29.1418 10.0276V23.8154C29.1418 24.8958 28.7126 25.932 27.9487 26.696C27.1847 27.4599 26.1486 27.8891 25.0682 27.8891H5.01313C3.93272 27.8891 2.89657 27.4599 2.13261 26.696C1.36864 25.932 0.939453 24.8958 0.939453 23.8154V6.26728C0.939453 5.18688 1.36864 4.15072 2.13261 3.38676Z"
              fill="currentColor"
            />
          </svg>`,
    iconColor: '#9B51E0',
    name: 'Sub Communitiy',
    files: toRef(props, 'totalCommunities')
    // size: '459 MB'
  },
  {
    icon: `<svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.27128 2.13334C6.03524 1.36938 7.0714 0.940186 8.1518 0.940186H18.1793C18.5949 0.940186 18.9934 1.10526 19.2872 1.39909L26.8078 8.91973C27.1017 9.21356 27.2668 9.61208 27.2668 10.0276V25.0689C27.2668 26.1493 26.8376 27.1855 26.0736 27.9494C25.3096 28.7134 24.2735 29.1426 23.1931 29.1426H8.1518C7.0714 29.1426 6.03524 28.7134 5.27128 27.9494C4.50731 27.1855 4.07812 26.1493 4.07812 25.0689V5.01386C4.07812 3.93346 4.50731 2.8973 5.27128 2.13334ZM8.1518 4.07378C7.90248 4.07378 7.66337 4.17283 7.48707 4.34913C7.31077 4.52543 7.21172 4.76454 7.21172 5.01386V25.0689C7.21172 25.3182 7.31077 25.5573 7.48707 25.7336C7.66337 25.9099 7.90248 26.009 8.1518 26.009H23.1931C23.4424 26.009 23.6815 25.9099 23.8578 25.7336C24.0341 25.5573 24.1332 25.3182 24.1332 25.0689V10.6766L17.5303 4.07378H8.1518Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.1801 0.940186C19.0454 0.940186 19.7469 1.64167 19.7469 2.50698V8.46082H25.7007C26.566 8.46082 27.2675 9.1623 27.2675 10.0276C27.2675 10.8929 26.566 11.5944 25.7007 11.5944H18.1801C17.3148 11.5944 16.6133 10.8929 16.6133 10.0276V2.50698C16.6133 1.64167 17.3148 0.940186 18.1801 0.940186Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.0918 16.2947C9.0918 15.4294 9.79328 14.7279 10.6586 14.7279H20.6861C21.5514 14.7279 22.2529 15.4294 22.2529 16.2947C22.2529 17.16 21.5514 17.8615 20.6861 17.8615H10.6586C9.79328 17.8615 9.0918 17.16 9.0918 16.2947Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.0918 21.3085C9.0918 20.4432 9.79328 19.7417 10.6586 19.7417H20.6861C21.5514 19.7417 22.2529 20.4432 22.2529 21.3085C22.2529 22.1738 21.5514 22.8753 20.6861 22.8753H10.6586C9.79328 22.8753 9.0918 22.1738 9.0918 21.3085Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.0918 11.281C9.0918 10.4157 9.79328 9.71423 10.6586 9.71423H13.1655C14.0308 9.71423 14.7323 10.4157 14.7323 11.281C14.7323 12.1464 14.0308 12.8478 13.1655 12.8478H10.6586C9.79328 12.8478 9.0918 12.1464 9.0918 11.281Z"
                fill="currentColor"
              />
            </svg>`,
    iconColor: '#F2994A',
    name: 'File',
    files: toRef(props, 'totalFiles')
  },
  {
    icon: `<svg
              width="48"
              height="48"
              viewBox="-3 -2 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
   
              <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#219653" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" " />
            </svg>`,
    iconColor: '#219653',
    name: 'Member',
    size: 'view'
  },
 
  
])
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
  
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      <template v-for="(item, index) in dataList" :key="index">
        <div
          class="flex justify-between px-7.5 py-7 border-b last:border-b-0 border-r last:border-r-0 border-stroke dark:border-strokedark xl:border-b-0 [&>*:nth-child(3)]:sm:border-b-0"
        >
          <div class="flex items-center gap-5.5">
            <div
              v-html="item.icon"
              class="flex h-15 w-14.5 items-center justify-center rounded-lg"
              :style="{
                backgroundColor: `rgba(${hexToRgb(item.iconColor)}, 0.08)`,
                color: item.iconColor
              }"
            ></div>

            <div>
              <p class="text-lg font-medium" :style="{ color: item.iconColor }">{{ item.name }}</p>
              <span class="font-medium">{{ item.files }}</span>
            </div>
          </div>

          <div>
            <router-link to="#">
              <p class="mt-1.5 font-me text-lg text-black dark:text-white  hover:border-primary  hover:text-red dark:border-strokedark dark:hover:border-primary">{{ item.size }}</p>
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
