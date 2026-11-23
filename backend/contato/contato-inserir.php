<?php

include "../banco.php";

$sql = "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)";
$qry = $conexao->prepare($sql);
$qry->execute([$_POST["nome"], $_POST["email"], $_POST["mensagem"]]);
echo json_encode(["id" => $conexao->lastInsertId()]);
