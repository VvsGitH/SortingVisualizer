import{j as I,r as d,u as O,a as C,R as k,b as j}from"./vendor.24043232.js";const w=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}};w();function g(e,n,i){let r=i[n];i[n]=i[e],i[e]=r}function L(e){const n=[{type:"INIT",arr:[...e]}];for(let i=0;i<e.length-1;i++){let r=!1;for(let t=0;t<e.length-i-1;t++)n.push({type:"COMP",i1:t+1,i2:t}),e[t+1]<e[t]&&(r=!0,g(t+1,t,e),n.push({type:"SWAP",i1:t+1,i2:t,arr:[...e]}));if(!r)break}return n}function W(e){const n=[{type:"INIT",arr:[...e]}];for(let i=0;i<e.length-1;i++){let r=i;for(let t=i+1;t<e.length;t++)n.push({type:"COMP",i1:t,i2:r}),e[t]<e[r]&&(r=t);i!==r&&(g(i,r,e),n.push({type:"SWAP",i1:i,i2:r,arr:[...e]}))}return n}function _(e){const n=[{type:"INIT",arr:[...e]}];for(let i=1;i<e.length;i++){let r=e[i],t=i-1;for(;t>=0&&e[t]>r;)e[t+1]=e[t],n.push({type:"SWAP",i1:t+1,i2:t,arr:[...e]}),t--;e[t+1]=r,n.push({type:"SWAP",i1:t+1,arr:[...e]})}return n}function R(e){const n=[{type:"INIT",arr:[...e]}];function i(t,s,u){let l=u,a=s-1;for(let c=s;c<u;c++)n.push({type:"COMP",i1:l,i2:c,i3:a>=s?a:void 0,sstart:s,send:u}),e[c]<e[l]&&(a++,g(a,c,t),n.push({type:"SWAP",i1:l,i2:c,i3:a,sstart:s,send:u,arr:[...t]}));return g(a+1,u,t),l=a+1,n.push({type:"SWAP",i1:l,i3:a,sstart:s,send:u,arr:[...t]}),l}function r(t,s,u){if(s<0||s>=u)return;const l=i(t,s,u);r(t,s,l-1),r(t,l+1,u)}return r(e,0,e.length-1),n}function B(e){const n=[{type:"INIT",arr:[...e]}];function i(t,s,u,l){let a=s,c=u+1,p=0;if(t[u]<t[c]){n.push({type:"COMP",i1:u,i2:c,sstart:s,send:l});return}const f=[];for(;a<=u&&c<=l;)n.push({type:"COMP",i1:a,i2:c,sstart:s,send:l}),t[a]<=t[c]?(f[p]=t[a],a++):(f[p]=t[c],c++),p++;for(;a<=u;)f[p]=t[a],p++,a++;for(;c<=l;)f[p]=t[c],p++,c++;for(let o=s;o<=l;o++)t[o]=f[o-s],n.push({type:"SWAP",i1:o,sstart:s,send:l,arr:[...t]})}function r(t,s,u){if(s<u){let l=Math.floor((s+u)/2);r(t,s,l),r(t,l+1,u),i(t,s,l,u)}}return r(e,0,e.length-1),n}const b={BUBBLE:{name:"Bubble Sort",sorter:L},SELECTION:{name:"Selection Sort",sorter:W},INSERTION:{name:"Insertion Sort",sorter:_},QUICK:{name:"Quick Sort",sorter:R},MERGE:{name:"Merge Sort",sorter:B}},H=20,z=400,v=20,F="BUBBLE",N=50;function G(e,n,i){return Array.from({length:(n-e)/i+1},(r,t)=>e+t*i)}function U(e){if(!(e!=null&&e.length))return e;let n,i,r=e.length;for(;--r;)i=Math.floor(Math.random()*(r+1)),n=e[i],e[i]=e[r],e[r]=n;return e}function D(e,n,i){return U(G(e,n,Math.floor(n/i)))}const m=I.exports.jsx,h=I.exports.jsxs;function V({onSubmit:e,started:n,toggleStart:i}){const[r,t]=d.exports.useState(v),[s,u]=d.exports.useState(F),[l,a]=d.exports.useState(N),[c,p]=d.exports.useState(!1);return h("form",{className:"options-container",onSubmit:o=>{o.preventDefault(),e({num:r,alg:s,speed:l,animation:c})},children:[h("div",{className:"input-field",children:[m("label",{htmlFor:"num-elements",children:"Number of Elements"}),m("input",{id:"num-elements",type:"number",min:"2",max:"200",value:r,onChange:o=>t(parseInt(o.target.value))})]}),h("div",{className:"input-field",children:[m("label",{htmlFor:"alg-selector",children:"Algorithm"}),m("select",{id:"alg-selector",value:s,onChange:o=>u(o.target.value),children:Object.keys(b).map(o=>m("option",{value:o,children:b[o].name},o))})]}),h("div",{className:"input-field",children:[m("label",{htmlFor:"step-duration",children:"Step duration [ms]"}),m("input",{id:"step-duration",type:"number",min:"10",max:"1000",value:l,onChange:o=>a(parseInt(o.target.value))})]}),h("div",{className:"input-field",children:[m("label",{htmlFor:"anim-enabled",children:"Enable Animations"}),m("input",{id:"anim-enabled",type:"checkbox",checked:c,onChange:o=>p(o.target.checked)})]}),m("input",{type:"submit",value:"SET"}),m("input",{type:"button",value:n?"STOP":"START",onClick:o=>i()})]})}function x({isMain:e,isSecondary:n,isTertiary:i}){return e?" main":n?" secondary":i?" tertiary":""}function E({isSectionStart:e,isSectionEnd:n}){return e?" section-start":n?" section-end":""}function q(e){return m("div",{className:"bar"+x(e)+E(e),style:{height:e.height}})}const K=d.exports.memo(q);function Q(e){const n=d.exports.useRef(e.height);d.exports.useEffect(()=>{n.current=e.height},[e.height]);const i=O({from:{height:n.current},to:{height:e.height}});return m(C.div,{className:"bar"+x(e)+E(e),style:i})}const X=d.exports.memo(Q);function $({steps:e,speed:n,stepAnimation:i,started:r,toggleStart:t}){var p;const[s,u]=d.exports.useState(0),l=d.exports.useRef([]);d.exports.useEffect(()=>{u(0)},[e]),d.exports.useEffect(()=>{let f;return r&&(f=setInterval(()=>{let o=!1;u(S=>(S<e.length-1?S+=1:(o=!0,clearInterval(f)),S)),o&&t()},n)),()=>{f&&clearInterval(f)}},[r,n,e.length,t]);const a=d.exports.useMemo(()=>i?X:K,[i]);if(!e)return m("div",{id:"NO_STEPS"});const c=((p=e[s])==null?void 0:p.arr)||l.current;return l.current=c,h("div",{className:"bar-container",children:[m("div",{className:"step-counter",children:s}),c.map((f,o)=>m(a,{height:f,isMain:e[s].i1===o,isSecondary:e[s].i2===o,isTertiary:e[s].i3===o,isSectionStart:e[s].sstart===o,isSectionEnd:e[s].send===o},o))]})}var J=d.exports.memo($);function Y(){return m("div",{className:"bar-container",children:m("div",{className:"spinner-container",children:m("div",{className:"spinner"})})})}function Z(){return new Worker("/SortingVisualizer/assets/SortingWorker.ba3b274e.js",{type:"module"})}function ee(){const[e,n]=d.exports.useState(()=>[{type:"INIT",arr:D(H,z,v)}]),[i,r]=d.exports.useState(N),[t,s]=d.exports.useState(!1),[u,l]=d.exports.useState(!1),a=d.exports.useCallback(()=>{l(o=>!o)},[]),[c,p]=d.exports.useState(!1),f=d.exports.useCallback(o=>{const{num:S,alg:A,speed:M,animation:T}=o;l(!1),p(!0),r(M),s(T);const y=new Z;y.onmessage=P=>{n(P.data),p(!1)},y.postMessage({num:S,alg:A})},[]);return h("main",{children:[m(V,{onSubmit:f,started:u,toggleStart:a}),c?m(Y,{}):m(J,{steps:e,speed:i,stepAnimation:t,started:u,toggleStart:a})]})}k.render(m(j.StrictMode,{children:m(ee,{})}),document.getElementById("root"));
