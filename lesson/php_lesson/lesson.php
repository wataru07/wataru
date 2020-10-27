<?php
	// var_dump("expression");
	// echo "<br>";
	// echo "string";

	// echo "<br>";
	// print("arg");

	// echo "<br>";
	// printf("format");

	// echo "<br>";
	// print_r("expression");

	// echo phpinfo();

	// $number = 'w';

	// var_dump($number);


	$pdo = new PDO('mysql:dbname=php_lesson_db;host=localhost;charset=utf8','root','root');

	$statement = $pdo->query('SELECT * FROM php_lesson_tbl;');
	var_dump($statement);

	$row = $statement->fetchAll(PDO::FETCH_ASSOC);

	var_dump($row);


?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>PHP lesson 1</title>
</head>
<body>

</body>
</html>