<?php
include('Mysql.php'); // 資料庫連線

session_start();

// Get the ID from the POST request
$id = $_SESSION['memberID'];
// echo $id;

$sql = 'SELECT ID, AccountID, FullName, Phone FROM members WHERE accountId=?';

$statement = $pdo->prepare($sql);
$statement->bindParam(1, $id); 
$statement->execute();

$data = $statement->fetchAll(PDO::FETCH_ASSOC); // Use PDO::FETCH_ASSOC to fetch data as an associative array

if (!empty($data)) {
  echo json_encode($data);
} else {
  echo json_encode([]);
}

?>
