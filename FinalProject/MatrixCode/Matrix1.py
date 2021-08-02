# Author: Diksha Pande
# Assingment: Matrix Multiplication threading in Python
from threading import Thread
import random
import math
import numpy as np
import threading
import time

if __name__=="__main__":

    M1 = []
    M2 = []
    M3 = []

    N = int(input("Enter the value of  N to generate NxN matrix : "))# enter the value of N
    Nothreads = int(input("Enter the number of threads : "))# enter input value of number of threads

    M1 = np.random.random((N,N))#generating random numbers for first matrix
    M1 = M1 * 10
    M1 = M1.astype(int)
    
    M2 = np.random.random((N,N))#generating random numbers for second matrix
    M2 = M2 * 10
    M2 = M2.astype(int)
    
    M3 = np.zeros((N,N))#appending zeros for resultant M3 matrix
    M3 = M3.astype(int)
    
    start_time = time.time()# Initializing the start time
    thread_handle = []
    def Matrix_Multiplication(start,end):#function defination for matrix multiplication
        for i in range(start,end):
            for j in range(N):
                for k in range(N):
                    M3[i][j] += int(M1[i][k] * M2[k][j])#adding the answer in the resultant M3 matrix
    

    for j in range(0,Nothreads):#creating thread and calling the function matrix multiplication
        t = Thread(target = Matrix_Multiplication, args=(int((N/Nothreads) * j),int((N/Nothreads) * (j+1))))
        thread_handle.append(t)
        t.start()   
        
    for j in range(0,Nothreads):
        thread_handle[j].join()
    
    end_time = time.time()#initializing the end time
    
    print("The time taken to multiply two matrix is  " + str(end_time - start_time))#printing the final time