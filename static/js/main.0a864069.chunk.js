(this.webpackJsonpnhl=this.webpackJsonpnhl||[]).push([[0],{14:function(e,n,t){},15:function(e,n,t){},17:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(7),s=t.n(o),i=(t(14),t(1)),l=t(2),c=t(4),u=t(3),m=t(5),h=(t(15),t(16),t(8)),f={8479339:{name:"Patrik Laine"},8479344:{name:"Jesse Puljuj\xe4rvi"},8477493:{name:"Aleksander Barkov"},8478427:{name:"Sebastian Aho"},8476882:{name:"Teuvo Ter\xe4v\xe4inen"},8478420:{name:"Mikko Rantanen"},8469638:{name:"Jussi Jokinen"},8475798:{name:"Mikael Granlund"},8469459:{name:"Mikko Koivu"},8476469:{name:"Joel Armia"},8475287:{name:"Erik Haula"},8475820:{name:"Joonas Donskoi"},8470047:{name:"Valtteri Filppula"},8477476:{name:"Artturi Lehkonen"},8473463:{name:"Leo Komarov"},8477953:{name:"Kasperi Kapanen"},8475222:{name:"Sami Vatanen"},8474627:{name:"Jori Lehter\xe4"},8477499:{name:"Rasmus Ristolainen"},8476874:{name:"Olli M\xe4\xe4tt\xe4"},8476902:{name:"Esa Lindell"},8476440:{name:"Markus Granlund"},8478906:{name:"Markus Nutivaara"},8476447:{name:"Miikka Salom\xe4ki"},8478541:{name:"Markus H\xe4nnik\xe4inen"},8477945:{name:"Julius Honka"},8476336:{name:"Iiro Pakarinen"},8479290:{name:"Kalle Kossila"},8480164:{name:"Henrik Haapala"},8479511:{name:"Janne kuokkanen"},8471469:{name:"Pekka Rinne"},8471695:{name:"Tuukka Rask"},8477293:{name:"Antti Raanta"},8470140:{name:"Kari Lehtonen"},8477424:{name:"Juuse Saros"},8474550:{name:"Antti Niemi"},8476914:{name:"Joonas Korpisalo"},8474667:{name:"Harri S\xe4teri"},8476444:{name:"Christopher Gibson"},8480009:{name:"Eeli Tolvanen"},8479404:{name:"Henrik Borgstr\xf6m"},8478915:{name:"Sami Niku"},8480829:{name:"Jesperi Kotkaniemi"},8479976:{name:"Juuso v\xe4lim\xe4ki"},8480035:{name:"Henri Jokiharju"},8480036:{name:"Miro Heiskanen"},8478449:{name:"Roope Hintz"},8480965:{name:"Antti Suomela"},8480005:{name:"Kristian Vesalainen"},8475156:{name:"Mikko Koskinen"},8477996:{name:"Juho Lammikko"},8477357:{name:"Saku M\xe4enalanen"},8481572:{name:"Ville Heinola"},8481554:{name:"Kaapo Kakko"},8478039:{name:"Kaapo K\xe4hk\xf6nen"}};function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(t,!0).forEach((function(n){Object(h.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var v={FINAL:["6","7"]},g=Object.keys(f),y=new Date;y.setHours(0,0,0,0),y.setDate(y.getDate()-1);var k="stats"+y.getTime()+3,w={goals:0,assists:0,shootOutGoals:0},O=function(e){return e<10?"0"+e:""+e},b=function(){var e=function(e){return e.getFullYear()+"-"+O(e.getMonth()+1)+"-"+O(e.getDate())}(y);return fetch("https://statsapi.web.nhl.com/api/v1/schedule?date="+e).then((function(e){return 200!==e.status?Promise.reject():e.json()})).then((function(e){if(0===e.totalGames)return Promise.reject("No games today.");var n=e.dates[0].games,t=[],a=[],r=!0,o=!1,s=void 0;try{for(var i,l=n[Symbol.iterator]();!(r=(i=l.next()).done);r=!0){var c=i.value;v.FINAL.includes(c.status.statusCode)?t.push(c.gamePk):a.push(c.gamePk)}}catch(u){o=!0,s=u}finally{try{r||null==l.return||l.return()}finally{if(o)throw s}}return t.length>0?Promise.resolve({finished:t,unfinished:a}):Promise.reject("No finished games yet.")}),(function(e){return Promise.reject("Something went wrong.")}))},S=function(e,n,t){return e.hasOwnProperty(n)||(e[n]=p({},w)),e[n].star=t,e},j=function(e,n){return e.hasOwnProperty(n)||(e[n]=p({},w)),e[n].shootOutGoals++,e},E=function(e,n){for(var t=0,a=Object.keys(n);t<a.length;t++){var r=n[a[t]];if("G"===r.position.code&&e.hasOwnProperty(r.person.id)&&void 0!==e[r.person.id].star){var o=r.stats.goalieStats,s=o.saves,i=o.shots;s&&i&&(e[r.person.id]=p({},e[r.person.id],{goals:0,assists:0,saves:s,shots:i}))}else if(["C","L","R","D"].includes(r.position.code)){var l=r.stats.skaterStats,c=l.goals,u=l.assists;if(c||u){var m=e.hasOwnProperty(r.person.id)?e[r.person.id]:{};e[r.person.id]=p({},m,{goals:c,assists:u})}}}return e},P=function(e){return k+e.length},N=function(){var e=P([]);if(localStorage.getItem(e)){var n=JSON.parse(localStorage.getItem(e));return Promise.resolve(n)}var t=[];return b().then((function(e){t=e.unfinished;var n,a=P(t);return localStorage.getItem(a)?JSON.parse(localStorage.getItem(a)):(n=e.finished,new Promise((function(e,t){var a=0,r={},o=!0,s=!1,i=void 0;try{for(var l,c=n[Symbol.iterator]();!(o=(l=c.next()).done);o=!0){var u=l.value;fetch("https://statsapi.web.nhl.com/api/v1/game/[GAME_PK]/feed/live".replace(/\[GAME_PK\]/,u)).then((function(e){return e.json()})).then((function(t){a++;var o=t.liveData.decisions,s=o.firstStar,i=o.secondStar,l=o.thirdStar;s&&i&&l&&(r=S(r,s.id,1),r=S(r,i.id,2),r=S(r,l.id,3));var c=t.liveData.plays,u=!0,m=!1,h=void 0;try{for(var f,d=c.scoringPlays[Symbol.iterator]();!(u=(f=d.next()).done);u=!0){var p=f.value,v=c.allPlays[p];if("SHOOTOUT"===v.about.periodType&&"GOAL"===v.result.eventTypeId){var g=v.players.filter((function(e){return"Scorer"===e.playerType})).pop().player.id;j(r,g)}}}catch(O){m=!0,h=O}finally{try{u||null==d.return||d.return()}finally{if(m)throw h}}var y=t.liveData.boxscore.teams,k=y.away,w=y.home;r=E(r,k.players),r=E(r,w.players),a===n.length&&e(r)}),(function(e){t("Something went wrong.")}))}}catch(m){s=!0,i=m}finally{try{o||null==c.return||c.return()}finally{if(s)throw i}}}))).then((function(e){return function(e){var n=[],t=!0,a=!1,r=void 0;try{for(var o,s=g[Symbol.iterator]();!(t=(o=s.next()).done);t=!0){var i=o.value;e.hasOwnProperty(i)&&n.push(p({},e[i],{playerId:i}))}}catch(l){a=!0,r=l}finally{try{t||null==s.return||s.return()}finally{if(a)throw r}}return n}(e)})).then((function(e){return function(e){return e.sort((function(e,n){return e.star||n.star?(e.star?e.star:4)-(n.star?n.star:4):n.goals-e.goals!==0?n.goals-e.goals:n.assists-e.assists!==0?n.assists-e.assists:0}))}(e)})).then((function(e){return localStorage.setItem(a,JSON.stringify({stats:e,unfinishedGames:t})),{stats:e,unfinishedGames:t}}))}))},_=function(e){return"https://nhl.bamcontent.com/images/headshots/current/60x60/[PLAYER_ID]@2x.jpg".replace(/\[PLAYER_ID\]/,e)},J=function(e){return f[e]},K=function(e){function n(e){var t;return Object(i.a)(this,n),(t=Object(c.a)(this,Object(u.a)(n).call(this,e))).state={statsReady:!1,data:{stats:[],unfinishedGames:[]}},t}return Object(m.a)(n,e),Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;0===this.state.data.stats.length&&N().then((function(n){e.setState({statsReady:!0,data:n})})).catch((function(n){e.setState({statsReady:!0,message:n})}))}},{key:"render",value:function(){var e=this.state,n=e.statsReady,t=e.message,a=this.state.data,o=a.stats,s=a.unfinishedGames;return n?t?r.a.createElement("span",null,t):r.a.createElement("div",null,r.a.createElement("div",{className:"stats"},o.map((function(e){var n,t=e.playerId,a=e.goals,o=void 0===a?null:a,s=e.assists,i=void 0===s?null:s,l=e.shootOutGoals,c=void 0===l?null:l,u=e.saves,m=void 0===u?null:u,h=e.shots,f=void 0===h?null:h,d=e.star,p=void 0===d?null:d,v="";return o||i||c?v=r.a.createElement("div",{className:"card__points"+(c?" card__points--has-shootout-goals":"")},o+" + "+i,c&&r.a.createElement("span",{className:"card__shoot-out-goals",title:"Shootout goals"},"\xa0",r.a.createElement("span",null,"(+",c,")"))):m&&f&&(v=r.a.createElement("div",{className:"card__points"},m+" / "+f)),r.a.createElement("div",{key:t,className:"card-container"},r.a.createElement("a",{href:(n=J(t).name,"https://www.youtube.com/results?search_query=[QUERY]".replace(/\[QUERY\]/,n.replace(/\s/,"+"))),className:"player-link",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card__player"},r.a.createElement("img",{src:_(t),className:"card__headshot",alt:J(t).name,title:J(t).name})),v,p&&r.a.createElement("i",{className:"fa fa-star card__star",title:p},r.a.createElement("span",{className:"card__star-value"},p)))))}))),s.length>0&&r.a.createElement("span",null,s.length," games not finished yet.")):r.a.createElement("span",null,"Loading...")}}]),n}(a.Component),R=function(e){function n(){return Object(i.a)(this,n),Object(c.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(m.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"app"},r.a.createElement(K,null))}}]),n}(a.Component),D=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function L(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(r.a.createElement(R,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/nhl",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/nhl","/service-worker.js");D?(!function(e){fetch(e).then((function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):L(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):L(e)}))}}()},9:function(e,n,t){e.exports=t(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.0a864069.chunk.js.map