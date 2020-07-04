<template>
  <el-form ref="form" :model="userInfo" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="userInfo.userName"></el-input>
    </el-form-item>
    <el-form-item label="头像">
      <pan-thumb :image="userInfo.avatar+''" />

    <el-button type="primary" icon="el-icon-upload"  @click="imagecropperShow=true">
      Change Avatar
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      :url="BASE_API+'/oss/file/uploadAvatar'"
      field="file"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="userInfo.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="userInfo.mail"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      userInfo: {
        userName: "",
        avatar:"https://sh-xcx-blog.oss-cn-shanghai.aliyuncs.com/user/avatar/avatar.jpg",
        phone: "",
        mail: ""
      },
      BASE_API:process.env.VUE_APP_BASE_API,
      imagecropperShow:false,
      imagecropperKey:0,
    };
  },
  methods: {
    cropSuccess(data) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.userInfo.avatar = data
      console.log(data)
    },
    close() {
      this.imagecropperShow = false
    },
    onSubmit() {
      console.log("submit!");
      console.log(this.userInfo);
    }
  }
};
</script>