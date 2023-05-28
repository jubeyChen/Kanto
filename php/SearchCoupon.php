<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$memberID = htmlspecialchars($data['memberID']);
$couponNum = htmlspecialchars($data['couponNum']);

$sql = "SELECT * FROM coupon WHERE CouponCode = ?"; 

$statement = $pdo->prepare($sql);
$statement->bindParam(1, $couponNum); 
$statement->execute();

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

//如果有這個序號
if(count($data) > 0){

foreach($data as $index => $row){
	       $couponID = $row["ID"];  //取得coupon的ID
       }

// 確認會員是否領過同一張優惠券
$sql2 = "SELECT * FROM memberCoupon WHERE MemberID = ? and CouponID = ?"; 
$statement2 = $pdo->prepare($sql2);
$statement2->bindParam(1, $memberID); 
$statement2->bindParam(2, $couponID); 
$statement2->execute();

$data2 = $statement2->fetchAll();

// 如果領到同一張
if(count($data2) > 0){
        echo 'alreadyhad'; //告訴前台會員已領過
} else{
    $sql3 = "INSERT INTO memberCoupon(MemberID, CouponID) VALUES (?, ?)";
    $statement3 = $pdo->prepare($sql3);
    $statement3->bindParam(1, $memberID); 
    $statement3->bindParam(2, $couponID); 
    $affectedRow = $statement3->execute();

    if($affectedRow > 0){
       echo 'add'; //沒有領過，加入memberCoupon的table，並告訴前台已加入
    }else{
       echo "addFail";
    }
}

} else{
   echo 'NONO'; //查無此優惠券
   }
       
?>