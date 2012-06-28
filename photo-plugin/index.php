<?php

$settings['pageID']='GeezersRidingBrotherhood';//Put the page id you want to show here. It can be a # or page name.
$settings['useAuth']=FALSE;//Change to true if the pictures don't show up. You may have a permissions issue.
$settings['picturesOnly']=FALSE;//This will, when true, remove the album selectors.
$settings['searchBar']=TRUE;//This will, when false, prevent people from searching tags.
$settings['lightBox']=TRUE;//Picture enlargement.

?>

<!Doctype html>
<html>
<head>
<?php
if (!$settings['picturesOnly']|$settings['searchBar']|$settings['lightBox']){//If active content then jquery is required.
	echo "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\"></script>";
	echo "<script src=\"js/script.js\"></script>";
}
?>
<link href="css/styles.css" rel="stylesheat" type="text/css">
</head>
<body>
<?php
	$albums=json_decode(file_get_contents("https://graph.facebook.com/".$settings['pageID']."/albums?")
	print_r($albums);


?>
</body>
</html>
