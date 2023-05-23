<?php

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

include('Mysql.php');

$id = htmlspecialchars($data['registerID']);
$pw = htmlentities($data['registerPW']);


//建立SQL
$sql = "INSERT INTO members(AccountID, PWD) VALUES (:id, :pw)";
     

//執行
$statement = $pdo->prepare($sql);
$statement->bindValue(':id', $id);
$statement->bindValue(':pw', $pw);
$affectedRow = $statement->execute();


if($affectedRow > 0){
       echo "註冊成功";
}else{
       echo "新增失敗!";
}

?>