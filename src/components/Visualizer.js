import { useState } from "react";
import Animation from "./Animation";

const Visualizer = () => {
	const [sortingAlgorithm, setSortingAlgorithm] = useState(() => {
		return "Bubble Sort";
	});
	const [arrayLength, setArrayLength] = useState(() => {
		return 80;
	});

	const updateSlider = () => {
		let sliderComponent = document.querySelector("#myRange");
		setArrayLength(parseInt(sliderComponent.value));
	};

	const updateSelectedAlgo = (event, algoName) => {
		setSortingAlgorithm(algoName);
		// Clear existing highlight
		let selection = document
			.querySelector("#algos")
			.querySelector(".selected-algo");
		if (selection) {
			selection.className = "btn btn-primary";
		}
		event.target.className = "btn btn-primary selected-algo";
	};

	return (
		<div
			className="container d-flex flex-row flex-wrap justify-content-between"
			id="main-content"
		>
			<div className="d-flex flex-column justify-content-between" id="controls">
				<div
					className="card d-flex flex-column justify-content-between align-items-end"
					id="algos"
				>
					<button
						className="btn btn-primary selected-algo"
						onClick={(e) => updateSelectedAlgo(e, "Bubble Sort")}
					>
						Bubble Sort
					</button>
					<button
						className="btn btn-primary"
						onClick={(e) => updateSelectedAlgo(e, "Merge Sort")}
					>
						Merge Sort
					</button>
					<button
						className="btn btn-primary"
						onClick={(e) => updateSelectedAlgo(e, "Insertion Sort")}
					>
						Insertion Sort
					</button>
					<button
						className="btn btn-primary"
						onClick={(e) => updateSelectedAlgo(e, "Quick Sort")}
					>
						Quick Sort
					</button>
				</div>
				<div className="card slidebar">
					<p>Length: {arrayLength}</p>
					<div className="slidecontainer">
						<input
							type="range"
							min="4"
							max="150"
							onInput={() => updateSlider()}
							className="slider"
							id="myRange"
							value={arrayLength}
						/>
					</div>
				</div>
			</div>
			<Animation
				arrayLength={arrayLength}
				sortingAlgorithm={sortingAlgorithm}
			/>
		</div>
	);
};

export default Visualizer;
