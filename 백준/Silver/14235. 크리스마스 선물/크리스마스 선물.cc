#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;

    priority_queue<int> pq;

    for (int i = 0; i < n; i++) {
        int a;
        cin >> a;

        if (a == 0) {
            if (pq.empty()) {
                cout << -1 << "\n";
            } else {
                // 가장 큰 가치의 선물을 출력하고 제거
                cout << pq.top() << "\n";
                pq.pop();
            }
        } else {
            for (int j = 0; j < a; j++) {
                int value;
                cin >> value;
                pq.push(value);
            }
        }
    }

    return 0;
}