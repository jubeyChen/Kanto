<?php

include('Mysql.php'); //資料庫連線



// 從 URL 的 id 參數中獲取 productId 值
$productId = $_GET['id'];
header('Content-Type: application/json');


$sql = "SELECT * FROM product
JOIN region on region.ID = product.RegionID
JOIN productIntroduction on productIntroduction.ID = product.IntroductionID
JOIN productType ON product.ProductTypeID = productType.ID
WHERE product.ID = :productId";

$statement = $pdo->prepare($sql);
$statement->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement->execute();
$data = $statement->fetchAll();

//第二個搜尋 
// $sql2 = "SELECT * FROM blogBlock
// WHERE blogBlock.BlogID = :productId ";

// $statement2 = $pdo->prepare($sql2);
// $statement2->bindParam(':productId', $productId, PDO::PARAM_INT);
// $statement2->execute();
// $data2 = $statement2->fetchAll();




//第四個搜尋
$sql4 = "SELECT * FROM productSchedule
WHERE productSchedule.productID = :productId ";

$statement4 = $pdo->prepare($sql4);
$statement4->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement4->execute();
$data4 = $statement4->fetchAll();

$response = [
    'product' => $data,
    // 'blogBlock' => $data2,
    'productSchedule' => $data4
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;
?>