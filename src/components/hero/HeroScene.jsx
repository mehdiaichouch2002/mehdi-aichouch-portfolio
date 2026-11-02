import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// Deep import: the drei barrel drags in unrelated modules (MediaPipe, etc.)
import { PerformanceMonitor } from "@react-three/drei/core/PerformanceMonitor";

// Lazy chunk (three.js + R3F). Only loaded by HeroVisual on capable desktops,
// after first paint, when the browser is idle.

// Ashima/Stefan Gustavson 3D simplex noise (MIT)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;
${NOISE}

float displace(vec3 p){
  // Two slow octaves: a big soft swell and a finer ripple
  return snoise(p*0.9+vec3(0.0,0.0,uTime*0.1))*0.11 + snoise(p*2.2-vec3(uTime*0.06))*0.02;
}

void main(){
  vec3 p=position;
  vec3 n=normalize(normal);
  float d=displace(p);
  vec3 displaced=p+n*d;

  // Recompute the normal from two nearby displaced points (finite differences)
  vec3 t=normalize(cross(n,abs(n.y)<0.99?vec3(0.0,1.0,0.0):vec3(1.0,0.0,0.0)));
  vec3 b=cross(n,t);
  float e=0.01;
  vec3 pt=p+t*e; vec3 pb=p+b*e;
  vec3 dt=pt+normalize(pt)*displace(pt);
  vec3 db=pb+normalize(pb)*displace(pb);
  vec3 dn=normalize(cross(dt-displaced,db-displaced));

  vec4 world=modelMatrix*vec4(displaced,1.0);
  vNormal=normalize(mat3(modelMatrix)*dn);
  vViewDir=normalize(cameraPosition-world.xyz);
  vDisp=d;
  gl_Position=projectionMatrix*viewMatrix*world;
}`;

// Iridescent chrome: dark glossy body, thin-film colors at grazing angles,
// a fake studio reflection and one specular highlight. No lights needed.
const fragmentShader = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;

void main(){
  vec3 N=normalize(vNormal);
  vec3 V=normalize(vViewDir);
  float fres=pow(1.0-max(dot(N,V),0.0),2.2);

  vec3 R=reflect(-V,N);
  float sky=smoothstep(-0.15,0.9,R.y);
  vec3 env=mix(vec3(0.015,0.016,0.02),vec3(0.72,0.82,0.95),sky*sky);

  vec3 film=0.5+0.5*cos(6.28318*(vec3(0.0,0.33,0.67)+fres*0.9+vDisp*2.0+uTime*0.02));
  film=mix(vec3(0.78,0.82,0.9),film,0.35); // mostly silver, a hint of thin-film color
  float spec=pow(max(dot(R,normalize(vec3(-0.45,0.75,0.55))),0.0),48.0);

  vec3 col=vec3(0.03,0.032,0.04);
  col+=env*0.22;
  col+=film*fres*0.7;
  col+=vec3(0.298,0.788,1.0)*pow(fres,3.0)*0.6; // accent rim, #4CC9FF
  col+=spec*0.75;
  gl_FragColor=vec4(col,1.0);
}`;

const ease = (delta, speed) => 1 - Math.exp(-delta * speed);

const Blob = ({ pointer }) => {
  const group = useRef();
  const mesh = useRef();
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  // Refs + delta only: nothing in here touches React state
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05); // no jump after a paused tab
    uniforms.uTime.value += dt;
    mesh.current.rotation.y += dt * 0.06;
    const g = group.current.rotation;
    g.x += (pointer.current.y * 0.25 - g.x) * ease(dt, 2.5);
    g.y += (pointer.current.x * 0.35 - g.y) * ease(dt, 2.5);
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 48]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
    </group>
  );
};

const HeroScene = ({ onReady }) => {
  const wrapper = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [dpr, setDpr] = useState(Math.min(window.devicePixelRatio || 1, 1.5));

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(wrapper.current);
    const onVisibility = () => setTabVisible(!document.hidden);
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={dpr}
        // Stop rendering entirely when the hero is scrolled away or the tab is hidden
        frameloop={onScreen && tabVisible ? "always" : "never"}
        camera={{ position: [0, 0, 4.4], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => requestAnimationFrame(onReady)}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(Math.min(window.devicePixelRatio || 1, 1.5))}
          flipflops={3}
          onFallback={() => setDpr(1)}
        />
        <Blob pointer={pointer} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
