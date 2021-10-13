<?php 

if(isset($_POST['submit'])){

    $name = $_POST['name'];
    $mailFrom = $_POST['email'];
    $message = $_POST['message'];

    $mailTo = "contact@ryanez.ca";
    $headers = "From: ".$mailFrom;
    $txt = "Vous avez reçu un courriel de la part de".$name.".\n\n".$message;

    mail($mailTo, $name, $txt, $headers);
    header("Location: contanct.html?mailsend");
}
