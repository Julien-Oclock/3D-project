import { AxesHelper, Scene, WebGLRenderer, PerspectiveCamera,Points, Mesh, BoxBufferGeometry, MeshNormalMaterial, PointsMaterial, BufferGeometry, Float32BufferAttribute, MathUtils, TextureLoader } from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'


const textureLoader = new TextureLoader();
const starTexture = textureLoader.load('/circle.svg')

// Config Scene + camera
const scene = new Scene();
//scene.add(new AxesHelper)
const camera = new PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.01, 
  1000);
camera.position.z = 2
camera.position.y = 0.5
camera.position.x = 0.5
scene.add(camera)


const count = 1000;
const distance = 2;

const point = new Float32Array(count * 3)
for(let i = 0 ; i < point.length; i++) {
  point[i] = MathUtils.randFloatSpread(distance * 2);
}


const GeoCube = new BufferGeometry();
GeoCube.setAttribute('position', new Float32BufferAttribute(point, 3))
const material = new PointsMaterial({
  //color : 0x00000,
  size : 0.05,
  map : starTexture
})
const points = new Points(GeoCube, material)




// création du Cube + ajout dans la scène
/*const cube = new Mesh(
  new BoxBufferGeometry(1, 1, 1),
  new MeshNormalMaterial()

);*/
scene.add(points)

// Config du rendu a l'ecran
const renderer = new WebGLRenderer({
  // enlever la pixelisation
  antialias : true
});
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);


// constrole de la camera avec le clic souris (pour le test)
const controls = new OrbitControls(camera, renderer.domElement)


// fonction d'update du rendu
const tick = () => {
  renderer.render(scene, camera);
  controls.update()
  //camera.lookAt(0,0,0)
  requestAnimationFrame(tick)
  
}

tick();

// on gère le resize de l'ecran
window.addEventListener('resize', ()=> {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

