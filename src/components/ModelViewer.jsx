import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { FaUndo, FaSearchPlus, FaSearchMinus, FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Model({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1} />;
}

function ModelViewer({ modelUrl }) {
  const controlsRef = useRef();

  const rotateModel = (angle) => {
    if (controlsRef.current) {
      const newTarget = controlsRef.current.target.clone();
      newTarget.x += angle;
      controlsRef.current.target.copy(newTarget);
      controlsRef.current.update();
    }
  };

  const adjustZoom = (factor) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const direction = camera.position.clone().normalize(); // Direction of the camera
      const newPosition = camera.position.clone().addScaledVector(direction, factor);
      camera.position.copy(newPosition);
      controlsRef.current.update();
    }
  };

  return (
    <div className="w-full h-80 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model modelUrl={modelUrl} />

        <OrbitControls ref={controlsRef} enableZoom={true} minDistance={1.5} maxDistance={8} />
        <Environment preset="sunset" />
      </Canvas>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-black/50 p-2 rounded-lg">
        <button className="bg-cyan-500 p-3 rounded-full text-white hover:bg-cyan-400" onClick={() => rotateModel(-0.3)}>
          <FaArrowLeft size={20} />
        </button>
        <button className="bg-cyan-500 p-3 rounded-full text-white hover:bg-cyan-400" onClick={() => rotateModel(0.3)}>
          <FaArrowRight size={20} />
        </button>
        <button className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-400" onClick={() => adjustZoom(0.5)}>
          <FaSearchMinus size={20} />
        </button>
        <button className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-400" onClick={() => adjustZoom(-0.5)}>
          <FaSearchPlus size={20} />
        </button>
        <button
          className="bg-gray-500 p-3 rounded-full text-white hover:bg-gray-400"
          onClick={() => {
            if (controlsRef.current) {
              controlsRef.current.reset();
            }
          }}
        >
          <FaUndo size={20} />
        </button>
      </div>
    </div>
  );
}

export default ModelViewer;
