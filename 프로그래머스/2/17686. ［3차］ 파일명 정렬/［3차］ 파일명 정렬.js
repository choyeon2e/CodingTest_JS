/**
 * 파일명에 포함된 숫자를 반영한 정렬기능 구현하기
 *
 * 파일명: HEAD, NUMBER, TAIL 세 부분으로 구성
 * HEAD 기준으로 사전순 정렬 (대소문자구분x)
 * 그다음으로는 NUMBER 숫자 순으로 정렬 (앞의 0은 무시. 012 = 12)
 * HEAD,NUMBER 다 같으면 입력된 순서를 유지함
 **/

function split(file) {
    let i = 0;
    while (i < file.length && !(file[i] >= "0" && file[i] <= "9")) {
        i++;
    }
    let numStart = i;

    while (i < file.length && file[i] >= "0" && file[i] <= "9") {
        i++;
    }
    let numEnd = i;

    let head = file.slice(0, numStart);
    let number = file.slice(numStart, numEnd);
    let tail = file.slice(numEnd);

    return [head, number, tail];
}

function compare(a, b) {
    let [headA, numA] = split(a);
    let [headB, numB] = split(b);

    headA = headA.toLowerCase();
    headB = headB.toLowerCase();

    if (headA < headB) return -1;
    if (headA > headB) return 1;

    return Number(numA) - Number(numB);
}

function solution(files) {
    files.sort((a, b) => compare(a, b));
    return files;
}
