var container = document.getElementById('container');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({alpha: true});
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
  new THREE.MeshPhongMaterial({map: texture1, side: THREE.FrontSide}),  // cara frontal
  new THREE.MeshPhongMaterial({map: texture2, side: THREE.BackSide}),   // cara trasera
  new THREE.MeshPhongMaterial({map: texture3, side: THREE.DoubleSide}), // cara superior
  new THREE.MeshPhongMaterial({map: texture4, side: THREE.DoubleSide}), // cara inferior
  new THREE.MeshPhongMaterial({map: texture5, side: THREE.DoubleSide}), // cara izquierda
  new THREE.MeshPhongMaterial({map: texture6, side: THREE.DoubleSide})  // cara derecha
];

var geometry = new THREE.BoxGeometry(1, 1, 1);
var cube = new THREE.Mesh(geometry, materials);
cube.scale.set(4, 4, 4); // establecer la escala del cubo en 3
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
slider.addEventListener("input", function() {
  edgesMaterial.linewidth = this.value;
});

var sizeInput = document.getElementById("size");
sizeInput.addEventListener("input", function() {
  var size = parseFloat(this.value);
  var maxSize = 5;
  var minSize = 0.5;
  var scale = (size / 100) * (maxSize - minSize) + minSize;
  cube.scale.set(scale, scale, scale);
});

function animate() {
  requestAnimationFrame(animate);

  document.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX - window.innerWidth/2;
    var mouseY = event.clientY - window.innerHeight/2;

    cube.rotation.x = mouseY * 0.005;
    cube.rotation.y = mouseX * 0.005;
  });

  renderer.render(scene, camera);
}

animate();









