<?php

include('Mysql.php'); //資料庫連線

$sql = "SELECT *
FROM product
JOIN productIntroduction ON product.IntroductionID = productIntroduction.ID
JOIN region ON product.RegionID = region.ID 
WHERE ProductID = 2";


$statement = $pdo->prepare($sql);
$statement->execute();
$data = $statement->fetchAll();
// 将数据转换为 JSON
$jsonData = json_encode($data);

// 设置响应头，指定内容类型为 JSON
header('Content-Type: application/json');

echo $jsonData;
?>