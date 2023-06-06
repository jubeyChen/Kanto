<?php
include('Mysql.php'); //資料庫連線

$productId = $_GET['id'];

//取得檔案副檔名
function getExtensionName($filePath){
    $path_parts = pathinfo($filePath);
    return $path_parts["extension"];
}

if( $_FILES['plan_Img1']['error'] >0 || $_FILES['plan_Img2']['error'] >0 || $_FILES['plan_Img3']['error'] >0 || $_FILES['plan_Img4']['error'] >0 ){
    echo '上傳失敗';
}else{
    $plan_Img1_Name = $_FILES['plan_Img1']['name'];
    $filePath_Temp1 = $_FILES['plan_Img1']['tmp_name'];
    
    $plan_Img2_Name = $_FILES['plan_Img2']['name'];
    $filePath_Temp2 = $_FILES['plan_Img2']['tmp_name'];
    
    $plan_Img3_Name = $_FILES['plan_Img3']['name'];
    $filePath_Temp3 = $_FILES['plan_Img3']['tmp_name'];
    
    $plan_Img4_Name = $_FILES['plan_Img4']['name'];
    $filePath_Temp4 = $_FILES['plan_Img4']['tmp_name'];
    
      // Web根目錄真實路徑
      $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
      // $path = "../dist/image/productPage/".$productId."/"; // 放到server上使用
      $path = $ServerRoot."/Kanto/dist/image/productPage/".$productId."/"; //本機端的路徑
      if (!is_dir($path)) {
          mkdir($path, 0777, true);
      }
    
      $filePath1 = $path . $plan_Img1_Name;
      $filePath2 = $path . $plan_Img2_Name;
      $filePath3 = $path . $plan_Img3_Name;
      $filePath4 = $path . $plan_Img4_Name;
    
      $newFileName1 = "detail_1." . getExtensionName($filePath1);
      $newFileName2 = "detail_2." . getExtensionName($filePath2);
      $newFileName3 = "detail_3." . getExtensionName($filePath3);
      $newFileName4 = "detail_4." . getExtensionName($filePath4);
    
      //將照片檔案上傳
      move_uploaded_file($filePath_Temp1, $path . $newFileName1);
      move_uploaded_file($filePath_Temp2, $path . $newFileName2);
      move_uploaded_file($filePath_Temp3, $path . $newFileName3);
      move_uploaded_file($filePath_Temp4, $path . $newFileName4);
    


//撈取原始圖片檔案名稱



//第一個更新
 $sql ="UPDATE productSchedule
      SET Image = ?
      WHERE productID = ?
      LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1, $newFileName1);
    $statement->bindValue(2, $productId);

     $affectedRow = $statement->execute();

     if ($affectedRow > 0) {
         echo "done";
     } else {
         echo "fail";
     }


     //方案詳情二---------------------------------------------
     $sql2 = "UPDATE productSchedule
     SET Image = :plan_Img2 
     WHERE productID = :productId
     AND ID IN (
         SELECT tmp.ID
         FROM (
             SELECT ID
             FROM productSchedule
             WHERE productID = :productId
             ORDER BY ID
             LIMIT 1 OFFSET 1
         ) AS tmp
     )";

$statement2 = $pdo->prepare($sql2);
$params2 = array(
':plan_Img2' => $newFileName2,
':productId' => $productId
);

$affectedRow2 = $statement2->execute($params2);




     //方案詳情三---------------------------------------------
     $sql3 = "UPDATE productSchedule
     SET Image = :plan_Img3 
     WHERE productID = :productId
     AND ID IN (
         SELECT tmp.ID
         FROM (
             SELECT ID
             FROM productSchedule
             WHERE productID = :productId
             ORDER BY ID
             LIMIT 1 OFFSET 2
         ) AS tmp
     )";

$statement3 = $pdo->prepare($sql3);
$params3 = array(
':plan_Img3' => $newFileName3,
':productId' => $productId
);

$affectedRow3 = $statement3->execute($params3);




     //方案詳情四---------------------------------------------
     $sql4 = "UPDATE productSchedule
     SET Image = :plan_Img4 
     WHERE productID = :productId
     AND ID IN (
         SELECT tmp.ID
         FROM (
             SELECT ID
             FROM productSchedule
             WHERE productID = :productId
             ORDER BY ID
             LIMIT 1 OFFSET 3
         ) AS tmp
     )";

$statement4 = $pdo->prepare($sql4);
$params4 = array(
':plan_Img4' => $newFileName4,
':productId' => $productId
);

$affectedRow4 = $statement4->execute($params4);


      echo '更新成功';
}
?>