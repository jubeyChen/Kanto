<?php

include('Mysql.php'); //資料庫連線

// 取得 POST 請求的原始資料
$data = file_get_contents('php://input');

// 解析 JSON 資料為關聯陣列
$data = json_decode($data, true);



$name = $data['name'];
//行程地區
$region = $data['region'];
//行程類別 
$typeName = $data['typeName'];

$price = $data['price'];
//刪除$符號
$price = str_replace('$', '', $price);

$Content1 = $data['Content1'];
$Content2 = $data['Content2'];
$Content3 = $data['Content3'];

//活動介紹
$intro = $data['intro'];
$productId = $_GET['id'];

//日期
$dates = $data['dates'];

if(!empty($dates)){
//因為這張表有FK 所以必須要解除
$pdo->exec('SET FOREIGN_KEY_CHECKS = 0');

//日期更新
$deleteSql = "DELETE FROM productDetail WHERE ProductID = :productId";
$deleteStmt = $pdo->prepare($deleteSql);
$deleteStmt->bindParam(':productId', $productId);
$deleteStmt->execute();

// 重新啟動外键约束
$pdo->exec('SET FOREIGN_KEY_CHECKS = 1');

$insertSql = "INSERT INTO productDetail(ProductID, OfferDate) VALUES (:productId, :offerDate)";
$insertStmt = $pdo->prepare($insertSql);

foreach ($dates as $date) {
    $insertStmt->bindParam(':productId', $productId);
    $insertStmt->bindParam(':offerDate', $date);
    $insertStmt->execute();
}
}



//第一個搜尋
$sql = "UPDATE product 
JOIN productIntroduction on productIntroduction.ID = product.IntroductionID
        SET product.Name = :name,
            product.RegionID = :region,
            product.ProductTypeID = :typeName,
            product.Price = :price,
            product.Content = :intro,
            productIntroduction.Content1 = :Content1,
            productIntroduction.Content2 = :Content2,
            productIntroduction.Content3 = :Content3
        WHERE product.ID = :productId";

// 準備並執行準備陳述式
$stmt = $pdo->prepare($sql);

// 準備要綁定的參數
$params = array(':name' => $name, 
                ':region' => $region,
                ':typeName' => $typeName,
                ':price' => $price,
                ':Content1' => $Content1,
                ':Content2' => $Content2,
                ':Content3' => $Content3,
                ':intro' => $intro,
                ':productId' => $productId);

$result = $stmt->execute($params);





//第二個搜尋


//行程名稱
$plan_title1 = $data['plan_title1'];
$plan_title2 = $data['plan_title2'];
$plan_title3 = $data['plan_title3'];
$plan_title4 = $data['plan_title4'];

//行程時間
$plan_time1 = $data['plan_time1'];
$plan_time2 = $data['plan_time2'];
$plan_time3 = $data['plan_time3'];
$plan_time4 = $data['plan_time4'];

//行程地點
$plan_ContentTitle1 = $data['plan_ContentTitle1'];
$plan_ContentTitle2 = $data['plan_ContentTitle2'];
$plan_ContentTitle3 = $data['plan_ContentTitle3'];
$plan_ContentTitle4 = $data['plan_ContentTitle4'];

//行程簡介
$plan_Content1 = $data['plan_content1'];
$plan_Content2 = $data['plan_content2'];
$plan_Content3 = $data['plan_content3'];
$plan_Content4 = $data['plan_content4'];


//方案詳情一
$sql2 ="UPDATE productSchedule
        SET Times = :Times1,
            ScheduleTitle = :title1,
            Content = :Content1,
            ContentTitle = :ContentTitle1
        WHERE productID = :productId
        LIMIT 1";

// 準備並執行準備陳述式
$stmt2 = $pdo->prepare($sql2);

// 準備要綁定的參數
$params2 = array(':Times1' => $plan_time1, 
                ':title1' => $plan_title1,
                ':ContentTitle1' => $plan_ContentTitle1,
                ':Content1' => $plan_Content1,
                ':productId' => $productId);

$result2 = $stmt2->execute($params2);



//方案詳情二---------------------------------------------
$sql3 ="UPDATE productSchedule
SET Times = :Times2,
    ScheduleTitle = :title2,
    Content = :Content2,
    ContentTitle = :ContentTitle2
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

// 準備並執行準備陳述式
$stmt3 = $pdo->prepare($sql3);

// 準備要綁定的參數
$params3 = array(':Times2' => $plan_time2, 
                ':title2' => $plan_title2,
                ':ContentTitle2' => $plan_ContentTitle2,
                ':Content2' => $plan_Content2,
                ':productId' => $productId);

$result3 = $stmt3->execute($params3);




//方案詳情三-----------------------------------------
$sql4 ="UPDATE productSchedule
SET Times = :Times3,
    ScheduleTitle = :title3,
    Content = :Content3,
    ContentTitle = :ContentTitle3
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

// 準備並執行準備陳述式
$stmt4 = $pdo->prepare($sql4);

// 準備要綁定的參數
$params4 = array(':Times3' => $plan_time3, 
                ':title3' => $plan_title3,
                ':ContentTitle3' => $plan_ContentTitle3,
                ':Content3' => $plan_Content3,
                ':productId' => $productId);

$result4 = $stmt4->execute($params4);


//方案詳情四-------------------------------------------
$sql5 ="UPDATE productSchedule
SET Times = :Times4,
    ScheduleTitle = :title4,
    Content = :Content4,
    ContentTitle = :ContentTitle4
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

// 準備並執行準備陳述式
$stmt5 = $pdo->prepare($sql5);

// 準備要綁定的參數
$params5 = array(':Times4' => $plan_time4, 
                ':title4' => $plan_title4,
                ':ContentTitle4' => $plan_ContentTitle4,
                ':Content4' => $plan_Content4,
                ':productId' => $productId);

$result5 = $stmt5->execute($params5);


// 檢查更新是否成功
if ($result && $result2 && $result3 && $result4 &&$result5 ) {
    echo "更新成功";
} else {
    echo "更新失敗";
}
?>


