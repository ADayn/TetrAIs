<?php
$user=$_REQUEST["name"];
$pass=$_REQUEST["pass"];
$conn=mysqli_connect("127.0.0.1","root","","tetrais");
if ($conn->connect_error) {
    echo "<p>Connection failed:</p>";
}
$user_query = "select username, password_hash from users where username = '".$user."' and password_hash = '".$pass."';";
$user_result_set = @mysqli_query($conn, $user_query);
$users = mysqli_fetch_array($user_result_set);
if (count($users) == 0) {
    include 'signin.php';
}
else {
    include 'tetris.html';
}