c = document.createElement('canvas')
w = c.width = window.innerWidth
h = c.height = window.innerHeight
document.body.append(c)

a = `void main(){gl_Position=vec4(0,0,0,1);gl_PointSize=${w > h ? w : h}.;}`
b = `precision mediump float;uniform float t;void main(){vec3 o=vec3(cos(t),cos(t),sin(t)),a=normalize(-o),b=normalize(cross(a,vec3(.0,1.,.0))),p,d=mat3(b,cross(b,a),a)*normalize(vec3((gl_FragCoord.xy*2.-vec2(${w},${h}))/${h}.,1.));float l=.0;for(int i=0;i<32;++i){p=o+d*l;l+=length(vec2(length(p.xz)-.6,p.y))-.2;gl_FragColor=vec4(l>8.?vec3(.0):mod(p,.5).xzz/l,1.);}}`
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
