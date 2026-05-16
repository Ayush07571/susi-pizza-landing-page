export const cheeseMeltVert = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const cheeseMeltFrag = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uMeltAmount;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec2 uv = vUv;
    
    // Slight warping based on time and melt amount
    float wave = sin(uv.y * 10.0 + uTime) * 0.02 * uMeltAmount;
    uv.x += wave;
    
    vec4 texColor = texture2D(uTexture, uv);
    
    // Mask out black background
    if (texColor.r < 0.05 && texColor.g < 0.05 && texColor.b < 0.05) {
        discard;
    }
    
    // Add fake lighting
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 diffuse = diff * vec3(1.0, 0.9, 0.8) * 0.5;
    
    vec3 finalColor = texColor.rgb + diffuse;
    
    // Glow effect based on melt
    float glow = smoothstep(0.5, 1.0, uMeltAmount) * 0.2;
    finalColor += vec3(1.0, 0.8, 0.0) * glow;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;
