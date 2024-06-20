import type { onMounted } from 'vue';
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DataTable } from 'simple-datatables'

const columns = ref([
  { title: 'Name', key: 'name' },
  { title: 'Role', key: 'position' },
  { title: 'Office', key: 'office' },
  { title: 'Age', key: 'age' },
  { title: 'Joined At', key: 'startDate', type: 'date', format: 'YYYY/DD/MM' },
  { title: 'Action', key: 'salary' }
])

const dataList = ref([
  {
    name: 'Brielle Kuphal',
    position: 'Senior Javascript Developer',
    office: 'Edinburgh',
    age: '25',
    startDate: '2012/03/29',
    salary: '$433,060'
  },
  {
    name: 'Barney Murray',
    position: 'Senior Backend Developer',
    office: 'amsterdam',
    age: '29',
    startDate: '2010/05/01',
    salary: '$424,785'
  },
  {
    name: 'Ressie Ruecker',
    position: 'Senior Frontend Developer',
    office: 'Jakarta',
    age: '27',
    startDate: '2013/07/01',
    salary: '$785,210'
  },
  {
    name: 'Teresa Mertz',
    position: 'Senior Designer',
    office: 'New Caledonia',
    age: '25',
    startDate: '2014/05/30',
    salary: '$532,126'
  },
  {
    name: 'Chelsey Hackett',
    position: 'Product Manager',
    office: 'NewYork',
    age: '26',
    startDate: '2011/09/30',
    salary: '$421,541'
  },
  {
    name: 'Tatyana Metz',
    position: 'Senior Product Manager',
    office: 'NewYork',
    age: '28',
    startDate: '2009/09/30',
    salary: '$852,541'
  },
  {
    name: 'Oleta Harvey',
    position: 'Junior Product Manager',
    office: 'California',
    age: '25',
    startDate: '2015/10/30',
    salary: '$654,444'
  },
  {
    name: 'Bette Haag',
    position: 'Junior Product Manager',
    office: 'Carolina',
    age: '29',
    startDate: '2017/12/31',
    salary: '$541,111'
  },
  {
    name: 'Meda Ebert',
    position: 'Junior Web Developer',
    office: 'Amsterdam',
    age: '27',
    startDate: '2015/10/31',
    salary: '$651,456'
  },
  {
    name: 'Elissa Stroman',
    position: 'Junior React Developer',
    office: 'Kuala Lumpur',
    age: '29',
    startDate: '2008/05/31',
    salary: '$566,123'
  },
  {
    name: 'Sid Swaniawski',
    position: 'Senior React Developer',
    office: 'Las Vegas',
    age: '29',
    startDate: '2009/09/01',
    salary: '$852,456'
  },
  {
    name: 'Madonna Hahn',
    position: 'Senior Vue Developer',
    office: 'New York',
    age: '27',
    startDate: '2006/10/01',
    salary: '$456,147'
  },
  {
    name: 'Waylon Kihn',
    position: 'Senior HTML Developer',
    office: 'Amsterdam',
    age: '23',
    startDate: '2017/11/01',
    salary: '$321,254'
  },
  {
    name: 'Jaunita Lindgren',
    position: 'Senior Backend Developer',
    office: 'Jakarta',
    age: '25',
    startDate: '2018/12/01',
    salary: '$321,254'
  },
  {
    name: 'Lenora MacGyver',
    position: 'Junior HTML Developer',
    office: 'Carolina',
    age: '27',
    startDate: '2015/09/31',
    salary: '$852,254'
  },
  {
    name: 'Edyth McCullough',
    position: 'Senior Javascript Developer',
    office: 'Edinburgh',
    age: '25',
    startDate: '2012/03/29',
    salary: '$433,060'
  },
  {
    name: 'Ibrahim Stroman',
    position: 'Senior Backend Developer',
    office: 'amsterdam',
    age: '29',
    startDate: '2010/05/01',
    salary: '$424,785'
  },
  {
    name: 'Katelynn Reichert',
    position: 'Senior Frontend Developer',
    office: 'Jakarta',
    age: '27',
    startDate: '2013/07/01',
    salary: '$785,210'
  },
  {
    name: 'Logan Kiehn',
    position: 'Senior Designer',
    office: 'New Caledonia',
    age: '25',
    startDate: '2014/05/30',
    salary: '$532,126'
  },
  {
    name: 'Rogers Stanton',
    position: 'Product Manager',
    office: 'NewYork',
    age: '26',
    startDate: '2011/09/30',
    salary: '$421,541'
  },
  {
    name: 'Alanis Torp',
    position: 'Senior Product Manager',
    office: 'NewYork',
    age: '28',
    startDate: '2009/09/30',
    salary: '$852,541'
  },
  {
    name: 'Jarvis Bauch',
    position: 'Junior Product Manager',
    office: 'California',
    age: '25',
    startDate: '2015/10/30',
    salary: '$654,444'
  },
  {
    name: 'Trey Ritchie',
    position: 'Junior Product Manager',
    office: 'Carolina',
    age: '29',
    startDate: '2017/12/31',
    salary: '$541,111'
  },
  {
    name: 'Ronny Dietrich',
    position: 'Junior Web Developer',
    office: 'Amsterdam',
    age: '27',
    startDate: '2015/10/31',
    salary: '$651,456'
  },
  {
    name: 'Isabella Christiansen',
    position: 'Junior React Developer',
    office: 'Kuala Lumpur',
    age: '29',
    startDate: '2008/05/31',
    salary: '$566,123'
  }
])

