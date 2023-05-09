var container = document.getElementById('container');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

var loader = new THREE.TextureLoader();
var texture1 = loader.load('image1.png');
var texture2 = loader.load('image2.png');
var texture3 = loader.load('image3.png');
var texture4 = loader.load('image4.png');
var texture5 = loader.load('image5.png');
var texture6 = loader.load('image6.png');

var materials = [
  new THREE.MeshPhongMaterial({ map: texture1, side: THREE.FrontSide }),
  new THREE.MeshPhongMaterial({ map: texture2, side: THREE.BackSide }),
  new THREE.MeshPhongMaterial({ map: texture3, side: THREE.DoubleSide }),
  new THREE.MeshPhongMaterial({ map: texture4, side: THREE.DoubleSide }),
  new THREE.MeshPhongMaterial({ map: texture5, side: THREE.DoubleSide }),
  new THREE.MeshPhongMaterial({ map: texture6, side: THREE.DoubleSide }),
];

var geometry = new THREE.BoxGeometry(1, 1, 1);
var cube = new THREE.Mesh(geometry, materials);
cube.scale.set(4, 4, 4);
scene.add(cube);

var edges = new THREE.EdgesGeometry(geometry);
var edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00FFFF, linewidth: 3 });
var edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
cube.add(edgesMesh);

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 5, 10);
scene.add(light);

camera.position.z = 7;

var slider = document.getElementById("slider");
slider.addEventListener("input", function () {
  edgesMaterial.linewidth = this.value;
});

var sizeInput = document.getElementById("size");
sizeInput.addEventListener("input", function () {
  var size = parseFloat(this.value);
  var maxSize = 5;
  var minSize = 0.5;
  var scale = (size / 100) * (maxSize - minSize) + minSize;
  cube.scale.set(scale, scale, scale);
});

function getNormalizedMousePos(event) {
  var mouseX = event.clientX - window.innerWidth / 2;
  var mouseY = event.clientY - window.innerHeight / 2;
  return { x: mouseX, y: mouseY };
}

function getNormalizedTouchPos(event) {
  var touch = event.touches[0];
  var touchX = touch.clientX - window.innerWidth / 2;
  var touchY = touch.clientY - window.innerHeight / 2;
  return { x: touchX, y: touchY };
}

function updateCubeRotation(pos) {
  cube.rotation.x = pos.y * 0.005;
  cube.rotation.y = pos.x * 0.005;
}

document.addEventListener("mousemove", function (event) {
  var pos = getNormalizedMousePos(event);
  updateCubeRotation(pos);
});

document.addEventListener("touchmove", function (event) {
  var pos = getNormalizedTouchPos(event);
  updateCubeRotation(pos);
  event.preventDefault();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();






