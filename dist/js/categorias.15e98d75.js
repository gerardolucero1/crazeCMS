(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["categorias"],{"5e5b":function(a,t,e){"use strict";e.r(t);var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-layout",{attrs:{"justify-center":"","align-center":""}},[e("v-flex",{attrs:{xs12:"",sm12:"",md10:"",lg10:"",x0:""}},[e("v-card",[e("v-card-title",[a._v(" Categorias - "),e("v-row",{attrs:{justify:"center"}},[e("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:a._u([{key:"activator",fn:function(t){var r=t.on;return[e("v-btn",a._g({attrs:{color:"primary",dark:""}},r),[a._v("Agregar categoria")])]}}]),model:{value:a.modalCategoria,callback:function(t){a.modalCategoria=t},expression:"modalCategoria"}},[e("v-card",[e("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[e("span",{staticClass:"headline"},[a._v("Categorias")])]),e("v-card-text",[e("v-container",[e("v-row",[e("v-col",{attrs:{cols:"12",md:"12"}},[e("v-text-field",{attrs:{label:"Nombre",required:""},model:{value:a.categoria,callback:function(t){a.categoria=t},expression:"categoria"}})],1),e("v-col",{attrs:{cols:"8",md:"8"}},[e("v-text-field",{attrs:{label:"Tallas",required:""},model:{value:a.talla,callback:function(t){a.talla=t},expression:"talla"}})],1),e("v-col",{attrs:{cols:"4",md:"4"}},[e("v-btn",{attrs:{color:"success"},on:{click:a.agregarTalla}},[a._v("Agregar")])],1)],1),e("v-row",[e("v-col",{attrs:{cols:"12",md12:""}},[e("v-simple-table",{attrs:{dense:""},scopedSlots:a._u([{key:"default",fn:function(){return[e("thead",[e("tr",[e("th",[a._v("ID")]),e("th",[a._v("Nombre")]),e("th",{staticClass:"text-center"},[a._v("Opciones")])])]),e("tbody",a._l(a.tallas,(function(t,r){return e("tr",{key:r},[e("td",[a._v(a._s(r))]),e("td",[a._v(a._s(t))]),e("td",{staticClass:"text-center"},[e("v-btn",{attrs:{text:"",icon:"",color:"pink"},on:{click:function(t){return a.eliminarTalla(r)}}},[e("v-icon",[a._v("delete")])],1)],1)])})),0)]},proxy:!0}])})],1)],1)],1)],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"primary",text:""},on:{click:function(t){a.modalCategoria=!1}}},[a._v(" Cancel ")]),e("v-btn",{attrs:{color:"primary",text:""},on:{click:a.guardarCategoria}},[a._v(" Guardar ")])],1)],1)],1)],1),e("v-spacer"),e("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:a.search,callback:function(t){a.search=t},expression:"search"}})],1),e("v-data-table",{staticClass:"elevation-1",attrs:{headers:a.headers,items:a.categorias,"items-per-page":5,loading:"true",search:a.search}})],1)],1)],1)},l=[],o=(e("a434"),e("d3b7"),e("159b"),e("96cf"),e("dc59")),s={data:function(){return{modalCategoria:!1,talla:"",tallas:[],search:"",headers:[{text:"Nombre",align:"left",sortable:!1,value:"nombre"},{text:"Boutiques",value:"boutiques"},{text:"Prendas",value:"prendas"},{text:"Opciones",value:"opciones"}],categorias:[],categoria:""}},mounted:function(){var a=this;o["b"].collection("categorias").onSnapshot((function(t){a.categorias=[],t.forEach((function(t){a.categorias.push(t.data())}))}))},methods:{agregarTalla:function(){this.tallas.push(this.talla),this.talla=""},eliminarTalla:function(a){this.tallas.splice(a,1)},guardarCategoria:function(){var a;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,regeneratorRuntime.awrap(o["b"].collection("categorias").add({nombre:this.categoria}));case 3:return a=t.sent,t.next=6,regeneratorRuntime.awrap(o["b"].collection("categorias").doc(a.id).update({id:a.id}));case 6:return t.sent,t.next=9,regeneratorRuntime.awrap(o["b"].collection("categorias").doc(a.id).update({tallas:this.tallas}));case 9:t.sent,t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),console.log(t.t0);case 15:return t.prev=15,this.modalCategoria=!1,t.finish(15);case 18:case"end":return t.stop()}}),null,this,[[0,12,15,18]])}}},n=s,c=e("2877"),i=e("6544"),d=e.n(i),u=e("8336"),v=e("b0af"),g=e("99d9"),p=e("62ad"),f=e("a523"),h=e("8fea"),m=e("169a"),b=e("0e8f"),x=e("132d"),C=e("a722"),_=e("0fd9"),k=e("1f4f"),w=e("2fa4"),V=e("8654"),y=Object(c["a"])(n,r,l,!1,null,null,null);t["default"]=y.exports;d()(y,{VBtn:u["a"],VCard:v["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:g["c"],VCol:p["a"],VContainer:f["a"],VDataTable:h["a"],VDialog:m["a"],VFlex:b["a"],VIcon:x["a"],VLayout:C["a"],VRow:_["a"],VSimpleTable:k["a"],VSpacer:w["a"],VTextField:V["a"]})}}]);
//# sourceMappingURL=categorias.15e98d75.js.map