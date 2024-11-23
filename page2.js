import * as THREE from 'three';

let state = {
    canvas: null,
    renderer: null,
    camera: null,
    scene: null,
    cube: null
};

function createScene() {
    state.scene = new THREE.Scene();
    let light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-1, 2, 4);
    state.scene.add(light);
}

function createTorus() {
    let geometry, material, wireframe;
    geometry = new THREE.TorusGeometry(0.5, 0.2, 32, 128);
    material = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0.8, color: 0x44AA88 });
    state.cube = new THREE.Mesh(geometry, material);
    state.scene.add(state.cube);

    geometry = new THREE.WireframeGeometry(state.cube.geometry);
    material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
    wireframe = new THREE.LineSegments(geometry, material);
    state.cube.add(wireframe);
}

function createCameraAndRenderer() {
    state.canvas = document.querySelector('#app');
    state.renderer = new THREE.WebGLRenderer({ canvas: state.canvas, antialias: true });
    let aspect = window.innerWidth / window.innerHeight;
    state.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 5);
    state.camera.position.z = 2;
}

function resize() {
    let width = state.canvas.clientWidth * window.devicePixelRatio;
    let height = state.canvas.clientHeight * window.devicePixelRatio;
    state.camera.aspect = width / height;
    state.camera.updateProjectionMatrix();
    state.renderer.setPixelRatio(window.devicePixelRatio);
    state.renderer.setSize(width, height, false);
}

function render(time) {
    time *= 0.001;  // convert time to seconds
    state.cube.rotation.x = time * 0.5;
    state.cube.rotation.y = time * 0.5;
    state.renderer.render(state.scene, state.camera);
    requestAnimationFrame(render);
}

function main() {
    createCameraAndRenderer();
    createScene();
    createTorus();
    resize();
    window.addEventListener("resize", resize, false);
    requestAnimationFrame(render);
}

main();
