import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Clock } from 'three';

const loader = new GLTFLoader();
let present: THREE.Object3D;
let scene: THREE.Scene; 
let presentParent: THREE.Object3D;

let needUpdate = false;

export function createGift(canvas: HTMLCanvasElement, giftPath: string) {
    const clock = new Clock();
    presentParent = new THREE.Object3D();
    scene = new THREE.Scene();
    scene.add(presentParent);

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const light = new THREE.AmbientLight(0xffffff, 0.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 25, 25);

    scene.add(directionalLight);
    scene.add(light);

    scene.background = new THREE.Color(0x628AFF);
    

    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    loader.load(giftPath, (gltf) => {
        present = gltf.scene;
        present.scale.set(0.01, 0.01, 0.01);

        presentParent.add(present);
    });

    camera.position.z = 10;
    camera.position.y = 10

    const animate = () => {
        if (needUpdate) {
            
            needUpdate = false;
        }
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

export function createPresent(canvas: HTMLCanvasElement, giftPath: string) {
    const clock = new Clock();
    const presentParent = new THREE.Object3D();
    const scene = new THREE.Scene();
    scene.add(presentParent);

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const light = new THREE.AmbientLight(0xffffff, 0.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 25, 25);

    scene.add(directionalLight);
    scene.add(light);

    scene.background = new THREE.Color(0x628AFF);

    let present: THREE.Object3D;

    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    loader.load(giftPath, (gltf) => {
        present = gltf.scene;
        present.scale.set(0.01, 0.01, 0.01);

        presentParent.add(present);
    });

    camera.position.z = 10;
    camera.position.y = 10

    const animate = () => {
        if (needUpdate) {
            
            needUpdate = false;
        }
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

export function update(giftPath: string) {

    while (presentParent.children.length)
    {
       presentParent.remove(presentParent.children[0]);
    }

    loader.load(giftPath, (gltf) => {
        present = gltf.scene;
        present.scale.set(0.01, 0.01, 0.01);
        presentParent.add(present);
    });
    needUpdate = true;
}