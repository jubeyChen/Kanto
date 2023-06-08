<?php

include('Mysql.php'); //資料庫連線

header('Content-Type: application/json');

$blogId = $_GET['id'];

$sql = 'SELECT b.ID blogID, b.Title, b.Content, b.BannerPC, b.Image1, b2.Content, b2.Image, b2.Times, b2.TimeTitle, b2.Sequence, r.RegionName
        FROM blog b
            join blogBlock b2 on b.ID = b2.BlogID
            join region r on b.RegionID = r.ID
            where b.ID = :blogId';
// $sql = 'SELECT b.id blogID, b.title, b.content, b.bannerpc, b.image1, b2.content, b2.image, b2.times, b2.timetitle, b2.sequence, r.RegionName
//         FROM blog b
//             join blogblock b2 on b.id = b2.blogid
//             join region r on b.regionid = r.ID
//             where b.id = :blogId';

$statement = $pdo->prepare($sql);
$statement->bindParam(':blogId', $blogId);
$statement->execute();

$data = $statement->fetchAll(); //data即是要回傳的資料
echo json_encode($data); //仍然要echo出來給前端接 json_encode轉換成json格式
// print_r ($data);

?>