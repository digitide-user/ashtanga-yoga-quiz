# アシュタンガヨガ アーサナクイズ 🧘‍♀️

アシュタンガヨガのアーサナ（ポーズ）の名前を覚えるための学習用クイズアプリケーションです。

![クイズ画面](./images/screenshot.png)

## ✨ 特徴

- **58種類のアーサナ** から毎回10問をランダム出題
- **4択クイズ形式** で直感的に学習
- **ランキング機能** で競い合いながら学習
- **レスポンシブデザイン** でモバイル・デスクトップ対応
- **オフライン対応** でいつでも学習可能

## 🎯 対象者

- アシュタンガヨガの練習者（初級〜中級）
- ヨガインストラクター
- アーサナ名を覚えたい方

## 🚀 デモ

https://ashtanga-yoga-quiz.onrender.com

## 📱 使い方

1. **「クイズを始める」** ボタンをクリック
2. 表示された画像を見て、正しいアーサナ名を4択から選択
3. 10問すべてに答えて結果を確認
4. ランキングで他の参加者と競争

## 🏆 ランキング機能

- **今日・今週・今月・総合** の4つの期間別ランキング
- **スコア・正答率・回答時間** で総合評価
- **ニックネーム登録** で参加（個人情報不要）

## 🛠️ 技術スタック

- **HTML5** - セマンティックマークアップ
- **CSS3** - モダンなスタイリング（Grid, Flexbox, CSS Variables）
- **Vanilla JavaScript** - フレームワーク不使用
- **Local Storage API** - クライアントサイドデータ保存

## 📂 プロジェクト構造

```
ashtanga-yoga-quiz/
├── index.html          # メインHTML
├── css/
│   └── style.css       # スタイルシート
├── js/
│   ├── quiz.js         # クイズロジック
│   └── ranking.js      # ランキング機能
├── images/             # アーサナ画像
│   ├── Shiva_background.png
│   └── [1-43].png
└── README.md

## 🧪 ランキング機能デバッグ

オンラインランキング安定化のため、簡易デバッグページを追加しました。

- 使い方:
  - ブラウザで開く
  - API URL 欄に Web アプリの `/exec` URL を入力（既定はコード内の API_BASE）
  - [Ping] で疎通確認（`{ success: true }` などが返ればOK）
  - [Dummy AddScore] で仮スコア送信（DebugUser, 7/10）
  - [Get Rankings] で `allTime` の最新10件を取得

オンライン接続に失敗した場合は自動でローカルランキングにフォールバックし、ランキングモーダルが開きます（コンソールに `[RANK]` ログを出力）。

## 🌐 オンラインランキングの自動切替

- 本番環境（`http(s)` かつ `localhost` 以外）では自動でオンラインランキングが有効になります。
- ローカル開発（`localhost`）ではローカルランキング運用になります。
- 起動時に軽量なヘルスチェック（`action=ping`、2秒タイムアウト）を行い、失敗した場合はそのセッション中はローカル運用に自動切替します（ログ: `[RANK] ONLINE DISABLED (ping fail)`）。

### 手動で切り替えたい場合

- ブラウザのDevToolsコンソールで以下を実行:
  - オンライン有効化: `window.ENABLE_ONLINE_RANKING = true; location.reload();`
  - ローカル固定: `window.ENABLE_ONLINE_RANKING = false; location.reload();`
  - API URLの指定/変更: `rankingSystem.setApiUrl('https://script.google.com/macros/s/....../exec')`
```

## 🔒 共有キー（軽量ハードニング）

- このアプリはGAS側で共有キー（SHARED_KEY）をチェックする軽量な防波堤を設けています。厳密な認証ではありませんが、無秩序なアクセスの抑止を目的としています。
- 変更手順:
  1. GASの `Code.gs` 先頭付近の `const SHARED_KEY = '...'` を新しい32文字キーに更新。
  2. 本リポジトリの `js/config.js` にある `var SHARED_KEY = '...'` も同じ値に更新。
  3. デプロイ（GASの新バージョン公開 → 本番に反映）。
- レート制限（5秒クールダウン）に当たった場合、クライアントは自動で1回だけリトライします（ログ: `[RANK] rate_limited → retry in 1500ms`）。

## ⚙️ 設定の共通化（js/config.js）

- すべてのページで `js/config.js` を先に読み込むことで、ランキング設定（`ENABLE_ONLINE_RANKING`, `RANKING_API_URL`）を共通化しています。
  - 例: `<script src="js/config.js"></script>` を `js/ranking.js` より前に読み込む。
- ページ単位でAPI URLを上書きしたい場合は、`<meta name="ranking-api-url" content=".../exec">` を記述するとその値が優先されます。

## 🔧 ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/ashtanga-yoga-quiz.git

# ディレクトリに移動
cd ashtanga-yoga-quiz

# ブラウザでindex.htmlを開く
open index.html
```

## 🌐 デプロイ

このプロジェクトはRender.comでホスティングされています。
GitHubにプッシュすると自動的にデプロイされます。

## 📈 今後の予定

- [ ] Instagram ストーリーズ シェア機能
- [ ] 音声読み上げ機能
- [ ] カテゴリ別出題モード
- [ ] 詳細解説機能
- [ ] 多言語対応（英語・サンスクリット語）

## 🤝 コントリビューション

バグ報告や機能提案は[Issues](https://github.com/YOUR_USERNAME/ashtanga-yoga-quiz/issues)でお願いします。

## 📄 ライセンス

MIT License - 詳細は[LICENSE](LICENSE)をご覧ください。

## 🙏 謝辞

- アーサナ画像は教育目的で使用
- アシュタンガヨガの伝統的な順序に基づいて作成
- ヨガコミュニティの皆様からのフィードバックに感謝

---

**作成者**: [Your Name]  
**連絡先**: [Your Email]  
**ウェブサイト**: https://ashtanga-yoga-quiz.onrender.com

※ 本プロジェクトは、現状ファビコン/manifest/検証ページを同梱していません（未対応）。
