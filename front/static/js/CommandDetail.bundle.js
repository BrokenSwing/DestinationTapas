(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{300:function(e,t,n){"use strict";n.r(t);var r=n(13),a=n.n(r),o=n(5),c=n.n(o),s=n(6),i=n.n(s),u=n(7),l=n.n(u),p=n(8),d=n.n(p),m=n(9),h=n.n(m),f=n(0),b=n.n(f),E=(n(22),n(21),n(10)),v=(n(20),n(24)),y=n(23),O=n(68),C=n(64),g=n(15),k=n.n(g),S=n(85),N=n(62),w=function(e){function t(){return c()(this,t),l()(this,d()(t).apply(this,arguments))}return h()(t,e),i()(t,[{key:"render",value:function(){return b.a.createElement(S.b,null,this.props.contributions.map(function(e){return b.a.createElement(S.a,{key:e.id,selected:!0,locked:!0},b.a.createElement(S.c,null,e.user?b.a.createElement(N.a,{userId:e.user}):b.a.createElement(b.a.Fragment,null,"Ceci ne devrait pas arriver, contactez un administrateur",b.a.createElement(E.a,{iconName:"exclamation-triangle"}))),b.a.createElement(S.c,null,e.part,"€"))}))}}]),t}(b.a.Component);w.propTypes={contributions:k.a.arrayOf(C.a)};var P=n(84),R=function(e){function t(){return c()(this,t),l()(this,d()(t).apply(this,arguments))}return h()(t,e),i()(t,[{key:"render",value:function(){for(var e=[],t=this.props.contributions.slice(),n=function(){var n=t[0],r=t.filter(function(e){return e.product===n.product&&e.user===n.user}),a=r.map(function(e){return e.part}).reduce(function(e,t){return e+t});a=Math.round(100*a)/100,e.push({id:n.id,count:r.length,price:a,product:n.product,user:n.user});var o=r.map(function(e){return e.id});t=t.filter(function(e){return!o.includes(e.id)})};t.length>0;)n();return b.a.createElement("table",{className:"table is-striped"},b.a.createElement("thead",null,b.a.createElement("tr",null,b.a.createElement("th",null,"Quantité"),b.a.createElement("th",null,"Shot"),b.a.createElement("th",null,"Attribution"),b.a.createElement("th",null,"Prix"))),b.a.createElement("tbody",null,e.map(function(e){return b.a.createElement("tr",{key:e.id},b.a.createElement("td",null,e.count),b.a.createElement("td",null,b.a.createElement(P.a,{productId:e.product})),b.a.createElement("td",null,e.user?b.a.createElement(N.a,{userId:e.user}):b.a.createElement(b.a.Fragment,null,"Non assigné")),b.a.createElement("td",null,e.price,"€"))})))}}]),t}(b.a.Component);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach(function(t){a()(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}R.propTypes={contributions:k.a.arrayOf(C.a)},n.d(t,"default",function(){return T});var T=function(e){function t(e){var n;return c()(this,t),(n=l()(this,d()(t).call(this,e))).state={command:null,product:null},n}return h()(t,e),i()(t,[{key:"componentDidMount",value:function(){var e=this;this.partyId=Aviator.getCurrentRequest().namedParams.id,this.commandId=Aviator.getCurrentRequest().namedParams.command,Object(v.b)(this.commandId).then(function(t){t.ok&&(e.setState({command:t.command}),Object(y.b)(t.command.product).then(function(t){t.ok&&e.setState({product:t.product})}).catch(console.log))}).catch(console.log)}},{key:"render",value:function(){return b.a.createElement(b.a.Fragment,null,b.a.createElement("a",{className:"is-link navigate",href:Aviator.hrefFor("/parties/:id/",{namedParams:{id:Aviator.getCurrentRequest().namedParams.id}})},b.a.createElement(E.a,{iconName:"arrow-left",iconClasses:"is-small"}),b.a.createElement("span",null,"Retour")),b.a.createElement("h1",{className:"title"},"Détail de la commande"),b.a.createElement(O.d,null,b.a.createElement(O.b,{name:"Choisis"},this.state.product&&b.a.createElement(O.a,{product:q({},this.state.product,{price:this.state.command.total_price}),selected:!0}))),b.a.createElement("h2",{className:"subtitle is-size-5"},"Participants"),this.state.product&&("Plateau de shooters"===this.state.product.name?b.a.createElement(R,{contributions:this.state.command.contributions}):b.a.createElement(w,{contributions:this.state.command.contributions})))}}]),t}(b.a.Component)},60:function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},n.apply(this,arguments)}e.exports=n},61:function(e,t,n){"use strict";n.d(t,"a",function(){return k});var r=n(5),a=n.n(r),o=n(6),c=n.n(o),s=n(7),i=n.n(s),u=n(8),l=n.n(u),p=n(16),d=n.n(p),m=n(9),h=n.n(m),f=n(0),b=n.n(f),E=n(10),v=n(68),y=n(15),O=n.n(y),C=n(19),g={OTHER:"Autre",SHOT:"Shots",FOOD:"Nourriture",COCKTAIL:"Cocktails",BEER:"Bière",SOFT:"Soft"},k=function(e){function t(e){var n;return a()(this,t),(n=i()(this,l()(t).call(this,e))).state={allProducts:[],filtered:[],selected:-1},n.searchBarChange=n.searchBarChange.bind(d()(n)),n.onProductSelection=n.onProductSelection.bind(d()(n)),n}return h()(t,e),c()(t,[{key:"searchBarChange",value:function(e){var t=e.target.value.toLowerCase();this.setState(function(e,n){return{filtered:e.allProducts.filter(n.preFilter).filter(function(e){if(-1!==e.name.toLowerCase().indexOf(t))return!0;var n=g[e.product_type];return!(!n||-1===n.toLowerCase().indexOf(t))||-1!==e.ingredients.reduce(function(e,t){return e+" "+t},"").toLowerCase().indexOf(t)})}})}},{key:"onProductSelection",value:function(e){this.setState(function(t,n){var r=t.selected===e?-1:e;return n.onProductSelection(r),{selected:r}})}},{key:"componentDidMount",value:function(){var e=this;Object(C.h)().then(function(t){t.ok&&e.setState({allProducts:t.products,filtered:t.products.filter(e.props.preFilter)})}).catch(console.log)}},{key:"render",value:function(){var e=this,t={SHOT:[],COCKTAIL:[],FOOD:[],BEER:[],SOFT:[],OTHER:[]};return this.state.filtered.forEach(function(e){t[e.product_type]&&t[e.product_type].push(e)}),b.a.createElement(b.a.Fragment,null,this.props.showSearchBar&&b.a.createElement("div",{className:"columns"},b.a.createElement("div",{className:"column is-two-fifths"},b.a.createElement("p",{className:"control has-icons-left"},b.a.createElement("input",{className:"input",type:"text",placeholder:"Rechercher",onChange:this.searchBarChange}),b.a.createElement(E.a,{iconName:"search",iconClasses:"is-small is-left"})))),b.a.createElement(v.d,null,Object.keys(t).filter(function(e){return t[e].length>0}).map(function(n){return b.a.createElement(v.b,{key:n,name:g[n]},t[n].map(function(t){return b.a.createElement(v.a,{key:t.id,product:t,onCommand:e.props.onCommand,onSelect:e.onProductSelection,selected:e.state.selected===t.id,showCommandButton:e.props.showCommandButton})}))}),0===Object.keys(t).filter(function(e){return t[e].length>0}).length&&b.a.createElement("h2",{className:"subtitle has-text-centered is-size-6"},"Pas de produits")))}}]),t}(b.a.Component);k.propTypes={showCommandButton:O.a.bool,onCommand:O.a.func,showSearchBar:O.a.bool,preFilter:O.a.func,onProductSelection:O.a.func},k.defaultProps={showCommandButton:!1,onCommand:function(){},showSearchBar:!0,preFilter:function(){return!0},onProductSelection:function(){}}},62:function(e,t,n){"use strict";n.d(t,"a",function(){return v});var r=n(5),a=n.n(r),o=n(6),c=n.n(o),s=n(7),i=n.n(s),u=n(8),l=n.n(u),p=n(9),d=n.n(p),m=n(0),h=n.n(m),f=n(19),b=n(15),E=n.n(b),v=function(e){function t(e){var n;return a()(this,t),(n=i()(this,l()(t).call(this,e))).state={user:null},n}return d()(t,e),c()(t,[{key:"componentDidMount",value:function(){var e=this;Object(f.n)(this.props.userId).then(function(t){t.ok&&e.setState({user:t.user})}).catch(console.log)}},{key:"render",value:function(){return h.a.createElement(h.a.Fragment,null,this.state.user&&this.state.user.username)}}]),t}(h.a.Component);v.propTypes={userId:E.a.number.isRequired}},63:function(e,t){e.exports=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}},64:function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"a",function(){return c});var r=n(15),a=n.n(r),o=a.a.shape({id:a.a.number.isRequired,name:a.a.string.isRequired,price:a.a.number.isRequired,old:a.a.bool.isRequired,product_type:a.a.oneOf(["SHOT","FOOD","COCKTAIL","OTHER","BEER","SOFT"]).isRequired,ingredients:a.a.arrayOf(a.a.shape({id:a.a.number.isRequired,name:a.a.string.isRequired})).isRequired}),c=a.a.shape({user:a.a.number,part:a.a.number.isRequired,product:a.a.number.isRequired,id:a.a.number.isRequired})},68:function(e,t,n){"use strict";var r=n(5),a=n.n(r),o=n(6),c=n.n(o),s=n(7),i=n.n(s),u=n(8),l=n.n(u),p=n(9),d=n.n(p),m=n(0),h=n.n(m),f=n(15),b=n.n(f),E=n(64),v=function(e){function t(){return a()(this,t),i()(this,l()(t).apply(this,arguments))}return d()(t,e),c()(t,[{key:"render",value:function(){var e=this;return h.a.createElement("li",null,h.a.createElement("a",{className:this.props.selected?"is-active":"",onClick:function(){return e.props.onSelect(e.props.product.id)}},h.a.createElement("div",{className:"columns is-gapless is-multiline"},h.a.createElement("div",{className:"column is-12"},this.props.product.name,h.a.createElement("span",{className:"has-text-right",style:{float:"right"}},this.props.product.price,"€")),this.props.selected&&this.props.product.ingredients.length>0&&h.a.createElement("div",{className:"column is-size-7"},this.props.product.ingredients.map(function(e){return e.name}).reduce(function(e,t){return"".concat(e,", ").concat(t)}))),this.props.showCommandButton&&this.props.selected&&h.a.createElement("button",{className:"button is-link",onClick:function(t){t.stopPropagation(),t.preventDefault(),e.props.onCommand(e.props.product.id)}},"Commander")))}}]),t}(h.a.Component);v.propTypes={selected:b.a.bool,showCommandButton:b.a.bool,onCommand:b.a.func,onSelect:b.a.func,product:E.b.isRequired},v.defaultProps={selected:!1,showCommandButton:!1,onCommand:function(){},onSelect:function(){}};var y=function(e){function t(){return a()(this,t),i()(this,l()(t).apply(this,arguments))}return d()(t,e),c()(t,[{key:"render",value:function(){return h.a.createElement(h.a.Fragment,null,h.a.createElement("p",{className:"menu-label"},this.props.name),h.a.createElement("ul",{className:"menu-list"},this.props.children))}}]),t}(h.a.Component),O=function(e){function t(){return a()(this,t),i()(this,l()(t).apply(this,arguments))}return d()(t,e),c()(t,[{key:"render",value:function(){return h.a.createElement("div",{className:"columns"},h.a.createElement("div",{className:"column is-two-fifths"},h.a.createElement("aside",{className:"menu"},this.props.children)))}}]),t}(h.a.Component),C=n(61);n.d(t,"a",function(){return v}),n.d(t,"b",function(){return y}),n.d(t,"d",function(){return O}),n.d(t,"c",function(){return C.a})},69:function(e,t,n){var r=n(63);e.exports=function(e,t){if(null==e)return{};var n,a,o=r(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}},84:function(e,t,n){"use strict";n.d(t,"a",function(){return v});var r=n(5),a=n.n(r),o=n(6),c=n.n(o),s=n(7),i=n.n(s),u=n(8),l=n.n(u),p=n(9),d=n.n(p),m=n(0),h=n.n(m),f=n(23),b=n(15),E=n.n(b),v=function(e){function t(e){var n;return a()(this,t),(n=i()(this,l()(t).call(this,e))).state={productName:""},n}return d()(t,e),c()(t,[{key:"componentDidMount",value:function(){var e=this;Object(f.b)(this.props.productId).then(function(t){t.ok&&e.setState({productName:t.product.name})}).catch(console.log)}},{key:"render",value:function(){return h.a.createElement(h.a.Fragment,null,this.state.productName)}}]),t}(h.a.Component);v.propTypes={productId:E.a.number.isRequired}},85:function(e,t,n){"use strict";var r=n(5),a=n.n(r),o=n(6),c=n.n(o),s=n(7),i=n.n(s),u=n(8),l=n.n(u),p=n(16),d=n.n(p),m=n(9),h=n.n(m),f=n(0),b=n.n(f),E=n(15),v=n.n(E),y=n(10),O=n(60),C=n.n(O),g=n(69),k=n.n(g),S=function(e){function t(){return a()(this,t),i()(this,l()(t).apply(this,arguments))}return h()(t,e),c()(t,[{key:"render",value:function(){var e=this.props,t=e.className,n=k()(e,["className"]);return b.a.createElement("td",C()({className:"has-text-centered ".concat(t||"")},n),this.props.children)}}]),t}(b.a.Component),N=function(e){function t(e){var n;return a()(this,t),(n=i()(this,l()(t).call(this,e))).onUserClick=n.onUserClick.bind(d()(n)),n}return h()(t,e),c()(t,[{key:"onUserClick",value:function(){this.props.selected&&this.props.onDeselect?this.props.onDeselect():this.props.onSelect&&this.props.onSelect()}},{key:"render",value:function(){return b.a.createElement("tr",{className:this.props.selected?"is-selected":"",onClick:this.onUserClick},this.props.children,b.a.createElement(S,null,this.props.locked?b.a.createElement(y.a,{iconName:"lock"}):this.props.selected?b.a.createElement(y.a,{iconName:"check-square"}):b.a.createElement("span",{className:"icon"})))}}]),t}(b.a.Component);N.propTypes={selected:v.a.bool.isRequired,onSelect:v.a.func,onDeselect:v.a.func,locked:v.a.bool},N.defaultProps={locked:!1};var w=function(e){function t(){return a()(this,t),i()(this,l()(t).apply(this,arguments))}return h()(t,e),c()(t,[{key:"render",value:function(){return b.a.createElement("table",{className:"table is-striped is-fullwidth is-hoverable"},b.a.createElement("tbody",null,this.props.children))}}]),t}(b.a.Component);n.d(t,"a",function(){return N}),n.d(t,"b",function(){return w}),n.d(t,"c",function(){return S})}}]);