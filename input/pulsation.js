c = document.createElement('canvas')
w = c.width = window.innerWidth
h = c.height = window.innerHeight
document.body.append(c)

a = `void main(){gl_Position=vec4(0,0,0,1);gl_PointSize=${w > h ? w : h}.;}`
b = `precision mediump float;uniform float t;void main(){float r=ceil(cos(radians(gl_FragCoord.x))+cos(radians(gl_FragCoord.y))+t),g=cos(r),b=cos(g);gl_FragColor=vec4(r,g,b,1);}`
g = c.getContext('webgl')

v = g.createShader(g.VERTEX_SHADER)
g.shaderSource(v, a)
g.compileShader(v)

f = g.createShader(g.FRAGMENT_SHADER)
g.shaderSource(f, b)
g.compileShader(f)

p = g.createProgram()
g.attachShader(p, v)
g.attachShader(p, f)
g.linkProgram(p)
g.useProgram(p)

t = g.getUniformLocation(p, 't')

{(d = _ => {
    g.uniform1f(t, performance.now() / 2000)
    g.drawArrays(g.POINTS, 0, 1)
    requestAnimationFrame(d)
})()}
