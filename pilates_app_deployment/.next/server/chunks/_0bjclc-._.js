module.exports=[9292,e=>{"use strict";var t=e.i(89171),a=e.i(43793);function r(e){return null==e?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}async function i(e,{params:n}){var o;let{id:s}=await n,l=await a.db.payment.findUnique({where:{id:s}}).catch(()=>null),p=await a.db.setting.findMany().catch(()=>[]),d={};for(let e of p)d[e.key]=e.value;let c=d.studioName||"Arcwave Pilates",u=d.tagline||"Reformer · Mat · Movement",m=d.location||"Arcwave Pilates Studio · India",g=d.phone||"",h=d.email||"",f=d.instagramHandle||"@arcwavepilates",x=l?.customerName||"—",v=l?.customerEmail||"",b=l?.customerPhone||"—",y=l?(o=l.amount,new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(o||0)):"—",w=l?.currency||"INR",R=l?.status||"—",C=l?.gateway||"—",E=l?.gatewayTxnId||l?.id||"—",k=l?.id?`ARW-${l.id.slice(-6).toUpperCase()}`:"—",A=l?function(e){if(!e)return"—";let t="string"==typeof e?new Date(e):e;return isNaN(t.getTime())?"—":t.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}(l.createdAt):"—",T=l?.notes||"";if(!l){let e=`<!doctype html><html><head><meta charset="utf-8"/>
      <title>Receipt not found — ${r(c)}</title></head>
      <body style="font-family: -apple-system, system-ui, sans-serif; padding: 40px; color: #152f3e;">
        <h2>Receipt not found</h2>
        <p>No payment record matches this ID.</p>
      </body></html>`;return new t.NextResponse(e,{status:404,headers:{"Content-Type":"text/html; charset=utf-8"}})}let N="success"===R?"#21665e":"pending"===R?"#b08200":"failed"===R||"cancelled"===R?"#b3261e":"#152f3e",S=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Receipt ${r(k)} — ${r(c)}</title>
<style>
  :root {
    --paper: #f6f4ed;
    --white: #fffefa;
    --ink: #152f3e;
    --teal: #21665e;
    --lime: #dce7b5;
    --line: #d9ded5;
    --muted: #5c696b;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Almarai", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: var(--paper);
    color: var(--ink);
  }
  .page {
    max-width: 720px;
    margin: 0 auto;
    padding: 32px 24px 64px;
  }
  .receipt {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 32px;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-bottom: 22px;
    border-bottom: 1px solid var(--line);
  }
  .brand .logo {
    width: 54px;
    height: 54px;
    border-radius: 9999px;
    object-fit: cover;
    border: 1px solid var(--line);
  }
  .brand h1 {
    margin: 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 26px;
    font-weight: 400;
    letter-spacing: 0.01em;
    color: var(--ink);
  }
  .brand .tagline {
    margin: 4px 0 0;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--teal);
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 24px 0;
    gap: 16px;
  }
  .head .label {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .head .invoice {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 30px;
    line-height: 1;
    color: var(--ink);
  }
  .head .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${N};
    background: ${N}1A;
    border: 1px solid ${N}33;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: currentColor;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin: 8px 0 22px;
  }
  .grid .item .label {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .grid .item .value {
    font-size: 14px;
    color: var(--ink);
    word-break: break-word;
  }
  .divider {
    border: 0;
    border-top: 1px dashed var(--line);
    margin: 24px 0;
  }
  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    background: var(--lime);
    border-radius: 14px;
  }
  .total .label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .total .amount {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 32px;
    color: var(--ink);
    line-height: 1;
  }
  .footer {
    margin-top: 26px;
    text-align: center;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.6;
  }
  .footer .name {
    color: var(--ink);
    font-weight: 600;
    letter-spacing: 0.06em;
  }
  .actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 24px 0 8px;
  }
  .btn {
    appearance: none;
    cursor: pointer;
    border: 1px solid var(--teal);
    background: var(--teal);
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    padding: 12px 24px;
    border-radius: 999px;
    transition: opacity 0.15s;
  }
  .btn:hover { opacity: 0.92; }
  .btn.ghost {
    background: transparent;
    color: var(--teal);
  }
  @media print {
    body { background: #fff; }
    .actions { display: none; }
    .receipt { border: none; box-shadow: none; padding: 0; }
    .page { padding: 0; max-width: none; }
  }
  @media (max-width: 480px) {
    .page { padding: 16px 12px 32px; }
    .receipt { padding: 20px; }
    .brand h1 { font-size: 22px; }
    .head .invoice { font-size: 22px; }
    .grid { grid-template-columns: 1fr; gap: 12px; }
  }
</style>
</head>
<body>
  <main class="page">
    <div class="actions">
      <button class="btn" onclick="window.print()">Print receipt</button>
      <button class="btn ghost" onclick="window.close()">Close</button>
    </div>

    <article class="receipt">
      <header class="brand">
        <img class="logo" src="/images/arcwave-01.png" alt="${r(c)} logo" />
        <div>
          <h1>${r(c)}</h1>
          <p class="tagline">${r(u)}</p>
        </div>
      </header>

      <div class="head">
        <div>
          <p class="label">Invoice no.</p>
          <p class="invoice">${r(k)}</p>
        </div>
        <div style="text-align: right;">
          <p class="label">Status</p>
          <span class="status"><span class="dot"></span>${r(R)}</span>
        </div>
      </div>

      <section class="grid">
        <div class="item">
          <p class="label">Billed to</p>
          <p class="value">${r(x)}<br/>${r(b)}${v?"<br/>"+r(v):""}</p>
        </div>
        <div class="item">
          <p class="label">Date</p>
          <p class="value">${r(A)}</p>
        </div>
        <div class="item">
          <p class="label">Transaction ID</p>
          <p class="value">${r(E)}</p>
        </div>
        <div class="item">
          <p class="label">Payment method</p>
          <p class="value">${r(C)} \xb7 ${r(w)}</p>
        </div>
      </section>

      <hr class="divider" />

      <div class="grid">
        <div class="item">
          <p class="label">Description</p>
          <p class="value">${T?r(T):"Pilates session / membership payment"}</p>
        </div>
      </div>

      <div class="total">
        <span class="label">Total paid</span>
        <span class="amount">${r(y)}</span>
      </div>

      <footer class="footer">
        <p class="name">${r(c)}</p>
        <p>${r(m)}</p>
        <p>
          ${g?r(g):""}${g&&h?" · ":""}${h?r(h):""}
          ${g||h?" · ":""}${r(f)}
        </p>
        <p style="margin-top: 8px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;">
          Thank you for moving with us.
        </p>
      </footer>
    </article>
  </main>
  <script>
    // If opened in a new tab from an admin "Print" link, give it a beat then prompt print.
    // (Don't auto-print on load — annoying for keyboard users.)
  </script>
</body>
</html>`;return new t.NextResponse(S,{status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}})}e.s(["GET",0,i,"runtime",0,"nodejs"])},53366,e=>{"use strict";var t=e.i(47909),a=e.i(74017),r=e.i(96250),i=e.i(59756),n=e.i(61916),o=e.i(74677),s=e.i(69741),l=e.i(16795),p=e.i(87718),d=e.i(95169),c=e.i(47587),u=e.i(66012),m=e.i(70101),g=e.i(26937),h=e.i(10372),f=e.i(93695);e.i(52474);var x=e.i(220);let v=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/receipts/[id]/route",pathname:"/api/receipts/[id]",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/receipts/[id]/route.ts",nextConfigOutput:"standalone",userland:()=>e.r(9292),...{}}),{workAsyncStorage:b,workUnitAsyncStorage:y,serverHooks:w}=v;async function R(e,t,r){r.requestMeta&&(0,i.setRequestMeta)(e,r.requestMeta),v.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let b="/api/receipts/[id]/route";b=b.replace(/\/index$/,"")||"/";let y=await v.prepare(e,t,{srcPage:b,multiZoneDraftMode:!1});if(!y)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:w,deploymentId:R,params:C,nextConfig:E,parsedUrl:k,isDraftMode:A,prerenderManifest:T,routerServerContext:N,isOnDemandRevalidate:S,revalidateOnlyGenerated:$,resolvedPathname:P,clientReferenceManifest:I,serverActionsManifest:_}=y,q=(0,s.normalizeAppPath)(b),D=!!(T.dynamicRoutes[q]||T.routes[P]),O=async()=>((null==N?void 0:N.render404)?await N.render404(e,t,k,!1):t.end("This page could not be found"),null);if(D&&!A){let e=!!T.routes[P],t=T.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(E.adapterPath)return await O();throw new f.NoFallbackError}}let H=null;!D||v.isDev||A||(H="/index"===(H=P)?"/":H);let M=!0===v.isDev||!D,U=D&&!M;_&&I&&(0,o.setManifestsSingleton)({page:b,clientReferenceManifest:I,serverActionsManifest:_});let z=e.method||"GET",j=(0,n.getTracer)(),F=j.getActiveScopeSpan(),G=!!(null==N?void 0:N.isWrappedByNextServer),B=!!(0,i.getRequestMeta)(e,"minimalMode"),K=(0,i.getRequestMeta)(e,"incrementalCache")||await v.getIncrementalCache(e,E,T,B);null==K||K.resetRequestCache(),globalThis.__incrementalCache=K;let L={params:C,previewProps:T.preview,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts,useCacheTimeout:E.experimental.useCacheTimeout},cacheComponents:!!E.cacheComponents,validationLevel:E.experimental.instantInsights.validationLevel,supportsDynamicResponse:M,incrementalCache:K,hmrRefreshHash:(0,i.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:E.cacheLife,staticPageGenerationTimeout:E.staticPageGenerationTimeout,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r,i)=>v.onRequestError(e,t,r,i,N)},sharedContext:{buildId:w,deploymentId:R}},V=new l.NodeNextRequest(e),W=new l.NodeNextResponse(t),X=p.NextRequestAdapter.fromNodeNextRequest(V,(0,p.signalFromNodeResponse)(t)),Z=async({previousCacheEntry:a})=>{try{if(!B&&S&&$&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await v.handle(X,L);e.fetchMetrics=L.renderOpts.fetchMetrics;let n=L.renderOpts.pendingWaitUntil;n&&r.waitUntil&&(r.waitUntil(n),n=void 0);let o=L.renderOpts.collectedTags;if(!D)return await (0,u.sendResponse)(V,W,i,n),null;{let e=await i.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(i.headers);o&&(t[h.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==L.renderOpts.collectedRevalidate&&!(L.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&L.renderOpts.collectedRevalidate,r=void 0===L.renderOpts.collectedExpire||L.renderOpts.collectedExpire>=h.INFINITE_CACHE?!1!==a&&a>0?E.expireTime:void 0:L.renderOpts.collectedExpire;return{value:{kind:x.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await v.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:S})},!1,N),t}},J=async(i,o)=>{try{var s,l;let i=await v.handleResponse({req:e,nextConfig:E,cacheKey:H,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:$,responseGenerator:Z,waitUntil:r.waitUntil,isMinimalMode:B});if(!D)return;if((null==i||null==(s=i.value)?void 0:s.kind)!==x.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==i||null==(l=i.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});B||t.setHeader("x-nextjs-cache",S?"REVALIDATED":i.isMiss?"MISS":i.isStale?"STALE":"HIT"),A&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,m.fromNodeOutgoingHttpHeaders)(i.value.headers);B&&D||n.delete(h.NEXT_CACHE_TAGS_HEADER),!i.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,g.getCacheControlHeader)(i.cacheControl)),await (0,u.sendResponse)(V,W,new Response(i.value.body,{headers:n,status:i.value.status||200}));return}catch(t){if(t instanceof f.NoFallbackError||await v.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:S})},!1,N),D)throw t;await (0,u.sendResponse)(V,W,new Response(null,{status:500}));return}finally{(()=>{if(!i)return;let e=t.statusCode;i.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(i.setStatus({code:n.SpanStatusCode.ERROR}),i.setAttribute("error.type",e.toString()));let a=j.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route")||q,s=`${z} ${r}`;i.setAttributes({"next.route":r,"http.route":r,"next.span_name":s}),i.updateName(s),o&&o!==i&&(o.setAttribute("http.route",r),o.updateName(s))})()}};if(G&&F)await J(F,void 0);else{let t=j.getActiveScopeSpan();await j.withPropagatedContext(e.headers,()=>j.trace(d.BaseServerSpan.handleRequest,{spanName:`${z} ${b}`,kind:n.SpanKind.SERVER,attributes:{"http.method":z,"http.target":e.url}},e=>J(e,t)),void 0,!G)}}e.s(["handler",0,R,"patchFetch",0,function(){return(0,r.patchFetch)({workAsyncStorage:b,workUnitAsyncStorage:y})},"routeModule",0,v,"serverHooks",0,w,"workAsyncStorage",0,b,"workUnitAsyncStorage",0,y])}];

//# sourceMappingURL=_0bjclc-._.js.map