<?php

include('Mysql.php'); //資料庫連線

//建立SQL語法
$sql = "SELECT * FROM members";


//取得數據
$statement = $pdo->query($sql);


//轉成二維陣列
$data = $statement->fetchAll();
//回傳json
echo json_encode($data);
// print_r($data);
?>

