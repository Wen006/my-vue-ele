import request from '@/utils/request';
import config from './config'

/**
 * Get interface key
 * @param {interface unique key} key 
 */
function get(key) {
    if (config && config[key]) {
        return config[key];
    }
    throw new Error("接口配置[" + key + "]不存在")
}

/**
 * 调用服务
 * @param {*} param0 
 */
function callRpc({ key, query, body, suffix, headers={} }) {
    let { url, method, headers:comHeaders, m_table } = get(key);

    // console.log(query,param)
    if(m_table){
        headers["m_table"] = m_table;
        url = "/api"+url;
    } 

    const axiosCfg = { url: url + (suffix?suffix:''), method,params:query, data:body, headers:{...comHeaders,...headers} };

  
    // if (query) {
    //     axiosCfg.url = axiosCfg.url + qs.stringify(query);
    // }

    if (body instanceof FormData) {
        headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    return request(axiosCfg);
}

module.exports={
    get,
    callRpc
}