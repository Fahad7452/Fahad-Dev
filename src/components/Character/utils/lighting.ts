import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const keyLight = new THREE.DirectionalLight(0xffdfcf, 0);
  keyLight.position.set(-2.5, 3.8, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  const tealFillLight = new THREE.DirectionalLight(0x5affee, 0);
  tealFillLight.position.set(-4, -1.2, 2);
  scene.add(tealFillLight);

  const pinkRimLight = new THREE.DirectionalLight(0xff5ca8, 0);
  pinkRimLight.position.set(3.5, 2.5, -3);
  scene.add(pinkRimLight);

  const pointLight = new THREE.PointLight(0xd9b5ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.58,
      duration: duration,
      ease: ease,
    });
    gsap.to(keyLight, {
      intensity: 0.92,
      duration: duration,
      ease: ease,
    });
    gsap.to(tealFillLight, {
      intensity: 0.55,
      duration: duration,
      ease: ease,
    });
    gsap.to(pinkRimLight, {
      intensity: 0.78,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
