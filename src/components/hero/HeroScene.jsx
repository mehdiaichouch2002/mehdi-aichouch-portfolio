import { useEffect, useRef } from "react";

// Lazy chunk, loaded by HeroVisual after first paint. Plain WebGL, no three.js:
// one indexed icosphere, one shader program, one draw call per frame. The whole
// chunk is a few kB, so it is cheap enough for phones too.

// Ashima/Stefan Gustavson 3D simplex noise (MIT)
const NOISE = `
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

const VERTEX = `
attribute vec3 position;
uniform mat4 uModel;
uniform mat4 uViewProj;
uniform vec3 uCamera;
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
  vec3 n=normalize(p);
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

  vec4 world=uModel*vec4(displaced,1.0);
  vNormal=normalize(mat3(uModel)*dn);
  vViewDir=normalize(uCamera-world.xyz);
  vDisp=d;
  gl_Position=uViewProj*world;
}`;

// Iridescent chrome: dark glossy body, thin-film colors at grazing angles,
// a fake studio reflection and one specular highlight. No lights needed.
const FRAGMENT = `
precision mediump float;
uniform float uPhase; // slow thin-film drift, wrapped to 0..1 (mediump-safe)
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

  vec3 film=0.5+0.5*cos(6.28318*(vec3(0.0,0.33,0.67)+fres*0.9+vDisp*2.0+uPhase));
  film=mix(vec3(0.78,0.82,0.9),film,0.35); // mostly silver, a hint of thin-film color
  float spec=pow(max(dot(R,normalize(vec3(-0.45,0.75,0.55))),0.0),48.0);

  vec3 col=vec3(0.03,0.032,0.04);
  col+=env*0.22;
  col+=film*fres*0.7;
  col+=vec3(0.298,0.788,1.0)*pow(fres,3.0)*0.6; // accent rim, #4CC9FF
  col+=spec*0.75;
  gl_FragColor=vec4(col,1.0);
}`;

// Unit icosphere: every icosahedron face split into a `segments`² triangle grid and
// pushed onto the sphere. Indexed, so each vertex is shaded once (not once per triangle).
const T = (1 + Math.sqrt(5)) / 2;
const ICO_VERTS = [
  [-1, T, 0], [1, T, 0], [-1, -T, 0], [1, -T, 0], [0, -1, T], [0, 1, T],
  [0, -1, -T], [0, 1, -T], [T, 0, -1], [T, 0, 1], [-T, 0, -1], [-T, 0, 1],
];
const ICO_FACES = [
  0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
  3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
];

const buildIcosphere = (segments) => {
  const perFace = ((segments + 1) * (segments + 2)) / 2;
  const positions = new Float32Array(20 * perFace * 3);
  const indices = new Uint16Array(20 * segments * segments * 3);
  let v = 0;
  let k = 0;
  for (let f = 0; f < 20; f++) {
    const [a, b, c] = [0, 1, 2].map((n) => ICO_VERTS[ICO_FACES[f * 3 + n]]);
    const base = v;
    const row = []; // row[i] = index of the first vertex in grid row i
    for (let i = 0; i <= segments; i++) {
      row.push(v - base);
      for (let j = 0; j <= segments - i; j++) {
        const u = i / segments;
        const w = j / segments;
        const x = a[0] + (b[0] - a[0]) * u + (c[0] - a[0]) * w;
        const y = a[1] + (b[1] - a[1]) * u + (c[1] - a[1]) * w;
        const z = a[2] + (b[2] - a[2]) * u + (c[2] - a[2]) * w;
        const len = Math.hypot(x, y, z);
        positions[v * 3] = x / len;
        positions[v * 3 + 1] = y / len;
        positions[v * 3 + 2] = z / len;
        v++;
      }
    }
    const at = (i, j) => base + row[i] + j;
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments - i; j++) {
        indices[k++] = at(i, j);
        indices[k++] = at(i + 1, j);
        indices[k++] = at(i, j + 1);
        if (j < segments - i - 1) {
          indices[k++] = at(i + 1, j);
          indices[k++] = at(i + 1, j + 1);
          indices[k++] = at(i, j + 1);
        }
      }
    }
  }
  return { positions, indices: indices.subarray(0, k) };
};

// Column-major 4×4 matrices, only what the scene needs
const perspective = (fovDeg, aspect, near, far) => {
  const f = 1 / Math.tan((fovDeg * Math.PI) / 360);
  const nf = 1 / (near - far);
  return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
};
// Rx(ax) · Ry(ay)
const rotationXY = (ax, ay, out) => {
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  out[0] = cy; out[1] = sx * sy; out[2] = -cx * sy; out[3] = 0;
  out[4] = 0; out[5] = cx; out[6] = sx; out[7] = 0;
  out[8] = sy; out[9] = -sx * cy; out[10] = cx * cy; out[11] = 0;
  out[12] = 0; out[13] = 0; out[14] = 0; out[15] = 1;
  return out;
};

const CAMERA_Z = 4.4;
const ease = (delta, speed) => 1 - Math.exp(-delta * speed);

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
};

const HeroScene = ({ onReady, onFail }) => {
  const canvasRef = useRef(null);
  // Latest callbacks without restarting the GL setup when the parent re-renders
  const callbacks = useRef({ onReady, onFail });
  callbacks.current = { onReady, onFail };

  useEffect(() => {
    const onReady = () => callbacks.current.onReady?.();
    const onFail = () => callbacks.current.onFail?.();
    const canvas = canvasRef.current;
    // Phones and tablets: lighter mesh, capped at 30 fps (the motion is slow, so
    // it looks the same) and no pointer tilt, since touches mean scrolling there.
    const touch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const maxDpr = Math.min(window.devicePixelRatio || 1, touch ? 1.25 : 1.5);
    const frameInterval = touch ? 1000 / 30 : 0;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      onFail();
      return undefined;
    }

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      onFail();
      return undefined;
    }
    gl.useProgram(program);

    const { positions, indices } = buildIcosphere(touch ? 28 : 48);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    const count = indices.length;

    const uModel = gl.getUniformLocation(program, "uModel");
    const uViewProj = gl.getUniformLocation(program, "uViewProj");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPhase = gl.getUniformLocation(program, "uPhase");
    gl.uniform3f(gl.getUniformLocation(program, "uCamera"), 0, 0, CAMERA_Z);
    // The box is square: view = translate(0, 0, -4.4), folded into the projection
    const viewProj = perspective(35, 1, 0.1, 100);
    viewProj[14] += viewProj[10] * -CAMERA_Z;
    viewProj[15] += viewProj[11] * -CAMERA_Z;
    gl.uniformMatrix4fv(uViewProj, false, viewProj);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);

    let dpr = maxDpr;
    const resize = () => {
      const size = canvas.clientWidth;
      const px = Math.max(1, Math.round(size * dpr));
      if (canvas.width !== px) {
        canvas.width = px;
        canvas.height = px;
        gl.viewport(0, 0, px, px);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Animation state lives in plain variables: nothing here touches React
    const model = new Float32Array(16);
    const pointer = { x: 0, y: 0 };
    let time = 0;
    let spin = 0;
    let tiltX = 0;
    let tiltY = 0;
    let raf = 0;
    let last = 0;
    let lastDraw = 0;
    let readySent = false;
    // Frame-time watchdog: if the first frames are slow, drop to 1× pixel ratio once
    let slowFrames = 0;
    let sampled = 0;

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (frameInterval && now - lastDraw < frameInterval - 2) return;
      const dt = Math.min((now - (last || now)) / 1000, 0.05); // no jump after a pause
      if (last && sampled < 90 && dpr > 1) {
        sampled++;
        if (now - last > (frameInterval || 16.7) * 1.6) slowFrames++;
        if (slowFrames > 20) {
          dpr = 1;
          resize();
          sampled = 90;
        }
      }
      last = now;
      lastDraw = now;

      time += dt;
      spin += dt * 0.06;
      tiltX += (pointer.y * 0.25 - tiltX) * ease(dt, 2.5);
      tiltY += (pointer.x * 0.35 - tiltY) * ease(dt, 2.5);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uPhase, (time * 0.02) % 1);
      gl.uniformMatrix4fv(uModel, false, rotationXY(tiltX, tiltY + spin, model));
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);

      if (!readySent) {
        readySent = true;
        onReady();
      }
    };

    // Render only while the hero is on screen and the tab is visible
    let onScreen = true;
    const update = () => {
      const run = onScreen && !document.hidden;
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(draw);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", update);

    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!touch) window.addEventListener("pointermove", onMove, { passive: true });

    // Mobile GPUs drop contexts under memory pressure: go back to the static sphere
    const onLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
      onFail();
    };
    canvas.addEventListener("webglcontextlost", onLost);

    update();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

export default HeroScene;
