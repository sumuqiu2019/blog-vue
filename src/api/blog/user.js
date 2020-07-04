import request from '@/utils/request'
const api_name = '/ums/userInfo/'
export default {
    // 查询
  getPageList() {
    return request({
      url: `${api_name}queryUserInfoList`,
      method: 'post',
    //   data: searchObj
    })
  },
  //新增
  save() {
    return request({
      url: `${api_name}saveUserInfo`,
      method: 'post',
      data: userInfo
    })
  }
}