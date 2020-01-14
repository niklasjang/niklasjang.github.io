#ifndef __RRMASTER_H__
#define __RRMASTER_H__


#define I_AM_WORKER 0
#define I_AM_DEAD -1
#define BUF_SIZE 500
#define MAX_PROCESS 100
/*
RTMP Relay Master Processor
*/
class RRMaster{
private:
    int master_sock, worker_sock;
	struct sockaddr_in master_adr, worker_adr;
	pid_t pid;
	struct sigaction act;
	socklen_t adr_sz;
	int str_len, state;
	char buf[BUF_SIZE];
    int workersPID[MAX_PROCESS];
    int workersCnt;
public:
    RRMaster(){
        master_sock = worker_sock = 0;
        memset(workersPID,0, sizeof(worksersPID));
        workersCnt = 0;
    }
    /*
    argv 처리
    */
    void RRM_init(void );
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
