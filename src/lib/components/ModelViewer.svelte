<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

	interface ModelViewerProps {
		modelPath: string;
		autoRotate?: boolean;
		class?: string;
	}

	let { modelPath, autoRotate = false, class: className = '' }: ModelViewerProps = $props();

	let container = $state<HTMLDivElement | null>(null);
	let loading = $state(true);
	let error: string | null = $state(null);

	function disposeScene(root: THREE.Object3D) {
		root.traverse((node) => {
			const mesh = node as THREE.Mesh;
			if (!mesh.isMesh) return;

			mesh.geometry?.dispose();
			const material = mesh.material;
			if (Array.isArray(material)) {
				for (const item of material) {
					item.dispose();
				}
			} else {
				material?.dispose();
			}
		});
	}

	onMount(() => {
		if (!container) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
		camera.position.set(0, 0.2, 2.8);

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.setClearColor(0x000000, 0);
		renderer.domElement.style.display = 'block';
		renderer.domElement.style.width = '100%';
		renderer.domElement.style.height = '100%';
		container.appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = false;
		controls.autoRotate = autoRotate;
		controls.autoRotateSpeed = 0.55;
		controls.minDistance = 0.8;
		controls.maxDistance = 6;
		controls.enablePan = false;

		const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
		scene.add(ambientLight);

		const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
		keyLight.position.set(2.3, 2.1, 2.4);
		scene.add(keyLight);

		const rimLight = new THREE.DirectionalLight(0x7fc7ff, 0.8);
		rimLight.position.set(-2.2, 1.2, -2.8);
		scene.add(rimLight);

		const modelRoot = new THREE.Group();
		scene.add(modelRoot);

		const loader = new OBJLoader();
		const render = () => {
			renderer.render(scene, camera);
		};

		controls.addEventListener('change', render);

		loader.load(
			modelPath,
			(object) => {
				const sharedMaterial = new THREE.MeshStandardMaterial({
					color: 0xe8eaee,
					metalness: 0.55,
					roughness: 0.34,
				});

				object.traverse((node) => {
					const mesh = node as THREE.Mesh;
					if (!mesh.isMesh) return;
					mesh.material = sharedMaterial;
				});

				const bounds = new THREE.Box3().setFromObject(object);
				const center = bounds.getCenter(new THREE.Vector3());
				const size = bounds.getSize(new THREE.Vector3());
				const largestSide = Math.max(size.x, size.y, size.z) || 1;
				const scale = 1.75 / largestSide;

				object.position.sub(center);
				object.scale.setScalar(scale);
				modelRoot.add(object);

				controls.target.set(0, 0.05, 0);
				controls.update();
				loading = false;
				render();
			},
			undefined,
			() => {
				error = '3D model could not be loaded.';
				loading = false;
			},
		);

		const resize = () => {
			if (!container) return;
			const width = container.clientWidth;
			const height = container.clientHeight;
			if (!width || !height) return;

			renderer.setSize(width, height, false);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			render();
		};

		const observer = new ResizeObserver(resize);
		observer.observe(container);
		resize();

		let frame = 0;
		const animate = () => {
			frame = requestAnimationFrame(animate);
			controls.update();
			render();
		};

		if (autoRotate) {
			animate();
		}

		return () => {
			if (frame) {
				cancelAnimationFrame(frame);
			}
			observer.disconnect();
			controls.removeEventListener('change', render);
			controls.dispose();
			disposeScene(scene);
			renderer.dispose();

			if (container?.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div class={`relative h-full w-full ${className}`} bind:this={container}>
	{#if loading}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<span class="font-mono text-sm uppercase tracking-[0.14em] text-zinc-200">Loading 3D model</span>
		</div>
	{/if}

	{#if error}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<span class="font-mono text-center text-sm text-red-300">{error}</span>
		</div>
	{/if}
</div>
