<?php

include('Mysql.php');
ini_set("display_errors", "On");

$BlogID = $_POST['blogID'];

function getExtensionName($filePath){
       $path_parts = pathinfo($filePath);
       return $path_parts["extension"];
}

if($_FILES["blogImg1"]["error"] > 0 || $_FILES["blogImg2"]["error"] > 0 || $_FILES["blogImg3"]["error"] > 0 || $_FILES["blogImg4"]["error"] > 0){
              echo "上傳失敗: 錯誤代碼Image1: ".$_FILES["blogImg1"]["error"]." / 錯誤代碼Image2:".$_FILES["blogImg2"]["error"]." / 錯誤代碼Image3:".$_FILES["blogImg3"]["error"]." / 錯誤代碼Image4:".$_FILES["blogImg4"]["error"];
       }else{
       //取得上傳的檔案資訊=======================================
              $fileName1 = $_FILES["blogImg1"]["name"];    
              $filePath_Temp1 = $_FILES["blogImg1"]["tmp_name"];        
              $fileType1 = $_FILES["blogImg1"]["type"]; 
              $fileSize1 = $_FILES["blogImg1"]["size"];  

              $fileName2 = $_FILES["blogImg2"]["name"];    
              $filePath_Temp2 = $_FILES["blogImg2"]["tmp_name"];        
              $fileType2 = $_FILES["blogImg2"]["type"]; 
              $fileSize2 = $_FILES["blogImg2"]["size"];

              $fileName3 = $_FILES["blogImg3"]["name"];    
              $filePath_Temp3 = $_FILES["blogImg3"]["tmp_name"];        
              $fileType3 = $_FILES["blogImg3"]["type"]; 
              $fileSize3 = $_FILES["blogImg3"]["size"];

              $fileName4 = $_FILES["blogImg4"]["name"];    
              $filePath_Temp4 = $_FILES["blogImg4"]["tmp_name"];        
              $fileType4 = $_FILES["blogImg4"]["type"]; 
              $fileSize4 = $_FILES["blogImg4"]["size"];
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
              $filePath3 = $path.$fileName3;
              $filePath4 = $path.$fileName4;

              //重新命名檔案
              $newFileName1 = "content1.".getExtensionName($filePath1);
              $newFileName2 = "content2.".getExtensionName($filePath2);
              $newFileName3 = "content3.".getExtensionName($filePath3);
              $newFileName4 = "content4.".getExtensionName($filePath4);

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
        'Content' => $_POST['blogDescription1'],
        'Image' => $newFileName1,
        'Times' => $_POST['blogTime1'],
        'TimeTitle' => $_POST['blogTitle1'],
        'Sequence' => 1
    ),
    array(
        'BlogID' => $_POST['blogID'],
        'Content' => $_POST['blogDescription2'],
        'Image' => $newFileName2,
        'Times' => $_POST['blogTime2'],
        'TimeTitle' => $_POST['blogTitle2'],
        'Sequence' => 2
    ),
    array(
        'BlogID' => $_POST['blogID'],
        'Content' => $_POST['blogDescription3'],
        'Image' => $newFileName3,
        'Times' => $_POST['blogTime3'],
        'TimeTitle' => $_POST['blogTitle3'],
        'Sequence' => 3
    ),
    array(
        'BlogID' => $_POST['blogID'],
        'Content' => $_POST['blogDescription4'],
        'Image' => $newFileName4,
        'Times' => $_POST['blogTime4'],
        'TimeTitle' => $_POST['blogTitle4'],
        'Sequence' => 4
    )
);

$sql = "INSERT INTO blogBlock(BlogID, Content, `Image`, `Times`, TimeTitle, `Sequence`)
VALUES(?, ?, ?, ?, ?, ?)";
$statement = $pdo->prepare($sql);

foreach ($data as $row) {
    $statement->execute(array($row['BlogID'], $row['Content'], $row['Image'], $row['Times'], $row['TimeTitle'], $row['Sequence']));
}

$affectedRows = $statement->rowCount();

if($affectedRows > 0){
    echo "done";
}else{
    echo "fail";
    }

?>