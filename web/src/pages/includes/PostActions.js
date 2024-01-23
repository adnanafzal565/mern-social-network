import usePost from "../../hooks/usePost"

function PostActions ({ data, isMyStory = false }) {
	const { toggleLikePost } = usePost()

	var isLiked = false;
	const likers = data.likers || []
	for (var b = 0; b < likers.length; b++) {
		var liker = likers[b];
		if (liker._id == window.user._id) {
			isLiked = true;
			break;
		}
	}

	var isDisliked = false;
	const dislikers = data.dislikers || []
	for (var b = 0; b < dislikers; b++) {
		var disliker = dislikers[b];
		if (disliker._id == window.user._id) {
			isDisliked = true;
			break;
		}
	}

	const comments = data.comments || []
	const shares = data.shares || []

	async function onClickToggleLikePost (_id) {
		var formData = new FormData();
		formData.append("accessToken", localStorage.getItem("accessToken"));
		formData.append("_id", _id)
		
		const response = await toggleLikePost(formData)
	}

	function onClickShowPostLikers (_id) {
		//
	}

	function onClickToggleDislikePost (_id) {
		//
	}

	function onClickShowPostDislikers (_id) {
		//
	}

	function onClickShowCommentsModal (_id) {
		//
	}

	function onClickSharePost (_id) {
		//
	}

	function onClickShareInPage (_id) {
		//
	}

	function onClickShareInGroup (_id) {
		//
	}

	function onClickShowPostShares (_id) {
		//
	}

	return (
		<div className="we-video-info">
			<ul>
				<li>
					<span className={isLiked ? "like" : "none"} onClick={onClickToggleLikePost(data._id)}>
						<i className="ti-thumb-up"></i>
					</span>

					<ins className="likers-count" onClick={onClickShowPostLikers(data._id)}>{ likers.length }</ins>
				</li>

				<li>
					<span className={isDisliked ? "like" : "none"} onClick={onClickToggleDislikePost(data._id)}>
						<i className="ti-thumb-down"></i>
					</span>

					<ins className="dislikers-count" onClick={onClickShowPostDislikers(data._id)}>{ dislikers.length }</ins>
				</li>

				<li>
					<button type="button" onClick={onClickShowCommentsModal(data._id)}
						style={{
							background: "none",
							border: "none"
						}}>
						<span className="comment" title="Comments">
							<i className="fa fa-comments-o"></i>

							<ins id={`count-post-comments-${data._id}`}>{comments.length}</ins>
						</span>
					</button>
				</li>
				
				<li>
					<span className="share" style={{
						position: 'relative',
						top: 9 
					}}>
						<div className="dropdown" style={{
							position: "relative",
							top: 20
						}}>
							<button className="dropdown-toggle" type="button" id={`dropdownShare-${data._id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
							style={{
								background: "none",
								border: "none"
							}}>
								<i className="ti-share"></i>
							</button>

							<div className="dropdown-menu" aria-labelledby={`dropdownShare-${data._id}`}>
								<a className="dropdown-item" href="#" onClick={onClickSharePost(data._id)}>Share on your timeline</a>
								<a className="dropdown-item" href="#" onClick={onClickShareInPage(data._id)}>Share on pages you manage</a>
								<a className="dropdown-item" href="#" onClick={onClickShareInGroup(data._id)}>Share in groups</a>
							</div>
						</div>

						<ins className="shares-count" onClick={onClickShowPostShares(data._id)} id={`shares-count-${data._id}`}>{ shares.length }</ins>
					</span>
				</li>

			</ul>
		</div>
	)
}

export default PostActions