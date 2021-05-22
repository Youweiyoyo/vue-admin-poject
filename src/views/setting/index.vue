<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理">
            <el-row style="height:60px">
              <el-button type="primary" size="small" icon="el-icon-plus">
                新增角色
              </el-button>
            </el-row>
            <vxe-table align="center" :data="tableData" border>
              <vxe-table-column type="seq" width="129" title="序号" />
              <vxe-table-column field="sex" title="名称" width="240" />
              <vxe-table-column field="age" title="描述" />
              <vxe-table-column field="age" title="操作">
                <template #default="{row}">
                  <el-button type="success">分配权限</el-button>
                  <el-button type="primary">编辑权限</el-button>
                  <el-button type="danger">删除</el-button>
                </template>
              </vxe-table-column>
            </vxe-table>
            <el-row>
              <vxe-pager
                :layouts="[
                  'Sizes',
                  'PrevJump',
                  'PrevPage',
                  'Number',
                  'NextPage',
                  'NextJump',
                  'FullJump',
                  'Total'
                ]"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              :closable="false"
              show-icon
              type="info"
              title="对公司名称、公司地址、营业执照、公司地区的更新、将使公司资料重新被审核,请谨慎修改"
            />
            <el-form label-width="120px" style="margin-top:30px">
              <el-form-item label="企业名称">
                <el-input type="text" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input type="text" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input type="text" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input type="text" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '',
      tableData: []
    }
  }
}
</script>

<style></style>
