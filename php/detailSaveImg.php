<?php
include('Mysql.php'); // 資料庫連線
$productId = $_GET['id'];

// 取得檔案副檔名
function getExtensionName($filePath) {
    $path_parts = pathinfo($filePath);
    return $path_parts["extension"];
}

// 取得原始的圖片檔案名稱
$sql = "SELECT Banner1, Banner2, Banner3, Image1, Image2, Image3, Image4 FROM product WHERE ID = ?";
$statement = $pdo->prepare($sql);
$statement->bindParam(1, $productId);
$statement->execute();
$row = $statement->fetch(PDO::FETCH_ASSOC);

$originalFileName1 = $row['Banner1'];
$originalFileName2 = $row['Banner2'];
$originalFileName3 = $row['Banner3'];
$originalFileName4 = $row['Image1'];
$originalFileName5 = $row['Image2'];
$originalFileName6 = $row['Image3'];
$originalFileName7 = $row['Image4'];

// 檢查是否收到圖片資料和產品ID
if ($_FILES['desImg1']["error"] > 0 || $_FILES['desImg2']["error"] > 0 || $_FILES['desImg3']["error"] > 0) {
    echo '上傳失敗';
} else {
    // 取得上傳的檔案資訊=======================================
    $desImg1_Name = $_FILES['desImg1']['name'];
    $filePath_Temp1 = $_FILES['desImg1']['tmp_name'];

    $desImg2_Name = $_FILES['desImg2']['name'];
    $filePath_Temp2 = $_FILES['desImg2']['tmp_name'];

    $desImg3_Name = $_FILES['desImg3']['name'];
    $filePath_Temp3 = $_FILES['desImg3']['tmp_name'];

    $introImg1_Name = $_FILES['introImg1']['name'];
    $filePath_Temp4 = $_FILES['introImg1']['tmp_name'];

    $introImg2_Name = $_FILES['introImg2']['name'];
    $filePath_Temp5 = $_FILES['introImg2']['tmp_name'];

    $introImg3_Name = $_FILES['introImg3']['name'];
    $filePath_Temp6 = $_FILES['introImg3']['tmp_name'];

    $introImg4_Name = $_FILES['introImg4']['name'];
    $filePath_Temp7 = $_FILES['introImg4']['tmp_name'];

    //=======================================================

    // Web根目錄真實路徑
    $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
    $path = "../dist/image/productPage/".$productId."/"; // 放到server上使用
    // $path = $ServerRoot."/Kanto/dist/image/productPage/".$productId."/"; //本機端的路徑
    if (!is_dir($path)) {
        mkdir($path, 0777, true);
    }

    $filePath1 = $path . $desImg1_Name;
    $filePath2 = $path . $desImg2_Name;
    $filePath3 = $path . $desImg3_Name;
    $filePath4 = $path . $introImg1_Name;
    $filePath5 = $path . $introImg2_Name;
    $filePath6 = $path . $introImg3_Name;
    $filePath7 = $path . $introImg4_Name;

    // 重新命名檔案
    $newFileName1 = "banner1." . getExtensionName($filePath1);
    $newFileName2 = "banner2." . getExtensionName($filePath2);
    $newFileName3 = "banner3." . getExtensionName($filePath3);
    $newFileName4 = "event1." . getExtensionName($filePath4);
    $newFileName5 = "event2." . getExtensionName($filePath5);
    $newFileName6 = "event3." . getExtensionName($filePath6);
    $newFileName7 = "event4." . getExtensionName($filePath7);

    // 檢查並執行檔案上傳和更新
    if (isset($_FILES['desImg1']) && $_FILES['desImg1']["error"] == 0) {
        move_uploaded_file($filePath_Temp1, $path . $newFileName1);
    } else {
        $newFileName1 = $originalFileName1;
    }

    if (isset($_FILES['desImg2']) && $_FILES['desImg2']["error"] == 0) {
        move_uploaded_file($filePath_Temp2, $path . $newFileName2);
    } else {
        $newFileName2 = $originalFileName2;
    }

    if (isset($_FILES['desImg3']) && $_FILES['desImg3']["error"] == 0) {
        move_uploaded_file($filePath_Temp3, $path . $newFileName3);
    } else {
        $newFileName3 = $originalFileName3;
    }

    if (isset($_FILES['introImg1']) && $_FILES['introImg1']["error"] == 0) {
        move_uploaded_file($filePath_Temp4, $path . $newFileName4);
    } else {
        $newFileName4 = $originalFileName4;
    }

    if (isset($_FILES['introImg2']) && $_FILES['introImg2']["error"] == 0) {
        move_uploaded_file($filePath_Temp5, $path . $newFileName5);
    } else {
        $newFileName5 = $originalFileName5;
    }

    if (isset($_FILES['introImg3']) && $_FILES['introImg3']["error"] == 0) {
        move_uploaded_file($filePath_Temp6, $path . $newFileName6);
    } else {
        $newFileName6 = $originalFileName6;
    }

    if (isset($_FILES['introImg4']) && $_FILES['introImg4']["error"] == 0) {
        move_uploaded_file($filePath_Temp7, $path . $newFileName7);
    } else {
        $newFileName7 = $originalFileName7;
    }

    $sqlUpdate = "UPDATE product SET Banner1 = ?, Banner2 = ?, Banner3 = ?, Image1 = ?, Image2 = ?, Image3 = ?, Image4 = ? WHERE ID = ?";
    $statementUpdate = $pdo->prepare($sqlUpdate);
    $statementUpdate->bindParam(1, $newFileName1);
    $statementUpdate->bindParam(2, $newFileName2);
    $statementUpdate->bindParam(3, $newFileName3);
    $statementUpdate->bindParam(4, $newFileName4);
    $statementUpdate->bindParam(5, $newFileName5);
    $statementUpdate->bindParam(6, $newFileName6);
    $statementUpdate->bindParam(7, $newFileName7);
    $statementUpdate->bindParam(8, $productId);
    $affectedRow = $statementUpdate->execute();

    if ($affectedRow > 0) {
        echo "done";
    } else {
        echo "fail";
    }

    echo '更新成功';
}
?>