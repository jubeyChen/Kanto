<?php

include('Mysql.php'); //資料庫連線

//建立SQL語法
$sql = "SELECT * FROM mydb.members";

                //取得數據
$statement = $pdo->query($sql);
                //轉成二維陣列
$data = $statement->fetchAll();
        //回傳json
echo json_encode($data);
// print_r($data);

// $ID = $_POST["ID"];
// $Name = $_POST["FullName"];
// $Gender = $_POST["Gender"];
// $Account = $_POST["AccountID"];
// $Phone = $_POST["Phone"];

    // [0] => Array (
    //      [ID] => 1
    //      [0] => 1 
    //      [AccountID] => jubeyletgo@gmail.com 
    //      [1] => jubeyletgo@gmail.com
    //     [PWD] => kanto2023 
    //     [2] => kanto2023 
    //     [FullName] => 陳心慈 
    //     [3] => 陳心慈 
    //     [Gender] => female 
    //     [4] => female 
    //     [Phone] => 0912345678 
    //     [5] => 0912345678 
    //     [Avatar] => user1.jpg 
    //     [6] => user1.jpg 
    //     [Status] => 1 
    //     [7] => 1 )

?>