(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{296:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return g});var s=n(5),a=n.n(s),r=n(6),i=n.n(r),c=n(7),l=n.n(c),u=n(8),o=n.n(u),d=n(16),m=n.n(d),f=n(9),h=n.n(f),v=n(0),E=n.n(v),N=n(10),p=(n(22),n(21),n(19)),b=n(62),g=function(e){function t(e){var n;return a()(this,t),(n=l()(this,o()(t).call(this,e))).state={friends:[],sent:[],received:[],submitting:!1,friendName:""},n.addFriend=n.addFriend.bind(m()(n)),n.cancelFriendRequest=n.cancelFriendRequest.bind(m()(n)),n.acceptFriendRequest=n.acceptFriendRequest.bind(m()(n)),n.refuseFriendRequest=n.refuseFriendRequest.bind(m()(n)),n.deleteFriend=n.deleteFriend.bind(m()(n)),n}return h()(t,e),i()(t,[{key:"componentDidMount",value:function(){var e=this;Object(p.o)(localStorage.getItem("userId")).then(function(t){t.ok&&e.setState({sent:t.sent_requests,received:t.received_requests,friends:t.friends})}).catch(console.log)}},{key:"addFriend",value:function(){var e=this;this.setState({submitting:!0}),Object(p.q)(this.state.friendName).then(function(t){t.ok?Object(p.b)(localStorage.getItem("userId"),t.id).then(function(t){e.setState({submitting:!1}),t.ok&&e.setState({sent:t.sent_requests,received:t.received_requests,friends:t.friends,friendName:""})}).catch(function(){return e.setState({submitting:!1})}):e.setState({submitting:!1})}).catch(console.log)}},{key:"cancelFriendRequest",value:function(e){var t=this;this.setState(function(t,n){return{sent:t.sent.filter(function(t){return t!==e})}}),Object(p.d)(localStorage.getItem("userId"),e).then(function(n){n.ok?t.setState({sent:n.sent_requests,received:n.received_requests,friends:n.friends}):t.setState(function(t,n){var s=t.sent.slice();return s.push(e),{sent:s}})}).catch(console.log)}},{key:"acceptFriendRequest",value:function(e){var t=this;this.setState(function(t,n){var s=t.friends.slice();return s.push(e),{friends:s,received:t.received.filter(function(t){return t!==e})}}),Object(p.a)(localStorage.getItem("userId"),e).then(function(n){n.ok?t.setState({sent:n.sent_requests,received:n.received_requests,friends:n.friends}):t.setState(function(t,n){var s=t.received.slice();return s.push(e),{received:s,friends:t.friends.filter(function(t){return t!==e})}})}).catch(console.log)}},{key:"refuseFriendRequest",value:function(e){var t=this;this.setState(function(t,n){return{received:t.received.filter(function(t){return t!==e})}}),Object(p.t)(localStorage.getItem("userId"),e).then(function(n){n.ok?t.setState({sent:n.sent_requests,received:n.received_requests,friends:n.friends}):t.setState(function(t,n){var s=t.received.slice();return s.push(e),{received:s}})}).catch(console.log)}},{key:"deleteFriend",value:function(e){var t=this;this.setState(function(t,n){return{friends:t.friends.filter(function(t){return t!==e})}}),Object(p.u)(localStorage.getItem("userId"),e).then(function(n){n.ok?t.setState({sent:n.sent_requests,received:n.received_requests,friends:n.friends}):t.setState(function(t,n){var s=t.friends.slice();return s.push(e),{friends:s}})}).catch(console.log)}},{key:"render",value:function(){var e=this;return E.a.createElement(E.a.Fragment,null,E.a.createElement("h1",{className:"title is-4"},"Amis"),E.a.createElement("h2",{className:"subtitle"},"Ajouter un ami"),E.a.createElement("div",{className:"field has-addons"},E.a.createElement("div",{className:"control has-icons-left"},E.a.createElement(N.a,{iconName:"search",iconClasses:"is-left"}),E.a.createElement("input",{className:"input",type:"text",placeholder:"Pseudo",value:this.state.friendName,onChange:function(t){return e.setState({friendName:t.target.value})}})),E.a.createElement("div",{className:"control"},E.a.createElement("a",{className:"button is-link",disabled:this.state.submitting||0===this.state.friendName.length,onClick:this.addFriend},this.state.submitting?"Envoie ...":"Ajouter"))),E.a.createElement("h2",{className:"subtitle"},"Demandes reçues : "),0===this.state.received.length&&E.a.createElement("h3",{className:"has-text-centered subtitle is-size-6"},"Pas de demandes"),this.state.received.map(function(t){return E.a.createElement(k,{key:t,from:t,accept:e.acceptFriendRequest,refuse:e.refuseFriendRequest})}),E.a.createElement("h2",{className:"subtitle"},"Demandes envoyées : "),0===this.state.sent.length&&E.a.createElement("h3",{className:"has-text-centered subtitle is-size-6"},"Pas de demandes"),this.state.sent.map(function(t){return E.a.createElement(S,{key:t,to:t,cancel:e.cancelFriendRequest})}),E.a.createElement("h2",{className:"subtitle"},"Amis : "),0===this.state.friends.length&&E.a.createElement("h3",{className:"has-text-centered subtitle is-size-6"},"Pas d'amis"),this.state.friends.map(function(t){return E.a.createElement(q,{key:t,userId:t,remove:e.deleteFriend})}))}}]),t}(E.a.Component),k=function(e){var t=e.from,n=e.accept,s=e.refuse;return E.a.createElement("div",{className:"box"},E.a.createElement("div",{className:"columns is-mobile"},E.a.createElement("div",{className:"column"},E.a.createElement("div",{className:"field has-icons-left"},E.a.createElement(N.a,{iconName:"user",iconClasses:"is-left"}),E.a.createElement("span",null,E.a.createElement(b.a,{userId:t})))),E.a.createElement("div",{className:"column"},E.a.createElement("div",{className:"field is-grouped"},E.a.createElement("p",{className:"control",onClick:function(){return n(t)}},E.a.createElement("a",{className:"button is-success is-small"},"Accepter")),E.a.createElement("p",{className:"control",onClick:function(){return s(t)}},E.a.createElement("a",{className:"button is-danger is-small"},"Refuser"))))))},S=function(e){var t=e.to,n=e.cancel;return E.a.createElement("div",{className:"box"},E.a.createElement("div",{className:"columns is-mobile"},E.a.createElement("div",{className:"column"},E.a.createElement("div",{className:"field has-icons-left"},E.a.createElement(N.a,{iconName:"user-plus",iconClasses:"is-left"}),E.a.createElement("span",null,E.a.createElement(b.a,{userId:t})))),E.a.createElement("div",{className:"column"},E.a.createElement("p",{className:"control has-text-right"},E.a.createElement("a",{className:"button is-danger is-small",onClick:function(){return n(t)}},"Annuler")))))},q=function(e){var t=e.userId,n=e.remove;return E.a.createElement("div",{className:"box"},E.a.createElement("div",{className:"columns is-mobile"},E.a.createElement("div",{className:"column"},E.a.createElement("div",{className:"field has-icons-left"},E.a.createElement(N.a,{iconName:"user-friends",iconClasses:"is-left"}),E.a.createElement("span",null,E.a.createElement(b.a,{userId:t})))),E.a.createElement("div",{className:"column"},E.a.createElement("p",{className:"control has-text-right"},E.a.createElement("a",{className:"button is-danger is-small",onClick:function(){return n(t)}},"Supprimer")))))}},62:function(e,t,n){"use strict";n.d(t,"a",function(){return p});var s=n(5),a=n.n(s),r=n(6),i=n.n(r),c=n(7),l=n.n(c),u=n(8),o=n.n(u),d=n(9),m=n.n(d),f=n(0),h=n.n(f),v=n(19),E=n(15),N=n.n(E),p=function(e){function t(e){var n;return a()(this,t),(n=l()(this,o()(t).call(this,e))).state={user:null},n}return m()(t,e),i()(t,[{key:"componentDidMount",value:function(){var e=this;Object(v.n)(this.props.userId).then(function(t){t.ok&&e.setState({user:t.user})}).catch(console.log)}},{key:"render",value:function(){return h.a.createElement(h.a.Fragment,null,this.state.user&&this.state.user.username)}}]),t}(h.a.Component);p.propTypes={userId:N.a.number.isRequired}}}]);