import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import constants from "../constants/constants"
import LeftSidebar from "./includes/LeftSidebar"
import RightSidebar from "./includes/RightSidebar"
import useFetchStories from  "../hooks/useFetchStories"

function HomePage() {
	const [profileImage, setProfileImage] = useState(require("../public/img/default_profile.jpg"))
	const [stories, setStories] = useState([])
	const { api } = constants()
	const { fetchStories } = useFetchStories()

	const user = useSelector(function (state) {
		return state.user
	})

	useEffect(function () {
		if (user != null) {
			if (user.profileImage) {
				setProfileImage(api + "/" + user.profileImage)
			}
		}
	}, [user])
	
	useEffect(function () {
		document.title = "Home"
		getStories()
	}, [])

	async function getStories() {
		const formData = new FormData()
		formData.append("accessToken", localStorage.getItem("accessToken"))
		const response = await fetchStories(formData)
		if (response.status == "success") {
			setStories(response.data)
		}
	}

	function loadMore() {
		// 
	}

	return (
		<section>
			<div className="gap gray-bg">
				<div className="container-fluid">

					<div className="row" id="storiesApp" style={{
						marginBottom: 20,
						marginLeft: 20,
						marginRight: 20,
						position: 'relative' 
					}}>
						<div className="col-md-2">
							<div id="add-story">
								<img src={profileImage} style={{
									width: 200
								}} />

								<Link to="/add-story.html" className="btn btn-primary btn-sm" style={{
									position: "absolute",
									left: 118,
									bottom: 5,
									color: "white"
								}}>+ Add Story</Link>
							</div>
						</div>

						<div className="col-md-10">
							<div className="row stories">
								{ stories.map(function (story, index) {
									return (
										<div className="col-md-2" style={{
											display: 'contents'
										}} key={index}>
											<Link to={`view-story.html?id=${story.user._id}`}>
												<div className="story" style={{
													marginRight: 10,
													position: "relative"
												}}>
													<img src={story.user.profileImage}
														style={{
															width: 150,
															height: 150,
															objectFit: "cover"
														}} />
													<span style={{
														position: "absolute",
													    bottom: 5,
													    left: "50%",
													    transform: "translateX(-50%)",
													    color: "black",
													    backgroundColor: 'white',
													    paddingLeft: 10,
													    paddingRight: 10
													}}>{story.user.name}</span>
												</div>
											</Link>
										</div>
									)
								}) }
							</div>
						</div>
					</div>

					<div className="row" id="page-contents">
						<div className="col-md-3">
							<LeftSidebar />
						</div>

						<div className="col-md-6">
							<div id="add-post-box"></div>

							<div className="loadMore" id="newsfeed"></div>

							<button className="btn-view btn-load-more" onClick={loadMore}>Load More</button>
						</div>

						<div className="col-md-3">
							<RightSidebar />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HomePage