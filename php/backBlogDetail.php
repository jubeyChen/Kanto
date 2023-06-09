<?php

include('Mysql.php'); //資料庫連線



// 從 URL 的 id 參數中獲取 productId 值
$blogId = $_GET['id'];
header('Content-Type: application/json');


$sql = "SELECT * FROM blog
JOIN region on region.ID = blog.RegionID
WHERE blog.ID = :blogId";

$statement = $pdo->prepare($sql);
$statement->bindParam(':blogId', $blogId, PDO::PARAM_INT);
$statement->execute();
$data = $statement->fetchAll();



//第四個搜尋
$sql4 = "SELECT * FROM blogBlock
WHERE blogBlock.BlogID = :blogId ";

$statement4 = $pdo->prepare($sql4);
$statement4->bindParam(':blogId', $blogId, PDO::PARAM_INT);
$statement4->execute();
$data4 = $statement4->fetchAll();

$response = [
    'Blog' => $data,
    'blogBlock' => $data4
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;
?>