<?php
    $name = $_GET['name'];
    $id = $_GET['id'];
    $email = $_GET['email'];
    $time = $_GET['time'];
    file_put_contents("assets/database.txt",$id.','.$name.','.$email.','.$time.PHP_EOL , FILE_APPEND );
    echo "Saved";
?>