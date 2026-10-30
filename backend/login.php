
<?php

session_start();

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid request method.");
}

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if ($email === "" || $password === "") {
    exit("Email and password are required.");
}

try {

    // Find user by email
    $sql = "SELECT id, username, email, password_hash
            FROM users
            WHERE email = :email";

    $stmt = $conn->prepare($sql);
    $stmt->execute([":email" => $email]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify password
    if ($user && password_verify($password, $user["password_hash"])) {

        session_regenerate_id(true);

        $_SESSION["user_id"] = $user["id"];
        $_SESSION["username"] = $user["username"];
        $_SESSION["email"] = $user["email"];

        header("Location: ../html/home.php");
        exit;

    } else {
        echo "Invalid email or password.";
    }

} catch (PDOException $e) {
    error_log($e->getMessage());
    echo "Something went wrong. Please try again.";
}

?>
