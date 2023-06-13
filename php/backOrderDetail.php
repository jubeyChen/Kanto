<?php

include('Mysql.php'); //資料庫連線

header('Content-Type: application/json');

$orderId = $_GET['id'];

$sql = 'SELECT o.ID ID, m.FullName, o.Timestamp, d.ID ODID, p.Name, d.Quantity, p.Price, d.Quantity * p.Price Total, pd.OfferDate, d.IsCanceled FROM orders o
        join orderDetail d on o.ID = d.OrderID
        join members m on o.MemberID = m.ID
        join product p on d.ProductID = p.ID
        join productDetail pd on pd.ID = d.ProductdetailID
        where o.ID = :orderId;
        ';
// $sql = 'SELECT o.id, m.fullname, o.timestamp, d.id, p.name, d.quantity, p.price, d.quantity * p.price total, pd.offerdate, d.iscanceled FROM orders o
//         join orderDetail d on o.id = d.orderid
//         join members m on o.memberid = m.id
//         join product p on d.productid = p.id
//         join productdetail pd on pd.id = d.productdetailid
//         where o.id = :orderId;
//         ';

$statement = $pdo->prepare($sql);
$statement->bindParam(':orderId', $orderId);
$statement->execute();

$data = $statement->fetchAll(); //data即是要回傳的資料
echo json_encode($data); //仍然要echo出來給前端接 json_encode轉換成json格式
// print_r ($data);

?>