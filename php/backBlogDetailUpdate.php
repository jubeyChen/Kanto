<?php
include('Mysql.php'); // 資料庫連線
ini_set("display_errors", "On");

// 取得 POST 請求的原始資料
$data = file_get_contents('php://input');

// 解析 JSON 資料為關聯陣列
$data = json_decode($data, true);

$name = $data['name'];
// 行程地區
$region = $data['region'];

// 活動介紹
$intro = $data['intro'];
$blogID = $_GET['id'];

// 第一個搜尋
$sql = "UPDATE blog 
        SET Title = :name, RegionID = :region, Content = :intro
        WHERE blog.ID = :blogId";

// 準備並執行準備陳述式
$stmt = $pdo->prepare($sql);

// 準備要綁定的參數
$params = array(
    ':name' => $name,
    ':region' => $region,
    ':intro' => $intro,
    ':blogId' => $blogID
);

$result = $stmt->execute($params);

// 第二個搜尋

// 行程名稱
$plan_title1 = $data['plan_TimeTitle1'];
$plan_title2 = $data['plan_TimeTitle2'];
$plan_title3 = $data['plan_TimeTitle3'];
$plan_title4 = $data['plan_TimeTitle4'];

// 行程時間
$plan_time1 = $data['plan_Times1'];
$plan_time2 = $data['plan_Times2'];
$plan_time3 = $data['plan_Times3'];
$plan_time4 = $data['plan_Times4'];

// 行程簡介
$plan_Content1 = $data['plan_Content1'];
$plan_Content2 = $data['plan_Content2'];
$plan_Content3 = $data['plan_Content3'];
$plan_Content4 = $data['plan_Content4'];

// 方案詳情一
$sql2 = "UPDATE blogBlock
         SET Times = :Times1,
             TimeTitle = :TimeTitle1,
             Content = :Content1
         WHERE BlogID = :blogId
         LIMIT 1";

// 準備並執行準備陳述式
$stmt2 = $pdo->prepare($sql2);

// 準備要綁定的參數
$params2 = array(
    ':Times1' => $plan_time1,
    ':TimeTitle1' => $plan_title1,
    ':Content1' => $plan_Content1,
    ':blogId' => $blogID
);

$result2 = $stmt2->execute($params2);



//方案詳情二---------------------------------------------
$sql3 ="UPDATE blogBlock
SET Times = :Times2,
TimeTitle = :TimeTitle2,
             Content = :Content2
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

// 準備並執行準備陳述式
$stmt3 = $pdo->prepare($sql3);

// 準備要綁定的參數
$params3 = array(':Times2' => $plan_time2, 
                ':TimeTitle2' => $plan_title2,
                ':Content2' => $plan_Content2,
                ':blogId' => $blogID);

$result3 = $stmt3->execute($params3);


//方案詳情三-----------------------------------------
$sql4 ="UPDATE blogBlock
SET Times = :Times3,
TimeTitle = :TimeTitle3,
             Content = :Content3
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

// 準備並執行準備陳述式
$stmt4 = $pdo->prepare($sql4);

// 準備要綁定的參數
$params4 = array(':Times3' => $plan_time3, 
                ':TimeTitle3' => $plan_title3,
                ':Content3' => $plan_Content3,
                ':blogId' => $blogID);

$result4 = $stmt4->execute($params4);

//方案詳情四-------------------------------------------
$sql5 ="UPDATE blogBlock
SET Times = :Times4,
TimeTitle = :TimeTitle4,
             Content = :Content4
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

// 準備並執行準備陳述式
$stmt5 = $pdo->prepare($sql5);

// 準備要綁定的參數
$params5 = array(':Times4' => $plan_time4, 
                ':TimeTitle4' => $plan_title4,
                ':Content4' => $plan_Content4,
                ':blogId' => $blogID);

$result5 = $stmt5->execute($params5);

// 檢查更新是否成功
if ($result && $result2 && $result3 && $result4 &&$result5 ) {
       echo "更新成功";
   } else {
       echo "更新失敗";
   }
?>
