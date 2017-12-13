<?php
$id = $_COOKIE["user_id"];
$leader_name = $_REQUEST["leader_name"];
$score = $_REQUEST["score"];

$conn=mysqli_connect("127.0.0.1","root","","tetrais");
if ($conn->connect_error) {
    echo "<p>Connection failed:</p>";
}
$query="INSERT INTO leaderboards VALUES (".$id.",'".$leader_name."',".$score.");";

$result=mysqli_query($conn, $query);

echo $query;
