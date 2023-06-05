<?php
// 检查文件是否成功上传
// $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

// if (isset($_FILES['introImg1']) && $_FILES['introImg1']['error'] === UPLOAD_ERR_OK) {
//     $fileTmpPath = $_FILES['introImg1']['tmp_name'];
//     $fileName = $_FILES['introImg1']['name'];
//     $fileSize = $_FILES['introImg1']['size'];
//     $fileType = $_FILES['introImg1']['type'];


//     // 设置目标存储路径
//     $targetPath = $ServerRoot . "/Kanto/dist/image/productPage/1" . $fileName;

//     // 移动文件到目标路径
//     if (move_uploaded_file($fileTmpPath, $targetPath)) {
//         // 文件移动成功，可以进行进一步处理，例如保存文件路径到数据库等
//         // 进一步的处理代码...
//         $response = array('targetPath' => $targetPath);

//         // 将数组转换为JSON格式
//         $jsonData = json_encode($response);

//         // 设置正确的Content-Type头
//         header('Content-Type: application/json');

//         // 输出JSON数据
//         echo $jsonData;
//         echo "文件上传成功！";
//     } else {
//         // 文件移动失败
//         echo "文件上传失败！";
//     }
// } else {
//     // 文件上传失败或未选择文件
//     echo "文件上传失败或未选择文件！";
// }



?>