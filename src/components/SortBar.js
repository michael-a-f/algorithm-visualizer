import PropTypes from "prop-types";

const SortBar = ({ height, width, type }) => {
	return (
		<div
			className={type ? `sort-bar ${type}` : "sort-bar"}
			style={{ height: `${height}%`, width: `${width}%` }}
		/>
	);
};

SortBar.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	type: PropTypes.string,
};

export default SortBar;
