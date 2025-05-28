<?php
// Load PHPMailer classes
require(__DIR__ . '/../inc/PHPMailer/src/Exception.php');
require(__DIR__ . '/../inc/PHPMailer/src/PHPMailer.php');
require(__DIR__ . '/../inc/PHPMailer/src/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

date_default_timezone_set("Africa/Lagos");
function send_mail($uemail, $subject, $body) {
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'support@domain.com';
        $mail->Password = 'Workingjdbfjs%hcfbjPassq4';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        // Recipients
        $mail->setFrom('support@domain.com', 'WordWise Support');
        $mail->addAddress($uemail); // Recipient's email
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->send();
        return 1;
    } catch (Exception $e) {
        // Log the error if needed: $e->getMessage()
        return 0;
    }
}
// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = "New Subscription from WordWise";
    // Admin email body (HTML)
    $admin_body = "
    <h2>WordWise Subscription Request</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
    ";
    // User confirmation email body (HTML)
    $user_body = "
    <p>Hi {$name},</p>
    <p>Thank you for your interest in <strong>WordWise</strong>! We’ll notify you once we launch.</p>
    <p>— The WordWise Team</p>
    ";
    $user_subject = "You're in! We'll notify you when WordWise launches";

    // Send to admin
    if (send_mail("admin@wordwise.com", $subject, $admin_body)) {
        // Only send confirmation if admin mail succeeded
        send_mail($email, $user_subject, $user_body);
        echo "Thank you for subscribing! We will notify you soon.";
    } else {
        echo "There was an error. Please try again later.";
    }

}
?>