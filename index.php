<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php
      $meta = array(
        'title' => 'Where 200+ former Rick Perry aides work in Texas\' bureaucracy',
        'description' => 'More than 200 former aides of Gov. Rick Perry still work in the state\'s government. Our interactive shows where those former aides now work within the bureaucracy.',
        'thumbnail' => 'http://projects.statesman.com/news/perry-people/assets/share.png',
        'url' => 'http://projects.statesman.com/news/perry-people/',
        'twitter' => 'statesman'
      );
    ?>

    <title>Interactive: <?php print $meta['title']; ?> | Austin American-Statesman</title>
    <link rel="icon" type="image/png" href="//projects.statesman.com/common/favicon.ico">

    <link rel="canonical" href="<?php print $meta['url']; ?>" />

    <meta name="description" content="<?php print $meta['description']; ?>">

    <meta property="og:title" content="<?php print $meta['title']; ?>"/>
    <meta property="og:description" content="<?php print $meta['description']; ?>"/>
    <meta property="og:image" content="<?php print $meta['thumbnail']; ?>"/>
    <meta property="og:url" content="<?php print $meta['url']; ?>"/>

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@<?php print $meta['twitter']; ?>" />
    <meta name="twitter:title" content="<?php print $meta['title']; ?>" />
    <meta name="twitter:description" content="<?php print $meta['description']; ?>" />
    <meta name="twitter:image" content="<?php print $meta['thumbnail']; ?>" />
    <meta name="twitter:url" content="<?php print $meta['url']; ?>" />

    <link href="dist/style.css" rel="stylesheet">

    <link href='http://fonts.googleapis.com/css?family=Lusitana:400,700' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Merriweather+Sans:400,300,300italic,400italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <?php /* CMG advertising and analytics */ ?>
    <?php include "includes/advertising.inc";?>
    <?php include "includes/metrics-head.inc";?>
  </head>
  <body>
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="http://www.statesman.com/" target="_blank">
            <img width="273" height="26" src="assets/logo.png" />
          </a>
        </div>
        <ul class="nav navbar-nav navbar-right social hidden-xs">
          <li><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a></li>
          <li><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a></li>
          <li><a target="_blank" href="https://plus.google.com/share?url=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-google-plus"></i></a></li>
        </ul>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div id="sidebar" class="col-xs-12 col-sm-4 col-md-3">
          <div class="page-header">
            <h4>Texas Politics</h4>
            <h1>200+ former Perry aides spread throughout Texas government</h1>
            <p><small>Interactive by Andrew Chavez and Asher Price, Austin American-Statesman</small></p>
            <p>More than 200 former aides of Gov. Rick Perry work within Texas’ bureaucracy, which means Perry's outlook will likely shape the strategies and programs that make the state tick long after he himself leaves office at the end of this month. Our interactive charts where those former aides now work within the bureaucracy.</p>
            <?php /**<p><a href="#">Related story ></a></p> **/ ?>
          </div>

          <div id="chart-wrapper" class="col-xs-12 col-sm-8 col-md-9">
            <div id="chart"></div>
          </div>

          <form class="form">
            <div class="form-group">
              <p class="form-control-static">Size boxes:</p>
              <label class="radio-inline"><input type="radio" name="mode" value="size" checked> By current annual salary</label>
              <label class="radio-inline"><input type="radio" name="mode" value="count"> Equally</label>
            </div>
          </form>
          <hr />
          <h3>Top agencies</h3>
          <ul id="legend" class="list-group"></ul>
          <h3>Salary breakdown</h3>
          <ul class="list-group">
            <li id="salary-breakdown" class="list-group-item"></li>
          </ul>

     			<div class="center-block" id='div-gpt-ad-1403295829614-1' style='width:300px; height:250px; margin-bottom: 22px;'>
      			<script type='text/javascript'>
        			googletag.cmd.push(function() { googletag.display('div-gpt-ad-1403295829614-1'); });
      			</script>
    			</div>

          <p id="legal" class="center-block text-center"><small>© 2014 <a href="http://www.coxmediagroup.com" target="_blank">Cox Media Group</a>. By using this website, you accept the terms of our <a href="http://www.mystatesman.com/visitor_agreement/" target="_blank">Visitor Agreement</a> and <a target="_blank" href="http://www.mystatesman.com/privacy_policy/">Privacy Policy</a>, and understand your options regarding <a target="_blank" href="http://www.mystatesman.com/privacy_policy/#ad-choices">Ad Choices</a><img src="http://media.cmgdigital.com/shared/img/photos/2012/02/29/d3/da/ad_choices_logo.png" alt="AdChoices">.</small></p>
        </div>
      </div>
    </div>

    <?php /* CMG advertising and analytics */ ?>
    <?php include "includes/project-metrics.inc"; ?>
    <?php include "includes/metrics.inc"; ?>

    <script src="dist/scripts.js"></script>
  </body>
</html>
