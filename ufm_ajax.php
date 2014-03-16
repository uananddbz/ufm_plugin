<?php

include('ufm_class.php');

$base=$_POST['base'];
$fm=new ufm($base);


$url=$_POST['url'];

$files=$fm->show_files($url);
$links=$fm->breadcrumb($url);
echo json_encode(array('files'=>$files,'links'=>$links));

?>