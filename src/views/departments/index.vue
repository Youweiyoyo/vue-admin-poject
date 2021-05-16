<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" is-root />
        <el-tree :data="departs" :props="defaultProps">
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getOrganization } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.getOrganization()
  },
  methods: {
    async getOrganization() {
      const result = await getOrganization()
      this.company = { name: 'JavsScript高级程序设计', manager: '负责人' }
      this.departs = tranListToTreeData(result.depts, '')
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
