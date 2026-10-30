
<?php
require_once "../backend/auth.php";
require_once "../backend/db.php";

$userId = $_SESSION["user_id"];

$sql = "SELECT expression, result, calculator_type, created_at
        FROM calculation_history
        WHERE user_id = :user_id
        ORDER BY created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->execute([":user_id" => $userId]);

$history = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>History | MyCalc</title>

    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/history.css">
</head>

<body class="history-page">

    <main class="history-container">

        <section class="history-heading">

            <p class="eyebrow">YOUR MYCALC ACTIVITY</p>

            <h1>Calculation History<span class="green-text">.</span></h1>

            <p>
                All your calculations, saved in one place.
            </p>

        </section>

        <?php if (count($history) > 0): ?>

            <section class="history-list">

                <?php foreach ($history as $item): ?>

                    <article class="history-item <?= htmlspecialchars($item["calculator_type"]) ?>">

                        <div class="history-item-top">

                            <span class="history-type">
                                <?= htmlspecialchars($item["calculator_type"]) ?> Calculator
                            </span>

                            <span class="history-date">
                                <?= htmlspecialchars($item["created_at"]) ?>
                            </span>

                        </div>

                        <p class="history-expression">
                            <?= htmlspecialchars($item["expression"]) ?>
                        </p>

                        <p class="history-result">
                            = <?= htmlspecialchars($item["result"]) ?>
                        </p>

                    </article>

                <?php endforeach; ?>

            </section>

        <?php else: ?>

            <section class="empty-history">

                <h2>No calculations yet!</h2>

                <p>
                    Your calculations will appear here once you start using MyCalc.
                </p>

            </section>

        <?php endif; ?>

        <a href="home.php" class="history-back">
            ← Back to Home
        </a>

    </main>

</body>
</html>
