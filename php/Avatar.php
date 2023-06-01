<?php

include('Mysql.php'); //資料庫連線

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

//上傳照片的使用者ID
$id = $_POST["ID"];

//判斷照片是否上傳成功
if($_FILES["Avatar"]["error"] > 0){
    echo "上傳失敗: 錯誤代碼".$_FILES["Avatar"]["error"];
}else{
    //取得上傳的檔案資訊=======================================
    $fileName = $_FILES["Avatar"]["name"];    //檔案名稱含副檔名        
    $filePath_Temp = $_FILES["Avatar"]["tmp_name"];   //Server上的暫存檔路徑含檔名        
    $fileType = $_FILES["Avatar"]["type"];    //檔案種類        
    $fileSize = $_FILES["Avatar"]["size"];    //檔案尺寸
    //=======================================================

    //Web根目錄真實路徑
    $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

    // $path = "../dist/image/member/".$id."/avatar/"; // 放到server上使用
    $path = $ServerRoot."/Kanto/dist/image/member/".$id."/avatar/"; //本機端的路徑
    if (!is_dir($path)) {
    mkdir($path, 0777, true);
    }

    $filePath = $path.$fileName;

   //重新命名檔案
    $newFileName = $id.".".getExtensionName($filePath);

    $newFilePath = $path . $newFileName;
    //將暫存檔搬移到正確位置
    move_uploaded_file($filePath_Temp, $newFilePath);

    //顯示檔案資訊
    // echo "檔案存放位置：".$newFilePath;
    // echo "<br/>";
    // echo "類型：".$fileType;
    // echo "<br/>";
    // echo "大小：".$fileSize;
    // echo "<br/>";
    // echo "副檔名：".getExtensionName($filePath);
    // echo "<br/>";
    // echo "<img src='/FileUpload/".$fileName."'/>";
    }

    //取得檔案副檔名
    function getExtensionName($filePath){
        $path_parts = pathinfo($filePath);
        return $path_parts["extension"];
    }


    $sql = "UPDATE members SET Avatar = ? WHERE ID = ?";
    $statement = $pdo->prepare($sql);
    $statement->bindParam(1, $newFileName); 
    $statement->bindParam(2, $id); 
    $affectedRow = $statement->execute();

    if($affectedRow > 0){
              echo "done";
       }else{
              echo "fail";
       }
?>
