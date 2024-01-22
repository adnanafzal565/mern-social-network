import { Link } from "react-router-dom"

const LeftSidebar = function () {
	return (
		<aside className="sidebar" style={{
			position: "sticky !important",
			top: 100
		}}>
			<div className="widget">
				<h4 className="widget-title">Shortcuts</h4>
				<ul className="naves" id="left-sidebar">
					<li>
						<i className="ti-user"></i>
						&nbsp;<Link to="/peopleNearby">People nearby</Link>
					</li>

					<li>
						<i className="ti-video-camera"></i>
						&nbsp;<Link to="/watch">Watch</Link>
					</li>

					<li>
						<i className="ti-user"></i>
						&nbsp;<Link to="/friends">
							Friends
							<span className="badge" id="friends-badge"></span>
						</Link>
					</li>

					<li>
						<i className="ti-comments-smiley"></i>
						&nbsp;<Link to="/inbox">Inbox <span className="badge" id="inbox-badge"></span></Link>
					</li>

					<li>
						<i className="ti-files"></i>
						&nbsp;<Link to="/createPage">Create page</Link>
					</li>

					<li>
						<i className="ti-magnet"></i>
						&nbsp;<Link to="/createGroup">Create group</Link>
					</li>

					<li>
						<i className="ti-bell"></i>
						&nbsp;<Link to="/notifications">
							Notifications
							<span className="badge" id="notifications-badge"></span>
						</Link>
					</li>

					<li>
						<i className="ti-calendar"></i>
						&nbsp;<Link to="/events">Events <span className="badge" id="events-badge"></span></Link>
					</li>
				</ul>
			</div>
		</aside>
	)
}

export default LeftSidebar