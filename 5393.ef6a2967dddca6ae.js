"use strict";(self.webpackChunkfirebird=self.webpackChunkfirebird||[]).push([[5393],{5393:(M,E,h)=>{h.r(E),h.d(E,{TRatioPlotPainter:()=>m});var D=h(467),u=h(6998),b=h(675),L=h(9025),X=h(2695);class m extends b.JW{setGridsRange(a,i){const d=this.getObject();if(a===i){const r=this.getPadPainter()?.findPainterFor(d.fLowerPad,"lower_pad",u.clTPad)?.getFramePainter()?.x_handle;if(!r)return;a=r.full_min,i=r.full_max}d.fGridlines.forEach(r=>{r.fX1=a,r.fX2=i})}redraw(){var a=this;return(0,D.A)(function*(){const i=a.getObject(),d=a.getPadPainter(),r=d.findPainterFor(i.fTopPad,"top_pad",u.clTPad);r&&r.disablePadDrawing();const f=d.findPainterFor(i.fUpperPad,"upper_pad",u.clTPad),c=f?.getMainPainter(),e=f?.getFramePainter(),P=d.findPainterFor(i.fLowerPad,"lower_pad",u.clTPad),z=P?.getMainPainter(),n=P?.getFramePainter();let s=20,w=Promise.resolve(!0);if(f&&c&&e&&n&&!f._ratio_configured){f._ratio_configured=!0,c.options.Axis=0,s=c.getHisto().fYaxis.fLabelSize,s<1&&(s=Math.round(s*Math.min(f.getPadWidth(),f.getPadHeight())));const _=c.getHisto();_.fXaxis.fLabelSize=0,_.fXaxis.fTitle="",_.fYaxis.fLabelSize=s,_.fYaxis.fTitleSize=s,f.getRootPad().fTicky=1,w=f.redrawPad().then(()=>(e.o_zoom=e.zoom,e._ratio_low_fp=n,e._ratio_painter=a,e.zoom=function(p,g,o,l,t,C){return this.o_zoom(p,g,o,l,t,C).then(T=>(this._ratio_painter.setGridsRange(e.scale_xmin,e.scale_xmax),this._ratio_low_fp.o_zoom(e.scale_xmin,e.scale_xmax),T))},e.o_sizeChanged=e.sizeChanged,e.sizeChanged=function(){this.o_sizeChanged(),this._ratio_low_fp.fX1NDC=this.fX1NDC,this._ratio_low_fp.fX2NDC=this.fX2NDC,this._ratio_low_fp.o_sizeChanged()},!0))}return w.then(()=>{if(!P||!z||!n||!e||P._ratio_configured)return a;P._ratio_configured=!0,z.options.Axis=0;const _=z.getHisto();_.fXaxis.fTitle="x",_.fXaxis.fLabelSize=s,_.fXaxis.fTitleSize=s,_.fYaxis.fLabelSize=s,_.fYaxis.fTitleSize=s,P.getRootPad().fTicky=1,P.forEachPainterInPad(o=>{(0,u.isFunc)(o?.testEditable)&&o.testEditable(!1)});const p=[];let g;return i.fGridlinePositions.length>0&&i.fGridlines.length<i.fGridlinePositions.length&&i.fGridlinePositions.forEach(o=>{let l=!1;if(i.fGridlines.forEach(t=>{t.fY1===t.fY2&&Math.abs(t.fY1-o)<1e-6&&(l=!0)}),!l){const t=(0,u.create)(u.clTLine);t.fX1=e.scale_xmin,t.fX2=e.scale_xmax,t.fY1=t.fY2=o,t.fLineStyle=2,i.fGridlines.push(t),void 0===g&&(g=a.selectCurrentPad(i.fLowerPad.fName)),p.push(X.TLinePainter.draw(a.getDom(),t))}}),Promise.all(p).then(()=>n.zoom(e.scale_xmin,e.scale_xmax)).then(()=>(n.o_zoom=n.zoom,n._ratio_up_fp=e,n._ratio_painter=a,n.zoom=function(o,l,t,C,T,x){return this._ratio_painter.setGridsRange(o,l),this._ratio_up_fp.o_zoom(o,l),this.o_zoom(o,l,t,C,T,x)},n.o_sizeChanged=n.sizeChanged,n.sizeChanged=function(){this.o_sizeChanged(),this._ratio_up_fp.fX1NDC=this.fX1NDC,this._ratio_up_fp.fX2NDC=this.fX2NDC,this._ratio_up_fp.o_sizeChanged()},a))})})()}static draw(a,i,d){return(0,D.A)(function*(){const r=new m(a,i,d);return(0,L.ensureTCanvas)(r,!1).then(()=>r.redraw())})()}}}}]);