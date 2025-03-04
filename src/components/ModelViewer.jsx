import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function Model({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1} />;
}

function ModelViewer({ modelUrl }) {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model modelUrl={modelUrl} />
        <OrbitControls enableZoom={true} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

export default ModelViewer;
