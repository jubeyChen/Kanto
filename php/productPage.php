<?php

include('Mysql.php'); //資料庫連線

// 從 URL 的 id 參數中獲取 productId 值
$productId = $_GET['id'];

// 第一個查詢
$sql = "SELECT *
    FROM product
    JOIN productIntroduction ON product.IntroductionID = productIntroduction.ID
    JOIN region ON product.RegionID = region.ID 
    WHERE product.ID  = :productId";

$statement = $pdo->prepare($sql);
$statement->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement->execute();
$data = $statement->fetchAll();

// 第二個查詢
$sql2 = "SELECT productSchedule.Times, productSchedule.ScheduleTitle, productSchedule.Content,productSchedule.Image,productSchedule.ContentTitle
    FROM product
    JOIN productIntroduction ON product.IntroductionID = productIntroduction.ID
    JOIN region ON product.RegionID = region.ID
    JOIN productSchedule ON product.ID = productSchedule.productID
    WHERE product.ID = :productId";

$statement2 = $pdo->prepare($sql2);
$statement2->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement2->execute();
$data2 = $statement2->fetchAll();

//第三個查詢

$sql3 = "SELECT * FROM review WHERE ProductID = :productId";


$statement3 = $pdo->prepare($sql3);
$statement3->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement3->execute();
$data3 = $statement3->fetchAll();



// 第四個查詢：將所有照片組合成陣列
$sql4 = "SELECT image1, image2, image3, image4, image5, image6 FROM review WHERE productId = :productId";
$statement4 = $pdo->prepare($sql4);
$statement4->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement4->execute();

$photos = array();
while ($row = $statement4->fetch(PDO::FETCH_ASSOC)) {
    // 將每筆資料的圖片值添加到 $photos 陣列
    $photos[] = $row["image1"];
    $photos[] = $row["image2"];
    $photos[] = $row["image3"];
    $photos[] = $row["image4"];
    $photos[] = $row["image5"];
    $photos[] = $row["image6"];
}

//第五個查詢 查詢member資料
$sql5 = "SELECT * FROM review
JOIN members on members.ID = review.MemberID
WHERE review.ProductID= :productId";
$statement5 = $pdo->prepare($sql5);
$statement5->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement5->execute();
$data5 = $statement5->fetchAll();



//第六個查詢
$sql6 = "SELECT product.ID , productDetail.OfferDate
FROM product
JOIN productDetail ON productDetail.ProductID = product.ID
where product.ID =:productId 
order by productDetail.OfferDate";
$statement6 = $pdo->prepare($sql6);
$statement6->bindParam(':productId', $productId, PDO::PARAM_INT);
$statement6->execute();
$data6 = $statement6->fetchAll();



//會員評論由低至高
// $sql7 = "SELECT * FROM review
// JOIN members on members.ID = review.MemberID
// WHERE review.ProductID = :productId 
// order by review.Star";
// $statement7 = $pdo->prepare($sql7);
// $statement7->bindParam(':productId', $productId, PDO::PARAM_INT);
// $statement7->execute();
// $data7 = $statement7->fetchAll();

// 將查詢組成陣列
$response = [
    'data1' => $data,
    'data2' => $data2,
    'data3' => $data3,
    'photos' => $photos,
    'member' => $data5,
    'date' => $data6,
    // 'lowToHigh' => $data7,
];

// 轉 JSON
$jsonData = json_encode($response);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;

?>