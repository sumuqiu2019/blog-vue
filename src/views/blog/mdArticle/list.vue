<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <el-tree
      ref="mdTree"
      :data="mdList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
    <span class="demonstration">hover 触发子菜单</span>
    <el-cascader
      v-model="value"
      :options="mdList"
      :props="{ expandTrigger: 'hover',value:'id',label:'title' }"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>
<script>
import mdArticle from "@/api/blog/mdArticle";
export default {
  data() {
    return {
      value: [],
      filterText: "",
      mdList: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.mdTree.filter(val);
    }
  },
  created() {
    this.fetchNodeList();
  },
  methods: {
    fetchNodeList() {
      mdArticle.getMdTreeList().then(response => {
        // if (response.success === true) {
        this.mdList = response.data;
        // }
      });
    },
    filterNode(value, data) {
      console.log(value);
      console.log(data);
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>