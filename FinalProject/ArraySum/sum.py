#Author: Diksha Pande
#Assingment : Sum of array element in python
import time
import multiprocessing.dummy as mp # uses threads instead of full processes
def something(duration=0.000001):
    """
    Function that needs some serious benchmarking.
    """
    time.sleep(duration)
    # You may return anything you want, like the result of a computation
    return 123

def test_my_stuff(benchmark):
    # benchmark something
    result = benchmark(sum_range)

    # Extra code, to verify that the run completed correctly.
    # Sometimes you may want to check the result, fast functions
    # are no good if they return incorrect results :-)
    assert result == 123

def sum_range(start_stop):
    duration =0.000001
    time.sleep(duration)
    start,stop=start_stop
    return sum(range(start,stop))

if __name__=="__main__":
    start=time.perf_counter()
    with mp.Pool(5) as p:
        my_sums=p.map(sum_range,[(1,500),(501,1000),(1001,5000)]) # sums from 1 to 300 (including 300)
        Finalsum=sum(my_sums) 
    end=time.perf_counter()
    print("The sum is", Finalsum)
    print("Time taken",end-start, "seconds." ) 