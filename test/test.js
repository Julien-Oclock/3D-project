

import { BoxGeometry, Camera, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

let scene, camera, renderer, cube;
const init = () => {

    scene = new Scene();

    camera = new PerspectiveCamera(
        75, 
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );




    renderer = new WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const geometry = new BoxGeometry( 2, 2, 2 );
    const texture = new TextureLoader().load('/water.jpg')
    const material = new MeshBasicMaterial( {map : texture} );
    
    cube = new Mesh( geometry, material );
    scene.add( cube );


    camera.position.z = 5
}

const animate = () => {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}

const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', onWindowResize, false)
init();
animate();

// on gère le resize de l'ecran
