#ifndef __RRMASTER_H__
#define __RRMASTER_H__


#define I_AM_WORKER 0
#define I_AM_DEAD -1
#define BUF_SIZE 1024*3
#define MAX_PROCESS 100
#define BACKLOG_SIZE 10 //연결요청 대기 큐의 크기
/*
RTMP Relay Master Processor
*/
class RRMaster{
private:
    int serv_sock; //서버소켓 : cltn의 연결 요청을 받아들이는 소켓
    int clnt_sock; //클라소켓 : cltn와 연결된 소켓
	struct sockaddr_in serv_adr; //serv_sock의 bind에 사용됨
	struct sockaddr_in clnt_adr; //accept()에 사용됨
	pid_t pid;
	struct sigaction act; // sigaction()에 사용됨
	socklen_t clnt_adr_size; //accept() : 주소 변수 크기 전달 -> 주소정보 길이 채워짐
	int str_len;
    int state; //setsockopt()에 사용됨
	char buf[BUF_SIZE];
    int workersPID[MAX_PROCESS];
    int workersCnt;
    typedef enum{
        RR_STATE_NULL,
        RR_STATE_ACCEPTING,
        RR_STATE_PAUSED,
        RR_STATE_ERROR,
        RR_STATE_WAITING
    }RR_STATE;
public:
    RRMaster(){
        serv_sock = clnt_sock = 0;
        memset(workersPID,0, sizeof(worksersPID));
    }
    /*
    argv 처리
    */
    void RRM_init(void );
    /*
    소켓 옵션 처리
    */
    void RRM_setSockOpts(void);

    /*
    socket 생성 - bind - listen
    */
    void RRM_ready(void );
    /*
    controlMasterThread
    */
    void RRM_createControlThread(void);
    /*
    RRM_run
    */
    void RRM_run(void);

    /*
    pingpong with worker[wrkIdx] process
    */
    void RRM_pingpong(int wrkIdx){
       
    }

    /*
    show worker infos
    */
    void RRM_showWorkerInfos(void){
        for(int i=0; i<wrkCnt; i++){
            cout<<"worker "<< i<<"is "<<workers[i]->state<<"\n";
            cout<<"worker "<< i<<"is "<<workers[i]->sessions->client->ip<<"\n";
        }
    }

    void signalHandler(int sig);
}   
