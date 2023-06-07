<?php

include('Mysql.php');
ini_set("display_errors", "On");

$blogID = $_POST['blogID'];

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
              $path = $ServerRoot."/Kanto/dist/image/blogPage/".$blogID."/"; //本機端的路徑
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
        'BlogID' => $_POST['blogID'],
        'Times' => $_POST['blogTime1'],
        'TimeTitle' => $_POST['blogTitle1'],
        'Content' => $_POST['blogDescription1'],
        'Image' => $newFileName1
    ),
    array(
        'BlogID' => $_POST['blogID'],
        'Times' => $_POST['blogTime2'],
        'TimeTitle' => $_POST['blogTitle2'],
        'Content' => $_POST['blogDescription2'],
        'Image' => $newFileName2
    ),
    array(
        'BlogID' => $_POST['blogID'],
        'Times' => $_POST['blogTime3'],
        'TimeTitle' => $_POST['blogTitle3'],
        'Content' => $_POST['blogDescription3'],
        'Image' => $newFileName3
    ),
    array(
        'BlogID' => $_POST['blogID'],
        'Times' => $_POST['blogTime4'],
        'TimeTitle' => $_POST['blogTitle4'],
        'Content' => $_POST['blogDescription4'],
        'Image' => $newFileName4
    )
);

$sql = "INSERT INTO blogBlock(BlogID, Content, `Image`, `Times`, TimeTitle)
VALUES(?, ?, ?, ?, ?)";
$statement = $pdo->prepare($sql);

foreach ($data as $row) {
    $statement->execute(array($row['BlogID'], $row['Content'], $row['Image'], $row['Times'], $row['TimeTitle']));
}

$affectedRows = $statement->rowCount();

if($affectedRows > 0){
    echo "done";
}else{
    echo "fail";
    }

?>