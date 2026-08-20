'use client';

import { useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type EnergyRef = MutableRefObject<number>;

/* ------------------------------------------------------------------ *
 * Shared GLSL — classic 3D simplex noise (Ashima / Stefan Gustavson)
 * ------------------------------------------------------------------ */
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
    + i.y+vec4(0.0,i1.y,i2.y,1.0))
    + i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){
  float f=0.0, a=0.5;
  for(int i=0;i<4;i++){ f+=a*snoise(p); p*=2.02; a*=0.5; }
  return f;
}
`;

/* ------------------------------------------------------------------ *
 * The core storm orb — displaced icosahedron with an electric surface
 * ------------------------------------------------------------------ */
function StormOrb({ energy }: { energy: EnergyRef }) {
    const matRef = useRef<THREE.ShaderMaterial>(null);
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const bloomRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uEnergy: { value: 0 },
            uColorA: { value: new THREE.Color('#0a2fb4') },
            uColorB: { value: new THREE.Color('#39d8ff') },
            uColorC: { value: new THREE.Color('#eaf7ff') },
        }),
        []
    );

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        // energy decays back to 0 after a transition spike
        energy.current = THREE.MathUtils.damp(energy.current, 0, 2.4, delta);
        if (matRef.current) {
            matRef.current.uniforms.uTime.value = t;
            matRef.current.uniforms.uEnergy.value = energy.current;
        }
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.14;
            groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.18;
            const s = 1 + energy.current * 0.12 + Math.sin(t * 1.6) * 0.015;
            groupRef.current.scale.setScalar(s);
        }
        if (coreRef.current) {
            const p = 0.5 + Math.abs(Math.sin(t * 3.2)) * 0.09 + energy.current * 0.18;
            coreRef.current.scale.setScalar(p);
        }
        if (bloomRef.current) {
            const b = 0.66 + Math.sin(t * 2.1) * 0.05 + energy.current * 0.25;
            bloomRef.current.scale.setScalar(b);
            const m = bloomRef.current.material as THREE.MeshBasicMaterial;
            m.opacity = 0.28 + Math.abs(Math.sin(t * 2.6)) * 0.12 + energy.current * 0.35;
        }
    });

    const vertex = /* glsl */ `
    uniform float uTime;
    uniform float uEnergy;
    varying float vDisp;
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec3 vDir;
    ${NOISE_GLSL}
    void main(){
      vec3 p = position;
      vec3 dir = normalize(p);
      float t = uTime;
      // layered turbulence — always churning, spikes with energy
      float n = fbm(dir * 1.9 + vec3(0.0, t * 0.45, 0.0));
      float ridge = snoise(dir * 4.5 + t * 0.7);
      float fine = snoise(dir * 9.5 - t * 1.15);
      float boil = 0.5 + 0.5 * sin(t * 1.4);
      float disp = n * 0.32 + ridge * 0.11 + fine * 0.05
                 + boil * 0.04 + uEnergy * 0.5 * abs(ridge);
      vDisp = disp;
      vDir = dir;
      vec3 np = p + normal * disp;
      vec4 mv = modelViewMatrix * vec4(np, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }
  `;

    const fragment = /* glsl */ `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform float uEnergy;
    uniform float uTime;
    varying float vDisp;
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec3 vDir;
    ${NOISE_GLSL}
    void main(){
      float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
      float d = smoothstep(-0.25, 0.45, vDisp);
      vec3 col = mix(uColorA, uColorB, d);
      col = mix(col, uColorC, fres * 0.7);

      // flowing electric veins — thin bright filaments crawling the surface, fast
      float f1 = fbm(vDir * 3.4 + vec3(uTime * 0.95, uTime * 0.6, -uTime * 0.75));
      float veins = pow(1.0 - abs(f1), 5.0);
      float f2 = fbm(vDir * 7.0 - vec3(uTime * 1.5));
      float sparks = pow(1.0 - abs(f2), 10.0);
      float f3 = fbm(vDir * 12.0 + vec3(-uTime * 2.1, uTime * 1.7, uTime));
      float crackle = pow(1.0 - abs(f3), 16.0);
      float electric = clamp(veins * 1.2 + sparks * 1.1 + crackle * 1.4, 0.0, 3.0);
      col += uColorB * electric * (1.7 + uEnergy * 4.0);
      col += uColorC * (sparks + crackle) * 0.9;

      // ridge hotspots + rim glow
      float hot = smoothstep(0.32, 0.5, vDisp);
      col += uColorB * hot * (1.6 + uEnergy * 3.2);
      col += fres * uColorB * (0.7 + uEnergy);

      float alpha = 0.5 + fres * 0.5 + hot * 0.45 + electric * 0.45;
      gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
    }
  `;

    return (
        <group ref={groupRef}>
            <mesh>
                <icosahedronGeometry args={[1.15, 12]} />
                <shaderMaterial
                    ref={matRef}
                    uniforms={uniforms}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            {/* dense electric core */}
            <mesh scale={0.86}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#1b52e6" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {/* pulsing bloom */}
            <mesh ref={bloomRef} scale={0.66}>
                <sphereGeometry args={[1, 24, 24]} />
                <meshBasicMaterial color="#5fbaff" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {/* white-hot center */}
            <mesh ref={coreRef} scale={0.5}>
                <sphereGeometry args={[1, 24, 24]} />
                <meshBasicMaterial color="#eaf7ff" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </group>
    );
}

/* ------------------------------------------------------------------ *
 * Halo — a back-facing fresnel shell for the outer glow
 * ------------------------------------------------------------------ */
function Halo({ energy }: { energy: EnergyRef }) {
    const matRef = useRef<THREE.ShaderMaterial>(null);
    const uniforms = useMemo(
        () => ({ uEnergy: { value: 0 }, uColor: { value: new THREE.Color('#2e7bff') } }),
        []
    );
    useFrame(() => {
        if (matRef.current) matRef.current.uniforms.uEnergy.value = energy.current;
    });
    return (
        <mesh scale={1.9}>
            <sphereGeometry args={[1, 48, 48]} />
            <shaderMaterial
                ref={matRef}
                uniforms={uniforms}
                transparent
                side={THREE.BackSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexShader={/* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main(){
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `}
                fragmentShader={/* glsl */ `
          uniform float uEnergy;
          uniform vec3 uColor;
          varying vec3 vNormal;
          varying vec3 vView;
          void main(){
            float fres = pow(1.0 - max(dot(vNormal, -vView), 0.0), 3.0);
            float a = fres * (0.5 + uEnergy * 0.8);
            gl_FragColor = vec4(uColor * (1.0 + uEnergy), a);
          }
        `}
            />
        </mesh>
    );
}

