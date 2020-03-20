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

#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#include "rrmaster.h"


void RRMaster::RRM_init(argc, argv){
	if(argc!=2) {
		printf("Usage : %s <port>\n", argv[0]);
		exit(1);
	}
    /*
    signal 함수는 유닉스 계열에서 동작방법에 차이가 있어서 sigaction 함수를 사용한다.
    TODO 아래의 act.sa_mask와 act.sa_flags는 좀비 프로세스를 막기 위한 목적으로 0으로 세팅되어있다. 
    만약 signal의 다른 쓰임이 필요하면 찾아봐야 한다. 
    */
	act.sa_handler=signalHandler;
	sigemptyset(&act.sa_mask);
	act.sa_flags=0;
	state=sigaction(SIGCHLD, &act, 0);
}

void RRMaster::setSockOpts(void){
    /*소켓 버퍼 사이즈는 TCP 제약조건에 의해 지정한대로 변경되지 않을 수 있다.*/
    int snd_buf = BUF_SIZE;
    int rcv_buf = BUF_SIZE;
    socket_t len;
    state = setsockopt(serv_sock, SOL_SOCKET, SO_RCVBUF, (void*)rcv_buf, sizeof(rcv_buf));
    if(state){
        error_handling("setsocketopt() error!");
    }
    state = setsockopt(serv_sock, SOL_SOCKET, SO_SNDBUF, (void*)snd_buf, sizeof(snd_buf));
    if(state){
        error_handling("setsocketopt() error!");
    }
    len = sizeof(rcv_buf);
    state = getsockopt(serv_sock, SOL_SOCKET, SO_RCVBUF, (void*)rcv_buf, &len);
    if(state){
        error_handling("getsocketopt() error!");
    }
    len = sizeof(snd_buf);
    state = getsockopt(serv_sock, SOL_SOCKET, SO_SNDBUF, (void*)snd_buf, &len);
    if(state){
        error_handling("getsocketopt() error!");
    }
    printf("rcv_buf size : %d", rcv_buf);
    printf("snd_buf size : %d", snd_buf);

    /*server socket의 time-wait 시간에도 소켓의 port 번호가 할당될 수 있도록 함*/
    int option;
    socket_t optlen;
    optlen = sizeof(option);
    option = TRUE;
    setsockopt(serv_sock, SOL_SOCKET, SO_REUSEADDR, (void*)&option, optlen);

    /*Nagle 알고리즘의 중단 : 트레픽을 늘리고 데이터의 전송을 빠르게 한다.
    Nagle 알고리즘 : 앞서 전송한 데이터의 ACK을 받아야 다음 데이터를 보낸다. */
    int opt_val;
    socklen_t opt_len;
    opt_len = sizeof(opt_val);
    getsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (void*)opt_val, sizeof(opt_val))
}

void RRMaster::RRM_ready(void){
    /*master socker 생성*/
	serv_sock=socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
    RRMaster::setSockOpts();
    memset(&serv_adr, 0, sizeof(serv_adr));
	serv_adr.sin_family=AF_INET;
	serv_adr.sin_addr.s_addr=htonl(INADDR_ANY);
	serv_adr.sin_port=htons(atoi(argv[1]));
	
	if(bind(serv_sock, (struct sockaddr*) &serv_adr, sizeof(serv_adr))==-1)
		error_handling("bind() error");
	if(listen(serv_sock, BACKLOG_SIZE)==-1)
		error_handling("listen() error");
}

void RRMaster::signalHandler(int sig){
    switch(sig){
        case SIGINT :
            puts("ctrl+c pressed");
            break;
        case SIGCHLD :
            puts("relay end");
            break;
        case SIGALRM :
            puts("timeoue");
            break;
        defula :
            puts("Unknown signals")
    }
}

void RRMaster::RRM_run(void){
    int workerStatus = 0;
    //TODO create control thread : enter 'q' to quit
    //TODO create pingpong thread : use 'RRM_showWorkerInfos()'

    while(true)
	{
		clnt_adr_size=sizeof(clnt_sock);
		clnt_sock=accept(serv_sock, (struct sockaddr*)&clnt_adr, &clnt_adr_size);
		if(clnt_sock==I_AM_DEAD){
			puts("RRMaster::RRMrun:: I AM DEAD.");
			continue;
        }
		else{
			puts("new client connected...");
        }
		pid=fork();
		if(pid==I_AM_DEAD)
		{
			puts("fork 실패");
			close(worker_sock);
			continue;
		}
		if(pid==I_AM_WORKER)
		{   
			close(master_sock);
			RRStartRelay(arvg);

            // while (rtmpServer->state != STREAMING_STOPPED)
            // {
            //   sleep(1);
            // }

            // RTMP_Log(종료합니다)
            while((str_len=read(worker_sock, buf, BUF_SIZE))!=0)
				write(worker_sock, buf, str_len);
			
			close(worker_sock);
			puts("client disconnected...");
			return 0;
		}
		else{
            //일단 master는 끝까지 기다린다. 
            //끝나는 경우는 controlServer가 'q'를 입력받은 경우뿐이다. 
            workersPID[workersCnt++] = pid;
            signal(SIGINT, signalHandler);
            signal(SIGCHILD, signalHandler);
            while(1){
                sleep(987654321);
            }
            /* 
            TODO 종료되는 worker process(stream)이 있을 때는 PID만 출력해주자     
            */
            //종료된 프로세스가 없어도 블로킹 상태에 빠지지 않는다.
            // waitpit(pid, &workerStatus, WNOHANG); 
            // if(WIFEXITED(workerStatus)){
            //     printf(" %d Wordker send %d \n", pid, WEXITSTATUS(workerStatus));
            // }
			// close(worker_sock);
        }
	}
    // CleanupCode
	close(master_sock);
}

int main(int argc, char *argv[])
{   
    RRMaster master;
    mater.RRM_init();
    mater.RRM_ready();
    mater.RRM_run();
	return 0;
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

