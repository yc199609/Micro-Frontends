import axios from 'axios';
import _ from 'lodash';

/**
 * @author yc
 * @param { object } data
 * @returns { object }
 * @description 过滤对象中值为null、undefined、''的项
 */
const checkData = data => (
  _.pickBy(data, (v) => {
    // 过滤''
    if (typeof v === 'string' && v.length === 0) {
      return false;
    }
    // 过滤null、undefined
    return !_.isNil(v);
  })
);

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  withCredentials: true, // 跨域带cookie
  timeout: 5000, // 请求等待时间
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// request拦截器
service.interceptors.request.use(
  config => config,
  (error) => {
    Promise.reject(error);
  },
);

export default {
  post(url, data) {
    return service({
      method: 'post',
      data: JSON.stringify(checkData(data)),
      url,
    });
  },
  get(url, data) {
    return service({
      method: 'get',
      params: checkData(data),
      url,
    });
  },
};
