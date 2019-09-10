import {setMutations} from '../common/tools.js'
const stateReplace = {
}

const stateUpdate = {
}

const mutationsReplace = {}

setMutations(stateReplace,mutationsReplace)

const mutationsUpdate = {

}

export const state = { 
	...stateReplace,
	...stateUpdate
}
export const mutations = { 
	...mutationsReplace,
	...mutationsUpdate
}