document.addEventListener("DOMContentLoaded", function() {
    const tagListElement = document.getElementById('tag-list');
    const tags = new Set();

    // 各ページのタグ要素を取得
    document.querySelectorAll('.tags span').forEach(tagElement => {
        tags.add(tagElement.getAttribute('data-tag'));
    });

    // タグのリストを作成
    tags.forEach(tag => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#'; // 必要に応じてリンクを設定
        a.textContent = tag;
        li.appendChild(a);
        tagListElement.appendChild(li);
    });
});
