document.addEventListener("DOMContentLoaded", function() {
    const tagListElement = document.getElementById('tag-list');
    const pageListElement = document.getElementById('page-list');
    const tags = new Set();
    const pages = [
        { title: "記事1", url: "article1.html", tags: ["タグ1", "タグ2"] },
        { title: "記事2", url: "article2.html", tags: ["タグ3", "タグ4"] },
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
        pageListElement.innerHTML = ''; // ページリストをクリア
        pages
            .filter(page => page.tags.includes(tag))
            .forEach(page => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = page.url;
                a.textContent = page.title;
                li.appendChild(a);
                pageListElement.appendChild(li);
            });
    }
});
