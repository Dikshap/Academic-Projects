/*Source: Internet
  Assingment: Sum of array in java*/
import java.util.*;
import java.util.Random;


public class Summation extends Thread {

    private int[] arr;
    private int first, last, partial;
    public Summation(int[] arr, int first, int last)
    {
        this.arr = arr;
        this.first = first;
        this.last = Math.min(last, arr.length);
    }
    public int getPartialSum()
    {
        return partial;
    }
    public void run()
    {
        partial = sum(arr, first, last);
    }
    public static int sum(int[] arr)
    {
        return sum(arr, 0, arr.length);
    }
    public static int sum(int[] arr, int first, int last)
    {
        int total = 0;
        for (int i = first; i < last; i++) {
            total += arr[i];
        }
        return total;
    }
    /*public static int parallelSum(int[] arr)
    {
        return parallelSum(arr, Runtime.getRuntime().availableProcessors());
    }*/

    public static int parallelSum(int[] arr, int threads)
    {
        int size = (int) Math.ceil(arr.length * 1.0 / threads);

        Summation[] sums = new Summation[threads];

        for (int i = 0; i < threads; i++) {
            sums[i] = new Summation(arr, i * size, (i + 1) * size);
            sums[i].start();
        }

        try {
            for (Summation sum : sums) {
                sum.join();
            }
        } catch (InterruptedException e) { }

        int total = 0;

        for (Summation sum : sums) {
            total += sum.getPartialSum();
        }

        return total;
    }
    public static void main(String[] args)
    {
        Random rand = new Random();

        int[] arr = new int[50000];
        int k=5;
        for (int i = 0; i < arr.length; i++) {
            arr[i] = rand.nextInt(101) + 1; // 1..100
        }

        long start = System.currentTimeMillis();

        Summation.sum(arr);
        start = System.currentTimeMillis();

        Summation.parallelSum(arr,k);
        System.out.println("Parallel: " + (double)(System.currentTimeMillis() - start)); // Parallel: 25
    }
}
