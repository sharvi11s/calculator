
<?php

// Start session if one isn't already active
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check whether the user is logged in
if (!isset($_SESSION["user_id"])) {

    // Redirect to login page
    header("Location: ../html/login.html");
    exit;
}

?>
