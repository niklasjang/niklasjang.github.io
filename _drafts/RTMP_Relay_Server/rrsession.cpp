#include "rrsession.h"

RRSession::RRSession( sockaddr_in _servAdr, sockaddr_in _clntAdr) : servAdr(_servAdr) , clntAdr(_clntAdr) {
    //Empty
}

void RRSession::setServAdr(sockaddr_in _servAdr) {
    servAdr = _servAdr;
}

void RRSession::setClntAdr( sockaddr_in _clntAdr){
    clntAdr= _clntAdr;
}

sockaddr_in& RRSession::getServAdr(void){
    return servAdr;
}

sockaddr_in& RRSession::getClntAdr(void){
    return clntAdr;
}

RRSession::~RRSession(){
    //Empty
}