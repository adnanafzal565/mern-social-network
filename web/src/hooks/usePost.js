import axios from "axios"
import constants from "../constants/constants"

function usePost () {
	const { api } = constants()

	async function toggleLikePost (formData) {
		try {
			let response = await axios.post(
				api + "/toggleLikePost",
				formData
			)
			response = response.data

			return response
		} catch (exp) {
			// 
		}
	}

	async function getNewsfeed (formData) {
		try {
			let response = await axios.post(
				api + "/getNewsfeed",
				formData
			)
			response = response.data

			return response
		} catch (exp) {
			// 
		}
	}
	
	async function addPost (formData) {
		try {
			let response = await axios.post(
				api + "/addPost",
				formData
			)
			response = response.data

			return response
		} catch (exp) {
			// 
		}
	}

	return { addPost, getNewsfeed }
}

export default usePost