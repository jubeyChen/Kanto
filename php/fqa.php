<?php

include('Mysql.php'); //資料庫連線

$sql = 'SELECT * FROM question q 
    JOIN answer a 
    on q.answerID = a.ID;';

$statement = $pdo->prepare($sql);
$statement->execute();

$data = $statement->fetchAll(); //data即是要回傳的資料
echo json_encode($data); //仍然要echo出來給前端接 json_encode轉換成json格式
// print_r ($data);

?>