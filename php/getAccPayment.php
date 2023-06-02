<?php
include('Mysql.php'); // 資料庫連線

$sql = 'SELECT ID, AccountID, FullName, Phone FROM members';

$statement = $pdo->prepare($sql);
$statement->execute();

$data = $statement->fetchAll(PDO::FETCH_ASSOC); // Use PDO::FETCH_ASSOC to fetch data as an associative array

if (!empty($data)) {
  echo json_encode($data);
} else {
  echo json_encode([]);
}
?>
