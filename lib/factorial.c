int factorial(int x){
  int temp;
  if(x < 1){
    return 1;
  }else{
    temp = x * factorial(x - 1);
    return temp;
  }
}
​
int main(){
  printf factorial(5);
}