#include "stampbuf.h"
#include "stamp.h"
using namespace stamping_press;

stampbuf::stampbuf(int col,int row) : columns(col),current_row(row),buffer(new char[col/2])
{//Constructor Initialization
	SetRow(0);//Set the row value to 0
	SetColoumn(0);//Set the column value to 0
	setp(buffer, buffer+col/2);//setp buffer
	try{
	insert_plate(col,row);//Function to insert
}catch(std::logic_error){}
}
int stampbuf::sync()//get the contents of the buffer out to the stamping press
{
	char*i;
	for(i = pbase();i!=pptr();++i){//initializing character i to pbase
		try{
			set_die(*i);
		}
		catch(std::invalid_argument){
			if(*i==get_die())//This function returns a character representing the die held by the stamping arm.
			{}
			else{
				current_col++;
				continue;
			}
		}
		try{stamp(current_col,current_row);}
		catch(std::logic_error){ }
		current_col++;
	}
	setp(buffer, buffer+columns/2);

	return 0;
}
int stampbuf::overflow(int character)
{

	sync();//Calling the sync function
	setp(buffer, buffer+columns/2);
	sputc(character);
	return character;
}
void stampbuf::SetColoumn(int c)//Function to set the column values
{
    current_col=c;
}
int stampbuf::GetColumn() const//function to get the column values
{
    return current_col;
}

int stampbuf::GetRow() const//function to get the row values
{
    return current_row;
}

void stampbuf::SetRow(int rowNo)//function to set the row values
{
	current_row = rowNo;
}
stampbuf::~stampbuf()//Destructor for stambuf
{
	sync();//function call to sync function
	try{
	eject_plate();//function call to eject_plate
}catch(std::logic_error){}
	delete[]buffer;//deleting the buffer

}
