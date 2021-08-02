/*Author: Diksha Pande
Assingment: Matrix Multiplication in Java*/

import java.util.Random;
import java.util.Date;

public class MatrixMultiplication {

    //Creating the matrix
    static int[][] Matrix1 = new int[800][800];
    static int[][] Matrix2 = new int[800][800];
    static int[][] Matrix3 = new int[800][800];

    public static void main(String [] args){

        //Creating the object of random class
        Random rand = new Random();
        //Filling first matrix with random values
        for (int i = 0; i < Matrix1.length; i++) {
            for (int j = 0; j < Matrix1[i].length; j++) {
                Matrix1[i][j]=rand.nextInt(10);
            }
        }
        //Filling second matrix with random values
        for (int i = 0; i < Matrix2.length; i++) {
            for (int j = 0; j < Matrix2[i].length; j++) {
                Matrix2[i][j]=rand.nextInt(10);
            }
        }
        Date start = new Date();
        try{
            //Object of multiply Class
            Multiple multiple = new Multiple(4,4);
            //Threads
            Mthread thread1 = new Mthread(multiple);
            Mthread thread2 = new Mthread(multiple);
            Mthread thread3 = new Mthread(multiple);
            Mthread thread4 = new Mthread(multiple);
            //Implementing threads
            Thread th1 = new Thread(thread1);
            Thread th2 = new Thread(thread2);
            Thread th3 = new Thread(thread3);
            Thread th4 = new Thread(thread4);

            //Starting threads
            th1.start();
            th2.start();
            th3.start();
            th4.start();
            //Joining threads
            th1.join();
            th2.join();
            th3.join();
            th4.join();


          }catch (Exception e) {
              e.printStackTrace();
          }
        Date end = new Date();
        //Printing the result
        /*System.out.println("\n\nResult:");
        for (int i = 0; i < Matrix3.length; i++) {
            for (int j = 0; j < Matrix3[i].length; j++) {
                System.out.print(Matrix3[i][j]+" ");
            }
            System.out.println();
        }*/
        System.out.println("\nTime taken in milli seconds: " + (end.getTime() - start.getTime()));
    }//End main

}

class Multiple extends MatrixMultiplication {

    private int i;
    private int j;
    private int k;

    public Multiple(int i, int j){
        this.i=i;
        this.j=j;
        k=0;
    }

    //Matrix Multiplication Function
    public synchronized void multiplyMatrix(){

        int sum=0;
        int a=0;
        for(a=0;a<i;a++){
            sum=0;
            for(int b=0;b<j;b++){
                sum=sum+Matrix1[k][b]*Matrix2[b][a];
            }
            Matrix3[k][a]=sum;
        }
        if(k>=i)
            return;
        k++;
    }
}//End multiply class
class Mthread implements Runnable {

    private final Multiple mul;

    public Mthread(Multiple mul){
        this.mul=mul;
    }

    @Override
    public void run() {
        mul.multiplyMatrix();
    }
}
