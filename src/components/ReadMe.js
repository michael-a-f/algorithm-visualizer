const ReadMe = () => {
	return (
		<>
			<div className="card readme mt-5">
				<div className="card-header">My Approach</div>
				<div className="card-body">
					<p className="card-text">
						The parameters for each sorting function include an array to sort,
						and an empty array to hold 'frame' objects. I define a frame as an
						object having properties for the array and its animations at a given
						time, which is itself an object having properties for the type of
						animation and the index/indices to which it applies.
					</p>
					<p className="card-text">
						When the 'Visualize' button is clicked, the program runs the
						selected algorithm on the frame currently held in local state. This
						populates an array with a frame for each step of the algorithm. Then
						I iterate over every frame and set a timeout to save it as the state
						value and because React re-renders the component with every state
						change, I am essentially creating a stop-motion picture which the
						user can select how long each frame stays on the screen i.e. the
						sorting speed.
					</p>
					<p className="card-text">
						I like this approach because it is logical and modular. Adding more
						sorting algorithms to visualize would be straightforward and I
						should be able to handle pathfinding in the same manner. Also, this
						approach utilizes the advantage of React's Virtual DOM and only
						updates the elements that change between frames. For large arrays,
						this boosts performance significantly compared to re-rendering every
						array element with each new frame.
					</p>
				</div>
			</div>

			<div className="card readme mt-5">
				<div className="card-header">I learned...</div>
				<div className="card-body">
					<p className="card-title">The basics of React</p>
					<p className="card-text">
						Props, state, hooks, React Dev Tools, thinking in terms of
						components, the benefit to scalability/modularity/project structure
						from using a JS framework/library.
					</p>
					<p className="card-title">UI design is hard</p>
					<p className="card-text">
						Creating a UI that is intuitive, responsive, consistent, and looks
						good is extremely difficult. Bootstrap helps a ton but you still
						have to consider contrasts, whitespace, scale, visual hierarchy,
						typography, accessibility, and many other factors that I am yet to
						learn&#8212; even the idea of a 'Call to Action' container is
						something that I've seen thousands of times yet never thought about.
						Overall I really enjoy improving my design skills and find it to be
						a refreshing change of pace from back-end work. Plus the feeling
						when the front and back-end start to come together as you envision
						is nothing short of a rush.
					</p>
					<p className="card-title">Better debugging</p>
					<p className="card-text">
						The recursion in Quick Sort and Merge Sort was tricky for me. I
						spent countless hours using the console, chrome dev tools, the
						terminal, and even good ole pen and paper (iPad and Apple Pencil)
						fixing bugs. A common issue I ran into was not using a spread/sliced
						copy of an array when I should have been.
					</p>
					<p className="card-title">
						The importance of solving the problem at a high level before writing
						a single line of code
					</p>
					<p className="card-text">
						My initial approach involved me spinning my wheels for a good week
						and a half trying to set timeouts/intervals to modify state
						variables inside of the sorting functions directly. And although I
						was able to visualize Bubble Sort and Insertion Sort using this
						method, it was messy and would have created a lot of scope issues in
						the more complex Merge and Quick Sort. Once I had a better
						understanding of hooks and state, I reworked my approach to its
						current form, and from there I was able to knock out Quick Sort and
						Merge Sort in ~10 hours.
					</p>
				</div>
			</div>

			<div className="card readme mt-5 mb-5">
				<div className="card-header">What's next...</div>
				<div className="card-body">
					<p className="card-title">
						Get better at using Git for version control.
					</p>
					<p className="card-text">
						As the designer, PM, and engineer all wrapped into one, setting a
						product backlog that balances productivity with self-learning with
						creating a good product is tough. Becoming more fluent/consistent
						with Git would force me to think about workflow in more focused and
						manageable commits. Plus its simply best practice to do so.
					</p>
					<p className="card-title">More robust testing</p>
					<p className="card-text">
						So far my main focus has been on demonstrating that I can work
						through ambiguity and build things in a sensible way without
						hand-holding. However a huge portion of sensible engineering and a
						crucial support role for any Junior Dev is robust testing. I plan on
						exploring Jasmine/Jest/Mocha, brushing up on unit testing (I
						remember using Java's JUnit AssertEquals for a course in college),
						and integrating such practices in future projects.
					</p>
					<p className="card-title">Pathfinding</p>
					<p className="card-text">
						For the sake of getting a project up and running, I've left the
						Pathfinding feature as a work-in-progress. I should be able to
						tackle it in a similar fashion as sorting, using a randomized grid
						instead of an array, and will look into the biggest algorithms--
						Dijkstra's, BFS, DFS, and A*. At this point I think I will first
						grind some of these common interview questions and then revisit this
						project with both a clearer product vision and more interview
						readiness.
					</p>
					<p className="card-title">
						Keep breaching the surface of JS frameworks/libraries
					</p>
					<p className="card-text">
						The React vs. Angular debate now reminds me of my experiences with
						Flask vs. Django. Faced with the choice of learning either, I
						decided to learn Flask first because I incorrectly assumed
						'lightweight' and 'minimal' meant beginner friendly. I dug into the
						docs and created a completely server side, online survey website
						featuring user authentication, sessions, and an ORM for a fairly
						intermediate SQL schema. And it wasn't until a month or two later
						that I looked at Django and saw its more full-featured
						out-of-the-box structure which I found far more beginner friendly. I
						can see how an experienced developer might benefit from a lack of
						imposed structure and look down upon a more rigid framework, but as
						a new developer I think an opinionated structure is far better for
						learning. Then once you have a solid understanding, you can "loosen
						the reigns" and start utilizing the flexibility of a more
						lightweight alternative. So now, faced with the React vs. Angular
						decision, I am leaning heavily towards Angular and its
						boilerplate/project structure, MVC design pattern, routing, and
						state management. Then, after digging into these in a
						'one-stop-shop', I can jump back into React and relevant packages
						with a stronger understanding of the fundamentals at play.
					</p>
				</div>
			</div>
		</>
	);
};

export default ReadMe;
