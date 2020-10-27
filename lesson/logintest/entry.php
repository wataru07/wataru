<?php
	
	$post = $_POST;
	$name = $post['name'];
	$password = $post['password'];


	if(empty($name) || empty($password)){
		header('location:http://localhost/github/lesson/logintest/');
		exit();
	}



	$pdo = new PDO('mysql:dbname=php_lesson_db;host=localhost;charset=utf8','root','root');

	// $statement = $pdo->query("INSERT INTO php_lesson_tbl (NAME, PASSWORD) VALUES ('" . $name . "', '" . $password ."');");

	$query = "INSERT INTO php_lesson_tbl (NAME, PASSWORD) VALUES (:name, :password);";
	$stmt = $pdo -> prepare($query);

	$stmt -> bindParam(':name',$name);
	$stmt -> bindParam(':password',$password);

	$exec = $stmt->execute();

	header('location:http://localhost/github/lesson/logintest/finish.php');

?>