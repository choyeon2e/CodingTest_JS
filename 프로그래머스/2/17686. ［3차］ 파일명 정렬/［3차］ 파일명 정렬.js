/**
 * 단순 문자 코드 순이 아니라 파일명에 포함된 숫자를 반영한 정렬기능을 구현
 * ex) img1.png, img10.png, img2.png 순이 아니라
 *     img1.png, img2.png, img10.png 순이 되도록 구현
 *
 * 파일명은 100글자 이내로, 영문 대소문자, 숫자, 공백, 마침표, 빼기 부호 만으로 이뤄짐
 * 파일명은 영문자로 시작하여 숫자를 하나 이상 포함
 *
 * 파일명은 HEAD, NUMBER, TAIL 세 부분으로 구성
 * HEAD: 문자로 이뤄짐. 최소 한글자 이상
 * NUMBER: 한글자에서 최대 다섯글자 사이의 연속된 숫자로 이뤄짐. 앞에 0이 올 수 있음
 * TAIL: 나머지 부분. 여기에 숫자가 다시 나타날 수 있고 아무 글자도 없을 수 있음
 **/

function solution(files) {
    const list = [];

    for (let f of files) {
        const match = f.match(/[0-9]{1,5}/);
        let number = match[0];
        let idx = match.index;
        let head = f.slice(0, idx);

        list.push({ head, number, original: f });
    }

    list.sort((a, b) => {
        const headA = a.head.toLowerCase();
        const headB = b.head.toLowerCase();

        if (headA < headB) return -1;
        if (headA > headB) return 1;

        const numA = parseInt(a.number);
        const numB = parseInt(b.number);

        return numA - numB;
    });

    return list.map((l) => l.original);
}
