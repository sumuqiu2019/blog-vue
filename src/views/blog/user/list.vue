<template>
  <div class="app-container">
    用户列表
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template
          slot-scope="scope"
        >{{ (queryCondition.page - 1) * queryCondition.limit + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="userName" label="名称" />
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar
            :src="scope.row.avatarUrl === null ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' : scope.row.avatarUrl"
          ></el-avatar>
          <!-- {{ scope.row.avatarUrl===null?'null':scope.row.avatarUrl }} -->
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="200" />
      <el-table-column prop="mail" label="邮箱" width="220" />
      <el-table-column prop="createdTime" label="注册时间" width="220" />
      <el-table-column prop="updatedTime" label="修改时间" width="220" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/blog/user/edit/'+scope.row.userId">
            <el-button type="primary"  size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.userId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryCondition.page"
      :page-size="queryCondition.limit"
      :page-sizes="[2, 4, 6, 8]"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import userInfo from "@/api/blog/user";
export default {
  data() {
    // 定义数据
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      queryCondition: {
        page: 1, // 页码
        limit: 2, // 每页记录数
        sidx: "",
        order: "asc"
      } // 查询条件
    };
  },
  created() {
    // 当页面加载时获取数据
    this.fetchData(this.queryCondition);
  },

  methods: {
    fetchData(queryCondition) {
      // 调用api层获取数据库中的数据
      console.log("加载列表");
      this.listLoading = true;
      userInfo.getPageList(queryCondition).then(response => {
        this.list = response.data.list;
        this.total = response.data.totalCount;
        this.listLoading = false;
        this.$message.error("加载完毕")
      });
    },
    // 分页函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryCondition.limit = val;
      this.fetchData(this.queryCondition);
    },
    handleCurrentChange(val) {
      this.fetchData(this.queryCondition);
      console.log(`当前页: ${val}`);
    }
  }
};
</script>