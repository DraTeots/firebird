"use strict";(self.webpackChunkfirebird=self.webpackChunkfirebird||[]).push([[4843],{4843:(w,A,o)=>{o.r(A),o.d(A,{TF2Painter:()=>E});var H=o(467),s=o(6998),Y=o(4149),F=o(230),C=o(675),O=o(9041),D=o(3277);class E extends Y.TH2Painter{getObjectName(){return this.$func?.fName??"func"}getClassName(){return this.$func?._typename??s.clTF2}isTF1(){return!0}updateObject(e){if(!e||this.getClassName()!==e._typename)return!1;delete e.evalPar;const t=this.getHisto();if(this.webcanv_hist){const i=this.getPadPainter()?.findInPrimitives("Func",s.clTH2F);i&&this.updateAxes(t,i,this.getFramePainter())}return this.$func=e,this.createTF2Histogram(e,t),this.scanContent(),!0}redraw(e){return!this._use_saved_points&&("logx"===e||"logy"===e||"zoom"===e)&&(this.createTF2Histogram(this.$func,this.getHisto()),this.scanContent()),super.redraw(e)}createTF2Histogram(e,t=void 0){let i=e.fSave.length;i>6&&i!==(e.fSave[i-2]+1)*(e.fSave[i-1]+1)+6&&(i=0),this._use_saved_points=i>6&&(s.settings.PreferSavedPoints||this.force_saved);const f=this.getFramePainter(),x=this.getPadPainter()?.getRootPad(!0),h=x?.fLogx,_=x?.fLogy,a=f?.getGrFuncs(this.second_x,this.second_y);let l=e.fXmin,M=e.fXmax,g=e.fYmin,u=e.fYmax;a?.zoom_xmin!==a?.zoom_xmax&&(l=Math.min(l,a.zoom_xmin),M=Math.max(M,a.zoom_xmax)),a?.zoom_ymin!==a?.zoom_ymax&&(g=Math.min(g,a.zoom_ymin),u=Math.max(u,a.zoom_ymax));const b=(r,n)=>{t.fNcells!==(r+2)*(n+2)&&(t.fNcells=(r+2)*(n+2),t.fArray=new Float32Array(t.fNcells),t.fArray.fill(0)),t.fXaxis.fNbins=r,t.fXaxis.fXbins=[],t.fYaxis.fNbins=n,t.fYaxis.fXbins=[]};if(delete this._fail_eval,!this._use_saved_points){const r=Math.max(e.fNpx,20),n=Math.max(e.fNpy,20);let m=!1;!e.evalPar&&!(0,F.proivdeEvalPar)(e)&&(m=!0),b(r,n),t.fXaxis.fXmin=l,t.fXaxis.fXmax=M,t.fYaxis.fXmin=g,t.fYaxis.fXmax=u,h&&(0,F.produceTAxisLogScale)(t.fXaxis,r,l,M),_&&(0,F.produceTAxisLogScale)(t.fYaxis,n,g,u);for(let d=0;d<n&&!m;++d)for(let v=0;v<r&&!m;++v){const P=t.fXaxis.GetBinCenter(v+1),c=t.fYaxis.GetBinCenter(d+1);let y=0;try{y=e.evalPar(P,c)}catch{m=!0}m||t.setBinContent(t.getBin(v+1,d+1),Number.isFinite(y)?y:0)}m&&(this._fail_eval=!0),m&&i>6&&(this._use_saved_points=!0)}if(this._use_saved_points){const r=Math.round(e.fSave[i-2]),n=Math.round(e.fSave[i-1]),m=e.fSave[i-6],d=e.fSave[i-5],v=e.fSave[i-4],P=e.fSave[i-3],c=1e-10,y=(e.fXmax-e.fXmin)/Math.max(1,e.fNpx),X=(e.fYmax-e.fYmin)/Math.max(1,e.fNpy),L=Math.abs(m-e.fXmin-.5*y)<c&&Math.abs(e.fXmax-.5*y-d)<c&&Math.abs(v-e.fYmin-.5*X)<c&&Math.abs(e.fYmax-.5*X-P)<c,p=L?r-1:r,N=L?n-1:n;b(p,N),t.fXaxis.fXmin=m,t.fXaxis.fXmax=d,t.fYaxis.fXmin=v,t.fYaxis.fXmax=P;for(let z=0,S=0;S<=n;++S)for(let T=0;T<=r;++T){const B=e.fSave[z++];S<N&&T<p&&t.setBinContent(t.getBin(T+1,S+1),Number.isFinite(B)?B:0)}}return t.fName="Func",(0,s.setHistogramTitle)(t,e.fTitle),t.fMinimum=e.fMinimum,t.fMaximum=e.fMaximum,t.fLineColor=e.fLineColor,t.fLineStyle=e.fLineStyle,t.fLineWidth=e.fLineWidth,t.fFillColor=e.fFillColor,t.fFillStyle=e.fFillStyle,t.fMarkerColor=e.fMarkerColor,t.fMarkerStyle=e.fMarkerStyle,t.fMarkerSize=e.fMarkerSize,t.fBits|=s.kNoStats,t}extractAxesProperties(e){super.extractAxesProperties(e);const t=this.$func,i=t?.fSave.length??0;i>6&&this._use_saved_points&&(this.xmin=Math.min(this.xmin,t.fSave[i-6]),this.xmax=Math.max(this.xmax,t.fSave[i-5]),this.ymin=Math.min(this.ymin,t.fSave[i-4]),this.ymax=Math.max(this.ymax,t.fSave[i-3])),t&&(this.xmin=Math.min(this.xmin,t.fXmin),this.xmax=Math.max(this.xmax,t.fXmax),this.ymin=Math.min(this.ymin,t.fYmin),this.ymax=Math.max(this.ymax,t.fYmax))}getTF2Tooltips(e){const t=[this.getObjectHint()],i=this.getFramePainter()?.getGrFuncs(this.options.second_x,this.options.second_y);if(!i||!(0,s.isFunc)(this.$func?.evalPar))return t.push("grx = "+e.x,"gry = "+e.y),t;const f=i.revertAxis("x",e.x),x=i.revertAxis("y",e.y);let h=0,_=!1;try{h=this.$func.evalPar(f,x)}catch{_=!0}return t.push("x = "+i.axisAsText("x",f),"y = "+i.axisAsText("y",x),"value = "+(_?"<fail>":(0,O.lg)(h,s.gStyle.fStatFormat))),t}processTooltipEvent(e){if(this._use_saved_points)return super.processTooltipEvent(e);let t=this.draw_g?.selectChild(".tooltip_bin");if(!this.draw_g||!e)return t?.remove(),null;const i={name:this.$func?.fName,title:this.$func?.fTitle,x:e.x,y:e.y,color1:this.lineatt?.color??"green",color2:this.fillatt?.getFillColorAlt("blue")??"blue",lines:this.getTF2Tooltips(e),exact:!0,menu:!0};return t.empty()&&(t=this.draw_g.append("svg:circle").attr("class","tooltip_bin").style("pointer-events","none").style("fill","none").attr("r",(this.lineatt?.width??1)+4)),t.attr("cx",e.x).attr("cy",e.y).call(this.lineatt?.func),i}fillWebObjectOptions(e){e.fcust=this._fail_eval?"func_fail":""}static draw(e,t,i){return(0,H.A)(function*(){(0,s.isStr)(i)||(i="");let f=i.indexOf(";webcanv_hist"),x=!1,h=!1;f>=0&&(x=!0,i=i.slice(0,f)),f=i.indexOf(";force_saved"),f>=0&&(h=!0,i=i.slice(0,f));const _=new O.nC(i);let a;("SAMECOLORZ"===(i=_.empty()?"cont3":"SAME"===_.opt?"cont2 same":_.opt)||"SAMECOLOR"===i||"SAMECOLZ"===i)&&(i="SAMECOL"),0===i.indexOf("SAME")&&((0,C.Nn)(e)||(i="A_ADJUST_FRAME_"+i.slice(4))),x&&(a=new C.JW(e).getPadPainter()?.findInPrimitives("Func",s.clTH2F)),a||(a=(0,s.createHistogram)(s.clTH2F,20,20),a.fBits|=s.kNoStats);const l=new E(e,a);return l.$func=t,l.webcanv_hist=x,l.force_saved=h,l.createTF2Histogram(t,a),D.mf._drawHist(l,i)})()}}}}]);