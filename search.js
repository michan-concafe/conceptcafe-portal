document.addEventListener("DOMContentLoaded", function() {
    const tagCheckboxesElement = document.getElementById('tag-checkboxes');
    const searchResultsElement = document.getElementById('search-results');
    const searchButton = document.getElementById('search-button');
    const tags = new Set();
    const pages = [
        { title: "記事1", url: "template.html?article=article1.html", contentUrl: "article1-content.html", tags: ["タグ1", "タグ2"] },
        { title: "記事2", url: "template.html?article=article2.html", contentUrl: "article2-content.html", tags: ["タグ3", "タグ4"] },
        // 他のページもここに追加
    ];

    // ページからタグを収集
    pages.forEach(page => {
        page.tags.forEach(tag => tags.add(tag));
    });

    // タグチェックボックスを生成
    tags.forEach(tag => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tag;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(tag));
        tagCheckboxesElement.appendChild(label);
        tagCheckboxesElement.appendChild(document.createElement('br')); // 改行を追加
    });

    // 検索ボタンがクリックされたときの動作
    searchButton.addEventListener('click', () => {
        const selectedTags = Array.from(tagCheckboxesElement.querySelectorAll('input:checked')).map(cb => cb.value);
        searchResultsElement.innerHTML = ''; // 検索結果をクリア
        if (selectedTags.length > 0) {
            pages
                .filter(page => selectedTags.every(tag => page.tags.includes(tag)))
                .forEach(page => {
                    fetch(page.contentUrl)
                        .then(response => response.text())
                        .then(html => {
                            const doc = new DOMParser().parseFromString(html, 'text/html');
                            const articleTitle = doc.querySelector('article h2').textContent;
                            const articleFirstImage = doc.querySelector('article img');
                            const articleFirstParagraph = doc.querySelector('article p').textContent.slice(0, 100) + '...';
                            
                            const li = document.createElement('li');
                            const a = document.createElement('a');
                            a.href = page.url;
                            a.textContent = articleTitle;
                            li.appendChild(a);
                            if (articleFirstImage) {
                                const img = document.createElement('img');
                                img.src = articleFirstImage.src;
                                img.alt = articleFirstImage.alt;
                                li.appendChild(img);
                            }
                            const p = document.createElement('p');
                            p.textContent = articleFirstParagraph;
                            li.appendChild(p);
                            searchResultsElement.appendChild(li);
                        })
                        .catch(error => console.error('Error fetching article content:', error));
                });
        } else {
            // タグが選択されていない場合のメッセージ
            const li = document.createElement('li');
            li.textContent = 'タグを選択してください。';
            searchResultsElement.appendChild(li);
        }
    });
});
