#ifndef __RRSTREAM_H__
#define __RRSTREAM_H__

#ifndef __RRSESSION_H__
#define __RRSESSION_H__

#include "rrsession.h"


stream 마다 session 2개
session 마다 host 2개

stream 마다 중간 buffer 1개ㅐ, mutex 1개

class RRStream : public RRSession{
private:
    list<RRsessiont> rr_strm_serv; // proxy가 client 일 때 연결된 server
    RRsessiont rr_strm_clnt; // proxy가 server 일 때 연결된 clnt
    RRMutex rr_strem_mutex;
    RRBuffer rr_stream_buff;
    bool isError = false;
    int errorIdxInInfos = -1;
public:
    addRRSession();
    removeRRSessiont();
    errorHandling(){
        에러가 있는 stream을 처리한다.
        sessino을 다시 맺는 것을 시도한다.
            기존의 주소로 재시도한다 q
            새로운 주소로 재시도한다 sock option so_RESUEADDR
        에러가 있는 stream만 제거하고 return true;
        모든 스트림 정보를 지워야 하면 return false;
    }
    canAccepts(){
        if(!isError) return true;
        else{
            errorHandling();
            
            return true;
        }
    }
}
   
