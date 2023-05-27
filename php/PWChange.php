<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$AccountID = htmlspecialchars($data['AccountID']);
$currentPW = htmlspecialchars($data['currentPW']);
$newPW = htmlspecialchars($data['newPW']);

$sql = "SELECT * FROM members WHERE AccountID = ? and PWD = ?";

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料


$statement = $pdo->prepare($sql);
$statement->bindParam(1, $AccountID); 
$statement->bindParam(2, $currentPW); 
$statement->execute();

$data = $statement->fetchAll();


if(count($data) > 0){
$sql2 = "UPDATE members SET PWD = ? WHERE AccountID = ?";

$statement2 = $pdo->prepare($sql2);
$statement2->bindParam(1, $newPW); 
$statement2->bindParam(2, $AccountID); 
$affectedRow = $statement2->execute();

if($affectedRow > 0){
              echo "done";
       }else{
              echo "fail";
       }

} else{
   echo 'wrong';
   }
       
?>