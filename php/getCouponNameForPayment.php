<?php

include('Mysql.php'); //資料庫連線

session_start();

$id = $_SESSION['memberID'];

$sql = 'SELECT memberCoupon.MemberID, memberCoupon.CouponID, coupon.CouponName, members.AccountID, coupon.Discount
FROM memberCoupon
JOIN coupon ON coupon.ID = memberCoupon.CouponID
JOIN members ON members.ID = memberCoupon.MemberID where AccountID = ?';


//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料

$statement = $pdo->prepare($sql);
$statement->bindParam(1, $id); //檢查 第一個問號
$statement->execute();

$data = $statement->fetchAll(PDO::FETCH_ASSOC); // Use PDO::FETCH_ASSOC to fetch data as an associative array

if (!empty($data)) {
  echo json_encode($data);
} else {
  echo json_encode([]);
}

?>
