!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){function n(){return"serviceWorker"in navigator&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}e.install=function(t){if(t||(t={}),n())navigator.serviceWorker.register("sw.js",{});else;},e.applyUpdate=function(t,e){},e.update=function(){n()&&navigator.serviceWorker.getRegistration().then((function(t){if(t)return t.update()}))}},function(t,e,n){"use strict";n.r(e);var r=function(t,e,n){return e.split(" ").forEach((function(e){return t.addEventListener(e,n)}))},o=function(t){var e=t.target.getBoundingClientRect(),n=e.left,r=e.top,o=t.touches?t.touches[0]:t;return{x:o.clientX-n,y:o.clientY-r}},i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1?arguments[1]:void 0;return isNaN(e)?Math.random()*t:Math.random()*(e-t)+t},c=function(t,e){return localStorage.setItem(t,e)},u=function(t,e){return c(t,JSON.stringify(e))},a=function(t){return localStorage.getItem(t)},s=function(t){try{return JSON.parse(a(t))}catch(t){return null}},l=function(t,e,n,r){var o=t.canvas,i=o.width,c=o.height;t.beginPath(),t.arc(e*i,n*c,r,0,2*Math.PI),t.fill()},f=function(t,e,n,r){for(var o=-1;o<=1;o++)for(var i=-1;i<=1;i++)l(t,e+o,n+i,r)},h=function(t,e){return Array.from({length:t},(function(){return{x:Math.random(),y:Math.random(),r:Math.pow(Math.random(),2)*(e/4)}}))};function p(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1024,e=arguments.length>1?arguments[1]:void 0,n=document.createElement("canvas");n.width=n.height=t;var r=n.getContext("2d");r.fillStyle="#fff",r.fillRect(0,0,t,t),r.globalAlpha=.01;var o=e&&s("textureHue")||Math.floor(360*Math.random());r.fillStyle="hsl(".concat(o,", 100%, 80%)"),u("textureHue",o);var i=e&&s("texturePoints")||h(150,t);return i.forEach((function(t){var e=t.x,n=t.y,o=t.r;return f(r,e,n,o)})),u("texturePoints",i),r.createPattern(n,"repeat")}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var v=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.ctx=e,this.isDrawing=!1,this.lastX=0,this.lastY=0}var e,n,r;return e=t,r=[{key:"setSize",value:function(e){t.size=e}},{key:"setColor",value:function(e){t.color=e}}],(n=[{key:"startDraw",value:function(t){this.lastX=t.x,this.lastY=t.y,this.isDrawing=!0,this.draw(t)}},{key:"stopDraw",value:function(){this.isDrawing=!1}},{key:"draw",value:function(t){this.isDrawing&&(this.doDraw(this.lastX,this.lastY,t.x,t.y),this.lastX=t.x,this.lastY=t.y)}},{key:"doDraw",value:function(){}},{key:"getImage",value:function(){return"brush"}}])&&y(e.prototype,n),r&&y(e,r),t}();function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function b(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function w(t,e){return(w=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=S(t);if(e){var o=S(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return x(this,n)}}function x(t,e){return!e||"object"!==d(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function S(t){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}v.size=20,v.color="#000";var O=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&w(t,e)}(i,t);var e,n,r,o=m(i);function i(){return b(this,i),o.apply(this,arguments)}return e=i,(n=[{key:"doDraw",value:function(t,e,n,r){t===n&&e===r&&(n+=.1),this.ctx.strokeStyle=v.color,this.ctx.lineWidth=v.size,this.ctx.lineCap="round",this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(n,r),this.ctx.stroke()}},{key:"getImage",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#301";return'\n      <svg width="'.concat(t,'" height="').concat(t,'" viewBox="0 0 32 32">\n        <circle fill="').concat(e,'" cx="16" cy="16" r="16"/>\n      </svg>\n    ')}}])&&g(e.prototype,n),r&&g(e,r),i}(v);function k(t){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function P(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function R(t,e){return(R=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=B(t);if(e){var o=B(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return D(this,n)}}function D(t,e){return!e||"object"!==k(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function B(t){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var M=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&R(t,e)}(c,t);var e,n,r,o=_(c);function c(){return P(this,c),o.apply(this,arguments)}return e=c,(n=[{key:"doDraw",value:function(t,e,n,r){this.ctx.fillStyle=v.color;for(var o=0;o<16;o++){var c=i(2*Math.PI),u=i(v.size),a=i(v.size/(2+u/4)),s=n+Math.cos(c)*u,l=r+Math.sin(c)*u;this.ctx.beginPath(),this.ctx.arc(s,l,a,0,2*Math.PI),this.ctx.fill()}}},{key:"getImage",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#301";return'\n      <svg width="'.concat(t,'" height="').concat(t,'" viewBox="0 0 32 32">\n        <path fill="').concat(e,'" d="M8.3 14A4 4 0 1 1 12 7.3V7a7 7 0 1 1 13.1 3.4A5 5 0 0 1 32 15a5 5 0 0 1-8.4 3.6 8 8 0 0 1-11.9 4.2A6 6 0 1 1 8 15.4l.3-1.5zM22 32a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>\n      </svg>\n    ')}}])&&j(e.prototype,n),r&&j(e,r),c}(v);function E(t){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function C(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function z(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function I(t,e,n){return(I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=A(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function T(t,e){return(T=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function L(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=A(t);if(e){var o=A(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return H(this,n)}}function H(t,e){return!e||"object"!==E(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function A(t){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var N=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&T(t,e)}(c,t);var e,n,r,o=L(c);function c(){return C(this,c),o.apply(this,arguments)}return e=c,(n=[{key:"doDraw",value:function(t,e,n,r){I(A(c.prototype),"doDraw",this).call(this,t,e,n,r),this.animateDrip(n,r)}},{key:"getImage",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#301";return'\n      <svg width="'.concat(t,'" height="').concat(t,'" viewBox="0 0 32 32">\n        <path fill="').concat(e,'" d="M25 19.524V28.5a3.5 3.5 0 0 1-7 0v-7.449l-1 .211V22.5a4.5 4.5 0 1 1-9 0v-.216c-3.78-.794-6.923-3.718-7.778-7.708-1.157-5.402 2.32-10.712 7.765-11.86L19.821.22c5.446-1.149 10.799 2.3 11.957 7.702 1.086 5.068-1.907 10.055-6.778 11.6z" />\n      </svg>\n    ')}},{key:"animateDrip",value:function(t,e){var n=this;if(!(i()>.3)){var r=O.size,o=i(.2,.4)*r,c=i(.3,.7),u=i(.975,.995),a=O.color,s=r-o,l=t+i(s)-s/2,f=e;!function t(){f+=c,(c*=u)>.1&&requestAnimationFrame(t),n.ctx.fillStyle=a,n.ctx.beginPath(),n.ctx.arc(l,f,o/2,0,2*Math.PI),n.ctx.fill()}()}}}])&&z(e.prototype,n),r&&z(e,r),c}(O);function q(t){return(q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function W(t,e){return(W=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function X(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=U(t);if(e){var o=U(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return F(this,n)}}function F(t,e){return!e||"object"!==q(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function U(t){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var V=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&W(t,e)}(i,t);var e,n,r,o=X(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(e=o.call(this,t)).fill="#fff",e}return e=i,(n=[{key:"setFill",value:function(t){this.fill=t}},{key:"doDraw",value:function(t,e,n,r){var o=this.ctx.fillStyle,i=v.size;this.ctx.fillStyle=this.fill,this.ctx.beginPath(),this.ctx.arc(n-i/2,r-i/2,i,0,2*Math.PI),this.ctx.fill(),this.ctx.fillStyle=o}},{key:"getImage",value:function(t){return'\n      <svg width="32" height="32" viewBox="0 0 32 32">\n        <g fill="none" fill-rule="evenodd">\n          <path fill="'.concat(t=t?"#fff":"#301",'" fill-rule="nonzero" d="M17.5 4.23l-7.4 7.4 10.24 10.22 7.39-7.39c1-1 1-2.7 0-3.7l-6.54-6.53c-1-1-2.7-1-3.7 0z"/>\n          <path stroke="').concat(t,'" stroke-linejoin="round" stroke-linecap="round" stroke-width="4" d="M14.8 27.68L27.86 14.6c1-1 1-2.7 0-3.7l-6.54-6.54c-1-1-2.7-1-3.7 0L3.86 18.16c-1 1-1 2.7 0 3.7l5.83 5.82H30"/>\n        </g>\n      </svg>\n    ')}}])&&Y(e.prototype,n),r&&Y(e,r),i}(v);function J(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function G(t,e,n){var o=document.createElement("div");return o.className=t,r(o,"click",n),e.appendChild(o),o}var K=function(){function t(e){var n=this,r=e.colors,o=e.brushes,i=e.sizes,c=e.context,u=e.eraser,a=e.colorContainer,l=e.brushContainer,f=e.sizeContainer,h=e.menuButton;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.setBackground=function(t){return n.eraser.setFill(t)},this.startDraw=function(t){return n.currentBrush.startDraw(t)},this.draw=function(t){return n.currentBrush.draw(t)},this.stopDraw=function(){return n.currentBrush.stopDraw()},this.brushes=o.map((function(t){return new t(c)})),this.eraser=new u(c),this.menuButton=h,this.currentBrush=this.brushes[s("brushNumber")]||this.brushes[0],this.previousBrush=this.currentBrush,v.setColor(s("brushColor")||r[1]),v.setSize(s("brushSize")||i[1]),G("brushpicker eraser",l,(function(){return n.setBrush(n.eraser)})).innerHTML=this.eraser.getImage(),r.forEach((function(t){G("colorpicker",a,(function(){return n.setColor(t)})).style.backgroundColor=t})),this.brushes.forEach((function(t){G("brushpicker",l,(function(){return n.setBrush(t)})).innerHTML=t.getImage()})),i.forEach((function(t){var e=G("sizepicker",f,(function(){return n.setSize(t)}));e.style.width=e.style.height="".concat(t,"px")})),this.updateButton()}var e,n,r;return e=t,(n=[{key:"setBrush",value:function(t){t!==this.eraser&&(this.previousBrush=t),this.currentBrush=t,u("brushNumber",this.brushes.indexOf(t)),this.updateButton()}},{key:"setSize",value:function(t){v.setSize(t),this.currentBrush=this.previousBrush,u("brushSize",t),this.updateButton()}},{key:"setColor",value:function(t){v.setColor(t),this.currentBrush=this.previousBrush,u("brushColor",t),this.updateButton()}},{key:"updateButton",value:function(){var t=Math.min(32,Math.max(8,v.size));this.menuButton.innerHTML=this.currentBrush.getImage(t,v.color)}}])&&J(e.prototype,n),r&&J(e,r),t}();var Q=function(t){return(t/90+4)%4},Z=function(){return"orientation"in window?Q(window.orientation):"orientation"in window.screen?Q(window.screen.orientation.angle):window.screen.width>window.screen.height?1:0};n(0).install();var $=document.querySelector("#drawingboard"),tt=document.querySelector("#menu"),et=document.querySelector("#menubutton"),nt=document.querySelector("#clear"),rt=document.querySelector("#save");/iP(hone|ad|od)/.test(navigator.userAgent)&&(rt.style.display="none"),new function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.checkRotation=function(){console.log("checkRotation");var t=Z(),e=(n.currentRotation-t+4)%4;n.currentRotation=t,console.log(e),e&&n.rotate(e)},this.rotate=function(t){var e=!!t%2,r=n.canvas.width,o=n.canvas.height,i=e?o:r,c=e?r:o,u=document.createElement("canvas"),a=u.getContext("2d");u.width=i,u.height=c,a.rotate(Math.PI/2*t),a.drawImage(n.canvas,t>1?-r:0,t<3?-o:0),n.canvas.width=i,n.canvas.height=c,n.canvas.getContext("2d").drawImage(u,0,0)},this.currentRotation=Z(),this.canvas=e,window.addEventListener("orientationchange",this.checkRotation),window.addEventListener("resize",this.checkRotation)}($);var ot=$.getContext("2d"),it=new K({context:ot,eraser:V,colors:["hsl(50, 100%, 99%)","hsl(48, 100%, 50%)","hsl(84, 82%, 35%)","hsl(216, 100%, 52%)","hsl(278, 93%, 40%)","hsl(353, 73%, 50%)","hsl(90, 73%, 5%)"],sizes:[40,20,10],brushes:[O,M,N],colorContainer:document.getElementById("colorcontainer"),sizeContainer:document.getElementById("sizecontainer"),brushContainer:document.getElementById("brushcontainer"),menuButton:document.getElementById("menubutton")});function ct(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=p(1024,t);it.setBackground(e),ot.fillStyle=e,ot.fillRect(0,0,$.width,$.height)}$.width=window.innerWidth,$.height=window.innerHeight,r($,"mousedown touchstart",(function(t){var e=o(t);it.startDraw(e),tt.classList.remove("active"),t.preventDefault()})),r($,"mousemove touchmove",(function(t){var e=o(t);it.draw(e),t.preventDefault()})),r($,"mouseup mouseleave touchend touchleave",(function(t){it.stopDraw(),c("image",$.toDataURL()),t.preventDefault()})),r(et,"click",(function(){return tt.classList.toggle("active")})),r(nt,"click",(function(){return ct()})),r(rt,"click",(function(){rt.href=$.toDataURL(),rt.download="doodle-".concat((t=new Date,[t.getFullYear(),t.getMonth()+1,t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds()].join("-")),".png");var t})),ct(!0);var ut=a("image");if(ut){var at=new Image;at.onload=function(){return ot.drawImage(at,0,0)},at.src=ut}}]);
//# sourceMappingURL=main.js.map