const fotos = ["img/depoimento1.jpeg", "img/depoimento2.jpeg", "img/depoimento3.jpeg"];

function listarDepoimentos() {
  fetch("backend/depoimento/depoimento-listar.php")
    .then(resposta => resposta.json())
    .then(depoimentos => {
      const lista = document.getElementById("lista-depoimentos");
      lista.innerHTML = "";

      depoimentos.forEach((depoimento, i) => {
        const coluna = document.createElement("div");
        coluna.className = "col-md-6 col-lg";
        coluna.innerHTML = `
          <div class="testimonial text-center">
            <img class="rounded-circle" src="${fotos[i % fotos.length]}" alt="">
            <p class="mt-3 mb-1"></p>
            <strong></strong>
            <small class="d-block text-muted"></small>
          </div>`;
        // textContent evita que um depoimento com HTML quebre a página
        coluna.querySelector("p").textContent = depoimento.texto;
        coluna.querySelector("strong").textContent = depoimento.nome;
        coluna.querySelector("small").textContent = depoimento.data ? depoimento.data.split("-").reverse().join("/") : "";
        lista.appendChild(coluna);
      });
    })
    .catch(() => {
      document.getElementById("lista-depoimentos").textContent = "Não foi possível carregar os depoimentos.";
    });
}

document.getElementById("form-depoimento").addEventListener("submit", evento => {
  evento.preventDefault();
  const formulario = evento.target;

  fetch("backend/depoimento/depoimento-inserir.php", {
    method: "POST",
    body: new FormData(formulario)
  })
    .then(resposta => resposta.json())
    .then(() => {
      formulario.reset();
      listarDepoimentos();
      alert("Obrigado pelo seu depoimento!");
    })
    .catch(() => alert("Não foi possível enviar o depoimento. Tente novamente."));
});

listarDepoimentos();
