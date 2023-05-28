<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$memberID = htmlspecialchars($data['memberID']);

$sql = "SELECT mc.MemberID, mc.CouponID, c.CouponCode, c.CouponName, c.Discount FROM memberCoupon mc 
	join coupon c 
    on c.ID = mc.CouponID
    where MemberID = ? and mc.IsUsed = 0";

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料


$statement = $pdo->prepare($sql);
$statement->bindParam(1, $memberID); //檢查 第一個問號
$statement->execute();


//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

//將二維陣列取出顯示其值
if(count($data) > 0){
 echo json_encode($data);
    
} else{
   echo '沒有coupon';
   }
       
?>