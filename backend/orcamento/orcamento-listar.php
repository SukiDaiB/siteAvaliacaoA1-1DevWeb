<?php

include "../banco.php";

$sql = "SELECT * FROM aulas";
$qry = $conexao->prepare($sql);
$qry->execute();
$registros = $qry->fetchAll(PDO::FETCH_OBJ);
echo json_encode($registros);
