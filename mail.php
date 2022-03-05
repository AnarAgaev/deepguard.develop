<?php
header('Content-type: text/plain; charset=utf-8');
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

echo '<pre>';
var_dump($_POST);
echo '</pre>';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
include "vendor/autoload.php";
// можно несколько адресов, через запятую
$admin_email  = ["anar.n.agaev@gmail.com"];
$form_subject = 'Заявка';

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

$c = true;
$message = '';
$message2 = '';
foreach ( $_POST as $key => $value ) {
  if ( $value != ""  && $key != "admin_email" && $key != "form_subject" ) {
    if (is_array($value)) {
      $val_text = '';
      foreach ($value as $val) {
        if ($val && $val != '') {
          $val_text .= ($val_text==''?'':', ').$val;
        }
      }
      $value = $val_text;
    }
    $message2 .= "{$key}: {$value} \n";
    $message .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
    <td style='padding: 10px; width: auto;'><b>$key:</b></td>
    <td style='padding: 10px;width: 100%;'>$value</td>
    </tr>
    ";
  }
}
// Приложения
if($_FILES){
  $uploaddir = '/uploads/';
  foreach($_FILES as $file){
    // $extension = strtolower( end( explode('.', $file['name'][0]) ) );
    $extension = strtolower( $file['name'][0]);
    $deny = array(
      'phtml', 'php', 'php3', 'php4', 'php5', 'php6', 'php7', 'phps', 'cgi', 'pl', 'asp',
      'aspx', 'shtml', 'shtm', 'htaccess', 'htpasswd', 'ini', 'log', 'sh', 'js', 'html',
      'htm', 'css', 'sql', 'spl', 'scgi', 'fcgi'
    );
    if(in_array($extension, $deny)) exit(1);
    $filename_new = date("y.m.d") . '__' . date("H\-i\-s") . '.' . $extension;

    if(move_uploaded_file($file['tmp_name'][0], __DIR__.'/'.$uploaddir . $filename_new)){
      $link_file = 'http://' . $_SERVER['SERVER_NAME'] . '/uploads/' . $filename_new;
      $mail->addAttachment( __DIR__.'/'. '/uploads/' . $filename_new, $filename_new);
      $message .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; width: auto;'><b>Файл:</b></td>
      <td style='padding: 10px;width: 100%;'>$link_file</td>
      </tr>
      ";
    }

  }
}
$message = "<table style='width: 50%;'>$message</table>";

$phone = $_POST['phone'];

// От кого
$mail->setFrom('info@' . $_SERVER['HTTP_HOST'], 'Video Production ');

// Кому
foreach ( $admin_email as $key => $value ) {
  $mail->addAddress($value);
}
// Тема письма
$mail->Subject = $form_subject;


// Тело письма
$body = $message;
// $mail->isHTML(true);  это если прям верстка
$mail->msgHTML($body);



echo '$message = ' .$message;
$mail->send();

// include 'amo.php';
return true;

?>