import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

type MaterialStyle = {
  color: string;
  roughness: number;
  metalness?: number;
};

const skinColor = "#a65f48";
const blackCloth = "#070708";

const referencePalette: Record<string, MaterialStyle> = {
  bodyshirt: { color: blackCloth, roughness: 0.68, metalness: 0.02 },
  plane007: { color: skinColor, roughness: 0.56, metalness: 0.01 },
  face002: { color: skinColor, roughness: 0.56, metalness: 0.01 },
  ear001: { color: skinColor, roughness: 0.58, metalness: 0.01 },
  hand: { color: skinColor, roughness: 0.58, metalness: 0.01 },
  neck: { color: skinColor, roughness: 0.6, metalness: 0.01 },
  pant: { color: "#17191d", roughness: 0.68, metalness: 0.01 },
  shoe: { color: "#0a0b0f", roughness: 0.54, metalness: 0.02 },
  sole: { color: "#0d0f14", roughness: 0.56, metalness: 0.02 },
  hair: { color: "#030304", roughness: 0.48, metalness: 0 },
  eyebrow: { color: "#030304", roughness: 0.5, metalness: 0 },
};

const isMesh = (object: THREE.Object3D): object is THREE.Mesh =>
  (object as THREE.Mesh).isMesh;

const normalizeMeshName = (name: string) =>
  name.replace(/[^a-z0-9]/gi, "").toLowerCase();

const tintMaterial = (
  material: THREE.Material,
  { color, roughness, metalness = 0 }: MaterialStyle
) => {
  const tinted = material.clone();

  if ("color" in tinted && tinted.color instanceof THREE.Color) {
    tinted.color.set(color);
  }
  if ("roughness" in tinted && typeof tinted.roughness === "number") {
    tinted.roughness = roughness;
  }
  if ("metalness" in tinted && typeof tinted.metalness === "number") {
    tinted.metalness = metalness;
  }

  tinted.needsUpdate = true;
  return tinted;
};

const applyReferencePalette = (character: THREE.Object3D) => {
  character.traverse((child) => {
    if (!isMesh(child)) return;

    const style = referencePalette[normalizeMeshName(child.name)];
    if (!style) return;

    child.material = Array.isArray(child.material)
      ? child.material.map((material) => tintMaterial(material, style))
      : tintMaterial(child.material, style);
  });
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            applyReferencePalette(character);
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
