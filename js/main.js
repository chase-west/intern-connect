//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'retro_computer';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `model/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);


//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);
//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 40 : 500;
camera.position.set(0, 1, 6.2); // Adjust the position as needed

// Create Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Create Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
directionalLight.position.set(1, 1, 1); // Set the light direction
scene.add(directionalLight);


//Render the scene
// Add a variable to track the initial animation time
let initialAnimationTime = 0;
const initialAnimationDuration = 20; // 1 second

// A flag to indicate if the initial animation is complete
let initialAnimationComplete = false;

// Inside the animate function
function animate() {
  requestAnimationFrame(animate);

  // Increase the initial animation time
  initialAnimationTime += 1;

  if (initialAnimationTime < initialAnimationDuration) {
    // Perform the initial animation here, e.g., raise the object
    object.position.z += 0.2;
    object.rotation.y += 0.08;
  } else if (!initialAnimationComplete) {
    // The initial animation is complete, stop the initial animation and start continuous animation
    initialAnimationComplete = true;
  }

  if (initialAnimationComplete) {
    // Make the computer move automatically
    if (object && objToRender === "retro_computer") {
      object.rotation.y += 0.005; // Rotate the computer
    }
  }

  renderer.render(scene, camera);
}
animate();