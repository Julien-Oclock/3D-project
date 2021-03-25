import { AxesHelper, Scene, WebGLRenderer, PerspectiveCamera,Points, Mesh, BoxBufferGeometry, MeshNormalMaterial, PointsMaterial, BufferGeometry, Float32BufferAttribute, MathUtils, TextureLoader, MeshBasicMaterial, BoxGeometry, BackSide } from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

let scene, camera, renderer;

const init = () => {

  const container = document.querySelector('.scene');


  scene = new Scene();

  camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
  camera.position.set(-900,-200,-900);

  renderer = new WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  

  let materialArray = [];
  let texture_ft = new TextureLoader().load('/Bridge/negz.jpg')
  let texture_bk = new TextureLoader().load('/Bridge/posz.jpg')
  let texture_up = new TextureLoader().load('/Bridge/posy.jpg')
  let texture_dn = new TextureLoader().load('/Bridge/negy.jpg')
  let texture_rt = new TextureLoader().load('/Bridge/posx.jpg')
  let texture_lf = new TextureLoader().load('/Bridge/negx.jpg')

  materialArray.push( new MeshBasicMaterial({map : texture_ft}))
  materialArray.push( new MeshBasicMaterial({map : texture_bk}))
  materialArray.push( new MeshBasicMaterial({map : texture_up}))
  materialArray.push( new MeshBasicMaterial({map : texture_dn}))
  materialArray.push( new MeshBasicMaterial({map : texture_rt}))
  materialArray.push( new MeshBasicMaterial({map : texture_lf}))

  for( let i = 0; i < 6; i++){
    materialArray[i].side = BackSide;
  }

  let skyBoxGeo = new BoxGeometry(10000,10000, 10000)
  let skybox = new Mesh(skyBoxGeo, materialArray);
  scene.add(skybox);
  tick();
  animate();
};

const tick = () => {

  const controls = new OrbitControls(camera, renderer.domElement)
  renderer.render(scene, camera);
  controls.update()
  //camera.lookAt(0,0,0)
  requestAnimationFrame(tick)
  
}

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

init()