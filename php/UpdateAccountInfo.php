<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$AccountID = htmlspecialchars($data['AccountID']);
$FullName = htmlspecialchars($data['FullName']);
$Gender = htmlspecialchars($data['Gender']);
$Phone = htmlspecialchars($data['Phone']);

// $sql = "SELECT AccountID, FullName, Gender, Phone, Avatar FROM members WHERE AccountID = ?";
$sql = "UPDATE members SET FullName = ?, Gender = ?, Phone = ? WHERE AccountID = ?";;

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料


$statement = $pdo->prepare($sql);
$statement->bindParam(1, $FullName); //檢查 第一個問號
$statement->bindParam(2, $Gender); //檢查 第一個問號
$statement->bindParam(3, $Phone); //檢查 第一個問號
$statement->bindParam(4, $AccountID); //檢查 第一個問號
$affectedRow = $statement->execute();

if($affectedRow > 0){
              echo "done";
       }else{
              echo "fail";
       }
       
?>