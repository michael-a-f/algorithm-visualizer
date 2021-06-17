import PropTypes from "prop-types";
import SortBar from "./SortBar";
import { useEffect, useState } from "react";

const Animation = ({ arrayLength, sortingAlgorithm }) => {
	const [isVisualizing, setIsVisualizing] = useState(false);
	const [isArraySorted, setIsArraySorted] = useState(false);
	const [sortSpeed, setSortSpeed] = useState(8000);

	// Return an array of length arrayLength of random integers 1-100.
	const generateRandomArr = () => {
		let randomArr = [];
		for (let i = 0; i < arrayLength; i++) {
			let numToAdd = Math.floor(Math.random() * 100) + 1;
			randomArr.push(numToAdd);
		}
		return randomArr;
	};

	// Take the array of random integers and store it as a property of 'frame'.
	// A frame object has properties...
	//
	// array: the array at that frame, can be sorted or unsorted.
	// animations: an object with properties that specify the CSS classname
	//             to use for the animation, and value equal to the index.
	//
	// Ex: The frame below tells us the array for that frame and that
	//     indices 1, 2, and 4 should all have a distinct CSS styling.
	// {
	//     array: [1,2,3,4,5],
	//     animations: {
	//              lo: 1,
	//         current: 2,
	//              hi: 4,
	//     }
	// }
	const generateNewFrame = (length) => {
		let newArray = generateRandomArr(length);
		let frame = {
			array: newArray,
			animations: {
				current: null,
			},
		};

		return frame;
	};

	// State Variable for the frame object currently displayed.
	const [currentFrame, setCurrentFrame] = useState(() => {
		return generateNewFrame(arrayLength);
	});

	const [rememberedArray, setRememberedArray] = useState(() => {
		return currentFrame;
	});

	// The slider changes the arrayLength state variable, and when that changes
	// we want to also generate a new array with the new length.
	useEffect(() => {
		setCurrentFrame(generateNewFrame(arrayLength));
		setIsArraySorted(false);
	}, [arrayLength]);

	// Utility function to add a frame to the array of frame objects.
	const addFrame = (framesArray, array, animationObject) => {
		framesArray.push({
			array: array,
			animations: animationObject,
		});
	};

	// Helper function to take in an array and two indices and swap both.
	// Depending on the algo, can use in-place swap with destructuring but
	// for the sake of consistency I will use this.
	function swap(items, leftIndex, rightIndex) {
		let temp = items[leftIndex];
		items[leftIndex] = items[rightIndex];
		items[rightIndex] = temp;
	}

	// Runs insertion sort algorithm on an array and pushes a new frame object
	// with the updated array and animations each time the array changes.
	function insertionSort(array, frames) {
		let arrayLen = array.length;
		for (let currentIdx = 1; currentIdx < arrayLen; currentIdx++) {
			let currentVal = array[currentIdx];
			let prevIdx = currentIdx - 1;
			if (prevIdx > -1 && currentVal < array[prevIdx]) {
				addFrame(frames, [...array], { current: currentIdx });
			}
			while (prevIdx > -1 && currentVal < array[prevIdx]) {
				swap(array, prevIdx, currentIdx);
				addFrame(frames, [...array], { current: prevIdx });
				currentIdx--;
				prevIdx--;
			}
		}
	}

	// Runs bubble sort algorithm on an array and pushes a new frame object
	// with the updated array and animations each time the array changes.
	const bubbleSort = (array, frames) => {
		let sorted = false;
		let fullTraversals = 0;
		while (!sorted) {
			let swapCounter = 0;
			// A full traversal of the array leaves the last element sorted.
			// Subsequent traversals need not touch that last index anymore.
			let endIndex = array.length - 1 - fullTraversals;
			addFrame(frames, [...array], { current: 0 });
			for (let i = 0; i < endIndex; i++) {
				if (array[i] > array[i + 1]) {
					swapCounter++;
					swap(array, i, i + 1);
				}
				addFrame(frames, [...array], { current: i + 1 });
			}
			fullTraversals++;
			// We know the array is sorted when a full traversal makes no swaps.
			if (swapCounter === 0) {
				sorted = true;
			}
		}
	};

	function partition(array, left, right, frames) {
		let pivotIndex = Math.floor((right + left) / 2);
		let pivot = array[pivotIndex]; //middle element
		let i = left; //left pointer
		let j = right; //right pointer
		addFrame(frames, [...array], { quickLo: i, pivot: pivotIndex, quickHi: j });
		while (i <= j) {
			while (array[i] < pivot) {
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
				i++;
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
			}
			while (array[j] > pivot) {
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
				j--;
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
			}
			if (i <= j) {
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
				swap(array, i, j);
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
				i++;
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
				j--;
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
			} else {
				addFrame(frames, [...array], {
					quickLo: i,
					pivot: pivotIndex,
					quickHi: j,
				});
			}
		}
		return i;
	}

	// Runs quick sort algorithm on an array and pushes a frame object
	// with the updated array and animations into the frames array at each swap.
	function quickSort(array, left, right, frames) {
		let index;
		if (array.length > 1) {
			index = partition(array, left, right, frames);
			if (left < index - 1) {
				quickSort(array, left, index - 1, frames);
			}
			if (index < right) {
				quickSort(array, index, right, frames);
			}
		}
		return array;
	}

	// Helper for Merge Sort.
	function merge(leftArrInfo, rightArrInfo, currentArr, frames) {
		// Subarray indices.
		let leftStartIdx = leftArrInfo[0];
		let leftEndIdx = leftArrInfo[1];
		let rightEndIdx = rightArrInfo[1];

		// Subarrays
		let leftSubarray = [...leftArrInfo[2]];
		let rightSubarray = [...rightArrInfo[2]];

		// The array at any given time can be partitioned into...
		// A sorted tail on the left (visited and merged).
		// The subarrays being merged.
		// The unmerged, unsorted, unvisited right tail.
		let sortedLeftTail = currentArr.slice(0, leftStartIdx);
		let unsortedRightTail = currentArr.slice(rightEndIdx + 1);

		// Variables to be used in 'swapping' during the merge.
		let first;
		let runningMinimums = [];
		let mergedSubarrays = [];
		let tempFullArray;

		// Variables to be used in keeping track of animations.
		let leftCounter = leftStartIdx;
		let currentCounter = leftEndIdx;

		// While left and right are not empty, look at left and right, use the smallest, and remove it.
		while (leftSubarray.length && rightSubarray.length) {
			if (leftSubarray[0] < rightSubarray[0]) {
				// Add the smallest to the merged subarray and remove from partition.
				first = leftSubarray.splice(0, 1);
				runningMinimums.push(...first);
				// Concatenate the merged with left and right to cover the cases
				// where only one is empty and the loop breaks. Will be sorted.
				mergedSubarrays = [
					...runningMinimums,
					...leftSubarray,
					...rightSubarray,
				];
				// The array at this state is the sorted portion, the merged portion plus left/right, and the unsorted tail.
				tempFullArray = [
					...sortedLeftTail,
					...mergedSubarrays,
					...unsortedRightTail,
				];
				addFrame(frames, tempFullArray, {
					quickLo: leftCounter++,
					current: currentCounter,
					quickHi: rightEndIdx,
				});
			} else {
				// Add the smallest to the merged subarray and remove from partition.
				first = rightSubarray.splice(0, 1);
				runningMinimums.push(...first);
				// Concatenate the merged with left and right to cover the cases
				// where only one is empty and the loop breaks. Will be sorted.
				mergedSubarrays = [
					...runningMinimums,
					...leftSubarray,
					...rightSubarray,
				];
				tempFullArray = [
					...sortedLeftTail,
					...mergedSubarrays,
					...unsortedRightTail,
				];
				addFrame(frames, tempFullArray, {
					quickLo: leftCounter++,
					current: currentCounter++,
					quickHi: rightEndIdx,
				});
			}
		}
		// Takes the helper array and inserts the merged subarray in place of the unsorted subarrays.
		currentArr.splice(leftStartIdx, mergedSubarrays.length, ...mergedSubarrays);
		return [leftStartIdx, rightEndIdx, [...mergedSubarrays], [...currentArr]];
	}

	function mergeSort(array, startIdx, endIdx, frames, helperArray) {
		let midpoint;
		if (endIdx - startIdx === 1) {
			midpoint = startIdx;
			addFrame(frames, [...helperArray], {
				quickLo: startIdx,
				current: midpoint,
				quickHi: endIdx,
			});
		} else {
			midpoint = Math.floor((startIdx + endIdx) / 2);
			addFrame(frames, [...helperArray], {
				quickLo: startIdx,
				current: midpoint,
				quickHi: endIdx,
			});
		}

		// Base case is calling mergeSort(x,x) meaning the startIdx and endIdx
		// are the same ie the subarray to sort is one element, which is by
		// default already sorted.
		if (startIdx === endIdx) {
			return [startIdx, endIdx, [array[startIdx]], [...array]];
		}

		return merge(
			mergeSort(array, startIdx, midpoint, frames, helperArray),
			mergeSort(array, midpoint + 1, endIdx, frames, helperArray),
			helperArray,
			frames
		);
	}

	// Function which runs at button press to 'Visualize Sort'.
	const sort = () => {
		if (isArraySorted) {
			return;
		} else {
			if (!isVisualizing) {
				setRememberedArray(currentFrame);
				setIsVisualizing(true);
				let array = [...currentFrame.array];
				let frames = [];
				switch (sortingAlgorithm) {
					case "Bubble Sort":
						bubbleSort(array, frames);
						break;
					case "Merge Sort":
						let helperArray = [...array];
						mergeSort(array, 0, array.length - 1, frames, helperArray);
						break;
					case "Insertion Sort":
						insertionSort(array, frames);
						break;
					case "Quick Sort":
						quickSort(array, 0, array.length - 1, frames);
						break;
					default:
						return;
				}

				// frames array will be populated with frame objects here.
				// Interval calculated as the larger of 5ms and the ms value
				// that would make the sort take 'sortSpeed' state variable ms.
				for (let i = 0; i < frames.length; i++) {
					setTimeout(() => {
						setCurrentFrame(frames[i]);
						if (i === frames.length - 1) {
							setIsVisualizing(false);
							setIsArraySorted(true);
						}
					}, i * Math.max(sortSpeed / frames.length, 5));
				}
			}
		}
	};

	// If the array is sorted, the button is a Reset
	const resetArray = () => {
		if (isArraySorted) {
			setCurrentFrame(() => {
				return rememberedArray;
			});
		} else {
			setCurrentFrame(() => {
				return generateNewFrame(arrayLength);
			});
		}
		setIsArraySorted(false);
	};

	// When a sort completes, the state boolean sets to true, which re-renders
	// the frame, except every element is now given a type of 'sorted'
	useEffect(() => {
		setCurrentFrame({
			array: [...currentFrame.array],
			animations: {},
		});
	}, [isArraySorted]);

	return (
		<div className="card" id="vis-card">
			<div className="card-body" id="visualizer">
				{currentFrame.array.map((element, index) => (
					<SortBar
						// Using index here since array length constant throughout sort.
						// Performance boost over using nanoid() since virtual DOM
						// only updates components that changed between frames rather
						// than updating every component at each render.
						key={index}
						height={element}
						width={100 / arrayLength}
						type={
							index === currentFrame.animations.current
								? "current"
								: index === currentFrame.animations.swappedWith
								? "swapped"
								: index === currentFrame.animations.pivot
								? "pivot"
								: index === currentFrame.animations.quickLo
								? "quickLo"
								: index === currentFrame.animations.quickHi
								? "quickHi"
								: isArraySorted
								? "sorted"
								: ""
						}
					/>
				))}
			</div>
			<div className="card-footer d-flex flex-row justify-content-between">
				<div
					className="btn-group"
					role="group"
					aria-label="Basic radio toggle button group"
				>
					<input
						type="radio"
						className="btn-check"
						name="btnradio"
						id="btnradio1"
						autoComplete="off"
						onClick={() => setSortSpeed(12000)}
					/>
					<label className="speeds btn btn-outline-primary" htmlFor="btnradio1">
						Slow
					</label>

					<input
						type="radio"
						className="btn-check"
						name="btnradio"
						id="btnradio2"
						autoComplete="off"
						onClick={() => setSortSpeed(7000)}
						defaultChecked
					/>
					<label className="speeds btn btn-outline-primary" htmlFor="btnradio2">
						Normal
					</label>

					<input
						type="radio"
						className="btn-check"
						name="btnradio"
						id="btnradio3"
						autoComplete="off"
						onClick={() => setSortSpeed(3000)}
					/>
					<label className="speeds btn btn-outline-primary" htmlFor="btnradio3">
						Fast
					</label>
				</div>

				<button
					className="btn btn-primary run-visualization"
					onClick={() => sort()}
				>
					{isVisualizing ? "Visualizing..." : `Visualize ${sortingAlgorithm}!`}
				</button>
				<button className="btn btn-primary reset" onClick={() => resetArray()}>
					{isArraySorted ? `Reset Array` : `Generate New Array`}
				</button>
			</div>
		</div>
	);
};

Animation.propTypes = {
	arrayLength: PropTypes.number,
	sortingAlgorithm: PropTypes.string,
};

export default Animation;
