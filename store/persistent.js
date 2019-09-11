import {
	persistedState,
	setMutations
} from '../common/tools.js'

const stateReplace = {
	loginID: '',
	password: ''
}

const stateUpdate = {

}

const mutationsReplace = {}

setMutations(stateReplace, mutationsReplace)

const mutationsUpdate = {

}
const state = {...stateReplace, ...stateUpdate}
const mutations = {...mutationsReplace, ...mutationsUpdate}
export default {
	namespaced: true,
	state,
	mutations
}

/*
以下是对于持久化参数的处理，当此文件state中的值改变时，自动更新对应项的持久化存储
 */
//1000仅是测试值，实际可设为200以内或直接设为0
persistedState({state, setItem: uni.setStorageSync, setDelay: 1000})
