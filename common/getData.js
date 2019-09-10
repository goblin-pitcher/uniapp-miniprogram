import {
	baseUrl as base
} from '../static/webConfig.js'
import {
	getType
} from './tools'
import Urls from './urls'

const request = (method, data, url, successCB, errorCB, headerOrfinallyCB) => {
	let lastParaType = getType(headerOrfinallyCB)
	let header = lastParaType === 'object' ? headerOrfinallyCB : {
		'Content-Type': 'application/json;charset=utf-8'
	}
	let finallyCB = lastParaType === 'function' ? headerOrfinallyCB : null
	let successData, errorData
	data = JSON.stringify(data)
	url = `${base}${url}`
	return new Promise((resolved, reject) => {
		uni.request({
			url,
			method,
			data,
			header,
			success: (response) => {
				successData = response
				resolved(response)
			},
			fail: (error) => {
				errorData = error
				reject(error)
			}
		})
	}).then(res => {
		successCB = successCB || console.log
		successCB(res)
	}).catch(err => {
		errorCB = errorCB || console.log
		errorCB(err)
	}).finally(() => {
		if (finallyCB) {
			finallyCB(successData, errorData)
		}
	})
}
/* 
 args内容为[data, url, successCB, errorCB, headerOrfinallyCB]
 */
const Get = (...args) => request('GET', ...args)
const Post = (...args) => request('POST', ...args)
/*
 请求内容
 */
export const Login = (data, successCB, errorCB) => Post(data, Urls.login, successCB, errorCB)
