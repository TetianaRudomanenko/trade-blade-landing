<?php
header('Content-Type: application/json; charset=utf-8');

if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Некорректный email'
    ]);
    exit;
}

$email = trim($_POST['email']);
$to = "rudomanenko.tatyana@gmail.com";
$subject = "Новая заявка с сайта TradeBlade";
$message = "Пользователь оставил email: $email";

$headers = "From: no-reply@tradeblade\r\n";
$headers .= "Reply-To: no-reply@tradeblade\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Не удалось отправить письмо'
    ]);
}
?>
