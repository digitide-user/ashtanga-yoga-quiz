# アシュタンガヨガ アーサナクイズ

## プロジェクト概要
アシュタンガヨガのアーサナ（ポーズ）の名前を当てる学習用クイズWebアプリケーション

## プロジェクト仕様

### 基本機能
- **クイズ形式**: 4択クイズ（画像を見てアーサナ名を選択）
- **問題数**: 毎回10問をランダム出題
- **総アーサナ数**: 58種類（アシュタンガヨガ プライマリーシリーズ）
- **結果表示**: スコア別メッセージと再挑戦・SNSシェア機能

### アーサナデータ構造
```javascript
{
  imageName: '画像ファイル名.png',
  answer: 'アーサナの日本語名',
  category: ['カテゴリ1', 'カテゴリ2', ...]
}
```

### カテゴリ分類
- **体位**: 立位、座位、仰向け、逆転
- **動作**: 前屈、後屈、ねじり、バランス
- **特殊**: 蓮華座

### 選択肢生成ロジック（優先順位）
1. **類似名前**: 同一基本名のバリエーション（A/B/C、Ⅰ/Ⅱ等）
2. **関連ポーズ**: プレフィックス違い（スプタ・、ウールドヴァ・等）
3. **同カテゴリ**: 同じカテゴリのアーサナ
4. **ランダム**: 残りは全アーサナからランダム選択

### スコア評価
- **10問正解**: アシュタンガヨガマスター
- **7-9問正解**: もう一歩（継続励ま励ましメッセージ）
- **4-6問正解**: ナイスチャレンジ（探究励ましメッセージ）
- **0-3問正解**: ここからが始まり（基礎励ましメッセージ）

## ファイル構成
```
yoga-quiz/
├── index.html          # メインHTML
├── js/                 # JavaScriptファイル
│   ├── quiz.js         # クイズロジック（旧script.js）
│   └── ranking.js      # ランキングシステム
├── css/                # スタイルファイル
│   └── style.css       # スタイル定義
├── images/             # アーサナ画像ディレクトリ
│   ├── Shiva_background.png  # 背景画像
│   └── [1-58].png            # 各アーサナ画像（58種類）
├── ファイル名とアーサナ名.txt  # データリスト（参考用）
└── CLAUDE.md           # このドキュメント
```

## 技術仕様
- **フロントエンド**: Pure HTML/CSS/JavaScript（フレームワーク不使用）
- **スタイル**: ダークテーマ、シヴァ神背景、レスポンシブデザイン
- **フォント**: Noto Sans JP（Google Fonts）
- **ブラウザ対応**: モダンブラウザ対応

## 現在の実装状況
### ✅ 完了済み機能
- [x] 基本クイズシステム
- [x] 58種類のアーサナデータ登録
- [x] 4択選択肢の賢い生成ロジック
- [x] スコア評価システム
- [x] レスポンシブデザイン
- [x] 再挑戦機能
- [x] ローカルランキングシステム（期間別・ユーザー登録・モーダル表示）
- [x] オンラインランキングシステム（Google Apps Script連携）
- [x] ハイブリッドランキング機能（オンライン優先、ローカルフォールバック）
- [x] ユーザー名入力・保存機能
- [x] ランキングシェア機能

### 🚧 部分実装・問題のある機能
- [x] Google Apps Script API連携 ❌ **現在動作不良**
  - API URL: `https://script.google.com/macros/s/AKfycbygmf89siVmBYneMeakC5xj09XvwEPp0KyZckrafbKYU_cReHHoooXAxH3JF-P0KsBb/exec`
  - パラメータ形式を個別送信に変更済みだが、まだ'Invalid action'エラーが発生
  - オンラインランキングデータが0件で返される
  - ローカルフォールバックが正常に動作しない

- [ ] Instagramストーリーズシェア機能（URL設定待ち）
  - `gameUrl` と `imageUrl` の実装が必要

### 📋 今後の改善案
- [ ] 問題数カスタマイズ機能
- [ ] カテゴリ別出題モード
- [ ] 進捗トラッキング機能
- [ ] 詳細解説モード
- [ ] 音声読み上げ機能
- [ ] オフライン対応
- [ ] パフォーマンス最適化

## 開発メモ

### 重要な実装ポイント
1. **選択肢生成**: 類似名前優先で適切な難易度を保持
2. **画像表示**: アスペクト比を保持しつつレスポンシブ対応
3. **データ整合性**: 画像ファイル名とJavaScriptデータの同期

### 既知の課題
- Instagram シェア機能のURL設定が未完了
- 一部の画像ファイル名に特殊文字（Ⅰ、Ⅱ）使用
- **ランキング機能が全く動作しない（最優先課題）**
- Google Apps Script APIとの通信が確立できない
- ローカルフォールバック機能も動作不良

### パフォーマンス考慮
- 画像は事前読み込みなし（オンデマンド）
- シャッフルアルゴリズムは軽量なFisher-Yates使用

## API・外部依存
- **Google Fonts**（Noto Sans JP）
- **Google Apps Script API**（オンラインランキング用）
  - URL: `https://script.google.com/macros/s/AKfycbygmf89siVmBYneMeakC5xj09XvwEPp0KyZckrafbKYU_cReHHoooXAxH3JF-P0KsBb/exec`
  - 期待パラメータ: `action`, `name`, `score`, `totalQuestions`, `percentage`, `timeSpent`, `timestamp`, `userAgent`, `sessionId`
