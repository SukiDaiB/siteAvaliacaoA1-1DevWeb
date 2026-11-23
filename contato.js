document.getElementById("form-contato").addEventListener("submit", evento => {
  evento.preventDefault();
  const formulario = evento.target;

  fetch("backend/contato/contato-inserir.php", {
    method: "POST",
    body: new FormData(formulario)
  })
    .then(resposta => resposta.json())
    .then(() => {
      formulario.reset();
      alert("Mensagem enviada! Em breve entraremos em contato.");
    })
    .catch(() => alert("Não foi possível enviar a mensagem. Tente novamente."));
});
