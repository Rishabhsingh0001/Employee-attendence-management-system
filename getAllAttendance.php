<?php
    error_reporting(E_ALL ^ E_NOTICE);  
    $txt_file = file_get_contents('assets/attendance.txt'); //Get the file
    $rows = explode("\n", $txt_file); //Split the file by each line
    array_pop($rows);
?>

<html>
    <head>
        <style>
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
    </head>
    <body>
        <table>
            <tr>
                <th>Employe ID</th>
                <th>Attendance Date</th>
            </tr>
            <?php
                foreach ($rows as $row) {
                    $data = explode(",", $row); //Split the line by a space, which is the seperator between username and password
                    $id = $data[0];
                    $joined_datetime = $data[1];

                    echo "<tr>";
                    echo "<td>".$id. "</td>";
                    // echo "<td>".$name. "</td>";
                    echo "<td>".$joined_datetime. "</td>";
                    echo "</tr>";
                 }
            ?>
    </body>
</html>