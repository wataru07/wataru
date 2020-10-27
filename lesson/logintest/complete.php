<?php
	session_start();
	if(isset($_SESSION['TOKEN']) && !empty($_SESSION['TOKEN'])){
	}else{
		header('location:http://localhost/github/lesson/logintest/login.php');
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
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script type="text/javascript">
		
		$(function(){
			$('#button').on('click',function(){
				$.ajax({
					url:'http://localhost/github/lesson/logintest/api.php',
				})
				.done(function(data){
					console.log('accessed');
					window.location.href = 'http://localhost/github/lesson/logintest/login.php';
				})
				.fail(function(){
					console.log('fail');
				});
			});
		});
	</script>
</head>
<body>
	<h1>login</h1>
	<button id="button">sign out</button>
</body>
</html>