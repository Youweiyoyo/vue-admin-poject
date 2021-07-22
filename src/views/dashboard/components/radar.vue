<template>
  <!-- 雷达图 -->
  <div ref="radar" class="radarEcharts" />
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { RadarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { LegendComponent } from 'echarts/components'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  RadarChart,
  CanvasRenderer,
  LegendComponent
])
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    var myChart = echarts.init(this.$refs.radar) // 得到图标实例
    myChart.setOption({
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '工作效率', max: 6500 },
          { name: '考勤', max: 16000 },
          { name: '积极性', max: 30000 },
          { name: '帮助同事', max: 38000 },
          { name: '自主学习', max: 52000 },
          { name: '正确率', max: 25000 }
        ]
      },
      series: [
        {
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000]
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000]
            }
          ]
        }
      ]
    })
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.radarEcharts {
  width: 600px;
  height: 400px;
}
</style>
