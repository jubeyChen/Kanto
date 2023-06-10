<?php
    session_start();

    if (isset($_SESSION['backMember'])) {
        $response = [
            'isSessionValid' => true,
            'user' => $_SESSION['backMember']

        ];
    } else {
        $response = [
            'isSessionValid' => false,
            'user' => ''

        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);

?>