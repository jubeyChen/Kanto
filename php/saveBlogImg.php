<?php

include('Mysql.php'); // 資料庫連線
$blogID = $_GET['id'];

// 取得檔案副檔名
function getExtensionName($filePath) {
    $path_parts = pathinfo($filePath);
    return $path_parts["extension"];
}

// 取得原始的圖片檔案名稱
$sql = "SELECT BannerPC, Image1 FROM blog WHERE ID = ?";
$statement = $pdo->prepare($sql);
$statement->bindParam(1, $blogID);
$statement->execute();
$row = $statement->fetch(PDO::FETCH_ASSOC);

$originalFileName1 = $row['BannerPC'];
$originalFileName2 = $row['Image1'];

// 檢查是否收到圖片資料和產品ID
if ($_FILES['desImg1']["error"] > 0 || $_FILES['desImg2']["error"] > 0) {
    echo '上傳失敗';
} else {
    // 取得上傳的檔案資訊=======================================
    $desImg1_Name = $_FILES['desImg1']['name'];
    $filePath_Temp1 = $_FILES['desImg1']['tmp_name'];

    $desImg2_Name = $_FILES['desImg2']['name'];
    $filePath_Temp2 = $_FILES['desImg2']['tmp_name'];

    //=======================================================

    // Web根目錄真實路徑
    $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
    // $path = "../dist/image/productPage/".$productId."/"; // 放到server上使用
    $path = $ServerRoot."/Kanto/dist/image/blog/".$blogID."/"; //本機端的路徑
    if (!is_dir($path)) {
        mkdir($path, 0777, true);
    }

    $filePath1 = $path . $desImg1_Name;
    $filePath2 = $path . $desImg2_Name;

    // 重新命名檔案
    $newFileName1 = "banner1." . getExtensionName($filePath1);
    $newFileName2 = "image1." . getExtensionName($filePath2);

    $newFilePath1 = $path.$newFileName1;
    $newFilePath2 = $path.$newFileName2;


    //將暫存檔搬移到正確位置
    move_uploaded_file($filePath_Temp1, $newFilePath1);
    move_uploaded_file($filePath_Temp2, $newFilePath2);

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


    $sqlUpdate = "UPDATE blog SET BannerPC = ?, Image1 = ? WHERE ID = ?";
    $statementUpdate = $pdo->prepare($sqlUpdate);
    $statementUpdate->bindParam(1, $newFileName1);
    $statementUpdate->bindParam(2, $newFileName2);
    $statementUpdate->bindParam(3, $blogID);
    $affectedRow = $statementUpdate->execute();

    if ($affectedRow > 0) {
        echo "done";
    } else {
        echo "fail";
    }

    echo '更新成功';
}
?>