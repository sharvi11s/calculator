
<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid request method.");
}

$username = trim($_POST["username"] ?? "");
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirmPassword = $_POST["confirm_password"] ?? "";

// Validate fields
if ($username === "" || $email === "" || $password === "" || $confirmPassword === "") {
    exit("All fields are required.");
}

if (strlen($username) > 50 || strlen($email) > 100) {
    exit("Input is too long.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

if (strlen($password) < 8) {
    exit("Password must contain at least 8 characters.");
}

if ($password !== $confirmPassword) {
    exit("Passwords do not match.");
}

// Hash password
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

try {

    $sql = "INSERT INTO users (username, email, password_hash)
            VALUES (:username, :email, :password_hash)";

    $stmt = $conn->prepare($sql);

    $stmt->execute([
        ":username" => $username,
        ":email" => $email,
        ":password_hash" => $passwordHash
    ]);

    echo "Registration successful!";

} catch (PDOException $e) {

    if ($e->getCode() === "23000") {
        echo "Email already registered.";
    } else {
        error_log($e->getMessage());
        echo "Registration failed. Please try again.";
    }

}

?>
