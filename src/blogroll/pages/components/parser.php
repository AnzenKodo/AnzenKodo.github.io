<?php
$feeds_data = array();
$feed_key;
$handle = @fopen($feeds_file, "r");

if ($handle) {
	while (($line = fgets($handle, 4096)) != false) {
		if ($line[0] == "#") $feed_key = substr($line, 2);
		if ($line[0] == "-") {
			if (!array_key_exists($feed_key, $feeds_data)) $feeds_data[$feed_key] = array();
			array_push($feeds_data[$feed_key], rtrim(substr($line, 2)));
		}
	}

	if (!feof($handle)) {
		echo "Error: unexpected fgets() fail\n";
	}
} else {
	echo "Error: unable to open ", $feeds_file, " file\n";
}
?>