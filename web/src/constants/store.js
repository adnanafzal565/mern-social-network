import { createStore } from "redux"

const initialState = {
	user: null
}

const reducer = function (state = initialState, action) {
	if (action.type == "updateUser") {
		return {
			...state,
			user: action.user
		}
	}

	return state
}

const store = createStore(reducer)
export default store