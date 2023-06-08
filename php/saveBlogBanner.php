<?php

include('Mysql.php');
ini_set("display_errors", "On");

$BlogID = $_POST['blogID'];


//取得檔案副檔名
function getExtensionName($filePath){
       $path_parts = pathinfo($filePath);
       return $path_parts["extension"];
}

if($_FILES["banner1"]["error"] > 0 || $_FILES["banner2"]["error"] > 0){
              echo "上傳失敗: 錯誤代碼Banner1: ".$_FILES["banner1"]["error"]." / 錯誤代碼Banner2:".$_FILES["banner2"]["error"];
       }else{
       //取得上傳的檔案資訊=======================================
              $fileName1 = $_FILES["banner1"]["name"];    
              $filePath_Temp1 = $_FILES["banner1"]["tmp_name"];        
              $fileType1 = $_FILES["banner1"]["type"]; 
              $fileSize1 = $_FILES["banner1"]["size"];  

              $fileName2 = $_FILES["banner2"]["name"];    
              $filePath_Temp2 = $_FILES["banner2"]["tmp_name"];        
              $fileType2 = $_FILES["banner2"]["type"]; 
              $fileSize2 = $_FILES["banner2"]["size"];

              
       //=======================================================

       //Web根目錄真實路徑
              $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

              // $path = "../dist/image/blog/".$BlogID."/"; // 放到server上使用
              $path = $ServerRoot."/Kanto/dist/image/blog/".$BlogID."/"; //本機端的路徑
              if (!is_dir($path)) {
                     mkdir($path, 0777, true);
              }

              $filePath1 = $path.$fileName1;
              $filePath2 = $path.$fileName2;
              

              //重新命名檔案
              $newFileName1 = "banner1.".getExtensionName($filePath1);
              $newFileName2 = "banner2.".getExtensionName($filePath2);
              

              $newFilePath1 = $path.$newFileName1;
              $newFilePath2 = $path.$newFileName2;
            

              //將暫存檔搬移到正確位置
              move_uploaded_file($filePath_Temp1, $newFilePath1);
              move_uploaded_file($filePath_Temp2, $newFilePath2);
             


              $sql = "UPDATE blog SET BannerPC = ?, Image1 = ? WHERE ID = ?";
              $statement = $pdo->prepare($sql);
              $statement->bindParam(1, $newFileName1);
              $statement->bindParam(2, $newFileName2);
              $statement->bindParam(3, $BlogID);
              $affectedRow = $statement->execute();

              if($affectedRow > 0){
                     echo "done";
               }else{
                     echo "fail";
               }
       } 


?>