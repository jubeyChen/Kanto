<?php

include('Mysql.php'); //資料庫連線

// 第一個查詢 (所有product table的資料)
$sql = "SELECT * FROM roomBlog";

$statement = $pdo->prepare($sql);
$statement->execute();
$data = $statement->fetchAll();

// var_dump($data);

// 將查詢組成陣列

$response = [
    'roomblog' => $data,
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;

?>