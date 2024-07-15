document.addEventListener("DOMContentLoaded", function() {
    const tagListElement = document.getElementById('tag-list');
    const tags = new Set();
    const pages = [
        { title: "記事1", url: "article1.html", contentUrl: "article1-content.html", tags: ["タグ1", "タグ2"] },
        { title: "記事2", url: "article2.html", contentUrl: "article2-content.html", tags: ["タグ3", "タグ4"] },
        // 他のページもここに追加
    ];

    // ページからタグを収集
    pages.forEach(page => {
        page.tags.forEach(tag => tags.add(tag));
    });

    // タグリストを生成
    tags.forEach(tag => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = tag;
        a.addEventListener('click', () => displayPagesByTag(tag));
        li.appendChild(a);
        tagListElement.appendChild(li);
    });

    // タグクリック時にページを表示する関数
    function displayPagesByTag(tag) {
        const pageListElement = document.getElementById('page-list');
        if (pageListElement) {
            pageListElement.innerHTML = ''; // ページリストをクリア
            pages
                .filter(page => page.tags.includes(tag))
                .forEach(page => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = `template.html?article=${page.url}`;
                    a.textContent = page.title;
                    li.appendChild(a);
                    pageListElement.appendChild(li);
                });
        }
    }

    // ページロード時に記事の内容を挿入する関数
    function loadArticleContent(contentUrl) {
        fetch(contentUrl)
            .then(response => response.text())
            .then(html => {
                document.getElementById('article-content').innerHTML = html;
            })
            .catch(error => console.error('Error loading article content:', error));
    }

    // 現在のURLから記事のコンテンツを読み込む
    const urlParams = new URLSearchParams(window.location.search);
    const article = urlParams.get('article');
    if (article) {
        const page = pages.find(p => p.url === article);
        if (page) {
            loadArticleContent(page.contentUrl);
        }
    }
});
