<?php

    session_start();
    session_unset();
    session_destroy();

    header("Location: ../dist/backLogin.html");

?>