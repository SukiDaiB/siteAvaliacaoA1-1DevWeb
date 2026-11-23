<?php

include "../banco.php";

$sql = "INSERT INTO depoimentos (nome, texto) VALUES (?, ?)";
$qry = $conexao->prepare($sql);
$qry->execute([$_POST["nome"], $_POST["texto"]]);
echo json_encode(["id" => $conexao->lastInsertId()]);
