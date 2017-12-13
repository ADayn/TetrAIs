<html>
<head>
    <title>"TetrAIs: Signin" </title>
<body>
<form enctype="multipart/form-data" action="validate_user.php">
    <p>Username:&nbsp <input type="text" name="name" size="10" maxlength="15" /></p>
    <p>Password:&nbsp <input type="text" name="pass" size="10" maxlength="15" /></p>
    <br>
    <input type="submit" value="Signin"/>
</form>
<form enctype="multipart/form-data" action="register.php">
    <p>Username:&nbsp <input type="text" name="name" size="10" maxlength="15" /></p>
    <p>Password:&nbsp <input type="text" name="pass" size="10" maxlength="15" /></p>
    <input type="submit" value="Register?">
</form>
<?php

?>
</body>
</html>