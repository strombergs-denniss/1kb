document.body.style.margin = 0
const vss = 'uniform float s;void main(){gl_Position=vec4(0,0,0,1);gl_PointSize=s;}'
const fss = 'precision mediump float;uniform float v;void main(){float r=ceil(cos(radians(gl_FragCoord.x))+cos(radians(gl_FragCoord.y))+v),g=cos(r),b=cos(g);gl_FragColor=vec4(r,g,b,1);}'

const c = document.createElement('canvas')
const w = window.innerWidth
const h = window.innerHeight
c.width = w
c.height = h
document.body.append(c)
const gl = c.getContext('webgl')

const vs = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vs, vss)
gl.compileShader(vs)

const fs = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fs, fss)
gl.compileShader(fs)

const p = gl.createProgram()
gl.attachShader(p, vs)
gl.attachShader(p, fs)
gl.linkProgram(p)
gl.useProgram(p)

const vl = gl.getUniformLocation(p, 'v')
gl.uniform1f(gl.getUniformLocation(p, 's'), w > h ? w : h)

{(d = () => {
    gl.uniform1f(vl, performance.now() / 1000)
    gl.drawArrays(gl.POINTS, 0, 1)
    requestAnimationFrame(d)
})()}
