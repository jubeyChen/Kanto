<?php
//當使用者從後台click btn時 如果是on到off 後台就要回傳會員的"狀態"跟"ID"給資料庫

include('Mysql.php'); //資料庫連線

header('Content-Type: application/json');   // 確保 Content-Type 是 application/json

$data = json_decode(file_get_contents('php://input'), true);   // 解析 JSON 資料

// $itemStatus = $data['itemStatus'];
// function bool_to_str($val)
// {
//     if ($val === true) {
//         return 'true';
//     }
//     if ($val === false) {
//         return 'false';
//     }
//     return $val;
// }

$itemStatus = htmlspecialchars($data['itemStatus']);        //更新後的會員狀態
$itemId = htmlspecialchars($data['itemId']);                //更新狀態的會員ID


//查詢該會員的目前的會員狀態
$sql = "SELECT `Status` FROM members WHERE ID = ?";
$statement = $pdo->prepare($sql);
$statement->bindParam(1, $itemId);
$statement->execute(); 
$data = $statement->fetch();          //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料

$memberStatus = $data["Status"];       //會員的當前狀態

//更新該會員的會員狀態
$Sql2 = "UPDATE members SET `Status` = ? WHERE ID = ?";
$statement2 = $pdo->prepare($Sql2);
$statement2->bindParam(1, $itemStatus);
$statement2->bindParam(2, $itemId);

$affectedStatus = $statement2->execute();


// 如果更新成功   將狀態被關閉的會員留言刪除 回傳前端 讓前端alert
if ($affectedStatus) {
    if ($itemStatus == 0 && $memberStatus != 0) {                     
        // 將狀態關閉的會員的的留言从review資料表中删除
        $Sql3 = "DELETE FROM review WHERE memberID = ?";
        $statement3 = $pdo->prepare($Sql3);
        $statement3->bindParam(1, $itemId);
        $statement3->execute();
    }

    if($memberStatus === 0){
        echo "啟用";
    }else{
        echo "關閉";
    }

}else{
    echo 'error'; 
}

?>