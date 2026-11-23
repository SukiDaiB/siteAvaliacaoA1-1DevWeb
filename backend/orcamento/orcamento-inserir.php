<?php

include "../banco.php";

// se a data desejada vier vazia, grava NULL (o MySQL não aceita data "")
$dataDesejada = $_POST["data_desejada"] ?: null;

$sql = "INSERT INTO solicitacoes_orcamento (nome, email, telefone, endereco, cidade, uf, data_desejada, observacoes, aulas, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$qry = $conexao->prepare($sql);
$qry->execute([$_POST["nome"], $_POST["email"], $_POST["telefone"], $_POST["endereco"], $_POST["cidade"], $_POST["uf"], $dataDesejada, $_POST["observacoes"], $_POST["aulas"], $_POST["total"]]);
echo json_encode(["id" => $conexao->lastInsertId()]);
