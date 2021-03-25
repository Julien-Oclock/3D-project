import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader'
import './style.css'


// Variable setup
let scene, camera, renderer, container, house


const init =() => {

    
    container = document.querySelector('.scene');

    // create scene
    scene = new THREE.Scene();

    const fov = 35
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    //renderer
    renderer = new THREE.WebGLRenderer({antialias: true, alpha : true});
    renderer.setSize(container.clientWidth , container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio)

    container.appendChild(renderer.domElement);

    // camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-5, 3, 15);

    const ambient = new AmbientLight(0x404040, 1);
    scene.add(ambient)

    
    
    const light = new THREE.DirectionalLight(0xffffff, 3)
    light.position.set(10,10,50)
    scene.add(light);

    // load model
    let loader = new THREE.GLTFLoader()
    loader.load('./3d/scene.gltf', function(gltf){
        scene.add(gltf.scene)
        house = gltf.scene.children[0];
        animate()
    });


}

const animate = () => {
    requestAnimationFrame(animate)
    house.rotation.z += 0.04;
    renderer.render(scene, camera)
}

init()

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', onWindowResize, false)

