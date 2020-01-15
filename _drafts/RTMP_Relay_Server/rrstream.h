#ifndef __RRSTREAM_H__
#define __RRSTREAM_H__

// #ifndef __RRSESSION_H__
// #define __RRSESSION_H__

#include "rrsession.h"
#include "rrbuffer.h"
#include <list>

using namespace std;

class RRStream{
private:
    list<RRSession> fromSessList;
    list<RRSession> toSesslist;
    RRBuffer buff;
    int strmState;
public:
    RRStream();
    void setSessList(int idx);
    ~RRStream();
};

// #endif

#endif
   
