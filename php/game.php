<?php

include('Mysql.php'); //資料庫連線

$sql = "SELECT g.ID, c.ID, c.CouponName, c.CouponCode, p.ID, p.Name, p.Content, p.P_image FROM game g
join coupon c on g.CouponID = c.ID
join product p on g.ProductID = p.ID";

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料


$statement = $pdo->prepare($sql);
$statement->execute();


//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

//將二維陣列取出顯示其值
if(count($data) > 0){
echo json_encode($data);
} else{
   echo 'noblog';
   }
       
?>