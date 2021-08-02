/* Author: Diksha Pande
   Assingment: Matrix Multiplication threading in C++
*/

#include <iostream>
#include <pthread.h> 
#include <time.h> 
using namespace std;

#define MAX_THREAD 4 // maximum number of threads 
#define MAX 800 // maximum size of matrix
int counter = 0; 
int matrixM1[MAX][MAX]; //First input matrix
int matrixM2[MAX][MAX]; //Second input matrix
int matrixM3[MAX][MAX]; //Output matrix to store the result

  
void* MatrixMultiplication(void* arg) 
{ 
    int k = counter++; 
    for (int i = k * MAX / 4; i < (k + 1) * MAX / 4; i++)  // Each thread computes 1/4th of matrix multiplication 
        for (int j = 0; j < MAX; j++)  //we can change it to 5 if threads are 5
            for (int k = 0; k < MAX; k++)  
                matrixM3[i][j] += matrixM1[i][k] * matrixM2[k][j]; 

    return 0;
} 
int variance(int a[][3], int n, int m) 
{ 
    int sum = 0; 
    for (int i = 0; i < n; i++) { 
        for (int j = 0; j < n; j++) { 
  
            // subtracting mean from elements 
            a[i][j] -= m; 
  
            // a[i][j] = fabs(a[i][j]); 
            // squaring each terms 
            a[i][j] *= a[i][j]; 
        } 
    } 
  
    // taking sum 
    for (int i = 0; i < n; i++)  
        for (int j = 0; j < n; j++) 
            sum += a[i][j];     
  
    return sum / (n * n); 
} 
int main() 
{ 
    for (int i = 0; i < MAX; i++) { //As we are not giving hardcoded input, we have to generate random input
        for (int j = 0; j < MAX; j++) { 
            matrixM1[i][j] = rand() % 10; 
            matrixM2[i][j] = rand() % 10; 
        } 
    } 
    
    cout << "First Matrix" << endl; //Display First Matrix
    for (int i = 0; i < MAX; i++) { 
        for (int j = 0; j < MAX; j++)  
            cout << matrixM1[i][j] << " "; 
        cout << endl; 
    } 
  
    cout << "Second Matrix" << endl; //Display Second Matrix
    for (int i = 0; i < MAX; i++) { 
        for (int j = 0; j < MAX; j++)  
            cout << matrixM2[i][j] << " ";         
        cout << endl; 
    } 

    clock_t t1, t2; //decalring variable for start time and end time
    t1 = clock(); //take start time in t1
    pthread_t threads[MAX_THREAD]; //save number of threads
  
    
    for (int i = 0; i < MAX_THREAD; i++) { //Creating number of threads
        int* p; 
        pthread_create(&threads[i], NULL, MatrixMultiplication, (void*)(p)); 
    } 
  
   
    for (int i = 0; i < MAX_THREAD; i++)   // joining and waiting for all threads to complete 
        pthread_join(threads[i], NULL);     
     

    t2 = clock();//save the end time
    cout << endl << "Multiplication of First matrix and Second matrix" << endl;     // Displaying the result matrix 
    for (int i = 0; i < MAX; i++) { 
        for (int j = 0; j < MAX; j++)  
            cout << matrixM3[i][j] << " ";         
        cout << endl; 
    } 
    cout << "Time taken: " << (t2 - t1) /  (double)CLOCKS_PER_SEC << endl; //Print the time in seconds as result
    return 0; 
} 