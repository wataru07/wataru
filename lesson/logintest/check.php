<?php
	session_start();

	$post = $_POST;
	$name = $post['name'];
	$password = $post['password'];


	if(empty($name) || empty($password)){
		$_SESSION['TOKEN'] = '';
		header('location:http://localhost/github/lesson/logintest/login.php');
		exit();
	}

	$pdo = new PDO('mysql:dbname=php_lesson_db;host=localhost;charset=utf8','root','root');

	$query = "SELECT * FROM php_lesson_tbl WHERE NAME = :name AND PASSWORD = :password;";
	$stmt = $pdo -> prepare($query);

	$stmt -> bindParam(':name',$name);
	$stmt -> bindParam(':password',$password);

	$exec = $stmt->execute();

	var_dump($exec);


	$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if(empty($row)){
		$_SESSION['TOKEN'] = '';
		header('location:http://localhost/github/lesson/logintest/login.php');
	} else {
		$_SESSION['TOKEN'] = 'abcd';
		header('location:http://localhost/github/lesson/logintest/complete.php');
	}

	var_dump($row);



	// header('location:http://localhost/github/lesson/logintest/finish.php');

?>
