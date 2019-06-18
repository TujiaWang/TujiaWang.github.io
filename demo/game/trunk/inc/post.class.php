<?php
/* post.class.php

Copyright (c) 2011- SUN Junwen

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

require_once "common.inc.php";
require_once "ez_sql_core.php"; // Include ezSQL core
require_once "ez_sql_mysql.php"; // Include ezSQL database specific component

define("DB_USER", "tetris5");
define("DB_PSWD", "tetris5");
define("DB_NAME", "tetris5");
define("DB_HOST", "localhost");

/**
 * Post Class
 * 2011-6-23
 * @author Sun Junwen
 *
 */
class Post
{
	private $oper;
	
	function __construct($oper)
	{
		$this->oper = $oper;
	}
	
	/**
	 * 获得数据库连接
	 * @return ezSQL_mysql 对象
	 */
	public static function get_ezMysql()
	{
		// Initialise database object and establish a connection
		// at the same time - db_user / db_password / db_name / db_host
		if(!defined('DB_USER') || !defined('DB_PSWD') || !defined('DB_NAME') ||!defined('DB_HOST'))
			return null;
		$db = new ezSQL_mysql(DB_USER, DB_PSWD, DB_NAME, DB_HOST);
		
		$db->hide_errors();
		
		$ret = $db->query("set names 'utf8'");
		if((!is_numeric($ret) && !$ret))
		{
			return null;
		}
		
		return $db;
	}
	
	/**
	 * 执行操作
	 */
	public function do_oper()
	{
		switch($this->oper)
		{
			case "genid":
				$this->gen_id();
				break;
			case "result":
				$this->save_result();
				break;
			case "total":
				$this->get_result_total();
				break;
			case "best":
				$this->get_result_best();
				break;
			case "rank":
				$this->get_rank();
				break;
		}
	}
	
	/*
	 * 生成唯一 id
	 */
	private function gen_id()
	{
		$rand_client = post_query("rand"); // 客户端的随机数
		$rand_server = rand(); // 服务器端随机数
		$ip = $_SERVER['REMOTE_ADDR']; // 客户 IP
		$user_agent = "test"; // USER AGENT
		if(isset($_SERVER['HTTP_USER_AGENT']))
			$user_agent = $_SERVER['HTTP_USER_AGENT'];
		$time = time(); // 当前时间
		$str = $rand_client.$rand_server.$ip.$user_agent.$time;
		$id = md5($str);
		echo $id;
	}
	
	/*
	 * 根据得分，等级和时间计算排名
	 */
	private function get_result_rank($db, $score, $level, $time)
	{
		$query = "SELECT count(*) as `count` 
				FROM `results`
				WHERE score > $score"; // 得分更高
		$count_rows = $db->get_results($query, ARRAY_A);
		$count = $count_rows[0]['count'];
		
		$query = "SELECT count(*) as `count` 
				FROM `results`
				WHERE score = $score AND play_time < $time"; // 得分相同，时间更短的
		$count_rows = $db->get_results($query, ARRAY_A);
		$count += $count_rows[0]['count'];
		
		$query = "SELECT count(*) as `count` 
				FROM `results`
				WHERE score = $score AND play_time = $time AND level > $level"; // 得分相同，时间相同，级数更高
		$count_rows = $db->get_results($query, ARRAY_A);
		$count += $count_rows[0]['count'];
		return $count + 1;
	}
	
	/*
	 * 获得所有成绩
	 * 目前仅仅获得 Top5
	 */
	private function get_result_total()
	{
		$db = $this->get_ezMysql();
		if($db == null)
			return;
		
		$query = "SELECT name, score, level, play_time
				FROM `results`
				ORDER BY score DESC, play_time ASC, level DESC
				LIMIT 0 , 5";
		$rows = $db->get_results($query, ARRAY_A);
		$count = count($rows);
		for($i = 0; $i < $count; ++$i)
			$rows[$i]['rank'] = $i + 1; // 增加 rank 
		echo json_encode($rows); // 以 Json 形式输出
	}
	
	/*
	 * 获得当前用户的最好成绩
	 */
	private function get_result_best()
	{
		$id = post_query("id");
		if($id == "")
			return;

		$db = $this->get_ezMysql();
		if($db == null)
			return;
		
		$id = $db->escape($id);
		$query = "SELECT name, score, level, play_time
				FROM `results`
				WHERE id='$id'
				ORDER BY score DESC, play_time ASC, level DESC
				LIMIT 0 , 5";
		$rows = $db->get_results($query, ARRAY_A);
		
		// 为每条记录计算 rank
		$i = 0;
		foreach($rows as $row)
		{
			$score = $row['score'];
			$level = $row['level'];
			$time = $row['play_time'];
			$count = $this->get_result_rank($db, $score, $level, $time);
			$rows[$i++]['rank'] = $count;
		}
		
		echo json_encode($rows); // 以 Json 形式输出
	}
	
	/*
	 * 保存成绩
	 */
	private function save_result()
	{
		$db = $this->get_ezMysql();
		if($db == null)
			return;

		$id = $db->escape(post_query("id"));
		$name = $db->escape(htmlentities(post_query("name")));
		$score = post_query("score");
		$level = post_query("level");
		$play_time = post_query("playTime");
		$ip = $_SERVER['REMOTE_ADDR'];
		if(is_numeric($score) && is_numeric($level) && is_numeric($play_time))
		{
			$query = "INSERT INTO results VALUES('$id','$name','$ip',$score,$level,$play_time,NOW())";
			$row = $db->query($query);
			echo $row;
		}
	}
	
	private function get_rank()
	{
		$db = $this->get_ezMysql();
		if($db == null)
			return;
		
		$score = post_query("score");
		$level = post_query("level");
		$play_time = post_query("time");
		if(is_numeric($score) && is_numeric($level) && is_numeric($play_time))
		{
			$rank = $this->get_result_rank($db, $score, $level, $play_time);
			echo $rank;
		}
	}
	
}

?>