- **Instagram ディープリンク**（シェア機能）

## 🚨 現在の重要な課題・問題点

### オンラインランキング機能の不具合
**問題の詳細:**
1. **Google Apps Script API が 'Invalid action' エラーを返す**
   - 現在のパラメータ送信: `?action=addScore&name=ユーザー名&score=4&totalQuestions=10...`
   - APIレスポンス: `{success: false, error: 'Invalid action'}`
   - 原因: Google Apps Script側のdoGet/doPost関数でactionパラメータを正しく受け取れていない可能性

2. **オンラインランキングデータが常に0件**
   - getRankings APIは成功するが `rankings: {}` (空のオブジェクト) を返す
   - 配列変換処理は実装済みだが、そもそもデータベースが空の状態

3. **ローカルフォールバックが表示されない**
   - オンライン失敗時にローカルランキングに切り替わるべきだが、何も表示されない
   - `this.localSystem.showRankingResults(scoreEntry)` が呼ばれても画面に反映されない

**ログ例:**
```
=== ONLINE SCORE SUBMISSION START ===
- Status: 200
- Parsed JSON result: {success: false, error: 'Invalid action'}
=== SUBMISSION FAILED ===

=== ONLINE RANKINGS FETCH START ===
- Rankings result: {success: true, rankings: {}}
- Rankings count: 0
=== RANKINGS FETCH SUCCESS ===
```

### 技術的要因分析
1. **Google Apps Script の仕様理解不足**
   - doGet関数の正しいパラメータ受け取り方法
   - CORSヘッダーの設定方法
   - データベース（Google Sheets）への正しい書き込み・読み込み方法

2. **フォールバック処理の問題**
   - OnlineRankingSystemからLocalRankingSystemへの制御移行
   - DOM要素の重複・削除処理
   - 非同期処理のタイミング問題

3. **デバッグの限界**
   - Google Apps Script側のログが見えない
   - APIのレスポンス構造が予想と異なる可能性
   - ブラウザ側でのエラーハンドリングが不十分

### 推奨される解決アプローチ
1. **Google Apps Script側の確認・修正**
   - doGet/doPost関数の実装確認
   - Google Sheetsとの連携確認
   - CORS設定の追加

2. **ランキング機能の一時的な簡素化**
   - オンライン機能を無効にしてローカル機能のみで動作確認
   - LocalRankingSystemが完全に動作することを確認

3. **段階的なデバッグ**
   - まずローカル機能を完璧に動作させる
   - 次にGoogle Apps Script単体でテスト
   - 最後に統合テスト

## ランキングシステム技術詳細

### LocalRankingSystem
- **ストレージ**: localStorage使用
- **データ構造**: 期間別ランキング (daily, weekly, monthly, allTime)
- **ユーザー管理**: 名前入力・保存機能
- **表示機能**: モーダル・タブ切り替え・シェア機能

### OnlineRankingSystem
- **API**: Google Apps Script連携
- **通信方式**: GET リクエスト（CORS回避）
- **タイムアウト**: 5秒
- **フォールバック**: ローカルシステムへ自動切り替え
- **ローディング**: スピナー・エラーメッセージ表示

### ハイブリッド動作
1. ローカルにバックアップ保存
2. オンライン送信試行
3. 成功時: オンラインランキング表示
4. 失敗時: ローカルランキング表示

## コード構造とファイル詳細

### 主要ファイルの現在の状態

#### `index.html`
- メイン HTML ファイル
- `js/ranking.js` と `js/quiz.js` を読み込み
- レスポンシブ対応のマークアップ

#### `js/quiz.js`
- クイズのメインロジック
- 58種類のアーサナデータを含む
- ランキングシステムとの連携処理（quiz.js:382-420行）
- 詳細なデバッグログ付き

#### `js/ranking.js`
- **LocalRankingSystem クラス**: ローカルストレージベースのランキング
- **OnlineRankingSystem クラス**: Google Apps Script連携
- ハイブリッド動作機能
- ローディング・エラー表示機能
- 現在の状態: 基本実装済みだが動作不良

#### `css/style.css`
- ダークテーマ対応
- レスポンシブデザイン
- ランキング用スタイル（ローディング・エラー表示含む）

### 最近の修正内容（2025-08-27）
1. **ランキングシステムの完全実装**
   - LocalRankingSystem: 期間別ランキング、ユーザー管理、モーダル表示
   - OnlineRankingSystem: Google Apps Script API連携、フォールバック機能
   
2. **CORS対応のため POST → GET 変更**
   - パラメータを個別送信形式に変更
   - URLSearchParams使用
   
3. **エラーハンドリング強化**
   - 詳細デバッグログ追加
   - ローディング・エラー表示UI実装
   
4. **タイムアウト最適化**
   - API通信タイムアウトを10秒→5秒に短縮

### 未完了・問題のある実装
- **Google Apps Script API通信**: 'Invalid action' エラーで失敗
- **ローカルフォールバック**: DOM表示が正常に動作しない
- **デバッグ**: サーバーサイドログが確認できない状況

## 今後の開発指針
1. **緊急対応**: ランキング機能の安定化
2. **教育価値の向上**: 解説・学習機能の追加
3. **ユーザビリティ**: 進捗保存、カスタマイズ機能
4. **技術基盤**: モジュール化、テスト実装
5. **拡張性**: 他のヨガスタイル対応準備