<opml version="2.0">
	<head>
		<title><?= $data->name ?></title>
		<dateCreated><?= date(DATE_RFC822) ?></dateCreated>
		<dateModified><?= date(DATE_RFC822) ?></dateModified>
		<ownerName><?= $data->author ?></ownerName>
		<ownerEmail><?= $data->email ?></ownerEmail>
		<ownerId><?= $data->portfolio ?></ownerId>
		<expansionState/>
	</head>
	<body>
		<?= $opml ?>
	</body>
</opml>
