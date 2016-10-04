int count(int a){
if(a>1){
count(a-1);
}
return a;
}

int main(){
printf count(10);
}