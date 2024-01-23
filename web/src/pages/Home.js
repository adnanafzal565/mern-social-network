import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import $ from "jquery"
import Swal from "sweetalert2"

import constants from "../constants/constants"
import LeftSidebar from "./includes/LeftSidebar"
import RightSidebar from "./includes/RightSidebar"
import PostActions from "./includes/PostActions"
import useFetchStories from  "../hooks/useFetchStories"
import usePost from "../hooks/usePost"
import { urlify } from "../public/js/script.js"

function HomePage() {
	const [profileImage, setProfileImage] = useState(require("../public/img/default_profile.jpg"))
	const [defaultProfileImage, setDefaultProfileImage] = useState(require("../public/img/default_profile.jpg"))
	const [stories, setStories] = useState([])
	const [posts, setPosts] = useState([])
	const [addingPost, setAddingPost] = useState(false)
	const { api } = constants()
	const { fetchStories } = useFetchStories()
	const { addPost, getNewsfeed } = usePost()

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
		fetchNewsfeed()
	}, [])

	async function fetchNewsfeed() {
		const formData = new FormData()
		formData.append("accessToken", localStorage.getItem("accessToken"))
		const response = await getNewsfeed(formData)
		if (response.status == "success") {
			setPosts(response.data)
		}
	}

	async function getStories() {
		const formData = new FormData()
		formData.append("accessToken", localStorage.getItem("accessToken"))
		const response = await fetchStories(formData)
		if (response.status == "success") {
			setStories(response.data)
		}
	}

	async function doPost() {
		event.preventDefault()
		setAddingPost(true)

		const form = event.target
		const formData = new FormData(form)
		formData.append("accessToken", localStorage.getItem("accessToken"))

		const response = await addPost(formData)
		setAddingPost(false)

		if (response.status == "success") {
			const postObj = response.postObj
			form.reset()

			// prepend in newsfeed
			const tempPosts = [...posts]
			tempPosts.unshift(postObj)
			setPosts(tempPosts)

			// render wave surfers for audio
		} else {
			Swal.fire("Error", response.message, "error")
		}
	}

	function showPopupYoutubeURL () {
		$("#modalYoutube").modal("show")
	}

	function loadMore () {
		// 
	}

	function readMore () {
		// 
	}

	function getExtension (filename) {
		const nameParts = filename.split(".")
		return nameParts[nameParts.length - 1]
	}

	function getYTURL (data) {
		let youtube_url = data.youtube_url
		return youtube_url.replace("watch?v=", "embed/")
	}

	function getPostCaption (data) {
		let caption = data.caption
		const maxLength = 140
		let result = caption.substring(0, maxLength)
		return urlify(result)
	}

	function getMoreText (data) {
		let caption = data.caption
		const maxLength = 140
		return caption.substring(maxLength, caption.length)
	}

	function hasEllipsis (data) {
		let caption = data.caption
		const maxLength = 140
		let result = caption.substring(0, maxLength)
		return (caption.length > maxLength)
	}

	function getDate (data) {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		var createdAt = new Date(data.createdAt);
		var date = createdAt.getDate() + "";
		date = date.padStart(2, "0") + " " + months[createdAt.getMonth()] + ", " + createdAt.getFullYear();
		return date
	}

	function isMyUploaded (data) {
		if (data.type == "group_post") {
			if (data.uploader._id == user._id) {
				return true
			}
		} else if (data.user._id == user._id) {
			return true
		}
		return false
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
							<div id="add-post-box">
								<div className="central-meta">
									<div className="new-postbox">
										<figure>
											<img src={profileImage} onError={function (event) {
												event.target.src = defaultProfileImage
											}} />
										</figure>

										<div className="newpst-input">
											<form method="post" id="form-add-post" onSubmit={doPost} noValidate encType="multipart/form-data">

												<input name="type" type="hidden" value="post" />
												<textarea rows="2" name="caption" placeholder="write something"></textarea>
												<div className="attachments">
													<ul>
														<li>
															<input type="file" multiple name="files" accept="image/*,audio/*,video/*" />
														</li>

														<li style={{
															marginRight: 20
														}}>
															<i className="fa fa-youtube" onClick={showPopupYoutubeURL} style={{
																cursor: "pointer",
																fontSize: 30
															}}></i>
														</li>

														<li>
															<button type="submit" name="submit" disabled={addingPost}>
																Post
																{addingPost && (
																	<i className="fa fa-spinner fa-spin"></i>
																)}																
															</button>
														</li>
													</ul>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>

							<div className="loadMore" id="newsfeed">
								{ posts.map(function (data, index) {
									return (
										<div style={{
											display: "contents"
										}} key={`post-${data._id}`}>
											{ !data.isBanned && (
												<div className="central-meta item" id={`post-${data._id}`}>
													<div className="user-post">
														<div className="friend-info">

															{ data.isBoost && (
																<p>Sponsored</p>
															) }

															<figure>
																<img src={`${api}/${(data.type == "group_post" ? data.uploader.profileImage : data.user.profileImage)}`}
																	style={{
																		width: 45,
																		height: 45,
																		objectFit: "cover"
																	}}
																	onError={function (event) {
																		event.target.src = defaultProfileImage
																	}} />
															</figure>

															<div className="friend-name">
																<ins>
																	{ data.type == "post" ? (
																		<Link to={`/user/${data.user.username}`}>
																			{ data.user.name }
																		</Link>
																	) : data.type == "group_post" ? (
																		<Link to={`/group/${data.user._id}`}>
																			{ data.user.name }
																		</Link>
																	) : data.type == "page_post" ? (
																		<Link to={`/page/${data.user._id}`}>
																			{ data.user.name }
																		</Link>
																	) : (
																		<span>{ data.user.name }</span>
																	)}

																	{ isMyUploaded(data) && (
																		<>
																			<i className="fa fa-trash delete-post" onClick={function () {
																				deletePostModal(data._id)
																			}}></i>

																			<i className="fa fa-pencil edit-post" onClick={function () {
																				editPostModal(data._id)
																			}}></i>
																		</>
																	) }

																	<Link to={`/post-detail.html?id=${data._id}`} className="detail-post">
																		<i className="fa fa-eye"></i>
																	</Link>

																</ins>

																<span>Published: {getDate(data)}</span>
																
																{ data.originalPost != null && (
																	<span>
																		Original
																		<Link to={`/post/${data.originalPost._id}`}>post</Link>
																		by { data.originalPost.user.name }
																	</span>
																) }

															</div>

															<div className="post-meta">

																{ hasEllipsis(data) && (
																	<span style={{
																		display: "contents"
																	}}>
																		<span className='ellipsis'> ...</span>
																		<span className='read-more-text' style='display: none;'>{ getMoreText(data) }</span>
																		<a href='#' onClick={readMore}> read more</a>
																	</span>
																) }

																<div className="description">
																	<p>{ getPostCaption(data) }</p>
																</div>

																{ data.savedPaths != null && (
																	<div className="gridAttachments">
																		{ data.savedPaths.map(function (savedPath, savedPathIndex) {
																			const parts = savedPath.split(".")
																			const extension = parts[parts.length - 1]

																			return (
																				<div style={{
																					display: "contents"
																				}} key={`savedPath-${data._id}-${savedPathIndex}`}>
																					{ savedPathIndex < 4 && (
																						<>
																							{ (extension == "jpg" || extension == "jpeg" || extension == "png") ? (
																								<img className="post-image" src={`${api}/${savedPath}`} />
																							) : (extension == "mp4" || extension == "mov" || extension == "mkv") ? (
																								<video className="post-video" style={{
																									height: 359,
																									width: "100%"
																								}} controls src={`${api}/${savedPath}`}></video>
																							) : (extension == "mp3" || extension == "m4a" || extension == "aac") && (
																								<>
																									<audio className="post-audio" controls src={`${api}/${savedPath}`}
																										id={`audio-post-${data._id}`}></audio>
																									<div id={`waveform-post-${data._id}`}></div>
																								</>
																							) }

																							{ savedPathIndex == 3 && (
																								<Link style={{
																									display: "contents"
																								}} to={`/post.html?id=${data._id}`}>
																									<div className="overlayAttachment">
																										<div className="text">+</div>
																									</div>
																								</Link>
																							) }
																						</>
																					) }
																				</div>
																			)
																		}) }
																	</div>
																) }

																{ (data.youtube_url && data.youtube_url != "") && (
																	<iframe width="560" height="315" src={getYTURL(data)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
																) }

																{ (data.document && data.document != "") && (
																	<Link to={data.document} target="_blank">
																		<i className={`fa fa-file-${getExtension(data.document)}-o`} style={{
																			fontSize: 50
																		}}></i>
																	</Link>
																) }

																<PostActions
																	data={data}
																	isMyStory={false} />
															</div>
														</div>

														{ isMyUploaded(data) && (
															<div className='row'>
																<div className='offset-md-9 col-md-3'>
																	{ data.isBoost ? (
																		<a href='#' style={{
																			backgroundColor: "gray",
																			color: "white",
																			padding: 5
																		}} className='pull-right'>Boost post</a>
																	) : (
																		<Link to={`/boost.html?id=${data._id}`} style={{
																			backgroundColor: "#088dcd",
																			color: "white",
																			padding: 5
																		}} className='pull-right'>Boost post</Link>
																	) }
																</div>
															</div>
														) }
													</div>
												</div>
											) }
										</div>
									)
								}) }
							</div>

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