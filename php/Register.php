<?php

include('Mysql.php');

        $id = htmlspecialchars($_POST['registerID']);
        $pw = htmlentities($_POST['registerPW']);


       //建立SQL
       $sql = "INSERT INTO members(AccountID, PWD) VALUES (:id, :pw)";

       

       //執行
       $statement = $pdo->prepare($sql);
       $statement->bindValue(':id', $id);
       $statement->bindValue(':pw', $pw);
       $affectedRow = $statement->execute();


       if($affectedRow > 0){
              echo "<script>alert('註冊成功! 請您登入')</script>";
              header("Location: ../dist/loginRegister.html");
       }else{
              echo "新增失敗!";
       }

      

?>