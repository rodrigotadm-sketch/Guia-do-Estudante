const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const norm=s=>(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
let DATA;
const A=(u,t)=>`<a class="link" href="${u}" target="_blank" rel="noopener">${t} →</a>`;
function render(d){
 DATA=d; $("#versao").textContent=`· ${d.meta.versao}`; $("#titulo").textContent=d.meta.titulo; $("#subtitulo").textContent=d.meta.descricao;
 $("#manual").innerHTML=`<div><span class="eyebrow">Documento institucional</span><h2>${d.manualUFPR.titulo}</h2><p>${d.manualUFPR.descricao}</p></div><a class="btn" href="${d.manualUFPR.url}" target="_blank" rel="noopener">${d.manualUFPR.rotuloBotao}</a>`;
 $("#acessos").innerHTML=d.acessosRapidos.map(x=>`<article class="card search-item" data-search="${norm([x.titulo,x.descricao,...x.tags].join(" "))}"><div class="icon">${x.icone}</div><h3>${x.titulo}</h3><p>${x.descricao}</p>${A(x.url,"Acessar")}</article>`).join("");
 $("#quero").innerHTML=d.quero.map(x=>`<article class="want search-item" data-search="${norm([x.titulo,x.texto,...x.tags].join(" "))}"><h3>${x.titulo}</h3><p>${x.texto}</p>${A(x.url,x.acao)}</article>`).join("");
 $("#jornada").innerHTML=d.jornada.map(x=>`<article class="step"><span class="step-num">${x.etapa}</span><h3>${x.titulo}</h3><p>${x.texto}</p></article>`).join("");
 const c=d.calouros; $("#calouros").innerHTML=`<span class="eyebrow">Para calouros</span><h2>${c.titulo}</h2><p>${c.texto}</p><div class="welcome-list">${c.itens.map(x=>`<a class="search-item" data-search="${norm(x.titulo)}" href="${x.url}" target="_blank" rel="noopener">${x.titulo} →</a>`).join("")}</div>`;
 $("#sistemas").innerHTML=d.sistemas.map(x=>`<article class="system search-item" data-search="${norm(x.titulo+" "+x.descricao)}"><div class="icon">${x.icone}</div><h3>${x.titulo}</h3><p>${x.descricao}</p>${A(x.url,"Abrir sistema")}</article>`).join("");
 $("#faq").innerHTML=d.faq.map(x=>`<details class="search-item" data-search="${norm(x.pergunta+" "+x.resposta)}"><summary>${x.pergunta}</summary><p>${x.resposta}</p></details>`).join("");
 const k=d.contato; $("#contato").innerHTML=`<span class="eyebrow" style="color:#c9ead8">Atendimento</span><h2>${k.titulo}</h2><div class="contact-grid"><div><strong>Endereço</strong><br>${k.endereco}</div><div><strong>Telefone</strong><br><a href="tel:+554133611744">${k.telefone}</a></div><div><strong>E-mail</strong><br><a href="mailto:${k.email}">${k.email}</a><br>${A(k.url,"Página de contato")}</div></div>`;
 bindSearch();
}
function bindSearch(){
 const input=$("#busca"), clear=$("#limpar"), status=$("#searchStatus");
 const run=()=>{const q=norm(input.value.trim()); let count=0; $$(".search-item").forEach(el=>{const ok=!q||el.dataset.search.includes(q); el.classList.toggle("hidden",!ok); if(ok&&q)count++});
 $$(".searchable-section").forEach(sec=>{const any=sec.querySelector(".search-item:not(.hidden)"); sec.classList.toggle("hidden",!!q&&!any)});
 status.textContent=q?`${count} resultado(s) relacionado(s) a “${input.value.trim()}”.`:"";};
 input.addEventListener("input",run); clear.onclick=()=>{input.value="";run();input.focus()};
}
fetch("dados.json").then(r=>r.json()).then(render).catch(()=>{$("#conteudo").insertAdjacentHTML("afterbegin",'<div class="no-results">Não foi possível carregar <strong>dados.json</strong>. Publique todos os arquivos na mesma pasta.</div>')});