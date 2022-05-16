import httpRequest from '@/request/index'

// 定义接口的传参
interface VideoInfoParam {
    option: string,
    key: string,
    current: number,
    size: number
}

// 获取用户信息
export function getVideoInfo(param: VideoInfoParam) {
    return httpRequest({
        url: '/api/video/search/',
        method: 'get',
        params: {
            option:param.option,
            key:param.key,
            from:param.current,
            size:param.size,
        },
    })
}
