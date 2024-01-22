const RightSidebar = function () {
	return (
		<aside className="sidebar" style={{
			position: "sticky",
			top: 100
		}}>
			<div className="widget">
				<h4 className="widget-title">Your pages</h4>

				<div id="my-pages"></div>
			</div>
		</aside>
	)
}

export default RightSidebar