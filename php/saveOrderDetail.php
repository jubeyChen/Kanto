<?php
// MySQL相關資訊
include('Mysql.php');


try {
    // 建立PDO物件，並放入指定的相關資料
    $pdo = new PDO($dsn, $db_user, $db_pass);

    // 設定PDO錯誤模式為例外拋出
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 執行INSERT語句
    $sql = "INSERT INTO orders (MemberID, Timestamp) VALUES (?, NOW())";
    $statement = $pdo->prepare($sql);
    $memberID = $_POST['MemberID']; // Assuming you're retrieving the value from the POST request
    $statement->execute([$memberID]);

    echo "Row inserted successfully.";
    echo "MemberID: " . $memberID;
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
