<?php

include('Mysql.php');
ini_set("display_errors", "On");

$ProductID = $_POST['ProductID'];

function getExtensionName($filePath){
       $path_parts = pathinfo($filePath);
       return $path_parts["extension"];
}

if($_FILES["Image1"]["error"] > 0 || $_FILES["Image2"]["error"] > 0 || $_FILES["Image3"]["error"] > 0 || $_FILES["Image4"]["error"] > 0){
              echo "上傳失敗: 錯誤代碼Image1: ".$_FILES["Image1"]["error"]." / 錯誤代碼Image2:".$_FILES["Image2"]["error"]." / 錯誤代碼Image3:".$_FILES["Image3"]["error"]." / 錯誤代碼Image4:".$_FILES["Image4"]["error"];
       }else{
       //取得上傳的檔案資訊=======================================
              $fileName1 = $_FILES["Image1"]["name"];    
              $filePath_Temp1 = $_FILES["Image1"]["tmp_name"];        
              $fileType1 = $_FILES["Image1"]["type"]; 
              $fileSize1 = $_FILES["Image1"]["size"];  

              $fileName2 = $_FILES["Image2"]["name"];    
              $filePath_Temp2 = $_FILES["Image2"]["tmp_name"];        
              $fileType2 = $_FILES["Image2"]["type"]; 
              $fileSize2 = $_FILES["Image2"]["size"];

              $fileName3 = $_FILES["Image3"]["name"];    
              $filePath_Temp3 = $_FILES["Image3"]["tmp_name"];        
              $fileType3 = $_FILES["Image3"]["type"]; 
              $fileSize3 = $_FILES["Image3"]["size"];

              $fileName4 = $_FILES["Image4"]["name"];    
              $filePath_Temp4 = $_FILES["Image4"]["tmp_name"];        
              $fileType4 = $_FILES["Image4"]["type"]; 
              $fileSize4 = $_FILES["Image4"]["size"];
       //=======================================================

       //Web根目錄真實路徑
              $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

              // $path = "../dist/image/productPage/".$ProductID."/"; // 放到server上使用
              $path = $ServerRoot."/Kanto/dist/image/productPage/".$ProductID."/"; //本機端的路徑
              if (!is_dir($path)) {
                     mkdir($path, 0777, true);
              }

              $filePath1 = $path.$fileName1;
              $filePath2 = $path.$fileName2;
              $filePath3 = $path.$fileName3;
              $filePath4 = $path.$fileName4;

              //重新命名檔案
              $newFileName1 = "detail_1.".getExtensionName($filePath1);
              $newFileName2 = "detail_2.".getExtensionName($filePath2);
              $newFileName3 = "detail_3.".getExtensionName($filePath3);
              $newFileName4 = "detail_4.".getExtensionName($filePath4);

              $newFilePath1 = $path.$newFileName1;
              $newFilePath2 = $path.$newFileName2;
              $newFilePath3 = $path.$newFileName3;
              $newFilePath4 = $path.$newFileName4;

              //將暫存檔搬移到正確位置
              move_uploaded_file($filePath_Temp1, $newFilePath1);
              move_uploaded_file($filePath_Temp2, $newFilePath2);
              move_uploaded_file($filePath_Temp3, $newFilePath3);
              move_uploaded_file($filePath_Temp4, $newFilePath4);

       } 

$data = array(
    array(
        'ProductID' => $_POST['ProductID'],
        'Times' => $_POST['Times1'],
        'ScheduleTitle' => $_POST['ScheduleTitle1'],
        'ContentTitle' => $_POST['ContentTitle1'],
        'Content' => $_POST['Content1'],
        'Image' => $newFileName1
    ),
    array(
        'ProductID' => $_POST['ProductID'],
        'Times' => $_POST['Times2'],
        'ScheduleTitle' => $_POST['ScheduleTitle2'],
        'ContentTitle' => $_POST['ContentTitle2'],
        'Content' => $_POST['Content2'],
        'Image' => $newFileName2
    ),
    array(
        'ProductID' => $_POST['ProductID'],
        'Times' => $_POST['Times3'],
        'ScheduleTitle' => $_POST['ScheduleTitle3'],
        'ContentTitle' => $_POST['ContentTitle3'],
        'Content' => $_POST['Content3'],
        'Image' => $newFileName3
    ),
    array(
        'ProductID' => $_POST['ProductID'],
        'Times' => $_POST['Times4'],
        'ScheduleTitle' => $_POST['ScheduleTitle4'],
        'ContentTitle' => $_POST['ContentTitle4'],
        'Content' => $_POST['Content4'],
        'Image' => $newFileName4
    )
);

$sql = "INSERT INTO productSchedule(ProductID, `Times`, ScheduleTitle, Content, ContentTitle, `Image`)
VALUES(?, ?, ?, ?, ?, ?)";
$statement = $pdo->prepare($sql);

foreach ($data as $row) {
    $statement->execute(array($row['ProductID'], $row['Times'], $row['ScheduleTitle'], $row['Content'], $row['ContentTitle'], $row['Image']));
}

$affectedRows = $statement->rowCount();

if($affectedRows > 0){
    echo "done";
}else{
    echo "fail";
    }

?>