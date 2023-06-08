<?php

include('Mysql.php'); //資料庫連線

header('Content-Type: application/json');

$sql = 'SELECT o.ID, m.FullName, o.Timestamp, SUM(d.Quantity * p.Price) Total, SUM(d.Quantity) Quantity FROM orders o
        join orderDetail d on o.ID = d.OrderID
        join members m on o.MemberID = m.ID
        join product p on d.ProductID = p.ID
        group by o.ID
        ';
// $sql = 'SELECT o.id, m.fullname, o.timestamp, SUM(d.quantity*p.price) total, SUM(d.quantity) quantity FROM orders o
//         join orderDetail d on o.id = d.orderid
//         join members m on o.memberid = m.id
//         join product p on d.productid = p.id
//         group by o.id
//         ';

$statement = $pdo->prepare($sql);
// $statement->bindParam(':blogId', $blogId);
$statement->execute();

$data = $statement->fetchAll(); //data即是要回傳的資料
echo json_encode($data); //仍然要echo出來給前端接 json_encode轉換成json格式
// print_r ($data);

?>