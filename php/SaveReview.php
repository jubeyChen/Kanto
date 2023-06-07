<?php

include('Mysql.php'); //資料庫連線

header('Content-Type: application/json');
ini_set("display_errors", "On");

$ProductID = htmlspecialchars($_POST['ProductID']);
$MemberID = htmlspecialchars($_POST['MemberID']);
$Star = htmlspecialchars($_POST['Star']);
$Text = htmlspecialchars($_POST['Text']);
$OrderDetailID = htmlspecialchars($_POST['OrderDetailID']);


//Web根目錄真實路徑, ex: C:/XAMPP/htdocs
$ServerRoot = $_SERVER["DOCUMENT_ROOT"];

if(isset($_FILES["IMG"])){

//取得上傳的檔案資訊(陣列型態)=============================
       $fileName_arr = $_FILES["IMG"]["name"];    //檔案名稱含副檔名    
       $fileTmpName_arr = $_FILES["IMG"]["tmp_name"]; //Server上的暫存檔路徑含檔名    
       $fileType_arr = $_FILES["IMG"]["type"];    //檔案種類        
       $fileSize_arr = $_FILES["IMG"]["size"];    //檔案尺寸
       $error_arr = $_FILES["IMG"]["error"];  //錯誤代碼
    //=======================================================
    

    //依上傳檔案的數量跑迴圈一一處理
       for ($i = 0; $i < count($fileName_arr); $i++) {        

        //Server上的暫存檔路徑含檔名
       $filePath_Temp = $fileTmpName_arr[$i];

        // $path = "../dist/image/productPage/".$ProductID."/reviewPhoto/"; //放上server的路徑
      $path = $ServerRoot."/Kanto/dist/image/productPage/".$ProductID."/reviewPhoto/"; //本機端的路徑
      if (!is_dir($path)) {
       mkdir($path, 0777, true);
     }
       $filePath = $path.$fileName_arr[$i];

       $newFileName = time().$i.".".getExtensionName($filePath);

       $newFilePath = $path.$newFileName;

       $fileNames[] = $newFileName;

       //判斷是否上傳成功
       if($error_arr[$i] > 0){
            echo "上傳失敗: 錯誤代碼".$error_arr[$i];
        }else{
            //將暫存檔搬移到正確位置
            move_uploaded_file($filePath_Temp, $newFilePath);
        }
       }  
}
    

    //取得檔案副檔名
    function getExtensionName($filePath){
        $path_parts = pathinfo($filePath);
        return $path_parts["extension"];
    }



$sql = "INSERT INTO review(`Text`, MemberID, Star, ProductID, OrderDetailID, Image1, Image2, Image3, Image4, Image5, Image6) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


$statement = $pdo->prepare($sql);
$statement->bindParam(1, $Text);
$statement->bindParam(2, $MemberID);
$statement->bindParam(3, $Star);
$statement->bindParam(4, $ProductID);
$statement->bindParam(5, $OrderDetailID);

// 绑定每个文件名到相应的列中，如果没有文件名则绑定为NULL
for ($j = 0; $j < 6; $j++) {
    if (isset($fileNames[$j])) {
        $statement->bindParam($j + 6, $fileNames[$j]);
    } else {
        $statement->bindValue($j + 6, NULL, PDO::PARAM_NULL);
    }
}

$affectedRow = $statement->execute();

if($affectedRow > 0){

    $sql2 = "UPDATE orderDetail SET Reviewed = 1 WHERE ID = ?";
    $statement2 = $pdo->prepare($sql2);
    $statement2->bindParam(1, $OrderDetailID);
    $affectedRow2 = $statement2->execute();

    if($affectedRow2 > 0){
        echo "done";
    }
       }else{
              echo "fail";
       }
       
?>