#ifndef __RRLOG_H__
#include "rrlog.h"
#endif

void RRLog::log(string s){
    printf("%s\n", s.c_str());
}

void RRLog::log(const char* msg){
    printf("%s", msg);
    //logMacro(__LINE__, __FUNCTION__, msg);
}

void RRLog::logMacro(int line , const char* funcName, const char* msg ){
    printf("line %d : funcname %s : msg %s \n", line, funcName, msg);
}

