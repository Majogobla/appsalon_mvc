let step=1;const firstStep=1,lastStep=3,date={id:"",name:"",day:"",time:"",services:[]};function startApp(){showSection(),tabs(),indexingButtons(),nextPageButton(),previousPageButton(),readAPI(),clientId(),clientName(),clientDay(),clientHour(),showAbstract()}function showSection(){const e=document.querySelector(".show");e&&e.classList.remove("show");const t=document.querySelector(".current");t&&t.classList.remove("current");document.querySelector("#step-"+step).classList.add("show");document.querySelector(`[data-step="${step}"]`).classList.add("current")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){step=parseInt(e.target.dataset.step),showSection(),indexingButtons(),3===step&&showAbstract()}))})}function indexingButtons(){const e=document.querySelector("#next"),t=document.querySelector("#previous");1===step?(t.classList.add("hide"),e.classList.remove("hide")):3===step?(t.classList.remove("hide"),e.classList.add("hide"),showAbstract()):(t.classList.remove("hide"),e.classList.remove("hide")),showSection()}function previousPageButton(){document.querySelector("#previous").addEventListener("click",(function(){step<=1||(step--,indexingButtons())}))}function nextPageButton(){document.querySelector("#next").addEventListener("click",(function(){step>=3||(step++,indexingButtons())}))}async function readAPI(){try{const e="http://localhost:3000/api/services",t=await fetch(e);showServices(await t.json())}catch(e){console.log(e)}}function showServices(e){e.forEach(e=>{const{id:t,name:n,price:c}=e,a=document.createElement("P");a.classList.add("name-service"),a.textContent=n;const s=document.createElement("P");s.classList.add("price-service"),s.textContent="$"+c;const o=document.createElement("DIV");o.classList.add("service"),o.dataset.idService=t,o.onclick=function(){selectService(e)},o.appendChild(a),o.appendChild(s),document.querySelector("#services").appendChild(o)})}function selectService(e){const{id:t}=e,{services:n}=date,c=document.querySelector(`[data-id-service="${t}"]`);n.some(e=>e.id===t)?(date.services=n.filter(e=>e.id!==t),c.classList.remove("selected")):(date.services=[...n,e],c.classList.add("selected"))}function clientId(){date.id=document.querySelector("#id").value}function clientName(){date.name=document.querySelector("#name").value}function clientDay(){const e=document.querySelector("#date");e.addEventListener("input",(function(t){const n=new Date(t.target.value).getUTCDay();[6,0].includes(n)?(t.target.value="",showAlert("Fines de semana no ofrecemos servicios","error","#step-2 p")):date.day=e.value}))}function clientHour(){document.querySelector("#time").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<9||t>18?(showAlert("Hora no Válida","error","#step-2 p"),e.target.value=""):date.time=e.target.value}))}function showAlert(e,t,n,c=!0){const a=document.querySelector(".alert");a&&a.remove();const s=document.createElement("DIV");s.textContent=e,s.classList.add("alert"),s.classList.add(t);document.querySelector(n).appendChild(s),c&&setTimeout(()=>{s.remove()},5e3)}function showAbstract(){const e=document.querySelector(".content-abstract");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(date).includes("")||date.services.length<=0)return void showAlert("Faltan datos para crear su cita","error",".content-abstract",!1);const{name:t,day:n,time:c,services:a}=date,s=document.createElement("P");s.innerHTML="<span>Nombre:</span> "+t;const o=new Date(n),i=o.getMonth(),r=o.getDay()+2,d=o.getFullYear(),l=new Date(Date.UTC(d,i,r)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),u=document.createElement("P");u.innerHTML="<span>Fecha:</span> "+l;const m=document.createElement("P");m.innerHTML="<span>Hora:</span> "+c;const p=document.createElement("H3");p.textContent="Resumen de tu cita",e.appendChild(p),e.appendChild(s),e.appendChild(u),e.appendChild(m);const h=document.createElement("H3");h.textContent="Resumen de servicios",e.appendChild(h),a.forEach(t=>{const{id:n,name:c,price:a}=t,s=document.createElement("DIV");s.classList.add("service-container");const o=document.createElement("P");o.textContent=c;const i=document.createElement("P");i.innerHTML="<span>Price: </span> $"+a,s.appendChild(o),s.appendChild(i),e.appendChild(s)});const v=document.createElement("BUTTON");v.classList.add("button"),v.classList.add("book"),v.textContent="Reservar Cita",v.onclick=bookDate,e.appendChild(v)}async function bookDate(){const{name:e,day:t,time:n,services:c,id:a}=date,s=c.map(e=>e.id),o=new FormData;o.append("userId",a),o.append("date",t),o.append("time",n),o.append("services",s);try{const e="http://localhost:3000/api/dates",t=await fetch(e,{method:"POST",body:o});(await t.json()).result&&Swal.fire({icon:"success",title:"Cita Creada...",text:"Tu Cita fue creada correctamente",confirmButtonText:"OK"}).then(()=>{setTimeout(()=>{window.location.reload()},1e3)})}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un error al guardar la cita"})}}document.addEventListener("DOMContentLoaded",(function(){startApp()}));