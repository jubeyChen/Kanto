<?php
include('Mysql.php'); //資料庫連線
ini_set("display_errors", "On");


$blogID = $_GET['id'];

//取得檔案副檔名
function getExtensionName($filePath){
    $path_parts = pathinfo($filePath);
    return $path_parts["extension"];
}


// 檢查是否收到圖片資料和產品ID
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
    //   $path = "../dist/image/blog/".$blogID."/"; // 放到server上使用
      $path = $ServerRoot."/Kanto/dist/image/blog/".$blogID."/"; //本機端的路徑
      if (!is_dir($path)) {
          mkdir($path, 0777, true);
      }
    
      


      $filePath1 = $path . $plan_Img1_Name;
      $filePath2 = $path . $plan_Img2_Name;
      $filePath3 = $path . $plan_Img3_Name;
      $filePath4 = $path . $plan_Img4_Name;
    
      $newFileName1 = "content1." . getExtensionName($filePath1);
      $newFileName2 = "content2." . getExtensionName($filePath2);
      $newFileName3 = "content3." . getExtensionName($filePath3);
      $newFileName4 = "content4." . getExtensionName($filePath4);



//撈取原始圖片檔案名稱
$originalsql_1 = "SELECT *
FROM blogBlock
WHERE BlogID = ?
LIMIT 1";
$originalstatement = $pdo->prepare($originalsql_1);
$originalstatement->bindParam(1, $blogID);
$originalstatement->execute();
$row = $originalstatement->fetch(PDO::FETCH_ASSOC);
$originalImage1 = $row['Image'];


$originalsql_2 = "SELECT *
FROM blogBlock
WHERE BlogID = ?
LIMIT 1 OFFSET 1";
$originalstatement2 = $pdo->prepare($originalsql_2);
$originalstatement2->bindParam(1, $blogID);
$originalstatement2->execute();
$row = $originalstatement2->fetch(PDO::FETCH_ASSOC);
$originalImage2 = $row['Image'];

$originalsql_3 = "SELECT *
FROM blogBlock
WHERE BlogID = ?
LIMIT 1 OFFSET 2";
$originalstatement3 = $pdo->prepare($originalsql_3);
$originalstatement3->bindParam(1, $blogID);
$originalstatement3->execute();
$row = $originalstatement3->fetch(PDO::FETCH_ASSOC);
$originalImage3 = $row['Image'];

$originalsql_4 = "SELECT *
FROM blogBlock
WHERE BlogID = ?
LIMIT 1 OFFSET 3";
$originalstatement4 = $pdo->prepare($originalsql_4);
$originalstatement4->bindParam(1, $blogID);
$originalstatement4->execute();
$row = $originalstatement4->fetch(PDO::FETCH_ASSOC);
$originalImage4 = $row['Image'];


    // 檢查並執行檔案上傳和更新
    if (isset($_FILES['plan_Img1']) && $_FILES['plan_Img1']["error"] == 0) {
        move_uploaded_file($filePath_Temp1, $path . $newFileName1);
    } else {
        $newFileName1 = $originalImage1;
    }

    if (isset($_FILES['plan_Img2']) && $_FILES['plan_Img2']["error"] == 0) {
        move_uploaded_file($filePath_Temp2, $path . $newFileName2);
    } else {
        $newFileName2 = $originalImage2;
    }

    if (isset($_FILES['plan_Img3']) && $_FILES['plan_Img3']["error"] == 0) {
        move_uploaded_file($filePath_Temp3, $path . $newFileName3);
    } else {
        $newFileName3 = $originalImage3;
    }

    if (isset($_FILES['plan_Img4']) && $_FILES['plan_Img4']["error"] == 0) {
        move_uploaded_file($filePath_Temp4, $path . $newFileName4);
    } else {
        $newFileName4 = $originalImage4;
    }

    


    





//第一個更新
 $sql ="UPDATE blogBlock
      SET Image = ?
      WHERE BlogID = ?
      LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1, $newFileName1);
    $statement->bindValue(2, $blogID);

     $affectedRow = $statement->execute();

     if ($affectedRow > 0) {
         echo "done";
     } else {
         echo "fail";
     }


     //方案詳情二---------------------------------------------
     $sql2 = "UPDATE blogBlock
     SET Image = :plan_Img2 
     WHERE BlogID = :blogId
     AND ID IN (
         SELECT tmp.ID
         FROM (
             SELECT ID
             FROM blogBlock
             WHERE BlogID = :blogId
             ORDER BY ID
             LIMIT 1 OFFSET 1
         ) AS tmp
     )";

$statement2 = $pdo->prepare($sql2);
$params2 = array(
':plan_Img2' => $newFileName2,
':blogId' => $blogID
);

$affectedRow2 = $statement2->execute($params2);




     //方案詳情三---------------------------------------------
     $sql3 = "UPDATE blogBlock
     SET Image = :plan_Img3 
     WHERE BlogID = :blogId
     AND ID IN (
         SELECT tmp.ID
         FROM (
             SELECT ID
             FROM blogBlock
             WHERE BlogID = :blogId
             ORDER BY ID
             LIMIT 1 OFFSET 2
         ) AS tmp
     )";

$statement3 = $pdo->prepare($sql3);
$params3 = array(
':plan_Img3' => $newFileName3,
':blogId' => $blogID
);

$affectedRow3 = $statement3->execute($params3);




     //方案詳情四---------------------------------------------
     $sql4 = "UPDATE blogBlock
     SET Image = :plan_Img4 
     WHERE BlogID = :blogId
     AND ID IN (
         SELECT tmp.ID
         FROM (
             SELECT ID
             FROM blogBlock
             WHERE BlogID = :blogId
             ORDER BY ID
             LIMIT 1 OFFSET 3
         ) AS tmp
     )";

$statement4 = $pdo->prepare($sql4);
$params4 = array(
':plan_Img4' => $newFileName4,
':blogId' => $blogID
);

$affectedRow4 = $statement4->execute($params4);


    echo '更新成功';
    echo $originalImage1;
    echo $originalImage2;
    echo $originalImage3;
    echo $originalImage4;
}
?>