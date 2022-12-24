import * as Three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Mesh } from 'three';

const snowScatterBoxSize = 200;
const numberOfSnow = 250;
const snowStartingHeight = 100;
const groundHeight = -5;

const loader = new GLTFLoader();

// class Scene {
//     clock: Three.Clock;
//     camera: Three.PerspectiveCamera;
//     renderer: Three.WebGLRenderer;
//     scene: Three.Scene;

//     constructor(canvas: HTMLCanvasElement) {
        
//     }

//     init () {

//     }
// }
// async function loadModel(path: string) {
//     loader.loadAsync(path, (gltf) => {
//         return gltf;
//     });

// }
function createSnow(scene: Three.Scene) {
    const [x, z] = Array(2).fill(0).map(() => Three.MathUtils.randFloatSpread(snowScatterBoxSize));
    const y = Three.MathUtils.randFloat(groundHeight, snowStartingHeight);

    console.log(x, y, z);
    
    const geo = new Three.SphereGeometry(0.5, 25, 25);
    const mat = new Three.MeshStandardMaterial( {emissive: 0xffffff, color: 0xffffff, emissiveIntensity: 1});
  
    const snowflake = new Three.Mesh(geo, mat);
    snowflake.position.set(x, y, z);
    scene.add(snowflake);
  
    return snowflake;
}

export function createScene(canvas: HTMLCanvasElement) {
    const clock = new Three.Clock();

    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    const renderer = new Three.WebGLRenderer({ canvas: canvas, antialias: true});
    renderer.setSize(canvas.width, canvas.height);

    const light = new Three.AmbientLight(0xffffff, 0.2);
    const directionalLight = new Three.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 25, 25);
    scene.fog = new Three.FogExp2(0x93CDE4, 0.025);
    scene.add(directionalLight);
    scene.add(light);

    scene.background = new Three.Color(0x628AFF);

    const controls = new OrbitControls(camera, canvas);


    camera.position.z = -snowScatterBoxSize / 2;
    camera.position.y = 10;
    

    resize();
    const snow = Array(numberOfSnow).fill(0).map(() => createSnow(scene));

    const groundGeo = new Three.PlaneGeometry(snowScatterBoxSize + 150, snowScatterBoxSize);
    const groundMat = new Three.MeshToonMaterial({
        color: 0xffffff
    });
    const ground = new Mesh(groundGeo, groundMat);
    ground.rotateX(-Math.PI / 2);
    scene.add(ground);

    const animate = () => {
        const deltaTime = clock.getDelta();
        console.log(1 / deltaTime);

        snow.forEach(s => {
            s.position.y -= deltaTime * 10;
            if (s.position.y < groundHeight) {
                s.position.y = snowStartingHeight;
            }
        });

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    
    animate();

    function resize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', resize);
}
