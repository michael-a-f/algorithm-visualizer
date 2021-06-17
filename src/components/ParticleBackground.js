import Particles from "react-tsparticles";
import particlesConfig from "../particles.json";

const ParticleBackground = () => {
	return (
		<Particles
			params={particlesConfig}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: -1,
			}}
		/>
	);
};

export default ParticleBackground;
