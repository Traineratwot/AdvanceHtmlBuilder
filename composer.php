<?php
$scripts = '';
function recursive($dir)
{
	global $scripts;
	$files = scandir($dir);
	foreach ($files as $file) {
		if ($file == '.' || $file == '..') {
			continue;
		}
		$_file = $dir . DIRECTORY_SEPARATOR . $file;
		$_file = str_replace('/',DIRECTORY_SEPARATOR, $_file);
		$_file = str_replace('\\',DIRECTORY_SEPARATOR, $_file);
		if (is_dir($_file)) {
				recursive($dir . DIRECTORY_SEPARATOR . $file);
		} else {
			$scripts .= '<script src="'.$_file.'"></script>'."\n";
		}
	}
}
recursive('js/tools');
file_put_contents('main_js.html',$scripts);
echo $scripts;