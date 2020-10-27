<?php
	session_start();
	if(isset($_SESSION['TOKEN']) && !empty($_SESSION['TOKEN'])){
		header('location:http://localhost/github/lesson/logintest/complete.php');
		exit();
	};

	var_dump($_SESSION['TOKEN']);
?>


<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title></title>
	<style type="text/css">
		

	</style>
</head>
<body>

	<h1>ログイン画面</h1>
	<form action="./check.php" method="post" autocomplete="off">
		<p>
			<label for="neme">氏名</label>
			<input id="name" type="name" name="name" placeholder="氏名">
		</p>
		<p>
			<label for="pass">パスワード</label>
			<input id="pass" type="password" name="password" placeholder="パスワード">
		</p>
		<p>
			<input type="submit" name="submit" value="login">
		</p>
	</form>

</body>
</html>