import socket
import random

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 8089))
server.listen(1)

number = random.randint(0, 10)

connection, address = server.accept()

while True:
    try :
        request_number = int(connection.recv(1024).decode()[6:])
        print(request_number)
        if request_number == number :
            connection.send('correct'.encode())
            connection.close()
            break
        elif request_number > number :
            connection.send('less'.encode())
        elif request_number < number :
            connection.send('more'.encode())
        else :
            connection.send('Format error'.encode())
    except ValueError :
        connection.send('Format error'.encode())
server.close()