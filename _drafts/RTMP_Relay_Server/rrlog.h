#ifndef __RRLOG_H_
#define __RRLOG_H__

#include <cstdio>
#include <mutex>
#include <memory>

using namespace std;

class RRLog {
 public:
  static RRLog &getInstance() {
    call_once(RRLog::mOnceFlag, []() {
      printf("RRLog Instance is created...\n");
      mInstance.reset(new RRLog);
    });

    return *(mInstance.get());
  }

  void log() {
    printf("hello\n");
  }


 private:
  static unique_ptr<RRLog> mInstance;
  static once_flag mOnceFlag;

  RRLog() = default;
  RRLog(const RRLog &) = delete;
  RRLog &operator=(const RRLog &) = delete;
};

unique_ptr<RRLog> RRLog::mInstance;
once_flag RRLog::mOnceFlag;

#endif 



int main() {
  RRLog::getInstance().log();
  RRLog::getInstance().log();

  return 0;
}

#endif