(function(){var e={482:function(e,t,n){"use strict";n.r(t),t["default"]={title:e=>{const{normalize:t}=e;return t(["Breath"])},messages:{inhale:e=>{const{normalize:t}=e;return t(["Inhale"])},exhale:e=>{const{normalize:t}=e;return t(["Exhale"])},hold:e=>{const{normalize:t}=e;return t(["Hold"])},stomach:e=>{const{normalize:t}=e;return t(["(stomach)"])},chest:e=>{const{normalize:t}=e;return t(["(chest)"])},advanced:e=>{const{normalize:t}=e;return t(["Advanced"])}},sequences:{relax:{title:e=>{const{normalize:t}=e;return t(["Relaxation"])},description:e=>{const{normalize:t}=e;return t(["Calm your mind and ease your stress"])}},balance:{title:e=>{const{normalize:t}=e;return t(["Balance"])},description:e=>{const{normalize:t}=e;return t(["Relax your body and be more in the moment"])}},energy:{title:e=>{const{normalize:t}=e;return t(["Energy"])},description:e=>{const{normalize:t}=e;return t(["Strengthen your body and regain energy"])}},focus:{title:e=>{const{normalize:t}=e;return t(["Focus"])},description:e=>{const{normalize:t}=e;return t(["Sharpen your focus and improve your performance"])}},dynamism:{title:e=>{const{normalize:t}=e;return t(["Dynamism"])},description:e=>{const{normalize:t}=e;return t(["Boost your energy and focus"])}},chill:{title:e=>{const{normalize:t}=e;return t(["Relaxation"])},description:e=>{const{normalize:t}=e;return t(["Release the pressure and ease your mind"])}}}}},627:function(e,t,n){"use strict";n.r(t),t["default"]={title:e=>{const{normalize:t}=e;return t(["Breath"])},messages:{inhale:e=>{const{normalize:t}=e;return t(["Inspirez"])},exhale:e=>{const{normalize:t}=e;return t(["Expirez"])},hold:e=>{const{normalize:t}=e;return t(["Retenez"])},stomach:e=>{const{normalize:t}=e;return t(["(ventre)"])},chest:e=>{const{normalize:t}=e;return t(["(poitrine)"])},advanced:e=>{const{normalize:t}=e;return t(["Avancé"])}},sequences:{relax:{title:e=>{const{normalize:t}=e;return t(["Relaxation"])},description:e=>{const{normalize:t}=e;return t(["Calmez votre esprit et atténuez votre stress"])}},balance:{title:e=>{const{normalize:t}=e;return t(["Équilibre"])},description:e=>{const{normalize:t}=e;return t(["Relaxez votre corps et soyez plus dans le moment présent"])}},energy:{title:e=>{const{normalize:t}=e;return t(["Énergie"])},description:e=>{const{normalize:t}=e;return t(["Renforcez votre corps et retrouvez de l'énergie"])}},focus:{title:e=>{const{normalize:t}=e;return t(["Concentration"])},description:e=>{const{normalize:t}=e;return t(["Aiguisez votre concentration et améliorez vos performances"])}},dynamism:{title:e=>{const{normalize:t}=e;return t(["Dynamisme"])},description:e=>{const{normalize:t}=e;return t(["Stimulez votre énergie et votre attention"])}},chill:{title:e=>{const{normalize:t}=e;return t(["Détente"])},description:e=>{const{normalize:t}=e;return t(["Relâchez la pression et apaisez votre esprit"])}}}}},948:function(e,t,n){var r={"./en.json":482,"./fr.json":627};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id=948},131:function(e,t,n){"use strict";var r=n(963),a=n(252),o=n(577);const i={class:"appname"},s=(0,a.uE)('<div class="web"><div class="container"><div class="row"><div class="col-xs-12"><div class="alert alert-info" style="font-size:14px;">This app is meant to be used on a smartphone or a tablet...</div></div></div></div></div>',1),c={class:"mobile"},u={class:"router-view"};function l(e,t,n,r,l,d){const h=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",i,(0,o.zw)(e.$t("title")),1),s,(0,a._)("div",c,[(0,a._)("div",u,[(0,a.Wm)(h)])])],64)}var d=n(907);const h={en:"English",fr:"Français"};function p(){let e=[];for(const t of Object.keys(h))e.push({code:t,name:h[t]});return e}function m(e={}){const t={countryCodeOnly:!1},n={...t,...e},r=void 0!==navigator.languages?navigator.languages[0]:navigator.language;if(!r)return;const a=n.countryCodeOnly?r.trim().split(/-|_/)[0]:r.trim();return a}var g={name:"App",beforeCreate(){this.$store.commit("initializeFromLocalStorage")},data(){return{locales:p(),browserLocale:m({countryCodeOnly:!0})}},methods:{setLocale(e){console.debug("🌐 Previous $i18n.locale : "+this.$i18n.locale),this.$store.commit({type:"setUserLocale",locale:e}),this.$i18n.locale=e}},mounted(){console.debug("🌐 userLocale = "+this.$store.state.userLocale+" / i18n.locale = "+this.$i18n.locale),""!==this.userLocale&&void 0!=this.userLocale&&null!=this.userLocale?(console.debug("🌐 using userLocale"),this.setLocale(this.userLocale)):(console.debug("🌐 using browserLocale"),this.setLocale(this.browserLocale))},computed:{...(0,d.rn)({userLocale:e=>e.userLocale,breathTechnique:e=>e.breathTechnique,breathTechniques:e=>e.breathTechniques})}},f=n(744);const v=(0,f.Z)(g,[["render",l]]);var y=v,b=n(201);const q={id:"breathCarousel",class:"carousel carousel-dark","data-bs-ride":"false","data-bs-interval":"false","data-bs-keyboard":"false"},z={class:"carousel-inner"},w=(0,a.uE)('<button class="carousel-control-prev" type="button" data-bs-target="#breathCarousel" data-bs-slide="prev" data-v-6a44f41e><span class="carousel-control-prev-icon" aria-hidden="true" data-v-6a44f41e></span><span class="visually-hidden" data-v-6a44f41e>Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#breathCarousel" data-bs-slide="next" data-v-6a44f41e><span class="carousel-control-next-icon" aria-hidden="true" data-v-6a44f41e></span><span class="visually-hidden" data-v-6a44f41e>Next</span></button>',2);function x(e,t,n,r,i,s){const c=(0,a.up)("Breather");return(0,a.wg)(),(0,a.iD)("div",q,[(0,a._)("div",z,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.breathTechniques,((e,t)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",{class:(0,o.C_)(0==t?"carousel-item active":"carousel-item")},[(0,a.Wm)(c,{technique:e},null,8,["technique"])],2)])))),256))]),w])}const S={key:0,class:"breath-container"},k={key:0},T={key:1},I={class:"breath-controller"},D={key:1,class:"technique-infos"},L={class:"title"},O={class:"description"},_={key:0},C={class:"badge rounded-pill bg-light text-dark"},P={class:"breath-controller bottom"};function j(e,t,n,r,i,s){const c=(0,a.up)("Doughnut");return(0,a.wg)(),(0,a.iD)(a.HY,null,[i.timeoutInProgress?((0,a.wg)(),(0,a.iD)("div",S,[(0,a.Wm)(c,{class:"breath",ref:"chart","chart-data":s.chartData,"chart-options":i.chartOptions},null,8,["chart-data","chart-options"]),(0,a._)("div",{class:"ticker",style:(0,o.j5)("transform: rotate("+s.degrees+"deg);")},null,4),(0,a._)("div",{class:"action",style:(0,o.j5)("transform: scale("+s.scale+");")},[""!=i.currentAction?((0,a.wg)(),(0,a.iD)("span",k,(0,o.zw)(e.$t("messages."+i.currentAction)),1)):(0,a.kq)("",!0),""!=i.currentActionDetail?((0,a.wg)(),(0,a.iD)("span",T,(0,o.zw)(e.$t("messages."+i.currentActionDetail)),1)):(0,a.kq)("",!0)],4)])):(0,a.kq)("",!0),(0,a._)("div",I,[i.timeoutInProgress?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("span",{key:0,class:"material-symbols-outlined",onClick:t[0]||(t[0]=(...e)=>s.startTimer&&s.startTimer(...e))}," play_circle "))]),i.timeoutInProgress?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",D,[(0,a._)("div",L,(0,o.zw)(e.$t("sequences."+n.technique.code+".title")),1),(0,a._)("div",O,(0,o.zw)(e.$t("sequences."+n.technique.code+".description")),1),n.technique.advanced?((0,a.wg)(),(0,a.iD)("div",_,[(0,a._)("span",C,(0,o.zw)(e.$t("messages.advanced")),1)])):(0,a.kq)("",!0)])),(0,a._)("div",P,[i.timeoutInProgress?((0,a.wg)(),(0,a.iD)("span",{key:0,class:"material-symbols-outlined",onClick:t[1]||(t[1]=(...e)=>s.stopTimer&&s.stopTimer(...e))}," stop_circle ")):(0,a.kq)("",!0),i.timeoutInProgress?((0,a.wg)(),(0,a.iD)("span",{key:1,class:"material-symbols-outlined",onClick:t[2]||(t[2]=(...e)=>s.resetValues&&s.resetValues(...e))}," device_reset ")):(0,a.kq)("",!0)])],64)}var A=n(764),R=n(300);R.kL.register(R.Dx,R.u,R.De,R.qi,R.uw);var E={name:"Breather",components:{Doughnut:A.$I},props:{technique:{type:Object,default:{},required:!0}},data(){return{timeout:null,timeoutInProgress:!1,currentAction:"",currentActionDetail:"",currentStepIndex:0,lastScaleValue:1,chartOptions:{borderWidth:0,circumference:360,rotation:0,responsive:!0,maintainAspectRatio:!0,animation:!1,plugins:{legend:{display:!1},tooltip:{enabled:!1}}}}},computed:{step(){return this.technique.sequence[this.currentStepIndex]},remaining(){var e=this.arraySum(this.technique.sequence.map((e=>e.duration))),t=this.arraySum(this.technique.sequence.map((e=>e.current)));return e-t},chartData(){var e=this.arraySum(this.technique.sequence.map((e=>e.duration))),t=this.technique.sequence.map((e=>e.current)),n=this.technique.sequence.map((e=>e.color));return t.push(this.remaining),n.push("transparent"),{datasets:[{data:[e],backgroundColor:["#ffffffA0"],cutout:"99%"},{data:t,backgroundColor:n,cutout:"90%",borderRadius:30}]}},scale(){var e=1,t=this.step.current/this.step.duration,n=this.currentStepIndex-1>0?this.currentStepIndex-1:this.technique.sequence.length-1,r=this.technique.sequence[n].type,a=this.currentStepIndex+1<this.technique.sequence.length?this.currentStepIndex+1:0,o=this.technique.sequence[a].type;switch(this.step.type){case"inhale":r!=this.step.type&&o!=this.step.type?e=1+t:o==this.step.type?(e=1+t/2,this.lastScaleValue=e):r==this.step.type&&(e=this.lastScaleValue+t/2);break;case"hold":e=2;break;case"exhale":e=2-t;break;default:e=1;break}return e},degrees(){var e=this.arraySum(this.technique.sequence.map((e=>e.duration))),t=this.arraySum(this.technique.sequence.map((e=>e.current)));return Math.floor(360*t/e)}},methods:{arraySum(e){return e.reduce(((e,t)=>e+t),0)},setTechnique(e){this.stopTimer(),e.sequence.forEach((e=>{e.current=0})),console.log(JSON.stringify(this.technique))},startTimer(){this.timeout=setTimeout(this.updateValues,10),this.timeoutInProgress||(this.timeoutInProgress=!0)},stopTimer(){clearTimeout(this.timeout),this.timeoutInProgress=!1},resetValues(){this.currentStepIndex=0,this.technique.sequence.forEach((e=>{e.current=0}))},updateValues(){this.step.current>=this.step.duration&&(this.currentStepIndex+=1),this.currentStepIndex>=this.technique.sequence.length&&this.resetValues(),this.step.current<this.step.duration&&(0==this.step.current&&(this.currentAction=this.step.type,this.currentActionDetail=this.step.detail),this.step.current+=1),this.startTimer()}},watch:{technique(e,t){this.setTechnique(e)}},created(){this.setTechnique(this.technique)}};const $=(0,f.Z)(E,[["render",j],["__scopeId","data-v-416bc30a"]]);var M=$,V={name:"BreathView",components:{Breather:M},computed:{...(0,d.rn)({userLocale:e=>e.userLocale,breathTechnique:e=>e.breathTechnique,breathTechniques:e=>e.breathTechniques})}};const B=(0,f.Z)(V,[["render",x],["__scopeId","data-v-6a44f41e"]]);var N=B;const F=[{path:"/",name:"home",component:N}],Z=(0,b.p7)({history:(0,b.r5)(),routes:F});var H=Z,U=n(168);const W="store",J=new U.ZP({key:W,storage:window.localStorage,reducer:e=>({userLocale:e.userLocale,breathTechnique:e.breathTechnique})});var Y=(0,d.MT)({state:{userLocale:"",breathTechniqueIndex:0,breathTechnique:{},breathTechniques:[{code:"relax",durationInMinutes:5,advanced:!1,sequence:[{type:"inhale",detail:"",color:"#2196f3",duration:400},{type:"exhale",detail:"",color:"#f44336",duration:600}]},{code:"balance",durationInMinutes:2,advanced:!1,sequence:[{type:"inhale",detail:"",color:"#2196f3",duration:400},{type:"hold",detail:"",color:"lightgreen",duration:200},{type:"exhale",detail:"",color:"#f44336",duration:400}]},{code:"energy",durationInMinutes:2,advanced:!1,sequence:[{type:"inhale",detail:"stomach",color:"#64b5f6",duration:250},{type:"inhale",detail:"chest",color:"#1976d2",duration:250},{type:"exhale",detail:"",color:"#f44336",duration:500}]},{code:"focus",durationInMinutes:2,advanced:!1,sequence:[{type:"inhale",detail:"",color:"#2196f3",duration:400},{type:"hold",detail:"",color:"lightgreen",duration:400},{type:"exhale",detail:"",color:"#f44336",duration:400},{type:"hold",detail:"",color:"lightgreen",duration:400}]},{code:"dynamism",durationInMinutes:1,advanced:!0,sequence:[{type:"inhale",detail:"",color:"#2196f3",duration:400},{type:"exhale",detail:"",color:"#f44336",duration:200}]},{code:"chill",durationInMinutes:2,advanced:!0,sequence:[{type:"inhale",detail:"",color:"#2196f3",duration:400},{type:"hold",detail:"",color:"lightgreen",duration:700},{type:"exhale",detail:"",color:"#f44336",duration:800}]}]},getters:{},mutations:{resetLocalStorage(e){console.debug("Reset localStorage..."),localStorage.removeItem(W),this.commit("initializeFromLocalStorage"),console.debug("Reset localStorage... DONE")},initializeFromLocalStorage(e){console.debug("Retrieving settings from localStorage..."),null!=localStorage.getItem(W)&&void 0!=localStorage.getItem(W)?e=JSON.parse(localStorage.getItem(W)):(this.commit({type:"setTechnique",technique:e.breathTechniques[e.breathTechniqueIndex]}),localStorage.setItem(W,JSON.stringify(e))),console.debug("Retrieving settings from localStorage... DONE")},setUserLocale(e,t){console.debug(t),e.userLocale=t.locale},setTechnique(e,t){console.debug(t),e.breathTechnique=t.technique}},actions:{},modules:{},plugins:[J.plugin]}),K=n(150);function G(){const e=n(948),t={};return e.keys().forEach((n=>{const r=n.match(/([A-Za-z0-9-_]+)\./i);if(r&&r.length>1){const a=r[1];t[a]=e(n).default}})),t}var Q=(0,K.o)({locale:"en",fallbackLocale:"en",messages:G()});(0,r.ri)(y).use(Q).use(Y).use(H).mount("#app")}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,r,a,o){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],a=e[l][1],o=e[l][2];for(var s=!0,c=0;c<r.length;c++)(!1&o||i>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(s=!1,o<i&&(i=o));if(s){e.splice(l--,1);var u=a();void 0!==u&&(t=u)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,a,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var a,o,i=r[0],s=r[1],c=r[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(c)var l=c(n)}for(t&&t(r);u<i.length;u++)o=i[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(l)},r=self["webpackChunkbreath"]=self["webpackChunkbreath"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(131)}));r=n.O(r)})();
//# sourceMappingURL=app.bd546541.js.map