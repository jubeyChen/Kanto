<?php

include('Mysql.php'); //資料庫連線

$sql = 'SELECT * FROM mydb.coupon JOIN member;';

$statement = $pdo->prepare($sql);
$statement->execute();

$data = $statement->fetchAll(); //data即是要回傳的資料

echo json_encode($data); //仍然要echo出來給前端接 json_encode轉換成json格式
// print_r ($data);
if (!empty($data)) {
    echo json_encode($data);
  } else {
    echo json_encode([]);
  }

?>