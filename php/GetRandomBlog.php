<?php

include('Mysql.php'); //資料庫連線

header('Content-Type: application/json');

$data = $_GET['randomNumbers'];

$id1 = htmlspecialchars($data[0]);
$id2 = htmlspecialchars($data[1]);
$id3 = htmlspecialchars($data[2]);

$sql = 'SELECT * FROM blog WHERE id = ? OR id = ? OR id = ?';

$statement = $pdo->prepare($sql);
$statement->execute([$id1, $id2, $id3]);

$data = $statement->fetchAll(); //data即是要回傳的資料
echo json_encode($data); //仍然要echo出來給前端接 json_encode轉換成json格式
// print_r ($data);

?>