#ifndef STAMPBUF
#define STAMPBUF

#include<iostream>

class stampbuf : public std::streambuf
{
	public:
		stampbuf(int col,int row);//Constructor for stampbuf
		~stampbuf();

		void SetRow(int current_row);//Function to set the value of row values
		void SetColoumn(int);//Function to set the value of column values
		int GetRow() const;//Function to get the row
		int GetColumn() const;//Function to get the column

		virtual int sync();//Virtual function sync
		virtual int overflow(int ch);//Virtual function overflow

	private:
		char* buffer;//Variable declaration
		int columns;
		int rows;
		int current_row;
		int current_col;



};

#endif
