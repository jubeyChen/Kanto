<?php

include('Mysql.php'); // 資料庫連線

$checkedData = json_decode($_POST['data'], true);
// print_r($checkedData);

$successFlag = false; // 标志变量，用于跟踪是否至少有一次删除成功
foreach ($checkedData as $ID){
    // echo $ID;
    $sqlDeleteBlogBlock = "DELETE FROM blogBlock WHERE BlogID = :ID";
    $stmtDeleteBlogBlock = $pdo->prepare($sqlDeleteBlogBlock);
    $stmtDeleteBlogBlock->bindParam(':ID', $ID);
    $stmtDeleteBlogBlock->execute();

    $sql = "DELETE FROM blog WHERE ID = :ID";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':ID', $ID);
    $stmt->execute();

    $rowCount = $stmt->rowCount(); // 获取受影响的行数

    if ($rowCount > 0) {
        $successFlag = true;
    }
}
if ($successFlag > 0) {
        // 删除成功
        echo "done";
    } else {
        // 删除失败
        echo "Failed";
    }

?>