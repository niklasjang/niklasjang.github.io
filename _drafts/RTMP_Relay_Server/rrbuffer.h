#ifndef __RRBUFFER_H__
#define __RRBUFFER_H__

#include <mutex>

using namespace std;

class RRBuffer{
private:
    int policy; //버퍼 flush 정책
    unsigned int buffSize;
    mutex mtx;
public:
    RRBuffer();
    void setBufferSize(unsigned int buffsize);
    unsigned int getBufferSize(void);
    void chngBuffplcy(int opt);
    void flushBuffer(void);
};

#endif


