<?php
require_once "inc/common.inc.php";
require_once "inc/post.class.php";

$post = new Post(post_query("oper"));

$post->do_oper();

?>