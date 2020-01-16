/*
ifndef 중복 삽입시 인식 안되는 문제
1. 일단 tcp 클라 서버로 소켓 통신부터 시작한다.
1. 두 호스트 간 TCP 연결이 되면 이를 session에 저장한다.
1. 종료 쓰레드를 생성해본다.
1. stream 객체를 만들 하드 코딩 relay server를 만든다. 포트만 다르게 만든다. 
1. RRRest Thread를 돌릴 수 있는 function pointer를 고려해본다.
1. RRLog의 싱글톤을 이해해서 hello world 를 찍어본다. 이건 
1. RRStream의 STATE를 만들어서 RRLog로 찍어본다. 
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <string>

#ifndef __RRSESSION_H__
#include "rrsession.h"
#endif

#ifndef __RRTHREAD_H__
#include "rrthread.h"
#endif

#ifndef __RRLOG_H__
#include "rrlog.h"
#endif

#define BUF_SIZE 1024

void error_handling(const char* message);

int main(int argc, char *argv[])
{
	int serv_sock, clnt_sock;
	char message[BUF_SIZE];
	int str_len, i;
	// RRSession temp;
	struct sockaddr_in serv_adr;
	struct sockaddr_in clnt_adr;
	socklen_t clnt_adr_sz;
	string str= "hello world";
	if(argc!=2) {
		printf("Usage : %s <port>\n", argv[0]);
        RRLOG("macro print");
		exit(1);
	}
	
	serv_sock=socket(PF_INET, SOCK_STREAM, 0);   
	if(serv_sock==-1)
		error_handling("socket() error");
	
	memset(&serv_adr, 0, sizeof(serv_adr));
	serv_adr.sin_family=AF_INET;
	serv_adr.sin_addr.s_addr=htonl(INADDR_ANY);
	serv_adr.sin_port=htons(atoi(argv[1]));

	if(bind(serv_sock, (struct sockaddr*)&serv_adr, sizeof(serv_adr))==-1)
		error_handling("bind() error");
	
	if(listen(serv_sock, 5)==-1)
		error_handling("listen() error");
	
	clnt_adr_sz=sizeof(clnt_adr);

	for(i=0; i<5; i++)
	{
		clnt_sock=accept(serv_sock, (struct sockaddr*)&clnt_adr, &clnt_adr_sz);
		if(clnt_sock==-1)
			error_handling("accept() error");
		else
			printf("Connected client %d \n", i+1);
	
		while((str_len=read(clnt_sock, message, BUF_SIZE))!=0)
			write(clnt_sock, message, str_len);

		close(clnt_sock);
	}

	close(serv_sock);
	return 0;
}

void error_handling(const char* message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	exit(1);
}


