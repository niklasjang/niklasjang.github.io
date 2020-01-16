#ifndef __RRLOG_H_
#define __RRLOG_H__

#include <stdio.h>
#include <string>
// #include <mutex>
// #include <memory>

using namespace std;

#define MAX_PRINT_LEN 2048
#define RRLOG(x) RRLog::GetInstance().log(x);
/*
How to use  RRLog::GetInstance().log("hello world");
*/

class RRLog {
private:
  RRLog() {};
  // RRLog& operator=(const RRLog&) = delete;
  // static RRLog* instance;
public:
  void log(string s);
  void log(const char msg[]);
  void logMacro(int line , const char* funcName, const char* msg );
  static RRLog& GetInstance(){
    //c++ 11에서는 정적 지역 변수 초기화 코드가 멀티쓰레드 환경에서도 딱 한 번 실행되어야 한다.
    //즉, 최신 컴파일러로 컴파일하면 이 코드는 쓰레드 안전하다. 
    static RRLog* instance = new RRLog();
    return *instance;
  }
};

#endif