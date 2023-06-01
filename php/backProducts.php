<?php

include('Mysql.php'); //資料庫連線

header('Content-Type: application/json');


$sql = 'SELECT product.ID,product.Name,region.RegionName,productType.TypeName FROM product
JOIN productType ON productType.ID = product.ProductTypeID
JOIN region ON region.ID = product.RegionID
ORDER BY product.ID';

$statement = $pdo->prepare($sql);

$statement->execute();

$data = $statement->fetchAll(); //data即是要回傳的資料
echo json_encode($data); //仍然要echo出來給前端接 json_encode轉換成json格式
// print_r ($data);

?>