<?php
require_once __DIR__.'/manifest.php';
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title><?= $data->name ?></title>
    <meta charset="UTF-8">
    <meta name="description" content="<?= $data->description ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="<?= $data->them_color ?>"/>

    <meta property="og:image" content="favicon.png">
    <meta property="og:image:width" content="500">
    <meta property="og:image:height" content="500">
    <meta property="og:type" content="website">
    <meta property="og:image:alt" content="<?= $data->name ?> logo">
    <meta property="og:url" content="<? $data->start_url ?>">
    <meta property="og:title" content="<?= $data->name ?>">
    <meta property="og:description" content="<?= $data->description ?>">

    <link rel="icon" href="favicon.png" type="image/png">
    <link rel="outline" href="feed.opml" type="text/x-opml">
    <link rel="manifest" href="manifest.json">
    <style>
      <?php require_once "components/styles.css" ?>
    </style>
  </head>
  <body>
    <a class="skip-to-content-link" href="#main">Skip to content</a>
    <header>
      <h1><a href="<?= $data->home ?>">AK</a>#Blogroll</h1>
      <p><?= $data->description ?> Get all the site's feed link in <a href="http://opml.org/">OPML</a> file, <a href="#opml">in bottom of the page</a>.</p>
    </header>
    <main id="#main">
       <?php 
          require 'components/logic.php' 
        ?>
    </main>
    <footer>
      <p id="opml"><a href="feed.opml">Download OPML</a></p>
      <p><a href="https://anzenkodo.github.io/license">LICENSE</a></p>
    </footer>
  </body>
</html>
