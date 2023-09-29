<?php
$data = (object)array(
  "name" => "AK#Blogroll",
  "author" => $json->username,
  "description" => "List of some awesome websites that you should subscribe.",
  "email" => $json->email,
  "home"=> $json->website,
  "start_url" => "{$json->website}blogroll",
  "background_color" => "#ffffff",
  "foreground_color" => "#000000",
  "theme_color" => "#0583f2",
  "display" =>"standalone",
  "orientation" => "portrait",
  "twitter" => $json->username,
	"portfolio" => $json->website,
	"icons" => [
		  "src" => "favicon.png",
      "type" => "image/png",
      "sizes" => "512x512"
	]
);
?>

