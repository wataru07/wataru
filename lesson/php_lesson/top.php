<?php
	$title = "top_page";

// 名前空間
	// name space ファイル名(ルートパス＋ファイル名);

	require_once "./function.php";

	$func = new funcphp();


?>

<!DOCTYPE html>
<html>
	<?php 
		require_once "./meta.php";
	 ?>

<body>
	<?php
		include_once "./header.html";
		$func -> outputTest("money");
	?>

	<?php
		include_once "./footer.html";
	?>
</body>
</html>