
#include "stampstream.h"

row:: row(int rows):new_row(rows)
{
}
int row::GetRow()const
{
  return new_row;
}
stampstream::stampstream(int col,int row) : ostream(new stampbuf(col,row))
{
}
stampstream::~stampstream()
{
	delete rdbuf();
}
ostream& endrow (ostream& os)
{
	stampbuf* buffer = dynamic_cast<stampbuf*> (os.rdbuf());
	os.flush();//function to flush the buffer
	(*buffer).sync();
	(*buffer).SetColoumn(0);
	(*buffer).SetRow((*buffer).GetRow()+1);
	return os;
}


ostream& operator<<(ostream& os,const row& nrow)
{
	stampbuf* buffer = dynamic_cast<stampbuf*> (os.rdbuf());
	os.flush();
	(*buffer).sync();
	(*buffer).SetRow(nrow.GetRow());
	(*buffer).SetColoumn(0);



	return os;
}
