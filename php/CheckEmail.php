<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$id = htmlspecialchars($data['registerID']);

//$sql = "SELECT * FROM member WHERE Account = :id and PWD = :pw"; //自訂義
$sql = "SELECT * FROM members WHERE AccountID = ? "; //用問號

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料

$statement = $pdo->prepare($sql);
$statement->bindParam(1, $id); //檢查 第一個問號
$statement->execute();


//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

//將二維陣列取出顯示其值
if(count($data) > 0){
echo 'isUsed';
} else{
   echo 'NotUsed';
   }
       
?>