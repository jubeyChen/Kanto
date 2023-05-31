<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$id = htmlspecialchars($data['user']);

$sql = "SELECT od.ID as OrderNumber, pd.OfferDate, p.ID as ProductID, p.Name, p.Banner1, p.Price,od.IsCanceled FROM orders o
	join members m on o.MemberID = m.ID
    join orderDetail od on o.ID = od.OrderID
    join product p on p.ID = od.ProductID
    join productDetail pd on pd.ID = od.productDetailID
    where m.AccountID = ? and od.IsCanceled =0";

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料


$statement = $pdo->prepare($sql);
$statement->bindParam(1, $id); //檢查 第一個問號
$statement->execute();


//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

//將二維陣列取出顯示其值
if(count($data) > 0){
echo json_encode($data);
} else{
   echo 'no order';
   }
       
?>