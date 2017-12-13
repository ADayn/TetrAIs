<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TetrAIs</title>
    <link rel="stylesheet" href="styles/tetrais.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="src/utils.js"></script>
    <script src="src/matrix.js"></script>
    <script src="src/colors.js"></script>
    <script src="src/game_type.js"></script>
    <script src="src/shape.js"></script>
    <script src="src/block.js"></script>
    <script src="src/game.js"></script>
    <script src="src/tetris.js"></script>
    <script src="src/runtime.js"></script>
    <script type="application/javascript">
        function submit_score() {
        	console.log("Submitting score: ", game.score, $("#leader_name").val());
            let ajaxurl = 'http://localhost/tetrais/save_score.php';
            let data = {
                'leader_name': $("#leader_name").val(),
                'score': game.score
            };
            $.post(ajaxurl, data, function (response) {
                window.location.href = "http://localhost/tetrais/high_scores.php";
            });
        }
    </script>
</head>
<body>
    <h1 class="title">Tetr<strike>AI</strike>s</h1>
    <div id="tetris">
        <div id="ai_board"></div>
        <div id="player_board"></div>
    </div>
</body>
</html>
