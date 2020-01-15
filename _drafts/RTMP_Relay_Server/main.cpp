

// void RRMaster::RRM_init(argc, argv){
// 	if(argc!=2) {
// 		printf("Usage : %s <port>\n", argv[0]);
// 		exit(1);
// 	}

//     /*
//     signal 함수는 유닉스 계열에서 동작방법에 차이가 있어서 sigaction 함수를 사용한다.
//     TODO 아래의 act.sa_mask와 act.sa_flags는 좀비 프로세스를 막기 위한 목적으로 0으로 세팅되어있다. 
//     만약 signal의 다른 쓰임이 필요하면 찾아봐야 한다. 
//     */
// 	act.sa_handler=signalHandler;
// 	sigemptyset(&act.sa_mask);
// 	act.sa_flags=0;
// 	state=sigaction(SIGCHLD, &act, 0);
// }

// void RRMaster::RRM_ready(void){
//     /*master socker 생성*/ 
// 	master_sock=socket(PF_INET, SOCK_STREAM, 0);
// 	memset(&master_adr, 0, sizeof(master_adr));
// 	master_adr.sin_family=AF_INET;
// 	master_adr.sin_addr.s_addr=htonl(INADDR_ANY);
// 	master_adr.sin_port=htons(atoi(argv[1]));
	
// 	if(bind(master_sock, (struct sockaddr*) &master_adr, sizeof(master_adr))==-1)
// 		error_handling("bind() error");
// 	if(listen(master_sock, 5)==-1)
// 		error_handling("listen() error");
// }

// void RRMaster::signalHandler(int sig){
//     switch(sig){
//         case SIGINT :
//             puts("ctrl+c pressed");
//             break;
//         case SIGCHLD :
//             puts("relay end");
//             break;
//         case SIGALRM :
//             puts("timeoue");
//             break;
//         defula :
//             puts("Unknown signals")
//     }
// }

// void RRMaster::RRM_run(void){
//     int workerStatus = 0;
//     //TODO create control thread : enter 'q' to quit
//     //TODO create pingpong thread : use 'RRM_showWorkerInfos()'

//     while(true)
// 	{
// 		adr_sz=sizeof(worker_adr);
// 		worker_sock=accept(master_sock, (struct sockaddr*)&worker_adr, &adr_sz);
// 		if(worker_sock==I_AM_DEAD){
// 			puts("RRMaster::RRMrun:: I AM DEAD.");
// 			continue;
//         }
// 		else
// 			puts("new client connected...");

// 		pid=fork();
// 		if(pid==I_AM_DEAD)
// 		{
// 			close(worker_sock);
// 			continue;
// 		}
// 		if(pid==I_AM_WORKER)
// 		{   
// 			close(master_sock);
// 			RRStartRelay(arvg);

//             // while (rtmpServer->state != STREAMING_STOPPED)
//             // {
//             //   sleep(1);
//             // }

//             // RTMP_Log(종료합니다)
//             while((str_len=read(worker_sock, buf, BUF_SIZE))!=0)
// 				write(worker_sock, buf, str_len);
			
// 			close(worker_sock);
// 			puts("client disconnected...");
// 			return 0;
// 		}
// 		else{
//             //일단 master는 끝까지 기다린다. 
//             //끝나는 경우는 controlServer가 'q'를 입력받은 경우뿐이다. 
//             workersPID[workersCnt++] = pid;
//             signal(SIGINT, signalHandler);
//             signal(SIGCHILD, signalHandler);
//             while(1){
//                 sleep(987654321);
//             }
//             /* 
//             TODO 종료되는 worker process(stream)이 있을 때는 PID만 출력해주자     
//             */
//             //종료된 프로세스가 없어도 블로킹 상태에 빠지지 않는다.
//             // waitpit(pid, &workerStatus, WNOHANG); 
//             // if(WIFEXITED(workerStatus)){
//             //     printf(" %d Wordker send %d \n", pid, WEXITSTATUS(workerStatus));
//             // }
// 			// close(worker_sock);
//         }
// 	}
//     // CleanupCode
// 	close(master_sock);
// }

