import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Clock } from 'three';

export function createGift(canvas: HTMLCanvasElement, giftPath: string) {
    const clock = new Clock();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true});
    renderer.setSize(canvas.width, canvas.height);

    const light = new THREE.AmbientLight(0xffffff, 0.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 25, 25);

    scene.add(directionalLight);
    scene.add(light);

    scene.background = new THREE.Color(0x628AFF);
    
    const loader = new GLTFLoader();

    let present: THREE.Object3D;

    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    loader.load(giftPath, (gltf) => {
        present = gltf.scene;
        present.scale.set(0.01, 0.01, 0.01);

        scene.add(present);
    });

    camera.position.z = 10;
    camera.position.y = 10


    const animate = () => {
        const deltaTime = clock.getDelta();
        if (present == undefined) {requestAnimationFrame(animate); return;}

        if (present.scale.x < 2.5) {
            scalePresent(deltaTime);
        }
        
        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) resize();

        present.rotateY(deltaTime * 0.5);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        controls.update();
    };

    const scaleIncrement = 1.5;
    
    function scalePresent(deltaTime: number) {
        const newScale = present.scale.x + scaleIncrement * deltaTime;
        present.scale.set(newScale, newScale, newScale);
    }
    
    animate();

    function resize() {
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.width, canvas.height);
    }
}