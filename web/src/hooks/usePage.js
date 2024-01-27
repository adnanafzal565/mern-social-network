import axios from "axios"
import constants from "../constants/constants"

function usePage () {
	const { api } = constants()
	
	async function createPage (formData) {
		try {
			let response = await axios.post(
				api + "/createPage",
				formData
			)
			response = response.data

			return response
		} catch (exp) {
			// 
		}
	}

	return { createPage }
}

export default usePage