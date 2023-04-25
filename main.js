import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as TWEEN from "tween.js";
import { Cube } from "./cube";
import "./style.css";

/*
 * Set up
 */
const stats = new Stats();
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const CAM_Y = 3;
const CAM_Z = 10;
camera.position.y = CAM_Y;
camera.position.z = CAM_Z;
camera.lookAt(new THREE.Vector3(0, CAM_Y, 0));

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gltfLoader = new GLTFLoader();
let cubes = [];

gltfLoader.load("./test.glb", (gltf) => {
  scene.add(gltf.scene);

  gltf.scene.children.forEach((obj) => {
    cubes.push(new Cube(obj));
  });
});

const light = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(light);

/*
 * Control
 */
const body = document.getElementsByTagName("body")[0];
let isSpread = true;

body.addEventListener("click", () => {
  cubes.forEach((cube) => {
    if (isSpread) {
      cube.fit();
    } else {
      cube.spread();
    }
  });

  isSpread = !isSpread;
});

/*
 * Render
 */
let angle = -90;

const animate = () => {
  requestAnimationFrame(animate);

  angle += 0.01;
  camera.position.x = Math.cos(angle) * CAM_Z;
  camera.position.z = Math.sin(angle) * CAM_Z;
  camera.lookAt(new THREE.Vector3(0, CAM_Y, 0));

  renderer.render(scene, camera);

  stats.update();

  TWEEN.update();
};

animate();
