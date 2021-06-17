const CallToAction = () => {
	return (
		<div className="card cta mt-5" id="sorting-is">
			<div className="card-body d-flex flex-row justify-content-around">
				<div className="left">
					<h1 className="card-title mb-2">Sorting is...</h1>
					<h4 className="card-title mb-4">
						Simple yet Complex. Everywhere yet overlooked.
					</h4>
					<p className="card-text" id="sorting-is-desc">
						In today's tech-driven, data-rich environment, optimal sorting
						algorithms are more essential than ever. But how can we use them to
						bridge the gap between software and the physical world?{" "}
						<i>
							Algorithms to Live By: The Computer Science of Human Decisions
						</i>{" "}
						dives into opportunities both big and small&#8212;from storing
						planes at the airport to pairing socks out of the dryer. The savings
						in time, money, and natural resources made possible by better
						sorting decisions will surely surprise you.
					</p>
					<a
						target="_blank"
						href="https://www.amazon.com/Algorithms-Live-Computer-Science-Decisions/dp/1250118360/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr="
						className="btn btn-primary mt-4"
						id="cta"
					>
						See it on Amazon
					</a>
				</div>

				<div className="right">
					<img
						src="../../images/book.jpg"
						alt="Algorithms to Live By"
						id="book"
					/>
				</div>
			</div>
		</div>
	);
};

export default CallToAction;
