<?php

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

include('Mysql.php');

$Content1 = htmlspecialchars($data['Content1']);
$Content2 = htmlspecialchars($data['Content2']);
$Content3 = htmlspecialchars($data['Content3']);


//先新增Introduction table
$sql = "INSERT INTO productIntroduction(Content1, Content2, Content3) 
VALUES (?, ?, ?)";
     

//執行
$statement = $pdo->prepare($sql);
$statement->bindParam(1, $Content1);
$statement->bindParam(2, $Content2);
$statement->bindParam(3, $Content3);
$affectedRow = $statement->execute();

//新增introduction table完成後，要取得ID
if($affectedRow > 0){
    $lastInsertId = $pdo->lastInsertId(); //取得最後一個ID
       echo $lastInsertId;
}else{
       echo "fail";
}

?>