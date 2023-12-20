<?php
  // Delete first element of array
  array_shift($feeds);

  foreach ($feeds as $subject => $values) {
    $subject_id = str_replace(" ", "+", strtolower($subject));

    echo "<h2 id=\"#$subject_id\"><a href=\"#$subject_id\">$subject</a></h2>";
    $opml .= "<outline title=\"$subject\" text=\"$subject\">";

    // $feeds = RSS::feed(["http://xahlee.info/comp/blog.xml", "https://www.jonashietala.se/feed.xml"]);
    $feeds = RSS::feed($values);
    foreach ($feeds as $feed) {
      echo "<details><summary>";
      $opml .= "<outline ";

      if ($feed->title) {
        echo $feed->title;
        $opml .= "text=\"$feed->title\" title=\"$feed->title\" ";
      }

      echo "
          <a href='$feed->link'>URL</a> |
          <a href='$feed->feed'>Feed</a>
        </summary>
      ";

      if ($feed->description) {
        echo "<p>$feed->description</p>";
      }

      $opml .= "htmlUrl=\"$feed->link\" language=\"english\" type=\"$feed->type\" xmlUrl=\"$feed->feed\"/>";
      echo "<ul>";

      $count = 0;
      foreach ($feed->item as $item) {
        echo "<li><a href='$item->link'>$item->title</a> <em>$item->date</em></li>";
        $count++;
        if ($count === 10) break;
      }

      echo "</ul></details>";
    }

    $opml .= "</outline>";
  }
?>
