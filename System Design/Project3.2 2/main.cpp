#include <iostream>
#include "stamp.h"
#include "stampbuf.h"
#include "stampstream.h"
#include <stdexcept>
#include <string>

//using namespace stamping_press;
using namespace std;
int main()
{
  stampstream s(30,10);
  s << row(4) << row(3) << "ae" << 
       row(2) << row(1) << "io" << 
       row(0) << 'u' << " and sometimes 'y'";
  return 0;
}
