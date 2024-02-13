// js로 풀 수 없는 문제

#include <cstdio>
#include <algorithm>

void dp_max(int *max_dp, int *dp) {
    int a = std::max(max_dp[0], max_dp[1]);
    int b = std::max(std::max(max_dp[0], max_dp[1]), max_dp[2]);
    int c = std::max(max_dp[1], max_dp[2]);

    max_dp[0] = dp[0] + a;
    max_dp[1] = dp[1] + b;
    max_dp[2] = dp[2] + c;
}

void dp_min(int *min_dp, int *dp) {
    int a = std::min(min_dp[0], min_dp[1]);
    int b = std::min(std::min(min_dp[0], min_dp[1]), min_dp[2]);
    int c = std::min(min_dp[1], min_dp[2]);

    min_dp[0] = dp[0] + a;
    min_dp[1] = dp[1] + b;
    min_dp[2] = dp[2] + c;
}


int main() {
    int dp[3];
    int max_dp[3];
    int min_dp[3];
    int n;

    scanf("%d", &n);
    scanf("%d %d %d", &max_dp[0], &max_dp[1], &max_dp[2]);
    min_dp[0] = max_dp[0];
    min_dp[1] = max_dp[1];
    min_dp[2] = max_dp[2];

    for (int i = 1; i < n; i++) {
        scanf("%d %d %d", &dp[0], &dp[1], &dp[2]);
        dp_max(max_dp, dp);
        dp_min(min_dp, dp);
    }

    printf("%d %d", std::max(std::max(max_dp[0], max_dp[1]), max_dp[2]), std::min(std::min(min_dp[0], min_dp[1]), min_dp[2]));
    return 0;
}
