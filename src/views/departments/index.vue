<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" is-root @addDepts="addDept" />
        <el-tree :data="departs" :props="defaultProps">
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getOrganization"
            @addDepts="addDept"
            @editDept="editDept"
          />
        </el-tree>
        <add-dept
          ref="addDept"
          :show-dialog.sync="showDialog"
          :tree-node="node"
          @addDepts="getOrganization"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/addDept.vue'
import { getOrganization } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      showDialog: false,
      node: null,
      loading: false
    }
  },
  created() {
    this.getOrganization()
  },
  methods: {
    async getOrganization() {
      this.loading = true
      const result = await getOrganization()
      this.company = {
        name: 'JavsScript高级程序设计',
        manager: '负责人',
        id: ''
      }
      this.departs = tranListToTreeData(result.depts, '')
      this.loading = false
    },
    addDept(node) {
      this.showDialog = true
      this.node = node
    },
    editDept(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
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
