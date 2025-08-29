import{a as ne,b as et,g as C,u as tt,S as rt,d as N,t as E,i as f,k as R,e as P,h as s,s as le,l as Me,m as Pe,n as dt,f as nt,o as ct,p as ut}from"./index-DDCKiTDA.js";import{bh as O,bi as ft,bj as ze,bk as We,bl as vt}from"./client-snyaW0Tu.js";const gt=typeof window>"u";function De(r){const e={pending:"yellow",success:"green",error:"red",notFound:"purple",redirected:"gray"};return r.isFetching&&r.status==="success"?r.isFetching==="beforeLoad"?"purple":"blue":e[r.status]}function ht(r,e){const i=r.find(n=>n.routeId===e.id);return i?De(i):"gray"}function qt(){const[r,e]=ne(!1);return(gt?et:C)(()=>{e(!0)}),r}const $t=r=>{const e=Object.getOwnPropertyNames(Object(r)),i=typeof r=="bigint"?`${r.toString()}n`:r;try{return JSON.stringify(i,e)}catch{return"unable to stringify"}};function pt(r,e=[i=>i]){return r.map((i,n)=>[i,n]).sort(([i,n],[v,a])=>{for(const l of e){const d=l(i),u=l(v);if(typeof d>"u"){if(typeof u>"u")continue;return 1}if(d!==u)return d>u?1:-1}return n-a}).map(([i])=>i)}let mt={data:""},bt=r=>typeof window=="object"?((r?r.querySelector("#_goober"):window._goober)||Object.assign((r||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:r||mt,xt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,yt=/\/\*[^]*?\*\/|  +/g,Ye=/\n+/g,re=(r,e)=>{let i="",n="",v="";for(let a in r){let l=r[a];a[0]=="@"?a[1]=="i"?i=a+" "+l+";":n+=a[1]=="f"?re(l,a):a+"{"+re(l,a[1]=="k"?"":e)+"}":typeof l=="object"?n+=re(l,e?e.replace(/([^,])+/g,d=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,d):d?d+" "+u:u)):a):l!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),v+=re.p?re.p(a,l):a+":"+l+";")}return i+(e&&v?e+"{"+v+"}":v)+n},Z={},it=r=>{if(typeof r=="object"){let e="";for(let i in r)e+=i+it(r[i]);return e}return r},wt=(r,e,i,n,v)=>{let a=it(r),l=Z[a]||(Z[a]=(u=>{let o=0,t=11;for(;o<u.length;)t=101*t+u.charCodeAt(o++)>>>0;return"go"+t})(a));if(!Z[l]){let u=a!==r?r:(o=>{let t,g,h=[{}];for(;t=xt.exec(o.replace(yt,""));)t[4]?h.shift():t[3]?(g=t[3].replace(Ye," ").trim(),h.unshift(h[0][g]=h[0][g]||{})):h[0][t[1]]=t[2].replace(Ye," ").trim();return h[0]})(r);Z[l]=re(v?{["@keyframes "+l]:u}:u,i?"":"."+l)}let d=i&&Z.g?Z.g:null;return i&&(Z.g=Z[l]),((u,o,t,g)=>{g?o.data=o.data.replace(g,u):o.data.indexOf(u)===-1&&(o.data=t?u+o.data:o.data+u)})(Z[l],e,n,d),l},Ct=(r,e,i)=>r.reduce((n,v,a)=>{let l=e[a];if(l&&l.call){let d=l(i),u=d&&d.props&&d.props.className||/^go/.test(d)&&d;l=u?"."+u:d&&typeof d=="object"?d.props?"":re(d,""):d===!1?"":d}return n+v+(l??"")},"");function se(r){let e=this||{},i=r.call?r(e.p):r;return wt(i.unshift?i.raw?Ct(i,[].slice.call(arguments,1),e.p):i.reduce((n,v)=>Object.assign(n,v&&v.call?v(e.p):v),{}):i,bt(e.target),e.g,e.o,e.k)}se.bind({g:1});se.bind({k:1});const D={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},alpha:{90:"e5",70:"b3",20:"33"},font:{size:{"2xs":"calc(var(--tsrd-font-size) * 0.625)",xs:"calc(var(--tsrd-font-size) * 0.75)",sm:"calc(var(--tsrd-font-size) * 0.875)",md:"var(--tsrd-font-size)"},lineHeight:{xs:"calc(var(--tsrd-font-size) * 1)",sm:"calc(var(--tsrd-font-size) * 1.25)"},weight:{normal:"400",medium:"500",semibold:"600",bold:"700"},fontFamily:{sans:"ui-sans-serif, Inter, system-ui, sans-serif, sans-serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"}},border:{radius:{xs:"calc(var(--tsrd-font-size) * 0.125)",sm:"calc(var(--tsrd-font-size) * 0.25)",md:"calc(var(--tsrd-font-size) * 0.375)",full:"9999px"}},size:{0:"0px",.5:"calc(var(--tsrd-font-size) * 0.125)",1:"calc(var(--tsrd-font-size) * 0.25)",1.5:"calc(var(--tsrd-font-size) * 0.375)",2:"calc(var(--tsrd-font-size) * 0.5)",2.5:"calc(var(--tsrd-font-size) * 0.625)",3:"calc(var(--tsrd-font-size) * 0.75)",3.5:"calc(var(--tsrd-font-size) * 0.875)",4:"calc(var(--tsrd-font-size) * 1)",5:"calc(var(--tsrd-font-size) * 1.25)",8:"calc(var(--tsrd-font-size) * 2)"}},kt=r=>{const{colors:e,font:i,size:n,alpha:v,border:a}=D,{fontFamily:l,lineHeight:d,size:u}=i,o=r?se.bind({target:r}):se;return{devtoolsPanelContainer:o`
      direction: ltr;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 99999;
      width: 100%;
      max-height: 90%;
      border-top: 1px solid ${e.gray[700]};
      transform-origin: top;
    `,devtoolsPanelContainerVisibility:t=>o`
        visibility: ${t?"visible":"hidden"};
      `,devtoolsPanelContainerResizing:t=>t()?o`
          transition: none;
        `:o`
        transition: all 0.4s ease;
      `,devtoolsPanelContainerAnimation:(t,g)=>t?o`
          pointer-events: auto;
          transform: translateY(0);
        `:o`
        pointer-events: none;
        transform: translateY(${g}px);
      `,logo:o`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      font-family: ${l.sans};
      gap: ${D.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${e.blue[800]};
      }
    `,tanstackLogo:o`
      font-size: ${i.size.md};
      font-weight: ${i.weight.bold};
      line-height: ${i.lineHeight.xs};
      white-space: nowrap;
      color: ${e.gray[300]};
    `,routerLogo:o`
      font-weight: ${i.weight.semibold};
      font-size: ${i.size.xs};
      background: linear-gradient(to right, #84cc16, #10b981);
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,devtoolsPanel:o`
      display: flex;
      font-size: ${u.sm};
      font-family: ${l.sans};
      background-color: ${e.darkGray[700]};
      color: ${e.gray[300]};

      @media (max-width: 700px) {
        flex-direction: column;
      }
      @media (max-width: 600px) {
        font-size: ${u.xs};
      }
    `,dragHandle:o`
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      cursor: row-resize;
      z-index: 100000;
      &:hover {
        background-color: ${e.purple[400]}${v[90]};
      }
    `,firstContainer:o`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      border-right: 1px solid ${e.gray[700]};
      display: flex;
      flex-direction: column;
    `,routerExplorerContainer:o`
      overflow-y: auto;
      flex: 1;
    `,routerExplorer:o`
      padding: ${D.size[2]};
    `,row:o`
      display: flex;
      align-items: center;
      padding: ${D.size[2]} ${D.size[2.5]};
      gap: ${D.size[2.5]};
      border-bottom: ${e.darkGray[500]} 1px solid;
      align-items: center;
    `,detailsHeader:o`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${e.darkGray[600]};
      padding: 0px ${D.size[2]};
      font-weight: ${i.weight.medium};
      font-size: ${i.size.xs};
      min-height: ${D.size[8]};
      line-height: ${i.lineHeight.xs};
      text-align: left;
      display: flex;
      align-items: center;
    `,maskedBadge:o`
      background: ${e.yellow[900]}${v[70]};
      color: ${e.yellow[300]};
      display: inline-block;
      padding: ${D.size[0]} ${D.size[2.5]};
      border-radius: ${a.radius.full};
      font-size: ${i.size.xs};
      font-weight: ${i.weight.normal};
      border: 1px solid ${e.yellow[300]};
    `,maskedLocation:o`
      color: ${e.yellow[300]};
    `,detailsContent:o`
      padding: ${D.size[1.5]} ${D.size[2]};
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${i.size.xs};
    `,routeMatchesToggle:o`
      display: flex;
      align-items: center;
      border: 1px solid ${e.gray[500]};
      border-radius: ${a.radius.sm};
      overflow: hidden;
    `,routeMatchesToggleBtn:(t,g)=>{const y=[o`
        appearance: none;
        border: none;
        font-size: 12px;
        padding: 4px 8px;
        background: transparent;
        cursor: pointer;
        font-family: ${l.sans};
        font-weight: ${i.weight.medium};
      `];if(t){const $=o`
          background: ${e.darkGray[400]};
          color: ${e.gray[300]};
        `;y.push($)}else{const $=o`
          color: ${e.gray[500]};
          background: ${e.darkGray[800]}${v[20]};
        `;y.push($)}return g&&y.push(o`
          border-right: 1px solid ${D.colors.gray[500]};
        `),y},detailsHeaderInfo:o`
      flex: 1;
      justify-content: flex-end;
      display: flex;
      align-items: center;
      font-weight: ${i.weight.normal};
      color: ${e.gray[400]};
    `,matchRow:t=>{const h=[o`
        display: flex;
        border-bottom: 1px solid ${e.darkGray[400]};
        cursor: pointer;
        align-items: center;
        padding: ${n[1]} ${n[2]};
        gap: ${n[2]};
        font-size: ${u.xs};
        color: ${e.gray[300]};
      `];if(t){const y=o`
          background: ${e.darkGray[500]};
        `;h.push(y)}return h},matchIndicator:t=>{const h=[o`
        flex: 0 0 auto;
        width: ${n[3]};
        height: ${n[3]};
        background: ${e[t][900]};
        border: 1px solid ${e[t][500]};
        border-radius: ${a.radius.full};
        transition: all 0.25s ease-out;
        box-sizing: border-box;
      `];if(t==="gray"){const y=o`
          background: ${e.gray[700]};
          border-color: ${e.gray[400]};
        `;h.push(y)}return h},matchID:o`
      flex: 1;
      line-height: ${d.xs};
    `,ageTicker:t=>{const h=[o`
        display: flex;
        gap: ${n[1]};
        font-size: ${u.xs};
        color: ${e.gray[400]};
        font-variant-numeric: tabular-nums;
        line-height: ${d.xs};
      `];if(t){const y=o`
          color: ${e.yellow[400]};
        `;h.push(y)}return h},secondContainer:o`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      border-right: 1px solid ${e.gray[700]};
      display: flex;
      flex-direction: column;
    `,thirdContainer:o`
      flex: 1 1 500px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      border-right: 1px solid ${e.gray[700]};

      @media (max-width: 700px) {
        border-top: 2px solid ${e.gray[700]};
      }
    `,fourthContainer:o`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
    `,routesContainer:o`
      overflow-x: auto;
      overflow-y: visible;
    `,routesRowContainer:(t,g)=>{const y=[o`
        display: flex;
        border-bottom: 1px solid ${e.darkGray[400]};
        align-items: center;
        padding: ${n[1]} ${n[2]};
        gap: ${n[2]};
        font-size: ${u.xs};
        color: ${e.gray[300]};
        cursor: ${g?"pointer":"default"};
        line-height: ${d.xs};
      `];if(t){const $=o`
          background: ${e.darkGray[500]};
        `;y.push($)}return y},routesRow:t=>{const h=[o`
        flex: 1 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${u.xs};
        line-height: ${d.xs};
      `];if(!t){const y=o`
          color: ${e.gray[400]};
        `;h.push(y)}return h},routesRowInner:o`
      display: 'flex';
      align-items: 'center';
      flex-grow: 1;
      min-width: 0;
    `,routeParamInfo:o`
      color: ${e.gray[400]};
      font-size: ${u.xs};
      line-height: ${d.xs};
    `,nestedRouteRow:t=>o`
        margin-left: ${t?0:n[3.5]};
        border-left: ${t?"":`solid 1px ${e.gray[700]}`};
      `,code:o`
      font-size: ${u.xs};
      line-height: ${d.xs};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,matchesContainer:o`
      flex: 1 1 auto;
      overflow-y: auto;
    `,cachedMatchesContainer:o`
      flex: 1 1 auto;
      overflow-y: auto;
      max-height: 50%;
    `,maskedBadgeContainer:o`
      flex: 1;
      justify-content: flex-end;
      display: flex;
    `,matchDetails:o`
      display: flex;
      flex-direction: column;
      padding: ${D.size[2]};
      font-size: ${D.font.size.xs};
      color: ${D.colors.gray[300]};
      line-height: ${D.font.lineHeight.sm};
    `,matchStatus:(t,g)=>{const y=g&&t==="success"?g==="beforeLoad"?"purple":"blue":{pending:"yellow",success:"green",error:"red",notFound:"purple",redirected:"gray"}[t];return o`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-radius: ${D.border.radius.sm};
        font-weight: ${D.font.weight.normal};
        background-color: ${D.colors[y][900]}${D.alpha[90]};
        color: ${D.colors[y][300]};
        border: 1px solid ${D.colors[y][600]};
        margin-bottom: ${D.size[2]};
        transition: all 0.25s ease-out;
      `},matchDetailsInfo:o`
      display: flex;
      justify-content: flex-end;
      flex: 1;
    `,matchDetailsInfoLabel:o`
      display: flex;
    `,mainCloseBtn:o`
      background: ${e.darkGray[700]};
      padding: ${n[1]} ${n[2]} ${n[1]} ${n[1.5]};
      border-radius: ${a.radius.md};
      position: fixed;
      z-index: 99999;
      display: inline-flex;
      width: fit-content;
      cursor: pointer;
      appearance: none;
      border: 0;
      gap: 8px;
      align-items: center;
      border: 1px solid ${e.gray[500]};
      font-size: ${i.size.xs};
      cursor: pointer;
      transition: all 0.25s ease-out;

      &:hover {
        background: ${e.darkGray[500]};
      }
    `,mainCloseBtnPosition:t=>o`
        ${t==="top-left"?`top: ${n[2]}; left: ${n[2]};`:""}
        ${t==="top-right"?`top: ${n[2]}; right: ${n[2]};`:""}
        ${t==="bottom-left"?`bottom: ${n[2]}; left: ${n[2]};`:""}
        ${t==="bottom-right"?`bottom: ${n[2]}; right: ${n[2]};`:""}
      `,mainCloseBtnAnimation:t=>t?o`
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      `:o`
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
        `,routerLogoCloseButton:o`
      font-weight: ${i.weight.semibold};
      font-size: ${i.size.xs};
      background: linear-gradient(to right, #98f30c, #00f4a3);
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,mainCloseBtnDivider:o`
      width: 1px;
      background: ${D.colors.gray[600]};
      height: 100%;
      border-radius: 999999px;
      color: transparent;
    `,mainCloseBtnIconContainer:o`
      position: relative;
      width: ${n[5]};
      height: ${n[5]};
      background: pink;
      border-radius: 999999px;
      overflow: hidden;
    `,mainCloseBtnIconOuter:o`
      width: ${n[5]};
      height: ${n[5]};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(3px) saturate(1.8) contrast(2);
    `,mainCloseBtnIconInner:o`
      width: ${n[4]};
      height: ${n[4]};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,panelCloseBtn:o`
      position: absolute;
      cursor: pointer;
      z-index: 100001;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${e.darkGray[700]};
      &:hover {
        background-color: ${e.darkGray[500]};
      }

      top: 0;
      right: ${n[2]};
      transform: translate(0, -100%);
      border-right: ${e.darkGray[300]} 1px solid;
      border-left: ${e.darkGray[300]} 1px solid;
      border-top: ${e.darkGray[300]} 1px solid;
      border-bottom: none;
      border-radius: ${a.radius.sm} ${a.radius.sm} 0px 0px;
      padding: ${n[1]} ${n[1.5]} ${n[.5]} ${n[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${n[2.5]};
        height: ${n[1.5]};
        width: calc(100% + ${n[5]});
      }
    `,panelCloseBtnIcon:o`
      color: ${e.gray[400]};
      width: ${n[2]};
      height: ${n[2]};
    `,navigateButton:o`
      background: none;
      border: none;
      padding: 0 0 0 4px;
      margin: 0;
      color: ${e.gray[400]};
      font-size: ${u.md};
      cursor: pointer;
      line-height: 1;
      vertical-align: middle;
      margin-right: 0.5ch;
      flex-shrink: 0;
      &:hover {
        color: ${e.blue[300]};
      }
    `}};function he(){const r=tt(rt),[e]=ne(kt(r));return e}const _t=r=>{try{const e=localStorage.getItem(r);return typeof e=="string"?JSON.parse(e):void 0}catch{return}};function qe(r,e){const[i,n]=ne();return et(()=>{const a=_t(r);n(typeof a>"u"||a===null?typeof e=="function"?e():e:a)}),[i,a=>{n(l=>{let d=a;typeof a=="function"&&(d=a(l));try{localStorage.setItem(r,JSON.stringify(d))}catch{}return d})}]}var Ft=E('<span><svg xmlns=http://www.w3.org/2000/svg width=12 height=12 fill=none viewBox="0 0 24 24"><path stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M9 18l6-6-6-6">'),ye=E("<div>"),St=E("<button><span> "),zt=E("<div><div><button> [<!> ... <!>]"),Dt=E("<button><span></span> 🔄 "),Bt=E("<span>:"),Et=E("<span>");const Ze=({expanded:r,style:e={}})=>{const i=ot();return(()=>{var n=Ft(),v=n.firstChild;return C(a=>{var l=i().expander,d=O(i().expanderIcon(r));return l!==a.e&&s(n,a.e=l),d!==a.t&&le(v,"class",a.t=d),a},{e:void 0,t:void 0}),n})()};function It(r,e){if(e<1)return[];let i=0;const n=[];for(;i<r.length;)n.push(r.slice(i,i+e)),i=i+e;return n}function Mt(r){return Symbol.iterator in r}function ae({value:r,defaultExpanded:e,pageSize:i=100,filterSubEntries:n,...v}){const[a,l]=ne(!!e),d=()=>l(k=>!k),u=N(()=>typeof r()),o=N(()=>{let k=[];const ee=_=>{const m=e===!0?{[_.label]:!0}:e?.[_.label];return{..._,value:()=>_.value,defaultExpanded:m}};return Array.isArray(r())?k=r().map((_,m)=>ee({label:m.toString(),value:_})):r()!==null&&typeof r()=="object"&&Mt(r())&&typeof r()[Symbol.iterator]=="function"?k=Array.from(r(),(_,m)=>ee({label:m.toString(),value:_})):typeof r()=="object"&&r()!==null&&(k=Object.entries(r()).map(([_,m])=>ee({label:_,value:m}))),n?n(k):k}),t=N(()=>It(o(),i)),[g,h]=ne([]),[y,$]=ne(void 0),F=ot(),H=()=>{$(r()())},K=k=>P(ae,Pe({value:r,filterSubEntries:n},v,k));return(()=>{var k=ye();return f(k,(()=>{var ee=R(()=>!!t().length);return()=>ee()?[(()=>{var _=St(),m=_.firstChild,L=m.firstChild;return _.$$click=()=>d(),f(_,P(Ze,{get expanded(){return a()??!1}}),m),f(_,()=>v.label,m),f(m,()=>String(u).toLowerCase()==="iterable"?"(Iterable) ":"",L),f(m,()=>o().length,L),f(m,()=>o().length>1?"items":"item",null),C(W=>{var Q=F().expandButton,S=F().info;return Q!==W.e&&s(_,W.e=Q),S!==W.t&&s(m,W.t=S),W},{e:void 0,t:void 0}),_})(),R(()=>R(()=>!!(a()??!1))()?R(()=>t().length===1)()?(()=>{var _=ye();return f(_,()=>o().map((m,L)=>K(m))),C(()=>s(_,F().subEntries)),_})():(()=>{var _=ye();return f(_,()=>t().map((m,L)=>(()=>{var W=zt(),Q=W.firstChild,S=Q.firstChild,V=S.firstChild,$e=V.nextSibling,de=$e.nextSibling,ie=de.nextSibling;return ie.nextSibling,S.$$click=()=>h(G=>G.includes(L)?G.filter(U=>U!==L):[...G,L]),f(S,P(Ze,{get expanded(){return g().includes(L)}}),V),f(S,L*i,$e),f(S,L*i+i-1,ie),f(Q,(()=>{var G=R(()=>!!g().includes(L));return()=>G()?(()=>{var U=ye();return f(U,()=>m.map(X=>K(X))),C(()=>s(U,F().subEntries)),U})():null})(),null),C(G=>{var U=F().entry,X=O(F().labelButton,"labelButton");return U!==G.e&&s(Q,G.e=U),X!==G.t&&s(S,G.t=X),G},{e:void 0,t:void 0}),W})())),C(()=>s(_,F().subEntries)),_})():null)]:(()=>{var _=R(()=>u()==="function");return()=>_()?P(ae,{get label(){return(()=>{var m=Dt(),L=m.firstChild;return m.$$click=H,f(L,()=>v.label),C(()=>s(m,F().refreshValueBtn)),m})()},value:y,defaultExpanded:{}}):[(()=>{var m=Bt(),L=m.firstChild;return f(m,()=>v.label,L),m})()," ",(()=>{var m=Et();return f(m,()=>$t(r())),C(()=>s(m,F().value)),m})()]})()})()),C(()=>s(k,F().entry)),k})()}const Pt=r=>{const{colors:e,font:i,size:n}=D,{fontFamily:v,lineHeight:a,size:l}=i,d=r?se.bind({target:r}):se;return{entry:d`
      font-family: ${v.mono};
      font-size: ${l.xs};
      line-height: ${a.sm};
      outline: none;
      word-break: break-word;
    `,labelButton:d`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      background: transparent;
      border: none;
      padding: 0;
    `,expander:d`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${n[3]};
      height: ${n[3]};
      padding-left: 3px;
      box-sizing: content-box;
    `,expanderIcon:u=>u?d`
          transform: rotate(90deg);
          transition: transform 0.1s ease;
        `:d`
        transform: rotate(0deg);
        transition: transform 0.1s ease;
      `,expandButton:d`
      display: flex;
      gap: ${n[1]};
      align-items: center;
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      background: transparent;
      border: none;
      padding: 0;
    `,value:d`
      color: ${e.purple[400]};
    `,subEntries:d`
      margin-left: ${n[2]};
      padding-left: ${n[2]};
      border-left: 2px solid ${e.darkGray[400]};
    `,info:d`
      color: ${e.gray[500]};
      font-size: ${l["2xs"]};
      padding-left: ${n[1]};
    `,refreshValueBtn:d`
      appearance: none;
      border: 0;
      cursor: pointer;
      background: transparent;
      color: inherit;
      padding: 0;
      font-family: ${v.mono};
      font-size: ${l.xs};
    `}};function ot(){const r=tt(rt),[e]=ne(Pt(r));return e}Me(["click"]);var At=E("<div><div></div><div>/</div><div></div><div>/</div><div>");function Se(r){const e=["s","min","h","d"],i=[r/1e3,r/6e4,r/36e5,r/864e5];let n=0;for(let a=1;a<i.length&&!(i[a]<1);a++)n=a;return new Intl.NumberFormat(navigator.language,{compactDisplay:"short",notation:"compact",maximumFractionDigits:0}).format(i[n])+e[n]}function Be({match:r,router:e}){const i=he();if(!r)return null;const n=e().looseRoutesById[r.routeId];if(!n.options.loader)return null;const v=Date.now()-r.updatedAt,a=n.options.staleTime??e().options.defaultStaleTime??0,l=n.options.gcTime??e().options.defaultGcTime??30*60*1e3;return(()=>{var d=At(),u=d.firstChild,o=u.nextSibling,t=o.nextSibling,g=t.nextSibling,h=g.nextSibling;return f(u,()=>Se(v)),f(t,()=>Se(a)),f(h,()=>Se(l)),C(()=>s(d,O(i().ageTicker(v>a)))),d})()}var Tt=E("<button type=button>➔");function Ee({to:r,params:e,search:i,router:n}){const v=he();return(()=>{var a=Tt();return a.$$click=l=>{l.stopPropagation(),n().navigate({to:r,params:e,search:i})},le(a,"title",`Navigate to ${r}`),C(()=>s(a,v().navigateButton)),a})()}Me(["click"]);var Lt=E("<button><div>TANSTACK</div><div>TanStack Router v1"),jt=E("<div><div>"),Rt=E("<code> "),we=E("<code>"),Ot=E("<div><div role=button><div>"),Ce=E("<div>"),Ht=E('<div><button><svg xmlns=http://www.w3.org/2000/svg width=10 height=6 fill=none viewBox="0 0 10 6"><path stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.667 d="M1 1l4 4 4-4"></path></svg></button><div><div></div><div><div></div></div></div><div><div><div><span>Pathname</span></div><div><code></code></div><div><div><button type=button>Routes</button><button type=button>Matches</button></div><div><div>age / staleTime / gcTime</div></div></div><div>'),Gt=E("<div><span>masked"),Qe=E("<div role=button><div>"),Nt=E("<div><div><div>Cached Matches</div><div>age / staleTime / gcTime</div></div><div>"),Vt=E("<div><div>Match Details</div><div><div><div><div></div></div><div><div>ID:</div><div><code></code></div></div><div><div>State:</div><div></div></div><div><div>Last Updated:</div><div></div></div></div></div><div>Explorer</div><div>"),Jt=E("<div>Loader Data"),Kt=E("<div><div>Search Params</div><div>");function Ut(r){const{className:e,...i}=r,n=he();return(()=>{var v=Lt(),a=v.firstChild,l=a.nextSibling;return nt(v,Pe(i,{get class(){return O(n().logo,e?e():"")}}),!1,!0),C(d=>{var u=n().tanstackLogo,o=n().routerLogo;return u!==d.e&&s(a,d.e=u),o!==d.t&&s(l,d.t=o),d},{e:void 0,t:void 0}),v})()}function Ie(r){return(()=>{var e=jt(),i=e.firstChild;return e.style.setProperty("display","flex"),e.style.setProperty("align-items","center"),e.style.setProperty("width","100%"),f(e,()=>r.left,i),i.style.setProperty("flex-grow","1"),i.style.setProperty("min-width","0"),f(i,()=>r.children),f(e,()=>r.right,null),C(()=>s(e,r.class)),e})()}function at({routerState:r,router:e,route:i,isRoot:n,activeId:v,setActiveId:a}){const l=he(),d=N(()=>r().pendingMatches||r().matches),u=N(()=>r().matches.find(g=>g.routeId===i.id)),o=N(()=>{var g,h;try{if((g=u())!=null&&g.params){const y=(h=u())==null?void 0:h.params,$=i.path||We(i.id);if($.startsWith("$")){const F=$.slice(1);if(y[F])return`(${y[F]})`}}return""}catch{return""}}),t=N(()=>{if(n||!i.path)return;const g=Object.assign({},...d().map(y=>y.params)),h=vt({path:i.fullPath,params:g,leaveWildcards:!1,leaveParams:!1,decodeCharMap:e().pathParamsDecodeCharMap});return h.isMissingParams?void 0:h.interpolatedPath});return(()=>{var g=Ot(),h=g.firstChild,y=h.firstChild;return h.$$click=()=>{u()&&a(v()===i.id?"":i.id)},f(h,P(Ie,{get class(){return O(l().routesRow(!!u()))},get left(){return P(ut,{get when(){return t()},children:$=>P(Ee,{get to(){return $()},router:e})})},get right(){return P(Be,{get match(){return u()},router:e})},get children(){return[(()=>{var $=Rt(),F=$.firstChild;return f($,()=>n?ze:i.path||We(i.id),F),C(()=>s($,l().code)),$})(),(()=>{var $=we();return f($,o),C(()=>s($,l().routeParamInfo)),$})()]}}),null),f(g,(()=>{var $=R(()=>{var F;return!!((F=i.children)!=null&&F.length)});return()=>$()?(()=>{var F=Ce();return f(F,()=>[...i.children].sort((H,K)=>H.rank-K.rank).map(H=>P(at,{routerState:r,router:e,route:H,activeId:v,setActiveId:a}))),C(()=>s(F,l().nestedRouteRow(!!n))),F})():null})(),null),C($=>{var F=`Open match details for ${i.id}`,H=O(l().routesRowContainer(i.id===v(),!!u())),K=O(l().matchIndicator(ht(d(),i)));return F!==$.e&&le(h,"aria-label",$.e=F),H!==$.t&&s(h,$.t=H),K!==$.a&&s(y,$.a=K),$},{e:void 0,t:void 0,a:void 0}),g})()}const Xe=function({...e}){const{isOpen:i=!0,setIsOpen:n,handleDragStart:v,router:a,routerState:l,shadowDOMTarget:d,...u}=e,{onCloseClick:o}=dt(),t=he(),{className:g,style:h,...y}=u;ft(a);const[$,F]=qe("tanstackRouterDevtoolsShowMatches",!0),[H,K]=qe("tanstackRouterDevtoolsActiveRouteId",""),k=N(()=>[...l().pendingMatches??[],...l().matches,...l().cachedMatches].find(V=>V.routeId===H()||V.id===H())),ee=N(()=>Object.keys(l().location.search).length),_=N(()=>({...a(),state:l()})),m=N(()=>Object.fromEntries(pt(Object.keys(_()),["state","routesById","routesByPath","flatRoutes","options","manifest"].map(S=>V=>V!==S)).map(S=>[S,_()[S]]).filter(S=>typeof S[1]!="function"&&!["__store","basepath","injectedHtml","subscribers","latestLoadPromise","navigateTimeout","resetNextScroll","tempLocationKey","latestLocation","routeTree","history"].includes(S[0])))),L=N(()=>{var S;return(S=k())==null?void 0:S.loaderData}),W=N(()=>k()),Q=N(()=>l().location.search);return(()=>{var S=Ht(),V=S.firstChild,$e=V.firstChild,de=V.nextSibling,ie=de.firstChild,G=ie.nextSibling,U=G.firstChild,X=de.nextSibling,Ae=X.firstChild,pe=Ae.firstChild;pe.firstChild;var me=pe.nextSibling,lt=me.firstChild,ke=me.nextSibling,_e=ke.firstChild,be=_e.firstChild,Fe=be.nextSibling,st=_e.nextSibling,Te=ke.nextSibling;return nt(S,Pe({get class(){return O(t().devtoolsPanel,"TanStackRouterDevtoolsPanel",g?g():"")},get style(){return h?h():""}},y),!1,!0),f(S,v?(()=>{var c=Ce();return ct(c,"mousedown",v,!0),C(()=>s(c,t().dragHandle)),c})():null,V),V.$$click=c=>{n&&n(!1),o(c)},f(ie,P(Ut,{"aria-hidden":!0,onClick:c=>{n&&n(!1),o(c)}})),f(U,P(ae,{label:"Router",value:m,defaultExpanded:{state:{},context:{},options:{}},filterSubEntries:c=>c.filter(w=>typeof w.value()!="function")})),f(pe,(()=>{var c=R(()=>!!l().location.maskedLocation);return()=>c()?(()=>{var w=Gt(),A=w.firstChild;return C(T=>{var b=t().maskedBadgeContainer,j=t().maskedBadge;return b!==T.e&&s(w,T.e=b),j!==T.t&&s(A,T.t=j),T},{e:void 0,t:void 0}),w})():null})(),null),f(lt,()=>l().location.pathname),f(me,(()=>{var c=R(()=>!!l().location.maskedLocation);return()=>c()?(()=>{var w=we();return f(w,()=>{var A;return(A=l().location.maskedLocation)==null?void 0:A.pathname}),C(()=>s(w,t().maskedLocation)),w})():null})(),null),be.$$click=()=>{F(!1)},Fe.$$click=()=>{F(!0)},f(Te,(()=>{var c=R(()=>!$());return()=>c()?P(at,{routerState:l,router:a,get route(){return a().routeTree},isRoot:!0,activeId:H,setActiveId:K}):(()=>{var w=Ce();return f(w,()=>{var A,T;return(T=(A=l().pendingMatches)!=null&&A.length?l().pendingMatches:l().matches)==null?void 0:T.map((b,j)=>(()=>{var x=Qe(),I=x.firstChild;return x.$$click=()=>K(H()===b.id?"":b.id),f(x,P(Ie,{get left(){return P(Ee,{get to(){return b.pathname},get params(){return b.params},get search(){return b.search},router:a})},get right(){return P(Be,{match:b,router:a})},get children(){var M=we();return f(M,()=>`${b.routeId===ze?ze:b.pathname}`),C(()=>s(M,t().matchID)),M}}),null),C(M=>{var B=`Open match details for ${b.id}`,Y=O(t().matchRow(b===k())),J=O(t().matchIndicator(De(b)));return B!==M.e&&le(x,"aria-label",M.e=B),Y!==M.t&&s(x,M.t=Y),J!==M.a&&s(I,M.a=J),M},{e:void 0,t:void 0,a:void 0}),x})())}),w})()})()),f(X,(()=>{var c=R(()=>!!l().cachedMatches.length);return()=>c()?(()=>{var w=Nt(),A=w.firstChild,T=A.firstChild,b=T.nextSibling,j=A.nextSibling;return f(j,()=>l().cachedMatches.map(x=>(()=>{var I=Qe(),M=I.firstChild;return I.$$click=()=>K(H()===x.id?"":x.id),f(I,P(Ie,{get left(){return P(Ee,{get to(){return x.pathname},get params(){return x.params},get search(){return x.search},router:a})},get right(){return P(Be,{match:x,router:a})},get children(){var B=we();return f(B,()=>`${x.id}`),C(()=>s(B,t().matchID)),B}}),null),C(B=>{var Y=`Open match details for ${x.id}`,J=O(t().matchRow(x===k())),te=O(t().matchIndicator(De(x)));return Y!==B.e&&le(I,"aria-label",B.e=Y),J!==B.t&&s(I,B.t=J),te!==B.a&&s(M,B.a=te),B},{e:void 0,t:void 0,a:void 0}),I})())),C(x=>{var I=t().cachedMatchesContainer,M=t().detailsHeader,B=t().detailsHeaderInfo;return I!==x.e&&s(w,x.e=I),M!==x.t&&s(A,x.t=M),B!==x.a&&s(b,x.a=B),x},{e:void 0,t:void 0,a:void 0}),w})():null})(),null),f(S,(()=>{var c=R(()=>{var w;return!!(k()&&((w=k())!=null&&w.status))});return()=>c()?(()=>{var w=Vt(),A=w.firstChild,T=A.nextSibling,b=T.firstChild,j=b.firstChild,x=j.firstChild,I=j.nextSibling,M=I.firstChild,B=M.nextSibling,Y=B.firstChild,J=I.nextSibling,te=J.firstChild,ce=te.nextSibling,ue=J.nextSibling,xe=ue.firstChild,fe=xe.nextSibling,oe=T.nextSibling,ve=oe.nextSibling;return f(x,(()=>{var p=R(()=>{var z,q;return!!(((z=k())==null?void 0:z.status)==="success"&&((q=k())!=null&&q.isFetching))});return()=>{var z;return p()?"fetching":(z=k())==null?void 0:z.status}})()),f(Y,()=>{var p;return(p=k())==null?void 0:p.id}),f(ce,(()=>{var p=R(()=>{var z;return!!((z=l().pendingMatches)!=null&&z.find(q=>{var ge;return q.id===((ge=k())==null?void 0:ge.id)}))});return()=>p()?"Pending":l().matches.find(z=>{var q;return z.id===((q=k())==null?void 0:q.id)})?"Active":"Cached"})()),f(fe,(()=>{var p=R(()=>{var z;return!!((z=k())!=null&&z.updatedAt)});return()=>{var z;return p()?new Date((z=k())==null?void 0:z.updatedAt).toLocaleTimeString():"N/A"}})()),f(w,(()=>{var p=R(()=>!!L());return()=>p()?[(()=>{var z=Jt();return C(()=>s(z,t().detailsHeader)),z})(),(()=>{var z=Ce();return f(z,P(ae,{label:"loaderData",value:L,defaultExpanded:{}})),C(()=>s(z,t().detailsContent)),z})()]:null})(),oe),f(ve,P(ae,{label:"Match",value:W,defaultExpanded:{}})),C(p=>{var z,q,ge=t().thirdContainer,Le=t().detailsHeader,je=t().matchDetails,Re=t().matchStatus((z=k())==null?void 0:z.status,(q=k())==null?void 0:q.isFetching),Oe=t().matchDetailsInfoLabel,He=t().matchDetailsInfo,Ge=t().matchDetailsInfoLabel,Ne=t().matchDetailsInfo,Ve=t().matchDetailsInfoLabel,Je=t().matchDetailsInfo,Ke=t().detailsHeader,Ue=t().detailsContent;return ge!==p.e&&s(w,p.e=ge),Le!==p.t&&s(A,p.t=Le),je!==p.a&&s(b,p.a=je),Re!==p.o&&s(j,p.o=Re),Oe!==p.i&&s(I,p.i=Oe),He!==p.n&&s(B,p.n=He),Ge!==p.s&&s(J,p.s=Ge),Ne!==p.h&&s(ce,p.h=Ne),Ve!==p.r&&s(ue,p.r=Ve),Je!==p.d&&s(fe,p.d=Je),Ke!==p.l&&s(oe,p.l=Ke),Ue!==p.u&&s(ve,p.u=Ue),p},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),w})():null})(),null),f(S,(()=>{var c=R(()=>!!ee());return()=>c()?(()=>{var w=Kt(),A=w.firstChild,T=A.nextSibling;return f(T,P(ae,{value:Q,get defaultExpanded(){return Object.keys(l().location.search).reduce((b,j)=>(b[j]={},b),{})}})),C(b=>{var j=t().fourthContainer,x=t().detailsHeader,I=t().detailsContent;return j!==b.e&&s(w,b.e=j),x!==b.t&&s(A,b.t=x),I!==b.a&&s(T,b.a=I),b},{e:void 0,t:void 0,a:void 0}),w})():null})(),null),C(c=>{var w=t().panelCloseBtn,A=t().panelCloseBtnIcon,T=t().firstContainer,b=t().row,j=t().routerExplorerContainer,x=t().routerExplorer,I=t().secondContainer,M=t().matchesContainer,B=t().detailsHeader,Y=t().detailsContent,J=t().detailsHeader,te=t().routeMatchesToggle,ce=!$(),ue=O(t().routeMatchesToggleBtn(!$(),!0)),xe=$(),fe=O(t().routeMatchesToggleBtn(!!$(),!1)),oe=t().detailsHeaderInfo,ve=O(t().routesContainer);return w!==c.e&&s(V,c.e=w),A!==c.t&&le($e,"class",c.t=A),T!==c.a&&s(de,c.a=T),b!==c.o&&s(ie,c.o=b),j!==c.i&&s(G,c.i=j),x!==c.n&&s(U,c.n=x),I!==c.s&&s(X,c.s=I),M!==c.h&&s(Ae,c.h=M),B!==c.r&&s(pe,c.r=B),Y!==c.d&&s(me,c.d=Y),J!==c.l&&s(ke,c.l=J),te!==c.u&&s(_e,c.u=te),ce!==c.c&&(be.disabled=c.c=ce),ue!==c.w&&s(be,c.w=ue),xe!==c.m&&(Fe.disabled=c.m=xe),fe!==c.f&&s(Fe,c.f=fe),oe!==c.y&&s(st,c.y=oe),ve!==c.g&&s(Te,c.g=ve),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0}),S})()};Me(["click","mousedown"]);const Zt=Object.freeze(Object.defineProperty({__proto__:null,BaseTanStackRouterDevtoolsPanel:Xe,default:Xe},Symbol.toStringTag,{value:"Module"}));export{Xe as B,qt as a,he as b,Zt as c,qe as u};
