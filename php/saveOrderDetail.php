<?php
// MySQL相關資訊

include('Mysql.php');
ini_set("display_errors", "On");

$MemberID = $_POST['memId'];
$shoppingList = json_decode($_POST['ShoppingList'], true);
$couponID = $_POST['couponId'];

// echo $couponID;

// 检查是否成功解析JSON
if ($shoppingList !== null) {
  // 遍历每个产品
  foreach ($shoppingList as $list) {
    $ProductID = $list['productID'];
    $Quantity = $list['count'];
    $ProductDetailID = $list['productDetailId'];

    // 在这里使用每个产品的数据进行你的操作
    // 例如，打印每个产品的标题
    // echo $ProductDetailID;
  }
} else {
  // JSON解析失败
  echo "Failed to decode JSON.";
}
// print_r($shoppingList) ;
// print_r ($shoppingList[0]['productID']);
//exit();


$sql = "INSERT INTO orders (MemberID, Timestamp) VALUES (?, NOW())";

$statement = $pdo->prepare($sql);
$statement->bindParam(1, $MemberID);
$statement->execute();

$affectedRow = $statement->rowCount();

if ($affectedRow > 0) {
  $orderID = $pdo->lastInsertId(); //取得最後一個ID: orderID

  $sql2 = "INSERT INTO orderDetail (OrderID, ProductID, ProductDetailID, Quantity) VALUES (?,?,?,?)";
  $statement2 = $pdo->prepare($sql2);
  $statement2->bindParam(1, $orderID);
  $statement2->bindParam(2, $ProductID);
  $statement2->bindParam(3, $ProductDetailID);
  $statement2->bindParam(4, $Quantity);

  $statement2->execute();

  $affectedRow2 = $statement2->rowCount();

  if ($affectedRow2 > 0) {

    if ($couponID !== '') {

      $sql3 = "UPDATE memberCoupon SET IsUsed = 1 WHERE MemberID = ? AND (CouponID = ? OR CouponID IS NULL)";
      $statement3 = $pdo->prepare($sql3);
      $statement3->bindParam(1, $MemberID);
      $statement3->bindParam(2, $couponID);
      $statement3->execute();
      $affectedRow3 = $statement3->rowCount();

      if ($affectedRow3 > 0) {
        echo "Done";
      } else {
        echo "coupon 更新失敗";
      }

    } else {
      echo "done";
    }

  } else {
    echo "orderDetail 新增失敗";
  }
} else {
  echo "order 新增失敗";
}
