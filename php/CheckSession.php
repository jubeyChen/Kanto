<?php
session_start();

// 检查会话中是否存在已登录的用户信息
if (isset($_SESSION['memberID'])) {
    // 会话有效
    $response = [
        'isSessionValid' => true,
        'user' => $_SESSION['memberID']
    ];
} else {
    // 会话无效
    $response = [
        'isSessionValid' => false,
        'user' => ''
    ];
}

// 返回 JSON 格式的响应数据
header('Content-Type: application/json');
echo json_encode($response);
?>