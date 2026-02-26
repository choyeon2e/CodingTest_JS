function solution(nums) {
    const map = new Map();
    
    for (let n of nums){
        map.set(n, (map.get(n) || 0) +1);
    }
    
    const ponketmonNum = map.size;
    const max = nums.length / 2;
    
    if (ponketmonNum > max){
        return max;
    } else {
        return ponketmonNum;
    }
    
}