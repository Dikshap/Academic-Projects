#include<iostream>
#include "stampbuf.h"
#include "stamp.h"
using namespace std;

class row
{
public:
    row(int r);
		int GetRow() const;//function to get the row value
		int GetColumn() const;//function to get the column value

private:
    int new_row;
};

class stampstream : public std::ostream{

	public:
		stampstream(int row,int col);//constructor
		~stampstream();//destructor

};

ostream& operator<<(ostream& os,const row& nrow);
ostream& endrow (ostream& os);//this is like endl, write a function with the same signature as endl.
