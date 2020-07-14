<template>
  <div class="app-container">
      <Header></Header>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog"><router-link :to="{name: 'mdArticleWrite', params: {blogId: blog.id}}">编辑</router-link></el-link>
      <el-divider></el-divider>
      <div class="content markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>
<script>
  import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
  import Header from "@/components/Header";


  export default {
    components: {Header},
    data() {
      return {
        blog: {
          userId: null,
          title: "标题",
          description: "描述",
          content: ""
        },
        ownBlog: true
      }
    },
    methods: {
      getBlog() {
        var MarkdownIt = require('markdown-it'),
        md = new MarkdownIt();
        var result = md.render(`# 111111
|column1|column2|column3|
|-|-|-|
|content1|content2|content3|
> 段落引用`);
this.blog.content = result
         
      }
    },
    created() {
      this.getBlog()
    }
  }
</script>