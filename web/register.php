<html>
<body>
<?php
$user=$_REQUEST["name"];
$pass=$_REQUEST["pass"];
$conn=mysqli_connect("127.0.0.1","root","","tetrais");
if ($conn->connect_error) {
    echo "<p>Connection failed:</p>";
}
$qid="SELECT MAX(id) from users;";
$result_set_id=@mysqli_query($conn, $qid);
$id=mysqli_fetch_array($result_set_id,MYSQLI_NUM)[0] + 1;
$query="INSERT INTO users VALUES (".$id.",'".$user."','".$pass."',0);";

$result=mysqli_query($conn, $query);
?>
</body>
</html>