/* ------------------------------------------------------------------ *
 * Ball-lightning tendrils — jittered arcs redrawn each frame
 * ------------------------------------------------------------------ */
const SEGMENTS = 26;

function makeBolt() {
    // random end direction on the sphere, slightly beyond the orb surface
    const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    ).normalize();
    return {
        dir,
        len: 1.7 + Math.random() * 2.1,
        seed: Math.random() * 100,
        speed: 7 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2,
    };
}

function Tendrils({ energy, count = 20 }: { energy: EnergyRef; count?: number }) {
    const bolts = useMemo(() => Array.from({ length: count }, makeBolt), [count]);
    const geoms = useRef<THREE.BufferGeometry[]>([]);
    const mats = useRef<THREE.LineBasicMaterial[]>([]);
    const tmp = useMemo(() => new THREE.Vector3(), []);
    const perp1 = useMemo(() => new THREE.Vector3(), []);
    const perp2 = useMemo(() => new THREE.Vector3(), []);

    const positions = useMemo(
        () => bolts.map(() => new Float32Array((SEGMENTS + 1) * 3)),
        [bolts]
    );

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        bolts.forEach((b, bi) => {
            const geo = geoms.current[bi];
            const mat = mats.current[bi];
            if (!geo) return;
            // build an orthonormal frame around the bolt direction
            perp1.set(b.dir.z, b.dir.x, -b.dir.y).normalize();
            perp2.copy(b.dir).cross(perp1).normalize();
            const arr = positions[bi];
            const flick = 0.35 + 0.65 * Math.abs(Math.sin(t * b.speed + b.phase));
            const amp = (0.24 + energy.current * 0.55) * flick;
            for (let i = 0; i <= SEGMENTS; i++) {
                const f = i / SEGMENTS;
                const radial = 1.05 + f * b.len;
                const jitter =
                    Math.sin(f * 9.0 + t * b.speed + b.seed) * amp * f +
                    Math.sin(f * 21.0 - t * b.speed * 0.6 + b.seed) * amp * 0.5 * f;
                const jitter2 =
                    Math.cos(f * 12.0 + t * b.speed * 0.8 + b.seed) * amp * f;
                tmp
                    .copy(b.dir).multiplyScalar(radial)
                    .addScaledVector(perp1, jitter)
                    .addScaledVector(perp2, jitter2);
                arr[i * 3] = tmp.x;
                arr[i * 3 + 1] = tmp.y;
                arr[i * 3 + 2] = tmp.z;
            }
            const attr = geo.getAttribute('position') as THREE.BufferAttribute;
            attr.array = arr;
            attr.needsUpdate = true;
            if (mat) mat.opacity = (0.34 + energy.current * 0.6) * flick;
        });
    });

    return (
        <group>
            {bolts.map((_, i) => (
                // eslint-disable-next-line react/no-unknown-property
                <line key={i}>
                    <bufferGeometry
                        ref={(el) => {
                            if (el) {
                                geoms.current[i] = el as unknown as THREE.BufferGeometry;
                                el.setAttribute('position', new THREE.BufferAttribute(positions[i], 3));
                            }
                        }}
                    />
                    <lineBasicMaterial
                        ref={(el) => {
                            if (el) mats.current[i] = el;
                        }}
                        color="#cdefff"
                        transparent
                        opacity={0.5}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </line>
            ))}
        </group>
    );
}

