<?php

include('Mysql.php');

        $id = $_POST['loginID'];
        $pw = $_POST['loginPW'];


       //$sql = "SELECT * FROM member WHERE Account = :id and PWD = :pw"; //自訂義
       $sql = "SELECT * FROM members WHERE AccountID = ? and PWD = ?"; //用問號

       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料

       //$statement = $pdo->query($sql); //query是直接送給mysql
    //    $statement = $pdo->prepare($sql);
    //    $statement->bindParam(':id', $id); //檢查
    //    $statement->bindParam(':pw', $pw); //檢查
    //    $statement->execute();

        $statement = $pdo->prepare($sql);
        $statement->bindParam(1, $id); //檢查 第一個問號
        $statement->bindParam(2, $pw); //檢查 第二個問號
        $statement->execute();


       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll();

       //將二維陣列取出顯示其值
       if(count($data) > 0){
         session_start();
         $_SESSION['memberID'] = $id; //記錄到session
         header("Location: ../dist/member.html");

      //   foreach($data as $index => $row){
	   //     echo $row["Account"];   //欄位名稱
	   //     echo " / ";
	   //     echo $row["PWD"];    //欄位名稱
	   //     echo " / ";
	   //     echo $row["CreateDate"];    //欄位名稱
      //       echo "<br>";
      // }
       } else{
       echo '登入失敗';
       }
       

      

?>