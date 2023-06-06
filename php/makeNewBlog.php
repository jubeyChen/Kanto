<?php

include('Mysql.php');
ini_set("display_errors", "On");


$Name = $data['name'];
$Intro = $data['intro'];
$Banner1 = $data['banner1'];
$Banner2 = $data['banner2'];
$Region = $data['region'];
$BlogImage1 = $data['blogImage1'];
$BlogTime1 = $data['blogTime1'];
$BlogTitle1 = $data['blogTitle1'];
$BlogDescription1 = $data['blogDescription1'];
$BlogImage2 = $data['blogImage2'];
$BlogTime2 = $data['blogTime2'];
$BlogTitle2 = $data['blogTitle2'];
$BlogDescription2 = $data['blogDescription2'];
$BlogImage3 = $data['blogImage3'];
$BlogTime3 = $data['blogTime3'];
$BlogTitle3 = $data['blogTitle3'];
$BlogDescription3 = $data['blogDescription3'];
$BlogImage4 = $data['blogImage4'];
$BlogTime4 = $data['blogTime4'];
$BlogTitle4 = $data['blogTitle4'];
$BlogDescription4 = $data['blogDescription4'];



//先新增Introduction table
// $sql = "INSERT INTO blog(`Name`, Content, IntroductionID, Price, Banner1, Banner2, Banner3, ProductTypeID, RegionID, Image1, Image2, Image3, Image4) 
// VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
     
$sql = "INSERT INTO blog( Title, Content, BannerPC, RegionID, Image1) 
VALUES (?, ?, ?, ?, ?);";


//執行
$statement = $pdo->prepare($sql);
$statement->bindParam(1, $Name);
$statement->bindParam(2, $Intro);
$statement->bindParam(3, $Banner1);
$statement->bindParam(4, $Region);
$statement->bindParam(5, $Banner2);
$affectedRow = $statement->execute();

//取得檔案副檔名
function getExtensionName($filePath){
       $path_parts = pathinfo($filePath);
       return $path_parts["extension"];
}

//新增product table完成後，要取得ID 讓圖片可以儲存
if($affectedRow > 0){
    $blogID = $pdo->lastInsertId(); //取得最後一個ID: productID
       echo $blogID;
          

}else{
       echo "fail";
}

?>