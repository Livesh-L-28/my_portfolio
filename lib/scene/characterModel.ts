import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class CharacterVisualGuide {
  public group: THREE.Group;
  private mixer: THREE.AnimationMixer | null = null;
  private actions: Record<string, THREE.AnimationAction> = {};
  private currentActionName: string = "idle";
  private isGlbLoaded: boolean = false;
  private proceduralCharacter: THREE.Group | null = null;
  private proceduralLimbs: {
    leftLeg: THREE.Group;
    rightLeg: THREE.Group;
    leftArm: THREE.Group;
    rightArm: THREE.Group;
    torso: THREE.Mesh;
    head: THREE.Group;
  } | null = null;
  private walkCycleTime: number = 0;
  private walkSpeedMultiplier: number = 1.0;
  private isReducedMotion: boolean = false;

  constructor(isDark: boolean = true) {
    this.group = new THREE.Group();
    this.group.name = "CharacterVisualGuide";

    if (typeof window !== "undefined") {
      this.isReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }

    // 1. Build procedural fallback first so character is instantly visible
    this.buildProceduralCharacter(isDark);

    // 2. Load GLB rigged character model asynchronously
    this.loadGlbModel(isDark);
  }

  private loadGlbModel(isDark: boolean) {
    if (typeof window === "undefined") return;

    const loader = new GLTFLoader();
    loader.load(
      "/models/character.glb",
      (gltf) => {
        const model = gltf.scene;
        model.name = "GlbCharacterMesh";

        // Stylize character with high-craft cyber editorial materials
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const applyMaterialStyle = (mat: THREE.Material) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                if (mat.name.toLowerCase().includes("joint")) {
                  // Glowing cybernetic conduit joints
                  mat.color.setHex(0x38bdf8);
                  mat.emissive.setHex(0x0284c7);
                  mat.emissiveIntensity = 0.5;
                  mat.roughness = 0.2;
                  mat.metalness = 0.9;
                } else {
                  // Matte cybernetic armor
                  mat.color.setHex(isDark ? 0x181c28 : 0x2d3748);
                  mat.roughness = 0.32;
                  mat.metalness = 0.8;
                }
                mat.needsUpdate = true;
              }
            };

            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(applyMaterialStyle);
            } else if (mesh.material) {
              applyMaterialStyle(mesh.material);
            }
          }
        });

        // Attach cyber visor to head bone for articulated head motion
        const headBone = model.getObjectByName("mixamorig:Head");
        if (headBone) {
          const visorGeo = new THREE.BoxGeometry(0.16, 0.04, 0.1);
          const visorMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8, // Cobalt cyan visor
          });
          const visor = new THREE.Mesh(visorGeo, visorMat);
          visor.position.set(0, 0.1, 0.1);
          headBone.add(visor);
        }

        // Normalize scale and ground height
        model.scale.set(0.9, 0.9, 0.9);
        model.position.set(0, 0, 0);

        // Setup AnimationMixer
        this.mixer = new THREE.AnimationMixer(model);

        if (gltf.animations && gltf.animations.length > 0) {
          gltf.animations.forEach((clip) => {
            if (this.mixer) {
              const action = this.mixer.clipAction(clip);
              this.actions[clip.name.toLowerCase()] = action;
            }
          });

          // Default to walk or idle action
          const walkAction = this.actions["walk"] || this.actions["run"];
          const idleAction = this.actions["idle"] || walkAction;

          if (idleAction) {
            idleAction.play();
            this.currentActionName = "idle";
          }
        }

        // Hide procedural fallback and display high-fidelity rigged GLB
        if (this.proceduralCharacter) {
          this.proceduralCharacter.visible = false;
        }

        this.group.add(model);
        this.isGlbLoaded = true;
      },
      undefined,
      (err) => {
        console.warn("Using procedural stylized character fallback:", err);
      }
    );
  }

  private buildProceduralCharacter(isDark: boolean) {
    const char = new THREE.Group();
    char.name = "ProceduralStylizedHuman";

    const suitMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e2433 : 0x334155,
      roughness: 0.35,
      metalness: 0.8,
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.2,
      metalness: 0.9,
    });

    // 1. Torso & Chest Harness
    const torsoGeo = new THREE.BoxGeometry(0.42, 0.65, 0.26);
    const torso = new THREE.Mesh(torsoGeo, suitMat);
    torso.position.y = 1.15;
    char.add(torso);

    const chestBeaconGeo = new THREE.BoxGeometry(0.12, 0.12, 0.04);
    const chestBeacon = new THREE.Mesh(chestBeaconGeo, glowMat);
    chestBeacon.position.set(0, 0.08, 0.14);
    torso.add(chestBeacon);

    // 2. Neck & Stylized Cyber Head with Visor
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.62, 0);

    const headGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const head = new THREE.Mesh(headGeo, suitMat);
    headGroup.add(head);

    const visorGeo = new THREE.BoxGeometry(0.22, 0.07, 0.14);
    const visor = new THREE.Mesh(visorGeo, glowMat);
    visor.position.set(0, 0.02, 0.1);
    headGroup.add(visor);

    char.add(headGroup);

    // 3. Pelvis
    const pelvisGeo = new THREE.BoxGeometry(0.36, 0.18, 0.22);
    const pelvis = new THREE.Mesh(pelvisGeo, accentMat);
    pelvis.position.y = 0.76;
    char.add(pelvis);

    // 4. Articulated Legs
    const createLeg = (isLeft: boolean) => {
      const legRoot = new THREE.Group();
      legRoot.position.set(isLeft ? -0.13 : 0.13, 0.72, 0);

      // Thigh
      const thighGeo = new THREE.CylinderGeometry(0.08, 0.065, 0.42, 12);
      const thigh = new THREE.Mesh(thighGeo, suitMat);
      thigh.position.y = -0.21;
      legRoot.add(thigh);

      // Calf / Shin
      const shinGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.44, 12);
      const shin = new THREE.Mesh(shinGeo, suitMat);
      shin.position.y = -0.58;
      legRoot.add(shin);

      // Boot
      const bootGeo = new THREE.BoxGeometry(0.11, 0.1, 0.22);
      const boot = new THREE.Mesh(bootGeo, accentMat);
      boot.position.set(0, -0.82, 0.04);
      legRoot.add(boot);

      return legRoot;
    };

    const leftLeg = createLeg(true);
    const rightLeg = createLeg(false);
    char.add(leftLeg);
    char.add(rightLeg);

    // 5. Articulated Arms
    const createArm = (isLeft: boolean) => {
      const armRoot = new THREE.Group();
      armRoot.position.set(isLeft ? -0.28 : 0.28, 1.4, 0);

      const upperArmGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.38, 12);
      const upperArm = new THREE.Mesh(upperArmGeo, suitMat);
      upperArm.position.y = -0.19;
      armRoot.add(upperArm);

      const forearmGeo = new THREE.CylinderGeometry(0.055, 0.045, 0.36, 12);
      const forearm = new THREE.Mesh(forearmGeo, suitMat);
      forearm.position.y = -0.5;
      armRoot.add(forearm);

      return armRoot;
    };

    const leftArm = createArm(true);
    const rightArm = createArm(false);
    char.add(leftArm);
    char.add(rightArm);

    this.proceduralCharacter = char;
    this.proceduralLimbs = {
      leftLeg,
      rightLeg,
      leftArm,
      rightArm,
      torso,
      head: headGroup,
    };

    this.group.add(char);
  }

  public update(
    delta: number,
    scrollVelocity: number,
    isStationary: boolean
  ) {
    if (this.isReducedMotion) return;

    // A. Update Rigged GLB Character if loaded
    if (this.isGlbLoaded && this.mixer) {
      const absSpeed = Math.abs(scrollVelocity);
      const isWalking = !isStationary && absSpeed > 0.001;

      const targetAction = isWalking
        ? (this.actions["walk"] || this.actions["run"])
        : (this.actions["idle"] || this.actions["walk"]);

      if (targetAction && this.currentActionName !== (isWalking ? "walk" : "idle")) {
        const prevAction = this.actions[this.currentActionName];
        if (prevAction) {
          prevAction.fadeOut(0.35);
        }
        targetAction.reset().fadeIn(0.35).play();
        this.currentActionName = isWalking ? "walk" : "idle";
      }

      // Adjust mixer time scale based on scrolling speed
      if (isWalking) {
        this.mixer.timeScale = Math.min(Math.max(absSpeed * 45, 0.6), 2.2);
      } else {
        this.mixer.timeScale = 1.0;
      }

      this.mixer.update(delta);
    }

    // B. Update Procedural Character Kinematics if GLB not loaded or as fallback
    if (this.proceduralLimbs && (!this.isGlbLoaded || !this.proceduralCharacter?.visible)) {
      const absSpeed = Math.abs(scrollVelocity);
      const isWalking = !isStationary && absSpeed > 0.0008;

      if (isWalking) {
        this.walkCycleTime += delta * Math.min(Math.max(absSpeed * 45, 4.0), 9.0);
        const angle = Math.sin(this.walkCycleTime) * 0.6;
        const armAngle = -angle * 0.75;

        this.proceduralLimbs.leftLeg.rotation.x = angle;
        this.proceduralLimbs.rightLeg.rotation.x = -angle;
        this.proceduralLimbs.leftArm.rotation.x = armAngle;
        this.proceduralLimbs.rightArm.rotation.x = -armAngle;

        // Torso subtle bob and sway
        this.proceduralLimbs.torso.position.y = 1.15 + Math.abs(Math.sin(this.walkCycleTime * 2)) * 0.04;
        this.proceduralLimbs.head.position.y = 1.62 + Math.abs(Math.sin(this.walkCycleTime * 2)) * 0.03;
      } else {
        // Idle gentle breathing
        const idleT = performance.now() * 0.002;
        this.proceduralLimbs.leftLeg.rotation.x = THREE.MathUtils.lerp(this.proceduralLimbs.leftLeg.rotation.x, 0, 0.1);
        this.proceduralLimbs.rightLeg.rotation.x = THREE.MathUtils.lerp(this.proceduralLimbs.rightLeg.rotation.x, 0, 0.1);
        this.proceduralLimbs.leftArm.rotation.x = THREE.MathUtils.lerp(this.proceduralLimbs.leftArm.rotation.x, 0, 0.1);
        this.proceduralLimbs.rightArm.rotation.x = THREE.MathUtils.lerp(this.proceduralLimbs.rightArm.rotation.x, 0, 0.1);

        this.proceduralLimbs.torso.position.y = 1.15 + Math.sin(idleT) * 0.015;
        this.proceduralLimbs.head.position.y = 1.62 + Math.sin(idleT) * 0.01;
      }
    }
  }

  public setPosition(x: number, y: number, z: number) {
    this.group.position.set(x, y, z);
  }

  public setRotationY(rad: number) {
    this.group.rotation.y = rad;
  }

  public dispose() {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer = null;
    }
    this.actions = {};
    this.group.clear();
  }
}
