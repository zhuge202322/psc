'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// 顶点着色器：处理从球体到平面的变换
const vertexShader = `
  uniform float uTime;
  
  varying vec2 vUv;
  varying vec3 vPosition;

  #define PI 3.14159265359

  void main() {
    vUv = uv;
    
    // 球体坐标 (标准球体)
    float phi = (1.0 - uv.y) * PI; // 纬度 0 ~ PI
    float theta = uv.x * 2.0 * PI - PI; // 经度 -PI ~ PI
    theta = theta - PI / 2.0; 

    float radius = 2.5;
    vec3 spherePos = vec3(
      radius * sin(phi) * cos(theta),
      radius * cos(phi),
      radius * sin(phi) * sin(theta)
    );
    
    vPosition = spherePos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(spherePos, 1.0);
    
    float dist = distance(cameraPosition, spherePos);
    gl_PointSize = 15.0 / dist;
  }
`;

// 片元着色器：处理颜色和发光
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec4 mapColor = texture2D(uTexture, vUv);
    
    // 基础颜色 (用户自定义 #16BC9C)
    // 降低亮度，让颜色更深沉
    vec3 color = vec3(0.086, 0.737, 0.612) * 0.6;
    
    float visibility = mapColor.r; 
    
    if (visibility < 0.4) discard;

    float pulse = sin(uTime * 1.0) * 0.1 + 0.6;
    
    gl_FragColor = vec4(color * visibility * pulse, 0.6);
  }
