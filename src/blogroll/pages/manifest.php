<?php
$data = (object)array(
  "name" => "AK#Blogroll",
  "author" => $json->name,
  "description" => "List of some awesome websites that you should subscribe.",
	"email" => $json->email,
  "home"=> $json->start_url,
  "start_url" => "{$json->start_url}blogroll",
  "background_color" => "#ffffff",
  "foreground_color" => "#000000",
  "theme_color" => "#0583f2",
  "display" =>"standalone",
  "orientation" => "portrait",
  "twitter" => $json->username,
	"portfolio" => $json->start_url,
	"icons" => [
		  "src" => "favicon.png",
      "type" => "image/png",
      "sizes" => "512x512"
	]
);
?>

