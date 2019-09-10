/*
 持久化相关内容
 */
// 重写的Array方法
const funcArr = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const typeArr = ['object', 'array']

function setCallBack(obj, key, options) {
	if (options && options.set) {
		if (getType(options.set) !== 'function') throw ('options.set需为function')
		options.set(obj, key)
	}
}

function rewriteArrFunc(arr, options) {
	if (getType(arr) !== 'array') throw ('参数需为array')
	funcArr.forEach(key => {
		arr[key] = function(...args) {
			this.__proto__[key].call(this, ...args)
			setCallBack(this[Symbol.for('parent')], this[Symbol.for('key')], options)
		}
	})
}

function dep(obj, key, options) {
	let data = obj[key]
	if (typeArr.includes(getType(data))) {
		data[Symbol.for('parent')] = obj
		data[Symbol.for('key')] = key
	}
	Object.defineProperty(obj, key, {
		configurable: true,
		get() {
			if (options && options.get) {
				options.get(obj, key)
			}
			return data
		},
		set(val) {
			if (val === data) return
			data = val
			let index = typeArr.indexOf(getType(data))
			if (index >= 0) {
				data[Symbol.for('parent')] = obj
				data[Symbol.for('key')] = key
				if (index) {
					rewriteArrFunc(data, options)
				} else {
					observer(data, options)
				}
			}
			setCallBack(obj, key, options)
		}
	})
}
export function getStoragePath(obj, key) {
	let storagePath = [key]
	while (obj) {
		if (obj[Symbol.for('key')]) {
			key = obj[Symbol.for('key')]
			storagePath.unshift(key)
		}
		obj = obj[Symbol.for('parent')]
	}
	return storagePath
}
export function observer(obj, options) {
	if (getType(obj) !== 'object') throw ('参数需为object')
	let index
	Object.keys(obj).forEach(key => {
		dep(obj, key, options)
		index = typeArr.indexOf(getType(obj[key]))
		if (index < 0) return
		if (index) {
			rewriteArrFunc(obj[key], options)
		} else {
			observer(obj[key], options)
		}
	})
}
/*
 vuex自动配置mutation相关方法
 */
export function setMutations(stateReplace, mutationsReplace) {
	Object.keys(stateReplace).forEach(key => {
		let name = key.replace(/\w/, (first) => `update${first.toUpperCase()}`)
		let replaceState = (key, state, payload) => {
			state[key] = payload
		}
		mutationsReplace[name] = (state, payload) => {
			replaceState(key, state, payload)
		}
	})
}
/*
 通用方法
 */
export function getType(para) {
	return Object.prototype.toString.call(para)
		.replace(/\[object (.+?)\]/, '$1').toLowerCase()
}
