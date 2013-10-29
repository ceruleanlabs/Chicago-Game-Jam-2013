<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>&lt;it's a metaphor for death&gt; | Chicago Game Jam 2013</title>

  <!-- Resources -->
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
  <script type="text/javascript" src="js/utilities/underscore-min.js"></script>
  <script type="text/javascript" src="js/crafty.js"></script>
  <script type="text/javascript" src="js/components/player.js"></script>
  <script type="text/javascript" src="js/components/movement.js"></script>
  <script type="text/javascript" src="js/components/graphics.js"></script>
  <script type="text/javascript" src="js/components/game_objects.js"></script>
  <script type="text/javascript" src="js/levelManager.js"></script>
  <script type="text/javascript" src="js/scenes/loading.js"></script>
  <script type="text/javascript" src="js/game.js"></script>
  <link href="css/common.css" rel="stylesheet" type="text/css">
  <link href='http://fonts.googleapis.com/css?family=Annie+Use+Your+Telescope' rel='stylesheet' type='text/css'>
</head>
<body>
  <h1>&lt;it's a metaphor for death&gt;</h1>
  <h2>Chicago Game Jam 2013</h2>
    <div id="container">
      <div id="cr-stage"></div>
      <div id="status" class="sidebar">
        <div id="lives"></div>
        <div id="timer"></div>
      </div>
      <div id="game-info" class="sidebar"></div>
      <div id="reset" class="sidebar">RESET</div>
    </div>

  Created by TJ Jacobs, Kevin Folk, <a href="https://twitter.com/wrigleykid">Tom Berg</a> and <a href="https://twitter.com/heymrbass">Dan Bergren</a>.
  For best results, use <a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a>.

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45209003-1', 'forkit-chigamejam2013.herokuapp.com');
  ga('send', 'pageview');

</script>

</body>
</html>