/* ------------------------------------------------------------------ *
 * Surface arcs — electricity crawling around the ball (plasma-ball look)
 * ------------------------------------------------------------------ */
const ARC_SEGMENTS = 24;
const ARC_RADIUS = 1.2;

function randDir(v: THREE.Vector3) {
    v.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    if (v.lengthSq() < 1e-4) v.set(0, 1, 0);
    return v.normalize();
}

function SurfaceArcs({ energy, count = 18 }: { energy: EnergyRef; count?: number }) {
    const geoms = useRef<THREE.BufferGeometry[]>([]);
    const mats = useRef<THREE.LineBasicMaterial[]>([]);
    const arcs = useMemo(
        () =>
            Array.from({ length: count }, () => {
                const a = randDir(new THREE.Vector3());
                const r = randDir(new THREE.Vector3());
                const b = a.clone().addScaledVector(r, 0.9).normalize();
                return { a, b, next: 0, seed: Math.random() * 100, speed: 10 + Math.random() * 12 };
            }),
        [count]
    );
    const positions = useMemo(() => arcs.map(() => new Float32Array((ARC_SEGMENTS + 1) * 3)), [arcs]);
    const tmp = useMemo(() => new THREE.Vector3(), []);
    const axis = useMemo(() => new THREE.Vector3(), []);
    const rnd = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        arcs.forEach((arc, i) => {
            const geo = geoms.current[i];
            const mat = mats.current[i];
            if (!geo) return;
            // periodically re-strike to a new nearby endpoint — electricity jumping
            if (t > arc.next) {
                arc.a.copy(arc.b);
                randDir(rnd);
                arc.b.copy(arc.a).addScaledVector(rnd, 0.9).normalize();
                arc.next = t + 0.1 + Math.random() * 0.32;
                arc.seed = Math.random() * 100;
                arc.speed = 12 + Math.random() * 16;
            }
            const a = arc.a;
            const b = arc.b;
            const dot = THREE.MathUtils.clamp(a.dot(b), -0.999, 0.999);
            const omega = Math.acos(dot);
            const sinO = Math.sin(omega) || 1e-4;
            axis.copy(a).cross(b).normalize();
            const flick = 0.45 + 0.55 * Math.abs(Math.sin(t * arc.speed + arc.seed));
            const amp = (0.085 + energy.current * 0.2) * flick;
            const arr = positions[i];
            for (let s = 0; s <= ARC_SEGMENTS; s++) {
                const f = s / ARC_SEGMENTS;
                const w0 = Math.sin((1 - f) * omega) / sinO;
                const w1 = Math.sin(f * omega) / sinO;
                tmp.copy(a).multiplyScalar(w0).addScaledVector(b, w1).normalize();
                const env = Math.sin(Math.PI * f); // 0 at the ends, 1 mid-arc
                const jTan =
                    Math.sin(f * 16 + t * arc.speed + arc.seed) * amp * env +
                    Math.sin(f * 33 - t * arc.speed * 0.8 + arc.seed) * amp * 0.5 * env;
                const jRad = Math.cos(f * 22 + t * arc.speed * 0.6 + arc.seed) * amp * env;
                tmp.multiplyScalar(ARC_RADIUS + env * 0.16 + jRad).addScaledVector(axis, jTan);
                arr[s * 3] = tmp.x;
                arr[s * 3 + 1] = tmp.y;
                arr[s * 3 + 2] = tmp.z;
            }
            (geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
            if (mat) mat.opacity = (0.35 + energy.current * 0.55) * flick;
        });
    });

    return (
        <group>
            {arcs.map((_, i) => (
                // eslint-disable-next-line react/no-unknown-property
                <line key={i}>
                    <bufferGeometry
                        ref={(el) => {
                            if (el) {
                                geoms.current[i] = el as unknown as THREE.BufferGeometry;
                                el.setAttribute('position', new THREE.BufferAttribute(positions[i], 3));
                            }
                        }}
                    />
                    <lineBasicMaterial
                        ref={(el) => {
                            if (el) mats.current[i] = el;
                        }}
                        color="#e6f6ff"
                        transparent
                        opacity={0.5}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </line>
            ))}
        </group>
    );
}

