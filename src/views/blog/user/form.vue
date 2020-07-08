<template>
  <el-form ref="form" :model="userInfo" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="userInfo.userName"></el-input>
    </el-form-item>
    <el-form-item label="头像">
      <pan-thumb :image="userInfo.avatar==null?defaultAvatar:userInfo.avatar" />

      <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">上传头像</el-button>

      <image-cropper
        v-show="imagecropperShow"
        :key="imagecropperKey"
        :width="300"
        :height="300"
        :url="BASE_API+'/oss/file/uploadAvatar'"
        field="file"
        @close="close"
        @crop-upload-success="cropSuccess"
        @crop-upload-fail="cropUploadFail"
      />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="userInfo.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="userInfo.mail"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即提交</el-button>
      <el-button @click="formClear" >取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import user from "@/api/blog/user";
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      userInfo: {
        userName: "",
        avatar:null,
        phone: "",
        mail: ""
      },
      defaultAvatar:process.env.VUE_APP_DEFAULT_AVATAR,
      BASE_API: process.env.VUE_APP_BASE_API,
      imagecropperShow: false,
      imagecropperKey: 0
    }
  },
  created() {
    // 当页面加载时获取数据
    if (this.$route.params && this.$route.params.id) {  
      const id = this.$route.params.id
      this.fetchDataById(id);
    }
  },
  methods: {
    cropSuccess(data) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.userInfo.avatar = data;
      console.log(data);
    },
    cropUploadFail(data){
      console.log(data)
    },
    close() {
      this.imagecropperShow = false;
    },
    onSubmit() {
      console.log("submit!");
      console.log(this.userInfo);
    },
    formClear(){
      this.userInfo = {}
    },
    fetchDataById(id) {
      user.fetchDataById(id).then(response => {
          this.userInfo = response.data;
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "获取数据失败"
          });
        });
    }
  }
};
</script>