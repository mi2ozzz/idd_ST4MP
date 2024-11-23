**本ガイドについて**
「構造設計」課題のWeb開発においては、Google社のスタイルガイドに基づいて開発を行います。

**翻訳について**
以下の翻訳は、Google社が[CC-By 3.0ライセンス](https://creativecommons.org/licenses/by/3.0/)で公開している[Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)を本投稿の著者([転載元](https://qiita.com/tsunogai/items/05b944debbcac35fbc18))が個人として翻訳したものです。ライセンスは原文と同じ[CC-By 3.0ライセンス](https://creativecommons.org/licenses/by/3.0/)とします。なお、サンプル・コードは原文からそのまま転記しており、サンプル・コードのコメントに含まれる英文は翻訳していません。

# Google HTML/CSS Style Guide

# 1.背景

当文書はHTMLおよびCSSのフォーマッティングとスタイルに関するルールを定義する。当文書はコラボレーションとコード品質の向上およびサポート・インフラストラクチャーの利用可能化を目的としている。ルールはHTMLおよびCSS（含むGSS）で記述された直接実行可能なファイルに適用されるものである。全般的な品質が維持されている限り、ツールによる難読化、ミニファイ、コンパイルは自由である。

# 2．全般

### 2.1.1 プロトコル

埋込みリソースに対しては可能な限りHTTPSを使用する。

画像およびその他メディアファイル（スタイルシート、スクリプト）には常にHTTPSプロトコル(`https:`)を使用する。ただし、これら対象ファイルがHTTPSで送受信できない場合を除く。

```
<!-- Not recommended: omits the protocol -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

<!-- Not recommended: uses the HTTP protocol -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
```

```
<!-- Recommended -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
```

```
/* Not recommended: omits the protocol */
@import '//fonts.googleapis.com/css?family=Open+Sans';

/* Not recommended: uses the HTTP protocol */
@import 'http://fonts.googleapis.com/css?family=Open+Sans';
```

```
/* Recommended */
@import 'https://fonts.googleapis.com/css?family=Open+Sans';
```

## 2.2 全般的なフォーマッティング・ルール

### 2.2.1 字下げ

字下げは1回で2個の空白とする。
タブ及びタブと空白の併用は禁止とする。

```
<ul>
  <li>Fantastic
  <li>Great
</ul>
```

```
.example {
  color: blue;
}
```

### 2.2.2 大文字表記

小文字のみを使用すること。

全てのコードは小文字で記述すること。当ルールは、HTML要素名、属性、属性値(`text/CDATA`を除く)、CSSセレクター、プロパティー、プロパティー値(文字列を除く)に適用される。

```
<!-- Not recommended -->
<A HREF="/">Home</A>
```

```
<!-- Recommended -->
<img src="google.png" alt="Google">
```

```
/* Not recommended */
color: #E5E5E5;
```

```
/* Recommended */
color: #e5e5e5;
```

### 2.2.3 末尾の空白

末尾の空白は削除する。

末尾の空白は不要であり、差分を判り難くする。

```
<!-- Not recommended -->
<p>What?_
```

```
<!-- Recommended -->
<p>Yes please.
```

## 2.3 一般的なメタルール

### 2.3.1 エンコーディング

UTF-8(BOMなし)を使用する。

エディターの文字エンコードがUTF-8(BOMなし)に設定されていることを確認すること。
`<meta charset = "utf-8">`でHTMLテンプレートと文書のエンコーディングを指定すること。スタイルシートはUTF-8を想定しているためエンコーディングを指定しないこと。

（エンコーディングの詳細とその指定方法は、[HTMLとCSSでの文字エンコーディング処理](http://www.w3.org/International/tutorials/tutorial-char-enc/)を参照。）

### 2.3.2 コメント

必要に応じて可能な箇所ではコードを説明すること。

コードを説明するためにコメントを使用すること：何をカバーしているか、どんな目的を果たしているか、なぜそれぞれの解決策が使用されるか、または望ましいか？

（完全に文書化されたコードを常に要求することは現実的な期待ではないため、この項目はオプションとする。有益性はHTMLコードとCSSコードで大きく異なり、プロジェクトの複雑さによっても異なる。）

### 2.3.3 要対応項目

要対応箇所とその内容を`TODO`でマークすること。

キーワード`TODO`のみを使用して要対応項目を強調表示すること。`@@`のような他の一般的な形式は使用しない。

`TODO（contact）`の形式で、括弧内に連絡先（ユーザー名またはメーリングリスト）を追加します。

`TODO：action item`の形式でコロンの後に対応内容を追加します。

```
{# TODO(john.doe): revisit centering #}
<center>Test</center>
```

```
<!-- TODO: remove optional tags -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```

# 3 HTML

## 3.1 HTMLスタイルルール

### 3.1.1 ドキュメントタイプ

HTML5を使用すること。

HTML5（HTML構文）はすべてのHTML文書に適しています：`<!DOCTYPE html>`。
（`text/html`としてHTMLを使用することを推奨する。
XHTMLを`application/xhtml+xml`として使用すると、ブラウザとインフラストラクチャの両方のサポートが不足し、HTMLよりも最適化の余地が少なくなる。）

HTMLでは問題ないが、void要素は閉じない。
具体的には、`<br/>`ではなく`<br>`と記述する。

### 3.1.2 HTMLの妥当性

可能な限り妥当性のあるHTMLを使用すること。

ファイルサイズが原因で他の方法ではパフォーマンス目標が達成できない場合以外は有効なHTMLコードを使用すること。

テストには[W3C HTMLバリデータ](https://validator.w3.org/nu/)などのツールを使用すること。

有効なHTMLを使用することは、技術的な要件や制約を知るに役立ち、適切なHTMLの使用を保証する、測定可能なベースライン品質属性である。

```
<!-- Not recommended -->
<title>Test</title>
<article>This is only a test.
```

```
<!-- Recommended -->
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test</title>
<article>This is only a test.</article>
```

### 3.1.3 セマンティクス

目的に応じてHTMLを使用すること。

要素（時々間違って「タグ」と呼ばれる）が作られた目的に合わせて使用すること。たとえば、見出しには見出し要素、段落には`p`要素、アンカーには`a`要素を使用する。

目的に応じてHTMLを使用することは、アクセシビリティ、再利用、およびコード効率の観点から重要である。

```
<!-- Not recommended -->
<div onclick="goToRecommendations();">All recommendations</div>
```

```
<!-- Recommended -->
<a href="recommendations/">All recommendations</a>
```

### 3.1.4 マルチメディア・フォールバック

マルチメディアに対して代替コンテンツを提供すること。

画像、ビデオ、`cancas`を介したアニメーションオブジェクトなどのマルチメディアについては必ず代替アクセスを提供すること。画像の場合は、意味のある代替テキスト（`alt`）の使用を、ビデオおよびオーディオの場合は、トランスクリプトおよびキャプションを意味する（可能であれば）。

代替コンテンツを提供することは、アクセシビリティ上の理由から重要である。盲目のユーザーは`@alt`なしで画像が何であるかを知る手掛かりがほとんどなく、他のユーザーはビデオまたはオーディオの内容が何に関するものか理解できない可能性がある。

（`alt`属性によって冗長性が生じるような画像や、目的が純粋に装飾的でCSSをすぐに使用できない画像の場合は、`alt=""`のように代替テキストなしの記述とする。）

```
<!-- Not recommended -->
<img src="spreadsheet.png">
```

```
<!-- Recommended -->
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">
```

### 3.1.5 関心の分離

構造をプレゼンテーションと振舞いから分離する。

構造（マークアップ）、プレゼンテーション（スタイル）、および振舞い（スクリプト）を厳密に区別し、3つの間の相互作用を最小限に抑えること。

つまり、ドキュメントとテンプレートはHTMLのみを含み、HTMLは構造上の目的でのみ使用すること。プレゼンテーションのすべてをスタイルシートに、振舞いのすべてをスクリプトにまとめること。

また、ドキュメントやテンプレートからのスタイルシートやスクリプトのリンクを可能な限り少なくすることで、連絡領域をできるだけ小さくすること。

構造をプレゼンテーションと振舞いから分離することは、メンテナンス上の理由から重要である。HTML文書やテンプレートを変更するのは、スタイルシートやスクリプトを更新するよりも、常に費用がかかる。

```
<!-- Not recommended -->
<!DOCTYPE html>
<title>HTML sucks</title>
<link rel="stylesheet" href="base.css" media="screen">
<link rel="stylesheet" href="grid.css" media="screen">
<link rel="stylesheet" href="print.css" media="print">
<h1 style="font-size: 1em;">HTML sucks</h1>
<p>I’ve read about this on a few sites but now I’m sure:
  <u>HTML is stupid!!1</u>
<center>I can’t believe there’s no way to control the styling of
  my website without doing everything all over again!</center>
```

```
<!-- Recommended -->
<!DOCTYPE html>
<title>My first CSS-only redesign</title>
<link rel="stylesheet" href="default.css">
<h1>My first CSS-only redesign</h1>
<p>I’ve read about this on a few sites but today I’m actually
  doing it: separating concerns and avoiding anything in the HTML of
  my website that is presentational.
<p>It’s awesome!
```

### 3.1.6 実体参照

実体参照を使用しないこと。

同じエンコーディング（UTF-8）がファイルとエディタ、そしてチーム内で使用されているならば、`&mdash;`、`&rdquo;`、`&#x263a`;のような実体参照を使用する必要はない。

唯一の例外は、HTML内で特別な意味を持つ文字（`<`や`&`など）、および制御文字または「見えない」文字（区切りのないスペースなど）である。

```
<!-- Not recommended -->
The currency symbol for the Euro is “&eur;”.
```

```
<!-- Recommended -->
The currency symbol for the Euro is “€”.
```

### 3.1.7 オプショナル・タグ

オプショナル・タグを省略します（任意）。

ファイルサイズの最適化とスキャンの容易さのために、オプショナル・タグを省略することを検討すること。[HTML5仕様](https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission)では、省略可能なタグを定義している。

（Web開発者が通常学習するものとはかなり異なるため、このアプローチは、より広いガイドラインとして規定するには猶予期間が必要となるかもしれない。一貫性と単純さの理由から、選択的でなくすべてのオプションタグを省略するのが最善である。）

```
<!-- Not recommended -->
<!DOCTYPE html>
<html>
  <head>
    <title>Spending money, spending bytes</title>
  </head>
  <body>
    <p>Sic.</p>
  </body>
</html>
```

```
<!-- Recommended -->
<!DOCTYPE html>
<title>Saving money, saving bytes</title>
<p>Qed.
```

### 3.1.8 `type`属性

スタイルシートとスクリプトの`type`属性を省略する。

スタイルシート（CSSを使用する場合）およびスクリプト（JavaScriptを使用する場合）には`type`属性を使用しないこと。

HTML5ではデフォルトで`text/css`と`text/javascript`が暗黙指定されるため、これらのコンテキストで`type`属性を指定する必要はない。 これは古いブラウザでも安全に実行できる。

```
<!-- Not recommended -->
<link rel="stylesheet" href="https://www.google.com/css/maia.css"
  type="text/css">
```

```
<!-- Recommended -->
<link rel="stylesheet" href="https://www.google.com/css/maia.css">
```

```
<!-- Not recommended -->
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"
  type="text/javascript"></script>
```

```
<!-- Recommended -->
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"></script>
```

## 3.2 HTMLフォーマット規則

### 3.2.1 一般的なフォーマット

すべてのブロック、リスト、またはテーブル要素に新しい行を使用し、すべての子要素をインデントすること。

要素のスタイル設定とは無関係に（CSSでは要素に対して`display`プロパティで異なる役割を割り当てることができるため）、すべてのブロック、リスト、またはテーブル要素は新しい行に配置すること。

また、それらがブロック、リスト、またはテーブル要素の子要素である場合はそれらをインデントすること。

（リスト項目間の空白の問題に遭遇した場合は、すべての`li`要素を1行に入れることが許容される。リンターはエラーの代わりに警告を投げることが推奨される。）

```
<blockquote>
  <p><em>Space</em>, the final frontier.</p>
</blockquote>
```

```
<ul>
  <li>Moe
  <li>Larry
  <li>Curly
</ul>
```

```
<table>
  <thead>
    <tr>
      <th scope="col">Income
      <th scope="col">Taxes
  <tbody>
    <tr>
      <td>$ 5.00
      <td>$ 4.50
</table>
```

### 3.2.2 HTML行の折り返し

長い行は分割する（任意）。

HTMLにはカラム制限の推奨はありませんが、可読性が著しく向上する場合は、長い行を折り返すことを検討すること。

行を折り返す場合は、各継続行は元の行から少なくとも4つの追加スペースを字下げすること。

```
<md-progress-circular md-mode="indeterminate" class="md-accent"
    ng-show="ctrl.loading" md-diameter="35">
</md-progress-circular>
```

```
<md-progress-circular
    md-mode="indeterminate"
    class="md-accent"
    ng-show="ctrl.loading"
    md-diameter="35">
</md-progress-circular>
```

```
<md-progress-circular md-mode="indeterminate"
                      class="md-accent"
                      ng-show="ctrl.loading"
                      md-diameter="35">
</md-progress-circular>
```

### 3.2.3 HTMLの引用符

属性値を引用符で囲むときは、ダブル・クォートを使用すること。

属性値の前後には、シングル・クオート（`''`）ではなくダブル・クオート（`""`）を使用すること。

```
<!-- Not recommended -->
<a class='maia-button maia-button-secondary'>Sign in</a>
```

```
<!-- Recommended -->
<a class="maia-button maia-button-secondary">Sign in</a>
```

# 4.CSS

## 4.1 CSSスタイル・ルール

### 4.1.1 CSSの妥当性

可能な限り妥当性のあるCSSを使用すること。

CSSバリデーターのバグに対応する場合および独自の構文を要求する場合以外は、有効なCSSコードを使用すること。

テストには[W3C CSSバリデーター](https://jigsaw.w3.org/css-validator/)などのツールを使用すること。

有効なCSSを使用することは、削除可能な不要なCSSコードを発見することを可能にし、適切なCSSの使用を保証する、測定可能なベースライン品質属性である。

### 4.1.2 IDとクラスの命名

意味のある、または一般的なIDとクラス名を使用すること。

外観を表す名前やなぞめいた名前の代わりに、命名する要素の目的を反映したID名またはクラス名を使用するか、そうでなければ一般的な名前を使用すること。

具体的で、要素の目的を反映した名前は、最も理解しやすく、変更される可能性が最も低いため、推奨されるべきである。

総称名は、兄弟との特別な差異や意味のある差異を持たない要素の代替品である。 それらは通常「ヘルパー」として必要となる。

機能名または総称名を使用すると、文書またはテンプレートに対する必然性のない変更の可能性が少なくなる。

```
/* Not recommended: meaningless */
#yee-1901 {}

/* Not recommended: presentational */
.button-green {}
.clear {}
```

```
/* Recommended: specific */
#gallery {}
#login {}
.video {}

/* Recommended: generic */
.aux {}
.alt {}
```

### 4.1.3 IDとクラス名のスタイル

IDとクラス名はできるだけ短く、必要なだけ長くするようにすること。

できるだけ短くしながら、IDまたはクラスが何であるかを伝えるように配慮すること。

IDとクラス名をこのようなスタイルで使用すると、許容レベルの解りやすさとコード効率の向上につながる。

```
/* Not recommended */
#navigation {}
.atr {}
```

```
/* Recommended */
#nav {}
.author {}
```

### 4.1.4 タイプセレクター（要素型セレクター）

タイプセレクタでIDやクラス名を修飾しないこと。

（ヘルパークラスなどで）必要な場合以外は、IDやクラスと一緒に要素名を使用しないこと。

不要な先祖セレクタを除去することは、[パフォーマンス上の理由](http://www.stevesouders.com/blog/2009/06/18/simplifying-css-selectors/)から有益である。

```
/* Not recommended */
ul#example {}
div.error {}
```

```
/* Recommended */
#example {}
.error {}
```

### 4.1.5 省略形のプロパティ

可能な限り省略形プロパティを使用すること。

CSSはさまざまな[省略形](http://www.w3.org/TR/CSS21/about.html#shorthand)のプロパティ（`font`など）を提供しており、可能な限り、たとえ1つの値のみを明示的に設定する場合でも、使用するべきである。

省略形のプロパティを使用することは、コードの効率と解り易さにおいて有益である。

```
/* Not recommended */
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;
```

```
/* Recommended */
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
```

### 4.1.6 0と単位

必要でない限り、「0」の値の後の単位指定は省略すること。

必要な場合以外は、`0`の値の後に単位を使用しないこと。

```
flex: 0px; /* This flex-basis component requires a unit. */
flex: 1 1 0px; /* Not ambiguous without the unit, but needed in IE11. */
margin: 0;
padding: 0;
```

### 4.1.7 先行0

値の先頭の「0」を省略すること。

-1から1までの値または長さについては小数点の前の`0`を省略すること。

```
font-size: .8em;
```

### 4.1.8 16進表記

可能な限り3文字の16進表記を使用すること。

その表記が可能なカラー値の場合、3文字の16進表記はより短く、より簡潔である。

```
/* Not recommended */
color: #eebbcc;
```

```
/* Recommended */
color: #ebc;
```

### 4.1.9 プリフィックス

アプリケーション固有のプリフィックスをセレクタの前に付けること（任意）。

大規模なプロジェクトや他のプロジェクトや外部サイトに埋め込まれるコードでは、IDとクラス名に（名前空間として）プリフィックスを使用すること。 ダッシュが後に続く短い、固有のIDを使用すること。

名前空間を使用すると、名前の競合を防ぐことができ、検索や置換操作などの保守作業が容易になる。

```
.adw-help {} /* AdWords */
#maia-note {} /* Maia */
```

### 4.1.10 IDとクラス名の区切り文字

IDとクラス名の単語をハイフンで区切ること。

解りやすくスキャンしやすくするために、セレクタ内の単語や略語をハイフン以外の文字（まったく含まないものも含む）で連結しないこと。

```
/* Not recommended: does not separate the words “demo” and “image” */
.demoimage {}

/* Not recommended: uses underscore instead of hyphen */
.error_status {}
```

```
/* Recommended */
#video-id {}
.ads-sample {}
```

### 4.1.11 ハック

ユーザーエージェントの検出やCSSの「ハック」を避けること - 最初に別の方法を試すこと。

ユーザーエージェントの検出や特別なCSSフィルター、ワークアラウンド、ハックによりスタイルの違いに対処するのは魅力的である。効率的で管理しやすいコードベースを達成し維持するためには、いずれのアプローチも最後の手段と考えるべきである。別の言い方をすれば、プロジェクトは最も抵抗の少ない方法をとる傾向があるので、検出やハッキングにフリーパスを与えることは、長期的にはプロジェクトを傷つけることになる。つまり、検出とハッキングを許可して使いやすくするということは、検出とハッキングをより頻繁に（限度を超えて）使用することを意味する。

## 4.2 CSSフォーマット規則

### 4.2.1 宣言順

宣言をアルファベット順にすること。

覚えやすく維持しやすい方法で一貫したコードを達成するために宣言をアルファベット順に並べること。

ソートする際はベンダー固有のプレフィックスは無視すること。ただし、特定のCSSプロパティに対する複数のベンダー固有のプレフィックスはソートすること（たとえば、`-moz`プレフィックスは`-webkit`の前に置くこと）。

```
background: fuchsia;
border: 1px solid;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
border-radius: 4px;
color: black;
text-align: center;
text-indent: 2em;
```

### 4.2.2 ブロック・コンテンツの字下げ

すべてのブロック・コンテンツを字下げすること。

階層を反映して解り易くするために、すべての[ブロック・コンテンツ](http://www.w3.org/TR/CSS21/syndata.html#block)、つまりルール内のルールを宣言とともに字下げすること。

```
@media screen, projection {

  html {
    background: #fff;
    color: #444;
  }

}
```

### 4.2.3 宣言の終了

すべての宣言の後にセミコロンを使用すること。

一貫性と拡張性の理由から、すべての宣言をセミコロンで終了すること。

```
/* Not recommended */
.test {
  display: block;
  height: 100px
}
```

```
/* Recommended */
.test {
  display: block;
  height: 100px;
}
```

### 4.2.4プロパティ名の終了

プロパティ名のコロンの後にスペースを入れること。

一貫性を保つために、プロパティと値の間には必ずスペースを1つ使用すること（プロパティとコロンの間にはスペースを入れない）。

```
/* Not recommended */
h3 {
  font-weight:bold;
}
```

```
/* Recommended */
h3 {
  font-weight: bold;
}
```

### 4.2.5 宣言ブロックの区切り

最後のセレクタと宣言ブロックの間にスペースを入れること。

最後のセレクターと[宣言ブロック](http://www.w3.org/TR/CSS21/syndata.html#rule-sets)を開始する左中括弧の間には、常に1個のスペースを使用すること。

左中括弧は、記述するルールの最後のセレクタと同じ行に置くこと。

```
/* Not recommended: missing space */
#video{
  margin-top: 1em;
}

/* Not recommended: unnecessary line break */
#video
{
  margin-top: 1em;
}
```

```
/* Recommended */
#video {
  margin-top: 1em;
}
```

### 4.2.6 セレクタおよび宣言の分離

セレクタと宣言は改行で区切ること。

それぞれのセレクタと宣言に対して必ず新しい行を開始すること。

```
/* Not recommended */
a:focus, a:active {
  position: relative; top: 1px;
}
```

```
/* Recommended */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}
```

### 4.2.7 ルールの分離

改行でルールを区切ること。

ルールの間には必ず空白行（2行の改行）を入れること。

```
html {
  background: #fff;
}

body {
  margin: auto;
  width: 50%;
}
```

### 4.2.8 CSSの引用符

属性セレクタとプロパティ値には、二重引用符（`""`）ではなく一重引用符（`''`）を使用すること。

URI値（`url()`）に引用符を使用しないこと。

例外：`@charset`ルールを使用する必要がある場合は、二重引用符を使用すること。[一重引用符は禁止](http://www.w3.org/TR/CSS21/syndata.html#charset)。

```
/* Not recommended */
@import url("https://www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}
```

```
/* Recommended */
@import url(https://www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
```

## 4.3 CSSメタルール

### 4.3.1セクションコメント

セクションコメントでセクションをグループ化すること（任意）。

可能であれば、コメントを使用してスタイルシートのセクションをまとめること。セクションを改行で区切ること。

```
/* Header */

#adw-header {}

/* Footer */

#adw-footer {}

/* Gallery */

.adw-gallery {}
```

# おわりに

一貫性を保ってください。

もしコードを編集しているならば、少しの時間あなたの周囲のコードを確認し、そのスタイルを決定してください。 それらがすべての算術演算子の周りにスペースを使うならば、あなたもそうするべきです。 彼らのコメントがハッシュマークの小さな枠で囲まれているなら、あなたのコメントもハッシュマークの小さな枠で囲んでください。

スタイルガイドラインを持つことの意味は、コーディングの共通語彙を持つことであり、人々がどのようではなく何を言っているかに集中できるようにすることです。ここにグローバルなスタイル・ルールを提示して人々に語彙を知らしめますが、ローカル・スタイルも重要です。もしあなたが追加したコードがその周囲の既存のコードと大幅に異なる場合は、読者がそのコードを読もうとした時、リズムが乱れてしまいます。それは避けてください。
