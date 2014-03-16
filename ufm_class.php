<?php
function file_size($url){

	$size = filesize($url);
	if($size >= 1073741824){
		$fileSize = round($size/1024/1024/1024,1) . 'GB';
	}elseif($size >= 1048576){
		$fileSize = round($size/1024/1024,1) . 'MB';
	}elseif($size >= 1024){
		$fileSize = round($size/1024,1) . 'KB';
	}else{
		$fileSize = $size . ' bytes';
	}
	return $fileSize;


}


class ufm {

public $base;

//auto run function
function __construct($value) {
$this->base=$value;
	}
//file size function


//show files and folder list

function show_files($url=null) {
$data=array();
$result=scandir($this->base.'/'.$url);
for ($i=0; $i<count($result); $i++)
{
$file=$this->base.'/'.$url.'/'.$result[$i];

if ($result[$i]=='.' || $result[$i]=='..') {}
else {
$type=(is_dir($file)?'folder':'file');
array_push($data,array('name'=>$result[$i],'type'=>$type,'size'=>file_size($file)));
}
}

return $data;
}


//show nav path
function breadcrumb($url=null) {
if ($url!='') {
$links=explode("/",$url);
return $links;
}
else
return array();
}

}

?>