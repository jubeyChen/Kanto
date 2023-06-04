<?php

include('Mysql.php');
ini_set("display_errors", "On");

$ProductID = $_POST['ProductID'];
$OfferDates = json_decode($_POST['OfferDate'], true);;

$sql = "INSERT INTO productDetail(ProductID, OfferDate) VALUES(?, ?)";
    $statement = $pdo->prepare($sql);

foreach ($OfferDates as $date) {
    // 使用预处理语句插入数据
    $statement->execute([$ProductID, $date]);
}
$affectedRows = $statement->rowCount();

if($affectedRows > 0){
    echo "done";
}else{
    echo "fail";
    }


?>