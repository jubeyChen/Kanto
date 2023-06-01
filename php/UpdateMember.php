<?php
//當使用者從後台click btn時 如果是on到off 後台就要回傳會員的"狀態"跟"ID"給資料庫

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

// $itemStatus = $data['itemStatus'];
function bool_to_str($val)
{
    if ($val === true) {
        return 'true';
    }
 
    if ($val === false) {
        return 'false';
    }
 
    return $val;
}

// $itemStatus = bool_to_str($data['itemStatus']);
$itemStatus = htmlspecialchars($data['itemStatus']);
$itemId = htmlspecialchars($data['itemId']);
//echo $_POST['itemStatus'];
//echo $data['itemId'];


//更新該會員的會員狀態
$sql = "UPDATE members SET  `Status` = ? WHERE ID = ?";

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
$statement = $pdo->prepare($sql);
$statement->bindParam(1, $itemStatus); //檢查 第一個問號
$statement->bindParam(2, $itemId); //檢查 第一個問號
$affectedStatus = $statement->execute();

// 如果更新成功 查詢該會員目前狀態 回傳前端 讓前端alert
if($affectedStatus > 0){
    $sql2 = "SELECT `Status` From members WHERE ID = ?";
    $statement2 = $pdo->prepare($sql2);
    $statement2->bindParam(1, $itemId); //檢查 第一個問號
    $statement2->execute();
    $data2 = $statement2->fetchAll();
    foreach($data2 as $index => $row){
//     echo "狀態";
//     echo $row["Status"];  
    $a = $row["Status"];  
    }

    if($a == 0){
        echo "關閉";
    }else{
        echo "啟用";
    }

}else{
    echo 'error'; 
}
?>