<!DOCTYPE html>
<html>

<?php
$conn = mysqli_connect("127.0.0.1","root","","tetrais");

function td($data) {
    return "<td>".$data."</td>";
}

function th($data) {
    return "<th>".$data."</th>";
}
?>

<head>
    <title> TetrAIs high scores </title>
    <link rel="stylesheet" href="styles/tetrais.css">
</head>

<body>
<h1 class="title">TetrAIs</h1>
<table>
    <tr>
        <?php
        echo th("Rank").th("Name").th("Score");
        ?>
    </tr>
    <?php
    $query = "select leader_name, score from leaderboards order by score desc;";
    $resultset = @mysqli_query($conn, $query);
    $rank = 1;
    while (($row = mysqli_fetch_array($resultset, MYSQLI_NUM)) && $rank < 11) {
        echo "<tr>";
        echo td($rank).td($row[0]).td($row[1]);
        echo "</tr>";
        $rank++;
    }
    ?>
</table>
<form id="play_again_form" enctype="multipart/form-data" action="tetris.php">
    <input id="play_again" type="submit" value="Play Again">
</form>
</body>
</html>