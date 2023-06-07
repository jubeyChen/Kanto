<?php

include('Mysql.php');
ini_set("display_errors", "On");

$Name = $_POST['Name'];
$Content = $_POST['Content'];
$IntroductionID = $_POST['IntroductionID'];
$Price = $_POST['Price'];
$Banner1 = null;
$Banner2 = null;
$Banner3 = null;
$ProductType = $_POST['ProductType'];
$RegionID = $_POST['RegionID'];
$Image1 = null;
$Image2 = null;
$Image3 = null;
$Image4 = null;


//先新增Introduction table
$sql = "INSERT INTO product(`Name`, Content, IntroductionID, Price, Banner1, Banner2, Banner3, ProductTypeID, RegionID, Image1, Image2, Image3, Image4) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
     

//執行
$statement = $pdo->prepare($sql);
$statement->bindParam(1, $Name);
$statement->bindParam(2, $Content);
$statement->bindParam(3, $IntroductionID);
$statement->bindParam(4, $Price);
$statement->bindParam(5, $Banner1);
$statement->bindParam(6, $Banner2);
$statement->bindParam(7, $Banner3);
$statement->bindParam(8, $ProductType);
$statement->bindParam(9, $RegionID);
$statement->bindParam(10, $Image1);
$statement->bindParam(11, $Image2);
$statement->bindParam(12, $Image3);
$statement->bindParam(13, $Image4);
$affectedRow = $statement->execute();


//新增product table完成後，要取得ID 讓圖片可以儲存
if($affectedRow > 0){
    $productID = $pdo->lastInsertId(); //取得最後一個ID: productID
       echo $productID;
}else{
       echo "fail";
}

?>