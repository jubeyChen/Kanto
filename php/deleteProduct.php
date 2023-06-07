<?php

include('Mysql.php'); // 資料庫連線
$productId = $_GET['id'];


$deletegame = "DELETE FROM game
WHERE ProductID = :productId";
$gamestatement = $pdo->prepare($deletegame);
$gamestatement->bindParam(':productId', $productId, PDO::PARAM_INT);
$gamestatement->execute();


$deleteproductSchedule = "DELETE FROM productSchedule
WHERE ProductID = :productId";
$productSchedulestatement = $pdo->prepare($deleteproductSchedule);
$productSchedulestatement->bindParam(':productId', $productId, PDO::PARAM_INT);
$productSchedulestatement->execute();



$deletereview = "DELETE FROM review
WHERE ProductID = :productId";
$reviewstatement = $pdo->prepare($deletereview);
$reviewstatement->bindParam(':productId', $productId, PDO::PARAM_INT);
$reviewstatement->execute();


$deleteOrderDetail = "DELETE FROM orderDetail
WHERE ProductID = :productId";
$OrderDetailstatement = $pdo->prepare($deleteOrderDetail);
$OrderDetailstatement->bindParam(':productId', $productId, PDO::PARAM_INT);
$OrderDetailstatement->execute();


$deleteproductDetail = "DELETE FROM productDetail
WHERE ProductID = :productId";
$productDetailstatement = $pdo->prepare($deleteproductDetail);
$productDetailstatement->bindParam(':productId', $productId, PDO::PARAM_INT);
$productDetailstatement->execute();



$collectionsql = "DELETE FROM collection
WHERE ProductID = :productId";

$statement = $pdo->prepare($collectionsql);
$statement->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement->execute();


$productsql2 = "DELETE FROM product
WHERE ID = :productId";

$statement2 = $pdo->prepare($productsql2);
$statement2->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement2->execute();

$productIntroductionsql3 = "DELETE FROM productIntroduction
WHERE ID = :productId";

$statement3 = $pdo->prepare($productIntroductionsql3);
$statement3->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement3->execute();

echo '刪除成功';

?>