// ランキング機能
class RankingSystem {
    constructor() {
        this.storageKey = 'ashtanga-quiz-ranking';
        this.rankings = this.loadRankings();
    }

    // ローカルストレージからランキングデータを読み込み
    loadRankings() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    }

    // ランキングデータをローカルストレージに保存
    saveRankings() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.rankings));
    }

    // 新しいスコアを追加
    addScore(nickname, score, totalQuestions, timeSpent) {
        const accuracy = (score / totalQuestions) * 100;
        const entry = {
            nickname: nickname || 'ゲスト',
            score,
            totalQuestions,
            accuracy,
            timeSpent,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        this.rankings.push(entry);
        this.saveRankings();
        return entry;
    }

    // 期間別ランキングを取得
    getRankingsByPeriod(period = 'all', limit = 10) {
        let filteredRankings = [...this.rankings];
        const now = new Date();

        // 期間でフィルタリング
        switch (period) {
            case 'today':
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                filteredRankings = filteredRankings.filter(entry => 
                    new Date(entry.date) >= today
                );
                break;
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredRankings = filteredRankings.filter(entry => 
                    new Date(entry.date) >= weekAgo
                );
                break;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                filteredRankings = filteredRankings.filter(entry => 
                    new Date(entry.date) >= monthAgo
                );
                break;
            default: // 'all'
                break;
        }

        // スコア順でソート（同点の場合は正答率、さらに同点の場合は時間の短い順）
        filteredRankings.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
            return a.timeSpent - b.timeSpent;
        });

        return filteredRankings.slice(0, limit);
    }

    // ユーザーの最高記録を取得
    getUserBestScore(nickname) {
        const userEntries = this.rankings.filter(entry => entry.nickname === nickname);
        if (userEntries.length === 0) return null;

        return userEntries.reduce((best, current) => {
            if (current.score > best.score) return current;
            if (current.score === best.score && current.accuracy > best.accuracy) return current;
            if (current.score === best.score && current.accuracy === best.accuracy && current.timeSpent < best.timeSpent) return current;
            return best;
        });
    }

    // 統計情報を取得
    getStats() {
        if (this.rankings.length === 0) {
            return {
                totalGames: 0,
                averageScore: 0,
                averageAccuracy: 0,
                bestScore: 0
            };
        }

        const totalGames = this.rankings.length;
        const averageScore = this.rankings.reduce((sum, entry) => sum + entry.score, 0) / totalGames;
        const averageAccuracy = this.rankings.reduce((sum, entry) => sum + entry.accuracy, 0) / totalGames;
        const bestScore = Math.max(...this.rankings.map(entry => entry.score));

        return {
            totalGames,
            averageScore: Math.round(averageScore * 10) / 10,
            averageAccuracy: Math.round(averageAccuracy * 10) / 10,
            bestScore
        };
    }

    // ランキング表示用HTML生成
    generateRankingHTML(period = 'all') {
        const rankings = this.getRankingsByPeriod(period);
        if (rankings.length === 0) {
            return '<p class="no-data">まだデータがありません</p>';
        }

        let html = '<div class="ranking-list">';
        rankings.forEach((entry, index) => {
            const rank = index + 1;
            const medal = this.getMedalIcon(rank);
            const date = new Date(entry.date).toLocaleDateString('ja-JP');
            
            html += `
                <div class="ranking-item">
                    <span class="rank">${medal} ${rank}位</span>
                    <span class="nickname">${entry.nickname}</span>
                    <span class="score">${entry.score}/${entry.totalQuestions}</span>
                    <span class="accuracy">${entry.accuracy.toFixed(1)}%</span>
                    <span class="time">${this.formatTime(entry.timeSpent)}</span>
                    <span class="date">${date}</span>
                </div>
            `;
        });
        html += '</div>';

        return html;
    }

    // メダルアイコンを取得
    getMedalIcon(rank) {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return '🏅';
        }
    }

    // 時間をフォーマット
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// グローバルインスタンス
const rankingSystem = new RankingSystem();