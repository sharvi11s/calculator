
<?php

session_start();

require_once "db.php";

header("Content-Type: application/json");

// Check login
if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Please log in to save calculation history."
    ]);
    exit;
}

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

// Receive calculation details
$expression = trim($_POST["expression"] ?? "");
$result = trim($_POST["result"] ?? "");
$calculatorType = $_POST["calculator_type"] ?? "";

// Validate input
if ($expression === "" || $result === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Expression and result are required."
    ]);
    exit;
}

if (!in_array($calculatorType, ["simple", "engineering"], true)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid calculator type."
    ]);
    exit;
}

try {

    $sql = "INSERT INTO calculation_history
            (user_id, expression, result, calculator_type)
            VALUES (:user_id, :expression, :result, :calculator_type)";

    $stmt = $conn->prepare($sql);

    $stmt->execute([
        ":user_id" => $_SESSION["user_id"],
        ":expression" => $expression,
        ":result" => $result,
        ":calculator_type" => $calculatorType
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Calculation saved successfully!"
    ]);

} catch (PDOException $e) {

    error_log($e->getMessage());

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to save calculation."
    ]);
}

?>
