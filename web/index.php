<html>
<head>
    <title>TetrAIs</title>
    <link rel="stylesheet" href="styles/tetrais.css">
<body>
<h1 class="title">Tetr<strike>AI</strike>s</h1>
<div id="login">
    <form enctype="multipart/form-data" action="validate_user.php" id="sign_in">
        <input type="text" name="name" placeholder="Username"/>
        <input type="password" name="pass" placeholder="Password"/>
        <input type="submit" value="Sign In" style="height: 30px;"/>
    </form>
    <form enctype="multipart/form-data" action="register.php" id="register">
        <input type="text" name="name" placeholder="Username"/>
        <input type="password" name="pass" placeholder="Password"/>
        <input type="submit" value="Register" style="height: 30px;">
    </form>
</div>
</body>
</html>