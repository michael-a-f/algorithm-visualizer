import "./App.css";
import ParticleBackground from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Visualizer from "./components/Visualizer";
import CallToAction from "./components/CallToAction";
import ReadMe from "./components/ReadMe";

function App() {
	return (
		<>
			<ParticleBackground />
			<Navbar />
			<div className="container-sm d-flex flex-column mt-5 mb-4">
				<Visualizer />
				<CallToAction />
				<ReadMe />
			</div>
		</>
	);
}

export default App;
