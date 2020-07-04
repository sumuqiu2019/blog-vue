<template>
    <div class="app-container">
        用户列表
        <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="名称" />
      <el-table-column label="头像">
        <template slot-scope="scope">
            <el-avatar :src="scope.row.avatarUrl === null ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' : scope.row.avatarUrl"></el-avatar>
          <!-- {{ scope.row.avatarUrl===null?'null':scope.row.avatarUrl }} -->
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="200"/>
      <el-table-column prop="mail" label="邮箱" width="220"/>
      <el-table-column prop="createdTime" label="注册时间" width="220" />
      <el-table-column prop="updatedTime" label="修改时间" width="220" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/blog/user/edit/'+scope.row.userId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>   

</template>

<script>
import userInfo from '@/api/blog/user'
export default {
  data() {// 定义数据
      return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}// 查询条件
    }
  },
  created() { // 当页面加载时获取数据
    this.fetchData()
  },
    
  methods: {
     fetchData(page = 1) { // 调用api层获取数据库中的数据
      console.log('加载列表')
      this.page = page
      this.listLoading = true
      userInfo.getPageList().then(response => {
        // if (response.code == 0) {
          this.list = response.data.list
          this.total = response.data.totalPage
        // }
        this.listLoading = false
      })
    }
  }
}
</script>