/* ------------------------------------------------------------------ *
 * Drifting energy particle field
 * ------------------------------------------------------------------ */
function Particles({ energy, count = 1500 }: { energy: EnergyRef; count?: number }) {
    const ref = useRef<THREE.Points>(null);
    const matRef = useRef<THREE.PointsMaterial>(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 3 + Math.random() * 9;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
            arr[i * 3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, [count]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.04;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
        if (matRef.current) {
            matRef.current.size = 0.03 + energy.current * 0.05;
            matRef.current.opacity = 0.5 + energy.current * 0.4;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                ref={matRef}
                color="#6fa8ff"
                size={0.035}
                sizeAttenuation
                transparent
                opacity={0.6}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ------------------------------------------------------------------ *
 * Orbiting sparks — fast little charges circling the core
 * ------------------------------------------------------------------ */
function Sparks({ energy, count = 70 }: { energy: EnergyRef; count?: number }) {
    const ref = useRef<THREE.Points>(null);
    const matRef = useRef<THREE.PointsMaterial>(null);
    const orbits = useMemo(
        () =>
            Array.from({ length: count }, () => ({
                r: 1.3 + Math.random() * 1.4,
                speed: (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 1.6),
                phase: Math.random() * Math.PI * 2,
                tilt: Math.random() * Math.PI,
                wobble: 0.1 + Math.random() * 0.5,
            })),
        [count]
    );
    const positions = useMemo(() => new Float32Array(count * 3), [count]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        for (let i = 0; i < count; i++) {
            const o = orbits[i];
            const a = o.phase + t * o.speed;
            const r = o.r + Math.sin(t * 2 + o.phase) * o.wobble;
            const x = Math.cos(a) * r;
            const z = Math.sin(a) * r;
            const y = Math.sin(a * 1.3 + o.tilt) * r * 0.4;
            // tilt the orbit plane
            positions[i * 3] = x;
            positions[i * 3 + 1] = y * Math.cos(o.tilt) - z * Math.sin(o.tilt) * 0.3;
            positions[i * 3 + 2] = z * Math.cos(o.tilt) + y * Math.sin(o.tilt) * 0.3;
        }
        const geo = ref.current?.geometry;
        if (geo) {
            const attr = geo.getAttribute('position') as THREE.BufferAttribute;
            if (attr) attr.needsUpdate = true;
        }
        if (matRef.current) {
            matRef.current.size = 0.05 + energy.current * 0.08 + Math.abs(Math.sin(t * 6)) * 0.02;
            matRef.current.opacity = 0.7 + energy.current * 0.3;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                ref={matRef}
                color="#c6f4ff"
                size={0.06}
                sizeAttenuation
                transparent
                opacity={0.8}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ------------------------------------------------------------------ *
 * Comet tail — energy streaming off the ball as it churns
 * ------------------------------------------------------------------ */
function CometTail({ energy, count = 240 }: { energy: EnergyRef; count?: number }) {
    const ref = useRef<THREE.Points>(null);
    const matRef = useRef<THREE.PointsMaterial>(null);
    const data = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const prog = new Float32Array(count);
        const off = new Float32Array(count * 2);
        for (let i = 0; i < count; i++) {
            prog[i] = Math.random();
            off[i * 2] = Math.random() * Math.PI * 2;
            off[i * 2 + 1] = Math.random();
        }
        return { pos, prog, off };
    }, [count]);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const ang = t * 0.35; // tail slowly sweeps around
        const dirx = Math.cos(ang);
        const dirz = Math.sin(ang);
        for (let i = 0; i < count; i++) {
            let p = data.prog[i] + delta * (0.28 + data.off[i * 2 + 1] * 0.3);
            if (p > 1) p -= 1;
            data.prog[i] = p;
            const dist = 0.9 + p * 3.8;
            const spread = (0.1 + p * 0.55) * data.off[i * 2 + 1];
            const a = data.off[i * 2] + p * 5.0;
            // stream opposite the sweep direction (a trailing tail)
            const bx = -dirx * dist;
            const bz = -dirz * dist;
            data.pos[i * 3] = bx + -dirz * Math.cos(a) * spread;
            data.pos[i * 3 + 1] = Math.sin(a) * spread;
            data.pos[i * 3 + 2] = bz + dirx * Math.cos(a) * spread;
        }
        const geo = ref.current?.geometry;
        if (geo) (geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
        if (matRef.current) {
            matRef.current.opacity = 0.3 + energy.current * 0.35;
            matRef.current.size = 0.05 + energy.current * 0.05;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
            </bufferGeometry>
            <pointsMaterial
                ref={matRef}
                color="#7cc6ff"
                size={0.055}
                sizeAttenuation
                transparent
                opacity={0.35}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ------------------------------------------------------------------ *
 * Flickering core light
 * ------------------------------------------------------------------ */
function CoreLight({ energy }: { energy: EnergyRef }) {
    const ref = useRef<THREE.PointLight>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (ref.current) {
            const flicker = 0.75 + 0.25 * Math.sin(t * 9.0) * Math.sin(t * 3.3);
            ref.current.intensity = (10 + energy.current * 20) * flicker;
        }
    });
    return <pointLight ref={ref} position={[0, 0, 0]} intensity={10} color="#4a9bff" distance={14} />;
}

/* ------------------------------------------------------------------ *
 * Gentle camera parallax toward the pointer
 * ------------------------------------------------------------------ */
function Rig() {
    useFrame((state, delta) => {
        const px = state.pointer.x * 0.6;
        const py = state.pointer.y * 0.4;
        state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, px, 2, delta);
        state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, py, 2, delta);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

/* ------------------------------------------------------------------ *
 * The exported scene
 * ------------------------------------------------------------------ */
export default function StormScene({ energy }: { energy: EnergyRef }) {
    return (
        <Canvas
            className="storm-canvas"
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 2]}
        >
            <color attach="background" args={['#04050c']} />
            <fog attach="fog" args={['#04050c', 6, 16]} />
            <ambientLight intensity={0.4} />
            <CoreLight energy={energy} />
            <Halo energy={energy} />
            <StormOrb energy={energy} />
            <SurfaceArcs energy={energy} />
            <Tendrils energy={energy} />
            <Sparks energy={energy} />
            <CometTail energy={energy} />
            <Particles energy={energy} />
            <Rig />
        </Canvas>
    );
}
