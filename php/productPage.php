<?php

include('Mysql.php'); //資料庫連線

// 從 URL 的 id 參數中獲取 productId 值
$productId = $_GET['id'];

// 第一個查詢
$sql = "SELECT *
    FROM product
    JOIN productIntroduction ON product.IntroductionID = productIntroduction.ID
    JOIN region ON product.RegionID = region.ID 
    WHERE ProductID = :productId";

$statement = $pdo->prepare($sql);
$statement->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement->execute();
$data = $statement->fetchAll();

// 第二個查詢
$sql2 = "SELECT productSchedule.Times, productSchedule.ScheduleTitle, productSchedule.Content,productSchedule.Image,productSchedule.ContentTitle
    FROM product
    JOIN productIntroduction ON product.IntroductionID = productIntroduction.ID
    JOIN region ON product.RegionID = region.ID
    JOIN productSchedule ON product.ProductID = productSchedule.productID
    WHERE product.ProductID = :productId";

$statement2 = $pdo->prepare($sql2);
$statement2->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement2->execute();
$data2 = $statement2->fetchAll();

// 將兩個查詢組成陣列
$response = [
    'data1' => $data,
    'data2' => $data2
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;

?>