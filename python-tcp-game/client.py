from socket import *

host = 'localhost'
port = 8089
addr = (host,port)

connection = socket(AF_INET, SOCK_STREAM)
connection.connect(addr)

response = ''

while True:

    if response != 'correct':
        data = input('Введите число предполагаемое число в формате "guess *Число*": \n').encode()
        connection.send(data)
        response = connection.recv(1024).decode()
        print(response)
    else :
        break

connection.close()




        