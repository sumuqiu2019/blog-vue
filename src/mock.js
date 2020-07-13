// mock.js

// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
// const produceNewsData = function () {
//   let newsList = []
//   for (let i = 0; i < 20; i++) {
//     let newNewsObject = {
//       title: Random.ctitle(), //  Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
//       content: Random.cparagraph(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
//       createdTime: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
//     }
//     newsList.push(newNewsObject)
//   }

//   return newList
// }
// 请求该url，就可以返回newsList
// Mock.mock('/mock/news', produceNewsData) // 后面讲这个api的使用细节
// Mock.mock( rurl, rtype, template|function( options ) )

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const user_api_name = process.env.VUE_APP_BASE_API + "/ums/userInfo/";
const md_article_name = process.env.VUE_APP_BASE_API + "/md/article";


//登录
Mock.mock(user_api_name + 'vue-admin-template/user/login', config => {
  const { username } = config.body
  // const token = tokens[username]
  const token = 'admin-token'

  // mock error
  if (!token) {
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  }

  return {
    code: 0,
    data: token
  }
})

Mock.mock(RegExp(user_api_name + 'vue-admin-template/user/info' + ".*"),"get",config => {

  const info = {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  }
  console.log(info)

  // mock error
  if (!info) {
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  }

  return {
    code: 0,
    data: info
  }
})

Mock.mock(user_api_name+'vue-admin-template/user/logout', config => {
  console.log(111)
  return {
    code: 0,
    data: 'success'
  }
})

import { getPageList,getUserInfoById } from '../mock/mockJson/mockUserInfo'

Mock.mock(user_api_name + 'queryUserInfoList', config => {
  let page = {}
  page.page = config.body.page
  page.limit = config.body.limit
  console.log(config.body)
  return getPageList(JSON.parse(config.body))
})

Mock.mock(RegExp(user_api_name + 'queryUserInfoById' + ".*"), "get", (options) =>{
  // 最佳实践，将请求和参数都打印出来，以便调试
  console.log(options)
  return getUserInfoById(100001)
})
Mock.mock(process.env.VUE_APP_BASE_API+'/oss/file/uploadAvatar', (options) =>{
  // 最佳实践，将请求和参数都打印出来，以便调试
  console.log(options)
  return {
    code: 0,
    message:'error',
    data:'imgUrl'
  }
})

//saveUserInfo
//deleteUserInfoById
//update
//queryUserInfoById



import { getMdTree } from '../mock/mockJson/mockMD'

Mock.mock(md_article_name, (options) =>{
  // 最佳实践，将请求和参数都打印出来，以便调试
  console.log(options)
  return getMdTree()
})
