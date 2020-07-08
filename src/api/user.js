import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/ums/userInfo/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/ums/userInfo/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/ums/userInfo/svue-admin-template/user/logout',
    method: 'post'
  })
}
