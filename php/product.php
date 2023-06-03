<?php

include('Mysql.php'); //資料庫連線
ini_set("display_errors", "On");
// 第一個查詢 (所有product table的資料)
$sql = "SELECT * FROM product";


$statement = $pdo->prepare($sql);
$statement->execute();
$data = $statement->fetchAll();

// -----------------------------------------------------------------------------------------


// 第二個查詢 (時間的資料)
$sql2 = "SELECT * FROM productDetail";

$statement2 = $pdo->prepare($sql2);
$statement2->execute();
$data2 = $statement2->fetchAll();


// -------------------------------------------------------------------------------------------




// 將兩個查詢組成陣列

$response = [
    'product' => $data,
    'productdetail' => $data2,
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;
?>


