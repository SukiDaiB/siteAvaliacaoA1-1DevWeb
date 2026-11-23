function formatarReal(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function aulasMarcadas() {
  return document.querySelectorAll("#lista-aulas input:checked");
}

function somarTotal() {
  let total = 0;
  aulasMarcadas().forEach(caixa => {
    total += Number(caixa.value);
  });
  return total;
}

function calcularTotal() {
  document.getElementById("total-orcamento").textContent = formatarReal(somarTotal());
}

function listarAulas() {
  fetch("backend/orcamento/orcamento-listar.php")
    .then(resposta => resposta.json())
    .then(aulas => {
      const lista = document.getElementById("lista-aulas");
      lista.innerHTML = "";

      aulas.forEach(aula => {
        const item = document.createElement("div");
        item.className = "form-check";
        item.innerHTML = `
          <input class="form-check-input" type="checkbox" id="aula-${aula.id}" value="${aula.valorAula}">
          <label class="form-check-label" for="aula-${aula.id}"></label>`;
        const caixa = item.querySelector("input");
        // já deixa marcada a aula da página atual (data-aula no formulário)
        caixa.checked = aula.id == document.getElementById("form-orcamento").dataset.aula;
        // guarda o nome da aula para enviar junto com a solicitação
        caixa.dataset.nome = aula.nome;
        caixa.addEventListener("change", calcularTotal);
        item.querySelector("label").textContent =
          aula.nome + (aula.horarios ? " ⬝ " + aula.horarios : "") + " ⬝ " + formatarReal(Number(aula.valorAula));
        lista.appendChild(item);
      });

      calcularTotal();
    })
    .catch(() => {
      document.getElementById("lista-aulas").textContent = "Não foi possível carregar as aulas.";
    });
}

document.getElementById("form-orcamento").addEventListener("submit", evento => {
  evento.preventDefault();
  const formulario = evento.target;

  if (aulasMarcadas().length == 0) {
    alert("Escolha pelo menos uma aula.");
    return;
  }

  const dados = new FormData(formulario);
  dados.append("aulas", Array.from(aulasMarcadas()).map(caixa => caixa.dataset.nome).join(", "));
  dados.append("total", somarTotal());

  fetch("backend/orcamento/orcamento-inserir.php", {
    method: "POST",
    body: dados
  })
    .then(resposta => resposta.json())
    .then(() => {
      formulario.reset();
      listarAulas();
      bootstrap.Modal.getInstance(document.getElementById("orcamento")).hide();
      alert("Solicitação enviada! Em breve entraremos em contato.");
    })
    .catch(() => alert("Não foi possível enviar a solicitação. Tente novamente."));
});

listarAulas();
