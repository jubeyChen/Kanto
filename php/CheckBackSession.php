<?php
    session_start();

    if (isset($_SESSION['backMember'])) {
        $response = [
            'isSessionValid' => true,
        ];
    } else {
        $response = [
            'isSessionValid' => false,
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);

?>