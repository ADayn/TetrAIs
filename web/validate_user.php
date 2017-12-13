<?php
$user=$_REQUEST["name"];
$pass=$_REQUEST["pass"];
$conn=mysqli_connect("127.0.0.1","root","","tetrais");
if ($conn->connect_error) {
    echo "<p>Connection failed:</p>";
}
$user_query = "select id, username, password_hash from users where username = '".$user."' and password_hash = '".$pass."';";
$user_result_set = @mysqli_query($conn, $user_query);
if ($user_result_set->num_rows == 0) {
    include 'index.php';
}
else {
    $id = mysqli_fetch_array($user_result_set)[0];
    setcookie('user_id',  $id, time() + (86400 * 7));
    include 'tetris.php';
}
?>
