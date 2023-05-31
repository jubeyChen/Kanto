<?php
include('Mysql.php'); //資料庫連線

$sql = "SELECT blog.ID,blog.Title,blog.Content,blog.BannerPC,blog.main,region.RegionName FROM blog
JOIN region ON blog.RegionID = region.ID 
order by blog.ID";

$statement = $pdo->prepare($sql);
$statement->execute();
$data = $statement->fetchAll();

// 跑迴圈移除所有換行符號
foreach ($data as &$row) {
    foreach ($row as &$value) {
        $value = str_replace("\n", "", $value);
    }
}
// 轉 JSON
$jsonData = json_encode($data);

// 指定內容類型為 JSON
header('Content-Type: application/json');

echo $jsonData;

?>