import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import $ from "jquery"
import useFetchStory from "../hooks/useFetchStory"
import { isAttachmentImage } from "../public/js/script.js"
import videojs from "video.js"
import NProgress from "nprogress"

function ViewStory() {
	const [stories, setStories] = useState([])
	const [viewers, setViewers] = useState([])
	const [videoPlayers, setVideoPlayers] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [CSSClasses, setCSSClasses] = useState(["brown", "brown", "gray", "white", "green", "blue", "purple", "pink", "red"])
	const [isMyStory, setIsMyStory] = useState(false)
	const { fetchStory } = useFetchStory()

	useEffect(function () {
		NProgress.start()
		getData()
	}, [])

	useEffect(function () {
		showStory()
	}, [stories, currentIndex])

	function showStory() {
		// console.trace()
		if (currentIndex >= stories.length) {
			return false;
		}

		markAsViewed(currentIndex);
		const story = stories[currentIndex];

		if (story.attachment != "" && !isAttachmentImage(story.attachment)) {
			// a video
			const index = currentIndex + 1

			$($(".single-bar-fill")[currentIndex]).animate({
				width: "100%"
			}, story.seconds * 1000, function () {
				setCurrentIndex(index)
				var owl = $('#carouselStories').data('owl.carousel');
				owl.to(index);
			});
		} else {
			$($(".single-bar-fill")[currentIndex]).css({
				"width": "0%"
			});

			$($(".single-bar-fill")[currentIndex]).animate({
				width: "100%"
			}, 10000, function () {
				setCurrentIndex(currentIndex + 1)
				var owl = $('#carouselStories').data('owl.carousel');
				if (owl != null) {
					owl.to(currentIndex + 1);
				}
			});
		}
	}

	function markAsViewed (index) {
		/*var ajax = new XMLHttpRequest();
		ajax.open("POST", "/storyViewed", true);

		ajax.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200) {
					// console.log(this.responseText);
					const response = JSON.parse(this.responseText);
					// console.log(response);

					if (response.status == "success") {
						// 
					} else {
						swal("Error", response.message, "error");
					}
				}

				if (this.status == 500) {
					console.log(this.responseText);
				}
			}
		};

		var formData = new FormData();
		formData.append("accessToken", localStorage.getItem("accessToken"));
		formData.append("_id", this.stories[index]._id);
		ajax.send(formData);*/
	}

	async function getData() {
		const formData = new FormData()
		formData.append("accessToken", localStorage.getItem("accessToken"))
		const urlSearchParams = new URLSearchParams(window.location.search)
		formData.append("userId", urlSearchParams.get("id") || "")
		
		const response = await fetchStory(formData)
		if (response.status == "success") {
			setStories(response.stories)
			setIsMyStory(response.isMyStory)

			setTimeout(function () {
				const owl = $("#carouselStories").owlCarousel({
					loop: false,
			        rewind: false,
			        singleItem: true,
			        autoplay: false,
			        dots: false,
			        nav: true,
			        items: 1,
			        touchDrag: false,
			        mouseDrag: false
				});

				owl.on('changed.owl.carousel', function(event) {
					const index = event.item.index
					// if (typeof videoPlayers[index] !== "undefined") {
					// 	videoPlayers[index].pause();
					// }
					$(".single-bar-fill").stop();
					setCurrentIndex(index)

					// if (typeof videoPlayers[index] !== "undefined") {
					// 	videoPlayers[index].controls(true);
					// }
				});

				let videoPlayerNodes = document.querySelectorAll(".video-js");
				let tempVideoPlayers = [...videoPlayers]
				for (let a = 0; a < videoPlayerNodes.length; a++) {
					let player = videojs(videoPlayerNodes[a].id);
					tempVideoPlayers.push(player)
				}
				setVideoPlayers(tempVideoPlayers)

				NProgress.done()
			}, 500)
		} else {
			Swal.fire("Error", response.message, "error")
		}
	}

	function deleteStory () {
		event.preventDefault()
	}

	function getCSSClass () {
		const cssClass = CSSClasses[Math.floor(Math.random() * CSSClasses.length)];
		return cssClass;
	}

	return (
		<div id="storyApp" style={{
			display: 'contents'
		}}>
			<section>
				<div className="gap1 gray-bg">
					<div className="container-fluid">
						<div className="row" style={{
							backgroundColor: 'black',
							height: '100%'
						}}>
							<div className="offset-md-3 col-md-6">
								<div className="row top-bars" style={{
									marginTop: 10
								}}>
									{ stories.map(function (story, index) {
										return (
											<div className={`col-md-${Math.floor(12 / stories.length)}`} style={{
												paddingLeft: 5,
												paddingRight: 0
											}} key={index}>
												<div className="single-bar">
													<div className="single-bar-fill"></div>
												</div>
											</div>
										)
									}) }
								</div>

								<div className="row">
									<div className="col-md-12" style={{
										marginTop: 20
									}}>
										<div className="owl-carousel owl-theme" id="carouselStories">
											{ stories.map(function (story, index) {
												return (
													<div className="item" key={index}>

														{ story.attachment != '' ? (
															<>
																<div style={{
																	display: "contents"
																}}>

																	{ isAttachmentImage(story.attachment) ? (
																		<img className="d-block w-100" src={story.attachment} alt={story.caption} style={{
																			height: 500,
																			objectFit: "contain"
																		}} />
																	) : (
																		<video id={`story-video-${story._id}`} 
																			className="video-js"
																			preload="auto"
																			data-setup={`{
																				"controls": true
																			}`}
																			style={{
																				width: "100%",
																				height: 500,
																				objectFit: "cover"
																			}}>
																			<source src={story.attachment}></source>
																			<p className="vjs-no-js">
																			To view this video please enable JavaScript, and consider upgrading to a
																			web browser that
																				<a href="https://videojs.com/html5-video-support/" target="_blank">
																				supports HTML5 video
																				</a>
																			</p>
																		</video>
																	) }

																</div>

																<div>
																    <p style={{
																    	backgroundColor: "black",
																	    color: "white",
																	    padding: 5,
																	    marginBottom: 0
																    }} className="text-center">{story.caption}</p>
																</div>
															</>
														) : (
															<div style={{
																fontSize: 30,
																width: '100%',
																height: 300,
																textAlign: 'center' 
															}}
																className={getCSSClass}>
														    	<div style={{
														    		position: "relative",
																    top: "50%",
																    transform: "translateY(-50%)"
														    	}}>{story.caption}</div>
														    </div>
														) }
													
														{ isMyStory && (
															<div className="text-center">
														    	<div style={{
														    		display: "contents",
														    		color: "white",
														    		cursor: "pointer"
														    	}} className="story-viewers" data-index={index}>
														    		<i className="fa fa-eye"></i>&nbsp;

														    		<span style={{
														    			fontSize: 12
														    		}}>({story.viewers.length})</span>
														    	</div>

														    	<form onSubmit={deleteStory} style={{
														    		display: "contents"
														    	}}>
														    		<input type="hidden" name="_id" defaultValue={story._id} />
														    		<button type="submit" className="btn btn-link">
														    			<i className="fa fa-trash" style={{
														    				color: "white"
														    			}}></i>
														    		</button>
														    	</form>
														    </div>
														) }

													    <div className="text-center">
													    	{/* v-html="createLikesSection(story)" */}
													    	<div style={{
													    		marginTop: 20
													    	}}></div>
													    </div>

													</div>
												)
											}) }
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{ isMyStory && (
					<div className="modal" id="storyViewersModal">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Viewers</h5>

									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>

								<div className="modal-body">
									<table className="table table-bordered">
										{ viewers.map(function (viewer, index) {
											return (
												<tr>
													<td>{viewer.user.name}</td>
													<td>
														<img src={viewer.user} style={{
															width: 100
														}} />
													</td>
													<td>{viewer.createdAt}</td>
												</tr>
											)
										}) }
									</table>
								</div>
							</div>
						</div>
					</div>
				) }
			</section>
		</div>
	)
}

export default ViewStory