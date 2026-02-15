<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

	interface ModelViewerProps {
		modelPath: string;
		autoRotate?: boolean;
		skylightEnabled?: boolean;
		class?: string;
	}

	let {
		modelPath,
		autoRotate = false,
		skylightEnabled = false,
		class: className = '',
	}: ModelViewerProps = $props();

	let container = $state<HTMLDivElement | null>(null);
	let loading = $state(true);
	let error: string | null = $state(null);
	let rendererRef: THREE.WebGLRenderer | null = null;
	let renderRef: (() => void) | null = null;
	let ambientLightRef: THREE.AmbientLight | null = null;
	let artisticSkyLightRef: THREE.HemisphereLight | null = null;
	let magentaLightRef: THREE.DirectionalLight | null = null;
	let cyanLightRef: THREE.DirectionalLight | null = null;
	let amberRimLightRef: THREE.DirectionalLight | null = null;
	let visibilitySkyLight: THREE.HemisphereLight | null = null;
	let frontFillLight: THREE.DirectionalLight | null = null;
	let topFillLight: THREE.DirectionalLight | null = null;
	let sharedMaterialRef: THREE.MeshPhysicalMaterial | null = null;

	function applyLightingMode(skylightOn: boolean) {
		if (
			!rendererRef ||
			!ambientLightRef ||
			!artisticSkyLightRef ||
			!magentaLightRef ||
			!cyanLightRef ||
			!amberRimLightRef ||
			!visibilitySkyLight ||
			!frontFillLight ||
			!topFillLight
		) {
			return;
		}

		if (skylightOn) {
			ambientLightRef.intensity = 0.8;
			artisticSkyLightRef.intensity = 0;
			magentaLightRef.intensity = 0;
			cyanLightRef.intensity = 0;
			amberRimLightRef.intensity = 0;

			visibilitySkyLight.intensity = 1.1;
			frontFillLight.intensity = 1.7;
			topFillLight.intensity = 0.9;
			rendererRef.toneMappingExposure = 1.14;

			if (sharedMaterialRef) {
				sharedMaterialRef.metalness = 0.68;
				sharedMaterialRef.roughness = 0.34;
				sharedMaterialRef.clearcoat = 0.2;
				sharedMaterialRef.emissive.set(0x9fb4d4);
				sharedMaterialRef.emissiveIntensity = 0.08;
				sharedMaterialRef.needsUpdate = true;
			}
			return;
		}

		ambientLightRef.intensity = 0.15;
		artisticSkyLightRef.intensity = 0.55;
		magentaLightRef.intensity = 1.4;
		cyanLightRef.intensity = 1.3;
		amberRimLightRef.intensity = 1.0;

		visibilitySkyLight.intensity = 0;
		frontFillLight.intensity = 0;
		topFillLight.intensity = 0;
		rendererRef.toneMappingExposure = 0.95;

		if (sharedMaterialRef) {
			sharedMaterialRef.metalness = 0.96;
			sharedMaterialRef.roughness = 0.18;
			sharedMaterialRef.clearcoat = 0.35;
			sharedMaterialRef.emissive.set(0x000000);
			sharedMaterialRef.emissiveIntensity = 0;
			sharedMaterialRef.needsUpdate = true;
		}
	}

	$effect(() => {
		const skylightOn = skylightEnabled;
		applyLightingMode(skylightOn);
		renderRef?.();
	});

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
		camera.position.set(0, 0, 2.8);

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.05;
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

		ambientLightRef = new THREE.AmbientLight(0xffffff, 0.45);
		scene.add(ambientLightRef);

		artisticSkyLightRef = new THREE.HemisphereLight(0x88b8ff, 0x2a0f27, 0.75);
		scene.add(artisticSkyLightRef);

		magentaLightRef = new THREE.DirectionalLight(0xff58c8, 0.95);
		magentaLightRef.position.set(2.8, 1.8, 2.4);
		scene.add(magentaLightRef);

		cyanLightRef = new THREE.DirectionalLight(0x50dfff, 0.9);
		cyanLightRef.position.set(-2.4, 1.1, 2.1);
		scene.add(cyanLightRef);

		amberRimLightRef = new THREE.DirectionalLight(0xffb457, 0.75);
		amberRimLightRef.position.set(0.8, 2.4, -2.8);
		scene.add(amberRimLightRef);

		visibilitySkyLight = new THREE.HemisphereLight(0xffffff, 0x4f5f7a, 0);
		scene.add(visibilitySkyLight);

		frontFillLight = new THREE.DirectionalLight(0xffffff, 0);
		frontFillLight.position.set(0, 0.4, 3.4);
		scene.add(frontFillLight);

		topFillLight = new THREE.DirectionalLight(0xffffff, 0);
		topFillLight.position.set(0, 3.3, 0.8);
		scene.add(topFillLight);

		const modelRoot = new THREE.Group();
		scene.add(modelRoot);

		const loader = new OBJLoader();
		const render = () => {
			renderer.render(scene, camera);
		};
		rendererRef = renderer;
		renderRef = render;
		applyLightingMode(skylightEnabled);

		controls.addEventListener('change', render);

		loader.load(
			modelPath,
			(object) => {
				const sharedMaterial = new THREE.MeshPhysicalMaterial({
					color: 0xf0f3ff,
					metalness: 0.96,
					roughness: 0.18,
					clearcoat: 0.35,
					clearcoatRoughness: 0.22,
				});
				sharedMaterialRef = sharedMaterial;

				object.traverse((node) => {
					const mesh = node as THREE.Mesh;
					if (!mesh.isMesh) return;
					mesh.material = sharedMaterial;
				});

				const bounds = new THREE.Box3().setFromObject(object);
				const center = bounds.getCenter(new THREE.Vector3());
				const size = bounds.getSize(new THREE.Vector3());
				const largestSide = Math.max(size.x, size.y, size.z) || 1;
				const scale = 1.85 / largestSide;

				object.position.sub(center);
				object.scale.setScalar(scale);
				modelRoot.add(object);

				const fittedSize = size.clone().multiplyScalar(scale);
				const fov = THREE.MathUtils.degToRad(camera.fov);
				const fitHeightDistance = fittedSize.y / (2 * Math.tan(fov / 2));
				const fitWidthDistance = fittedSize.x / (2 * Math.tan(fov / 2)) / camera.aspect;
				const distance = Math.max(fitHeightDistance, fitWidthDistance, fittedSize.z) * 1.35;

				camera.position.set(0, 0, distance);
				camera.near = Math.max(0.01, distance / 100);
				camera.far = distance * 20;
				camera.updateProjectionMatrix();

				controls.minDistance = distance * 0.55;
				controls.maxDistance = distance * 4;
				controls.target.set(0, 0, 0);
				camera.lookAt(0, 0, 0);
				controls.update();
				applyLightingMode(skylightEnabled);
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

			rendererRef = null;
			renderRef = null;
			ambientLightRef = null;
			artisticSkyLightRef = null;
			magentaLightRef = null;
			cyanLightRef = null;
			amberRimLightRef = null;
			visibilitySkyLight = null;
			frontFillLight = null;
			topFillLight = null;
			sharedMaterialRef = null;
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
