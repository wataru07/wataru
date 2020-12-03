<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    // 送信
    public function onMessage(ConnectionInterface $from, $json) {
        $error_message = '';
        $numRecv = count ( $this->clients ) - 1;
        $param = $from->httpRequest->getRequestTarget();
        $array = json_decode($json, true);
        $fromRoom = $from->httpRequest->getRequestTarget();
        $fromRoom = str_replace($fromRoom, '/', '');

        foreach ($this->clients as $client) {
            $clientRoom = $client->httpRequest->getRequestTarget();
            $clientRoom = str_replace($clientRoom, '/', '');

            if ($from !== $client) {
                if ($fromRoom == $clientRoom) {
                    $client->send($msg);
                } // if ($fromRoom == $clientRoom)
            } //  if ($from !== $client)
        } // foreach
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}



?>