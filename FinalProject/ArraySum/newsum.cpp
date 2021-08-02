#include <iostream> 
#include <pthread.h> 
#include <time.h>
// size of array 
#define MAX 1000
  
// maximum number of threads 
#define MAX_THREAD 5
  
using namespace std; 
  
int a[] ={MAX}; 
int sum[5] = { 0 }; 
int counter = 0; 
  
void* sum_array(void* arg) 
{ 
  
    // Each thread computes sum of 1/4th of array 
    int thread_part = counter++; 
  
    for (int i = thread_part * (MAX / 5); i < (thread_part + 1) * (MAX / 5); i++) 
        sum[thread_part] += a[i]; 
    
    return 0;
} 
  
// Driver Code 
int main() 
{ 
  
    pthread_t threads[MAX_THREAD]; 
    clock_t t1, t2; //decalring variable for start time and end time
    t1 = clock();
    for (int i = 0; i < MAX_THREAD; i++) 
        pthread_create(&threads[i], NULL, sum_array, (void*)NULL); 
  
    for (int i = 0; i < MAX_THREAD; i++) 
        pthread_join(threads[i], NULL); 
  
    int total_sum = 0; 
    for (int i = 0; i < MAX_THREAD; i++) 
        total_sum += sum[i]; 
    t2=clock();
    cout << "Time taken: " << (t2 - t1) /  (double)CLOCKS_PER_SEC << endl;
  
    return 0; 
} 