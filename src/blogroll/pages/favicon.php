<?php
// Create a 40x40 image
$im = imagecreatetruecolor(512, 512);

// Make the background transparent
$black = imagecolorallocate($im, 0, 0, 0);
imagecolortransparent($im, $black);

// Draw a red rectangle
$col_ellipse = imagecolorallocate($im, 23, 32, 32);
imagefilledellipse($im, 255, 255, 512, 512, $col_ellipse);

// Draws text to the image
$font_path = __DIR__.'/Figtree.ttf';
$color = imagecolorallocate($im, 233, 14, 91);
$text = 'BR';
imagettftext($im, 250, 0, 50, 370, $color, $font_path, $text);
?>
