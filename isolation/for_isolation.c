#define _GNU_SOURCE
#include <sched.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <sys/utsname.h>
#include <unistd.h>

char command[1024] = "";

static void print_nodename() {
  struct utsname utsname;
  uname(&utsname);
  printf("%s\n", utsname.nodename);
}

static int child_fn() {
    sethostname("NewHostName", 12);
    printf("Изменённое имя узла:\n");
    print_nodename();
    printf("________________________\n");
    
    
    printf("Start execution\n___________________\n\n");
    if(system(command) == 0){
        printf("___________________\nEnd execution\n");
    }
    else {
        printf("ERROR!\n");
    }
    return 0;
}

void main() {
    printf("Первоначальное имя узла:\n");
    print_nodename();
    printf("________________________\n");

    printf("Введите выполняемую команду:\n");
    fgets(command, 1024, stdin);

    int memory_size = 1;

    printf("Ограничение по памяти (кБ):\n");
    scanf("%d", &memory_size);

    memory_size = memory_size * 1024;
    void * stack = malloc(memory_size);

    pid_t child_pid = clone(child_fn, (char *)stack + memory_size, CLONE_NEWUTS | CLONE_NEWNS | CLONE_NEWPID | CLONE_NEWNET | SIGCHLD, NULL);

    waitpid(child_pid, NULL, 0);
    
    free(stack);

    printf("Опять первоначальное имя узла:\n"); //убеждаемся, что изменение имени узла было в другом пространстве имён
    print_nodename();
    printf("________________________\n");
}