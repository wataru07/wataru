<?php

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

	<h1>ユーザー登録</h1>
	<form action="./entry.php" method="post" autocomplete="off">
		<p>
			<label for="neme">氏名</label>
			<input id="name" type="name" name="name" placeholder="氏名">
		</p>
		<p>
			<label for="pass">パスワード</label>
			<input id="pass" type="password" name="password" placeholder="パスワード">
		</p>
		<p>
			<input type="submit" name="submit" value="登録">
		</p>
	</form>

</body>
</html>