import * as THREE from 'three';

let state = {
    canvas: null,
    renderer: null,
    camera: null,
    light: null,
    scene: null,
    cubes: null,
};

function setup() {
    state.canvas = document.querySelector('#app');
    state.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: state.canvas });
    state.scene = new THREE.Scene();
    state.camera = new THREE.PerspectiveCamera(75);
    state.camera.position.z = 2;
    state.light = new THREE.DirectionalLight(0xFFFFFF, 1);
    state.light.position.set(-1, 2, 4);
    state.scene.add(state.light);
}

function createCube(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    state.scene.add(cube);
    cube.position.x = x;
    return cube;
}

function createCubes() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeData = [
        { color: 0x44aa88, x: 0 },
        { color: 0x8844aa, x: -2 },
        { color: 0xaa8844, x: 2 },
    ];
    state.cubes = cubeData.map((data) => createCube(geometry, data.color, data.x));
}

function resize() {
    const pixelRatio = window.devicePixelRatio;
    const width = state.canvas.clientWidth * pixelRatio | 0;
    const height = state.canvas.clientHeight * pixelRatio | 0;
    const needResize = state.canvas.width !== width || state.canvas.height !== height;
    if (needResize) {
        state.renderer.setSize(width, height, false);
        state.camera.aspect = state.canvas.clientWidth / state.canvas.clientHeight;
        state.camera.updateProjectionMatrix();
    }
}

function update(time) {
    state.cubes.forEach((cube, index) => {
        const speed = 1 + index * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });
}

function render(time) {
    resize();
    update(time * 0.001);
    state.renderer.render(state.scene, state.camera);
    requestAnimationFrame(render);
}

function main() {
    setup();
    createCubes();
    render();
}

main();