import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Mesh } from 'three';

// const snowScatterBoxSize = 150;
// const numberOfSnow = 100;
// const snowStartingHeight = 100;
// const groundHeight = -5;

// function createSnow(scene: THREE.Scene) {
//     const [x, z] = Array(2).fill(0).map(() => THREE.MathUtils.randFloatSpread(snowScatterBoxSize));
//     const y = THREE.MathUtils.randFloat(groundHeight, snowStartingHeight);

//     console.log(x, y, z);
    
//     const geo = new THREE.SphereGeometry(0.5, 25, 25);
//     const mat = new THREE.MeshStandardMaterial( {emissive: 0xffffff, color: 0xffffff, emissiveIntensity: 1});
  
//     const snowflake = new THREE.Mesh(geo, mat);
//     snowflake.position.set(x, y, z);
//     scene.add(snowflake);
  
//     return snowflake;
// }


// export function createScene(canvas: HTMLCanvasElement) {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
//     const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     const clock = new THREE.Clock();

//     const light = new THREE.AmbientLight(0xffffff, 0.2);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(10, 25, 25);

//     const controls = new OrbitControls(camera, renderer.domElement);

//     scene.add(directionalLight);
//     scene.add(light);

//     function resize(width: number, height: number) {
//         camera.aspect = width / height;
//         renderer.setSize(width, height);
//         camera.updateProjectionMatrix();
//     }

//     const planeGeo = new THREE.BoxGeometry(150, 150, 150);
//     const planeMat = new THREE.MeshBasicMaterial({
//         color: 0xffffff,

//     })
//     const plane = new THREE.Mesh(planeGeo, planeMat);

//     console.log('PALNE POS', plane.position)
//     scene.add(plane);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(ambientLight);
//     scene.background = new THREE.Color(0x628AFF)
//     const snow = Array(numberOfSnow).fill(0).map(() => createSnow(scene));

//     function animate() {
//         console.log(controls.update());

//         const deltaTime = clock.getDelta();
//         snow.forEach(s => {
//             s.position.y -= deltaTime * 10;
//             if (s.position.y < groundHeight) {
//                 s.position.y = snowStartingHeight;
//             }
//         });

//         renderer.render(scene, camera);

//         requestAnimationFrame(animate);
//     }


//     window.addEventListener('resize', () => {
//         resize(window.innerWidth, window.innerHeight);
//     });

//     animate();
// }

const snowScatterBoxSize = 150;
const numberOfSnow = 100;
const snowStartingHeight = 100;
const groundHeight = -5;

function createSnow(scene: THREE.Scene) {
    const [x, z] = Array(2).fill(0).map(() => THREE.MathUtils.randFloatSpread(snowScatterBoxSize));
    const y = THREE.MathUtils.randFloat(groundHeight, snowStartingHeight);

    console.log(x, y, z);
    
    const geo = new THREE.SphereGeometry(0.5, 25, 25);
    const mat = new THREE.MeshStandardMaterial( {emissive: 0xffffff, color: 0xffffff, emissiveIntensity: 1});
  
    const snowflake = new THREE.Mesh(geo, mat);
    snowflake.position.set(x, y, z);
    scene.add(snowflake);
  
    return snowflake;
}

export function createScene(canvas: HTMLCanvasElement) {
    const clock = new THREE.Clock();

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
    loader.load("/present.glb", (gltf) => {
        present = gltf.scene;
        present.scale.set(0.01, 0.01, 0.01);

        scene.add(present);
    });

    camera.position.z = 10;
    camera.position.y = 10

    resize();
    const snow = Array(numberOfSnow).fill(0).map(() => createSnow(scene));

    const animate = () => {
        const deltaTime = clock.getDelta();
        if (present == undefined) {requestAnimationFrame(animate); return;}

        if (present.scale.x < 2.5) {
            scalePresent(deltaTime);
        }

        snow.forEach(s => {
            s.position.y -= deltaTime * 10;
            if (s.position.y < groundHeight) {
                s.position.y = snowStartingHeight;
            }
        });

        present.rotateY(deltaTime);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        controls.update();
        console.log(camera.position)
    };

    const scaleIncrement = 1.5;
    
    function scalePresent(deltaTime: number) {
        const newScale = present.scale.x + scaleIncrement * deltaTime;
        present.scale.set(newScale, newScale, newScale);
    }
    
    animate();

    function resize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
