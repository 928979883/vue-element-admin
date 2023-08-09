import request from '@/utils/request'

// 首页 数据
export function homePageDose(params) {
  return request({
    url: '/distribution/emsc/home/homePageDose',
    method: 'get',
    params
  })
}
