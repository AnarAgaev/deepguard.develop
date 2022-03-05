<?
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

     $post = $_POST;
     $subject = 'Заявка с квиза Лаборатория безопасности.';
     $phone = preg_replace("/[^0-9]/", '', $post['tel']);
     $time = $post['time'];
     $name = $post['name'];
     $msg = $post['msg'];
     $email_to = 'oogle.assa@gmail.com';
     $email_from = 'poz.89.89@yandex.ru';
     

    // # TEXT
    if($name) $message .= "Имя: {$post['name']}<br>";
     $message .= "Телефон: {$phone}<br>";
     if($time) $message .= "Удобное время: {$post['time']}<br>";
     if($msg) $message .= "Удобный мессенджер: {$post['msg']}<br>";
    // # не отправлять если есть чужая ссылка
     if(stristr($message, "http")) exit("http");
     

     // # отправка email
    //  $headers = "from:{$email_from}\nContent-Type: text/html; charset=UTF-8";
     $headers[] = 'MIME-Version: 1.0';
     $headers[] = 'Content-type: text/html; charset=UTF-8';
     $headers[] = 'To: Managers <' . $email_to . '>,';
     $headers[] = 'From: Quiz24.ru <example@quiz24.ru>';
     if(mail($email_to, $subject, $message, implode("\r\n", $headers))){
         echo 'send';
     }else{
         echo 'failed';
     }
?>
