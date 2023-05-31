<?php

include('Mysql.php'); //資料庫連線

// 第一個查詢
$sql = "SELECT *
    FROM product";

    // -- JOIN productIntroduction ON product.IntroductionID = productIntroduction.ID
    // -- JOIN region ON product.RegionID = region.ID 
    // -- WHERE product.ID  = :productId";

$statement = $pdo->prepare($sql);
// $statement->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement->execute();
$data = $statement->fetchAll();

$a = [];

foreach ($data as $p) {
    foreach($p as $key=>$value) {

        if($key == "ID"){
            array_push($a, $value);
        }
      }

}


// 第二個查詢
$sql2 = "SELECT *
    FROM productdetail

    WHERE ProductID in (" . implode(',', $a) . ")";

$statement2 = $pdo->prepare($sql2);
// $statement->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement2->execute();
$data2 = $statement2->fetchAll();


// 將兩個查詢組成陣列
$response = [
    'product' => $data,
    'productdetail' => $data2,
];



// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;

?>