(function(){"use strict";function I(t,s,n){let o=n[s];n[s]=n[t],n[t]=o}function S(t){const s=[{type:"INIT",arr:[...t]}];for(let n=0;n<t.length-1;n++){let o=!1;for(let e=0;e<t.length-n-1;e++)s.push({type:"COMP",i1:e+1,i2:e}),t[e+1]<t[e]&&(o=!0,I(e+1,e,t),s.push({type:"SWAP",i1:e+1,i2:e,arr:[...t]}));if(!o)break}return s}function m(t){const s=[{type:"INIT",arr:[...t]}];for(let n=0;n<t.length-1;n++){let o=n;for(let e=n+1;e<t.length;e++)s.push({type:"COMP",i1:e,i2:o}),t[e]<t[o]&&(o=e);n!==o&&(I(n,o,t),s.push({type:"SWAP",i1:n,i2:o,arr:[...t]}))}return s}function y(t){const s=[{type:"INIT",arr:[...t]}];for(let n=1;n<t.length;n++){let o=t[n],e=n-1;for(;e>=0&&t[e]>o;)t[e+1]=t[e],s.push({type:"SWAP",i1:e+1,i2:e,arr:[...t]}),e--;t[e+1]=o,s.push({type:"SWAP",i1:e+1,arr:[...t]})}return s}function M(t){const s=[{type:"INIT",arr:[...t]}];function n(e,i,u){let p=u,c=i-1;for(let r=i;r<u;r++)s.push({type:"COMP",i1:p,i2:r,i3:c>=i?c:void 0,sstart:i,send:u}),t[r]<t[p]&&(c++,I(c,r,e),s.push({type:"SWAP",i1:p,i2:r,i3:c,sstart:i,send:u,arr:[...e]}));return I(c+1,u,e),p=c+1,s.push({type:"SWAP",i1:p,i3:c,sstart:i,send:u,arr:[...e]}),p}function o(e,i,u){if(i<0||i>=u)return;const p=n(e,i,u);o(e,i,p-1),o(e,p+1,u)}return o(t,0,t.length-1),s}function d(t){const s=[{type:"INIT",arr:[...t]}];function n(e,i,u,p){let c=i,r=u+1,l=0;if(e[u]<e[r]){s.push({type:"COMP",i1:u,i2:r,sstart:i,send:p});return}const f=[];for(;c<=u&&r<=p;)s.push({type:"COMP",i1:c,i2:r,sstart:i,send:p}),e[c]<=e[r]?(f[l]=e[c],c++):(f[l]=e[r],r++),l++;for(;c<=u;)f[l]=e[c],l++,c++;for(;r<=p;)f[l]=e[r],l++,r++;for(let h=i;h<=p;h++)e[h]=f[h-i],s.push({type:"SWAP",i1:h,sstart:i,send:p,arr:[...e]})}function o(e,i,u){if(i<u){let p=Math.floor((i+u)/2);o(e,i,p),o(e,p+1,u),n(e,i,p,u)}}return o(t,0,t.length-1),s}const g={BUBBLE:{name:"Bubble Sort",sorter:S},SELECTION:{name:"Selection Sort",sorter:m},INSERTION:{name:"Insertion Sort",sorter:y},QUICK:{name:"Quick Sort",sorter:M},MERGE:{name:"Merge Sort",sorter:d}},P=20,A=400;function N(t,s,n){return Array.from({length:(s-t)/n+1},(o,e)=>t+e*n)}function T(t){if(!(t!=null&&t.length))return t;let s,n,o=t.length;for(;--o;)n=Math.floor(Math.random()*(o+1)),s=t[n],t[n]=t[o],t[o]=s;return t}function w(t,s,n){return T(N(t,s,Math.floor(s/n)))}function E(t,s){const n=w(P,A,t);return g[s].sorter(n)}onmessage=t=>{const{num:s,alg:n}=t.data,o=E(s,n);console.log(o),postMessage(o)}})();