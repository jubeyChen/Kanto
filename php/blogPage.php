<?php

include('Mysql.php'); //資料庫連線

$sql = 'SELECT b.id blogID, b.title, b.content, b.bannerpc, b.image1, b2.content, b2.content, b2.image, b2.times, b2.timetitle, b2.sequence, r.RegionName
        FROM blog b
            join blogblock b2 on b.id = b2.blogid
            join region r on b.regionid = r.ID;';

$statement = $pdo->prepare($sql);
$statement->execute();

$data = $statement->fetchAll(); //data即是要回傳的資料
echo json_encode($data); //仍然要echo出來給前端接 json_encode轉換成json格式
// print_r ($data);

?>