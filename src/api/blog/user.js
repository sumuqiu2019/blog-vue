import request from '@/utils/request'
const api_name = '/ums/userInfo/'
export default {
    // 查询
  getPageList(queryCondition) {
    return request({
      url: `${api_name}queryUserInfoList`,
      method: 'post',
      data:queryCondition
    })
  },
  //新增
  save() {
    return request({
      url: `${api_name}saveUserInfo`,
      method: 'post',
      data: userInfo
    })
  },
  fetchDataById(id) {
    return request({
      url: `${api_name}queryUserInfoById/${id}`,
      method: 'get',
    })
  },
  loginInfo(userInfo) {
    return request({
      url: `${api_name}login`,
      method: 'post',
      data: userInfo
    })
  }
}