`;

// 主要国家坐标数据
const LOCATIONS = [
  { name: 'China', lat: 35.8617, lon: 104.1954 },
  { name: 'USA', lat: 37.0902, lon: -95.7129 },
  { name: 'UK', lat: 55.3781, lon: -3.4360 },
  { name: 'Australia', lat: -25.2744, lon: 133.7751 },
  { name: 'Brazil', lat: -14.2350, lon: -51.9253 },
  { name: 'South Africa', lat: -30.5595, lon: 22.9375 },
];

// 坐标转换辅助函数
function getPosition(lat: number, lon: number, radius: number) {
  const PI = Math.PI;
  
  // 计算球面坐标
  const phi = (90 - lat) * (PI / 180);
  const theta = (lon + 90) * (PI / 180); // +90 修正纹理偏移

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

// 航线组件
const Route = ({ start, end, mid, color }: { start: THREE.Vector3, end: THREE.Vector3, mid: THREE.Vector3, color: string }) => {
  const lineRef = useRef<THREE.Line>(null!);
  const [markerOpacity, setMarkerOpacity] = useState(0);
  
  // 生成静态的 geometry 和 attribute，只在 mount 时运行一次
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pointCount = 50;
    const positions = new Float32Array(pointCount * 3);
    const progress = new Float32Array(pointCount);
    
    // 计算固定路径
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(pointCount - 1);
    
    for(let i=0; i<pointCount; i++) {
        positions[i*3] = points[i].x;
        positions[i*3+1] = points[i].y;
        positions[i*3+2] = points[i].z;
        progress[i] = i / (pointCount - 1);
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('lineProgress', new THREE.BufferAttribute(progress, 1));
    return geo;
  }, [start, end, mid]);

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    uniforms: {
        uColor: { value: new THREE.Color(color) },
        uHead: { value: 0 },
    },
    vertexShader: `
        attribute float lineProgress;
        varying float vLineProgress;
        void main() {
            vLineProgress = lineProgress;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 uColor;
        uniform float uHead;
        varying float vLineProgress;
        
        void main() {
            // 彗星拖尾效果
            float len = 0.3; // 拖尾长度
            float alpha = smoothstep(uHead - len, uHead, vLineProgress) * (1.0 - step(uHead, vLineProgress));
            
            gl_FragColor = vec4(uColor, alpha);
        }
    `
  }), [color]);

  // 动画状态
  const state = useRef({ 
    head: 0, 
    speed: 0.5 + Math.random() * 0.5, // 随机速度
    delay: Math.random() * 2 // 随机延迟
  });

  useFrame((_, delta) => {
    // 2. 更新动画进度
    state.current.head += delta * state.current.speed;
    
    // 循环周期: 0 -> 1 (飞行) -> 1.5 (等待) -> loop
    const cycle = 1.5 + state.current.delay; 
    const effectiveHead = state.current.head % cycle;
    
    // Shader 更新
    shaderMaterial.uniforms.uHead.value = effectiveHead;

    // 3. 亮点闪烁逻辑
    if (effectiveHead > 0.95 && effectiveHead < 1.05) {
        setMarkerOpacity(1);
    } else if (effectiveHead > 1.05 || effectiveHead < 0.1) {
        setMarkerOpacity(prev => THREE.MathUtils.lerp(prev, 0, delta * 5));
    }
  });

  return (
    <>
      {/* @ts-ignore */}
      <line ref={lineRef} geometry={geometry} material={shaderMaterial} frustumCulled={false} />
      
      {/* 终点亮点 */}
      <group position={end}>
        {/* 核心亮点 */}
        <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={markerOpacity} toneMapped={false} />
        </mesh>
        {/* 光晕 */}
        <mesh scale={[1 + markerOpacity, 1 + markerOpacity, 1 + markerOpacity]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={markerOpacity * 0.3} toneMapped={false} />
        </mesh>
      </group>
    </>
  );
};

interface EarthProps {}

function EarthGroup() {
  const groupRef = useRef<THREE.Group>(null!);
  const earthMeshRef = useRef<THREE.Points>(null!);
  const texture = useLoader(THREE.TextureLoader, '/earth_specular_2048.jpg');
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    // 1. 更新 Shader 时间
    if (earthMeshRef.current) {
      // @ts-ignore
      earthMeshRef.current.material.uniforms.uTime.value += delta;
    }

    // 2. 旋转逻辑
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 160, 80), []);

  // 计算固定位置的标记点
  const markers = useMemo(() => LOCATIONS.map(loc => ({
    ...loc,
    pos: getPosition(loc.lat, loc.lon, 2.5)
  })), []);

  // 计算固定航线数据
  const routeData = useMemo(() => {
    const routes = [];
    const startLoc = LOCATIONS[0]; // China
    const startPos = getPosition(startLoc.lat, startLoc.lon, 2.5);

    for (let i = 1; i < LOCATIONS.length; i++) {
      const endLoc = LOCATIONS[i];
      const endPos = getPosition(endLoc.lat, endLoc.lon, 2.5);
      
      const mid = startPos.clone().add(endPos).multiplyScalar(0.5).normalize().multiplyScalar(3.5); 
      routes.push({ start: startPos, end: endPos, mid });
    }
    return routes;
  }, []);

  return (
    <group ref={groupRef}>
      {/* 地球本体 */}
      <points ref={earthMeshRef} geometry={geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* 起点: China (常亮) */}
      <group position={getPosition(LOCATIONS[0].lat, LOCATIONS[0].lon, 2.5)}>
        <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#4fd1c5" />
        </mesh>
        <mesh scale={[1.5, 1.5, 1.5]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#4fd1c5" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* 动态航线和终点 */}
      {routeData.map((route, i) => (
        <Route 
            key={i}
            start={route.start}
            end={route.end}
            mid={route.mid}
            color="#2dd4bf"
        />
      ))}

      {/* 装饰性环绕轨道 */}
      <>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#16BC9C" transparent opacity={0.1} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.5, 0.01, 16, 100]} />
          <meshBasicMaterial color="#16BC9C" transparent opacity={0.05} />
        </mesh>
      </>
    </group>
  );
}

export default function DigitalEarth() {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-[#020617] overflow-hidden">
      {/* 3D 场景 - 地球向右偏移 */}
      <div className="absolute inset-0 z-0 left-1/3">
        <Canvas camera={{ position: [2.5, 0, 9.5], fov: 35 }}> 
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          
          <React.Suspense fallback={null}>
            <EarthGroup />
          </React.Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>

      {/* 左侧文字内容区域 */}
      <div className="absolute inset-0 z-10 container mx-auto px-4 pointer-events-none flex items-center">
        <div className="w-full md:w-1/2 pointer-events-auto pl-4 md:pl-12">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                {/* 主标题 */}
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-2">
                    Your Supply <br />
                    Chain
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold text-teal-400 leading-tight mb-8">
                    Master Key <br />
                    in China.
                </h2>

                {/* 装饰线和描述 */}
                <div className="flex gap-6 mb-10">
                    <div className="w-1 bg-teal-500 rounded-full shrink-0 h-auto min-h-[80px]"></div>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg font-light">
                        We don't just ship products. We manage the entire lifecycle—from sourcing & vetting to engineering & DDP logistics.
                    </p>
                </div>

                {/* 按钮 */}
                <div className="flex gap-4">
                    <a href="/solutions" className="group bg-[#0f172a] border border-gray-700 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2 hover:bg-teal-500 hover:border-teal-500 transition-all duration-300">
                        Explore Services 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
