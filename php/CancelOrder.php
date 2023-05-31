<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$orderDetailID = htmlspecialchars($data['orderDetailID']);

$sql = "UPDATE orderDetail SET IsCanceled = 1 WHERE ID = ?";


$statement = $pdo->prepare($sql);
$statement->bindParam(1, $orderDetailID); 
$affectedRow = $statement->execute();

if($affectedRow > 0){
              echo "done";
       }else{
              echo "fail";
       }

       
?>