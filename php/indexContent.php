<?php

include('Mysql.php'); //資料庫連線

header('Content-Type: application/json');


//第一部分 行程資料串接

$sql = "SELECT product.ID, product.Banner1, product.Name, product.Content, region.RegionName FROM product
join region on region.ID = product.RegionID
ORDER BY product.ID
limit 3";

$statement = $pdo->prepare($sql);
$statement->execute();
$data1 = $statement->fetchAll(); //data即是要回傳的資料

//第二部分 住宿
$sql2 = "SELECT ID, `Image` FROM roomBlog
WHERE ID <> 7;";

$statement2 = $pdo->prepare($sql2);
$statement2->execute();
$data2 = $statement2->fetchAll(); //data即是要回傳的資料

//第四部份 旅遊專欄
$sql3 = "SELECT blog.ID, Image1, Title, Content, region.RegionName from blog
join region on region.ID = blog.RegionID
order by blog.ID
limit 5,4";

$statement3 = $pdo->prepare($sql3);
$statement3->execute();
$data3 = $statement3->fetchAll(); //data即是要回傳的資料


// 將查詢組成陣列

$response = [
"data01" => $data1,   //行程
"data02" => $data2,      //住宿
"data03" => $data3     //旅遊專欄
];

// 轉 JSON
$jsonData = json_encode($response);
// 
echo $jsonData;
?>