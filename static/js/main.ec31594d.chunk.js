(this["webpackJsonpcommon-steam-games"]=this["webpackJsonpcommon-steam-games"]||[]).push([[0],{23:function(e){e.exports=JSON.parse('{"name":"common-steam-games","version":"0.1.0","private":true,"homepage":"http://aliebald.github.io/common-steam-games","subUrl":"/common-steam-games","dependencies":{"@testing-library/jest-dom":"^5.14.1","@testing-library/react":"^11.2.7","@testing-library/user-event":"^12.8.3","@types/jest":"^26.0.24","@types/node":"^12.20.33","@types/react":"^17.0.29","@types/react-dom":"^17.0.9","@types/react-router-dom":"^5.3.1","react":"^17.0.2","react-beautiful-dnd":"^13.1.0","react-dom":"^17.0.2","react-responsive":"^9.0.0-beta.4","react-router-dom":"^5.3.0","react-scripts":"4.0.3","socket.io-client":"^4.3.2","string-similarity":"^4.0.4","typescript":"^4.4.4","web-vitals":"^1.1.2"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","predeploy":"npm run build","deploy":"gh-pages -d build -m \\"Auto generated updates for GitHub Pages deployment\\""},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@types/react-beautiful-dnd":"^13.1.2","@types/string-similarity":"^4.0.0","gh-pages":"^3.2.3"}}')},45:function(e,t,n){},46:function(e,t,n){},56:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},69:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){},76:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},81:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var s=n(1),r=n.n(s),c=n(24),a=n.n(c),i=(n(56),n(3)),o=n(4),l=n(22),d=n(29),m=n.n(d),u=n(38),j=n(0);function b(e){var t,n=Object(s.useState)(null!==(t=e.steamId)&&void 0!==t?t:""),r=Object(i.a)(n,2),c=r[0],a=r[1],d=Object(o.g)(),b=function(){var t=Object(u.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),e.onSubmit(c),d.push("/matching");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(j.jsx)("div",{className:"user-forms",children:Object(j.jsxs)("div",{className:"create-session",children:[Object(j.jsx)("h2",{children:"Create a new Session"}),Object(j.jsxs)("form",{onSubmit:b,children:[Object(j.jsx)("label",{htmlFor:"createSessionSteamId",children:"Steam ID or Profile URL:"}),Object(j.jsxs)("div",{className:"steamId-input input-margin",children:[Object(j.jsx)("span",{className:"profile-url",children:"https://steamcommunity.com/id/"}),Object(j.jsx)("input",{type:"text",name:"steamId",id:"createSessionSteamId",onChange:function(e){a(e.target.value)},className:"d-table-cell",defaultValue:c,placeholder:"Steam ID or Profile URL",required:!0})]}),Object(j.jsx)("input",{type:"submit",value:"Create New Session",className:"btn"})]}),Object(j.jsxs)("p",{className:"t-center",children:["Or ",Object(j.jsx)(l.b,{to:"/join",children:"join a existing session"})]})]})})}var p=n(23);n(63);function h(){return Object(j.jsxs)("div",{className:"footer",children:[Object(j.jsx)("div",{className:"f-left",children:"This project is not affiliated with Valve or Steam"}),Object(j.jsxs)("div",{className:"f-right",children:[Object(j.jsx)("a",{className:"impressum",href:"https://aliebald.github.io/impressum/",target:"_blank",rel:"noopener noreferrer",title:"Impressum gem\xe4\xdf \xa7 5 TMG",children:"Impressum"}),Object(j.jsx)("div",{title:"Send me a mail",onClick:function(){return function(e){for(var t="",n=0;n<e.length;n++)e.charCodeAt(n)>122?(t+=String.fromCharCode(e.charCodeAt(n+1)-56561),n++):t+=e.charAt(n);window.open("mailto:"+t,"_self")}("\ud835\udd54\ud835\udd60\ud835\udd5f\ud835\udd65\ud835\udd52\ud835\udd54\ud835\udd65.\ud835\udd5d\ud835\udd5a\ud835\udd56\ud835\udd53\ud835\udd52\ud835\udd5d\ud835\udd55@\ud835\udd58\ud835\udd5e\ud835\udd52\ud835\udd5a\ud835\udd5d.\ud835\udd54\ud835\udd60\ud835\udd5e")},children:Object(j.jsx)("img",{src:"".concat(p.subUrl,"/email.svg"),alt:"contact",height:"20px",width:"20px",className:"contact"})}),Object(j.jsx)("a",{href:"https://github.com/aliebald/common-steam-games",target:"_blank",rel:"noopener noreferrer",title:"GitHub Repository",children:Object(j.jsx)("img",{src:"".concat(p.subUrl,"/github.svg"),alt:"github",height:"18px",width:"18px",className:"github"})})]})]})}function f(e){var t,n,r=Object(s.useState)(null!==(t=e.steamId)&&void 0!==t?t:""),c=Object(i.a)(r,2),a=c[0],d=c[1],b=Object(s.useState)(null!==(n=e.sessionId)&&void 0!==n?n:""),p=Object(i.a)(b,2),h=p[0],f=p[1],O=Object(o.g)(),v=function(){var t=Object(u.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),e.onSubmit(a,h),O.push("/matching");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(j.jsx)("div",{className:"user-forms",children:Object(j.jsxs)("div",{className:"join-session",children:[Object(j.jsx)("h2",{children:"Join a Session"}),Object(j.jsxs)("form",{className:"d-table",onSubmit:v,children:[Object(j.jsxs)("div",{className:"d-table-row",children:[Object(j.jsx)("label",{htmlFor:"joinSessionSteamId",className:"d-table-cell",children:"Steam ID or Profile URL:"}),Object(j.jsxs)("div",{className:"steamId-input input-margin",children:[Object(j.jsx)("span",{className:"profile-url",children:"https://steamcommunity.com/id/"}),Object(j.jsx)("input",{type:"text",name:"steamId",id:"joinSessionSteamId",onChange:function(e){d(e.target.value)},className:"d-table-cell",defaultValue:a,placeholder:"Steam ID or Profile URL",required:!0})]})]}),Object(j.jsxs)("div",{className:"d-table-row",children:[Object(j.jsx)("label",{htmlFor:"sessionId",className:"d-table-cell",children:"Session ID:\xa0"}),Object(j.jsx)("input",{type:"text",name:"sessionId",id:"sessionId",onChange:function(e){f(e.target.value)},className:"d-table-cell input-margin",defaultValue:h,placeholder:"Session ID",required:!0})]}),Object(j.jsxs)("div",{className:"d-table-row",children:[Object(j.jsx)("div",{className:"d-table-cell"}),Object(j.jsx)("div",{className:"d-table-cell",children:Object(j.jsx)("input",{type:"submit",value:"Join Session",className:"btn"})})]})]}),Object(j.jsxs)("p",{className:"t-center",children:["Or ",Object(j.jsx)(l.b,{to:"/",children:"create a new session"})]})]})})}n(64);function O(){return Object(j.jsxs)("div",{className:"unknown-page",children:[Object(j.jsx)("p",{children:"The page you are looking for was not found."}),Object(j.jsxs)("p",{children:["You can ",Object(j.jsx)(l.b,{to:"/create",children:"create a new session"})," or ",Object(j.jsx)(l.b,{to:"/join",children:"join an existing session"}),"."]})]})}var v=n(32),g=n(11),x=n(40),y=n(51);n(69);function N(e){var t,n=Object(s.useState)(!0),r=Object(i.a)(n,2),c=r[0],a=r[1],o=Object(s.useState)(!0),l=Object(i.a)(o,2),d=l[0],m=l[1],u=Object(s.useState)(void 0),b=Object(i.a)(u,2),p=b[0],h=b[1];return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("button",{type:"button",className:"collapsible",onClick:function(){if(p&&(clearTimeout(p),h(void 0)),c)m(!1);else{var e=setTimeout((function(){return m(!0)}),500);h(e)}a(!c)},title:e.title,children:[null!==(t=e.header)&&void 0!==t?t:"Open",Object(j.jsxs)("div",{className:c?"arrow-down":"arrow-up",children:[Object(j.jsx)("div",{className:"arrow-l"}),Object(j.jsx)("div",{className:"arrow-r"})]})]}),Object(j.jsx)("div",{className:"content ".concat(c?"content-collapsed":""),children:d?Object(j.jsx)(j.Fragment,{}):e.children})]})}var S=n(36),I=n(34);n(70);function w(e){var t=Object(s.useState)(!1),n=Object(i.a)(t,2),r=n[0],c=n[1];return r?Object(j.jsxs)("div",{className:"tooltip-wrapper",onMouseEnter:function(){return c(!0)},onMouseLeave:function(){return c(!1)},children:[Object(j.jsx)("div",{className:"tooltip-popup ".concat(e.position),children:e.tooltip}),e.children]}):Object(j.jsx)("div",{onMouseEnter:function(){return c(!0)},onMouseLeave:function(){return c(!1)},children:e.children})}function C(e){var t,n,s=e.danger?" danger":"";return Object(j.jsx)("button",{className:"btn".concat(s," ").concat(null!==(t=e.className)&&void 0!==t?t:""),onClick:e.onClick,title:e.title,children:null!==(n=e.children)&&void 0!==n?n:""})}n(71);function k(e){var t;return Object(j.jsxs)("div",{className:"user-card ".concat(null!==(t=e.className)&&void 0!==t?t:""),children:[Object(j.jsx)("a",{href:e.user.profileurl,target:"_blank",rel:"noopener noreferrer",title:"Steam profile",children:Object(j.jsx)("img",{src:e.user.avatarmedium,alt:"avatar",height:"64px",width:"64px"})}),Object(j.jsxs)("div",{className:"user-details",children:[Object(j.jsx)("h3",{children:e.user.personaname}),Object(j.jsx)("span",{className:"realname",children:e.user.realname}),Object(j.jsx)("br",{})]}),Object(j.jsx)(C,{onClick:function(){window.open("steam://friends/message/".concat(e.user.steamId))},children:"Chat"})]})}n(72);function _(e){var t,n,s=Math.round(100*(e.game.playtime_forever/60+Number.EPSILON))/100,r=e.game.playtime_2weeks?Math.round(100*(e.game.playtime_2weeks/60+Number.EPSILON))/100:0,c="weight"in e.game,a="";c?(a=function(e){var t=(Math.round(1e4*e)/100).toFixed(2);return"".concat(parseFloat(t),"%")}(e.game.weight),t="Average Playtime: ".concat(s,"h")):t=r>0?"Playtime: ".concat(s,"h / ").concat(r,"h"):"Playtime: ".concat(s,"h");var i,o,l=e.game.img_icon_url.length>0;return n=l?Object(j.jsx)("img",{src:(i=e.game.appid,o=e.game.img_icon_url,"https://media.steampowered.com/steamcommunity/public/images/apps/".concat(i,"/").concat(o,".jpg")),width:"32",height:"32",alt:"icon",loading:"lazy"}):Object(j.jsx)("div",{className:"no-icon",children:Object(j.jsx)("span",{children:"?"})}),Object(j.jsxs)("div",{className:"game",children:[Object(j.jsx)("a",{className:"img-link",href:L(e.game.appid),title:"".concat(e.game.name," steam page"),target:"_blank",rel:"noopener noreferrer",style:l?{}:{textDecoration:"none"},children:n}),Object(j.jsxs)("div",{className:c||e.isDnD?"game-info no-br":"game-info",children:[Object(j.jsx)("div",{className:"title",children:e.game.name}),Object(j.jsx)("div",{className:"playtime",children:t})]}),c?Object(j.jsxs)("div",{className:"match-info",children:[e.showOwners?Object(j.jsx)(D,{owners:e.game.owners,gameTitle:e.game.name}):Object(j.jsx)(j.Fragment,{}),Object(j.jsxs)("div",{className:"weight",children:["Match:\xa0",a]})]}):Object(j.jsx)(j.Fragment,{}),e.isDnD?Object(j.jsx)("div",{className:"dnd-icon",children:Object(j.jsx)("img",{src:"dnd_icon.svg",alt:"",width:"17",height:"32",className:e.DnDHighlight?"highlight":""})}):Object(j.jsx)(j.Fragment,{})]})}function D(e){return Object(j.jsx)(j.Fragment,{children:e.owners.map((function(e,t){return Object(j.jsx)(w,{position:"bottom-left",tooltip:Object(j.jsx)(k,{user:e}),children:Object(j.jsx)("img",{src:e.avatar,alt:"",height:"16px",width:"16px",className:"owner",loading:"lazy"})},t)}))})}function L(e){return"https://store.steampowered.com/app/".concat(e)}function E(e){return Object(j.jsx)(S.b,{draggableId:"".concat(e.game.appid),index:e.index,children:function(t){return Object(j.jsx)("div",Object(g.a)(Object(g.a)(Object(g.a)({ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{className:e.className,children:Object(j.jsx)(_,{game:e.game,isDnD:!0,DnDHighlight:e.DnDHighlight})}))}})}function G(e){var t,n,r,c,a=null!==(t=e.header)&&void 0!==t?t:"",i=Object(s.createRef)(),o=null!==(n=e.onlyCommonGames)&&void 0!==n&&n;if(Object(s.useEffect)((function(){if(e.gameSearch&&e.gameSearch.length>1&&i.current){var t=function(e){if(!i.current)return 0;for(var t=0,n=0;n<e;n++)t+=i.current.children[0].children[n].scrollHeight;return t}(function(t){var n={similarity:0,index:0,name:""};return e.games.forEach((function(s,r){if(!e.onlyCommonGames||e.commonAppIds.includes(s.appid)){var c=Object(I.compareTwoStrings)(s.name.toLowerCase(),t.toLowerCase());c>n.similarity&&(n={similarity:c,index:r,name:s.name})}})),console.log('Best match for game search ("'.concat(t,'"): ').concat(n.name,". Similarity: ").concat(n.similarity)),n.index}(e.gameSearch));i.current.scrollTo({top:t,behavior:"smooth"})}}),[i,e.games,e.gameSearch,e.commonAppIds,e.onlyCommonGames]),e.droppableId&&e.onDragEnd)return Object(j.jsx)("div",{className:"games-list ".concat(null!==(c=e.className)&&void 0!==c?c:""),children:Object(j.jsxs)(S.a,{onDragEnd:e.onDragEnd,children:[a,Object(j.jsx)("div",{className:"scroll-container",ref:i,children:Object(j.jsx)(S.c,{droppableId:e.droppableId,children:function(t){return Object(j.jsxs)("div",Object(g.a)(Object(g.a)({},t.droppableProps),{},{ref:t.innerRef,children:[Object(j.jsx)(T,{games:e.games,onlyCommonGames:o,commonAppIds:e.commonAppIds}),t.placeholder]}))}})})]})});var l=o?e.games.filter((function(t){return e.commonAppIds.includes(t.appid)})):e.games;return Object(j.jsxs)("div",{className:"games-list ".concat(null!==(r=e.className)&&void 0!==r?r:""),children:[a,Object(j.jsx)("div",{className:"scroll-container",children:l.map((function(e,t){return Object(j.jsx)(_,{game:e,showOwners:!o},t)}))})]})}var T=r.a.memo((function(e){var t=Object(s.useState)(!1),n=Object(i.a)(t,2),r=n[0],c=n[1];Object(s.useEffect)((function(){var e=setTimeout((function(){c(!0)}),1e3),t=setTimeout((function(){c(!1)}),6e3);return function(){clearTimeout(e),clearTimeout(t)}}),[]);var a=e.games.map((function(t,n){return!e.onlyCommonGames||e.commonAppIds.includes(t.appid)?Object(j.jsx)(E,{game:t,index:n,DnDHighlight:r},t.appid):Object(j.jsx)(E,{game:t,index:n,className:"d-none",DnDHighlight:r},t.appid)}));return Object(j.jsx)(j.Fragment,{children:a})}));n(73);function P(e){var t,n="".concat(window.location.origin).concat(p.subUrl,"/join?sessionId=").concat(encodeURIComponent(e.sessionId));return Object(j.jsxs)("div",{className:"invite-box ".concat(null!==(t=e.className)&&void 0!==t?t:""),children:[Object(j.jsx)("label",{children:"Invite your friends"}),Object(j.jsxs)("div",{className:"invite-row",children:[Object(j.jsx)("input",{className:"invite-input",type:"text",value:n,readOnly:!0,onFocus:function(e){e.target.select()},title:"Invite link. Click 'Copy Invite' to copy this link"}),Object(j.jsx)(C,{onClick:function(){navigator.clipboard.writeText(n)},title:"Copy invite link",children:"Copy\xa0Invite"}),Object(j.jsx)(C,{onClick:e.openFriendsList,title:"Open your friends list and create personalized invites. This allows your friends to directly join you without looking up their steamId.",children:"Open\xa0Friends\xa0List"})]})]})}n(74);function F(e){var t,n=e.center?" v-centered":"",s=Object(j.jsxs)("div",{className:"lds-roller".concat(n," ").concat(null!==(t=e.className)&&void 0!==t?t:""),children:[Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{})]});return e.center?Object(j.jsx)("div",{className:"flex-center",children:s}):s}n(75);function A(e){var t;return Object(j.jsxs)("form",{className:"search-bar-form ".concat(null!==(t=e.className)&&void 0!==t?t:""),onSubmit:function(t){t.preventDefault(),e.onChange(t.target[0].value)},children:[Object(j.jsx)("input",{type:"text",onChange:function(t){t.preventDefault(),e.onChange(t.target.value)},placeholder:e.placeholder,title:e.title}),Object(j.jsx)("button",{type:"reset",children:"\xd7"})]})}n(45);function R(e){var t,n="undefined"!==typeof e.onSearch&&"undefined"!==typeof e.onSortByTotal&&"undefined"!==typeof e.onSortByLastTwoWeeks,s=Object(j.jsxs)("div",{className:"sub-header",children:[Object(j.jsx)(A,{placeholder:"Search Game",onChange:function(t){"undefined"!==typeof e.onSearch&&e.onSearch(t)},title:"Search for a game in your games"}),Object(j.jsx)("span",{title:"Sorts your games according to your total playtime or playtime in the last two weeks",children:"Sort\xa0by:"}),Object(j.jsx)(C,{onClick:e.onSortByLastTwoWeeks,title:"Sorts your games according to your playtime in the last two weeks",children:"Last\xa02\xa0Weeks"}),Object(j.jsx)(C,{onClick:e.onSortByTotal,title:"Sorts your games according to your total playtime",children:"Total"})]});return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"user-header ".concat(n?"has-subheader":""," ").concat(null!==(t=e.className)&&void 0!==t?t:""),children:[Object(j.jsx)("a",{href:e.user.profileurl,target:"_blank",rel:"noopener noreferrer",title:"Steam profile",children:Object(j.jsx)("img",{src:e.user.avatarmedium,width:"45",height:"45",alt:"avatar"})}),Object(j.jsxs)("div",{className:"user-details",children:[Object(j.jsx)("h2",{children:e.title}),e.user.preferences?Object(j.jsxs)("div",{children:[e.user.preferences.length,"\xa0Games"]}):""]})]}),n?s:Object(j.jsx)(j.Fragment,{})]})}function U(e){var t;return Object(j.jsx)("div",{className:"group-header ".concat(null!==(t=e.className)&&void 0!==t?t:""),children:Object(j.jsxs)("div",{className:"group-details",children:[Object(j.jsx)("h2",{children:e.title}),Object(j.jsxs)("div",{children:[e.gamesCount,"\xa0",e.commonGames?"Common Games":"Games"]})]})})}n(76);function M(e){var t,n,s,r=e.friend,c=null!==(t=null!==(n=r.personaname)&&void 0!==n?n:r.realname)&&void 0!==t?t:"",a="".concat(window.location.origin).concat(p.subUrl,"/join?sessionId=").concat(encodeURIComponent(e.sessionId),"&steamId=").concat(e.friend.steamId);return Object(j.jsxs)("div",{className:"friend",children:[Object(j.jsxs)("div",{className:"friend-info",children:[Object(j.jsx)("a",{href:r.profileurl,target:"_blank",rel:"noopener noreferrer",title:"Steam profile",children:Object(j.jsx)("img",{src:r.avatarmedium,width:"45",height:"45",alt:"avatar"})}),Object(j.jsxs)("div",{className:"friend-personal",children:[Object(j.jsx)("div",{children:null!==(s=r.personaname)&&void 0!==s?s:""}),Object(j.jsx)("div",{children:r.realname?Object(j.jsxs)("span",{children:["(",Object(j.jsx)("em",{children:r.realname}),")"]}):""})]})]}),Object(j.jsxs)("div",{className:"buttons",children:[Object(j.jsx)(C,{onClick:function(){window.open("steam://friends/message/".concat(r.steamId))},title:"Opens the steam chat with ".concat(c,", if steam is installed."),children:"Steam\xa0Chat"}),Object(j.jsx)(C,{onClick:function(){navigator.clipboard.writeText(a)},title:"Copies a personalized invite for ".concat(c,". This allows ").concat(c," to join without entering a steamId"),children:"Copy\xa0Invite"})]})]})}n(77);function H(e){var t=Object(s.useState)([]),n=Object(i.a)(t,2),c=n[0],a=n[1],o=Object(s.useState)(""),l=Object(i.a)(o,2),d=l[0],m=l[1],u=Object(s.useState)([]),b=Object(i.a)(u,2),p=b[0],h=b[1],f=r.a.createRef();Object(s.useEffect)((function(){return e.socket.on("friendsList",(function(e){console.log("friendsList",e),a(e)})),e.socket.emit("getFriendsList"),function(){e.socket.removeAllListeners("friendslist")}}),[e.socket]),Object(s.useEffect)((function(){var t=function(t){return Object(j.jsx)(M,{friend:t,sessionId:e.sessionId},t.steamId)};d.length<2?h(c.map(t)):h(c.map((function(e){var t=Object(I.compareTwoStrings)(e.personaname,d);return e.realname&&(t+=Object(I.compareTwoStrings)(e.realname,d),t/=2),Object(g.a)(Object(g.a)({},e),{},{filterSimilarity:t})})).sort((function(e,t){return void 0===e.filterSimilarity||void 0===t.filterSimilarity?(console.warn("filterSimilarity is not defined"),0):t.filterSimilarity-e.filterSimilarity})).map(t))}),[d,c,e.sessionId]);return Object(j.jsxs)("div",{className:"friendslist",children:[Object(j.jsx)("div",{className:"blur-bg",onClick:e.closeFriendsList}),Object(j.jsxs)("div",{className:"friends",children:[Object(j.jsxs)("div",{className:"friendslist-header",children:[Object(j.jsx)(A,{className:"friend-search",onChange:function(e){m(e),f.current&&f.current.scrollTo({top:0,behavior:"smooth"})},placeholder:"Search Friends"}),Object(j.jsx)(C,{onClick:e.closeFriendsList,danger:!0,children:"\xa0Close\xa0Friends\xa0"})]}),Object(j.jsx)("div",{className:"list",ref:f,children:0===c.length?Object(j.jsx)(F,{center:!0}):p})]})]})}n(78);function B(e){var t=Object(j.jsxs)("div",{className:"switch",children:[Object(j.jsx)("input",{type:"checkbox",onChange:function(t){e.onChange(t.target.checked)},checked:e.checked}),Object(j.jsx)("span",{className:"slider"})]});return e.className?Object(j.jsx)("div",{className:e.className,children:t}):t}n(79);function J(e){return Object(j.jsx)("div",{className:"settings",children:Object(j.jsxs)("label",{children:["Only\xa0Common\xa0Games",Object(j.jsx)(B,{className:"padding-switch",onChange:function(t){var n=Object(g.a)({},e.settings);n.onlyCommonGames=t,e.setSettings(n)},checked:e.settings.onlyCommonGames})]})})}var q=n(35);n(80);function z(e){var t=Object(s.useState)(0),n=Object(i.a)(t,2),r=n[0],c=n[1];return Object(j.jsxs)("div",{className:e.className,children:[Object(j.jsx)("ul",{className:"tabs",children:e.titles.map((function(e,t){return Object(j.jsx)("li",{className:"tabs-item ".concat(r===t?" active":""),children:Object(j.jsx)(C,{onClick:function(){return c(t)},children:e})},t)}))}),e.children[r]]})}n(81);function V(e){var t=Object(q.useMediaQuery)({query:"(min-width: 1100px)"}),n=Object(q.useMediaQuery)({query:"(max-width: 450px)"})?e.minTitles:e.titles;return t?Object(j.jsx)("div",{className:"container",children:e.children}):Object(j.jsx)(z,{titles:n,className:"container-tabs",children:e.children})}var W=function(e,t,n){var s=Array.from(e),r=s.splice(t,1),c=Object(i.a)(r,1)[0];return s.splice(n,0,c),s},Y=function(e){var t,n=[],s=e.length,r=Object(v.a)(e);try{for(r.s();!(t=r.n()).done;){var c=t.value;if(c.preferences){var a,i=Object(v.a)(c.preferences);try{var o=function(){var e=a.value,t=n.findIndex((function(t){return t.appid===e.appid}));t>=0?n[t].owners++:n.push({appid:e.appid,owners:1})};for(i.s();!(a=i.n()).done;)o()}catch(l){i.e(l)}finally{i.f()}}else s--}}catch(l){r.e(l)}finally{r.f()}return n.filter((function(e){return e.owners>=s})).map((function(e){return e.appid}))},Q=function(e){var t,n=Object(s.useState)([]),r=Object(i.a)(n,2),c=r[0],a=r[1],l=Object(s.useState)({steamId:e.steamId}),d=Object(i.a)(l,2),m=d[0],u=d[1],b=Object(s.useState)([]),p=Object(i.a)(b,2),h=p[0],f=p[1],O=Object(s.useState)(""),v=Object(i.a)(O,2),S=v[0],I=v[1],w=Object(s.useState)(!1),C=Object(i.a)(w,2),k=C[0],_=C[1],D=Object(s.useState)(void 0),L=Object(i.a)(D,2),E=L[0],T=L[1],A=Object(s.useState)(!1),M=Object(i.a)(A,2),B=M[0],z=M[1],Q=Object(s.useState)({onlyCommonGames:!0}),K=Object(i.a)(Q,2),X=K[0],Z=K[1],$=Object(s.useState)([]),ee=Object(i.a)($,2),te=ee[0],ne=ee[1],se=Object(s.useState)(""),re=Object(i.a)(se,2),ce=re[0],ae=re[1],ie=Object(o.g)(),oe=Object(q.useMediaQuery)({query:"(min-width: 530px)"});Object(s.useEffect)((function(){ne(Y(c.concat(m)))}),[c,m]),Object(s.useEffect)((function(){E&&(E.removeAllListeners("error"),E.removeAllListeners("session"),E.removeAllListeners("userJoined"),E.removeAllListeners("userDisconnect"),E.removeAllListeners("updateSettings"),E.removeAllListeners("updatePreferences"),E.on("error",(function(t){var n=t;n.timeout=15e3,e.addError(n),550!==n.status?(E&&E.disconnect(),ie.replace("/create")):z(!1)})),E.on("session",(function(t){var n;if(console.log("Received session:",t),t)if(c.length>0)console.warn("Received session but already is part of a session");else{var s=t,r=null!==(n=s.you)&&void 0!==n?n:m.steamId,i=s.users.filter((function(e){return e.steamId!==r})),o=s.users.find((function(e){return e.steamId===r}));if(!o)return e.addError({status:400,msg:"Failed to connect to session. Did not find self."}),E&&E.disconnect(),void ie.replace("/create");sessionStorage.setItem("sessionId",s.sessionId),I(s.sessionId),u(o),a(i),s.settings&&Z(s.settings)}})),E.on("userJoined",(function(e){console.log("Received handleUserJoined:",e,"users:",c);var t=Object(x.a)(c);t.push(e),a(t)})),E.on("userDisconnect",(function(e){console.log("Received handleUserDisconnect:",e,"users:",c);var t=c.filter((function(t){return t.steamId!==e}));a(t)})),E.on("updateSettings",(function(e){console.log("Received settings:",e),Z(e)})),E.on("updatePreferences",(function(e){console.log("Received updatePreferences:",e);var t=e,n=Object(x.a)(c),s=n.findIndex((function(e){return e.steamId===t.steamId}));-1!==s?(console.log("Updating preferences for ".concat(n[s].personaname," (").concat(t.steamId,")"),s),n[s].preferences=t.preferences,a(n)):console.log("Tried to update preferences for ".concat(t.steamId," but did not find user"))})))}),[m.steamId,c,E,e,ie]),Object(s.useEffect)((function(){var t=function(e,t){var n;return n=t?{steamId:e,sessionId:t}:{steamId:e},Object(y.a)("https://common-steam-games.herokuapp.com/",{query:n,reconnectionAttempts:4})}(e.steamId,e.sessionId);return T(t),t.io.on("reconnect_failed",(function(){console.log("Failed to reconnect"),e.addError({status:500,msg:"Lost connection to server",timeout:15e3}),ie.push("/create")})),t.io.on("reconnect_attempt",(function(n){var s="Lost connection to server, attempting to reconnect. Attempt (".concat(n,"/").concat(t.io.reconnectionAttempts(),")");console.log(s),e.addError({status:500,msg:s,timeout:6e3})})),function(){console.log("#### disconnecting ###"),t&&t.disconnect()}}),[e.sessionId,e.steamId]),Object(s.useEffect)((function(){console.log("calculatePreferences");var e=X.onlyCommonGames?te:[];f(function(e,t){var n=new Map,s=t.length>0?t.length:Math.max.apply(Math,Object(x.a)(e.map((function(e){return e.preferences?e.preferences.length:0}))));e.forEach((function(r){r.preferences&&(t.length>0?r.preferences.filter((function(e){return t.includes(e.appid)})):r.preferences).forEach((function(t,c){var a,i,o=function(e,t){var n=(t-e)/t;return!isNaN(n)&&n>=0?n*n:0}(c,s-1);n.has(t.appid)?((a=n.get(t.appid)).weight+=o/e.length,a.playtime_forever+=t.playtime_forever/e.length,a.owners&&a.owners.push(r)):a={appid:t.appid,name:t.name,img_icon_url:t.img_icon_url,img_logo_url:t.img_logo_url,has_community_visible_stats:null!==(i=t.has_community_visible_stats)&&void 0!==i?i:void 0,playtime_2weeks:t.playtime_2weeks?t.playtime_2weeks/e.length:void 0,playtime_forever:t.playtime_forever/e.length,weight:o/e.length,owners:[r]};n.set(t.appid,a)}))}));var r=Array.from(n.values());return r.sort((function(e,t){return t.weight-e.weight})),r}(c.concat(m),e))}),[c,m,X.onlyCommonGames,te]),Object(s.useEffect)((function(){k&&m.preferences&&(E?(console.log("Sending preferences"),E.emit("updatePreferences",m.preferences),_(!1)):console.error("Socket is not defined"))}),[m.preferences,k]);var le=function(e){var t;t="total"===e?function(e,t){return t.playtime_forever-e.playtime_forever}:function(e,t){var n,s,r=null!==(n=e.playtime_2weeks)&&void 0!==n?n:0,c=null!==(s=t.playtime_2weeks)&&void 0!==s?s:0;return r===c?t.playtime_forever-e.playtime_forever:c-r};var n=Object(g.a)({},m);n.preferences&&(n.preferences=n.preferences.sort(t),u(n),_(!0))};return m.preferences?Object(j.jsxs)(j.Fragment,{children:[B&&E?Object(j.jsx)(H,{socket:E,sessionId:S,closeFriendsList:function(){return z(!1)}}):"",Object(j.jsxs)("header",{className:"app-header",children:[Object(j.jsx)("h1",{className:"title",children:oe?"Common Steam Games":"C.S.G."}),Object(j.jsx)(J,{settings:X,setSettings:function(e){E&&(console.log("Sending settings"),E.emit("updateSettings",e)),Z(e)}})]}),Object(j.jsxs)(V,{titles:["Your Preferences","Group Preferences","Peers Preferences"],minTitles:["You","Group","Peers"],children:[Object(j.jsx)(G,{games:null!==(t=m.preferences)&&void 0!==t?t:[],onlyCommonGames:X.onlyCommonGames,commonAppIds:te,onDragEnd:function(e){var t;if(e.destination){var n=Object(g.a)({},m);n.preferences=W(null!==(t=m.preferences)&&void 0!==t?t:[],e.source.index,e.destination.index),ce.length>0&&ae(""),u(n),_(!0)}},droppableId:"".concat(m.personaname,"'s Preferences"),gameSearch:ce,header:Object(j.jsx)(R,{title:"Your Preferences",user:m,onSearch:ae,onSortByTotal:function(){return le("total")},onSortByLastTwoWeeks:function(){return le("recent")}})}),Object(j.jsx)(G,{games:h,onlyCommonGames:X.onlyCommonGames,commonAppIds:te,header:Object(j.jsx)(U,{title:"Group Preferences",gamesCount:h.length,commonGames:X.onlyCommonGames})}),Object(j.jsxs)("div",{className:"peers",children:[Object(j.jsx)(P,{sessionId:S,className:"no-br-bottom",openFriendsList:function(){return z(!0)}}),c.map((function(e,t){var n,s;return Object(j.jsx)(N,{header:Object(j.jsx)(R,{title:"".concat(e.personaname,"'s preferences"),user:e,className:"no-br no-bg"}),title:"Show ".concat(null!==(n=e.personaname)&&void 0!==n?n:e.realname,"'s' preferences"),children:Object(j.jsx)(G,{games:null!==(s=e.preferences)&&void 0!==s?s:[],onlyCommonGames:X.onlyCommonGames,commonAppIds:te,className:"no-br-top"},t)},"".concat(t,"-").concat(e.steamId))}))]})]})]}):Object(j.jsx)(F,{className:"v-centered",center:!0})};n(46);function K(e){return Object(s.useEffect)((function(){var t,n=e.error.timeout;return n&&(t=setTimeout((function(){e.removeError()}),n)),function(){t&&clearTimeout(t)}}),[e]),Object(j.jsxs)("div",{className:"error-popup",children:[e.error.msg,Object(j.jsx)("div",{className:"error-close",onClick:e.removeError})]})}function X(e){var t=function(t){return function(){return e.setErrors(e.errors.filter((function(e){return e!==t})))}};return Object(j.jsx)("div",{className:"error-popup-list",children:Object(j.jsx)("div",{children:e.errors.map((function(e,n){return Object(j.jsx)(K,{removeError:t(e),error:e},n)}))})})}n(82);function Z(){var e=Object(s.useState)(function(){var e=new URLSearchParams(window.location.search).get("steamId");if(e){var t=decodeURIComponent(e);return sessionStorage.setItem("steamId",t),t}var n=sessionStorage.getItem("steamId");if(n)return n;return}()),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(s.useState)(function(){var e=new URLSearchParams(window.location.search).get("sessionId");if(e){var t=decodeURIComponent(e);return sessionStorage.setItem("sessionId",t),t}var n=sessionStorage.getItem("sessionId");if(n)return n;return}()),a=Object(i.a)(c,2),d=a[0],m=a[1],u=Object(s.useState)([]),v=Object(i.a)(u,2),g=v[0],x=v[1],y=n?Object(j.jsx)(Q,{steamId:n,sessionId:d,addError:function(e){x(g.concat(e))}}):Object(j.jsx)(o.a,{to:"/"});return Object(j.jsxs)("div",{className:"app",children:[Object(j.jsx)(X,{errors:g,setErrors:x}),Object(j.jsx)(l.a,{basename:p.subUrl,children:Object(j.jsxs)(o.d,{children:[Object(j.jsx)(o.b,{path:"/matching",exact:!0,children:y}),Object(j.jsx)(o.b,{path:"/join",exact:!0,children:$()?Object(j.jsx)(o.a,{to:"/matching",push:!0}):Object(j.jsx)(f,{onSubmit:function(e,t){sessionStorage.setItem("steamId",e),sessionStorage.setItem("sessionId",t),r(e),m(t)},sessionId:d,steamId:n})}),Object(j.jsx)(o.b,{path:"/create",exact:!0,children:Object(j.jsx)(b,{onSubmit:function(e){sessionStorage.setItem("steamId",e),sessionStorage.removeItem("sessionId"),r(e),m(void 0)},steamId:n})}),Object(j.jsx)(o.b,{path:"/",exact:!0,children:Object(j.jsx)(o.a,{to:"/create"})}),Object(j.jsx)(o.b,{path:"/",children:Object(j.jsx)(O,{})})]})}),Object(j.jsx)(h,{}),Object(j.jsx)("div",{className:"background"})]})}var $=function(){var e=new URLSearchParams(window.location.search);return e.has("steamId")&&e.has("sessionId")};a.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(Z,{})}),document.getElementById("root"))}},[[83,1,2]]]);
//# sourceMappingURL=main.ec31594d.chunk.js.map