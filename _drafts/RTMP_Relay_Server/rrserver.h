/*
RTMP Relay Server
*/


#ifndef __RRMASTER_H__
#define __RRMASTER_H__

#include "rrstream.h"
#include "rrsession.h"
#include "rrbuffer.h"
#include "rrlog.h"
#include "rrthread.h"
#include "rrrest.h"
#include <list>

using namespace std;


class RRServer{
private:
    list<RRStream> strmList;
    unsigned int strmCnt;
    RRRest servRest;
    RRRest clntRest;
public:
    RRServer(){};
    void createServSock(list<RRStream>& strmList);
    void createThread(char* argv);

};

#endif
