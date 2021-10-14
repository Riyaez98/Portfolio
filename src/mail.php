<?php $name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$formcontent="From: $name \n Message: $message";
$recipient = "contact@ryanez.ca";
$subject = "Portfolio : $email Vous a envoyé un message";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
// echo "Thank You!";
    header("Location: contact.html?mailsent");
?>