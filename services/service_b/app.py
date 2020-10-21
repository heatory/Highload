import time
from concurrent import futures
import grpc
import number_pb2
import number_pb2_grpc

class NumberServiceServicer(number_pb2_grpc.NumberServiceServicer):
    def Check(self, request, context):
        numbers = {'123': 321}
        response = number_pb2.Response()
        if numbers.get(request.number) != None :
            if numbers.get(request.number) == request.code :
                response.isOk = True
                response.message = ""
            else :
                response.isOk = False
                response.message = "Неверный код"
        else :
            response.isOk = False
            response.message = "Нет такого номера"
        return response
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=4))
    number_pb2_grpc.add_NumberServiceServicer_to_server(NumberServiceServicer(), server)
    print('Starting server on port 30043.')
    server.add_insecure_port('[::]:30043')
    server.start()
    try:
        while True:
            time.sleep(3600)
    except KeyboardInterrupt:
        server.stop(0)
if __name__ == '__main__':
    serve()