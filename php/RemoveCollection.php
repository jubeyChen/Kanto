<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$memberID = htmlspecialchars($data['memberID']);
$productID = htmlspecialchars($data['productID']);


$sql = "DELETE FROM collection WHERE MemberID = ? AND ProductID = ?";


$statement = $pdo->prepare($sql);
$statement->bindParam(1, $memberID); 
$statement->bindParam(2, $productID); 
$affectedRow = $statement->execute();

if($affectedRow > 0){
              echo "done";
       }else{
              echo "fail";
       }

       
?>