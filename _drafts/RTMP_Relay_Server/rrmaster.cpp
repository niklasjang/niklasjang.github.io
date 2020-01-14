#include <iostream>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>
#include <signal.h>
#include <getopt.h>
#include <assert.h>
#include <string>

#include "librtmp/rtmp_sys.h"
#include "librtmp/log.h"

#include "rrthread.h"

/*
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>
#include <arpa/inet.h>
#include <sys/socket.h>
*/

using namespace std;

enum{
    RR_STATE_NULL,
    RR_STATE_ACCEPTING,
    RR_STATE_PAUSED,
    RR_STATE_ERROR,
    RR_STATE_WAITING
}
void RRError(string){

}

void RRServRoutine(void){
    //패킷 읽어서 버퍼에 저장

    //RTMP_HandShake()
    while(RTMP_isConnected() && RTMP_readpacket() ){
        //RTMP_Servepacket()
    }
    //RTMP_Packet_Free()
    chapter 13 데이터 송수신 함수


    //RRBuffer 만들어서 RRclntRoutine과 공유?
}

void RRClntRoutine(void){
    //버퍼에서 패킷 읽어서 relay
    //RTMP_HandShake()
    while(RTMP_isConnected() && RTMP_readpacket() ){
        //RTMP_Servepacket()
    }
    //RTMP_Packet_Free()
    chapter 13 데이터 송수신 함수
}
void doRelay(strm_serv_thrd, strm_clnt_thrd){
    //strm_serv_thrd 생성
    RRCreateThread(strm_serv_thrd, RRServRoutine);

    //strm_clnt_thrd 생성
    RRCreateThread(strm_clnt_thrd, RRClntRoutine);
}

void RRMakeStream(int serv_sock ){
    static RRStream s_streamInfos ;

    //accept 계속 반복
    while(s_streamInfos.canAccepts()){
        strm_serv_sock=accept(serv_sock, (struct sockaddr*)&clnt_adr, &clnt_adr_sz);	

        //dummy API Call
        //strm_serv_addr = getMediaInstanceAddr()

        //make connection with mediaInstance
        strm_clnt_sock= sock()
        bind(strm_clnt_sock)
        connection(strm_clnt_sock, strm_serv_addr )

        //add streamInfo
        RRBuffer rrbuf;
        s_streamInfos.addStream(sessionInfo, sessionInfo, rrbuf);
        
        doRelay(strm_serv_thrd, strm_clnt_thrd )
        
    }
    //모든 스트림이 종료됨
    return ;
    
}



void RRStartRelay(char * argv[]){
    int RRState = RR_STATE_NULL; //RR program state
    int serv_sock; //socket as serve
    int clnt_sock; //socket as client
    struct sockaddr_in serv_adr; // connection listening server socket
    struct sockaddr_in clnt_adr; // connection calling client socket
    //create server socket : get connections from client
	serv_sock = socket(PF_INET, SOCK_STREAM, 0);
    if(serv_sock == -1){
        cout<<"Error"<< endl;
        RRState = RR_STATE_ERROR;
        exit(1);
    }

    /** set_socket option */
    // TODO 

    /* bind */
    memset(&serv_adr, 0, sizeof(serv_adr));
    serv_adr.sin_family = AF_INET;
    serv_adr.sin_addr.s_addr = htonl(INADDR_ANY);
    serv_adr.sin_port=htons(atoi(argv[1]));
	
    
    if(bind(serv_sock, (struct sockaddr*)&serv_adr, sizeof(serv_adr))==-1)
		//error_handling("bind() error");
	/* listen */
	if(listen(serv_sock, 5)==-1)
		//error_handling("listen() error");

    RRMakeStream(serv_sock)
}



void read_childproc(int sig)
{
	pid_t pid;
	int status;
	pid=waitpid(-1, &status, WNOHANG);
	printf("removed proc id: %d \n", pid);
}
void error_handling(char *message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	exit(1);
}

int main(int argc, char *argv[])
{
	int master_sock, worker_sock;
	struct sockaddr_in master_adr, worker_adr;
	pid_t pid;
	struct sigaction act;
	socklen_t adr_sz;
	int str_len, state;
	char buf[BUF_SIZE];
    
	if(argc!=2) {
		printf("Usage : %s <port>\n", argv[0]);
		exit(1);
	}

	act.sa_handler=read_childproc;
	sigemptyset(&act.sa_mask);
	act.sa_flags=0;
	state=sigaction(SIGCHLD, &act, 0);

    /*master socker 생성*/ 
	master_sock=socket(PF_INET, SOCK_STREAM, 0);
	memset(&master_adr, 0, sizeof(master_adr));
	master_adr.sin_family=AF_INET;
	master_adr.sin_addr.s_addr=htonl(INADDR_ANY);
	master_adr.sin_port=htons(atoi(argv[1]));
	
	if(bind(master_sock, (struct sockaddr*) &master_adr, sizeof(master_adr))==-1)
		error_handling("bind() error");
	if(listen(master_sock, 5)==-1)
		error_handling("listen() error");
	
	while(1)
	{
		adr_sz=sizeof(worker_adr);
		worker_sock=accept(master_sock, (struct sockaddr*)&worker_adr, &adr_sz);
		if(worker_sock==-1)
			continue;
		else
			puts("new client connected...");
		pid=fork();
		if(pid==-1)
		{
			close(worker_sock);
			continue;
		}
		if(pid==0)
		{
			close(master_sock);
			while((str_len=read(worker_sock, buf, BUF_SIZE))!=0)
				write(worker_sock, buf, str_len);
			
			close(worker_sock);
			puts("client disconnected...");
			return 0;
		}
		else
			close(worker_sock);
	}
	close(master_sock);
	return 0;
/***************************************/
    cout<<" Hello world!\n";

    //argv 처리 1 : master의 호출에 의한 worker 실행
    if(argc!=2) {
		printf("Usage : %s <port>\n", argv[0]);
		exit(1);
	}

    //controlThread 생성

    //pingpong Thread 생성

    RRStartRelay(arvg);

    // while (rtmpServer->state != STREAMING_STOPPED)
    // {
    //   sleep(1);
    // }

    // RTMP_Log(종료합니다)

    // CleanupCode
    return 0;
}