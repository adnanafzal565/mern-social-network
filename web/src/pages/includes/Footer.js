import { useState } from "react"

function Footer() {
	const [year, setYear] = useState(new Date().getFullYear())

	function deletePost() {
		// 
	}

	function showPopupYoutubeURL() {
		// 
	}

	function closeModal(id) {
		// 
	}

	function doPostReply() {
		// 
	}

	function doPostComment() {
		// 
	}

	function doEditPost() {
		// 
	}

	return (
		<div>
			<footer>
				<div className="container">
					<div className="row">
						Social network &copy; {year}
					</div>
				</div>
			</footer>

			<div className="modal" tabIndex="-1" role="dialog" id="modalYoutube">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Enter Youtube URL</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

						<div className="modal-body">
							<p>
								<input type="url" name="youtube_url" placeholder="Enter youtube URL" required className="form-control" form="form-add-post" />
							</p>
						</div>
						
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" data-dismiss="modal">Add Youtube URL</button>
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>

			<div className="modal" id="shareInPagesModal" tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog" style={{
					maxWidth: 1000
				}}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Share in pages you manage</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

						<div className="modal-body"></div>
					</div>
				</div>
			</div>

			<div className="modal" id="shareInGroupModal" tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog" style={{
					maxWidth: 1000
				}}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Share in groups</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

						<div className="modal-body"></div>
					</div>
				</div>
			</div>

			<div className="modal" id="replyModal" tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Reply</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

						<div className="modal-body">
							<form onSubmit={doPostReply}>
								<input type="hidden" name="postId" />
								<input type="hidden" name="commentId" />
								<textarea name="reply" placeholder="Post your reply"></textarea>
								<button type="submit">Post</button>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div id="edit-post-modal" className="modal">
				<div className="modal-content">
					<h3>Edit post <span className="close" onClick={closeModal('edit-post-modal')}>&times;</span></h3>

					<form method="POST" action="/editPost" encType="multipart/form-data" id="form-edit-post" onSubmit={doEditPost}>			
						<input type="hidden" name="_id" />
						<input type="hidden" name="type" />

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
									<button type="submit" name="submit">
										Post
										<i className="fa fa-spinner fa-spin" style={{
											display: 'none'
										}}></i>
									</button>
								</li>
							</ul>
						</div>
					</form>
				</div>
			</div>

			<div id="delete-post-modal" className="modal">
				<div className="modal-content" style={{
					width: 500
				}}>
					<h3>Delete <span className="close" onClick={closeModal('delete-post-modal')}>&times;</span></h3>
					
					<p>Are you sure you want to delete this post from Social Network ?</p>
					<button type="button" className="btn btn-danger" onClick={deletePost}>Delete</button>
				</div>
			</div>

			<div id="post-likers-modal" className="modal">
				<div className="modal-content" style={{
					width: 500
				}}>

				</div>
			</div>

			<div id="post-dislikers-modal" className="modal">
				<div className="modal-content" style={{
					width: 500
				}}>

				</div>
			</div>

			<div id="post-sharers-modal" className="modal">
				<div className="modal-content" style={{
					width: 500
				}}>

				</div>
			</div>

			<div className="modal" id="postCommentsModal">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Comments</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

						<div className="modal-body">

							<table className="table table-bordered">
								<tbody></tbody>
							</table>

							<div id="post-comments"></div>

							<form method="POST" id="form-post-comment" onSubmit={doPostComment}>
								<input type="hidden" name="_id" />
								<textarea name="comment" className="form-control emoji" required></textarea>
							</form>
						</div>

						<div className="modal-footer">
							<button type="button" className="mtr-btn" data-dismiss="modal">
								<span>Close</span>
							</button>

							<button type="submit" name="submit" form="form-post-comment" className="mtr-btn">
								<span>Post comment</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer