#ifndef __RRSESSION_H__
#define __RRSESSION_H__

#include <arpa/inet.h>
#include <sys/socket.h>

class RRSession{
private:
    struct sockaddr_in servAdr;
    struct sockaddr_in clntAdr;
public:
    RRSession();
    RRSession(struct sockaddr_in _servAdr, struct sockaddr_in _clntAdr) : servAdr(_servAdr) , clntAdr(_clntAdr){};
    void setServAdr(struct sockaddr_in _servAdr);
    void setClntAdr(struct sockaddr_in _clntAdr);
    sockaddr_in& getServAdr(void);
    sockaddr_in& getClntAdr(void);
    ~RRSession();
};

#endif
