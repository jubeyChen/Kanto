<?php
include('Mysql.php'); //資料庫連線

// 第一個查詢 (所有product table的資料)
$sql3 = "SELECT ProductID, AVG(Star) AS AverageStar FROM  mydb.review GROUP BY ProductID;";

$statement3 = $pdo->prepare($sql3);
$statement3->execute();
$data3 = $statement3->fetchAll();

// var_dump($data);

// 將查詢組成陣列

$response = [
    'averageStar' => $data3,
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;
?>