onMounted(() => {
  const dataTableOne = document.querySelectorAll('#dataTableTwo')

  if (dataTableOne.length) {
    new DataTable('#dataTableTwo', {
      perPageSelect: [5, 10, 15, ['All', -1]],
      columns: [
        {
          select: 2
          // sortSequence: ['desc', 'asc']
        },
        {
          select: 3
          // sortSequence: ['desc']
        },
        {
          select: 4,
          cellClass: 'green',
          headerClass: 'red'
        }
      ]
    })
  }
})
</script>

<template>
  <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div class="data-table-common data-table-two max-w-full overflow-x-auto">
      <table class="table w-full table-auto" id="dataTableTwo">
        <thead>
          <tr>
            <template v-for="(column, index) in columns" :key="index">
              <th v-if="!column.type">
                <div class="flex items-center justify-between gap-1.5">
                  <p>{{ column.title }}</p>
                  <div class="inline-flex flex-col space-y-[2px]">
                    <span class="inline-block">
                      <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0L0 5H10L5 0Z" fill="" />
                      </svg>
                    </span>
                    <span class="inline-block">
                      <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z" fill="" />
                      </svg>
                    </span>
                  </div>
                </div>
              </th>
              <th v-if="column.type" data-type="date" data-format="YYYY/DD/MM">
                <div class="flex items-center justify-between gap-1.5">
                  <p>{{ column.title }}</p>
                  <div class="inline-flex flex-col space-y-[2px]">
                    <span class="inline-block">
                      <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0L0 5H10L5 0Z" fill="" />
                      </svg>
                    </span>
                    <span class="inline-block">
                      <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z" fill="" />
                      </svg>
                    </span>
                  </div>
                </div>
              </th>
            </template>
          </tr>
        </thead>

        <tbody>
          <template v-for="(dataItem, dataIndex) in dataList" :key="dataIndex">
            <tr>
              <td>{{ dataItem.name }}</td>
              <td>{{ dataItem.position }}</td>
              <td>{{ dataItem.office }}</td>
              <td>{{ dataItem.age }}</td>
              <td>{{ dataItem.startDate }}</td>
              <td>
                <div class="flex items-center space-x-3.5">
                  <button class="hover:text-primary">
                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill="" />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill="" />
                    </svg>
                  </button>

                  <button class="hover:text-primary">
                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill="" />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill="" />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill="" />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill="" />
                    </svg>
                  </button>


                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
