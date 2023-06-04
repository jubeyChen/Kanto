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

//取得檔案副檔名
function getExtensionName($filePath){
       $path_parts = pathinfo($filePath);
       return $path_parts["extension"];
}

//新增product table完成後，要取得ID 讓圖片可以儲存
if($affectedRow > 0){
    $productID = $pdo->lastInsertId(); //取得最後一個ID: productID
       echo $productID;
       //判斷照片是否上傳成功
       // if($_FILES["Banner1"]["error"] > 0 || $_FILES["Banner2"]["error"] > 0 || $_FILES["Banner3"]["error"] > 0){
       //        echo "上傳失敗: 錯誤代碼Banner1: ".$_FILES["Banner1"]["error"]." / 錯誤代碼Banner2:".$_FILES["Banner2"]["error"]." / 錯誤代碼Banner3:".$_FILES["Banner3"]["error"];
       // }else{
       //取得上傳的檔案資訊=======================================
              // $fileName1 = $_FILES["Banner1"]["name"];    
              // $filePath_Temp1 = $_FILES["Banner1"]["tmp_name"];        
              // $fileType1 = $_FILES["Banner1"]["type"]; 
              // $fileSize1 = $_FILES["Banner1"]["size"];  

              // $fileName2 = $_FILES["Banner2"]["name"];    
              // $filePath_Temp2 = $_FILES["Banner2"]["tmp_name"];        
              // $fileType2 = $_FILES["Banner2"]["type"]; 
              // $fileSize2 = $_FILES["Banner2"]["size"];

              // $fileName3 = $_FILES["Banner3"]["name"];    
              // $filePath_Temp3 = $_FILES["Banner3"]["tmp_name"];        
              // $fileType3 = $_FILES["Banner3"]["type"]; 
              // $fileSize3 = $_FILES["Banner3"]["size"];
       //=======================================================

       //Web根目錄真實路徑
              // $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

              // // $path = "../dist/image/productPage/".$productID."/"; // 放到server上使用
              // $path = $ServerRoot."/Kanto/dist/image/productPage/".$productID."/"; //本機端的路徑
              // if (!is_dir($path)) {
              //        mkdir($path, 0777, true);
              // }

              // $filePath1 = $path.$fileName1;
              // $filePath2 = $path.$fileName2;
              // $filePath3 = $path.$fileName3;

              //重新命名檔案
              // $newFileName1 = "banner1.".getExtensionName($filePath1);
              // $newFileName2 = "banner2.".getExtensionName($filePath2);
              // $newFileName3 = "banner3.".getExtensionName($filePath3);

              // $newFilePath1 = $path.$newFileName1;
              // $newFilePath2 = $path.$newFileName2;
              // $newFilePath3 = $path.$newFileName3;

              //將暫存檔搬移到正確位置
              // move_uploaded_file($filePath_Temp1, $newFilePath1);
              // move_uploaded_file($filePath_Temp2, $newFilePath2);
              // move_uploaded_file($filePath_Temp3, $newFilePath3);

              // $sql2 = "UPDATE product SET Banner1 = ?, Banner2 = ?, Banner3 = ? WHERE ID = ?";
              // $statement2 = $pdo->prepare($sql2);
              // $statement2->bindParam(1, $newFileName1);
              // $statement2->bindParam(2, $newFileName2);
              // $statement2->bindParam(3, $newFileName3);
              // $statement2->bindParam(4, $productID);
              // $affectedRow2 = $statement2->execute();

              // if($affectedRow2 > 0){
              //        echo "done";
              //  }else{
              //        echo "fail";
              //  }
       // }    

}else{
       echo "fail";
}

?>