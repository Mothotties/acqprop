import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Maximize2, Minimize2 } from 'lucide-react';

export function PropertyViewer3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    // House base
    const houseGeometry = new THREE.BoxGeometry(2, 2, 2);
    const houseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xD4AF37,
      flatShading: true,
    });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.castShadow = true;
    house.receiveShadow = true;
    scene.add(house);

    // Roof
    const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      flatShading: true,
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.5;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    scene.add(roof);

    // Door
    const doorGeometry = new THREE.PlaneGeometry(0.5, 1);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x4A4A4A });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, -0.5, 1.01);
    scene.add(door);

    // Windows
    const windowGeometry = new THREE.PlaneGeometry(0.4, 0.4);
    const windowMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEEB });

    // Front windows
    const frontWindow1 = new THREE.Mesh(windowGeometry, windowMaterial);
    frontWindow1.position.set(-0.5, 0.3, 1.01);
    scene.add(frontWindow1);

    const frontWindow2 = new THREE.Mesh(windowGeometry, windowMaterial);
    frontWindow2.position.set(0.5, 0.3, 1.01);
    scene.add(frontWindow2);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x90EE90,
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Card className="border-gold/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Box className="w-5 h-5" />
          3D Property Preview
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="text-gold hover:text-gold-dark hover:bg-gold-light/10"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div
          ref={mountRef}
          className={`w-full transition-all duration-300 rounded-lg overflow-hidden ${
            isFullscreen ? 'h-[80vh]' : 'h-[400px]'
          }`}
        />
      </CardContent>
    </Card>
  );
}