<?php
    $id = $_GET['id'];
    $time = $_GET['time'];
    file_put_contents("assets/attendance.txt",$id.','.$time.PHP_EOL , FILE_APPEND );
    echo "Saved";
?>