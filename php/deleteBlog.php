<?php

include('Mysql.php'); // 資料庫連線

$checkedData = json_decode($_POST['data'], true);
print_r($checkedData);

foreach ($checkedData as $ID){
    echo $ID;
    $sqlDeleteBlogBlock = "DELETE FROM blogblock WHERE BlogID = :ID";
    $stmtDeleteBlogBlock = $pdo->prepare($sqlDeleteBlogBlock);
    $stmtDeleteBlogBlock->bindParam(':ID', $ID);
    $stmtDeleteBlogBlock->execute();

    $sql = "DELETE FROM blog WHERE ID = :ID";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':ID', $ID);
    $stmt->execute();

    $rowCount = $stmt->rowCount(); // 获取受影响的行数

    if ($rowCount > 0) {
        // 删除成功
        echo "Deleted record with ID: $ID";
    } else {
        // 删除失败
        echo "Failed to delete record with ID: $ID";
    }
}
// 在这里执行删除操作，根据具体需求进行数据库操作或其他操作

// $deletegame = "DELETE FROM game
// WHERE BlogID = :blogId";
// $gamestatement = $pdo->prepare($deletegame);
// $gamestatement->bindParam(':productId', $productId, PDO::PARAM_INT);
// $gamestatement->execute();


// $deleteproductSchedule = "DELETE FROM productSchedule
// WHERE ProductID = :productId";
// $productSchedulestatement = $pdo->prepare($deleteproductSchedule);
// $productSchedulestatement->bindParam(':productId', $productId, PDO::PARAM_INT);
// $productSchedulestatement->execute();



// $deletereview = "DELETE FROM review
// WHERE ProductID = :productId";
// $reviewstatement = $pdo->prepare($deletereview);
// $reviewstatement->bindParam(':productId', $productId, PDO::PARAM_INT);
// $reviewstatement->execute();


// $deleteOrderDetail = "DELETE FROM orderDetail
// WHERE ProductID = :productId";
// $OrderDetailstatement = $pdo->prepare($deleteOrderDetail);
// $OrderDetailstatement->bindParam(':productId', $productId, PDO::PARAM_INT);
// $OrderDetailstatement->execute();


// $deleteproductDetail = "DELETE FROM productDetail
// WHERE ProductID = :productId";
// $productDetailstatement = $pdo->prepare($deleteproductDetail);
// $productDetailstatement->bindParam(':productId', $productId, PDO::PARAM_INT);
// $productDetailstatement->execute();



// $collectionsql = "DELETE FROM collection
// WHERE ProductID = :productId";

// $statement = $pdo->prepare($collectionsql);
// $statement->bindParam(':productId', $productId, PDO::PARAM_INT);
// $statement->execute();


// $productsql2 = "DELETE FROM product
// WHERE ID = :productId";

// $statement2 = $pdo->prepare($productsql2);
// $statement2->bindParam(':productId', $productId, PDO::PARAM_INT);
// $statement2->execute();

// $productIntroductionsql3 = "DELETE FROM productIntroduction
// WHERE ID = :productId";

// $statement3 = $pdo->prepare($productIntroductionsql3);
// $statement3->bindParam(':productId', $productId, PDO::PARAM_INT);
// $statement3->execute();

// echo '刪除成功';

?>