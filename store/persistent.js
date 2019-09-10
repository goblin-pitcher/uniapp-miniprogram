import {
	observer,
	getType,
	getStoragePath,
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
const state = { ...stateReplace,
	...stateUpdate
}
const mutations = { ...mutationsReplace,
	...mutationsUpdate
}
export default {
	namespaced: true,
	state,
	mutations
}

/*
以下是对于持久化参数的处理，当此文件state中的值改变时，自动更新对应项的持久化存储
 */

function debounceStorage(delay) {
	let updateItems = new Set()
	let timer = null
	return function setToStorage(obj, key) {
		let changeKey = getStoragePath(obj, key)[0]
		updateItems.add(changeKey)
		clearTimeout(timer)
		timer = setTimeout(() => {
			try {
				updateItems.forEach(key => {
					uni.setStorageSync(key, state[key])
				})
				updateItems.clear()
			} catch (e) {
				console.error(`persistent.js中state内容持久化失败,错误位于[${changeKey}]参数中的[${key}]项`)
			}
		}, delay)
	}
}

observer(state, {
	set: debounceStorage(1000) //1000仅是测试值，实际可设为200以内或直接设为0
})
