<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const chartData = {
  series: [
    {
      data: [
        168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212, 270, 190, 310, 115,
        90, 380, 112, 223, 292, 170, 290, 110, 115, 290, 380, 312
      ]
    }
  ],
  labels: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30'
  ]
}

const chart = ref(null)

const apexOptions = {
  colors: ['#3C50E0'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 350,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
      borderRadius: 2
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 4,
    colors: ['transparent']
  },
  xaxis: {
    categories: chartData.labels,
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',

    markers: {
      radius: 99
    }
  },
  yaxis: {
    title: false
  },
  grid: {
    yaxis: {
      lines: {
        show: false
      }
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    x: {
      show: false
    },
    y: {
      formatter: function (val: any) {
        return val
      }
    }
  }
}
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5"
  >
    <div>
      <h3 class="text-xl font-bold text-black dark:text-white">Visitors Analytics</h3>
    </div>
    <div>
      <div id="chartFour" class="-ml-5">
        <VueApexCharts
          type="bar"
          height="350"
          :options="apexOptions"
          :series="chartData.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>
