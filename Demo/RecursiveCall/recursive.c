#include <stdio.h>

int num=5;

void sub(){
	int x,y;
	num--;
	if(num>0){
		sub();
	}
}

int main(){
	sub();
}