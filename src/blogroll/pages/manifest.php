<?php
// Decode the JSON file
$data = (object)json_decode($json, true);

$data = (object)array(
  "name" => "AK#Blogroll",
  "author" => $data->name,
  "description" => "List of some awesome websites that you should subscribe.",
	"email" => $data->email,
  "home"=> $data->start_url,
  "start_url" => "{$data->start_url}blogroll",
  "background_color" => "#ffffff",
  "foreground_color" => "#000000",
  "theme_color" => "#0583f2",
  "display" =>"standalone",
  "orientation" => "portrait",
  "twitter" => $data->username,
	"portfolio" => $data->start_url,
	"icons" => [
		  "src" => "favicon.png",
      "type" => "image/png",
      "sizes" => "512x512"
	]
);
?>

