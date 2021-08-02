/* Author: https://www.geeksforgeeks.org/merge-sort-using-multi-threading/
   Assingment: Merge Sort threading in C++
*/
#include <iostream> 
#include <pthread.h> 
#include <time.h> 
using namespace std; 
#define THREAD_MAX 4// Number of threads 
#define MAX 50000 // Number of elements in array  / Size of array

int a[MAX]; // array of size MAX 
int part = 0; 
  
// merge function for merging two parts 
void merge(int start, int mid, int end) 
{ 
    int* left = new int[mid - start + 1]; 
    int* right = new int[end - mid]; 
  
    // part1 is size of left part and part2 is size of right part 
    int part1 = mid - start + 1;
    int part2 = end - mid;
    int i, j; 
  
    // storing values in left part 
    for (i = 0; i < part1; i++) 
        left[i] = a[i + start]; 
  
    // storing values in right part 
    for (i = 0; i < part2; i++) 
        right[i] = a[i + mid + 1]; 
  
    int k = start; 
    i = j = 0; 
  

    while (i < part1 && j < part2) {     // Merging in ascending order 
        if (left[i] <= right[j]) 
            a[k++] = left[i++]; 
        else
            a[k++] = right[j++]; 
    } 
  
    // insert remaining values from left 
    while (i < part1) { 
        a[k++] = left[i++]; 
    } 
  
    // insert remaining values from right 
    while (j < part2) { 
        a[k++] = right[j++]; 
    } 
} 
  

void merge_sort(int start, int end) // merge sort function 
{ 
    // calculating mid point of array 
    int mid = start + (end - start) / 2; 
    if (start < end) { 
  
        // calling first half 
        merge_sort(start, mid); 
  
        // calling second half 
        merge_sort(mid + 1, end); 
  
        // merging the two halves 
        merge(start, mid, end); 
    } 
} 
  
// thread function for multi-threading 
void* merge_sort(void* arg) 
{ 
    // which part out of 4 parts 
    int thread_part = part++; 
  
    // calculating start and end 
    int start = thread_part * (MAX / 4); 
    int end = (thread_part + 1) * (MAX / 4) - 1; 
  
    // evaluating mid point 
    int mid = start + (end - start) / 2; 
    if (start < end) { 
        merge_sort(start, mid); 
        merge_sort(mid + 1, end); 
        merge(start, mid, end); 
    } 
    return 0;
} 
  
// Driver Code 
int main() 
{ 
    // generating random values in array 
    for (int i = 0; i < MAX; i++) 
        a[i] = rand() % 100; 
  
    // t1 and t2 for calculating time for 
    // merge sort 
    clock_t t1, t2; 
  
    t1 = clock(); 
    pthread_t threads[THREAD_MAX]; 
  
    // creating 4 threads 
    for (int i = 0; i < THREAD_MAX; i++) 
        pthread_create(&threads[i], NULL, merge_sort, 
                                        (void*)NULL); 
  
    // joining all 4 threads 
    for (int i = 0; i < 4; i++) 
        pthread_join(threads[i], NULL); 
  
    // merging the final 4 parts 
    merge(0, (MAX / 2 - 1) / 2, MAX / 2 - 1); 
    merge(MAX / 2, MAX/2 + (MAX-1-MAX/2)/2, MAX - 1); 
    merge(0, (MAX - 1)/2, MAX - 1); 
  
    t2 = clock(); 
  
    // displaying sorted array 
    cout << "Sorted array: "; 
    for (int i = 0; i < MAX; i++) 
        cout << a[i] << " "; 
  
    // time taken by merge sort in seconds 
    cout << "Time taken: " << (t2 - t1) /  (double)CLOCKS_PER_SEC << endl; 
  
    return 0; 
}