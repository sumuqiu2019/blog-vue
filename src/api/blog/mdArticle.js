import request from '@/utils/request'

const api_name = '/md/article'

export default {
      getMdTreeList() {
        return request({
          url: `${api_name}`,
          method: 'get'
        })
      }
    }