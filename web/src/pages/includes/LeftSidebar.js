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
						&nbsp;<Link to="/PeopleNearby">People nearby</Link>
					</li>

					<li>
						<i className="ti-video-camera"></i>
						&nbsp;<Link to="/Watch">Watch</Link>
					</li>

					<li>
						<i className="ti-user"></i>
						&nbsp;<Link to="/Friends">
							Friends
							<span className="badge" id="friends-badge"></span>
						</Link>
					</li>

					<li>
						<i className="ti-comments-smiley"></i>
						&nbsp;<Link to="/Inbox">Inbox <span className="badge" id="inbox-badge"></span></Link>
					</li>

					<li>
						<i className="ti-files"></i>
						&nbsp;<Link to="/CreatePage">Create page</Link>
					</li>

					<li>
						<i className="ti-magnet"></i>
						&nbsp;<Link to="/CreateGroup">Create group</Link>
					</li>

					<li>
						<i className="ti-bell"></i>
						&nbsp;<Link to="/Notifications">
							Notifications
							<span className="badge" id="notifications-badge"></span>
						</Link>
					</li>

					<li>
						<i className="ti-calendar"></i>
						&nbsp;<Link to="/Events">Events <span className="badge" id="events-badge"></span></Link>
					</li>
				</ul>
			</div>
		</aside>
	)
}

export default LeftSidebar