<?php
// Load plugins
require_once __DIR__.'/vendor/autoload.php';


// Read the JSON file
$json = (object)json_decode(file_get_contents(__DIR__.'/../data/config.json'), true);

$output = "../{$json->output}/blogroll/";
// Create a folder if it doesn't already exist
if (!file_exists($output)) {
    mkdir($output, 0777, true);
}

require_once 'pages/manifest.php';
file_put_contents("{$output}manifest.json", json_encode($data, JSON_PRETTY_PRINT));

require_once 'pages/favicon.php';
imagepng($im, "{$output}favicon.png");

$opml = "";
use \Dallgoot\Yaml;
$feeds = (array)Yaml::parseFile(__DIR__.'/../data/feed.yaml', 0, 0);
echo "Making php index.html file.";
ob_start();
require_once 'pages/index.php';
file_put_contents("{$output}index.html", ob_get_contents());

echo "Making opml file.";
ob_start();
require_once 'pages/opml.php';
file_put_contents("{$output}feed.opml", ob_get_contents());
?>