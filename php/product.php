<?php

include('Mysql.php'); //資料庫連線

// 第一個查詢 (所有product table的資料)
$sql = "SELECT * FROM product";

// $sql =
// "SELECT 
// product. *,
// productdetail.OfferDate

// FROM 
// product
// Join productdetail
// ON product.ID = productdetail.ProductID";

$statement = $pdo->prepare($sql);
$statement->execute();
$data = $statement->fetchAll();

// -----------------------------------------------------------------------------------------



$a = [];

foreach ($data as $p) {
    foreach($p as $key=>$value) {

        if($key == "ID"){
            array_push($a, $value);

        }
      }

}


// 第二個查詢 (時間的資料)
$sql2 = "SELECT * FROM productdetail

    WHERE ProductID in (" . implode(',', $a) . ")";

$statement2 = $pdo->prepare($sql2);
$statement2->execute();
$data2 = $statement2->fetchAll();


// -------------------------------------------------------------------------------------------


// 第三個查詢 (region table的所有資料)

$sql3 = "SELECT * FROM region";

$statement3 = $pdo->prepare($sql3);
$statement3->execute();
$data3 = $statement3->fetchAll();




// 第四個查詢 (product table + region.RegionName 的資料)


$sql4 = 
"SELECT 
product. *,
region.RegionName

FROM 
product
Join region
ON product.RegionID = region.ID";

$statement4 = $pdo->prepare($sql4);
$statement4->execute();
$data4 = $statement4->fetchAll();



// 將四個查詢組成陣列

$response = [
    'product' => $data,
    'productdetail' => $data2,
    'region' => $data3,
    'productInRegion' => $data4,
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;
?>


