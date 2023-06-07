<?php

include('Mysql.php'); //資料庫連線
ini_set("display_errors", "On");
// 第一個查詢 (所有product table的資料)
$sql = "SELECT * FROM product";


$statement = $pdo->prepare($sql);
$statement->execute();
$data = $statement->fetchAll();

// -----------------------------------------------------------------------------------------


// 第二個查詢 (時間的資料)
$sql2 = "SELECT * FROM productDetail";

$statement2 = $pdo->prepare($sql2);
$statement2->execute();
$data2 = $statement2->fetchAll();


// 第三個查詢 (把平均星星加入$data的資料)------------------------------------------------------------------


$sql3 = "SELECT t.ProductID, t.AverageStar, p.* FROM
        (SELECT ProductID, AVG(Star) AS AverageStar FROM review GROUP BY ProductID) AS t
        INNER JOIN product AS p ON t.ProductID = p.ID";

$statement3 = $pdo->prepare($sql3);
$statement3->execute();
$data3 = $statement3->fetchAll();

// 將 averageStarData 中的 AverageStar 按照 product.ID 加入 productData
foreach ($data as &$product) {
    $product['AverageStar'] = null; // 預設值為 null

    foreach ($data3 as $averageStar) {
        if ($averageStar['ProductID'] === $product['ID']) {
            $product['AverageStar'] = $averageStar['AverageStar'];
            break;
        }
    }
}
session_start();

$memberId = "";
// 检查会话中是否存在已登录的用户信息
if (isset($_SESSION['memberID'])) {
    $memberId = $_SESSION['memberID'];
}

// 第四個查詢 (取得會員已收藏的商品ID)------------------------------------------------------------------


$sql4 = "select C.ProductID from collection as C
join members as M on C.MemberID = M.ID
where M.AccountID = :memID";

$statement4 = $pdo->prepare($sql4);
$statement4->bindParam(':memID',$memberId);
$statement4->execute();
$data4 = $statement4->fetchAll();

// 將四個查詢組成陣列

$response = [
    'product' => $data,
    'productdetail' => $data2,
    'averageStar' => $data3,
    'collections' => $data4
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;
?>