// int main(int argc, char *argv[])
// {   
//     RRMaster master;
//     mater.RRM_init();
//     mater.RRM_ready();
//     mater.RRM_run();

//     RRLog::getInstance().log();
//     RRLog::getInstance().log();
// 	return 0;
// }

// enum{
//     RR_STATE_NULL,
//     RR_STATE_ACCEPTING,
//     RR_STATE_PAUSED,
//     RR_STATE_ERROR,
//     RR_STATE_WAITING
// }
// void RRError(string){

// }

// void RRServRoutine(void){
//     //패킷 읽어서 버퍼에 저장

//     //RTMP_HandShake()
//     while(RTMP_isConnected() && RTMP_readpacket() ){
//         //RTMP_Servepacket()
//     }
//     //RTMP_Packet_Free()
//     chapter 13 데이터 송수신 함수


//     //RRBuffer 만들어서 RRclntRoutine과 공유?
// }

// void RRClntRoutine(void){
//     //버퍼에서 패킷 읽어서 relay
//     //RTMP_HandShake()
//     while(RTMP_isConnected() && RTMP_readpacket() ){
//         //RTMP_Servepacket()
//     }
//     //RTMP_Packet_Free()
//     chapter 13 데이터 송수신 함수
// }
// void doRelay(strm_serv_thrd, strm_clnt_thrd){
//     //strm_serv_thrd 생성
//     RRCreateThread(strm_serv_thrd, RRServRoutine);

//     //strm_clnt_thrd 생성
//     RRCreateThread(strm_clnt_thrd, RRClntRoutine);
// }

// void RRMakeStream(int serv_sock ){
//     static RRStream s_streamInfos ;

//     //accept 계속 반복
//     while(s_streamInfos.canAccepts()){
//         strm_serv_sock=accept(serv_sock, (struct sockaddr*)&clnt_adr, &clnt_adr_sz);	

//         //dummy API Call
//         //strm_serv_addr = getMediaInstanceAddr()

//         //make connection with mediaInstance
//         strm_clnt_sock= sock()
//         bind(strm_clnt_sock)
//         connection(strm_clnt_sock, strm_serv_addr )

//         //add streamInfo
//         RRBuffer rrbuf;
//         s_streamInfos.addStream(sessionInfo, sessionInfo, rrbuf);
        
//         doRelay(strm_serv_thrd, strm_clnt_thrd )
        
//     }
//     //모든 스트림이 종료됨
//     return ;
    
// }



// void RRStartRelay(char * argv[]){
//     int RRState = RR_STATE_NULL; //RR program state
//     int serv_sock; //socket as serve
//     int clnt_sock; //socket as client
//     struct sockaddr_in serv_adr; // connection listening server socket
//     struct sockaddr_in clnt_adr; // connection calling client socket
//     //create server socket : get connections from client
// 	serv_sock = socket(PF_INET, SOCK_STREAM, 0);
//     if(serv_sock == -1){
//         cout<<"Error"<< endl;
//         RRState = RR_STATE_ERROR;
//         exit(1);
//     }

//     /** set_socket option */
//     // TODO 

//     /* bind */
//     memset(&serv_adr, 0, sizeof(serv_adr));
//     serv_adr.sin_family = AF_INET;
//     serv_adr.sin_addr.s_addr = htonl(INADDR_ANY);
//     serv_adr.sin_port=htons(atoi(argv[1]));
	
    
//     if(bind(serv_sock, (struct sockaddr*)&serv_adr, sizeof(serv_adr))==-1)
// 		//error_handling("bind() error");
// 	/* listen */
// 	if(listen(serv_sock, 5)==-1)
// 		//error_handling("listen() error");

//     RRMakeStream(serv_sock)
// }



// void read_childproc(int sig)
// {
// 	pid_t pid;
// 	int status;
// 	pid=waitpid(-1, &status, WNOHANG);
// 	printf("removed proc id: %d \n", pid);
// }
// void error_handling(char *message)
// {
// 	fputs(message, stderr);
// 	fputc('\n', stderr);
// 	exit(1);
// }

