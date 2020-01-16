#ifndef __RRTHREAD_H__
#define __RRTHREAD_H__

#include <pthread.h>

// #ifndef __RRLOG_H__
// #define __RRLOG_H__
// #include "rrlog.h"
// #endif

#define TFTYPE void * //Thread Function Type
#define TFRET() return 0//Thread Function Return 0
#define THANDLE pthread_t //Thread Handle
typedef TFTYPE (*thrfp)(void *args); // thread function pointer

class RRThread{
private:
public:
	RRThread();
    void RRMakeThread(char* argv);
        // controlThread
        // clientthread
        // ServerThread
        // pingpongThread
	THANDLE createThread(thrfp rountine, void * args);
	~RRThread();
};

#endif


/*
pthread_t id_t1, id_t2;
	int range1[]={1, 5};
	int range2[]={6, 10};
	
	pthread_create(&id_t1, NULL, thread_summation, (void *)range1);
	pthread_create(&id_t2, NULL, thread_summation, (void *)range2);

	pthread_join(id_t1, NULL);
	pthread_join(id_t2, NULL);
	printf("result: %d \n", sum);
*/
// void * thread_summation(void * arg) 
// {
// 	int start=((int*)arg)[0];
// 	int end=((int*)arg)[1];

// 	while(start<=end)
// 	{
// 		sum+=start;
// 		start++;
// 	}
// 	return NULL;
// }