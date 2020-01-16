
#ifndef __RRTHREAD_H__
#include "rrthread.h"
#endif

RRThread::RRThread(){

}

void RRThread::RRMakeThread(char* argv){
}

THANDLE RRThread::createThread(thrfp routine, void * args){
    THANDLE id = 0;
    pthread_attr_t attributes;
    int ret;
    pthread_attr_init(&attributes);
    pthread_attr_setdetachstate(&attributes, PTHREAD_CREATE_DETACHED);
    ret = pthread_create(&id, &attributes, routine, args);
    if (ret != 0)
        // RRLog::GetInstance().log("hello world");
    // RTMP_LogPrintf("%s, pthread_create failed with %d\n", __FUNCTION__, ret);

    return id;
}

RRThread::~RRThread(){

}