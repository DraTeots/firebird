"use strict";(self.webpackChunkfirebird=self.webpackChunkfirebird||[]).push([[6719],{6719:(E,M,o)=>{o.r(M),o.d(M,{TScatterPainter:()=>h});var g=o(467),_=o(6998),p=o(6823),m=o(5284),c=o(4693),D=o(3277),T=o(4571);class h extends c.TGraphPainter{constructor(e,t){super(e,t),this._need_2dhist=!0,this._not_adjust_hrange=!0}getGraph(){return this.getObject()?.fGraph}getHistRangeMargin(){return this.getObject()?.fMargin??.1}drawAxisHisto(){var e=this;return(0,g.A)(function*(){const t=e.createHistogram();return T.AJ.draw(e.getDom(),t,e.getHistoOpt())})()}getPalette(){const e=this.getGraph();let t=e?.fFunctions?.arr?.find(f=>f._typename===_.clTPaletteAxis);if(t)return t;if(this.options.PadPalette)t=this.getPadPainter()?.findInPrimitives("palette",_.clTPaletteAxis);else if(e){t=(0,_.create)(_.clTPaletteAxis);const f=this.get_main();Object.assign(t,{fX1NDC:f.fX2NDC+.005,fX2NDC:f.fX2NDC+.05,fY1NDC:f.fY1NDC,fY2NDC:f.fY2NDC,fInit:1,$can_move:!0}),Object.assign(t.fAxis,{fChopt:"+",fLineColor:1,fLineSyle:1,fLineWidth:1,fTextAngle:0,fTextAlign:11,fNdiv:510}),e.fFunctions.AddFirst(t,"")}return t}_updateMembers(e,t){e.fBits=t.fBits,e.fTitle=t.fTitle,e.fNpoints=t.fNpoints,e.fColor=t.fColor,e.fSize=t.fSize,e.fMargin=t.fMargin,e.fMinMarkerSize=t.fMinMarkerSize,e.fMaxMarkerSize=t.fMaxMarkerSize,super._updateMembers(e.fGraph,t.fGraph)}drawGraph(){var e=this;return(0,g.A)(function*(){const t=e.get_main(),f=e.getMainPainter(),r=e.getObject();let C=1,d=0;if(!t||!f||!r)return;if(r.fColor){const i=e.getPalette();i&&(i.$main_painter=e);const n=e.getPadPainter();!e._color_palette&&(0,_.isFunc)(n?.getCustomPalette)&&(e._color_palette=n.getCustomPalette()),e._color_palette||(e._color_palette=(0,p.jh)(e.options.Palette,n?.isGrayscale()));let a=r.fColor[0],s=r.fColor[0];for(let l=1;l<r.fColor.length;++l)a=Math.min(a,r.fColor[l]),s=Math.max(s,r.fColor[l]);s<=a&&(s=a<0?.9*a:a>0?1.1*a:1),e.fContour=new D.Z8(a,s),e.fContour.createNormal(30),e.fContour.configIndicies(0,0),t.zmin=a,t.zmax=s}if(r.fSize){let i=r.fSize[0],n=r.fSize[0];for(let a=1;a<r.fSize.length;++a)i=Math.min(i,r.fSize[a]),n=Math.max(n,r.fSize[a]);n<=i&&(n=i>0?.9*i:i>0?1.1*i:1),C=(r.fMaxMarkerSize-r.fMinMarkerSize)/(n-i),d=i}e.createG(!t.pad_layer);const u=t.getGrFuncs();for(let i=0;i<e.bins.length;++i){const n=e.bins[i],a=u.grx(n.x),s=u.gry(n.y),l=r.fSize?r.fMinMarkerSize+C*(r.fSize[i]-d):r.fMarkerSize,z=r.fColor?e.fContour.getPaletteColor(e._color_palette,r.fColor[i]):e.getColor(r.fMarkerColor),P=new m.e({color:z,size:l,style:r.fMarkerStyle});e.draw_g.append("svg:path").attr("d",P.create(a,s)).call(P.func)}return e})()}static draw(e,t,f){return(0,g.A)(function*(){return c.TGraphPainter._drawGraph(new h(e,t),f)})()}}}}]);