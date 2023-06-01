<?php

    include('Mysql.php'); //資料庫連線

    // 確保 Content-Type 是 application/json
    header('Content-Type: application/json');

    // 解析 JSON 資料
    $data = json_decode(file_get_contents('php://input'), true);
    
    $account = htmlspecialchars($data['account']);
    $password = htmlentities($data['password']);
        
    $sql = "SELECT * FROM backStageMember where Username = ? and PWD = ?";

    //執行
    //$statement = $pdo->query($sql);
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1, $account);
    $statement->bindValue(2, $password);
    $statement->execute();

    //抓出全部且依照順序封裝成一個二維陣列
    $data = $statement->fetchAll();

    if(count($data) > 0){
        echo 'success';
        session_start();
        $_SESSION["backMember"] = $account;

    }else{
        echo 'fail';
    }

?>